# Formulaires (D47)

Un bloc « Formulaire » est un formulaire HTML ordinaire : ses champs (`field`) et son bouton d'envoi sont des nœuds comme les autres, stylables. À l'envoi :

1. Le navigateur poste sur `POST /api/forms/<siteId>/<formId>` (multipart). Avec le script du site, l'envoi se fait sans rechargement et le message de succès ou d'erreur apparaît en place ; sans script, le serveur redirige vers la page d'origine avec `?envoye=<formId>`.
2. Le serveur retrouve le formulaire dans le site, valide (obligatoire, email, nombre, choix, longueur), ignore en silence un envoi dont le piège à robots (`_hp`) est rempli, et limite à dix envois par minute et par adresse.
3. L'envoi est enregistré comme une entrée de la base virtuelle `frm_<formId>` (statut « brouillon » = non traité). L'onglet Données → **Messages reçus** l'affiche en tableau, avec export CSV. Cette base n'est pas dans le document : elle vit avec les entrées.
4. Une notification part par email si `RESEND_API_KEY` et `FORM_NOTIFY_TO` sont renseignés (`.env.example`). L'expéditeur par défaut est celui d'essai de Resend ; un domaine vérifié viendra avec la publication (M6). Sans configuration, rien n'est envoyé et l'envoi reste enregistré.

Le message de succès et les champs se règlent dans l'inspecteur (sections « Formulaire » et « Champ »). Fichiers joints, choix du destinataire par formulaire et réponse automatique : plus tard (v1).

## Service d'envoi et site exporté (23 septembre 2026)

Le panneau Formulaire propose « Service d'envoi » (`props.endpoint`). Vide, le formulaire poste sur la route d'Atelier ; renseigné (Formspree, Netlify Forms, une fonction maison), il poste directement à cette adresse et ne dépend plus d'Atelier, sur le site publié comme dans l'export. Le script du site envoie alors les champs à ce service avec `Accept: application/json` et affiche le message de succès s'il répond 2xx.

Dans l'export, les formulaires sans service d'envoi visent Atelier en adresse absolue (`https://<instance>/api/forms/…`, l'origine de l'instance qui a produit l'archive) : un site déposé chez Netlify, Cloudflare Pages ou nginx continue d'envoyer ses messages dans Données → Messages reçus et par email. La route accepte les envois depuis n'importe quelle origine (CORS `*`, sans cookies : rien de privé n'y transite, la limite de débit et le piège à robots restent) et répond à la pré-vérification `OPTIONS`. Sans script, le retour après envoi revient à la page d'origine, en chemin relatif sur la même origine, en adresse complète (http ou https) sur un autre domaine. Le README de l'archive dit, formulaire par formulaire, où vont les envois.

## Destinataire par formulaire

Le panneau Formulaire propose « Destinataire » (`props.notifyTo`, adresses séparées par des virgules). La notification part vers ces adresses, sinon vers `FORM_NOTIFY_TO`. L'expéditeur reste `MAIL_FROM` (domaine vérifié chez Resend pour la production).
