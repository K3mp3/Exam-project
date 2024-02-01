const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer");

router.post("/contactVibe", async (req, res) => {
  function sendUserMail() {
    try {
      const transporter = nodeMailer.createTransport({
        service: "Gmail",
        auth: {
          user: "k3mp314@gmail.com",
          pass: "vuzs xrnz zxrd mujz",
        },
      });

      const mailOptions = {
        from: "k3mp314@gmail.com",
        to: "melvinkempe@hotmail.com",
        subject: "Customer message",
        html: `
          <div style="padding: 32px; background-color: #090909; display: flex; flex-direction: column; border-radius: 15px; border: 1px solid #232323">
          <div style="display: flex; align-items: center;">
            <h1 style="color: #d9d9d9; font-size: 1.1rem;">Namn:</h1>
            <p style="color: #d9d9d9; margin-left: 16px; font-size: 1.1rem;">${req.body.userName}</p>
          </div>
          <div style="display: flex; align-items: center;">
            <h2  style="color: #d9d9d9; font-size: 1rem;">Email:</h2>
            <p style="color: #d9d9d9; margin-left: 16px; font-size: 1rem;">${req.body.userEmail}</p>
          </div>
          <p style="margin-bottom: 16px;">${req.body.userMessage}</p>
      
          <div style="width: 100%; height: 2px; background: #0D31F1;"></div>
          </div>
          `,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          res.status(500).json("Error sending email.");
        } else {
          res.status(201).json({ message: "Email sent successfully." });
        }
      });
    } catch (error) {
      res.status(500).json("Internal Server Error.");
    }
  }

  function sendConfirmation() {
    try {
      const transporter = nodeMailer.createTransport({
        service: "Gmail",
        auth: {
          user: "k3mp314@gmail.com",
          pass: "vuzs xrnz zxrd mujz",
        },
      });

      const mailOptions = {
        from: "k3mp314@gmail.com",
        to: req.body.userEmail,
        subject: "Customer message",
        html: `
        <div
            style="padding: 32px; background-color: #090909; border-radius: 15px; border: 1px solid #232323"
        >
            <div>
            <h1 style="color: #d9d9d9; font-size: 1rem; display: inline-block">Vi bekräftar att vi har tagit emot ett meddelande med följande information:</h1>
            </div>
            <div>
            <h1 style="color: #d9d9d9; font-size: 1rem; display: inline-block">Namn:</h1>
            <p style="color: #d9d9d9; font-size: 1rem; display: inline-block; margin-left: 16px">
                ${req.body.userName}
            </p>
            </div>
            <div>
            <h2 style="color: #d9d9d9; font-size: 1rem; display: inline-block">Email:</h2>
            <p style="color: #d9d9d9; font-size: 1rem; display: inline-block; margin-left: 16px">
                ${req.body.userEmail}
            </p>
            </div>
            <div>
            <h2 style="color: #d9d9d9; font-size: 1rem; display: inline-block">Meddelande:</h2>
            <p style="color: #d9d9d9; font-size: 1rem; display: inline-block; margin-left: 16px">
                ${req.body.userMessage}
            </p>
            </div>
            <div style="width: 100%; height: 2px; background: #0d31f1; margin-top: 16px"></div>
        </div>
        `,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          res.status(500).json("Error sending email.");
        } else {
          res.status(201).json({ message: "Email sent successfully." });
        }
      });
    } catch (error) {
      res.status(500).json("Internal Server Error.");
    }

    sendUserMail();
  }

  sendConfirmation();
});

module.exports = router;
