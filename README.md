# TICASA Cyna

Dans le cadre de notre projet d'étude, nous sommes amenés à développer un site web e-commerce ainsi qu'une application mobile Android et iOS avec un backoffice pour les administrateurs. 
Dans le cadre du cours de mise en situation dev côté utilisateur / front, nous avons travaillé sur une petite partie de ce gros projet que nous allons détaillé ci-dessous. Nous avons réalisé un site web et une application mobile en utilisant React Native et Node.js.

## Table des Matières
1. [Fonctionnalités](#fonctionnalités)
2. [Installation](#installation)
3. [Structure du Projet](#structure-du-projet)
4. [Technologies](#technologies)
5. [Auteurs](#auteurs)


## Fonctionnalités

- **Authentification** : un utilisateur peut s'inscrire, se connecter, de déconnecter... (il y a également une page de réinitialisation du mot de passe mais qui n'est que de l'affichage pour le moment)
- **Caroussel des produits** : une page d'accueil avec un caroussel des différents produits proposés par l'entreprise Cyna
- **Catalogue des produits** : la liste de tous les produits avec les détails
  

## Installation

### Lancer le serveur Backend
1. Vérifier que mySQL est installé
2. Accéder au dossier Backend
   ```bash
   cd .\Backend\
   ```
3. Installer les packages nécessaires au bon fonctionnement du projet
   ```bash
   npm i
   ```
4. Initialiser la base de données
   ```bash
   npx prisma db push
   ```
5. Lancer le serveur
   ```bash
   npx tsx src/server.ts
   ```

### Lancer le serveur Frontend
1. Accéder au dossier Frontend
   ```bash
   cd .\Frontend\ticasaFront\
   ```
2. Installer les packages nécessaires au bon fonctionnement du projet
   ```bash
   npm i
   ```
3. Lancer le serveur Expo
   ```bash
   npx expo start
   ```

### Accéder au site et à l'application
- ***Pour la version web*** : "http://localhost:8081"
- ***Pour la version Android*** : télécharger un émulateur Android, le démarrer et taper "a" dans le terminal d'Expo


## Structure du Projet

- **Assets/Prefabs** : Les préfabs du projet (les objets réutilisables, une sorte de template)
- **Assets/Scenes** : Les différentes scènes du jeu
- **Assets/Scripts** : Tous la logique du jeu, fichiers en C#, code principal


## Technologies

- **React Native** : Partie Frontend de notre application mobile Android/iOS
- **React Native Web** : Partie Frontend de notre site web
- **Node.js (Express)** : Partie Backend de notre projet


## Auteurs
Développé par Samp83 (Sami PARIS), CassC17 (Cassandra CINNA) et Titinite (Thibault LERAY) en période de cours. Retrouvez plus de détails dans le dépôt [GitHub](https://github.com/CassC17/TICASA_Cyna_web).
