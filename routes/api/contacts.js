const express = require("express");
const authentificate = require("../../middlewares/authentificate");

const ctrl = require("../../controllers/contacts");

const { RequestError } = require("../../helpers");

const router = express.Router();
const { schemas } = require("../../models/contact");

router.get("/", authentificate, async (req, res, next) => {
  try {
    await ctrl.getAll(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authentificate, async (req, res, next) => {
  try {
    const id = req.params;
    const { error } = schemas.idSchema.validate(id);
    if (error) {
      throw RequestError(400, error.message);
    }
    await ctrl.getById(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/", authentificate, async (req, res, next) => {
  try {
    const contact = req.body;
    const { error } = schemas.addSchema.validate(contact);
    if (error) {
      throw RequestError(400, error.message);
    }

    await ctrl.add(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authentificate, async (req, res, next) => {
  try {
    const id = req.params;
    const { error } = schemas.idSchema.validate(id);
    if (error) {
      throw RequestError(400, error.message);
    }
    await ctrl.removeById(req, res);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authentificate, async (req, res, next) => {
  try {
    const contact = req.body;
    if (Object.keys(contact).length === 0) {
      throw RequestError(400, "missing fields");
    }

    const { error } = schemas.addSchema.validate(contact);
    if (error) {
      throw RequestError(400, error.message);
    }

    const id = req.params;
    const err = schemas.idSchema.validate(id);
    if (err.error) {
      throw RequestError(400, err.error.message);
    }

    await ctrl.updateById(req, res);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", authentificate, async (req, res, next) => {
  try {
    const contact = req.body;
    const { id } = req.params;
    contact.id = id;
    if (Object.keys(contact).length === 0) {
      throw RequestError(400, "missing fields");
    }
    const { error } = schemas.updateFavoriteSchema.validate(contact);
    if (error) {
      throw RequestError(400, error.message);
    }

    await ctrl.updateFavorites(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
