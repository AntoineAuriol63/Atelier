# Cadrage : le mode Animation

Décisions du 11 septembre 2026, après essai du premier système (§ 8.4 du modèle, sections Animations de l'inspecteur). Constat partagé : le moteur de rendu est bon, l'expérience ne l'est pas. Ce document fixe ce qu'on construit à la place. Il remplace les étapes 3 à 6 du plan « système complet » ; les étapes 1 et 2 (cibles, découpage, décalage, retour, bascule, ressorts) sont reprises telles quelles dans le nouveau modèle.

## 1. Ce qu'on a appris

- Un designer pense **déclencheur d'abord, composition ensuite** : « quand cette section entre dans l'écran, le titre monte, puis les cartes arrivent une à une ». Le système actuel pense élément par élément, avec un « run » qui porte à la fois les étapes et le déclencheur : composer plusieurs éléments demande des rustines (cible, décalage, séquence).
- **On doit voir ce qu'on règle.** Régler une opacité dans un champ sans pouvoir se placer à 400 ms est du réglage à l'aveugle. Il faut une tête de lecture et un canevas qui montre l'état à cet instant.
- **Un seul endroit pour faire bouger.** Aujourd'hui : Animations, Effets (bandeau, parallaxe), Vue (carrousel automatique), Interactions (afficher, masquer, variante). Le mode Animation regroupe ce qui est du mouvement ; le bandeau reste une propriété de boîte (il change la structure).
- **Deux publics.** Le débutant, en mode Écriture, veut choisir « Fondu en montant » sur un élément et rien d'autre. Le designer veut la ligne de temps. Les deux doivent produire le même objet dans le document.

Références retenues : Webflow Interactions (déclencheur → animation à plusieurs éléments, ligne de temps par actions) et Framer (réglages lisibles, ressorts, aperçu immédiat). Vocabulaire choisi en français : **déclencheur**, **animation**, **piste**, **image-clé**, **tête de lecture**.

## 2. Le modèle (version de schéma 3)

Une **animation** est une ligne de temps nommée, rangée dans le site, faite de **pistes** (une par élément animé) portant des **images-clés** en millisecondes. Un **déclencheur**, posé sur un élément (ou sur la page), lance une animation. Une animation peut être lancée par plusieurs déclencheurs ; un élément peut porter plusieurs déclencheurs.

```ts
type Animation = {
  id: Id; name: string;
  duration: number;                          // ms : longueur de la ligne de temps
  tracks: Track[];
  loop?: number | "infinite";                // rejouer N fois ou sans fin (flottement, pulsation)
  alternate?: boolean;                       // en boucle : aller-retour
  preset?: string;                           // préréglage d'origine, pour l'interface
};
type Track = {
  id: Id;
  target: TrackTarget;
  stagger?: { each: number; from?: "start" | "end" | "center" };   // cible multiple : décalage par rang
  keyframes: { at: number; style: StyleProps; easing?: string }[]; // at en ms ; easing : courbe pour atteindre cette image depuis la précédente (CSS ou spring(k, c))
};
type TrackTarget =
  | { trigger: true }                        // l'élément qui porte le déclencheur (relatif : rend l'animation réutilisable et les préréglages possibles)
  | { trigger: true; children: true }        // ses enfants directs (ou les cartes d'une vue)
  | { trigger: true; split: "words" | "letters" }   // ses mots ou ses lettres
  | { node: Id }                             // un élément précis de la page
  | { node: Id; children: true }
  | { node: Id; split: "words" | "letters" }
  | { selector: string };                    // libre, script seulement
type Trigger = {
  id: Id;
  on: "load" | "inView" | "hover" | "click" | "scroll" | "pointer";
  animation: Id;
  delay?: number;
  once?: boolean;                            // inView : une fois (défaut) ou à chaque passage
  reverseOnLeave?: boolean;                  // hover : revient en arrière au départ de la souris
  toggle?: boolean;                          // click : un clic sur deux rembobine
  range?: [number, number];                  // scroll : part de la traversée de l'écran qui parcourt la ligne de temps
  axis?: "x" | "y";                          // pointer : la position de la souris parcourt la ligne de temps
  pauseOnHover?: boolean;
};
Node.triggers?: Trigger[];
Page.triggers?: Trigger[];                   // déclencheurs de page (chargement de la page, défilement de la page)
Site.animations: Animation[];
```

Règles :

- Avant sa première image-clé et après la dernière, une piste laisse l'élément à son état de repos, sauf `fill` implicite : l'animation garde la dernière image (`forwards`) quand le déclencheur est `hover`, `click` ou `pointer`, et revient au repos sinon, à moins que la dernière image-clé soit l'état de repos. (On ne demande pas au designer de choisir un « remplissage ».)
- Une image-clé ne contient que les propriétés qui changent. La première image-clé d'une piste peut être vide : elle vaut « l'état de repos ».
- `at` est en millisecondes ; la durée de l'animation est au moins la dernière image-clé de ses pistes.
- Les cibles relatives (`trigger`) rendent une animation réutilisable sur d'autres éléments et d'autres pages ; les cibles absolues (`node`) attachent l'animation à une page. Un préréglage n'a que des cibles relatives.
- Les interactions d'état (afficher, masquer, changer de variante) restent dans `Node.interactions` en v1 ; elles rejoindront la liste des déclencheurs plus tard.
- Le bandeau, la parallaxe et le compteur restent des propriétés (`props.marquee`, `props.parallax`, `props.countUp`) ; le mode Animation les montre dans une section « Effets continus » de l'élément pour qu'il y ait un seul endroit.

Migration 2 → 3 : chaque `AnimationRun` d'un nœud devient une animation du site (nom : le libellé du préréglage ou « Animation n ») avec une piste à cible relative (`trigger`, `children`, `split` ou `selector` selon `target`/`split`), images-clés converties de % en ms, et un déclencheur sur le nœud ; `iterations` → `loop`, `direction: alternate` → `alternate` ; les définitions de la bibliothèque deviennent des animations à piste unique. Le rendu est inchangé pour un document converti.

## 3. Le rendu

Le moteur actuel est repris : pour chaque couple (déclencheur, animation), chaque piste devient un bloc `@keyframes` (positions en % de la durée de la piste) et une propriété `animation` sur sa cible, avec `animation-delay` égal au temps de sa première image (plus le décalage par rang). `load` et `hover` (sans retour) restent en CSS pur quand la cible est marquable ; `inView`, `click`, `scroll`, `pointer`, le retour au départ de la souris et la bascule passent par le script, qui lit `data-anim` et joue toutes les pistes avec l'API Web Animations. Ressorts en `linear(…)`, décalage par `calc()` ou par le script, découpage du texte en morceaux, `data-anim-target`, règles éditeur, mouvement réduit et sans script : comme aujourd'hui. Le tout est déjà couvert par les tests du rendu et du script ; ils sont adaptés au nouveau modèle, pas réécrits.

## 4. L'interface

### 4.1 Le mode Animation

Quatrième mode dans la barre du haut : **Écriture · Design · Animation · Code**. En mode Animation :

- Le canevas reste le même aperçu, et montre **l'état à la tête de lecture** de l'animation ouverte (les pistes sont jouées en pause par l'API Web Animations dans l'aperçu). Sans animation ouverte : l'état de repos.
- Un **panneau Animation** prend la place de l'inspecteur, à droite, sans recouvrir le canevas (décision du 11 septembre) : même colonne, même largeur par défaut, élargissable en poussant le canevas quand la ligne de temps le demande. Il a trois étages :
  1. **Déclencheurs de l'élément sélectionné** : liste « Quand [entre dans l'écran] → [Arrivée du héros] », avec les réglages du déclencheur repliés (délai, une fois, retour, bascule, plage). Bouton « Ajouter un déclencheur » : on choisit *quand*, puis *quoi* : un préréglage, une animation existante du site, ou « Nouvelle animation ». Sous la liste : « Effets continus » de l'élément (bandeau, parallaxe, compteur, carrousel automatique).
  2. **Lecteur et ligne de temps** de l'animation ouverte : nom (modifiable), lecture, pause, retour au début, boucle, vitesse ½, temps courant ; règle graduée en ms ; une ligne par piste avec le nom de l'élément, ses images-clés en losanges, la tête de lecture qu'on glisse ; « Ajouter un élément » (on le prend dans le canevas ou dans les calques) ; sur une piste : décalage (enfants, morceaux), retirer.
  3. **Propriétés de l'image-clé** sélectionnée : **les panneaux Design existants** (Espacement, Dimensions, Typographie, Apparence, Effets) en « mode image-clé » : ils lisent la valeur à cet instant et écrivent dans l'image-clé, pas dans le style. Une pastille de source « ◆ image-clé » distingue les propriétés animées. En tête : la courbe vers cette image (courbes CSS ou Ressort avec raideur, amortissement et aperçu), dupliquer, supprimer.
