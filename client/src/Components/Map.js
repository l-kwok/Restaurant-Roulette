import React, { useState, useEffect } from "react";
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";
import "../Style/Map.css";
import "../Style/MapStyle";
import MapStyle from "../Style/MapStyle";
import Spinner from "react-bootstrap/Spinner";
import Options from "../Components/Options";
import MarkerAndWindow from "../Components/MarkerAndWindow";

const Map = (props) => {
	const [places, setPlaces] = useState(null); //current fetched restaurants
	const [usedPlaceIndices, setUsedPlaceIndices] = useState([]);
	const [query, setQuery] = useState(null);
	const [placesIsLoaded, setPlacesIsLoaded] = useState(false); //if the fetch completed
	const [selectedPlace, setSelectedPlace] = useState(null); //current marked restaurant
	const [googleSearchQuery, setGoogleSearchQuery] = useState(null); //google maps link to the currently selected restaurant
	const [infoWindowIsOpen, setInfoWindowIsOpen] = useState(false);
	const [youAreHereWindowIsOpen, setYouAreHereWindowIsOpen] = useState(false);

	//Map Options
	const [zoom, setZoom] = useState(13);
	const [center, setCenter] = useState(props.center);
	const [userLocation, setUserLocation] = useState(props.center);
	const containerStyle = {
		width: "100vw",
		height: "100vh",
	};
	const mapOptions = {
		disableDefaultUI: true,
		styles: MapStyle,
	};

	useEffect(() => {
		setPlacesIsLoaded(false);

		let reqParsed = {
			range: 1000,
			foodType: "",
			openNow: true,
			location: userLocation,
		};
		if (query !== null) {
			console.log(`request: ${query}`);
			reqParsed = JSON.parse(query);
		}
		fetch("/api/places", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				range: reqParsed.range,
				foodType: reqParsed.foodType,
				openNow: reqParsed.openNow,
				location: userLocation,
			}),
		}).then((res) => {
			res.text().then((res) => {
				const resParsed = JSON.parse(res);
				//format for google maps markers
				resParsed.businesses.forEach((item) => {
					item.coordinates = {
						lat: item.coordinates.latitude,
						lng: item.coordinates.longitude,
					};
				});
				setPlaces(resParsed);
				setUsedPlaceIndices(
					resParsed.businesses.map((item, index) => {
						return index;
					})
				);
				setPlacesIsLoaded(true);
			});
		});
	}, [userLocation, query]);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			setUserLocation({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
			setCenter({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		});
	}, []);

	//Load React Google Maps
	const { isLoaded, loadError } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_API_KEY_MAPS,
	});

	const pickLocation = () => {
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
			`https://www.google.com/maps/search/?api=1&query=${placeQueryName}`
		);

		usedPlaceIndices.splice(selectedIndex, 1);
		if (usedPlaceIndices.length === 0) {
			setUsedPlaceIndices(
				places.businesses.map((item, index) => {
					return index;
				})
			);
		}
	};

	const retrieveParams = (params) => {
		setQuery(params);
	};

	const closeInfoWindow = () => {
		setInfoWindowIsOpen(false);
	};

	const openInfoWindow = () => {
		setInfoWindowIsOpen(true);
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
					{placesIsLoaded ? (
						<MarkerAndWindow
							selectedPlace={selectedPlace}
							infoWindowIsOpen={infoWindowIsOpen}
							googleSearchQuery={googleSearchQuery}
							closeInfoWindow={closeInfoWindow}
							openInfoWindow={openInfoWindow}
						></MarkerAndWindow>
					) : null}
					<Marker
						position={{
							lat: userLocation.lat,
							lng: userLocation.lng,
						}}
						draggable={true}
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
