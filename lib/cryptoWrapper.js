const crypto = require("crypto");

module.exports = {
	deriveKey: password => crypto.pbkdf2Sync(password, "sodium chloride", 4096, 32, "sha256"),
	encrypt: (key, data) => {
		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
		return iv.toString("base64") + "-" + cipher.update(data, "utf8", "base64") + cipher.final("base64");
	},
	/*decrypt: (key, data) => {
		const decipher = crypto.createDecipher("aes-256-cbc", key);
		return decipher.update(data, "base64", "utf8") + decipher.final("utf8");
	},*/
	toBase64: a => a.toString("base64")
};
