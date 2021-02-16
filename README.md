
- installe les dépendences avec npm install
- pour démarrer le serveur 'npm run start' (c'est une commande définie dans package.json)
- va sur l'adresse indiqué

Du coup on voit 2 routes qu'on retrouve dans le dossier routes et dans app.js qui sert une ressource en fonction de l'url

Donc je pense que le mieux à faire c'est d'avoir la page de connexion si user exists il a accès aux autres pages, le trucs c'est qu'avec node je pense pas qu'on est la variable session de php du coup je crois qu'il faut utiliser un système de token.

Mais ce que je propose c'est qu'on fasse d'abord le formulaire et le CRUD de livres
Donc 
une page avec un tableau pour récuperer la liste de livres 
une page avec un form pour ajouter
une page pour modif 
une page pour supprimer

ca c'est pour le front et ensuite faut faire le back où on branche knex à la Bdd pour faire les requêtes