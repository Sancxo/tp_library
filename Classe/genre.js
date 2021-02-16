export default class Genre {
    constructor(libelle, description) {
        this.libelle = setLibelle(libelle);
        this.description = setDescription(description);
    }

    setLibelle(libelle) {
        if(libelle != null) {
            libelle = libelle.trim();
            if (libelle != "") {
                if(libelle.length < 45) {
                    this.libelle = libelle;
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
        this.description = description;
    }
    
    getDescription() { return this.description }
}