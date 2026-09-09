# Formulaires (D47)

Un bloc « Formulaire » est un formulaire HTML ordinaire : ses champs (`field`) et son bouton d'envoi sont des nœuds comme les autres, stylables. À l'envoi :

1. Le navigateur poste sur `POST /api/forms/<siteId>/<formId>` (multipart). Avec le script du site, l'envoi se fait sans rechargement et le message de succès ou d'erreur apparaît en place ; sans script, le serveur redirige vers la page d'origine avec `?envoye=<formId>`.
2. Le serveur retrouve le formulaire dans le site, valide (obligatoire, email, nombre, choix, longueur), ignore en silence un envoi dont le piège à robots (`_hp`) est rempli, et limite à dix envois par minute et par adresse.
3. L'envoi est enregistré comme une entrée de la base virtuelle `frm_<formId>` (statut « brouillon » = non traité). L'onglet Données → **Messages reçus** l'affiche en tableau, avec export CSV. Cette base n'est pas dans le document : elle vit avec les entrées.
4. Une notification part par email si `RESEND_API_KEY` et `FORM_NOTIFY_TO` sont renseignés (`.env.example`). L'expéditeur par défaut est celui d'essai de Resend ; un domaine vérifié viendra avec la publication (M6). Sans configuration, rien n'est envoyé et l'envoi reste enregistré.

Le message de succès et les champs se règlent dans l'inspecteur (sections « Formulaire » et « Champ »). Fichiers joints, choix du destinataire par formulaire et réponse automatique : plus tard (v1).

## Destinataire par formulaire

Le panneau Formulaire propose « Destinataire » (`props.notifyTo`, adresses séparées par des virgules). La notification part vers ces adresses, sinon vers `FORM_NOTIFY_TO`. L'expéditeur reste `MAIL_FROM` (domaine vérifié chez Resend pour la production).
