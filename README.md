# TP Node.js bibliothèque
  Avec
- MySql pour la base de données
- knex.js queryBuilder pour les requêtes
- express.js pour les routes
- Vanila JS parce qu'on l'aime plus que tout 😍


knexfile c'est le fichier de connexion à la database donc à modifier en fonction

Le dossier db c'est pour les fichiers concernant la BDD
  (idéalement j'avais prévu d'avoir un fichier queries que le fichier api apelle mais ça ne marchait pas donc pour avancer j'ai laissé tomber et je verrai plus tard)


Le dossier api c'est pour les routes (et les requêtes pour le moment)

## Pour installer

- npm install
- lance une instance mysql
- lance le script qui ce trouve dans db folder "db_library.sql"
- `npm run start` ou `npm run dev` pour nodemon

et ça devrait être bon

## A faire (Sujet au changement)

### Classes

- [x] Livre
- [x] Auteur
- [x] Genre

### API routes

  ### Books
- [x] get all books
- [x] get a book /api/livres/:id
- [x] post a book /api/livres
- [x] update a book /api/livres/:id
- [x] delete a book /api/livres/:id

  ### Genres
- [x] get all genres
- [x] get a genre /api/genres/:id
- [x] post a genre /api/genres
- [x] update a genre /api/genres/:id
- [x] delete a genre /api/genres/:id

  ### Auteurs
- [x] get all auteurs
- [x] get a auteur /api/auteurs/:id
- [x] post a auteur /api/auteurs
- [x] update a auteur /api/auteurs/:id
- [x] delete a auteur /api/auteurs/:id

### Front routes

- [ ] connexion.html (connexion page)
- [ ] index.html (table with all the books + links to add, delete, update book)
- [ ] add (form avec pour commencer, livres, ensuite on peut créer un form avec un menu select pour choisir auteur, genre etc et en fonction le form s'actualise pour les champs demandés)
- [ ] delete