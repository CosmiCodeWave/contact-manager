const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
  });

//@desc create New contacts
//@route POST /api/contacts
//@access private
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
      user_id: req.user.id,
    });
    res.status(201).json(newContact);
  } catch (error)
  {
    next(error); 
  }
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
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
//@access private
const DeleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User doesn't have permission to delete other user contacts");
  }

  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: `Deleted contact  ${req.params.id}` });
});



//@desc Update all contacts
//@route PUT /api/contacts/:id
//@access private
const UpdateContact = asyncHandler(async (req, res, next) => {
  const existingContact = await Contact.findById(req.params.id);

  if (!existingContact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (existingContact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User doesn't have permission to update other user contacts");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

module.exports = {
  getContact,
  CreateContact,
  getContacts,
  UpdateContact,
  DeleteContact,
};
