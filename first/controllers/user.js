const { NotFoundError, BadRequestError } = require("../errors");
const User = require("../models/User");
const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

//get User

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id }).select({ password: 0 });

    if (!user) {
        throw new NotFoundError(`No user exist with id ${id}`);
    }

    res.status(StatusCodes.OK).json({ user });
};

//get all users

const getUsers = async (req, res) => {
    const { search } = req.query;
    if (search) {
        const regex = new RegExp(search, "i");
        const user = await User.find({ name: regex }).select({ password: 0 });
        res.status(StatusCodes.OK).json({ user });
    } else {
        const user = await User.find().select({ password: 0 });
        res.status(StatusCodes.OK).json({ user });
    }
};

//search user

const getUsersByIDs = async (req, res) => {
    const ids = Object.values(req.query);
    if (!ids) throw new BadRequestError("Expected atleast one id");
    const user = await User.find({ _id: { $in: ids } }).select({ password: 0 });
    res.status(StatusCodes.OK).json({ user });
};

//update profile

const updateUser = async (req, res) => {
    const { id } = req.user;
    const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    }).select({ password: 0 });

    await Post.updateMany({ createdBy: req.user.id }, { userDetails: { name: user.name, image: user.profileImage } });

    const posts = await Post.find({ createdBy: req.user.id }).sort("-createdAt");

    if (!user) {
        throw new NotFoundError(`No user exist with id ${id}`);
    }
    const token = user.createJWT();

    res.status(StatusCodes.OK).json({ user, token, posts });
};

//update image profile

const updateDP = async (req, res) => {
    const image = req.files?.image;
    if (!image) {
        throw new BadRequestError("Expected an image");
    }
    const result = await cloudinary.uploader.upload(image.tempFilePath, {
        use_filename: true,
        folder: "fb-clone-dps",
    });
    fs.unlinkSync(image.tempFilePath);
    const { secure_url: src } = result;

    const user = await User.findByIdAndUpdate(req.user.id, { profileImage: src }, { new: true, runValidators: true }).select({ password: 0 });

    await Post.updateMany({ createdBy: req.user.id }, { userDetails: { name: user.name, image: user.profileImage } });

    const posts = await Post.find({ createdBy: req.user.id });

    if (!user) throw new NotFoundError(`No user exist with id ${req.user.id}`);

    res.status(StatusCodes.OK).json({ user, posts });
};


const reportUser = async (req, res) => {
    const { add } = req.query;
    if (add === "true") {
       const user = await User.findById(req.body.id);
       if (!user) throw new NotFoundError(`No user with id${req.body.id}`);
 
       if (user.report.includes(req.user.id)) {
          throw new BadRequestError("Already reported");
       } else {
          const user = await User.findByIdAndUpdate(
             req.body.id,
             {
                $push: { report: req.user.id },
             },
             { new: true, runValidators: true }
          );
          res.status(StatusCodes.OK).json({ user });
       }
    } else if (add === "false") {
       const user = await User.findByIdAndUpdate(
          req.body.id,
          {
             $pull: { report: req.user.id },
          },
          { new: true, runValidators: true }
       );
       if (!user) throw new NotFoundError(`No user with id${req.body.id}`);
       res.status(StatusCodes.OK).json({ user });
    } else {
       throw new BadRequestError("Invalid url");
    }
 };
module.exports = { getUser, updateUser, updateDP, getUsers,reportUser,getUsersByIDs };
