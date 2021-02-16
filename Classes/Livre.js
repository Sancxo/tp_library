export default class Livre {
  constructor(title, description, image) {
    this.title = setTitle(title);
    this.description = setDes(description);
    this.image = setImage(image);
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
    return this.title;
  }

  setTitle(title) {
    title = title.trim();

    if (title.length > 2 && title.length < 45) {
      this.title = this.escapeHtml(title);
    } else {
      throw new Error("Le titre devrais faire entre 2 et 45 caractères");
    }
  }

  getDes() {
    return this.description;
  }

  setDes(description) {
    this.description = this.escapeHtml(description);
  }

  getImage() {
    return this.image;
  }

  setImage(image) {
    // Ici j'aurai la fonction isValid pour être sur que le poids autorisé
    // n'est pas depassé etc
    if (image.isValid()) {
      this.image = image;
    }
  }
}
