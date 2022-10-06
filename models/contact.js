const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const idSchema = Joi.object({
  id: Joi.objectId(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
  id: Joi.objectId(),
});

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

const Contact = model("contact", contactSchema);

const schemas = {
  addSchema,
  updateFavoriteSchema,
  idSchema,
};

module.exports = { Contact, schemas };
