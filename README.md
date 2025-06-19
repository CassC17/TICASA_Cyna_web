# TICASA Cyna

Ce repo s'inscrit dans le cadre de notre projet d'étude de fin d'année de 3ème année de Bachelor Informatique spécialité développement à Sup de Vinci à Bordeaux. Le sujet de ce projet a été donné par l'entreprise Cyna et nous propose de réaliser une plateforme e-commerce.
Nous avons développé une application web mobile-first (avec React Native Web pour une meilleure conversion vers une appli mobile), une application mobile (avec React Natvie qui permet de développer pour Android et iOS en même temps) et un backoffice permettant aux administrateurs de gérer les éléments affichés (par exemple, les produits en vedette).

## Table des Matières
1. [Fonctionnalités](#fonctionnalités)
2. [Installation](#installation)
3. [Structure du Projet](#structure-du-projet)
4. [Technologies](#technologies)
5. [Auteurs](#auteurs)


## Fonctionnalités

- **Authentification** : un utilisateur peut s'inscrire, se connecter, de déconnecter, modifier son compte...
- **Achat de produits** : un client peut ajouter un produit au panier, passer commande avec Stripe
- **Panel administrateur** : un administrateur peut voir les différentes statistiques de ventes, modifier les interfaces, ajouter un produit...
- Il y a toute une panoplie de fonctionnalités intéressantes dans le projet
  

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

- **backend** : Notre application backend avec l'API avec une architecture n-tiers
- **frontend** : Notre partie front avec une architecture modulaire


## Technologies

- **React Native** : Partie Frontend de notre application mobile Android/iOS
- **React Native Web (Expo)** : Partie Frontend de notre site web
- **Node.js (Express)** : Partie Backend de notre projet
- **Prisma** : Relais base de données


## Auteurs
Développé par Samp83 (Sami PARIS), CassC17 (Cassandra CINNA) et Titinite (Thibault LERAY) en période de cours. Retrouvez plus de détails dans le dépôt [GitHub](https://github.com/CassC17/TICASA_Cyna_web).
