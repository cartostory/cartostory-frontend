export const mapOptions = {
  bounds: undefined,
  center: [50, 19],
  baseLayer: 'https://api.mapbox.com/styles/v1/cartostory/cjugqcypf27581gnry4y59lxy/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FydG9zdG9yeSIsImEiOiJjanQycXVyZDcxeXZqM3lxeDNvcW81NWJpIn0.hfvoqNSy7dT0yviVhNcDMg',
  hikingOverlay: 'http://tile.mtbmap.cz/overlay_hiking/{z}/{x}/{y}.png',
  labelsOverlay: 'https://api.mapbox.com/styles/v1/cartostory/cjugqfe8r1lhh1ftgrmr7v9zj/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FydG9zdG9yeSIsImEiOiJjanQycXVyZDcxeXZqM3lxeDNvcW81NWJpIn0.hfvoqNSy7dT0yviVhNcDMg',
  zoom: 8,
  edgeMarker: undefined,
};

export const markerOptions = {
  style: {
    common: {
      radius: 8,
      weight: 1.5,
    },
    highlighted: {
      color: '#F56C6C',
      opacity: 1,
      fillOpacity: 0.4,
    },
    inBbox: {
      color: '#42b983',
      fillOpacity: 0.5,
    },
    plain: {
      color: '#3185fc',
      fillOpacity: 0.5,
    },
    edge: {
      icon: L.icon({
        iconUrl: '../../node_modules/leaflet/dist/images/marker-icon.png',
        iconRetinaUrl: 'marker-icon-2x.png',
        shadowUrl: 'marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [0, 0],
      }),
    },
  },
};

export const bboxOptions = {
  plain: {
    style: {
      color: '#5a5a66',
      fillOpacity: 0,
      dashArray: '5',
      weight: 2,
    },
  },
  hovered: {
    style: {
      color: '#5a5a66',
      fillColor: '#5a5a66',
      dashArray: '5',
      weight: 2,
    },
  },
  selected: {
    style: {
      color: '#42b983',
      fillColor: '#42b983',
      fillOpacity: 0,
      dashArray: '5',
      weight: 2,
    },
  },
};

export const trackOptions = {
  style: {
    plain: {
      color: '#5a5a66',
      dashArray: '6',
    },
    inBbox: {
      color: '#42b983',
      dashArray: '6',
    },
  },
};
