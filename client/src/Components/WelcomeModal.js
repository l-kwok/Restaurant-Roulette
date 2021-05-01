import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../Style/WelcomeModal.css";

const WelcomeModal = () => {
	const [show, setShow] = useState(true);

	const handleClose = () => setShow(false);
	return (
		<div>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Random Restaurant Generator</Modal.Title>
				</Modal.Header>
				<Modal.Body className="welcome-content">
					<h3 className="welcome-version">Version: 1.0 </h3>
					{/* <h5 className="welcome-sectionTitles">Getting Started:</h5>
					<p className="welcome-sectionBodies">
						Thanks for trying out the Random Restaurant Generator!
					</p> */}
					<h5 className="welcome-sectionTitles">What's New:</h5>
					<p className="welcome-sectionBodies">
						<ul className="welcome-sectionLists">
							<li>Location Based Searching</li>
							<li>Search for restaurants by Cuisine and Distance</li>
						</ul>
					</p>
					<h5 className="welcome-sectionTitles">Features:</h5>
					<p className="welcome-sectionBodies">
						<ul className="welcome-sectionLists">
							<li>Location Based Searching</li>
							<li>Search for restaurants by Cuisine and Distance</li>
						</ul>
					</p>
					<h5 className="welcome-sectionTitles">Coming Soon:</h5>
					<p className="welcome-sectionBodies">
						<ul className="welcome-sectionLists">
							<li>Custom Location Searching</li>
							<li>Restaurant Favourites</li>
							<li>Restaurant History</li>
						</ul>
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default WelcomeModal;
