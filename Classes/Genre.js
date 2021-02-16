class Genre {
    constructor(libelle, description) {
        setLibelle(libelle);
        setDescription(description);
    }

    escapeHtml(unsafe) {
        return unsafe
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
    }

    setLibelle(libelle) {
        if(libelle != null) {
            libelle = libelle.trim();
            if (libelle != "") {
                if(libelle.length < 45) {
                    this.libelle = this.escapeHtml(libelle);
                } else {
                    throw new Error("Le champ 'Libelle' ne doit pas dépasser les 45 caractères de long.");
                }
            } else {
                throw new Error("Le champ 'Libelle' ne peut pas être vide.");
            }
        } else {
            throw new Error("Le champs 'Libelle' ne peut pas être null.");
        }
    }
    getLibelle() { return this.libelle }

    setDescription(description) {
        this.description = this.escapeHtml(description);
    }

    getDescription() { return this.description }
}

module.exports = Genre;