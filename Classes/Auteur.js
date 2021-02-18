class Auteur {
  constructor(nom, prenom) {
    this.erreurs = {};
    this.setNom(nom);
    this.setPrenom(prenom);
  }

  capitalize(word) {
    return word.replace(/^\w/, (c) => c.toUpperCase());
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  getFullName() {
    const nom = this.capitalize(this.nom);
    const prenom = this.capitalize(this.prenom);
    return `${prenom} ${nom}`;
  }

  setNom(nom) {
    if (nom === undefined || nom.trim().length < 1) {
      this.erreurs.nom = Error("Le champ 'Nom' ne peut pas être vide.");
      return this;
    }
    if (nom.length > 45) {
      this.erreurs.nom = Error(
        "Le champ 'Nom' ne doit pas dépasser les 45 caractères de long."
      );
      return this;
    }

    this.nom = this.escapeHtml(this.capitalize(nom.trim().toLowerCase()));
    return this;
  }

  getNom() {
    return this.capitalize(this.nom);
  }

  setPrenom(prenom = "") {
    if (typeof prenom === undefined || prenom.trim().length < 1) {
      this.erreur.prenom = Error("Le champ 'Prénom' ne peut pas être vide.");
      return this;
    }

    if (prenom.length > 45) {
      this.erreur.prenom = Error(
        "Le champ 'Nom' ne doit pas dépasser les 45 caractères de long."
      );
      return this;
    }

    this.prenom = this.escapeHtml(this.capitalize(prenom.trim().toLowerCase()));
    return this;
  }
  getPrenom() {
    return this.capitalize(this.prenom);
  }
}

module.exports = Auteur;
