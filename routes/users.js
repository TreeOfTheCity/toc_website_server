const express = require("express");
const router = express.Router();
const { GoogleSpreadsheet } = require("google-spreadsheet");
require("dotenv").config();

router.post("/joinus", async (req, res) => {
  try {
    const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.getRows();

    const { name, email, contactnumber, role, receiveUpdates } = req.body;

    await sheet.addRow({
      NAME: name,
      EMAIL: email,
      "CONTACT NUMBER": contactnumber,
      ROLE: role,
      "RECEIVE UPDATES": receiveUpdates,
    });

    return res.status(200).json({
      message: {
        text: "Welcome to TreeOfCity",
        type: "success",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      message: {
        text: "Please try again",
        type: "error",
      },
    });
  }
});

module.exports = router;
