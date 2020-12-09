const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {},
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { sender } = req.query;

    const mailOptions = {
      from: sender,
      to: 'hellomycycles@gmail.com',
      subject: 'My Cycles Support',
      html: `<p style="font-size: 16px;">Hello World!</p>`,
    };

    return transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.send(error.toString());
      }
      return res.send('Send');
    });
  });
});
