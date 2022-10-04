const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/users");
const { schemas } = require("../../models/user");
const validateBody = require("../../middlewares/validateBody ");
// const authentificate = require("../../middlewares/authentificate");

router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));
router.get("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
