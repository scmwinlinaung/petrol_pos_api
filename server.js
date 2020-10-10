const express = require("express");
const app = express();
const saleRecordRoute = require("./api/routes/saleRecordRoute");
const purchaseRecordRoute = require("./api/routes/purchaseRecordRoute");
const userRoute = require("./api/routes/userRoute");
const saletDebtRecordRoute = require("./api/routes/saleDebtRecordRoute");
const purchaseDebtRecordRoute = require("./api/routes/purchaseDebtRecordRoute");
const inStockRecordRoute = require("./api/routes/inStockRecordRoute");

const prod = require("./api/utils/prod.json");

require("./api/utils/dbconnect");
// require("./api/utils/init");
const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api/v1", saleRecordRoute);
app.use("/api/v1", purchaseRecordRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", saletDebtRecordRoute)
app.use("/api/v1", purchaseDebtRecordRoute);
app.use("/api/v1", inStockRecordRoute);

app.listen(prod.PORT, function() {
 console.log("Petrol Pos Server running at port 8000...");
});
