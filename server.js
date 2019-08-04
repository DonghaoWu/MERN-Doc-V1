const express = require("express");
const mongoose = require("mongoose");
const morgan = require(`morgan`);
const port = 5000;
const app = express();

//Middleware here!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//DB here!
const db =
  "mongodb+srv://donghao:<password>@cluster-mren-tygf4.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true
      }
    );

    console.log("MongoDB connected.=============>");
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};
//Invoke the function and connect to MongoDB Altas.
connectDB();

/*
Routes here!
*/

const server = app.listen(port, () => {
  console.log(`Port ${port} is listening now.==============>`);
});
