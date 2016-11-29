const db = require("./lib/db");

const message = process.argv[2];

console.log(`Adding entry: '${message}'!`);

db.incrAsync("diary-entries")
.then(i => {
	return Promise.all([
		db.zaddAsync("diary-dates", Date.now(), i),
		db.setAsync("entry:" + i, message)
	]);
});
