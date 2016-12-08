const express = require("express");
const moment = require("moment");
const db = require("./lib/db");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) => {
	db.zrangebyscoreAsync("diary-dates", +moment().subtract(7, "days"), +moment(), "WITHSCORES")
	.then(items => {
		const entries = [];

		for(let i = 0; i < items.length; i++) {
			entries.push({
				index: items[i],
				date: +items[++i]
			});
		}

		return Promise.all(entries.map(entry => {
			return db.getAsync("entry:" + entry.index)
			.then(message => {
				entry.message = message;
				return entry;
			});
		}));
	})
	.then(entries => {
		const colors = ["#f39c12", "#e74c3c", "#2980b9", "#c0392b"];

		entries.forEach((entry, i) => {
			entry.dateString = moment(entry.date).format("llll");
			entry.color = colors[ i % colors.length ];
		});

		entries = entries.sort((a, b) => {
			if(a.date < b.date) return -1;
			if(a.date > b.date) return 1;
			return 0;
		});

		res.locals = { entries };
		res.render("index");
	});
});

app.listen(8080);
