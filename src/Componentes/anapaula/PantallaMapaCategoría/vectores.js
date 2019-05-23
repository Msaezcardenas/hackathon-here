import L from 'leaflet';

export const iconMall = new L.Icon({
    iconUrl: require('../../camila/Mall.png'),
    iconSize:     [35, 35], 
    shadowSize:   [50, 64],
    iconAnchor:   [20, 20],
    popupAnchor:  [0, -40]
  
})

export const iconMuseo = new L.Icon({
    iconUrl: require('../../camila/Museo.png'),
    iconSize:     [35, 35], 
    shadowSize:   [50, 64],
    iconAnchor:   [20, 30],
    popupAnchor:  [0, -40]
  
})

export const iconCine = new L.Icon({
    iconUrl: require('../../camila/Cine.png'),
    iconSize:     [35, 35], 
    shadowSize:   [50, 64],
    iconAnchor:   [20, 30],
    popupAnchor:  [0, -40]
  
})

export const iconBanco = new L.Icon({
    iconUrl: require('../../camila/Banco.png'),
    iconSize:     [35, 35], 
    shadowSize:   [50, 64],
    iconAnchor:   [20, 30],
    popupAnchor:  [0, -40]
  
})