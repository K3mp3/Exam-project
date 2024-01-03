const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt"); 
const nodeMailer = require("nodemailer");

const userModel = require ("../models/user_model");

let magicToken = ""; 
let foundToken = "";

/* GET users listing. */
router.post("/createUser", async(req, res) => {
  async function generateUniqueToken() {
    magicToken = Math.random().toString(36).substring(2, 7);
    foundToken = await userModel.findOne({ magicToken: magicToken });

    if (foundToken) {
      generateUniqueToken();
      return;
    }

    console.log(magicToken)

    const { email } = req.body;

    console.log(email)


    try {
      const foundUser = await userModel.findOne({ email: email });

      if (foundUser) {
        return res.status(400).json({ message: "Email is already registered." });
      } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = await userModel.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          magicToken: magicToken,
        })

        console.log(newUser);

        res.status(201).json(newUser);
      }
    } catch (error) {
      res.json(error);
    }
  }

  generateUniqueToken();
})

module.exports = router;
