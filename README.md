
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

## API route

  ### Books
- [] get all books
- [] get a book /api/livres/:id
- [] post a book /api/livres
- [] update a book /api/livres/:id
- [] delete a book /api/livres/:id

  ### Genres
- [] get all genres
- [] get a genre /api/genres/:id
- [] post a genre /api/genres
- [] update a genre /api/genres/:id
- [] delete a genre /api/genres/:id

  ### Auteurs
- [] get all auteurs
- [] get a auteur /api/auteurs/:id
- [] post a auteur /api/auteurs
- [] update a auteur /api/auteurs/:id
- [] delete a auteur /api/auteurs/:id

## Front route

- [] connexion.html (connexion page)
- [] index.html (table with all the books + links to add, delete, update book)
- [] add (form avec pour commencer, livres, ensuite on peut créer un form avec un menu select pour choisir auteur, genre etc et en fonction le form s'actualise pour les champs demandés)
- [] delete