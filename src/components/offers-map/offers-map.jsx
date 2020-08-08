import React from 'react';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';
import {OFFER_PROP_TYPES} from '../../shared/types.js';

const LEAFLET_SETTINGS = {
  defaultIcon: leaflet.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png`,
    iconSize: [25, 41]
  }),
  activeIcon: leaflet.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png`,
    iconSize: [25, 41]
  }),
};

export default class OffersMap extends React.Component {
  constructor(props) {
    super(props);

    this._map = null;
    this._currentCity = null;
    this._activeMarker = null;
    this._renderedMarkers = null;
    this._renderedOffers = null;

    this._mapContainerRef = React.createRef();
  }

  componentDidMount() {
    this._createMap();
  }

  componentDidUpdate() {
    this._updateMap();
  }

  _removeMarkers() {
    this._renderedMarkers.forEach((marker) => {
      marker.removeFrom(this._map);
    });
    this._renderedMarkers = null;
  }

  _renderMarkers() {
    this._renderedMarkers = new Map();

    this.props.offers.forEach((offer) => {
      const marker = leaflet.marker(offer.coordinates, {icon: LEAFLET_SETTINGS.defaultIcon});
      marker.addTo(this._map);
      this._renderedMarkers.set(offer.id, marker);
    });
  }

  _renderActiveMarker() {
    const marker = this._renderedMarkers.get(this.props.activeCardId);
    if (this._activeMarker) {
      this._activeMarker.setIcon(LEAFLET_SETTINGS.defaultIcon);
    }
    if (marker) {
      marker.setIcon(LEAFLET_SETTINGS.activeIcon);
      this._activeMarker = marker;
    }
  }

  _createMap() {
    const props = this.props;
    this._currentCity = props.city;
    this._renderedOffers = props.offers;

    this._map = leaflet.map(this._mapContainerRef.current, {
      center: [props.offers[0].cityLocation.latitude, props.offers[0].cityLocation.longitude],
      zoom: props.offers[0].cityLocation.zoom,
      zoomControl: false,
      marker: true
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    this._renderMarkers();
    this._renderActiveMarker();
  }

  _updateMap() {
    const props = this.props;
    if (this._currentCity !== props.city || props.offers !== this._renderedOffers) {
      this._currentCity = props.city;
      const cityCoordinates = [props.offers[0].cityLocation.latitude, props.offers[0].cityLocation.longitude];
      this._map.setView(cityCoordinates, props.offers[0].cityLocation.zoom);

      this._removeMarkers();
      this._renderMarkers();
      this._renderActiveMarker();
    } else {
      this._renderActiveMarker();
    }
  }

  render() {
    const customClass = this.props.isNearPlaces ? `property` : `cities`;
    return (
      <section
        ref={this._mapContainerRef}
        className={`${customClass}__map map`}
      >
      </section>
    );
  }
}

OffersMap.propTypes = {
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES).isRequired,
  city: PropTypes.string.isRequired,
  activeCardId: PropTypes.number.isRequired,
  isNearPlaces: PropTypes.bool.isRequired,
};
