import React, { useState, useLayoutEffect } from "react";
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";
import "../Style/Map.css";
import "../Style/MapStyle";
import MapStyle from "../Style/MapStyle";
import { Spinner } from "react-bootstrap";
import Options from "../Components/Options";
import MarkerAndWindow from "../Components/MarkerAndWindow";

const Map = ({
	errorType,
	showError,
	setShowError,
	setErrorType,
	userLocation,
}) => {
	const [places, setPlaces] = useState(null); //current fetched restaurants
	const [usedPlaceIndices, setUsedPlaceIndices] = useState([]);
	const [query, setQuery] = useState(null);
	const [placesIsLoaded, setPlacesIsLoaded] = useState(false); //if the fetch completed
	const [selectedPlace, setSelectedPlace] = useState(null); //current marked restaurant
	const [googleSearchQuery, setGoogleSearchQuery] = useState(null); //google maps link to the currently selected restaurant
	const [infoWindowIsOpen, setInfoWindowIsOpen] = useState(false);
	const [youAreHereWindowIsOpen, setYouAreHereWindowIsOpen] = useState(false);

	//Map Options
	const [zoom, setZoom] = useState(14);
	const [center, setCenter] = useState(userLocation);
	const containerStyle = {
		width: "100vw",
		height: "100vh",
	};
	const mapOptions = {
		disableDefaultUI: true,
		styles: MapStyle,
	};

	useLayoutEffect(() => {
		setPlacesIsLoaded(false);

		//default request
		let reqParsed = {
			range: 5,
			foodType: "",
			openNow: true,
			location: userLocation,
		};
		if (query !== null) {
			reqParsed = JSON.parse(query);
		}
		fetch("/api/places", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				range: reqParsed.range * 1000,
				foodType: reqParsed.foodType,
				openNow: reqParsed.openNow,
				location: userLocation,
			}),
		}).then((res) => {
			if (res.status === 500) {
				setErrorType(1); //Server Error
				setPlacesIsLoaded(true);
			} else if (res.status === 429) {
				setErrorType(2); //Quota Reached
				setPlacesIsLoaded(true);
			} else {
				//Res Status 200
				res.text().then((res) => {
					const resParsed = JSON.parse(res);
					//format for google maps markers
					resParsed.businesses.forEach((item) => {
						item.coordinates = {
							lat: item.coordinates.latitude,
							lng: item.coordinates.longitude,
						};
					});

					if (resParsed.total === 0) {
						setErrorType(3);
						setShowError(true);
						setCenter(userLocation);
					} else {
						setErrorType(0);
						setShowError(false);
						// if(places === null){
						// 	const place = resParsed.businesses[0];
						// 	setSelectedPlace(place);
						// 	setCenter(place.coordinates);
						// 	setZoom(15);
						// 	setInfoWindowIsOpen(true);
						// }
					}

					setPlaces(resParsed);
					setUsedPlaceIndices(
						resParsed.businesses.map((item, index) => {
							return index;
						})
					);
					setPlacesIsLoaded(true);
				});
			}
		});
	}, [userLocation, query, setErrorType, setShowError]);

	//Load React Google Maps
	const { isLoaded, loadError } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_API_KEY_MAPS,
	});

	const pickLocation = () => {
		if (errorType === 0 && showError === false) {
			const selectedIndex = Math.floor(Math.random() * usedPlaceIndices.length);
			const indexOfLocation = usedPlaceIndices[selectedIndex];
			const place = places.businesses[indexOfLocation];
			const placeQueryName = place.name.replace(/\s/g, "+");

			//update map
			setSelectedPlace(place);
			setCenter(place.coordinates);
			setZoom(15);
			setInfoWindowIsOpen(true);
			setGoogleSearchQuery(
				`https://www.google.com/maps/search/?api=1&query=${placeQueryName}+${place.location.address1}+${place.location.city}`
			);

			usedPlaceIndices.splice(selectedIndex, 1);
			if (usedPlaceIndices.length === 0) {
				setUsedPlaceIndices(
					places.businesses.map((item, index) => {
						return index;
					})
				);
			}
		} else {
			setShowError(true);
			setCenter(userLocation);
		}
	};

	const retrieveParams = (params) => {
		setQuery(params);

		if (errorType === 1) {
			setErrorType(0); //Resolve type 1 errors (empty business array)
			setShowError(false);
		}
	};

	if (loadError) {
		return (
			<div className="fullScreenWrapper">
				<div>Map cannot be loaded right now, sorry.</div>
			</div>
		);
	}

	if (isLoaded && placesIsLoaded) {
		return (
			<div id="mapWrapper">
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={zoom}
					options={mapOptions}
					onClick={() => {
						setInfoWindowIsOpen(false);
						setYouAreHereWindowIsOpen(false);
					}}
				>
					<div className="header">
						<h1 id="pageTitle">Random Restaurant Generator </h1>
						<img src="icon.svg" alt="icon" />
					</div>
					{placesIsLoaded && errorType === 0 ? (
						<MarkerAndWindow
							selectedPlace={selectedPlace}
							infoWindowIsOpen={infoWindowIsOpen}
							googleSearchQuery={googleSearchQuery}
							closeInfoWindow={() => setInfoWindowIsOpen(false)}
							openInfoWindow={() => setInfoWindowIsOpen(true)}
						></MarkerAndWindow>
					) : null}

					<Marker
						position={{
							lat: userLocation.lat,
							lng: userLocation.lng,
						}}
						onClick={() => setYouAreHereWindowIsOpen(true)}
					>
						{youAreHereWindowIsOpen ? (
							<InfoWindow
								position={{
									lat: userLocation.lat,
									lng: userLocation.lng,
								}}
								onCloseClick={() => setYouAreHereWindowIsOpen(false)}
							>
								<div className="InfoWindowContent">
									<h4 id="InfoWindowTitle">You Are Here!</h4>
								</div>
							</InfoWindow>
						) : null}
					</Marker>
				</GoogleMap>
				<Options
					retrieveParams={retrieveParams}
					pickLocation={pickLocation}
				></Options>
			</div>
		);
	} else {
		return (
			<div className="fullScreenWrapper">
				<Spinner animation="grow" variant="primary" role="status"></Spinner>
				<span className="sr-only">Loading...</span>
			</div>
		);
	}
};

export default Map;
