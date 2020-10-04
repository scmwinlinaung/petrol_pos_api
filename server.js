const express = require("express");
const app = express();
const saleRecordRoute = require("./api/routes/saleRecordRoute");
const purchaseRecordRoute = require("./api/routes/purchaseRecordRoute");
const prod = require("./api/utils/prod.json");

require("./api/utils/dbconnect");
// require("./api/utils/init");


const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api/v1", saleRecordRoute);
app.use("/api/v1", purchaseRecordRoute);

app.listen(prod.PORT, function() {
 console.log("Petrol Pos Server running at port 8000...");
});
