const express= require("express");
const router = express.Router();
const {getContact,CreateContact,getContacts,UpdateContact,DeleteContact} = require("../constrollers/contactController")

router.route('/').get(getContacts).post(CreateContact);
  router.route("/:id").get(getContact).put(UpdateContact).delete(DeleteContact);

  module.exports=router;