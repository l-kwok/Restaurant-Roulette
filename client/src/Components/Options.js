import React, { useState } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import "../Style/Options.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
const Options = (props) => {
	const [showModal, setShowModal] = useState(false);
	const [rangeValue, setRangeValue] = useState(10);
	const [showRangeValue, setShowRangeValue] = useState(false);
	const [foodType, setFoodType] = useState("");
	const [openNow, setOpenNow] = useState(true);
	const closeModal = () => setShowModal(false);
	const openModal = () => setShowModal(true);

	const submitChanges = (e) => {
		const params = JSON.stringify({
			range: rangeValue,
			foodType: foodType,
			openNow: openNow,
		});
		props.retrieveParams(params);
		setShowModal(false);
	};

	const onSearchRangeChange = (e) => {
		setRangeValue(e.target.value);
		setShowRangeValue(true);
	};
	return (
		<div>
			<Modal show={showModal} onHide={closeModal} centered>
				<Modal.Header closeButton>
					<Modal.Title>Advanced Search</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="optionsFormGroups">
							<Form.Label className="formLabels">
								Search Within {rangeValue} km:
							</Form.Label>
							<RangeSlider
								id="searchRangeSlider"
								value={rangeValue}
								tooltip={showRangeValue ? "on" : "off"}
								tooltipLabel={(value) => `${value} km`}
								min={0.5}
								max={25}
								step={0.1}
								onChange={onSearchRangeChange}
								onAfterChange={() => setShowRangeValue(false)}
							/>
						</Form.Group>
						<Form.Group className="optionsFormGroups">
							<Form.Label className="formLabels">
								Types of Food: (Pick One)
							</Form.Label>
							<Row>
								<Col xs={6} md={4}>
									<Form.Check
										inline
										id="inline-radio-1"
										type={"radio"}
										label={`Japanese`}
										name="foodTypes"
										onChange={() => setFoodType("japanese")}
									/>
								</Col>
								<Col xs={6} md={4}>
									<Form.Check
										inline
										id="inline-radio-2"
										type={"radio"}
										label={`Korean`}
										name="foodTypes"
										onChange={() => setFoodType("korean")}
									/>
								</Col>
								<Col xs={6} md={4}>
									<Form.Check
										inline
										id="inline-radio-3"
										type={"radio"}
										label={`Western`}
										name="foodTypes"
										onChange={() => setFoodType("newamerican,tradeamerican")}
									/>
								</Col>

								<Col xs={6} md={4}>
									<Form.Check
										inline
										id="inline-radio-4"
										type={"radio"}
										label={`Chinese`}
										name="foodTypes"
										onChange={() => setFoodType("chinese")}
									/>
								</Col>
								<Col xs={6} md={4}>
									<Form.Check
										inline
										id="inline-radio-5"
										type={"radio"}
										label={`Indian`}
										name="foodTypes"
										onChange={() => setFoodType("indpak")}
									/>
								</Col>
								<Col xs={6} md={4}>
									<Form.Check
										inline
										id="inline-radio-6"
										type={"radio"}
										label={`Vietnamese`}
										name="foodTypes"
										onChange={() => setFoodType("vietnamese")}
									/>
								</Col>

								<Col xs={6} md={4}>
									<Form.Check
										inline
										id="inline-radio-7"
										type={"radio"}
										label={`German`}
										name="foodTypes"
										onChange={() => setFoodType("german")}
									/>
								</Col>
								<Col xs={6} md={4}>
									<Form.Check
										inline
										id="inline-radio-8"
										type={"radio"}
										label={`Fast Food`}
										name="foodTypes"
										onChange={() => setFoodType("hotdogs")}
									/>
								</Col>
								<Col xs={6} md={4}>
									<Form.Check
										id="inline-radio-9"
										type={"radio"}
										label={`Malaysian`}
										name="foodTypes"
										onChange={() => setFoodType("malaysian")}
									/>
								</Col>

								<Col xs={6} md={4}>
									<Form.Check
										id="inline-radio-10"
										type={"radio"}
										label={`Any`}
										name="foodTypes"
										defaultChecked={true}
										onChange={() => setFoodType("")}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group className="optionsFormGroups">
							<Form.Label className="formLabels">
								You Shouldn't change this:
							</Form.Label>
							<Form.Check
								defaultChecked={true}
								label={`Open Now`}
								id={`openNow`}
								value={openNow}
								onChange={() => setOpenNow(!openNow)}
							/>
						</Form.Group>
						<Form.Group className="optionsFormGroups">
							<Form.Label className="formLabels">Coming Soon:</Form.Label>
							<Form.Check
								disabled
								// type={"radio"}
								value={true}
								label={`Use Custom Location`}
								id={`customLocation`}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeModal}>
						Close
					</Button>
					<Button variant="primary" onClick={submitChanges}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
			<div className="optionsWrapper">
				<Button variant="primary" onClick={props.pickLocation}>
					<span>🎲</span> Pick For Me!
				</Button>{" "}
				<p onClick={openModal}>Advanced Search</p>
			</div>
		</div>
	);
};

export default Options;
