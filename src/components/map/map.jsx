import React from 'react';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';
import {OFFER_PROP_TYPES} from '../../shared/types.js';

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this._mapContainerRef = React.createRef();
  }

  componentDidMount() {
    this._createMap();
  }

  _createMap() {
    const city = [52.38333, 4.9];
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });
    const zoom = 12;
    const map = leaflet.map(this._mapContainerRef.current, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });

    map.setView(city, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    this.props.offers.forEach((offer) => {
      leaflet
        .marker(offer.coordinates, {icon})
        .addTo(map);
    });

  }

  render() {
    return (
      <section
        ref={this._mapContainerRef}
        className="cities__map map"
      >
      </section>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES).isRequired,
};
