const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const nodeMailer = require("nodemailer");

const userModel = require("../models/user_model");
const repairShopAnswerModel = require("../models/repair_shop_answer_model");
const contactRepairShopModel = require("../models/contact_repair_shop_model");

let magicToken = "";
let foundToken = "";

router.post("/createUser", async (req, res) => {
  async function generateUniqueToken() {
    magicToken = Math.random().toString(36).substring(2, 7);
    foundToken = await userModel.findOne({ magicToken: magicToken });

    if (foundToken) {
      generateUniqueToken();
      return;
    }

    console.log(magicToken);

    const { email } = req.body;

    console.log(email);

    try {
      const foundUser = await userModel.findOne({ email: email });
      console.log(foundUser);

      if (foundUser) {
        return res.status(400).json({ message: "Email is already in use!" });
      } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = await userModel.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          repairShop: req.body.repairShop,
          magicToken: magicToken,
        });

        console.log(newUser);

        res.status(201).json(newUser);
      }
    } catch (error) {
      res.json(error);
    }
  }
  generateUniqueToken();
});

router.post("/createRepairShopUser", async (req, res) => {
  async function generateUniqueToken() {
    magicToken = Math.random().toString(36).substring(2, 7);
    foundToken = await userModel.findOne({ magicToken: magicToken });

    if (foundToken) {
      generateUniqueToken();
      return;
    }

    console.log(magicToken);
    const { email } = req.body;

    try {
      const foundUser = await userModel.findOne({ email: email });

      if (foundUser) {
        return res.status(400).json({ message: "Email is already in use!" });
      } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = await userModel.create({
          name: req.body.name,
          location: req.body.location,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          password: hashedPassword,
          repairShop: req.body.repairShop,
          magicToken: magicToken,
        });

        console.log(newUser);

        res.status(201).json(newUser);
      }
    } catch (error) {
      res.json(error);
    }
  }
  generateUniqueToken();
});

router.post("/signin", async (req, res) => {
  async function signInUser() {
    magicToken = Math.random().toString(36).substring(2, 7);
    console.log("magictoken:", magicToken);
    const foundToken = await userModel.findOne({ magicToken, magicToken });
    console.log("foundtoken:", foundToken);

    if (foundToken) {
      signInUser();
      return;
    }

    const { password, email } = req.body;

    console.log("email, password:", email, password);

    try {
      const foundUser = await userModel.findOne({ email: email });
      console.log("founduser", foundUser);
      const match = await bcrypt.compare(password, foundUser.password);

      console.log(foundUser);
      console.log(match);

      if (!foundUser || !match) {
        res.status(400).json({ message: "Wrong email or password!" });
        return;
      }

      const magicTokenTimeout = 60 * 60 * 1000;

      if (match) {
        console.log(match);
        foundUser.magicToken = magicToken;
        await foundUser.save();

        const userEmail = foundUser.email;

        const transporter = nodeMailer.createTransport({
          service: "Gmail",
          auth: {
            user: "k3mp314@gmail.com",
            pass: "vuzs xrnz zxrd mujz",
          },
        });

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
          `,
        };

        console.log(mailOptions);

        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            res.status(500).json("Error sending verifaction code");
          } else {
            res.status(201).json({ email: userEmail });

            setTimeout(async () => {
              async function generateUniqueTokenTimer() {
                magicToken = Math.random().toString(36).substring(2, 7);
                foundToken = await userModel.findOne({
                  magicToken: magicToken,
                });

                if (foundToken) {
                  generateUniqueTokenTimer();
                }
              }
              generateUniqueTokenTimer();

              foundUser.magicToken = magicToken;
              await foundUser.save();
            }, magicTokenTimeout);
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
});

router.post("/checkMagicToken", async (req, res) => {
  const { magicToken, email, repairShop } = req.body;
  console.log(magicToken, email, repairShop);

  try {
    const foundUser = await userModel.findOne({ email: email });

    if (foundUser && magicToken === foundUser.magicToken) {
      await foundUser.save();
      res.status(201).json({
        name: foundUser.name,
        message: "Authentication successful",
        repairShop: foundUser.repairShop,
      });
    } else {
      res.status(400).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500);
  }
});

router.get("/contactRepairShops", async (req, res) => {
  try {
    const allMessages = await contactRepairShopModel.find();
    res.status(200).json(allMessages);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/contactRepairShops", async (req, res) => {
  try {
    const newMessage = await contactRepairShopModel.create({
      name: req.body.name,
      email: req.body.email,
      location: req.body.location,
      registrationNumber: req.body.registrationNumber,
      troubleshootTime: req.body.troubleshootTime,
      message: req.body.message,
    });

    console.log(newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.json(error);
  }
});

router.post("/answerFromRepairShop", async (req, res) => {
  try {
    const newMessage = await repairShopAnswerModel.create({
      customerName: req.body.customerName,
      customerId: req.body.customerId,
      customerEmail: req.body.customerEmail,
      repairShopEmail: req.body.repairShopEmail,
      repairShopName: req.body.repairShopName,
      customerMessage: req.body.customerMessage,
      repairShopAnswer: req.body.repairShopAnswer,
      priceOffer: req.body.priceOffer,
      registrationNumber: req.body.registrationNumber,
    });

    console.log(newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.json(error);
  }
});

router.get("/answerFromRepairShop", async (req, res) => {
  try {
    const allMessages = await repairShopAnswerModel.find();
    res.status(200).json(allMessages);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
