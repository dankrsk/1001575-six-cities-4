const leaflet = {
  icon() {
    return {
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    };
  },
  map() {
    return {
      setView: jest.fn(),
    };
  },
  tileLayer() {
    return {
      addTo: jest.fn(),
    };
  },
  marker() {
    return {
      addTo: jest.fn(),
    };
  },
};

module.exports = leaflet;
