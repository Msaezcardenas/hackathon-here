import React from 'react';
import Footer from '../../molu/Footer';
import Home from '../../molu/Home';

export default class Route extends React.Component {

   constructor(props) {
      super(props);
      this.marker = React.createRef();
      this.state={
        app_id: 'LP2ZyQJ7qm17fYnZLySE',
        app_code: '4kTbv-S-8k6wr44_jerEbQ',
      }
      this.platform = null;
      this.map = null;
      this.bubble = null;
      this.maneuver = null;
      this.routeInstructionsContainer= null;
      this.ui= null;

    this.onSuccess = this.onSuccess.bind(this) 
    this.addRouteShapeToMap = this.addRouteShapeToMap.bind(this)
    this.addManueversToMap =  this.addManueversToMap.bind(this)
    this.addWaypointsToPanel = this.addWaypointsToPanel.bind(this)
    this.addManueversToPanel=  this.addManueversToPanel.bind(this)
    this.addSummaryToPanel = this.addSummaryToPanel.bind(this)
   }

   getPlatform() {
    return new window.H.service.Platform(this.state);
}

getMap(container, layers, settings) {
    return new window.H.Map(container, layers, settings);
}

getEvents(map) {
    return new window.H.mapevents.MapEvents(map);
}

getBehavior(events) {
    return new window.H.mapevents.Behavior(events);
}

getUI(map, layers,options) {
    console.log(options)
    return new window.H.ui.UI.createDefault(map, layers, options);
}

   componentDidMount (){
    this.platform = this.getPlatform();
    var layers =window.devicePixelRatio || 1;
    
    var defaultLayers = this.platform.createDefaultLayers({
      tileSize: layers === 1 ? 256 : 512,
      ppi: layers === 1 ? undefined : 320,
    }); 
  

    let mapContainer = document.getElementById('map');
    this.routeInstructionsContainer = document.getElementById('panel');

    this.map = this.getMap(
        mapContainer,
        defaultLayers.normal.map,{
        center: {lat:-33.4212103, lng:-70.6184262},
        zoom: 13,
        pixelRatio: layers
      });


    var events = this.getEvents(this.map);
    // eslint-disable-next-line
    var behavior = this.getBehavior(events);
    
    var ui = this.getUI(this.map, defaultLayers,'es-ES');
       
    this.ui= ui

    
      
      // Now use the map as required...
      this.calculateRouteFromAtoB (this.platform);
   }


   calculateRouteFromAtoB (platform) {
    var router = platform.getRoutingService(),
      routeRequestParams = {
        mode: 'shortest;car',
        representation: 'display',
        waypoint0: '-33.4168,-70.6058', // St Paul's Cathedral
        waypoint1: '-33.4021,-70.5782',  // Tate Modern
        routeattributes: 'waypoints,summary,shape,legs',
        maneuverattributes: 'direction,action',
        language: 'es-ES'
      };
  
  
    router.calculateRoute(
      routeRequestParams,
      this.onSuccess,
      this.onError
    );
    
  }

  onSuccess(result) {    
       
    var route = result.response.route[0]; 
    console.log(route)
    this.addRouteShapeToMap(route);
    this.addManueversToMap(route);  
    this.addWaypointsToPanel(route.waypoint);
    this.addManueversToPanel(route);
    this.addSummaryToPanel(route.summary);
    
  }
    onError(error) {
    alert('Ooops!');
  }

  openBubble(position, text){
    if(!this.bubble){
       this.bubble =  new window.H.ui.InfoBubble(
         position,
         // The FO property holds the province name.
         {content: text});
       this.ui.addBubble(this.bubble);
     } else {
       this.bubble.setPosition(position);
       this.bubble.setContent(text);
       this.bubble.open();
     }
   }

