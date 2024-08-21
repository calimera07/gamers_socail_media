const mongoose = require("mongoose");

const CategorieSchema = new mongoose.Schema(
  {

    nom: {
      type: String,
      max: 500,
    },
    
  }
);

module.exports = mongoose.model("Categorie", CategorieSchema);