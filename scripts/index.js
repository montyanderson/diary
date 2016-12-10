const cryptoWrapper = window.cryptoWrapper = require("../lib/cryptoWrapper.js");
const asmCrypto = window.asmCrypto = require("asmcrypto.js");

const localStorage = window.localStorage || {};
const $ = q => document.querySelectorAll(q);

function decryptAllMessages(password) {
	const key = cryptoWrapper.deriveKey(password);
	console.log(cryptoWrapper.toBase64(key));

	$(".message").forEach(m => {
		try {
			const encryptedMessage = m.innerHTML;
			console.log(encryptedMessage);
			m.innerHTML = cryptoWrapper.decrypt(key, encryptedMessage);
		} catch(error) {
			console.log(error);
		}
	});
}

$("#decrypt")[0].onclick = () => {
	const password = document.querySelector("#password").value;
	localStorage.password = password;

	decryptAllMessages(password);
};

decryptAllMessages(localStorage.password);

$(".entry").forEach(entry => {
	let visible = true;

	entry.onclick = () => {
		visible = !visible;

		if(visible) {
			entry.children[1].style.display = "none";
		} else {
			entry.children[1].style.display = "block";
		}
	};
});
