class Genre {
  constructor(libelle, description) {
    this.erreurs = {};
    this.setLibelle(libelle);
    this.setDescription(description);
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

  setLibelle(libelle) {
    if (libelle === undefined || libelle.trim().length < 1) {
      this.erreurs.libelle = Error("Le champ 'Libelle' ne peut pas être vide.");
      return this;
    }
    if (libelle.length > 45) {
      this.erreurs.libelle = Error(
        "Le champ 'Libelle' ne doit pas dépasser les 45 caractères de long."
      );
      return this;
    }

    this.libelle = this.escapeHtml(this.capitalize(libelle.toLowerCase()));
    return this;
  }
  getLibelle() {
    return this.capitalize(this.libelle);
  }

  setDescription(description) {
    this.description =
      description.length > 0 ? this.escapeHtml(description) : "";
  }

  getDescription() {
    return this.description;
  }
}

module.exports = Genre;
