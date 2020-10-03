const bcrypt = require("bcryptjs");
const SaleRecord = require("../models/saleRecordModel");
const config = require("./config");

onCreate = async () => {
	try {
		const saleRecordID = "$5";
		const goodType = "Foreign Imported Oil";
		const customerName = "U Soe Lin Win";
		const customerPhone = "092016555";
		const paymentType = "15.11.2030";
		const total = 120000;
		const status = "Active";
		const saleRecord = {
			saleRecordID: saleRecordID,
			goodType: goodType,
			customerName: customerName,
			customerPhone: customerPhone,
			paymentType: paymentType,
			total: total,
			status: status
		};

		const newSaleRecord = new SaleRecord(saleRecord)

		await newSaleRecord.save();
		console.log("on create", saleRecordModel);
	} catch (error) {
		console.log("Default data has been added!!");
	}
};

onCreate();
