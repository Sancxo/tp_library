export default class Auteur {
    constructor(nom, prenom) {
        this.nom = setNom(nom);
        this.prenom = setPrenom(prenom);
    }

    setNom(nom) {
        if(nom != null) {
            nom = nom.trim();
            if (nom != "") {
                if(nom.length < 45) {
                    this.nom = nom;
                } else {
                    throw new Error("Le champ 'Nom' ne doit pas dépasser les 45 caractères de long.");
                }
            } else {
                throw new Error("Le champ 'Nom' ne peut pas être vide.");
            }
        } else {
            throw new Error("Le champs 'Nom' ne peut pas être null.");
        }
    }
    getNom() { return this.nom }

    setPrenom(prenom) {
        if(prenom != null) {
            prenom = prenom.trim();
            if (prenom != "") {
                if(prenom.length < 45) {
                    this.prenom = prenom;
                } else {
                    throw new Error("Le champ 'Prénom' ne doit pas dépasser les 45 caractères de long.");
                }
            } else {
                throw new Error("Le champ 'Prénom' ne peut pas être vide.");
            }
        } else {
            throw new Error("Le champs 'Prénom' ne peut pas être null.");
        }
    }
    getPrenom() { return this.prenom }
}