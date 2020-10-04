const bcrypt = require("bcryptjs");
const SaleRecord = require("../models/saleRecordModel");
const config = require("./config");

onCreate = async () => {
	try {
		const goodType = "Foreign Imported Oil";
		const customerName = "Kyaw Soe Thu";
		const customerPhone = "092016111";
		const paymentType = "15.11.2030";
		const total = 120000;
		const status = "Active";
		const saleRecord = {
			customerName: customerName,
			customerPhone: customerPhone,
			goodType: goodType,
			quantity: 560,
			rateFixed: 450,
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
