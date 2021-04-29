import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import "../Style/ErrorAlert.css";
const ErrorModal = ({ errorType, showError, setShowError }) => {
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		switch (errorType) {
			case 1:
				setErrorMessage(
					"Looks like the servers might be down, but they'll be back shortly! Please wait 30 seconds to 1 minute and refresh your browser. Sorry for the inconvenience."
				);

				setShowError(true);
				break;
			case 2:
				setErrorMessage(
					"Looks like we've hit the max quota for the day! Quotas reset every night at 12:00AM PST, sorry for the inconvenience. Note: We are working towards getting a larger quota, thank you for being patient!"
				);
				setShowError(true);
				break;
			case 3:
				setErrorMessage(
					"Looks like we couldn't find anything with your specified options! Try expanding the search range OR if you're searching late at night, uncheck \"Open Now\" to view restaurants that aren't open."
				);
				setShowError(true);
				break;
			case 4:
				setErrorMessage(
					"It doesn't look like your browser supports location finding! Please update your browser or use another browser that supports location finding. If your browser is up to date please turn on location finding and refresh the browser!"
				);
				setShowError(true);
				break;
			default:
				setErrorMessage(
					"Looks like an unknown error has occurred! Please try: restarting the browser. If that doesn't help, please wait as we roll out a fix!"
				);
				setShowError(true);
				break;
		}

		if (errorType === 0) {
			setShowError(false);
		}
	}, [errorType, setShowError]);

	const handleClose = () => {
		setShowError(false);
	};

	if (showError) {
		return (
			<div>
				<Alert variant="danger" onClose={handleClose} dismissible>
					<Alert.Heading>Oops!</Alert.Heading>
					<p>{errorMessage}</p>
				</Alert>
			</div>
		);
	} else {
		return <></>;
	}
};

export default ErrorModal;
