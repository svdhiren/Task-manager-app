const request = require('request');

const information = (lat, lon, callback) => {
  var url = 'http://api.weatherstack.com/current?access_key=47c39e87cfa099223761b719a25539b5&query='+ lat + ',' + lon + '&units=m';
  request({url: url, json: true}, (error, {body}) => {
    if(error)
    callback('Unable to connect', undefined);
    else if(body.error)
    callback('coordinates invalid...', undefined);
    else {
      var info = body.current;
      callback(undefined,(info.weather_descriptions[0] + ', currently it is ' + info.temperature + ' degrees outside and feels like ' + info.feelslike));

    }
  })
}

module.exports = information;
