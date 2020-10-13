const request = require('request')

const getCoordinates = (city, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=pk.eyJ1IjoicGV0cmU2NiIsImEiOiJja2Z0dWc4ZmMwbXE1MnNscmZqcDh4OXVkIn0.55RbQu7S2IERIwRPNBNJPg&limit=1`

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location services.', undefined)
    } else if (body.message) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = getCoordinates