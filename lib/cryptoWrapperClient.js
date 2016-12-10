const asmCrypto = require("asmcrypto.js");

module.exports = {
	deriveKey: password => asmCrypto.PBKDF2_HMAC_SHA256.bytes(password, "sodium chloride", 4096, 32),
	/*encrypt: (key, data) => asmCrypto.bytes_to_base64(asmCrypto.AES_CBC.encrypt(data, key)),*/
	decrypt: (key, data) => {
		const [ iv, message ] = data.split("-").map(asmCrypto.base64_to_bytes);

		return asmCrypto.bytes_to_string(asmCrypto.AES_CBC.decrypt(message, key, true, iv));
	},
	toBase64: a => asmCrypto.bytes_to_base64(a)
};
