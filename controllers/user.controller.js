const { response } = require("express");
const classModel = require("../models/student.model");

const cloudinary = require("cloudinary").v2;

const nodemailer = require("nodemailer");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const getUserLandingPage = (req, res) => {
  res.send([
    {
      id: 1,
      name: "Leaane Graham",
      username: "Bret",
    },
    {
      id: 2,
      name: "Tim Weah",
      username: "Chad",
    },
    {
      id: 3,
      name: "Bukayo Sake",
      username: "Starboy",
    },
    [
      {
        name: "Arsenal",
        category: "Football Club",
        position: "2nd",
      },
      {
        name: "Chelsea",
        category: "Football Club",
        position: "11th",
      },
    ],
  ]);
};

const getStudentsInfo = (req, res) => {
  console.log(req.body);
  res.send("Saved");
};

const getAuthInfo = (req, res) => {
  console.log(req.body);
  res.send("Auth Saved");
};

const getAuthSignIn = (req, res) => {
  res.render("SignUp");
};

const postAuthInfo = (req, res) => {
  console.log(req.body);
  let form = new classModel(req.body);
  form
    .save()
    .then((response) => {
      console.log({ message: "succesfully Signed up", response });
      // console.log(response);
      res.send({ message: "succesfully Signed up", status: true });
    })
    .catch((err) => {
      console.log({ message: "Error Signing up", err });
      res.send({ message: "Error Occured", status: false });
    });
};

const postAuthSignIn = (req, res) => {
  classModel
    .find({ email: req.body.email, password: req.body.password })
    .then((response) => {
      console.log(response);
      if (response.length > 0) {
        // res.send("Dashboard")
      } else {
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const saveFile = (req, res) => {
  console.log(req.body);
  let imago = req.body.myImage;
  // res.send("successfully uploaded")
  const resImage = cloudinary.uploader.upload(imago, { public_id: "ifzy" });

  resImage
    .then((data) => {
      console.log(data);
      console.log(data.secure_url);
      let cloudLink = data.secure_url;
      res.send({ message: "Uploaded", cloudLink });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getNodeMailer = (req, res) => {
  res.send({ message: "succesful", status: true });
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:process.env.USER,
        pass:process.env.PASS
    }
  })
  let mailoptions = {
    from : process.env.USER,
    to : ['ifeoluwaolatunbosun5@gmail.com, ifeoluwaolatunbosun99@gmail.com '],
    subject : 'Nodemailer Check',
    text : 'Hello Idan, You good?',
    html : '<h1>Idan gangan, you okay</h1>',
    attachments :[
        {
            filename :"ifzy",
            path : "https://res.cloudinary.com/dakiyibak/image/upload/v1684922217/ifzy.webp"
        }
    ]
  }

  transporter.sendMail(mailoptions)
  .then((response)=>{
    console.log(response);
  })
  .catch((error)=>{
    console.log(error);
  })
};

module.exports = {
  getUserLandingPage,
  getStudentsInfo,
  saveFile,
  getAuthInfo,
  postAuthInfo,
  getAuthSignIn,
  postAuthSignIn,
  getNodeMailer,
};
