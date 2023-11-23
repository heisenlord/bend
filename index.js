const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./model/Employee");
const studentRoute = require("./controller/studentRoute");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", true); //supress Deprection Warning
mongoose.connect(
  "mongodb+srv://test:12345@cluster2.2op5net.mongodb.net/employee"
);

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        // Send success and user ID
        res.json({ success: true, userId: user._id });
      } else {
        res.json({ success: false, message: "The password is incorrect" });
      }
    } else {
      res.json({ success: false, message: "No record existed" });
    }
  });
});

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   EmployeeModel.findOne({ email: email }).then((user) => {
//     if (user) {
//       if (user.password === password) {
//         res.json("success");
//       } else {
//         res.json("the password is incorrect");
//       }
//     } else {
//       res.json("No record existed");
//     }
//   });
// });

app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((e) => res.json(e))
    .catch((err) => res.json(err));
});
app.use("/studentRoute", studentRoute);

app.listen(4000, () => {
  console.log("server is running 4005");
});
