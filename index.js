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
	console.log("start");
	getData();
}

// delay loop
const delayLoop = (fn, delay) => {
	return (x, i) => {
		setTimeout(() => {
			fn(x);
		}, i * delay);
	};
};

// get data from API
async function getData() {
	console.log("getData");
	const api_url = "https://kea-alt-del.dk/kata-distortion/";
	const response = await fetch(api_url);
	const data = await response.json();
	console.log(data);
	makeObject(data);
	// data.forEach((element) => {
	// 	makeObject(element);
	// });
	// allObjects.forEach(showObject);
	// allObjects.forEach(delayLoop(showObject, 300));
	// showObject(allObjects);
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
	console.log(myObject.loggedAt);
}

// console.log(myObject);
