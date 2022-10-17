const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/users");
const { schemas } = require("../../models/user");
const validateBody = require("../../middlewares/validateBody ");
const authentificate = require("../../middlewares/authentificate");
const upload = require("../../middlewares/upload");

router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", validateBody(schemas.emailSchema), ctrlWrapper(ctrl.resendEmail));
router.get("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));
router.get("/current", authentificate, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", authentificate, ctrlWrapper(ctrl.logout));
router.patch("/avatars", authentificate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;
