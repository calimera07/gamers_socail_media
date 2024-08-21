const express = require("express");
const { createChat, getChats,deleteChats } = require("../controllers/chat");
const router = express.Router();

router.route("/:receiverId").post(createChat);
router.route("/").get(getChats);
router.route("/delete/:receiverId").delete(deleteChats);


module.exports = router;
