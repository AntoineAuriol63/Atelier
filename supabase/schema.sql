-- Atelier — schéma Supabase (v0 : sites, journal d'opérations, entrées de bases de données).
-- À exécuter dans l'éditeur SQL du projet Supabase.

create table if not exists sites (
  id          text primary key,
  name        text not null,
  document    jsonb not null,
  version     integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists changes (
  site_id     text not null references sites(id) on delete cascade,
  version     integer not null,
  ops         jsonb not null,
  author      text not null,
  label       text,
  created_at  timestamptz not null default now(),
  primary key (site_id, version)
);

create table if not exists entries (
  site_id      text not null references sites(id) on delete cascade,
  id           text not null,
  database_id  text not null,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  values       jsonb not null default '{}'::jsonb,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  primary key (site_id, id)
);
create index if not exists entries_by_database on entries (site_id, database_id, status);

-- Applique un changement de façon atomique : le document n'est remplacé que si la version de base
-- est toujours la version courante (détection de conflit), et le journal est complété dans la même transaction.
create or replace function commit_change(
  p_site_id text, p_base_version integer, p_document jsonb, p_ops jsonb, p_author text, p_label text
) returns jsonb language plpgsql as $$
declare
  v_new integer := p_base_version + 1;
  v_current integer;
begin
  update sites set document = p_document, version = v_new, updated_at = now()
    where id = p_site_id and version = p_base_version;
  if not found then
    select version into v_current from sites where id = p_site_id;
    return jsonb_build_object('ok', false, 'version', coalesce(v_current, -1));
  end if;
  insert into changes (site_id, version, ops, author, label) values (p_site_id, v_new, p_ops, p_author, p_label);
  return jsonb_build_object('ok', true, 'version', v_new);
end $$;

-- Sécurité : l'application accède avec la clé de service côté serveur. Les politiques par utilisateur
-- (espaces de travail, rôles, D50) arrivent avec l'authentification en v1.
alter table sites enable row level security;
alter table changes enable row level security;
alter table entries enable row level security;

-- Instantanés : une copie complète du document à chaque publication (D36) et lors du compactage du journal.
-- Le journal `changes` est la vérité ; les instantanés évitent de le rejouer depuis l'origine.
create table if not exists snapshots (
  site_id     text not null references sites(id) on delete cascade,
  version     integer not null,
  document    jsonb not null,
  kind        text not null default 'auto' check (kind in ('auto', 'publish')),
  label       text,
  created_at  timestamptz not null default now(),
  primary key (site_id, version)
);
alter table snapshots enable row level security;

-- Compactage : supprime les changements antérieurs au dernier instantané, en gardant `keep` versions récentes.
create or replace function compact_changes(p_site_id text, p_keep integer default 500) returns integer language plpgsql as $$
declare
  v_floor integer;
  v_deleted integer;
begin
  select greatest(coalesce(max(version), 0), (select version from sites where id = p_site_id) - p_keep)
    into v_floor from snapshots where site_id = p_site_id;
  delete from changes where site_id = p_site_id and version <= v_floor;
  get diagnostics v_deleted = row_count;
  return v_deleted;
end $$;

-- Stockage des fichiers (images importées) : un seau public en lecture, écrit par le serveur seulement (clé de service).
insert into storage.buckets (id, name, public, file_size_limit)
values ('assets', 'assets', true, 52428800)
on conflict (id) do update set public = true, file_size_limit = 52428800;
