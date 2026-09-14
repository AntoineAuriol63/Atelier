# Tests utilisateurs simulés · « Faire bouger un site » (septembre 2026)

Étude d'utilisabilité et de compréhension du parcours d'animation, menée du 13 au 14 septembre 2026 sur la version `fc1764d` (après R1 à R4 de l'audit n°5, `docs/audit-parcours-animation-2026-09.md`).

> **À lire avant tout.** Les participants sont **simulés** : cinq agents jouent chacun une personne (persona), voient l'écran par captures et agissent à la souris et au clavier dans une copie isolée d'Atelier. Le protocole a été conçu pour réduire les biais de ce dispositif (section 2), mais il ne remplace pas de vraies personnes. Tous les chiffres sont des effectifs sur 5 (« 3 sur 5 ») : ils disent où regarder, jamais une fréquence réelle. Chaque conclusion importante est **à confirmer avec de vraies personnes** ; la section 15 dit lesquelles en priorité.

Pièces complètes dans `docs/tests-simules-animation-2026-09/` (protocole, addendums, traces, codages, fiches de lecture du site, synthèse, comparaison) ; liste en fin de document.

---

## Sommaire

1. En bref
2. Méthode
3. Résultats par mission
4. Le parcours étape par étape
5. Compréhension : ce que les participants croient que verra le visiteur
6. Problèmes retenus
7. Signaux faibles
8. Ce qui fonctionne (à préserver)
9. Hypothèses
10. Valeur perçue
11. Comparaison avec l'audit n°5
12. Plan d'action consolidé
13. Constats techniques du préparateur
14. Limites
15. Ce qu'un test avec de vraies personnes doit trancher
16. Annexes

---

## 1. En bref

**Poser un effet tout prêt sur un élément fonctionne ; faire jouer plusieurs éléments ensemble, non.**

- **Simple, réussi par tous.** Faire arriver un titre (T1) et calmer une pastille tout en faisant réagir un bouton au survol (T5) : 5 sur 5, sans aide, débutants compris. Ralentir un titre : 5 sur 5. Le moment de lancement « quand on arrive dessus » est posé d'office par le choix tout prêt, sans que personne ait à le décider.
- **Composer, réussi par personne.** La petite scène de T4 (ordre, minutage, chiffres échelonnés, dépassement, rejeu) : 0 sur 5, dont 0 designer sur 3. « Les boutons après le titre » (T3) : 1 sur 5. 7 des 13 missions non terminées naissent à l'étape « composer ».
- **Premier problème : il n'y a pas d'« après » là où l'on pose l'effet.** 4 participants sur 5 cherchent une attente ou un « après le précédent » dans la rubrique « Animation » du panneau ; elle n'existe qu'en mode Animation (« Départ »). Gravité maximale, les deux publics. L'audit n°5 ne l'avait pas vu.
- **Le mode Animation fait reculer les débutants.** Les deux débutants le quittent ou abandonnent (« Je me suis dit « ce n'est pas pour moi » ») ; les designers contournent « piste » et « image-clé ». L'explication ajoutée par R3 n'est pas montrée à qui arrive du panneau sur un élément déjà animé (vérifié dans le code, constat 11).
- **Diagnostiquer une animation existante trompe.** Une carte animée par sa liste affiche « Aucune » (2 participants concluent qu'il n'y a pas d'animation) ; le moment de lancement d'une animation existante et « rejouer à chaque passage » ne sont pas trouvés. T2 réussie par 2 sur 5.
- **La phrase de résumé (R2) est ce qui marche le mieux.** Lue et utilisée par 5 sur 5, citée comme « la meilleure idée de l'outil » ; 24 récits sur 25 de ce que verra le visiteur sont sans écart matériel avec le site réel.
- **Défaut technique relevé par le préparateur, invisible aux participants** : sur le site publié, un élément qui doit « arriver quand on descend » est d'abord visible, disparaît, puis arrive (« éclair »). Il touche le chemin que tout le monde emprunte.
- **Hypothèses** : 3 confirmées (H2, H4, H5), 5 infirmées (H1, H3, H6, H8, H9), 2 indéterminées (H7, H10).
- **Ce que l'étude ne peut pas dire** : ce que ressent un visiteur (aucun mouvement n'a été vu en continu), si de vrais débutants trouvent aussi vite (probablement surestimé), la fréquence réelle de chaque problème, le coût réel d'une scène sans limite d'actions.

**Plan d'action consolidé (section 12)** : 1. dire « après » ou « attendre » là où l'on pose l'effet ; 2. que le site joue ce que l'éditeur annonce (éclair, phrase « un à un ») ; 3. rendre le mode Animation abordable pour qui vient du panneau ; 4. retrouver et corriger une animation existante là où on la lit ; 5. trouver « à chaque passage » et une arrivée qui dépasse ; 6. désigner du premier coup ce qui bouge ; 7. passer d'un élément à l'autre dans le mode Animation sans ambiguïté ; 8. faire partir des éléments répétés l'un après l'autre ; 9. dire la portée d'un réglage de composant ; 10. vérifier et finir les corrections déjà faites.

---

## 2. Méthode

### 2.1 Question posée

Le déroulé de la fonctionnalité « faire bouger un site » est-il compris ? L'utilisateur sait-il quoi faire à chaque étape, comprend-il ce que verra le visiteur, et les deux publics visés, le débutant qui veut un effet tout prêt et le designer qui compose, y arrivent-ils sans documentation ? Il s'agit du **parcours et de la compréhension**, pas de la taille des boutons.

Cinq questions de recherche (protocole § 1.2) : QR1 le déroulé est-il compris ; QR2 sait-on quoi faire à chaque étape ; QR3 comprend-on ce que verra le visiteur ; QR4 les deux publics y arrivent-ils ; QR5 où la valeur perçue apparaît-elle ou se perd-elle.

### 2.2 Qui a fait quoi

| Rôle | Tenu par | Garde-fou |
|---|---|---|
| **Chercheur** : protocole, personas, tâches, critères, hypothèses | un agent (Opus 5) | conçu **à l'aveugle** : sans voir l'interface, le code ni les audits n°3 à 5, à partir d'un brief décrivant les résultats attendus pour le visiteur |
| **Participants** (5 personas) | un agent par persona : P1, P4, P5 joués par Opus 5 ; P2 et P3 par Sonnet 5 | chaque public compte les deux modèles ; aucune mémoire d'une séance à l'autre ; consigne d'incarnation (vocabulaire inconnu, manière d'explorer, règle d'abandon) |
| **Modérateur** | l'orchestrateur, en script fermé | ne dit que les phrases écrites dans le protocole (accueil, consignes, relances, aides, questions) ; tous ses messages sont dans les traces et contrôlés par les observateurs |
| **Préparateur** | l'orchestrateur | copies du site, état de départ vérifié, lecture du site enregistré, visites instrumentées |
| **Observateurs** | un agent (Opus 5) par séance ; un second codeur indépendant (Sonnet 5) pour 2 séances tirées au sort (P3, P5) | sans accès aux hypothèses ; codent la trace brute, pas le résumé du participant |
| **Synthèse** | un agent chercheur (Opus 5) | à l'aveugle vis-à-vis des audits ; la comparaison avec l'audit n°5 est faite après, séparément, par un autre agent (section 11) |

### 2.3 Participants

| | Persona | Public | Modèle | Ordre des missions |
|---|---|---|---|---|
| **P1** | Nathalie, 56 ans, gérante d'une épicerie fine | débutante | Opus 5 | T1 T2 T3 T5 T4 |
| **P2** | Claire, 39 ans, designer graphique freelance (Figma) | designer | Sonnet 5 | T1 T3 T5 T2 T4 |
| **P3** | Karim, 34 ans, gérant d'un food truck | débutant | Sonnet 5 | T1 T5 T2 T3 T4 |
| **P4** | Julien, 46 ans, directeur artistique motion (After Effects) | designer | Opus 5 | T1 T2 T5 T3 T4 |
| **P5** | Élodie, 28 ans, intégratrice web (Elementor, Webflow) | designer | Opus 5 | T1 T3 T2 T5 T4 |

Ordre de passage tiré au sort : P3, P1, P5, P2, P4. Durées de séance entre 21 et 29 minutes.

### 2.4 Protocole (résumé ; texte intégral en annexe)

- **Cinq missions**, formulées comme des demandes d'Aurèle, patronne du restaurant « Maison Aurèle », sans aucun mot de l'interface (« animation », « survol », « durée »… sont proscrits) :
  - **T1 · Premier élément qui bouge** : que le titre de la partie « La maison » arrive au moment où l'on descend jusqu'à lui, sobrement.
  - **T2 · Ce que voit vraiment le client** : « le titre au-dessus bouge bien, mais les plats eux-mêmes sont déjà là, immobiles » ; comprendre et corriger (préparé : les cartes partent à l'ouverture de la page, donc avant que la visiteuse n'arrive dessus).
  - **T3 · Donner du rythme à l'accueil** : le grand titre arrive nettement plus lentement, et les deux boutons n'arrivent qu'après.
  - **T4 · La maison racontée comme une scène** : photo par le côté, puis titre, puis paragraphe, puis les trois chiffres l'un après l'autre en dépassant légèrement leur place ; 2,5 à 3 s ; rejouée à chaque passage.
  - **T5 · Calmer la pastille, réveiller le bouton** : la pastille « Bib Gourmand » cesse de bouger en permanence mais garde son arrivée ; le bouton « Réserver une table » réagit au passage de la souris.
- **Ordre** : T1 toujours en premier (découverte à froid), T4 toujours en dernier ; T2, T3 et T5 contrebalancés.
- **Réussite lue dans le site enregistré**, jamais dans ce que dit le participant : critères chiffrés par mission (complète, partielle, échec), confirmés par une **visite instrumentée** de la page publiée (opacité et transformation relevées toutes les 50 à 100 ms pendant le défilement ou le survol).
- **Après chaque mission** : note de difficulté (SEQ, 1 à 7), « Racontez-moi ce qui se passera pour un visiteur » (comparé au site réel), deux questions propres à la mission. **Débriefing** de dix questions ouvertes.
- **Aides graduées** (relance neutre, orientation, indication directe), données seulement sur blocage déclaré ; **budget** de 40 actions par mission.
- **Pré-enregistré** : dix hypothèses avec leurs seuils, grille d'observation (codes d'événements, gravité de 0 à 4), règles de rétention d'un problème et test « problème d'interface ou artefact du dispositif » (A1 à A8), fixés avant la première séance.

### 2.5 Mesures pour réduire les biais

1. **Protocole à l'aveugle** : ni l'interface, ni le code, ni les audits précédents (évite de confirmer l'audit n°5 par construction).
2. **Pré-enregistrement** : hypothèses, seuils, critères et règles d'analyse figés avant les séances ; les écarts sont consignés dans deux addendums datés.
3. **Consignes en langage client**, sans vocabulaire d'interface.
4. **Perception humaine seulement** : captures d'écran, souris et clavier ; lecture de la page, code et documentation interdits (contrôlé automatiquement dans chaque trace : aucun écart).
5. **Personas contrastées**, avec une liste explicite de mots inconnus, une manière d'explorer et une règle d'abandon chiffrée ; « vous n'êtes pas testeur » ; abandon permis.
6. **Deux modèles** parmi les participants et entre codeurs, pour limiter l'uniformité des réflexes.
7. **Consignes révélées une à une**, modérateur en script fermé, aides seulement sur blocage déclaré.
8. **Copie du site par participant et par mission**, stockage local vidé avant chaque mission : aucun état partagé.
9. **Réussite mesurée sur le site enregistré** et le journal horodaté des modifications, confirmée par visite instrumentée ; le récit du participant est comparé au site.
10. **Observateurs sans les hypothèses**, codage de la trace brute cité ; **double codage** indépendant de deux séances par un autre modèle.
11. **Synthèse à l'aveugle** vis-à-vis des audits, puis comparaison séparée.
12. **Tout résultat contraire rapporté** au même niveau que les autres, avec les limites du dispositif.

### 2.6 Environnement

Copie isolée d'Atelier (commit `fc1764d`, stockage fichiers, sans les données réelles), site d'exemple « Maison Aurèle », 25 copies préparées. État de départ commun : accueil sans aucun mouvement, y compris les survols animés des styles partagés. Navigateur intégré, écran de 1 440 × 900 vu en 800 × 500, loupe pour lire les petits textes. Les adaptations propres à la copie de test (listes déroulantes rendues dans la page, onglet simulé pour l'Aperçu) n'ont pas été reportées dans le dépôt.

### 2.7 Incidents du dispositif et traitement

Aucun de ces incidents ne vient d'Atelier ; tous sont consignés dans les addendums.

| Incident | Effet | Traitement |
|---|---|---|
| Listes déroulantes natives invisibles dans les captures | 3 participants bloqués en T1 (première vague) | listes rendues dans la page (copie de test seulement) |
| Onglets d'arrière-plan non repeints, puis captures impossibles, puis arrêt de la session | séances en parallèle interrompues | **première vague requalifiée en pilote** (hors chiffres) ; **deuxième vague** reprise de zéro, une séance à la fois |
| « Aperçu » et « Tester sur le site » s'ouvraient dans le même onglet ; au retour, éditeur périmé | P1 (première instance) a cru son travail perdu ; P3 en T2 | onglet simulé par-dessus l'éditeur ; P1 reprise de zéro |
| Captures en retard d'une image | P3, P1, P5 : actions gonflées, loupe inopérante ; 3 actions perdues sur 158 (P1), 32 à 38 sur 162 (P5) | règle de la **capture double** pour P2 et P4 ; test d'artefact A1 appliqué partout |
| Pensée à voix haute des participants Opus en partie dans leur réflexion interne | traces plus lacunaires pour P1, P4 et P5 | traces réextraites avec ces passages ; codages refaits |
| Refus de lecture d'une consigne en fichier, filtre au lancement de P4, limite d'usage pendant un codage | aucune donnée perdue | consignes intégrées au message de lancement ; relances |

Seule la deuxième vague compte. Les 25 missions sont valides (aucune invalidation).

---

## 3. Résultats par mission

### 3.1 Tableau des statuts

Cellule : position dans la séance · statut · fin. **C** réussite complète, **P** partielle, **E** échec.

| Participant | T1 | T2 | T3 | T4 | T5 |
|---|---|---|---|---|---|
| P1 Nathalie (débutante) | 1 · C · terminé | 2 · E · terminé | 3 · P · abandon (aide 1) | 5 · E · abandon | 4 · C · terminé |
| P2 Claire (designer) | 1 · C · terminé | 4 · C · budget | 2 · P · budget | 5 · E · budget (aides 1 et 2) | 3 · C · terminé |
| P3 Karim (débutant) | 1 · C · terminé | 3 · E · budget | 4 · P · abandon | 5 · E · terminé | 2 · C · terminé |
| P4 Julien (designer) | 1 · C · terminé | 2 · E · budget | 4 · C · terminé | 5 · E · budget | 3 · C · budget |
| P5 Élodie (designer) | 1 · C · terminé | 3 · C · budget | 2 · P · budget | 5 · E · budget | 4 · C · terminé |

**Réussite complète** : T1 5 sur 5 · T2 2 sur 5 · T3 1 sur 5 · T4 0 sur 5 · T5 5 sur 5. Fins : 12 « terminé », 10 au budget, 3 abandons ; 3 blocages déclarés ; 3 aides en tout.

| Mesure | T1 | T2 | T3 | T4 | T5 |
|---|---|---|---|---|---|
| SEQ médiane (1 très difficile, 7 très facile) | 6 | 2 | 2 | 2 | 5 |
| Actions : médiane de P3, P1, P5 ; puis P2 · P4 (dispositif différent) | 15 ; 26 · 39 | 40 ; 40 · 40 | 30 ; 40 · 35 | 38 ; 39 · 40 | 26 ; 30 · 40 |
| Fausses pistes (actions perdues) | 1 (2) | 5 (46) | 6 (26) | 2 (15) | 1 (4) |

Un tiers à la moitié des actions sont des captures d'écran : les comptes d'actions décrivent, ils ne mesurent pas un effort réel.

### 3.2 T1 · Faire arriver un titre quand on descend jusqu'à lui — 5 sur 5

- **Parcours observé** : sélection du titre, rubrique « Animation » du panneau, choix « Apparition » (4 sur 5 ; P4, designer motion, compose à la main en mode Animation). Première action pertinente entre la 4e et la 6e action, identique chez débutants et designers (médiane 5 et 5).
- **Moment de lancement** : « entre dans l'écran, une seule fois » obtenu par 5 sur 5 **sans l'avoir choisi** ; il est proposé d'office. P1 : « je ne l'ai pas choisi, c'était déjà comme ça ».
- **Vérification** : 2 sur 5 regardent la page comme un visiteur avant de dire « terminé » (P1, P2), et ni l'un ni l'autre ne voit l'arrivée (déjà jouée au moment de la capture).
- **Frictions** : faibles. P4 valide un champ chiffré par Entrée sans que la valeur soit prise (PR13).
- **Réserve** : découverte probablement surestimée (tous savent que le sujet est le mouvement ; « arriver » dans la consigne est proche du libellé « Apparition »).

### 3.3 T2 · Comprendre pourquoi les plats ne bougent pas, et corriger — 2 sur 5

- **Préparé** : la liste « Plats » part « au chargement » ; les cartes sont donc déjà arrivées quand la visiteuse descend jusqu'à elles.
- **Diagnostic juste** : 3 sur 5 (P3, P5, P2), toujours grâce à la phrase de résumé (« Au chargement »). Non identifié : P1, P4.
- **Cinq chemins très différents** :
  - **P1** sélectionne une carte puis sa photo, lit « Apparition · Aucune », conclut « il n'y avait tout simplement aucun effet sur les plats » et ajoute un « Fondu en montant » sur la photo. Les photos arrivent, pas les cartes : **échec déclaré terminé** (PR3).
  - **P3** trouve la bonne cause en lisant la phrase de résumé, mais s'épuise à remonter de la carte à la liste par le fil d'Ariane (clics tombés à côté) : échec au budget (S1).
  - **P4** passe par la liste « Animations du site », ouvre l'animation homonyme « Fondu en montant · Plats » de la page **La carte** et y passe 24 actions sans relever le changement de page : échec au budget (PR4).
  - **P5** comprend, ne trouve pas comment changer « Au chargement » en « à l'entrée dans l'écran » sur l'animation existante et en crée une seconde : réussite, doublon en prime (PR12).
  - **P2** retire puis remet l'apparition, ce qui la relance au bon moment mais **décoche « les cartes une à une » sans prévenir** : réussite, perte silencieuse d'un réglage.
- **Coût** : 46 actions perdues en fausses pistes, le plus lourd de l'étude ; SEQ médiane 2.

### 3.4 T3 · Ralentir le grand titre, puis faire arriver les boutons après — 1 sur 5

- **Ralentir** : 5 sur 5 sans aide ; « Lente » choisi par 4 sur 5 en 4 à 13 actions. C'est le résultat de R1.
- **« Après le titre »** : seul P4 le réussit, en passant par le mode Animation et le champ « Départ ». P5 et P2 trouvent « Départ » et le comprennent, mais n'ont décalé qu'un bouton sur deux avant la fin du budget (et perdent des actions à cause de PR5).
- **Débutants** : P1 cherche une option « après le précédent » dans le panneau (« comme dans PowerPoint »), ouvre le mode Animation, voit le bouton « remplacé par un cadre en pointillés », se déclare bloquée, reçoit l'aide 1, puis abandonne. P3 ouvre le mode Animation, lit « image-clé » (« je capte pas ce mot »), « Ça fait beaucoup trop de trucs d'un coup », modifie un réglage par accident et abandonne.
- **SEQ médiane** : 2 (P4 : 6).

### 3.5 T4 · Raconter « La maison » comme une scène — 0 sur 5

- **Ce qui est atteint** : tous les éléments bougent (critère C1) chez P3, P1, P5 seulement ; P2 et P4 ne remplissent aucun critère.
- **Structure construite** : 4 participants posent **un effet par élément depuis le panneau**, chacun lancé à sa propre arrivée à l'écran, sans attente (P3, P1, P5, P2). Seul P4 compose un **événement unique** sur le bloc « Contenu » avec des départs décalés, ce que le modèle permet, mais n'atteint que 3 éléments sur 6 avant le budget (7 à 12 actions par élément).
- **Jamais obtenu par personne** : les chiffres l'un après l'autre, le léger dépassement avant de se poser, la scène rejouée à chaque passage.
- **Obstacles** : pas d'« après » dans le panneau (PR1) ; aucun bloc des trois chiffres atteint (PR6) ; « rejouer » introuvable (PR7, P4 le cherche dans le menu « Une fois / 2 fois / En boucle ») ; aucun effet tout prêt qui dépasse, courbe « Ressort » non trouvée (PR8, P5 : « ne propose pas d'effet « rebond » comme dans Elementor ») ; portée du composant « Chiffre clé » non dite (PR11).
- **Aides** : P2 reçoit les aides 1 et 2 (la seconde trop tôt, hors des conditions du protocole) ; son récit final affirme un ordre qui n'existe pas : **seul échec ignoré de l'étude**.
- **SEQ médiane** : 2. P4 : « Six éléments à poser un par un, avec leurs clés et leurs départs, ça dépasse de loin ce qu'on peut faire en 40 gestes. »

### 3.6 T5 · Calmer la pastille, réveiller le bouton — 5 sur 5

- **Retirer la boucle sans perdre l'arrivée** : 5 sur 5, entre la 8e et la 14e action ; l'arrivée n'est jamais perdue dans le journal. Le badge « 2 animations » → « 1 animation » sert de preuve (P3, P2, P5).
- **Survol du bouton** : 5 sur 5 ; « Soulever » avec retour automatique chez 4 sur 5 ; aucune confusion avec le bouton « Réserver » de l'en-tête. P4 compose le survol à la main : le bouton revient d'un coup quand la souris part, et rien ne le dit (« je ne sais pas », constat 3).
- **Frictions** : le clic sur la pastille ou le bouton sélectionne leur texte (PR10), parade apprise pendant la séance.
- **SEQ médiane** : 5.

---

## 4. Le parcours étape par étape

Étapes définies par le protocole (§ 9.5). « Fins non terminées » : missions finies au budget ou par abandon, rattachées à l'étape de l'événement qui les a causées. Valeur : codes de satisfaction ou de valeur (+) et de frustration ou de perte de valeur (−), verbaux et déclaratifs réunis.

| Étape | Ce qui marche | Ce qui casse | Fins non terminées | Valeur + / − |
|---|---|---|---|---|
| **Découvrir** (trouver où agir, désigner l'élément) | rubrique « Animation » trouvée en T1 par 5 sur 5 | clic qui sélectionne le texte ou l'image intérieurs (PR10, 5 sur 5) ; « Aucune » sur un élément animé par son parent (PR3) ; inventaire qui mène à une autre page (PR4) ; fil d'Ariane difficile à viser (S1) | 3 | 8,5 / 13,5 |
| **Choisir** (quel effet) | effet tout prêt posé en T1 par 4 sur 5, et en T4 élément par élément par 4 sur 5 | aucun effet tout prêt qui dépasse (PR8) ; portée d'un composant non dite (PR11) | 1 | 21 / 16 |
| **Lancer** (quand) | « entre dans l'écran » proposé d'office : 5 sur 5 | changer le moment d'une animation existante (PR12) ; « rejouer à chaque passage » (PR7) | 0 | 5 / 5,8 |
| **Régler** (vitesse, durée) | titre ralenti par 5 sur 5 | vitesse active indiscernable (PR14) ; Entrée qui ne valide pas (PR13, à vérifier) | 0 | 7 / 10,3 |
| **Composer** (ordre, attente, plusieurs éléments) | T3 complète : 1 sur 5 (P4) | pas d'« après » dans le panneau (PR1) ; mode Animation qui fait reculer (PR2) ; animation précédente gardée (PR5) ; bloc des chiffres introuvable (PR6) ; coût piste par piste (PR9) | **7** | **3,5 / 49,8** |
| **Vérifier** (ce que verra le visiteur) | phrase de résumé lue et utilisée par 5 sur 5 ; « Tester sur le site » a montré un mouvement à 3 participants | vérification avant « terminé » rare (2 sur 5 en T1) ; « Tester sur le site » ouvert en haut de page (S15) ; éclair jamais vu | 2 (missions réussies sans le savoir) | 14,5 / 15 |
| **Retirer** | boucle retirée sans perdre l'arrivée : 5 sur 5 | — | 0 | 12,5 / 1,5 |

**Lecture.** Le parcours tient tant qu'il s'agit d'un élément et d'un effet : découvrir, choisir, lancer, régler et retirer se passent bien, parce que le choix tout prêt décide pour l'utilisateur. Il casse dès qu'il faut **relier des éléments dans le temps** : c'est là que se concentrent la moitié de la frustration exprimée et 7 des 13 missions non terminées, et le comportement concorde avec le déclaratif. La deuxième zone fragile est **le diagnostic d'une animation existante** : ce qu'on lit sur l'élément sélectionné (« Aucune ») ou dans l'inventaire (une homonyme d'une autre page) peut induire en erreur.

---

## 5. Compréhension : ce que les participants croient que verra le visiteur

Après chaque mission, le participant raconte ce que vivra un visiteur ; le récit est comparé au site enregistré (quoi, quand, comment, combien).

| | Récit sans écart matériel | Récit avec écart matériel |
|---|---|---|
| **Réussite complète** | **13** · réussite comprise (T1 ×5, T5 ×5, P2-T2, P5-T2, P4-T3) | **0** · réussite non comprise |
| **Partielle ou échec** | **11** · échec lucide | **1** · échec ignoré (P2-T4) |

- **Les participants savent presque toujours ce qu'ils ont produit**, y compris quand c'est un échec : 24 récits sur 25 sans écart. La phrase de résumé en est la source principale.
- **L'unique échec ignoré** (P2-T4, « dans cet ordre, puisque je les ai réglés un par un ») suit une aide donnée hors des conditions du protocole : il est contaminé.
- **Cas à nommer** : 3 réussites que le participant ignore (P5-T2, P2-T2, P4-T5, arrêtées au budget) ; 2 échecs déclarés « terminé » avec un récit exact (P1-T2 : « Je ne suis pas sûre que ce soit exactement ce qu'on avait promis à Aurèle » ; P3-T4 : « Ça se peut très bien que tout arrive en même temps ou presque »). Autrement dit, on sait ce qu'on a fait, mais pas toujours si c'est ce qui était demandé.
- **Réserves fortes** : les récits sont comparés au site enregistré, pas à ce qu'un visiteur perçoit ; aucun participant n'a vu un mouvement en continu ; l'« éclair » avant l'apparition n'apparaît dans aucun récit ; les agents lisent les textes longs et s'y fient plus que de vraies personnes. La concordance est probablement surestimée.

---

## 6. Problèmes retenus

Règle fixée à l'avance (protocole § 11.2) : un problème est retenu s'il est **observé dans le comportement**, chez 2 participants ou avec une gravité d'au moins 3 chez 1, et s'il passe le test d'artefact (problème d'interface, ou amplifié par le dispositif). Gravité : 0 remarque, 1 gêne, 2 détour, 3 échec d'un critère ou perte importante, 4 échec de la mission ou abandon. Classement : gravité, puis nombre de participants.

### 6.1 Récapitulatif

| Rang | Problème | Gravité | Participants | Mission | Nature (constats du préparateur) |
|---|---|---|---|---|---|
| PR1 | Pas d'« après » ni d'attente dans la rubrique « Animation » du panneau | 4 | 4 (P1, P3, P5, P2) | T3, T4 | fonction présente ailleurs (« Départ », mode Animation) |
| PR2 | Le mode Animation fait reculer | 4 | 4, bloquant chez les 2 débutants | T3 | manque de mots et d'état |
| PR3 | Une carte animée par sa liste affiche « Aucune » | 4 | 2 (P1, P5) | T2 | cause non vérifiée |
| PR4 | « Animations du site » mène à l'homonyme d'une autre page | 4 | 1 (P4) | T2 | cause non vérifiée ; possible effet d'ordre |
| PR5 | En mode Animation, cliquer un autre élément garde l'animation précédente | 3 | 3 designers | T3 | cause non vérifiée |
| PR6 | Aucun bloc des trois chiffres atteint pour les échelonner | 3 | 2 (P1, P2) | T4 | présente ailleurs (« Cible · Ses enfants, un à un ») ; amplifié |
| PR7 | « Rejouer à chaque passage » introuvable | 3 | 2 (P1, P4) ; critère raté par 5 | T4 | présente ailleurs (réglages du déclencheur) |
| PR8 | Aucun effet tout prêt qui dépasse ; « Ressort » non trouvé | 3 | 2 (P5, P1) ; critère raté par 5 | T4 | présente ailleurs et absente des choix tout prêts |
| PR9 | Composer piste par piste coûte 7 à 12 actions par élément | 3 | 1 (P4) | T4 | en partie présente ailleurs ; amplifié |
| PR10 | Un clic sélectionne le texte ou l'image contenus | 2 | 5 | T2, T3, T5 | cause non vérifiée |
| PR11 | Portée d'un réglage de composant non dite | 2 | 3 (P1, P3, P5) | T4 | défaut |
| PR12 | Moment de lancement d'une animation existante introuvable | 2 | 2 designers | T2 | présente ailleurs (réglages du déclencheur) |
| PR13 | Entrée dans un champ chiffré : valeur prise seulement au changement de champ | 2 | 2 designers | T1, T3 | à vérifier (le code dit l'inverse) |
| PR14 | Vitesse active indiscernable (« Rapide · Nor… · Lente ») | 1 | 2 designers | T3 | possible effet d'ordre |

**Constat transversal.** Les cinq fonctions cherchées et non trouvées (attente, rejouer, changer le moment, enfants un à un avec décalage, ressort) **existent toutes, et toutes dans le mode Animation**, alors qu'on les cherche dans le panneau, à côté de l'effet. Le problème dominant n'est pas l'absence de fonctions, mais leur étage.

### 6.2 Détail

**PR1 · Faire partir un élément « après » un autre : rien dans la rubrique « Animation » du panneau.**
- Observé chez P1 et P3 (débutants), P5 et P2 (designers) ; P4, passé d'emblée par le mode Animation, ne le rencontre pas. 4 occurrences de gravité 4 (dont le blocage, l'aide et l'abandon de P1 en T3).
- « Je n'y trouve pas d'option « après le précédent » comme dans PowerPoint, donc j'essaie « Ouvrir dans le mode Animation » pour voir plus de réglages. » (P1) · « Dans ce logiciel, le délai n'est pas dans le panneau de l'élément : il faut passer par l'écran à pistes, un élément à la fois, et je n'en avais plus le budget. » (P5)
- Cause : absent du panneau par conception ; « Départ » en mode Animation le permet (constat 9). Les deux designers qui l'ont trouvé n'ont décalé qu'un bouton sur deux avant le budget.

**PR2 · Le mode Animation fait reculer : mots inconnus, écran chargé, élément montré comme un cadre vide ; « Départ » vu mais pas utilisé.**
- Évitement ou abandon chez les 2 débutants ; « piste » et « image-clé » contournés sans effet sur le résultat chez 2 designers. Bloquant chez les débutants seulement.
- « Y'a marqué "image-clé" aussi, je capte pas ce mot. » puis « Ça fait beaucoup trop de trucs d'un coup. » (P3) · « le bouton « Réserver une table » a disparu, remplacé par un cadre en pointillés » (P1)
- Réserve : ces mots figuraient dans les listes « vocabulaire inconnu » des personas ; le résultat est en partie écrit d'avance. La modification accidentelle d'un réglage (P3) passe par une liste remplacée par le dispositif et ne fonde rien.
- Qualifié par le constat 11 : l'encart « Comment ça marche » (R3) n'est pas affiché quand on arrive par « Ouvrir dans le mode Animation » sur un élément déjà animé, chemin de P1 en T3.

**PR3 · Une carte (ou sa photo) affiche « Apparition · Aucune » alors qu'elle est animée par sa liste « Plats ».**
- P1 (origine de son échec déclaré terminé), P5 (10 actions perdues). P3 et P2 arrivent sur la liste par accident.
- « La photo n'a aucun effet d'animation configuré, ce qui explique pourquoi rien ne bouge malgré ce qu'on avait promis à Aurèle. » (P1) · « La carte du plat n'a aucune animation configurée, ce qui explique son immobilité » (P5)
- Information fausse pour l'utilisateur au moment du diagnostic.

**PR4 · La liste « Animations du site » emmène sur l'animation homonyme d'une autre page.**
- P4 seul, 24 actions sur la page La carte, échec au budget ; « · La carte » était lisible. Observé à la position la plus précoce de T2 : possible effet d'ordre. **À confirmer avec de vraies personnes.**
- « La liste « Animations du site » m'a envoyé sur La carte, parce que c'est la seule page où il y a des « Plats ». » (P4)

**PR5 · En mode Animation, sélectionner un autre élément laisse ouverte l'animation précédente ; « + Ajouter » ajoute une piste au lieu d'ouvrir l'animation de l'élément cliqué.**
- 3 designers (P2, P5, P4) ; piste vide ajoutée par erreur chez P2 ; 9 à 13 actions perdues chez P5.
- « la piste affichée est toujours celle de « Réserver une table » » (P2)

**PR6 · Aucun bloc des trois chiffres n'est atteint pour les faire partir l'un après l'autre.**
- P1, P2 ; amplifié par le pointage sur captures chez P2 (gravité ramenée à 3). **À confirmer avec de vraies personnes.**
- « Je n'arrive pas à sélectionner le regroupement des trois chiffres : ni le fil d'Ariane, ni Échap, ni le clic droit ne me font remonter au-delà du texte « 12 » lui-même. » (P2)
- La cible « Ses enfants, un à un » et le « Décalage » existent sur la piste, sans avoir été ouverts (constat 7) ; l'existence d'un bloc ne contenant que les trois chiffres reste à vérifier.

**PR7 · Personne ne trouve comment faire rejouer la scène à chaque passage.**
- Cherché sans succès par P1 et P4 ; non traité par les trois autres. Critère raté par 5 sur 5.
- « le paramètre « une seule fois » … contredit la demande d'Aurèle de la répéter à chaque fois, mais je ne trouve pas encore où le modifier » (P1) · « Rien qui ressemble à « rejouer chaque fois que la section revient à l'écran » » (P4)
- L'interrupteur « Rejouer » est dans les réglages du déclencheur (constat 6) ; P4 le cherche dans le menu des répétitions de la ligne de temps. La phrase de résumé informe (« une seule fois ») sans mener au réglage.

**PR8 · Aucun choix tout prêt ne dépasse sa place avant de se poser ; la courbe « Ressort » n'est trouvée par personne.**
- P5 (recherche explicite, prend « Zoom » à défaut), P1. Critère raté par 5 sur 5.
- « La liste d'animations ne propose pas d'effet « rebond » comme dans Elementor ; je choisis donc « Zoom » comme alternative la plus proche. » (P5)

**PR9 · Composer une scène piste par piste coûte 7 à 12 actions par élément.**
- P4 seul ; environ 23 gestes hors captures pour 3 éléments sur 6. Amplifié par le budget qui compte les captures. **À confirmer avec de vraies personnes, sans limite d'actions.**

**PR10 · Un clic sur un bouton, une pastille ou une carte sélectionne le texte ou l'image qu'ils contiennent.**
- 5 sur 5, 16 occurrences ; parade apprise pendant la séance par P1, P2, P5 (clic sur le bord, remontée).
- « Comme pour la pastille, j'ai encore sélectionné le texte à l'intérieur du bouton. » (P3) · « J'ai encore sélectionné le texte au lieu du bouton « Réserver une table », c'est agaçant sur ce type d'élément. » (P4)
- Si l'on imputait l'échec de P3 en T2 à la première sélection de l'image plutôt qu'aux clics manqués sur le fil d'Ariane, PR10 serait de gravité 4 et passerait en tête.

**PR11 · La portée d'un réglage posé dans le composant « Chiffre clé » n'est pas dite, et le panneau nomme « Texte « 12 » » quand on clique « 38 ».**
- P1, P3, P5 ; aucune modification involontaire dans l'étude.
- « Je ne parviens pas à savoir si le réglage « Zoom, 1 animation » s'applique au « 12 », au « 38 » ou aux deux, ce qui m'embrouille. » (P1)

**PR12 · Changer le moment de lancement d'une animation existante : non trouvé, contournements coûteux.**
- P5 crée un doublon ; P2 retire puis remet l'apparition et perd « les cartes une à une » sans avertissement.
- « Je n'ai pas non plus trouvé comment simplement changer le « Au chargement » en « À l'entrée dans l'écran » sur l'animation existante, ce qui aurait gardé le « un à un ». » (P5)

**PR13 · Une valeur saisie dans un champ chiffré et validée par Entrée n'est enregistrée qu'au changement de champ.**
- P5 (aucune entrée du journal 16 s après Entrée, enregistrement juste après Tab), P4 (même constat en capture double). Le code valide pourtant à Entrée (constat 10) : **à vérifier techniquement**.

**PR14 · La vitesse active ne se distingue pas, « Normal » est tronqué.**
- P2, P5, tous deux en T3 en position 2 : possible effet d'ordre. Résidu de R1.

---

## 7. Signaux faibles

Problèmes observés mais non retenus, avec la raison.

| Signal | Observé | Pourquoi non retenu |
|---|---|---|
| S1 · Fil d'Ariane difficile à viser ; après une remontée trop haute, le niveau inférieur disparaît | P3 (origine de son échec en T2), P2 | pointage sur capture réduite : artefact probable. C'est pourtant l'échec le plus lourd non imputé à l'interface : **à confirmer avec une vraie souris** |
| S2 · Vérifier comme un visiteur sans voir l'arrivée (déjà jouée) | P1, P2, P3, P4 | artefact probable des captures |
| S3 · Clics entre lignes voisines (liste, « Lente », liens) | P2, P3 | artefact probable |
| S4 · Liste qui ne se ferme pas à Échap ; clic à côté qui applique « Rotation continue » | P3, P2 | listes remplacées par le dispositif |
| S5 · Retour de l'Aperçu en haut, sans sélection | P3 | incident du dispositif corrigé ensuite |
| S6 · Gestes Figma sans effet (Échap pour remonter, clic droit, double-clic) | P2 | 1 participant, gravité 1 |
| S7 · Barre d'outils de texte par-dessus le bouton pendant le survol | P5 | 1 participant |
| S8 · Espace ne lance pas la lecture ; canevas qui ne suit la tête de lecture qu'après une lecture | P4 | 1 participant, gravité 1 |
| S9 · Deux « boucles » voisines (« Lire en boucle » et « Une fois ») | P4 | 1 participant, gravité 1 |
| S10 · Chevron d'une ligne d'animation qui ouvre la composition au lieu de déplier | P4 | 1 participant, gravité 1 |
| S11 · Retour du survol non représenté | P4, déclaratif | défaut réel (constat 3) mais sans comportement associé |
| S12 · Mots : « Au survol », « base de données », « champ », « ms », « Netteté », « Naturel (par défaut) », « aller-retour » | P1, P3, P4, P5 | déclaratif ou sans effet sur le résultat |
| S13 · Élément qui semble disparaître juste après le choix d'un effet | P1, P3 | captures en retard |
| S14 · Aucune vérification en vue visiteur sur toute une séance | P5 | conforme à la persona ; pas un endroit de l'interface |
| S15 · « Tester sur le site » ouvert en haut de page ou sur une autre page | P2, P4 | défilement postérieur à la capture non exclu ; cause non établie |
| S16 · « Aucune sélection multiple » | P4, déclaratif | non vérifiable dans les captures |

---

## 8. Ce qui fonctionne (à préserver)

Ce n'est pas du remplissage : toute évolution doit garder ces passages intacts.

| Passage | Occurrences |
|---|---|
| Trouver où agir sur le mouvement d'un élément, au premier contact | T1 : 5 sur 5, première action pertinente entre 4 et 6, SEQ 5 ou 6 ; « Je l'ai trouvée vite parce que le mot est clair. » (P5) |
| **Le choix tout prêt pose d'office le bon moment de lancement** | « entre dans l'écran, une seule fois » : 5 sur 5 sans le décider. Le modèle « déclencheur d'abord » est invisible pour le débutant, et c'est ce qui le rend tenable pour lui |
| Poser un effet tout prêt par élément | 4 sur 5 en T1 ; 4 sur 5 élément par élément en T4 (6 actions par élément, sans erreur, chez P2) |
| **Phrase de résumé sous l'effet (R2)** | lue et utilisée par 5 sur 5 ; seule source du diagnostic juste de T2 chez P3 et P2 ; citée comme ce qu'il y a de plus clair par P1, P2, P4, P5 ; « C'est la meilleure idée de l'outil » (P4) |
| Ralentir (R1) | 5 sur 5 sans aide ; « Lente » choisi par 4 sur 5 |
| Retirer la seule boucle d'un élément qui porte deux mouvements | 5 sur 5, arrivée jamais perdue |
| Faire réagir le bon bouton au survol | 5 sur 5 ; « Soulever » avec retour automatique chez 4 sur 5 |
| Badge « n animations » comme preuve d'un retrait | P3, P2, P5 |
| « Départ » compris comme une attente par les designers | 3 designers sur 3 ; P4 en tire la seule réussite de T3 |
| « Tester sur le site » (R4) comme vue du visiteur | a montré un mouvement en cours chez P1, P2, P4 ; cité comme utile par P1, P2, P3 |
| Images-clés qui suivent la durée | compris sans aide par P4 |

---

## 9. Hypothèses

Seuils fixés avant les séances, appliqués tels quels. « Confirmée » veut dire « compatible avec les données de cette étude », jamais « démontrée ».

| Hypothèse | Statut | Chiffres | Réserves |
|---|---|---|---|
| **H1** Trouver par où commencer coûte au moins deux fois plus aux débutants | **Infirmée** | première action pertinente en T1 : médiane 5 chez les débutants, 5 chez les designers | découverte des débutants probablement surestimée (sujet connu, « arriver » proche d'« Apparition ») |
| **H2** « À l'ouverture de la page » et « quand on arrive dessus » sont confondus (au moins 2 sur 5) | **Confirmée** | T1 : 0 sur 5 ; T2 : cause non identifiée par 2 (P1, P4) | aucun des deux cas ne montre la confusion elle-même : P1 est trompée par « Aucune » (PR3), P4 n'atteint pas les cartes (PR4). En T1 le moment était proposé d'office |
| **H3** Au moins 30 % des récits du visiteur sont faux | **Infirmée** | 1 récit sur 25 (4 %), contaminé ; 4 sur 25 en cotant les cas limites | récits comparés au site, pas au vécu ; agents qui lisent les textes |
| **H4** Moins de la moitié vérifient en visiteur avant « terminé » en T1 | **Confirmée** | 2 sur 5 | trois personas étaient décrites comme vérifiant peu : en partie écrit d'avance |
| **H5** Ralentir se trouve, faire attendre beaucoup moins | **Confirmée** | titre ralenti 5 sur 5 ; boutons après le titre 1 sur 5 | reflète un choix de conception (délai absent du panneau) |
| **H6** Au moins 2 designers sur 3 composent la scène de T4 | **Infirmée** | 0 sur 3 | budget qui compte les captures ; aide hors conditions chez P2 ; T4 en dernier aurait dû aider |
| **H7** La scène à événement unique n'est pas trouvée spontanément | **Indéterminée** | personne n'obtient le bon ordre complet | données manquantes par construction ; 4 lancements séparés, 1 événement unique (P4) |
| **H8** Retirer un seul des deux mouvements est source d'erreur | **Infirmée** | 0 sur 5 | forme testée : deux déclencheurs distincts ; animation partagée non testée |
| **H9** Les mots séparent les publics (designers à au plus 1 mot inconnu) | **Infirmée** | débutants 5 et 7 mots ; designers médiane 2 | les mots qui gênent les designers sont des noms de structure du mode Animation (« piste », « image-clé », « composant », « instance ») |
| **H10** La valeur apparaît au premier résultat et se perd au réglage | **Indéterminée** (indicative) | négatif majoritaire à Régler ou Composer (60 sur 116) ; positif à Choisir ou Vérifier non majoritaire (37 sur 73) | étapes codées de façon hétérogène ; déclaratif gonflé |

---

## 10. Valeur perçue

- **Pour le simple, oui, chez tous.** Les 5 jugent les effets simples faisables seuls ou rapides. P3 : « j'ai cliqué, trouvé "Animation" direct, choisi une vignette, et paf, ça avait l'air fait ».
- **Pour la mise en scène, non, chez personne.** Aucun designer ne l'envisage aujourd'hui pour une scène composée : « pas encore en production » (P5), « pas encore prêt pour nos juniors » (P4), « ça n'a pas sa place pour l'instant » (P2). Une valeur déclarée négative est plus crédible qu'une positive : la complaisance des agents pousse en sens inverse.
- **Où elle se perd** : à l'étape « composer », dans les deux publics (49,8 codes négatifs sur 116), là où naissent 7 des 13 missions non terminées. P1 : « Je me suis dit « ce n'est pas pour moi ». » P5 : « Ici, 40 actions ne m'ont même pas suffi pour poser les effets de base. »
- **Où elle apparaît** : dispersée ; chez les débutants à Choisir et Vérifier (20,5 codes sur 29), chez les designers aussi à Retirer (9,5) et Lancer (5).
- **Poids du déclaratif** : 62 des 73 codes positifs viennent des réponses aux questions ; P4 n'exprime aucune satisfaction pendant les missions. La valeur perçue est probablement gonflée.

---

## 11. Comparaison avec l'audit n°5

Faite après la synthèse, séparément. Rappel : l'audit était une inspection experte **avant** R1 à R4 ; les tests ont eu lieu **après**. Ils montrent comment se comporte la version corrigée, pas ce que les corrections ont changé. Dans l'audit, P1 à P7 sont des parcours ; ici, P1 à P5 sont des participants.

### 11.1 Ce que les tests confirment

| Constat de l'audit | Ce que montrent les tests |
|---|---|
| Pour un débutant, la promesse est tenue | T1 et T5 : 5 sur 5 ; les 2 débutants réussissent (découverte probablement surestimée) |
| Pour composer, le modèle ne se laisse pas deviner | T4 : 0 sur 5 ; T3 « après » : 1 sur 5 |
| L'utilisateur pense « élément d'abord » | 4 sur 5 posent un effet par élément et cherchent l'attente à côté de l'effet |
| Le vocabulaire du modèle arrête les débutants | PR2, bloquant chez les 2 débutants (en partie écrit d'avance) |
| Il manquait une phrase qui dise ce qui va se passer | la phrase (R2) est utilisée par 5 sur 5 |
| Une apparition ouverte à 0 ms fait croire qu'on a fait disparaître l'élément | cadre vide en pointillés chez P1 et P5, dans le recul devant le mode Animation |
| La boucle « régler, voir » ne va pas d'elle-même jusqu'au site | 2 sur 5 vérifient en T1 malgré « Tester sur le site » (preuve faible) |
| « Un seul endroit pour faire bouger » n'est pas tenu | 5 fonctions cherchées au mauvais endroit (section 6.1) |
| Le retour du survol n'est pas représenté | un survol composé à la main revient d'un coup, sans que rien le dise (signal faible) |

### 11.2 Ce que les tests contredisent ou nuancent

- **L'obstacle du designer n'est pas « où poser le déclencheur »** (R3). Presque personne n'atteint ce geste : 4 sur 5 composent depuis le panneau ; le seul qui compose en mode Animation (P4) pose correctement un événement unique. L'obstacle est en amont : pas d'« après » dans le panneau, et un mode Animation qui fait reculer.
- **Ralentir n'est plus le parcours le plus fragile** : 5 sur 5. L'interface a changé (R1) ; l'autre moitié du parcours P3 de l'audit, « partir plus tôt / après », est devenue le premier problème.
- **« Départ » et « Remplir avec » fonctionnent pour les designers** (3 sur 3), pas pour les débutants. La distinction de l'audit entre mots d'action (qui marchent) et noms de structure (qui gênent) est confirmée.
- **Comprendre le modèle ne suffit pas à composer** : P4, qui emploie tout le vocabulaire, échoue au budget avec 3 éléments sur 6. Les « ~13 gestes » de l'audit sont ceux d'un expert qui connaît le chemin (coût réel à confirmer).
- **Le partage qui coûte est en profondeur, pas entre voisins** : aucune hésitation observée entre chemins voisins ; ce qui coûte, c'est que le panneau et le mode Animation forment deux étages.
- **Retirer une animation n'a posé aucun problème** (5 sur 5) ; la survie d'une animation partagée n'a pas été testée.
- **L'écart éditeur / site ne se retrouve pas dans les récits** (24 sur 25 exacts) ; sur la perception, rien n'est tranché.
- **Le ressort n'est pas un « moment où ça marche »** : personne ne le trouve.
- **L'inventaire des animations pose un problème de page plutôt que de longueur** (PR4, 1 participant).

**Non éprouvés par les tests, donc ni confirmés ni réfutés** : le défilement et ses millisecondes (R6), le choix entre préréglage de survol et état Survol (R7, volet voisins), « Personnalisée » (R8), le délai caché du déclencheur qui s'additionne au « Départ » (R5), la publication et « réduire les animations ».

### 11.3 Ce que les tests révèlent et que l'audit n'avait pas vu

1. **Aucune attente ni « après » là où l'on pose l'effet** (PR1) : le chemin réellement suivi (effet tout prêt sur chaque élément, puis chercher à les ordonner) ne figurait dans aucun des sept parcours de l'audit.
2. **Un élément animé par son parent affiche « Aucune »** (PR3) : le diagnostic d'une animation existante portée par un autre élément n'avait pas été parcouru.
3. **Modifier une animation existante** : « Quand » et « Rejouer » introuvables, pertes silencieuses (PR7, PR12, « une à une » décoché).
4. **Faire partir des éléments répétés l'un après l'autre** (PR6, PR9).
5. **En mode Animation, sélectionner un autre élément garde l'animation précédente** (PR5).
6. **Désigner ce qui doit bouger** : texte ou image intérieurs, fil d'Ariane (PR10, S1). Hors du champ que s'était donné l'audit, et pourtant l'étape qui coûte le plus souvent.
7. **La portée d'un réglage de composant n'est pas dite** (PR11).
8. **Défauts techniques** : l'éclair avant l'apparition sur le site ; la phrase « un à un » sans échelonnement réel ; l'encart de R3 jamais vu en arrivant du panneau (constats 1, 2, 11).

### 11.4 Effet de R1 à R4 (comportement de la version corrigée)

| Recommandation | Utilisée | Comprise | Suffisante |
|---|---|---|---|
| **R1** « Durée » = vitesse ; Rapide · Normale · Lente | oui : « Lente » chez 4 sur 5 | oui : titre ralenti par 5 sur 5 | pour ralentir, oui ; résidu : vitesse active indiscernable (PR14) |
| **R2** Phrase de résumé | oui : 5 sur 5 | oui : 24 récits sur 25 exacts | **non** : n'aide pas quand l'animation est portée par un parent (PR3) ; dit « une seule fois » sans mener au réglage (PR7) ; peut annoncer « un à un » à tort (constat 2) |
| **R3** Modèle dit à l'entrée du mode Animation ; « Animer « élément » » | **non établi** : aucune lecture rapportée ; **vérifié dans le code, l'encart n'est pas affiché quand on arrive par « Ouvrir dans le mode Animation » sur un élément déjà animé** (constat 11) | non établi | **non pour les débutants** (PR2) ; passage d'un élément à l'autre confus pour les designers (PR5) |
| **R4** « Tester sur le site » | oui : 4 sur 5 en T2 | oui : a montré un mouvement à 3 participants | non établi : ouverture en haut de page chez 2 (S15, cause non établie) ; mène là où l'éclair se voit |

**En bref** : R1 et R2 sont utilisées et comprises par tous, avec des limites précises. R3 n'a aucun effet lisible, en partie parce que son texte n'est pas montré à ceux qui en ont besoin. R4 est utilisée et utile, fiabilité de l'ouverture à vérifier. Aucune ne traite le premier problème de l'étude (PR1).

### 11.5 R5 à R11 à la lumière des tests

| Recommandation | Verdict | En une ligne |
|---|---|---|
| R5 · Un seul délai visible | **À reformuler** | besoin d'attente confirmé (PR1), mais cherché dans le panneau, pas dans la ligne de temps |
| R6 · Défilement en % | **Sans appui** (non testé) | constat d'inspection toujours valable ; à inclure dans un prochain test |
| R7 · Relier les endroits | **À reformuler** | volet voisins sans appui ; volet profondeur (panneau → mode Animation) fortement appuyé |
| R8 · « Personnalisée » | **Sans appui** | aucune observation ; son esprit (dire ce qui a changé) est repris dans l'action 4 |
| R9 · Animations empilées | **Moins prioritaire** | 1 doublon, qui naît de PR12 : à traiter à la source |
| R10 · Ouvrir sur l'état visible | **Confirmée** | cadre vide chez P1 et P5 |
| R11 · Un mot par geste | **À reformuler, moins prioritaire** | retrait sans problème ; les mots en cause sont les noms de structure du mode Animation et les états faux (« Aucune », « Texte « 12 » ») |

---

## 12. Plan d'action consolidé

**Règle de classement** : d'abord l'effet estimé (gravité × participants) ; puis la solidité de la preuve ; enfin, à niveau voisin, ce qui donne une information fausse passe avant ce qui la rend seulement difficile à trouver. Ce sont des **intentions pour l'utilisateur**, pas des maquettes ; les solutions restent à concevoir.

| Rang | Action | Problèmes | Nature | Preuve |
|---|---|---|---|---|
| 1 | Dire « après » ou « attendre » là où l'on pose l'effet | PR1 (+ R5, R7) | fonction hors de portée | observé chez 4 sur 5 |
| 2 | Que le site joue ce que l'éditeur annonce | constats 1 et 2 | défaut | code et visites instrumentées, non perçu |
| 3 | Rendre le mode Animation abordable pour qui vient du panneau | PR2, constat 11 (+ R10, R11) | manque de mots et d'état | observé chez 4 sur 5, bloquant chez 2 |
| 4 | Retrouver et corriger une animation existante là où on la lit | PR3, PR12, PR4, « une à une » perdu (+ R8, R9) | manque, découvrabilité | observé chez 2, 2 et 1 |
| 5 | Trouver « à chaque passage » et une arrivée qui dépasse là où on les cherche | PR7, PR8 (+ R7) | découvrabilité ; absent des choix tout prêts | critères ratés par 5 sur 5 |
| 6 | Désigner du premier coup ce qui doit bouger | PR10, S1 | manque | observé chez 5, pointage amplifié |
| 7 | Passer d'un élément à l'autre dans le mode Animation sans ambiguïté | PR5 | manque | observé chez 3 designers |
| 8 | Faire partir un groupe d'éléments répétés l'un après l'autre | PR6, PR9 | découvrabilité | observé chez 3, amplifié |
| 9 | Dire la portée d'un réglage de composant au moment où on le pose | PR11 | défaut | observé chez 3 |
| 10 | Vérifier et finir les corrections déjà faites | PR13, PR14, S15 | défauts à vérifier | observé chez 2, 2 et 2 |

### 1 · Dire « après » ou « attendre » là où l'on pose l'effet
- **Traite** : PR1 ; réduit le nombre de débutants envoyés vers le mode Animation (PR2). Reprend R5 reformulée et le volet profondeur de R7.
- **Effet attendu** : « les boutons après le titre » et l'ordre d'une scène deviennent atteignables sans changer de mode, en mots d'usage ; une seule valeur d'attente, retrouvée à l'identique dans la ligne de temps.
- **Preuve** : 4 sur 5, gravité 4, cause visible dans les captures. À confirmer chez de vrais débutants, pour qui « après » était un test de limite.

### 2 · Que le site joue ce que l'éditeur annonce
- **Traite** : l'éclair avant l'apparition à l'entrée dans l'écran (constat 1) ; la phrase « un à un » sans échelonnement (constat 2). Condition pour que R4 montre ce qu'on a réglé.
- **Effet attendu** : l'arrivée réussie par 5 sur 5 en T1 est propre pour le visiteur ; la phrase de résumé, dont tout le monde se sert, reste exacte.
- **Preuve** : défauts vérifiés dans le code et par 5 visites instrumentées ; perçus par aucun participant. Seule action qui ne repose pas sur un comportement observé ; classée haut parce qu'elle touche le chemin le plus emprunté, le visiteur final, et que sa cause est établie.

### 3 · Rendre le mode Animation abordable pour qui arrive du panneau
- **Traite** : PR2 ; constat 11 (l'explication de R3 n'est pas montrée à qui arrive du panneau sur un élément déjà animé) ; reprend R10 et le volet vocabulaire de R11.
- **Effet attendu** : en arrivant du panneau, on comprend ce que chaque zone règle sans connaître « piste », « image-clé », « cible », « décalage », et on voit l'élément tel qu'il apparaîtra.
- **Preuve** : 4 sur 5, bloquant chez les 2 débutants ; en partie écrit d'avance par les personas. Priorité à revoir une fois l'action 1 livrée.

### 4 · Retrouver et corriger une animation existante là où on la lit
- **Traite** : PR3, PR12, PR4, perte silencieuse de « une à une » ; esprit de R8 et R9.
- **Effet attendu** : un élément animé par un parent le dit dans sa propre rubrique et mène au porteur ; le moment de lancement se change là où on le lit, sans doublon ni perte ; l'inventaire dit la page de chaque animation et prévient quand on en change.
- **Preuve** : PR3 chez 2 (gravité 4) ; PR12 chez 2 designers ; PR4 chez 1 (possible effet d'ordre).

### 5 · Trouver « à chaque passage » et une arrivée qui dépasse là où on les cherche
- **Traite** : PR7, PR8. « Rejouer » est au même endroit que le « Quand » de l'action 4 : à concevoir ensemble.
- **Effet attendu** : la mention « une seule fois » devient actionnable ; une arrivée qui dépasse avant de se poser s'obtient parmi les choix tout prêts.
- **Preuve** : critères ratés par 5 sur 5 ; problème chez 2 participants chacun ; T4 toujours en dernière position.

### 6 · Désigner du premier coup ce qui doit bouger
- **Traite** : PR10, S1.
- **Effet attendu** : un clic sur un bouton, une pastille ou une carte désigne l'élément voulu, ou permet d'y remonter sans viser de petites cibles.
- **Preuve** : 5 sur 5, gravité 2 ; S1 classé artefact probable ; à confirmer avec une vraie souris.

### 7 · Passer d'un élément à l'autre dans le mode Animation sans ambiguïté
- **Traite** : PR5.
- **Effet attendu** : en sélectionnant un autre élément, on choisit clairement entre ouvrir son animation et l'ajouter à la scène en cours.
- **Preuve** : 3 designers, gravité 3.

### 8 · Faire partir un groupe d'éléments répétés l'un après l'autre
- **Traite** : PR6, PR9 ; prolonge l'action 1.
- **Effet attendu** : une série (chiffres, cartes) part l'un après l'autre sans chercher un bloc parent ni poser une piste par élément.
- **Preuve** : observé chez 2 et 1, amplifié par le budget ; à confirmer sans limite d'actions.

### 9 · Dire la portée d'un réglage de composant au moment où on le pose
- **Traite** : PR11 (constat 4).
- **Effet attendu** : on sait avant de valider que le réglage vaudra pour toutes les occurrences, et le panneau nomme l'occurrence cliquée.
- **Preuve** : 3 participants, gravité 2 ; risque sur un vrai site supposé.

### 10 · Vérifier et finir les corrections déjà faites
- **Traite** : PR13 (Entrée dans un champ chiffré), PR14 (vitesse active), S15 (« Tester sur le site » ouvert au mauvais endroit).
- **Effet attendu** : une valeur validée au clavier est prise ; la vitesse choisie se lit d'un coup d'œil ; la boucle vers le site ouvre toujours sur l'élément.
- **Preuve** : 2 participants chacun ; vérifications techniques plutôt que tests.

**En réserve, non réfutées** : R6 (non testée), R8 (non observée), R7 volet survol, R11 volets retrait et « Netteté », R9 en tant qu'alerte séparée.

**À ne pas perdre** : le choix tout prêt qui pose d'office le bon moment de lancement, le retrait d'une boucle sans toucher à l'arrivée, la phrase de résumé (section 8).

---

## 13. Constats techniques du préparateur

Relevés dans le code ou par visite instrumentée, en marge du codage des participants. Ils qualifient les problèmes ; ils ne suffisent jamais à en retenir un.

### Défauts probables
1. **Éclair avant l'apparition à l'entrée dans l'écran** (visites de P3-T1, P1-T1, P4-T1, P5-T2, P2-T2) : avant le déclenchement, l'élément est à son état normal ; quand 15 % de lui entre dans l'écran, l'animation part de son état de départ (opacité 0, décalage) : le visiteur voit l'élément, le voit disparaître, puis revenir. Cause : `packages/renderer/src/interactions.ts` l. 169, le script met `animation: none` sur les cibles jusqu'à l'intersection (seuil 0,15), sans appliquer l'état de départ. P4 l'a anticipé sans pouvoir le vérifier.
2. **Phrase « un à un » sans échelonnement** : `apps/editor/src/lib/timeline.ts` l. 167 écrit « les enfants de « Plats » un à un » dès que la piste vise les enfants, même sans décalage (les cartes partent ensemble).
3. **Survol sans retour composé** : une animation au survol faite à la main revient d'un coup à la sortie de la souris (`:hover`, `packages/renderer/src/css.ts` l. 263 et 274) ; rien dans l'interface ne le dit.
4. **Composant partagé modifié sans avertissement lisible** : une apparition posée sur un chiffre l'est dans le composant « Chiffre clé » et vaut pour les trois occurrences.

### Fonctions présentes mais non trouvées
5. **Changer le « Quand » d'une animation existante** : réglages du déclencheur ouvert en mode Animation (`AnimationModePanel.tsx` l. 162).
6. **Rejouer à chaque passage** : interrupteur « Rejouer » dans les mêmes réglages (l. 164) ; cherché dans les répétitions de la ligne de temps.
7. **Enfants l'un après l'autre avec décalage** : « Cible · Ses enfants, un à un » et « Décalage » sur la piste (`Timeline.tsx` l. 343–349) ; dans le panneau, seule la case « les enfants un à un » (100 ms).
8. **Ressort / dépassement** : courbe « Ressort » dans les réglages d'une image-clé ; aucun préréglage d'apparition à dépassement dans la liste rapide.
9. **Délai dans le panneau** : absent par conception ; « Départ » en mode Animation. 4 participants sur 5 l'ont cherché à côté de l'effet.

### À vérifier
10. **Entrée dans un champ chiffré** (P4, P5) : le journal montre une valeur prise au changement de champ ; le code de `NumberInput` valide à Entrée puis retire le focus (`apps/editor/src/ui/Inputs.tsx`). Non reproduit ; même zone que le défaut E2 de l'audit n°4, corrigé le 13 septembre.

### Vérifié après la synthèse
11. **L'encart « Comment ça marche » (R3) n'est pas montré à qui arrive du panneau sur un élément déjà animé.** `AnimationModePanel.tsx` l. 87 ne l'affiche que si aucune ligne de temps n'est ouverte ; « Ouvrir dans le mode Animation » (`EditorShell.tsx`, `animateNode`) ouvre directement l'animation de l'élément quand il en a une, donc sa ligne de temps. C'est le cas dès qu'on a posé un effet tout prêt et qu'on cherche plus de réglages (chemin de P1 en T3). L'encart reste visible quand on entre dans le mode sans animation ouverte.

---

## 14. Limites

### 14.1 Biais du dispositif simulé, tels qu'ils se sont réalisés

| Biais | Ce qui s'est passé | Effet sur les conclusions |
|---|---|---|
| Connaissance du modèle par les agents | peu de connaissances hors persona ; P3 lit des phrases longues contre sa persona | réussites des débutants en T1, T5 et diagnostic de P3 en T2 possiblement surestimés |
| Persévérance | 3 blocages déclarés pour 13 fins au budget ou par abandon | de vrais utilisateurs abandonneraient plus tôt : les échecs de T3 et T4 viendraient plus tôt, pas moins souvent |
| Complaisance | SEQ 5 ou 6 en T1 et T5 ; 62 des 73 codes positifs déclaratifs | valeur perçue gonflée ; H10 indicative |
| Modèles proches | formulations quasi identiques pour PR1 et PR10 | « 5 sur 5 » ne dit rien d'une fréquence réelle |
| Ordre des missions | T4 toujours en dernier (0 réussite malgré l'apprentissage) | échec de T4 non imputable au manque d'entraînement ; PR4, PR14 et H2 portent une réserve d'ordre |
| Perception par captures | aucun mouvement vu en continu ; pointage imprécis ; loupe inopérante chez P3 et P5 | vérification et pointage surestimés comme difficultés ; ressenti du mouvement et éclair hors de portée |
| Consigne | « arriver » proche d'« Apparition » | découverte en T1 possiblement aidée |
| Modérateur | aide 2 hors conditions chez P2 ; orchestrateur connaissant les hypothèses | récit de P2-T4 contaminé |
| Observateurs | accord sous le seuil prévu pour P3 (38 sur 50) et P5 (20 sur 56), sans le recodage prévu | statuts, fins, aides, récits et diagnostics fiables (accord complet sur 10 missions) ; comptes d'événements, gravités d'origine et étapes non fiables |
| Auteur commun des personas et des hypothèses | listes de mots inconnus qui recoupent le mode Animation ; personas « qui vérifient peu » | PR2 chez les débutants, H4 et H9 en partie écrits d'avance |
| Pensée à voix haute | les agents lisent et se fient aux phrases de résumé | concordance des récits (H3) surestimée |
| Sujet connu | tous cherchent « Animation » dès T1 | découverte « dans la vraie vie » surestimée |
| Budget qui compte les captures | un tiers à la moitié des actions sont des captures ; 10 fins au budget | H6 défavorisée ; PR9 amplifié |

### 14.2 Hors champ

Non couverts par les missions, donc ni validés ni invalidés : le rôle rédacteur, les effets continus (parallaxe, bandeau, compteur, carrousel), le suivi de la souris, l'animation liée à toute la page, le déclenchement au clic, la réutilisation et le renommage des animations, le mobile, la réduction des mouvements, la publication.

---

## 15. Ce qu'un test avec de vraies personnes doit trancher

Format minimal : séances sans limite d'actions, filmées, pensée à voix haute, **sans annoncer le thème de l'animation** ; au moins 3 débutants et 2 ou 3 designers. Classé par poids dans les décisions du plan.

1. **De vrais débutants cherchent-ils à ordonner des éléments, et où ?** Tranche la portée de l'action 1 et PR2 hors de l'effet des personas.
   Consigne : « Sur l'accueil, faites que les deux boutons arrivent juste après le titre. »
   À relever : premier endroit cherché, passage ou non par le mode Animation et réaction, abandon, récit.
2. **Un vrai designer compose-t-il une scène quand rien ne limite ses gestes ?** Tranche H6, PR9, PR6, PR7, PR5 et la valeur déclarée de la mise en scène.
   Consigne : « Quand cette section arrive à l'écran, faites entrer la photo, puis le titre, puis le texte, puis les trois chiffres l'un après l'autre, et que ça se rejoue à chaque passage. »
   À relever : durée, chemin, ouverture de « Cible » et de « Rejouer », moment où l'outil est jugé utilisable ou non.
3. **Le diagnostic d'une animation portée par un parent échoue-t-il avec une vraie souris ?** Tranche PR3, PR4, PR12, S1 et PR10.
   Consigne : « Le client voulait que les plats de l'accueil arrivent quand on descend jusqu'à eux ; ce n'est pas le cas. Trouvez pourquoi et corrigez. »
   À relever : élément sélectionné en premier, lecture de « Aucune », remontée jusqu'à la liste, page ouverte depuis l'inventaire, doublon ou réglage perdu.
4. **Des débutants qui ignorent le sujet trouvent-ils seuls où agir ?** Tranche H1 et le socle du plan (T1 à 5 sur 5 probablement surestimé).
   Consigne, en début de séance : « Ce site paraît un peu figé ; rendez le titre de l'accueil plus vivant. »
   À relever : temps et chemin jusqu'à la rubrique, effet obtenu, abandon.
5. **Vérifie-t-on comme un visiteur quand le mouvement se voit en continu, et que voit-on ?** Tranche H4, H3, l'usage réel de R4 ; la gêne de l'éclair si ce test précède l'action 2.
   Consigne, après une mission réussie : « Montrez-moi ce que verra un client qui ouvre la page, puis dites si c'est ce que vous vouliez. »
   À relever : recours spontané à « Tester sur le site », ce qui est vu et dit (éclair, vitesse perçue), écart entre le récit et le site.

Hors utilisateurs, une vérification technique suffit pour PR13 (Entrée), l'existence d'un bloc regroupant les trois chiffres (PR6) et l'ouverture de « Tester sur le site » (S15).

---

## 16. Annexes

Dans `docs/tests-simules-animation-2026-09/` :

| Fichier | Contenu |
|---|---|
| `protocole.md` | protocole v1.0 pré-enregistré : questions, hypothèses et seuils, personas, script du modérateur, missions et critères, grille, métriques, biais, règles d'analyse |
| `protocole-observateur.md` | version remise aux observateurs, sans les hypothèses |
| `addendum-1.md`, `addendum-2.md` | écarts de préparation et de modération, incidents, passage de la première vague au pilote |
| `traces/trace-p1.md` à `trace-p5.md` | traces brutes des séances (actions, pensée à voix haute, messages du modérateur) ; captures non versionnées |
| `observations/observation-p1.md` à `p5.md` | codage de chaque séance par un observateur |
| `observations/double-codage-p3.md`, `double-codage-p5.md` | seconds codages indépendants |
| `fiches/fiche-lecture-p1.md` à `p5.md` | site enregistré, journal horodaté et visites instrumentées, par mission |
| `synthese.md` | synthèse analytique complète, à l'aveugle vis-à-vis des audits (statuts arbitrés, métriques, accord entre codeurs, problèmes, hypothèses, valeur, recommandations, limites) |
| `comparaison-audit5.md` | comparaison détaillée avec l'audit n°5 et plan consolidé |
| `constats-preparateur.md` | constats techniques 1 à 10 |
| `conduite-des-seances.md` | journal de conduite de la deuxième vague (séances, résultats, modération, tirage du double codage) |

Les chemins cités à l'intérieur des pièces renvoient à l'espace de travail de l'étude (`ut/…`) ; les fichiers portent les mêmes noms dans le dossier d'annexes.
