
export const hereIsolineUrl = (coords, options) => `https://isoline.route.api.here.com/routing/7.2/calculateisoline.json?app_id=LP2ZyQJ7qm17fYnZLySE&app_code=4kTbv-S-8k6wr44_jerEbQ&mode=shortest;${options.mode};traffic:${options.traffic}&start=geo!${coords[0]},${coords[1]}&range=${options.range}&rangetype=${options.type}`

export const hereTileUrl = (style) => `https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/${style}/{z}/{x}/{y}/512/png8?app_id=LP2ZyQJ7qm17fYnZLySE&app_code=4kTbv-S-8k6wr44_jerEbQ&ppi=320`;
 
export const marketUrl = () =>'https://places.demo.api.here.com/places/v1/discover/search?at=-33.454103%2C-70.6058&q=cine&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg';

export const maxIsolineRangeLookup = {
   time: 5000,
   distance: 80000
}

export const BCI = ()=> {

const oficinasBancoBCI= [
'Avenida Américo Vespucio Sur 1816, Las Condes',
'Av Apoquindo 5710, Las Condes',
'El Golf 125, Las Condes',
'Av Irarrázaval 5580, Ñuñoa',
'Av Vitacura 4009, Vitacura',
'Av 11 de Septiembre 2357, Providencia',
'Andrés Bello 2461, Providencia',
'Av Irarrázaval 2555, Ñuñoa',
'Lo Fontecilla 441, Las Condes',
'Avenida Plaza 2501, Las Condes',
'Av del Parque 4023, Huechuraba',
'Av Las Condes 11336, Las Condes',
'Av Macul 2906, Macul',
'Av Recoleta 286, Recoleta',
'Miguel Cruchaga 920, Santiago',
'Paseo Huérfanos 1134, Santiago',
'Avenida Jose Alcalde Delano 10581, Lo Barnechea',
'Av La Dehesa 1788, Lo Barnechea',
'Av Vicuña Mackenna Oriente 7385, La Florida',
'Gran Avenida José Miguel Carrera 4780, San Miguel',
'Americo Vespucio Sur 2982, Conchali',
'Club Hipico de Santiago 4676, Pedro Aguirre Cerda',
'Gran Avenida José Miguel Carrera 8445, La Cisterna',
'Camino lo Echevers 550, Quilicura',
'Av. Los Pajaritos 2100, Maipú',
'José Manuel Irarrázaval 178, Puente Alto',
'Concha y Toro 231, Puente Alto',
'Camino A Melipilla 6049, Cerrillos',
'Covadonga 664, San Bernardo'
]



const cordsBCI= oficinasBancoBCI.map((of)=>{
   return (
      fetch('https://geocoder.api.here.com/6.2/geocode.json'
   +'?app_id=LP2ZyQJ7qm17fYnZLySE&app_code=4kTbv-S-8k6wr44_jerEbQ'
   +'&searchtext=' + of
   )
   .then((data)=> data.json())
   .then((response)=> {
      //console.log(response)
      return {
      lat : response.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude,
      long: response.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude,
      address: response.Response.View[0].Result[0].Location.Address.Label,
            
   }})
   .catch((error)=>{
      return console.log(of)
   })
   )
})
   return Promise.all(cordsBCI).then( (data)=>{console.log(data)})

}

