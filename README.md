# Euro-Roll

## Contexte du Projet

Ce projet a été réalisé dans le cadre du cours de développement d'application web du bachelier en informatique. 
Il s'agit d'un projet fictif simulant une application de gestion pour une entreprise de sécurité aérienne.
Un travail d'analyse a été personnellement réalise en amont de ce projet.

## Description

Euro-Roll est une application faisant partie du projet Efficient d'EuroSkyeStarr, une société fictive de gestion de la sécurité aérienne à l'échelle européenne. 
Cette application est spécifiquement conçue pour gérer les ressources humaines et la facturation de l'entreprise.

## Technologies Utilisées

### Frontend

- Angular
- TypeScript
- HTML/CSS
- PrimeNG pour l'interface utilisateur

### Backend

- NestJS
- TypeScript
- RESTful API

### Base de Données

- PostgreSQL
- TypeORM pour l'ORM

## Contexte

EuroSkyeStarr gère 39 sites à travers l'Europe :

- 8 sites en France et en Allemagne
- 3 sites en Belgique
- 4 sites en Suisse, Pays-Bas, Espagne, Italie et Portugal

L'entreprise emploie environ 4500 personnes, comprenant des ingénieurs, techniciens, analystes, managers et administrateurs.

## Fonctionnalités Principales

- Gestion des interactions liées aux employés
- Facturation des services externes et internes
- Intégration avec Euro-Core (module réalisé par d'autres étudiants) pour la synchronisation des données
- Gestion des droits d'accès et de la sécurité

## Architecture Technique

Le projet est structuré en deux parties principales :

- `api/` : Backend NestJS
- `app/` : Frontend Angular

## Sécurité

- Identification de l'auteur pour chaque action
- Gestion des droits d'accès utilisateur
- Création des comptes par un administrateur
- Synchronisation sécurisée avec Euro-Core
- JWT (JSON Web Tokens) pour l'authentification

## Intégration

L'application fait partie d'un écosystème plus large comprenant :

- Euro-Source : Gestion des ressources
- Euro-Field : Support quotidien des techniciens
- Euro-Rereal : Rapports et temps réel
- Euro-Core : Système centralisé de gestion des données

## Contribution

Ce projet a été réalisé par :

- Gregory Van Raek
- Kevin Matagne
