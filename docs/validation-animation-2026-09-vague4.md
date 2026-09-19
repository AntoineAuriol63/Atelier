# Validation par l'usage du parcours d'animation · vague 4 (septembre 2026)

Test simulé de validation prévu par `docs/plan-usage-animation-2026-09.md` § 5, mené les 16 et 17 septembre 2026 sur la version `99fb42a` (lot 7 complet), avec les **mêmes personas, les mêmes missions, les mêmes critères de réussite et le même ordre de passage** que les vagues 2 et 3 (rapport de la vague 3 : `docs/validation-animation-2026-09.md`). Cinq séances en parallèle sur un navigateur de test sans fenêtre, un onglet par participant.

> **À lire avant tout.** Les participants sont **simulés** : cinq agents jouent chacun une personne, voient l'écran par captures et agissent à la souris et au clavier dans une copie isolée d'Atelier. Tous les chiffres sont des effectifs sur 5 : ils disent où regarder, jamais une fréquence réelle. Rien n'est « confirmé » : les formulations sont « compatible avec les données de ces vagues ». Aucun participant, dans aucune vague, n'a vu une animation se jouer : tout ce qui touche à la perception du mouvement est hors de portée de ce dispositif.

Pièces complètes dans `docs/validation-animation-2026-09-vague4/` : addendum du dispositif, sept codages d'observateurs (cinq séances, deux doubles codages indépendants pour P3 et P5), fiches de lecture du site enregistré, traces brutes, constats du préparateur, synthèse de la vague 4 écrite à l'aveugle, comparaison vague 3 / vague 4.

---

## 1. En bref

**Cinq critères pré-enregistrés sur huit sont atteints (trois en vague 3). Les quatre missions unitaires sont réussies par les cinq participants (20 réussites complètes sur 25, contre 17), sans aide ni abandon ; la scène à six éléments reste en échec chez 5 sur 5, et la vague a fait apparaître deux défauts de la ligne de temps, corrigés depuis.**

Ce qui a progressé :

- **Réparer une animation existante (T2)** : de 3 réussites complètes sur 5 à **5 sur 5**, diagnostic juste chez les cinq, une seule opération au journal chez quatre. Le moment de lancement se règle désormais là où il se lit, en Écriture comme dans la ligne de temps.
- **Dire « après tel élément » (T3)** : de 4 sur 5 à **5 sur 5**, sans aide, dont 4 sans ouvrir le mode Animation ; la participante qui avait abandonné en vague 3 réussit en 25 actions.
- **Plus aucun abandon** (2 en vague 3), aucune aide demandée ni donnée en 25 missions, aucune modification collatérale dans les 25 sites.
- **Le site joue ce qu'on annonce** : aucun « éclair » dans 25 visites instrumentées, aucune phrase de résumé contredite par le site (N2 atteint pour la première fois).
- **Le défaut de double validation** (Entrée) a disparu des journaux ; les durées et délais tapés au clavier produisent une opération chacun.

Ce qui n'a pas bougé :

- **T4, la scène de « La maison »** : échec chez **5 sur 5** pour la troisième vague, tous au budget, aucune réussite partielle. La couverture remonte (24 éléments animés sur 30 contre 14) et la structure s'améliore (3 chaînes à un seul événement contre 1, un ordre principal juste en lecture stricte contre 0, dépassement des chiffres chez les cinq contre 1), mais aucun participant ne fait bouger les six éléments dans l'ordre.
- **Le groupe des trois chiffres** reste hors d'atteinte : un clic dans la page donne toujours un chiffre, jamais le groupe ; ⌥-clic, livré pour cela, n'a été tenté par personne.
- **Personne ne voit le mouvement** dans l'éditeur, et le triangle « Jouer » sans mot n'est cliqué par aucune débutante.

Ce qui est apparu :

- **La scène collante de la ligne de temps recouvre les réglages de la piste** dès cinq pistes : une designer y perd sa mission (« le champ Départ a disparu »).
- **Les interrupteurs du déclencheur se lisent à l'envers** (« une seule fois » décoché, « se coupe » décoché) : le motion designer repart sans savoir si sa scène rejouera.
- **Trois aides du lot 7 n'ont été trouvées par personne** (⌥-clic, « Pareil pour les N éléments qui suivent », « Reprendre la piste »).

Ces trois découvertes, plus le mot manquant à côté du triangle, ont été corrigées le 19 septembre (`dd29bcb`), après la vague et hors de ses mesures.

---

## 2. Critères pré-enregistrés : verdict

Recopiés de `docs/plan-usage-animation-2026-09.md` § 1, sans reformulation. « Atteint » exige que **tous** les volets soient satisfaits.

