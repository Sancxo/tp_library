class Auteur {
    constructor(nom, prenom) {
        setNom(nom);
        setPrenom(prenom);
    }

    escapeHtml(unsafe) {
        return unsafe
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
    }

    setNom(nom) {
        if(nom != null) {
            nom = nom.trim();
            if (nom != "") {
                if(nom.length < 45) {
                    this.nom =  this.escapeHtml(nom);
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
                    this.prenom =  this.escapeHtml(prenom);
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

module.exports = Auteur;