- Dans les **calques**, les éléments qui ont une piste dans l'animation ouverte portent un point accent ; ceux qui portent un déclencheur portent l'icône éclair.
- Le geste central : **se placer à un temps, régler une propriété, l'image-clé se crée**. Pas de bouton « enregistrer ». Si aucune image-clé n'existe à ce temps sur cette piste, elle est créée avec la propriété réglée ; la première image-clé (au repos) est posée d'elle-même à 0 ms à la création de la piste.
- On glisse une image-clé pour la déplacer dans le temps ; ⌥-glisser la duplique ; Suppr la retire. Les images-clés d'une piste se sélectionnent en groupe pour décaler tout un élément.
- Aucun déplacement direct sur le canevas en v1 (décidé) : tout passe par les panneaux.

### 4.2 Le mode Écriture : les préréglages en un geste

Section « Animation » réduite à trois choix sur l'élément sélectionné, pour les débutants :

- **Apparition** : Aucune · Fondu · En montant · En descendant · Depuis la gauche · Depuis la droite · Zoom · Netteté ; pour un texte, une case « lettre par lettre » ; pour une boîte à plusieurs enfants, « les enfants un à un ».
- **Au survol** : Aucun · Grossir · Soulever · Éclaircir.
- **En continu** : Aucun · Flotter · Pulser · Tourner · Clignoter.

