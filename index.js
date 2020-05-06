"use strict";

window.addEventListener("DOMContentLoaded", start);

let allObjects = [];

const objectOne = {
	id: "",
	inQueue: "",
	loggedAt: "",
	personel: [],
	name: "",
};

function start() {
	// console.log("start");
	let visualizer = document.querySelector("#visualizer");
	visualizer.style.setProperty("--ratio", 0);
}

const looper = setInterval(() => {
	getData();
}, 5000);

// get data from API
async function getData() {
	// console.log("getData");
	const api_url = "https://kea-alt-del.dk/kata-distortion/";
	const response = await fetch(api_url);
	const data = await response.json();
	console.log(data);
	makeObject(data);
}

// make object
function makeObject(data) {
	let myObject = Object.create(objectOne);
	myObject.id = data.id;
	myObject.inQueue = data.inQueue;
	myObject.loggedAt = data.loggedAt;
	myObject.personel = data.personel;
	myObject.name = data.name;
	// allObjects.push(myObject);
	showObject(myObject);
}

// append to DOM
function showObject(myObject) {
	document.querySelector("h2").textContent = myObject.loggedAt;
	document.querySelector("h3").textContent = myObject.inQueue;
	// console.log(myObject.loggedAt);
	let ratio = myObject.inQueue;
	console.log(`ratio is ${ratio}`);
	let visualizer = document.querySelector("#visualizer");
	// visualizer.style.setProperty("--ratio", ratio);
	visualizer.style.width = ratio * 5 + "%";
	if (ratio <= 5) {
		console.log("Beer Time!");
		document.querySelector("h4").textContent = "Beer Time!";
		visualizer.style.backgroundColor = "blue";
	} else if (ratio > 5 && ratio < 10) {
		console.log("Wait a while ...");
		visualizer.style.backgroundColor = "yellow";
		document.querySelector("h4").textContent = "Wait a while";
	} else if (ratio > 10) {
		console.log("Leave it");
		visualizer.style.backgroundColor = "red";
		document.querySelector("h4").textContent = "Leave it";
	}
}
