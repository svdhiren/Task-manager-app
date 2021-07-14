const request = require('request');



const geocode = (address, callback) => {
  var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGhpcmVuMDEiLCJhIjoiY2tmcnB4bWFtMDV2bzJ4bW53ZWF3azZtNCJ9.wayGEx1BPduMGboMz5FWlA';
  request({url : url, json: true}, (error, response) => {
    var info = response.body;
    if(error)
    callback('Unable to connect. Please try again later.', undefined);
    else if(info.features.length === 0)
    callback('Unable to find the location.', undefined);
    else {
      // lat = info.features[0].center[1];
      // lon = info.features[0].center[0];
      const data = {
        place: info.features[0].place_name,
        lat: info.features[0].center[1],
        lon: info.features[0].center[0]
      }
      callback(undefined, data);
    }
  })
}

module.exports = geocode;