Chaque choix crée (ou remplace) un déclencheur et une animation de préréglage sur l'élément seul, avec des cibles relatives. Un lien « Ouvrir dans le mode Animation » permet d'aller plus loin ; une animation modifiée à la main n'est plus un préréglage et s'affiche comme « Personnalisée ».

### 4.3 Le mode Design

L'inspecteur garde une section « Animations » réduite : la liste des déclencheurs de l'élément (lecture seule, avec « Jouer ») et les mêmes trois choix qu'en Écriture, plus le bouton « Ouvrir dans le mode Animation ». Les sections Effets (bandeau, parallaxe) restent pour les habitués, et sont aussi visibles dans le panneau Animation.

### 4.4 La palette ⌘K

« Apparition · … » et « Animer cet élément… » (ouvre le mode Animation sur l'élément).

## 5. Ce que ça permet, et ce que ça ne permet pas

Permet : composer plusieurs éléments dans le temps (héros : titre, puis texte, puis bouton), rejouer une même animation sur plusieurs déclencheurs, décaler des enfants ou des lettres, revenir au départ de la souris, basculer au clic, suivre le défilement ou la souris, ressorts, boucles, réutiliser une animation sur une autre page (cibles relatives), voir et scruter tout ça avant de publier.

Ne permet pas en v1 : déplacer à la souris sur le canevas, animer un tracé SVG, la physique interactive (glisser avec inertie), les transitions entre pages (prévu ensuite en CSS pur avec `@view-transition`), les sections collées sur une longue distance de défilement (prévu ensuite : `pin` sur une section), la fusion des interactions d'état dans les déclencheurs.

## 6. Les étapes de réalisation

Chaque étape : contrat d'abord, tests rouges, code, vérification dans l'éditeur et sur le site publié, documents, commande de commit.

1. ✅ (11 sept.) **Modèle v3** : types, schéma, migration 2 → 3 (documents et instantanés publiés), aides (`planAddTrigger`, `planSetKeyframe`, `keyframeAt`, `resolveTarget`, préréglages sous forme d'animations), tests. Le site codé Maison Aurèle est converti à la source.
2. ✅ (11 sept.) **Rendu** sur le modèle v3 : même moteur, pistes et déclencheurs ; tests du CSS, du HTML et du script adaptés.
3. ✅ (13 sept.) **Mode Animation, lecture** : le mode dans la barre, le panneau à droite, liste des déclencheurs, bibliothèque, lecteur et ligne de temps en lecture seule, canevas à la tête de lecture, calques marqués. Travail en cours repris tel quel (commit `7b48979`), puis complété : branchement dans l'éditeur, aperçu à la tête de lecture extrait et testé, calques, courbes du script alignées sur le CSS (voir le journal de la feuille de route du 13 sept.).
4. ✅ (13 sept.) **Mode Animation, édition** : images-clés par les panneaux Design en mode image-clé, ajout de piste, glisser et dupliquer, courbes et ressorts par segment, décalage et découpage par piste, réglages des déclencheurs.
5. ✅ (13 sept.) **Préréglages** : bibliothèque de préréglages sous forme d'animations complètes ; section simplifiée en Écriture et en Design ; palette.
6. ✅ (13 sept.) **Déclencheurs avancés** : défilement (plage), souris (axe), déclencheurs de page, effets continus rassemblés dans le panneau.
7. ✅ (13 sept.) **Nettoyage et documents** : retrait de l'ancienne section, `docs/fonctionnel.md`, `docs/document-model.md` § 8.4 réécrit, feuille de route, audit d'usage.

**Réalisé le 13 septembre 2026** (étapes 3 à 7 menées dans la même journée à partir du travail en cours de l'étape 3) : le détail est dans la feuille de route, l'audit d'usage et ses suites dans `docs/audit-animation-2026-09.md`.

Ordre de grandeur prévu : trois à quatre sessions de travail. Les étapes 1 et 2 sont invisibles pour l'utilisateur mais rendent l'étape 3 sûre (les documents existants continuent d'être rendus à l'identique).
