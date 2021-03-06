

# Gestion d'un centre équestre

Ce projet consiste à développer un site Web pour un centre équestre permettant à :
- des moniteurs de créer des reprises (cours);
- des cavaliers de s'inscrire à ces cours;
- des administrateurs de gérer l'ensemble des reprises et le parc des chevaux;
- un administrateur principal de gérer l'ensemble des comptes.

Le front-en a été développé en <a href="https://angular.io/">Angular</a>, couplé à la librairie graphique <a href="https://material.angular.io/">Angular material</a>.

Quant au back-end, il à été développé en <a href="https://nodejs.org/en/">Node.js</a> avec le framework <a href="https://expressjs.com/fr/">Express.js</a> couplé avec l'ORM <a href="https://sequelize.org/">Sequelize</a>. J'ai stocké les données dans une base de données MySQL hébergée sur <a href="https://www.alwaysdata.com/fr/">AlwaysData</a>. Je me suis également servi de leur provider pour envoyer des mails.

## Lancement du serveur
nodemon server.js OU node server.js

## Lancement du front
ng serve -o

## Tâches réalisées

-   &#x2611; 1.Epic Utilisateur (cavalier)
    -   &#x2611; 1.1. User Story inscription
    -   &#x2611; 1.2. User Story connexion
    -   &#x2611; 1.3. User Story récupération de mots de passe
-   &#x2611; 2. Epic Administrateur
    -   &#x2611; 2.1. User Story super user
    -   &#x2611; 2.2. User Story connexion
    -   &#x2611; 2.3. User Story recherche d'utilisateur
-   &#x2611; 3. Epic création de compte technique
    -   &#x2611; 3.1. User Story création de comptes administrateurs
    -   &#x2611; 3.2. User Story création de comptes moniteurs
-   &#x2611; 4. User Story gestion des chevaux
-   &#x2611; 5. User Story gestion des informations personnelles
-   &#x2611; 6. Epic moniteur
    -   &#x2611; 6.1. User Story connexion
    -   &#x2611; 6.2. User Story création de planning de cours
-   &#x2611; 7. Epic gestion des reprises
    -   &#x2611; 7.1. User Story cavalier inscription reprise
    -   &#x2611; 7.2. User Story moniteur assignation chevaux
-   &#x2611; 8. User Story reprise récurrente

# Visite guidée

Voici des captures d'écran des pages composant le site :

### Connexion

Une vérification du format de l'adresse mail est mise en place. Lorsque les deux champs sont remplis, le bouton s'active.

<p align="center"><img src="https://zupimages.net/up/20/46/71cu.jpg"></p>

### Inscription

Il en va de même pour le formulaire d'inscription.

<p align="center"><img src="https://zupimages.net/up/20/46/3t8t.jpg"></p>

### Récupération de mot de passe

<p align="center"><img src="https://zupimages.net/up/20/46/h3t7.jpg"></p>

L'utilisateur saisi son mail. Il est averti si l'adresse email est inconnue de la base de données, sinon un mail est envoyé.

<p align="center"><img src="https://zupimages.net/up/20/46/o2my.jpg"></p>

Le lien ramène sur une page du site avec le mail chiffré passé en paramètre, avec un formulaire de réinitialisation du mot de passe.

<p align="center"><img src="https://zupimages.net/up/20/46/3udi.jpg"></p>

### Menu principal

Depuis cette page, les utilisateurs peuvent filtrer les reprises grâce à une liste déroulante et sélectionner un ou plusieurs niveaux de galop, ainsi qu'un ou plusieurs moniteurs en charge du cours.

Les reprises annulées, terminées (reprise dont la date est passée et sans récurrence) sont marquées par des bandeaux de couleurs. Les boutons pour les cavaliers et moniteurs sont accessibles ont non selon la situation de la reprise.

#### Vue cavalier
<p align="center"><img src="https://zupimages.net/up/20/46/9jis.jpg"></p>

#### Vue moniteur
<p align="center"><img src="https://zupimages.net/up/20/46/y6xt.jpg"></p>

### Page d'une reprise
Depuis cette page, les utilisateurs peuvent voir à quel cheval il sont associés pour la reprise.

Pour assigner un cheval déjà assigné à un autre cavalier, il suffit de le refaire glisser dans la liste, puis de le glisser sur un cavalier.

#### Vue cavalier
<p align="center"><img src="https://zupimages.net/up/20/46/2gtg.jpg"></p>

#### Vue moniteur

Les moniteurs peuvent associer un cheval à un cavalier grâce au système de Drag & Drop d'Angular Material.

<p align="center"><img src="https://zupimages.net/up/20/46/2713.jpg"></p>

Ils peuvent également annuler la reprise si moins de 3 cavaliers y sont inscrits.

<p align="center"><img src="https://zupimages.net/up/20/46/xgud.jpg"></p>
<p align="center"><img src="https://zupimages.net/up/20/46/7py5.jpg"></p>

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

Les chevaux supprimés sont dissociés des inscriptions des cavaliers aux reprises.

<p align="center"><img src="https://zupimages.net/up/20/46/3t1l.jpg"></p>

#### Formulaire de création d'une fiche d'un cheval
<p align="center"><img src="https://zupimages.net/up/20/46/i3ga.jpg"></p>

### Gestion des comptes

Depuis cette page, les administrateurs peuvent créer et modifier les comptes des utilisateurs. Il est possible de filtrer les comptes en fonction du rôle et/ou du nom de la personne.

#### Tableau général des comptes
<p align="center"><img src="https://zupimages.net/up/20/46/gmm1.jpg"></p>

Le formulaire de création de compte est quasiment identique au formulaire d'inscription, mis à part la liste déroulante pour le choix du rôle à donner.

#### Validation de la suppression d'un compte

Si un compte moniteur est supprimé, il ne sera plus associé aux cours qu'il a créé, comme dans l'exemple ci-dessous.
Si un compte cavalier est supprimé, toutes les inscriptions aux reprises sont également supprimées.

<p align="center"><img src="https://zupimages.net/up/20/46/q1kf.jpg"></p>

#### Validation de la modification d'un rôle (promotion ou rétrogradation)

Si un compte moniteur est rétrogradé 'Cavalier' ou promu 'Administrateur', il ne sera plus associé aux cours qu'il a créé, car seuls les moniteurs peuvent gérer une reprise.

<p align="center"><img src="https://zupimages.net/up/20/46/rf7h.jpg"></p>
