import React, { useState } from "react";
import Map from "./Components/Map";
import WelcomeModal from "./Components/WelcomeModal";
// import {
// 	Navbar,
// 	Nav,
// 	NavDropdown,
// 	Form,
// 	FormControl,
// 	Button,
// } from "react-bootstrap";
import "./Style/App.css";

function App() {
	return (
		<div className="App">
			<div className="header">
				<h1 id="pageTitle">Food Picker </h1>
				<img src="icon.svg" alt="icon" />
			</div>
			<WelcomeModal></WelcomeModal>
			<Map
				center={{
					lat: 49.28273,
					lng: -123.120735,
				}}
			></Map>
		</div>
	);
}
export default App;
