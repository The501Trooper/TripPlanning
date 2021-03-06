import React, {Component} from 'react';
import {Container, Card} from 'reactstrap';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import {Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet';
import iconblue from './images/iconblue.png';
import iconblueD from './images/iconblueD.png';
import iconred from './images/iconred.png';
import iconhappy from './images/iconhappy.png'
import {latLngBounds} from 'leaflet'

export default class LMap extends Component {
	constructor(props) {
		super(props);
		
		this.currentLocation = this.currentLocation.bind(this);

		this.state = {
			placesLatLng: []
		}
	}
	
	render() {
		return (
			<React.Fragment>
				{this.renderMap()}
			</React.Fragment>
		);
	}
	
	renderMap() {
		return (
			<Card>
				{this.renderLeafletMap()}
			</Card>
		);
	}
	
	itineraryComponentSetup(latLngs) {
		let MarkerArr = [];	let ItinPolylinepts = []; let placesCoords = [];
		
		let pointArr = this.props.itineraryData.places;
		if (pointArr.length !== 0) {
			var hasName = false; var name = ""
			if(pointArr[0].hasOwnProperty('name')) {hasName = true}
			for (let i = 0; i < pointArr.length; i++) {
				if (this.props.itineraryData.places[i].checked === true) {
					if(hasName) {name = pointArr[i].name}
					MarkerArr.push(
						<Marker key={"Marker" + i}
						        position={latLngs[i]}
						        icon={this.markerIcon(iconred)}>
							<Popup className="font-weight-extrabold">
								Destination:<br/>
								{name}<br/>
								{pointArr[i].latitude} Latitude<br/>
								{pointArr[i].longitude} Longitude
							</Popup>
						</Marker>
					);
				}
				if (this.props.itineraryData.polyLineEnabled == true) {
                  ItinPolylinepts.push(
                  		[pointArr[i].latitude, pointArr[i].longitude]
                  );
                }
			}
			ItinPolylinepts.push([pointArr[0].latitude, pointArr[0].longitude]);
			let ItinPolyline = (<Polyline positions={ItinPolylinepts}/>);
			return {ItinPolyline: ItinPolyline, MarkerArr: MarkerArr}
		}
	}

	getLatLngs() {
		let placesCoords = []
		let pointArr = this.props.itineraryData.places;
		for (let i = 0; i < pointArr.length; i++) {
			placesCoords.push(L.latLng(pointArr[i].latitude, pointArr[i].longitude))
		}
		return placesCoords;
	}
	
	calculatorComponentSetup() {
		let OriginCoords = [this.props.locationOrigin.latitude, this.props.locationOrigin.longitude];
		let DestCoords = [this.props.locationDestination.latitude, this.props.locationDestination.longitude];
		let ODPolyline = (
			<Polyline positions={[OriginCoords, DestCoords]}/>
		);
		let originMarker = (
			<Marker position={this.currentLocation()}
			        icon={this.markerIcon(iconblue)}>
				<Popup className="font-weight-extrabold">
					Origin:<br/>
					{this.props.locationOrigin.latitude} Latitude<br/>
					{this.props.locationOrigin.longitude} Longitude
				</Popup>
			</Marker>
		);
		
		let destinationMarker = this.createDestinationMarker();
		return {ODPolyline: ODPolyline, originMarker: originMarker, destinationMarker: destinationMarker};
	}
	createDestinationMarker() {
		return (
			<Marker position={this.currentDestination()}
							icon={this.markerIcon(iconblueD)}>
				<Popup className="font-weight-extrabold">
					Destination:<br/>
					{this.props.locationDestination.latitude} Latitude<br/>
					{this.props.locationDestination.longitude} Longitude
				</Popup>
			</Marker>
		);
	}

	renderLeafletMap() {

		let calculatorComponents = {ODPolyline: null, originMarker: null, destinationMarker: null};
		if (this.props.locationOrigin != null) {
			calculatorComponents = this.calculatorComponentSetup();
		}
		var mapBounds = null
		var mapCenter = this.csuOvalGeographicCoordinates()

		let itineraryComponents = {MarkerArr: null, ItinPolyline: null};
		if (this.props.itineraryData != null) {
			if (this.props.itineraryData.length !== 0) {
				let latLngs = this.getLatLngs();
				itineraryComponents = this.itineraryComponentSetup(latLngs);
				if (this.props.itineraryData.places.length > 1) {
					mapBounds = latLngBounds(latLngs)
				}
				if (this.props.itineraryData.places.length == 1) {
					let location = this.props.itineraryData.places[0]
					mapCenter = L.latLng(location.latitude, location.longitude)
				}
			}
		}
		
		let currentLocationMarker = null;
		
		if (this.props.currentLocation != null) {
			currentLocationMarker = (
				<Marker key={"CurrentLocationMarker"}
				        position={L.latLng(this.props.currentLocation.latitude, this.props.currentLocation.longitude)}
				        icon={this.markerIcon(iconhappy)}>
					<Popup className="font-weight-extrabold">
						Here I am!<br/>
						{this.props.currentLocation.latitude} Latitude<br/>
						{this.props.currentLocation.longitude} Longitude
					</Popup>
				</Marker>
			);
		}


		return (
			<Map center={mapCenter} bounds={mapBounds} zoom={10} ref='map'
			     style={{height: 500, maxwidth: 700}}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				           attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"/>
				
				{currentLocationMarker}
				
				{calculatorComponents.originMarker}
				{calculatorComponents.destinationMarker}
				{calculatorComponents.ODPolyline}
				
				{itineraryComponents != null && itineraryComponents.MarkerArr != null && itineraryComponents.MarkerArr.map(marker => (
					marker
				))}
				{itineraryComponents != null && itineraryComponents.ItinPolyline != null && itineraryComponents.ItinPolyline}
			
			</Map>
		)
	}
	
	currentLocation() {
		return L.latLng(this.props.locationOrigin.latitude, this.props.locationOrigin.longitude);
	}
	
	currentDestination() {
		return L.latLng(this.props.locationDestination.latitude, this.props.locationDestination.longitude);
	}
	
	coloradoGeographicBoundaries() {
		// northwest and southeast corners of the state of Colorado
		return L.latLngBounds(L.latLng(41, -109), L.latLng(37, -102));
		
	}
	
	csuOvalGeographicCoordinates() {
		return L.latLng(40.576179, -105.080773);
	}
	
	markerIcon(url = icon) {
		// react-leaflet does not currently handle default marker icons correctly,
		// so we must create our own

		const iconWidth = Math.round(2*this.props.options.markerSize/3);
		const iconAnchorValue = [this.props.options.markerSize/4, iconWidth]

		return L.icon({
			iconUrl: this.props.options.colorURL,
			iconSize: [this.props.options.markerSize/2, iconWidth],
			shadowUrl: iconShadow,
			iconAnchor: iconAnchorValue  // for proper placement
		})
	}
}
