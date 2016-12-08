const readline = require("readline");
const crypto = require("crypto");
const db = require("./lib/db");

const message = process.argv[2];

console.log(`Adding entry: '${message}'!`);

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question("Password to encrypt with: ", (password) => {
	const cipher = crypto.createCipher("aes-256-cbc", password);

	let encryptedMessage = "";
	encryptedMessage += cipher.update(message, "utf8", "base64");
	encryptedMessage += cipher.final("base64");

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
