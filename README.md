
# Gestion d'un centre équestre

Ce projet consiste à développer un site Web pour un centre équestre permettant à :
- des moniteurs de créer des reprises (cours);
- des cavaliers de s'inscrire à ces cours;
- des administrateurs de gérer l'ensemble des reprises et le parc des chevaux;
- un administrateur principal de gérer l'ensemble des comptes.

Le front-en a été développé en <a href="https://angular.io/">Angular</a>, couplé à la librairie graphique <a href="https://material.angular.io/">Angular material</a>.

Quant au back-end, il à été développé en <a href="https://nodejs.org/en/">Node.js</a> avec le framework <a href="https://expressjs.com/fr/">Express.js</a> couplé avec l'ORM <a href="https://sequelize.org/">Sequelize</a>.

## Tâches réalisées
-   [x] 1.Epic Utilisateur (cavalier)
    -   [x] 1.1. User Story inscription
    -   [x] 1.2. User Story connexion
    -   [x] 1.3. User Story récupération de mots de passe
-   [x] 2. Epic Administrateur
    -   [x] 2.1. User Story super user
    -   [x] 2.2. User Story connexion
    -   [x] 2.3. User Story recherche d'utilisateur
-   [x] 3. Epic création de compte technique
    -   [x] 3.1. User Story création de comptes administrateurs
    -   [x] 3.2. User Story création de comptes moniteurs
-   [x] 4. User Story gestion des chevaux
-   [x] 5. User Story gestion des informations personnelles
-   [x] 6. Epic moniteur
    -   [x] 6.1. User Story connexion
    -   [x] 6.2. User Story création de planning de cours
-   [x] 7. Epic gestion des reprises
    -   [x] 7.1. User Story cavalier inscription reprise
    -   [x] 7.2. User Story moniteur assignation chevaux
-   [x] 8. User Story reprise récurrente

# Visite guidée

Voici des captures d'écran des pages composant le site :

### Connexion
<p align="center"><img src="https://zupimages.net/up/20/46/71cu.jpg"></p>

### Inscription
<p align="center"><img src="https://zupimages.net/up/20/46/3t8t.jpg"></p>

### Récupération de mot de passe
<p align="center"><img src="https://zupimages.net/up/20/46/tagh.jpg"></p>

L'utilisateur saisi son mail. Il est averti si l'adresse email est inconnue de la base de données, sinon un mail est envoyé.

<p align="center"><img src="https://zupimages.net/up/20/46/o2my.jpg"></p>

Le lien ramène sur une page du site avec le mail chiffré passé en paramètre, avec un formulaire de réinitialisation du mot de passe.

<p align="center"><img src="https://zupimages.net/up/20/46/3udi.jpg"></p>

### Menu principal

Depuis cette page, les utilisateurs peuvent filtrer les reprises grâce à une liste déroulantes et sélectionner un ou plusieurs niveaux de galop, ainsi qu'un ou plusieurs moniteurs en charge du cours.

Les reprises annulées, terminées (reprise dont la date est passée et sans récurrence) sont marquées par des bandeaux de couleurs. Les boutons pour les cavaliers et moniteurs sont accessibles ont non selon la situation de la reprise.

#### Vue cavalier
<p align="center"><img src="https://zupimages.net/up/20/46/9jis.jpg"></p>

#### Vue moniteur
<p align="center"><img src="https://zupimages.net/up/20/46/y6xt.jpg"></p>

### Page du profil

Depuis cette page, les utilisateurs ont accès à leurs informations personnelles. Ils peuvent modifier ces informations ainsi que leur mot de passe.

#### Informations personnelles
<p align="center"><img src="https://zupimages.net/up/20/46/4yq4.jpg"></p>

#### Modifier le mot de passe
<p align="center"><img src="https://zupimages.net/up/20/46/mb18.jpg"></p>

### Gestion des reprises

Depuis cette page, les moniteurs peuvent créer et modifier les reprises crées. Les administrateurs peuvent également les modifier.

#### Tableau général des reprises
<p align="center"><img src="https://zupimages.net/up/20/46/x2ch.jpg"></p>

#### Formulaire de création d'une reprise
<p align="center"><img src="https://zupimages.net/up/20/46/lfiv.jpg"></p>

### Gestion des chevaux

Depuis cette page, les moniteurs peuvent créer et modifier les fiches des chevaux. Les administrateurs peuvent également les modifier.

#### Tableau général des chevaux
<p align="center"><img src="https://zupimages.net/up/20/46/3t1l.jpg"></p>

#### Formulaire de création d'une fiche d'un cheval
<p align="center"><img src="https://zupimages.net/up/20/46/i3ga.jpg"></p>

### Gestion des comptes

Depuis cette page, les administrateurs peuvent créer et modifier les fiches des chevaux. Les administrateurs peuvent également les modifier.

#### Tableau général des comptes
<p align="center"><img src="https://zupimages.net/up/20/46/u2ll.jpg"></p>

#### Validation de la suppression d'un compte

Si un compte moniteur est supprimé, il ne sera plus associé aux cours qu'il a créé, comme dans l'exemple ci-dessous.

<p align="center"><img src="https://zupimages.net/up/20/46/1mmt.jpg"></p>

#### Validation de la modification d'un rôle (promotion ou rétrogradation)

Si un compte moniteur est rétrogradé 'Cavalier' ou promu 'Administrateur', il ne sera plus associé aux cours qu'il a créé, car seuls les moniteurs peuvent gérer une reprise.

<p align="center"><img src="https://zupimages.net/up/20/46/rf7h.jpg"></p>
