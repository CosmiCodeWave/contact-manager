const asyncHandler =require("express-async-handler");
const Contact = require("../models/contactModel")
//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler ( async (req, res) => {
    const contacts = await Contact.find(req.params.id);
    if(!Contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(Contact);
});

//@desc create New contacts
//@route POST /api/contacts
//@access public
const CreateContact = asyncHandler ( async (req, res) => {
    console.log("The requist body is:",req.body);
    const {name,email,phone}= req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("all fields are mandatory");
    }

    const NewContact =await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json({message : 'Create contacts'});
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({message : `Get contact for ${req.params.id}`});
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const DeleteContact =asyncHandler( async (req, res) => {
    res.status(200).json({message : `Delete contact for ${req.params.id}`});
});

//@desc Update all contacts
//@route PUT /api/contacts
//@access public
const UpdateContact =asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` });
  });


module.exports ={getContact,CreateContact,getContacts,UpdateContact,DeleteContact}