   addRouteShapeToMap(route){
       console.log(route)
    var lineString = new window.H.geo.LineString(),
      routeShape = route.shape,
      polyline;
  
    routeShape.forEach(function(point) {
      var parts = point.split(',');
      lineString.pushLatLngAlt(parts[0], parts[1]);
    });
  
    polyline = new window.H.map.Polyline(lineString, {
      style: {
        lineWidth: 4,
        strokeColor: 'rgba(0, 128, 255, 0.7)'
      }
    });
    // Add the polyline to the map
    this.map.addObject(polyline);
    // And zoom to its bounding rectangle
     this.map.setViewBounds(polyline.getBounds(), true);

  }

  addManueversToMap(route){
       
    var svgMarkup = '<svg width="18" height="18" ' +
      'xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="8" cy="8" r="8" ' +
        'fill="#1b468d" stroke="white" stroke-width="1"  />' +
      '</svg>',
      dotIcon = new window.H.map.Icon(svgMarkup, {anchor: {x:8, y:8}}),
      group = new  window.H.map.Group(),
      i,
      j;
  
    // Add a marker for each maneuver
    for (i = 0;  i < route.leg.length; i += 1) {
      for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
        // Get the next maneuver.
        this.maneuver = route.leg[i].maneuver[j];
        // Add a marker to the maneuvers group
        var marker =  new window.H.map.Marker({
          lat: this.maneuver.position.latitude,
          lng: this.maneuver.position.longitude} ,
          {icon: dotIcon});
        marker.instruction = this.maneuver.instruction;
        group.addObject(marker);
      }
    }
  
    group.addEventListener('tap',(evt) => {
      this.map.setCenter(evt.target.getPosition());
      this.openBubble(
         evt.target.getPosition(), evt.target.instruction);
    }, false);
  
    // Add the maneuvers group to the map
    this.map.addObject(group);
  }

  addWaypointsToPanel(waypoints){  
      
    var nodeH3 = document.createElement('h3'),
      waypointLabels = [],
      i;
    
     for (i = 0;  i < waypoints.length; i += 1) {
      waypointLabels.push(waypoints[i].label)
     }
  
     nodeH3.textContent = waypointLabels.join(' - ');
  
    this.routeInstructionsContainer.innerHTML = '';
    this.routeInstructionsContainer.appendChild(nodeH3);
  }

  addSummaryToPanel(summary){
    var summaryDiv = document.createElement('div'),
     content = '';
     content += '<b>Total distance</b>: ' + summary.distance  + 'm. <br/>';
     content += '<b>Travel Time</b>: ' + summary.travelTime + ' (in current traffic)';
  

    summaryDiv.style.fontSize = 'small';
    summaryDiv.style.marginLeft ='5%';
    summaryDiv.style.marginRight ='5%';
    summaryDiv.innerHTML = content;
    this.routeInstructionsContainer.appendChild(summaryDiv);
  }
  
  addManueversToPanel(route){
      
      console.log(route)
      
    var nodeOL = document.createElement('ol'),
      i,
      j;
  
    nodeOL.style.fontSize = 'small';
    nodeOL.style.marginLeft ='5%';
    nodeOL.style.marginRight ='5%';
    nodeOL.className = 'directions';
  
       // Add a marker for each maneuver
    for (i = 0;  i < route.leg.length; i += 1) {
      for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
        // Get the next maneuver.
        this.maneuver = route.leg[i].maneuver[j];
  
        var li = document.createElement('li'),
          spanArrow = document.createElement('span'),
          spanInstruction = document.createElement('span');
  
        spanArrow.className = 'arrow '  + this.maneuver.action;
        spanInstruction.innerHTML = this.maneuver.instruction;
        li.appendChild(spanArrow);
        li.appendChild(spanInstruction);
  
        nodeOL.appendChild(li);
      }
    }
  
    this.routeInstructionsContainer.appendChild(nodeOL);
  }
  

   render(){
       return (
         <div>
           <Home/>
        <div className="container">
        <div id="map" style={{position:'absolute', width:'49%', height:'100%', background:'grey' }}></div>
        <div id="panel" style={{position:'absolute', width:'49%', left:'51%', height:'100%', background:'inherit'}} ></div>
        </div>
        <Footer/>
        </div>
       )
   }
}