const { BadRequestError, NotFoundError } = require("../errors");
const Post = require("../models/Post");
const User = require("../models/User");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { StatusCodes } = require("http-status-codes");

//Create post

const createPost = async (req, res) => {
   const { caption } = req.body;
   const image = req.files?.image;
   if (!caption && !image) {
      throw new BadRequestError("Expected a caption or image");
   }
   const user = await User.findById(req.user.id);
   if (image) {
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
         use_filename: true,
         folder: "fb-clone-posts",
      });
      fs.unlinkSync(image.tempFilePath);
      const { secure_url: src, public_id } = result;
      const post = await Post.create({
         caption,
         image: { src, publicID: public_id },
         createdBy: user._id,
         userDetails: { name: user.name, image: user.profileImage },
      });
      res.status(StatusCodes.CREATED).json({ post });
   } else {
      const post = await Post.create({
         caption,
         createdBy: user._id,
         userDetails: { name: user.name, image: user.profileImage },
      });
      res.status(StatusCodes.CREATED).json({ post });
   }
};

//Get all posts

const getPosts = async (req, res) => {
   const { by, search } = req.query;
   if (by) {
      let posts = await Post.find({ createdBy: by }).sort("-createdAt");
      res.status(StatusCodes.OK).json({ posts });
   } else if (search) {
      const regex = new RegExp(search, "i");
      const posts = await Post.find({ caption: regex }).sort("-createdAt");
      res.status(StatusCodes.OK).json({ posts });
   } else {
      const posts = await Post.find().sort("-createdAt");
      res.status(StatusCodes.OK).json({ posts });
   }
};

//Get post

const getPost = async (req, res) => {
   const { id } = req.params;
   const posts = await Post.findById(id);
   if (!posts) throw new NotFoundError(`No post with id${id}`);
   res.status(StatusCodes.OK).json({ posts });
};

//Like post

const likePost = async (req, res) => {
   const { add } = req.query;
   if (add === "true") {
      const posts = await Post.findById(req.body.id);
      if (!posts) throw new NotFoundError(`No post with id${req.body.id}`);

      if (posts.likes.includes(req.user.id)) {
         throw new BadRequestError("Already liked");
      } else {
         const posts = await Post.findByIdAndUpdate(
            req.body.id,
            {
               $push: { likes: req.user.id },
            },
            { new: true, runValidators: true }
         );
         res.status(StatusCodes.OK).json({ posts });
      }
   } else if (add === "false") {
      const posts = await Post.findByIdAndUpdate(
         req.body.id,
         {
            $pull: { likes: req.user.id },
         },
         { new: true, runValidators: true }
      );
      if (!posts) throw new NotFoundError(`No post with id${req.body.id}`);
      res.status(StatusCodes.OK).json({ posts });
   } else {
      throw new BadRequestError("Invalid url");
   }
};

//Report post


const reportPost = async (req, res) => {
   const { add } = req.query;
   if (add === "true") {
      const posts = await Post.findById(req.body.id);
      if (!posts) throw new NotFoundError(`No post with id${req.body.id}`);

      if (posts.report.includes(req.user.id)) {
         throw new BadRequestError("Already reported");
      } else {
         const posts = await Post.findByIdAndUpdate(
            req.body.id,
            {
               $push: { report: req.user.id },
            },
            { new: true, runValidators: true }
         );
         res.status(StatusCodes.OK).json({ posts });
      }
   } else if (add === "false") {
      const posts = await Post.findByIdAndUpdate(
         req.body.id,
         {
            $pull: { report: req.user.id },
         },
         { new: true, runValidators: true }
      );
      if (!posts) throw new NotFoundError(`No post with id${req.body.id}`);
      res.status(StatusCodes.OK).json({ posts });
   } else {
      throw new BadRequestError("Invalid url");
   }
};

//comment post 

const commentPost = async (req, res) => {
   const posts = await Post.findByIdAndUpdate(
      req.body.id,
      {
         $push: { comments: { commentedBy: req.user.id, comment: req.body.comment } },
      },
      { new: true, runValidators: true }
   );

   if (!posts) throw new NotFoundError(`No post with id${req.body.id}`);

   res.status(StatusCodes.OK).json({ posts });
};

//delete post

const deletePost = async (req, res) => {
   const { id } = req.params;
   const post = await Post.findOneAndDelete({ _id: id, createdBy: req.user.id });
   await cloudinary.uploader.destroy(post.image?.publicID);
   res.status(StatusCodes.OK).json(post);
};

module.exports = { createPost,reportPost, getPosts, likePost, commentPost, getPost, deletePost };

