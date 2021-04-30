import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
const MarkerAndWindow = ({
	selectedPlace,
	infoWindowIsOpen,
	googleSearchQuery,
	closeInfoWindow,
	openInfoWindow,
}) => {
	return (
		<>
			{selectedPlace ? (
				<Marker
					position={{
						lat: selectedPlace.coordinates.lat,
						lng: selectedPlace.coordinates.lng,
					}}
					icon={{
						url: "icon.svg",
						scaledSize: new window.google.maps.Size(30, 30),
						origin: new window.google.maps.Point(0, 0),
						anchor: new window.google.maps.Point(15, 5),
					}}
					onClick={openInfoWindow}
				></Marker>
			) : null}

			{infoWindowIsOpen ? (
				<>
					<InfoWindow
						position={{
							lat: selectedPlace.coordinates.lat,
							lng: selectedPlace.coordinates.lng,
						}}
						onCloseClick={closeInfoWindow}
					>
						<div className="InfoWindowContent">
							<h4 id="InfoWindowTitle">{selectedPlace.name}</h4>
							<p id="InfoWindowAddressTitle">{`Address:`}</p>
							<p id="InfoWindowAddress">{`${selectedPlace.location.display_address}`}</p>
							<p id="InfoWindowLink">
								<a
									className="links"
									href={googleSearchQuery}
									target="_blank"
									rel="noreferrer"
								>
									View on Google Maps
								</a>
							</p>
						</div>
					</InfoWindow>
				</>
			) : null}
		</>
	);
};

export default MarkerAndWindow;
