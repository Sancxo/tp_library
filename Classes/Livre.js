class Livre {
  constructor(title, description, image) {
    this.erreurs = {};
    this.setTitle(title);
    this.setDes(description);
    this.setImage(image);
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

  isValid() {
    return true;
  }

  getTitle() {
    return this.capitalize(this.title);
  }

  setTitle(title) {
    if (title === undefined || title.trim().length < 2) {
      this.erreurs.title = Error("Le titre doit faire plus de 2 caractères");
      return this;
    }
    if (title.length > 45) {
      this.erreurs.title = Error("Le titre doit faire moins de 45 caractères");
      return this;
    }

    this.title = this.escapeHtml(this.capitalize(title.toLowerCase()));
  }

  getDes() {
    return this.description;
  }

  setDes(description) {
    this.description = this.escapeHtml(description) | "";
  }

  getImage() {
    return this.image;
  }

  setImage(image) {
    // Ici j'aurai la fonction isValid pour être sur que le poids autorisé
    // n'est pas depassé etc
    if (this.isValid(image)) {
      this.image = image;
    }
  }
}

module.exports = Livre;
