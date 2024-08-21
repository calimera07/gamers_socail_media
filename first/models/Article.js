const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
   },
   code: {
      type: String,
      required:true,
      unique: true,

   },
   image: {
      src: {
         type: String,
      },
      publicID: {
         type: String,
      },
   },
   prix: {
      type: Number,
      required: true,
    },
   createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
   },
   userDetails: {
      name: {
         type: String,
         required: true,
      },
      image: {
         type: String,
      },
   },
   likes: {
      type: [String],
   },
   report: {
      type: [String],
   },
   
   comments: [
      {
         commentedBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
         },
         comment: {
            type: String,
            required: true,
         },
         commentedAt: {
            type: Date,
            default: new Date(),
            required: true,
         },
      },
   ],
},
{ timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);