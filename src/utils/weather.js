const request = require('request')

const getWeather = (latitude, longtitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=06f8885e3067fb597fc65566baa7f149&query=${latitude},${longtitude}`

  request({url, json: true}, (error, {body} = {}) => {
    if (error) {
      callback('Unable to connect to location services.', undefined)
    } else if (body.error) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      callback(undefined, `Current temperature is ${body.current.temperature} degrees. It feels like ${body.current.feelslike} degrees.`)
    }
  })
}

module.exports = getWeather