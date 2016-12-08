const crypto = require("crypto");

const localStorage = window.localStorage || {};

function decryptMessage(password, message) {
	const decipher = crypto.createDecipher("aes-256-cbc", password);

	let decrypted = "";

	try {
		decrypted += decipher.update(message, "base64", "utf8");
		decrypted += decipher.final("utf8");
	} finally {
		decrypted = decrypted || null;
	}

	return decrypted;
}

function decryptAllMessages(password) {
	document.querySelectorAll(".message").forEach(message => {
		message.innerHTML = decryptMessage(password, message.innerHTML);
	});
}

document.querySelector("#decrypt").onclick = () => {
	const password = document.querySelector("#password").value;
	localStorage.password = password;

	decryptAllMessages(password);
};

if(localStorage.password) {
	decryptAllMessages(localStorage.password);
}

document.querySelectorAll(".entry").forEach(entry => {
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
