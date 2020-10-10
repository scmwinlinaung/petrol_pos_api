const bcrypt = require("bcryptjs");
const PurchaseRecord = require("../models/purchaseRecordModel");
const config = require("./config");

onCreate = async () => {
	try {
		const goodType = "Foreign Imported Oil";
		const companyName = "BOC";
		const companyPhone = "09201632";
		const paymentType = "cash down";
		const total = 95000;
		const status = "active";
		const purchaseRecord = {
			companyName: companyName,
			companyPhone: companyPhone,
			goodType: goodType,
			quantity: 3000,
			rateFixed: 450,
			paymentType: paymentType,
			total: total,
			status: status
		};

		const newPurchaseRecord = new PurchaseRecord(purchaseRecord)

		await newPurchaseRecord.save();
		console.log("on create", purchaseRecord);
	} catch (error) {
		console.log("Default data has been added!!");
	}
};

onCreate();
