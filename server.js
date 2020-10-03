const express = require("express");
const app = express();
const saleRecordRoute = require("./api/routes/saleRecordRoute");
require("./api/utils/dbconnect");
require("./api/utils/init");


const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api/v1", saleRecordRoute);

app.listen(8000, function() {
 console.log("Server running at port 8000...");
});
