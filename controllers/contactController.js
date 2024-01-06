const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      res.status(404);
      throw new Error("Contacts not found");
    }
    res.status(200).json(contacts);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

//@desc create New contacts
//@route POST /api/contacts
//@access public
const CreateContact = asyncHandler(async (req, res, next) => {
  try {
    console.log("The request body is:", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const newContact = await Contact.create({
      name,
      email,
      phone,
    });
    res.status(201).json(newContact);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const DeleteContact = asyncHandler(async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json({ message: `Delete contact for ${req.params.id}` });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

//@desc Update all contacts
//@route PUT /api/contacts/:id
//@access public
const UpdateContact = asyncHandler(async (req, res, next) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // This option returns the updated document
    );

    if (!updatedContact) {
      res.status(404);
      throw new Error("Contact not found");
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

module.exports = {
  getContact,
  CreateContact,
  getContacts,
  UpdateContact,
  DeleteContact,
};
