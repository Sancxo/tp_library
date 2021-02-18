use tp_php;

INSERT INTO Livres (titre, livres_description, image)
VALUES ("Le petit poucet", "L'histoire du petit poucet", null);

INSERT INTO admin (username, password)
VALUES ("admin", "$2b$04$W8EpoHBQj2gTYVMRuj0q..DFawrr.SLZ/2H522DXF/17v2vz0qnpq");

insert into ecrit (auteur_id_auteur, livres_id_livres)
values (1, 1);

insert into possede (livres_id_livres, genre_id_genre)
values (1, 3);

SELECT * FROM Livres;
SELECT * FROM admin;
SELECT * FROM auteur;
SELECT * FROM genre;

SELECT l.*, concat(a.prenom, ' ', a.nom) as Auteur, g.libelle as Genre
FROM livres l 
INNER JOIN ecrit e on l.id_livres = e.livres_id_livres
INNER JOIN auteur a on e.auteur_id_auteur = a.id_auteur
INNER JOIN possede p on l.id_livres = p.livres_id_livres
INNER JOIN genre g on p.genre_id_genre = g.id_genre;



