const express = require('express');
const connectDb = require("./config/dbConnection")
const errorHandler = require("./middleware/errorHandler")
const dotenv = require ('dotenv').config();

connectDb();
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use("/api/contacts", require("./routes/constactRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})