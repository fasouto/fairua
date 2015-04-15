/* Mobile users will see smaller controls */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var HERE_satelliteDay = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/satellite.day/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
        attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
        subdomains: '1234',
        mapID: 'newest',
        app_id: 'tVoLZRQkQHtlD1UcvnGU',
        app_code: 'SWBeLBAMGDaCTC0RQDD7Rw',
        base: 'aerial',
        minZoom: 0,
        maxZoom: 20
    });

var HERE_terrainDay = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/terrain.day/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
        attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
        subdomains: '1234',
        mapID: 'newest',
        app_id: 'tVoLZRQkQHtlD1UcvnGU',
        app_code: 'SWBeLBAMGDaCTC0RQDD7Rw',
        base: 'aerial',
        minZoom: 0,
        maxZoom: 20
    });

var anecdotasLayer = L.layerGroup([]),
  creatividadeLayer = L.layerGroup([]),
  ecoLayer = L.layerGroup([]),
  lecerLayer = L.layerGroup([]),
  patrimonioLayer = L.layerGroup([]),
  serviciosLayer = L.layerGroup([]),
  vendaLayer = L.layerGroup([]),
  vecinosLayer = L.layerGroup([]);

// Define an object to map display name, icon and layer
var fairuaLayers = {
  anecdotas : {"display": "Anécdotas", "icon": "anecdotas.png", "layer": anecdotasLayer},
  creatividade : {"display": "Creatividade", "icon": "creatividad.png", "layer": creatividadeLayer},
  eco : {"display": "Ecoloxía", "icon": "eco.png", "layer": ecoLayer},
  lecer : {"display": "Lecer", "icon": "lecer.png", "layer": lecerLayer},
  patrimonio : {"display": "Patrimonio", "icon": "patrimonio.png", "layer": patrimonioLayer},
  servicios : {"display": "Profesionais", "icon": "profesionales.png", "layer": serviciosLayer},
  venda: {"display": "Profesionais", "icon": "monedas.png", "layer": vendaLayer},
  vecinos : {"display": "Veciños", "icon": "vecinos.png", "layer": vecinosLayer}
}

// Create the map
var map = L.map('map',{
    center: [42.236561, -8.726928],
    zoom: 17,
    minZoom: 16,
    fullscreenControl: false,
    zoomControl: false,
    // maxBounds: [[42.234510, -8.729753],[42.239966, -8.723724]],
    layers: [HERE_terrainDay, anecdotasLayer, creatividadeLayer, ecoLayer, lecerLayer, patrimonioLayer, serviciosLayer, vendaLayer, vecinosLayer]
});

// Let's add some controls, zoom and fullscreen
L.control.zoom({
    position:'topright'
}).addTo(map);

var baseLayers = {
  "<span class='layerLabel'><img src='/static/img/iconos/satelite.png' />Satélite</span>": HERE_satelliteDay,
  "<span class='layerLabel'><img src='/static/img/iconos/callejero.png' />Rúas</span>": HERE_terrainDay
};

var overlayMaps = {
  "": {
  "<span class='layerLabel'><img src='/static/img/iconos/anecdotas.png' />Anécdotas</span>": fairuaLayers["anecdotas"]["layer"],
  "<span class='layerLabel'><img src='/static/img/iconos/vecinos.png' />Veciñanza</span>": fairuaLayers["vecinos"]["layer"],
  "<span class='layerLabel'><img src='/static/img/iconos/patrimonio.png' />Patrimonio</span>": fairuaLayers["patrimonio"]["layer"]
  },
  "<h4>Profesionais</h4>": {
    "<span class='layerLabel'><img src='/static/img/iconos/eco.png' />Ecoloxía</span>": fairuaLayers["eco"]["layer"],
    "<span class='layerLabel'><img src='/static/img/iconos/lecer.png' />Lecer</span>": fairuaLayers["lecer"]["layer"],
    "<span class='layerLabel'><img src='/static/img/iconos/profesionales.png' />Servizos</span>": fairuaLayers["servicios"]["layer"],
    "<span class='layerLabel'><img src='/static/img/iconos/creatividad.png' />Creatividade</span>": fairuaLayers["creatividade"]["layer"],
    "<span class='layerLabel'><img src='/static/img/iconos/monedas.png' />Venda</span>": fairuaLayers["venda"]["layer"],
  }
};

// Returns the popup object
function generatePopup(name, image, video, description) {
  return L.popup({"minWidth":200, "maxWidth":200}).setContent('<h4>'+ name +'</h4><p>'+ description +'</p><a class="youtube-video" href="'+ video +'"><div class="blur"><img class="img-rounded video-cap img-responsive" src="/static/img/frames/'+ image + '" /></div></a>');
}

L.control.groupedLayers(baseLayers, overlayMaps, {
  collapsed: isCollapsed,
  exclusiveGroups: ["profesionales"],
  position: 'bottomright'
}).addTo(map);

var pointsData = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "/static/img/iconos/" + fairuaLayers[feature.properties.type]["icon"],
        iconSize: [37, 45],
        iconAnchor: [12, 45],
        popupAnchor: [9, -37]
      }),
      title: feature.properties.name,
      riseOnHover: true,
      alt: feature.properties.name
    });
  },
  onEachFeature: function (feature, layer) {
    fairuaLayers[feature.properties.type]["layer"].addLayer(layer);
    popup = generatePopup(feature.properties.name, feature.properties.image, feature.properties.video, feature.properties.description);
    layer.bindPopup(popup);
  }
});

$.getJSON("/static/data/fairua.geojson", function (data) {
  pointsData.addData(data);
});

pointsData.addTo(map);