const express = require("express");
let app = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Update } = require("../../../db/crud/update");
const conn = require("../../../db/config");

// ENVIRONMENT VARIABLES
require("dotenv").config();

app.post("/", async (req, res) => {
  const { token, password: plainTextPassword } = req.body;
  try {
    const adminuser = jwt.verify(token, process.env.JWT_SECRET);
    const _id = adminuser.id;
    const password = await bcrypt.hash(plainTextPassword, 10);
    Update(conn, "admin_users", { password: password }, { id: _id });
    return res.json({ status: "ok", data: "Password Updated" });
  } catch (error) {
    return res.json({ status: "error", error: error });
  }
});

module.exports = app;