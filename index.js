require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const mongoose = require("mongoose");
console.log(process.env.MONGODB);

// mongoose.connect("mongodb://127.0.0.1:27017/frmecart");
 mongoose.connect(process.env.MONGODB);
//mongoose.connect("mongodb://shafeequemk80:shafeequemk80@farado-db.t8xnvt4.mongodb.net/?retryWrites=true&w=majority&appName=farado-db")

const app = express();
const path = require("path");
const moment = require("moment");

const user_route = require("./routes/userRoute");
const admin_route = require("./routes/adminRoute");

const bodyparser = require("body-parser");
const nocache = require("nocache");
const { log } = require("console");


app.use("/static", express.static(path.join(__dirname, "public")));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/", user_route);
app.use("/admin", admin_route);


app.use('*',(req, res)=>{
  res.status(404).render(__dirname + '/views/users/404.ejs',{pageName:"404"})
})
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
  console.log(`http://localhost:${PORT}/home`);
  console.log(`http://localhost:${PORT}/admin`);
});
