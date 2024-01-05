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
      console.log(foundUser);

      if (foundUser) {
        return res.status(400).json({ message: "Email is already registered." });
      } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = await userModel.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          repairShop: req.body.repairShop,
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

router.post("/signIn", async(req, res) => {
  async function signInUser() {
    magicToken = Math.random().toString(36).substring(2, 7);
    const foundToken = await userModel.findOne({ magicToken, magicToken });

    if (foundToken) {
      signInUser();
      return;
    }

    const { password, email } = req.body;

    try {
      const foundUser = await userModel.findOne({ email: email });
      const match = await bcrypt.compare(password, foundUser.password);

      if (!foundUser || !match) {
        res.status(400).json({ message: "Wrong email or password" });
        return;
      }

      const magicTokenTimeout = 60 * 60 * 1000;

      if (match) {
        console.log(match)
        foundUser.magicToken = magicToken;
        await foundUser.save();

        const userEmail = foundUser.email;

        const transporter = nodeMailer.createTransport({
          service: "Gmail",
          auth: {
            user: "k3mp314@gmail.com",
            pass: "vuzs xrnz zxrd mujz"
          }
        })

        const mailOptions = {
          from: "k3mp314@gmail.com",
          to: userEmail,
          subject: "Verification code",
          html: `
            <div style="padding: 32px; background-color: #090909; display: flex; justify-content: center; align-items: center;">
              <div style="text-align: center">
                <h1>Here is your verification code:</h1> 
                <h2>${magicToken}</h2>
                <div style="max-width: 100vw; height: 2px; background: #0D31F1"></div>
              </div>
            </div>
          `
        }

        console.log(mailOptions);

        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            res.status(500).json("Error sending verifaction code");
          } else {
            res.status(201).json({ email: userEmail});

            setTimeout(async () => {
              async function generateUniqueTokenTimer() {
                magicToken = Math.random().toString(36).substring(2, 7);
                foundToken = await userModel.findOne({ magicToken: magicToken });

                if (foundToken) {
                  generateUniqueTokenTimer()
                }
              }
              generateUniqueTokenTimer();

              foundUser.magicToken = magicToken;
              await foundUser.save();
            }, magicTokenTimeout)
          }
        });
      } else {
        res.status(401);
      }
    } catch (error) {
      res.status(500);
    }
  }
  signInUser();
})

module.exports = router;
