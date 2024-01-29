const express = require("express");
const cors = require("cors");
const users = require("./routes/users");
const easyslip = require("./routes/easyslip")
const auths = require("./routes/auth")
const product = require("./routes/product")
const app = express();
const bodyParser = require('body-parser')
const order =require('./routes/order')
app.use(bodyParser.json())
app.use(express()); // ต้องกำหนด express.json() ก่อน cors()

app.use(cors());

app.get("/hello", (req, res) => {
    console.log("Hello world");
});


app.use(users);
app.use(easyslip)
app.use(auths)
app.use(product)
app.use(order)
const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
