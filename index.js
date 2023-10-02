const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  return res.status(200).json({ message: "SERVER WORKING" });
});

app.use("/api/users", require("./routes/users"));

app.listen(PORT, () => {
  console.log("SERVER WROKING " + PORT);
});
