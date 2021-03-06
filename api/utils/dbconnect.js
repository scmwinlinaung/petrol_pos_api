const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const prod = require("./prod.json");
const url = prod.database.instances.instanceMongo.url;

onConnect = async () => {
try {
	await mongoose
	.connect(url, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
	console.log(`Connected to mongo at ${url}`);
}
catch(err) {
	console.log("failed connected to database ", err);
}
}

onConnect();

