"use strict";
import anime from "animejs/lib/anime.es.js";

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
	anime();
}

const looper = setInterval(() => {
	getData();
}, 5000);

anime({
	targets: "div",
	opacity: [0, 1],
	duration: 500,
	delay: anime.stagger(300),
});

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
	document.querySelector(".queue-number").textContent = myObject.inQueue;
	// console.log(myObject.loggedAt);
	let ratio = myObject.inQueue;
	console.log(`ratio is ${ratio}`);
	let visualizer = document.querySelector("#visualizer");
	// visualizer.style.setProperty("--ratio", ratio);
	// visualizer.style.width = ratio * 2 + "%";
	visualizer.style.width = (ratio / 25) * 100 + "%";
	if (ratio <= 5) {
		console.log("Miller time!");
		document.querySelector(".message").textContent = "Miller time!";
		document.querySelector(".message").style.color = "white";
		visualizer.style.backgroundColor = "white";
		document.querySelector(".wrapper").style.backgroundColor = "var(--primary-color)";
	} else if (ratio > 5 && ratio < 10) {
		console.log("Wait a while ...");
		visualizer.style.backgroundColor = "var(--secondary-color)";
		document.querySelector(".message").textContent = "Hold your horses";
		document.querySelector(".message").style.color = "var(--secondary-color)";
		document.querySelector(".wrapper").style.backgroundColor = "white";
	} else if (ratio > 10) {
		console.log("Leave it");
		visualizer.style.backgroundColor = "var(--primary-color)";
		document.querySelector(".message").textContent = "Don't bother";
		document.querySelector(".message").style.color = "var(--primary-color)";
		document.querySelector(".wrapper").style.backgroundColor = "white";
	}
}
