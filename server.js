const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const path = require('path');
//temp to reduce api calls to google servers
const fs = require("fs");
const dummyData = require("./placesData.json");

const { Client } = require("@googlemaps/google-maps-services-js");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
// const googleMapsClient = new Client({}); //instantiate google maps client

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/places", (req, res) => {
	const request = req.body;
	console.log(req.body);
	if (request.foodType === "") {
		request.foodType =
			"japanese,korean,vietnamese,hotdogs,chinese,newamerican,tradeamerican,indpak";
	}
	axios
		.get(
			`https://api.yelp.com/v3/businesses/search?categories=${request.foodType}&latitude=${request.location.lat}&longitude=${request.location.lng}&radius=${request.range}&open_now=${request.openNow}&limit=50`,
			{
				headers: {
					Authorization: `Bearer ${process.env.API_KEY_YELP}`,
				},
			}
		)
		.then((response) => {
			// console.log(response.data);
			res.send(response.data);
			// fs.writeFile("placesData.json", JSON.stringify(response.data), (err) => {
			// 	if (err) {
			// 		throw err;
			// 	}
			// 	console.log("JSON data is saved.");
			// });
		})
		.catch((e) => {
			console.log(`Businesses API Error : ${e}`);
			if (e.status === 429) {
				res.sendStatus(429); //Quota Reached
			} else {
				res.sendStatus(500); //Internal Server Error
			}
		});
});

if (process.env.NODE_ENV === "production") {
	const buildDir = '/client/build'
	app.use(express.static(path.join(__dirname, buildDir)));
	app.get("/*", (req, res) => {
		res.sendFile(path.join(__dirname, buildDir, "index.html"));
	});
}

app.listen(port, () => console.log(`Listening on port ${port}`));