| # | Usage | Vague 3 | Vague 4 | Verdict |
|---|---|---|---|---|
| U1 | Les boutons après le titre (T3) | 4 sur 5, dont 3 sans le mode Animation | **5 sur 5** sans aide, dont **4** sans ouvrir le mode Animation | **atteint** |
| U2 | La scène de « La maison » (T4) | 0 et 0 | 0 partielle, 0 complète | manqué |
| U3 | Les plats ne bougent pas (T2) | 3 / 4 / 4 sur 5 | **5 sur 5** (P2 à la 41ᵉ action, budget non arrêté : E en lecture stricte, C au site) ; diagnostic juste **5 sur 5** ; journal sain **5 sur 5** | **atteint** (4 sur 5 même en lecture stricte) |
| U4 | Rejouer à chaque passage, arrivée qui dépasse (T4) | C6 chez 2 ; dépassement chez 1 | C6 chez **2 sur 5** ; dépassement chez **5 sur 5** | manqué (volet « dépassement » atteint) |
| U5 | Aucun abandon né du mode Animation | 1 | **0 abandon** dans la vague | **atteint** |
| U6 | Désigner ce qui bouge | 1 participant | **0 participant** : aucun clic sur le texte ou l'image contenus relevé dans les sept codages (le clic donne un chiffre, une carte ou un bouton entier ; le problème s'est déplacé vers le conteneur, voir § 5.1) | **atteint** |
| N1 | À ne pas casser | 5, 5, 5 ; 20 récits sur 25 | 5, 5, 5 ; **21 récits sur 25** | manqué (3 volets sur 4 ; 4 écarts : P1-T2, P5-T3 sur des éléments non touchés « comme avant », P1-T4 et P3-T4 sur un détail de minutage d'une scène que les deux savaient inachevée) |
| N2 | Le site joue ce qu'on annonce | 0 éclair ; 1 phrase contredite | **0 éclair ; 0 phrase contredite** | **atteint** |

**Compte** : 5 atteints (U1, U3, U5, U6, N2), 3 manqués (U2, U4, N1), contre 3 et 5 en vague 3. Aucun critère n'est atteint grâce à un artefact du dispositif : U3 tient même en retirant la réussite tardive de P2, U6 est lu dans sept codages, N2 dans 25 visites instrumentées. Deux réserves jouent en défaveur de U2 et U4 : le budget de 40 actions compte les captures (17 à 18 sur 40 chez P1, P5), et les listes déroulantes sont rendues dans la page.

---

## 3. Résultats par mission, avant / après

| Mission | Vague 3 (C · P · E) | Vague 4 (C · P · E) | Mouvement |
|---|---|---|---|
| T1 · premier élément qui bouge | 5 · 0 · 0 | 5 · 0 · 0 | stable |
| T2 · les plats ne bougent pas | 3 · 0 · 2 | **5 · 0 · 0** | **+ 2 réussites** |
| T3 · rythme de l'accueil | 4 · 1 · 0 | 5 · 0 · 0 | + 1 réussite |
| T4 · la scène de « La maison » | 0 · 0 · 5 | 0 · 0 · 5 | stable au statut, couverture en hausse |
| T5 · calmer, faire réagir | 5 · 0 · 0 | 5 · 0 · 0 | stable |

Vague 4 : **20 réussites complètes, 0 partielle, 5 échecs** sur 25 (17 · 1 · 7 en vague 3) ; aucune aide donnée ; 0 abandon (2 en vague 3) ; 6 fins au budget, toutes sauf une en T4 ; aucune mission invalidée. Détail : `comparaison-vague3-vague4.md` § 3 et § 4.

---

## 4. Ce qui fonctionne et qu'il faut préserver

1. **La phrase de résumé en français.** Nommée « la meilleure idée du logiciel » par la débutante et « ce que j'ai vu de plus intelligent » par le motion designer. Elle rattrape deux erreurs qui auraient été livrées chez P4 (survol qui « reste ainsi », « ensemble » contre « un à un »), elle porte le diagnostic de T2 chez les cinq, et elle est la seule preuve dont chacun dispose faute de voir le mouvement. Sa contrepartie, dite par P4 : « une phrase qui remplace le regard n'a pas le droit d'être approximative ».
2. **Les trois lignes Apparition · Au survol · En continu**, avec leurs listes courtes : T5 réussie par 5 sur 5 pour la troisième vague ; « quand la cliente s'est plainte de la pastille, j'ai su tout de suite laquelle enlever sans casser l'arrivée ».
3. **« Démarre après « X » » dans la rubrique de l'élément** : T3 réussie par les cinq, quatre sans quitter l'Écriture, en trois opérations.
4. **Le déclencheur « quand il entre dans l'écran » par défaut** et **la clé de fin qui suit la durée** (« beaucoup d'outils vous laissent avec du vide au bout ; là, c'était juste »).
5. **« Les enfants un à un » sur un groupe**, quand on atteint le groupe : « ça fait en un clic ce que je bricole depuis trois ans avec des délais croissants ».
6. **La rubrique Animation sur un élément technique** et **le choix hérité désactivé** : les défauts de la vague 3 (P-2, P-3, P-4, P-8) n'ont produit aucune occurrence.

---

## 5. Ce qui reste, et pourquoi

### 5.1 Le verrou de la mise en scène tient à deux choses

Cinq échecs de T4, tous au budget, avec des voies différentes (trois par l'Écriture, deux par la ligne de temps) et la même paire de causes :

- **Désigner le groupe.** Le conteneur des trois chiffres existe, sa case « les enfants un à un » fait exactement ce qu'il faut (P5 l'a utilisée, P4 l'avait utilisée sur les plats). Mais un clic dans la page donne toujours un chiffre ; le fil d'Ariane est raté ou pris pour autre chose (« Contenu », « Texte ») ; ⌥-clic n'est tenté par personne parce que rien ne le propose. Dans la ligne de temps, « Choisir un élément » vise aussi dans la page : « il n'y a pas de liste de calques à côté de la ligne de temps », dit le seul participant qui compose tous les jours.
- **Voir la scène entière.** Depuis l'Écriture, chaque élément a sa phrase, personne n'additionne : « on ne m'a donné le total nulle part » (P1), « c'est moi qui fais le chef d'orchestre avec une calculatrice dans la tête » (P5). P5 a livré une scène fausse (chiffres partis avec la photo) sans qu'aucun écran le lui dise.

Le coût par élément (P-1) n'a pas baissé : les trois aides du lot 7 qui devaient le réduire n'ont été ni vues ni tentées. Une fonction que 25 tâches ne font pas découvrir ne compte pas.

### 5.2 Ce que la vague a rendu visible dans la ligne de temps

Deux défauts d'interface, absents des vagues précédentes parce que personne n'était allé aussi loin dans la composition :

- la **scène collante** (nom, lecteur, règle, pistes) grandit d'une rangée par piste ; à cinq pistes elle occupe 554 px d'un panneau de 820, et recouvre l'en-tête « Piste » et son champ « Départ » dès que le panneau est défilé. P2 : dix actions à cliquer le nom, les losanges, la barre, « rien n'a fait réapparaître ce réglage », mission perdue, agacement 5 ;
- les **interrupteurs** « Rejouer », « Au départ », « Clic suivant », « Au survol » portaient un libellé qui décrivait l'état courant. Une case décochée intitulée « une seule fois » se lit « rejouer une seule fois : non » ; « se coupe » décoché se lit comme « la case coche l'interruption ». P4 a coché « au jugé » et est reparti « sans savoir si la scène rejouera », alors que le site était juste.

Les deux sont corrigés (`dd29bcb`) : les réglages de la piste active sont ramenés sous la scène quand elle change ; chaque case porte le mot de ce qu'elle coche.

### 5.3 Voir, toujours

Cinq participants sur cinq disent n'avoir jamais vu une animation se jouer ; deux ont vu l'état soulevé d'un bouton au survol. C'est le premier frein déclaré des cinq et « la seule vraie raison » de ne pas s'en servir chez la débutante et l'intégratrice. Le dispositif ne voit que des captures fixes : ce constat est en grande partie un artefact (règle A1). Ce qui ne l'est pas : le triangle « Jouer » à côté des choix rapides est « un dessin tout seul » que P1, P2, P3 et P5 n'ont jamais cliqué (corrigé : « Voir l'effet »), le lien « Tester sur le site » n'apparaît qu'une fois une animation posée, et rien ne dit que l'aperçu suit la tête de lecture : P4 l'a découvert par accident à sa dernière mission, « la capacité la plus importante de l'outil est celle qu'il montre le moins ».

### 5.4 Mots qui arrêtent

Deux écrans et une dizaine de mots. L'écran « Composant · Chiffre clé · 3 instances · modifier le composant change toutes ses instances » a fait reculer la débutante et l'intégratrice au lieu de les aider (« je referme »). Les mots : « survol » (un avion), « les enfants de », « composant », « instance », « délai » (une date limite), « netteté », « Sortie / Entrée » pour les courbes, « Décalage » qui désigne deux choses, « Bandeau », « image-clé », « cible ».

---

## 6. Suite proposée · lot 8

Classé par effet attendu sur les critères manqués (U2, U4, N1). Le détail est dans `comparaison-vague3-vague4.md` § 6 et § 7 et dans la synthèse § 12.

**Déjà fait** (`dd29bcb`, 19 septembre, en TDD) : réglages de piste ramenés sous la scène collante ; interrupteurs qui disent ce qu'ils cochent ; « Voir l'effet » en toutes lettres ; conflit de version reposé au lieu de figer l'éditeur.

**Pour U2 et U4** :

1. **Désigner le groupe sans le savoir.** Un clic sur un chiffre doit proposer le groupe là où on regarde : dans la rubrique Animation de l'élément (« Ces trois chiffres arrivent ensemble ? » avec la case « un à un » du groupe, actionnable depuis l'enfant), et dans la ligne de temps par une liste des éléments de la section à côté des pistes. ⌥-clic peut rester, il ne suffit pas.
2. **La scène entière en une vue.** Depuis l'Écriture, sur une section ou sur l'élément qui lance une chaîne : les éléments qui bougent, leur départ et leur fin sur une seule règle, la durée totale, et une phrase qui dit l'ordre (« photo, puis titre, puis paragraphe, puis les chiffres un à un, en 2,9 s »). Avertir quand un élément part avant celui qu'il devait suivre.
3. **Faire découvrir ce qui existe** : « Pareil pour les N éléments qui suivent » doit dire ce qu'il copie et rester visible ; la tête de lecture doit annoncer qu'elle pilote l'aperçu ; « Tester sur le site » doit exister avant la première animation.

**Pour N1** : un mot par mot (« Quand la souris passe dessus » pour « Au survol », « les trois plats » pour « les enfants de « Plats » », secondes partout où il y a des millisecondes) ; l'écran d'un élément de composant doit dire d'abord ce qu'on peut faire ici, pas ce qu'on risque ailleurs.

**Petits défauts** : deux croix de même dessin ; durée saisissable dans l'Écriture ; « Décalage » renommé pour l'un de ses deux sens.

---

## 7. Ce que ce dispositif ne peut pas trancher

1. **Voir le mouvement** : aucun participant en trois vagues n'a vu une animation se jouer ; la prévisualisation, la lecture en boucle et la qualité perçue restent inconnues, alors que c'est le premier reproche des cinq.
2. **La visée dans les listes et les petits libellés** à 800 × 500 : les erreurs de ligne dans « Démarre » (P1, P3) et l'échec du lien « Régler sur « Plats » » chez P2 (la fonction opère, vérifié) sont pour partie des artefacts.
3. **Le budget de 40 actions** compte les captures et n'a pas été arrêté par le modérateur chez P3 (79 actions du dispositif) ni P2 (88) : les statuts se lisent dans le site et n'en dépendent pas, les comptes d'actions de T4 restent indicatifs.

S'y ajoutent les limites permanentes : cinq participants simulés, un seul auteur pour les personas et le protocole, des agents qui connaissent le sujet, une pensée à voix haute partielle chez les participants joués par Opus, et une interruption d'une nuit (limite de session de l'API) au milieu de T4 de P2 et du débriefing de P4, reprise sans perte.

---

## 8. Annexes

Dans `docs/validation-animation-2026-09-vague4/` :

- `addendum-4.md` — dispositif de la vague 4 et ses incidents (séances en parallèle, rattachement du navigateur de test, interruption, budget non arrêté).
- `synthese4.md` — synthèse de la vague 4, écrite à l'aveugle (statuts arbitrés, métriques, accord entre codeurs, problèmes retenus, hypothèses, recommandations).
- `comparaison-vague3-vague4.md` — verdict des critères, statuts et métriques avant / après, les quatorze problèmes de la vague 3 un par un, les problèmes nouveaux, ce qui reste.
- `observations/` — cinq codages d'observateurs indépendants et deux doubles codages (P3, P5).
- `fiches/` — fiches de lecture du site enregistré (état de départ, site final, journal, visites instrumentées, statut proposé).
- `traces/` — traces brutes des cinq séances.
- `constats4-preparateur.md` — constats techniques relevés pendant la modération, avec la part d'artefact quand elle est établie et la cause dans le code quand elle est vérifiée.
- `protocole-observateur.md` — protocole remis aux observateurs (sans les hypothèses).

Le protocole complet, les personas et les missions sont ceux des vagues 2 et 3 : `docs/tests-simules-animation-2026-09/protocole.md`.
