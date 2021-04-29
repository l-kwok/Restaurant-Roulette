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
					<Modal.Title>Food Picker: In Development</Modal.Title>
				</Modal.Header>
				<Modal.Body className="welcome-content">
						<h3 className="welcome-version">Version: 1.0 </h3>
                        <h5 className="welcome-sectionTitles">Getting Started:</h5>
                        <p className="welcome-sectionBodies">
                            Thanks for trying out the [INSERT APP NAME]! Make sure you "Allow Location" at the top before starting, otherwise the application will use Downtown Vancouver by default.
                        </p>
                        <h5 className="welcome-sectionTitles">Features:</h5>
                        <ul className="welcome-sectionLists">
                            <li>
                                Location Based Searching
                            </li>
                            <li>
                                Search for restaurants by Cuisine and Distance
                            </li>
                            <li>
                                Note: You may see repeat restaurants for a single search, change the search options (range, cuisine, opennow) if you want new restaurants. Working on improving this. 
                            </li>
                        </ul>
                        <h5 className="welcome-sectionTitles">Coming Soon:</h5>
                        <ul className="welcome-sectionLists">
                            <li>
                                Custom Location Searching
                            </li>
                            <li>
                                Personal Restaurant Lists & Restaurant Favouriting
                            </li>
                            <li>
                                Restaurant History
                            </li>
                        </ul>
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
