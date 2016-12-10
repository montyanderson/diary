const readline = require("readline");
const cryptoWrapper = require("./lib/cryptoWrapper");
const db = require("./lib/db");

const message = process.argv[2];

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question("Password to encrypt with: ", password => {
	const key = cryptoWrapper.deriveKey(password);
	console.log(`Derived key: ${key.toString("base64")} (${key.length} bytes)`);

	const encryptedMessage = cryptoWrapper.encrypt(key, message);
	console.log(`Encrypted Message: ${encryptedMessage}`);

	db.incrAsync("diary-entries")
	.then(i => {
		return Promise.all([
			db.zaddAsync("diary-dates", Date.now(), i),
			db.setAsync("entry:" + i, encryptedMessage)
		]);
	})
	.then(() => {
		process.exit(0);
	});
});
