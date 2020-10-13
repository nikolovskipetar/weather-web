const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')

const app = express()

//Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Coby',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Coby',
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({error: 'Please provide an address'})
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })

})

app.get('/help/*', (req,res) => {
  res.render('not-found', {
    title: '404',
    message: 'Article not found',
    name: 'Coby'
  })
})

app.get('*', (req, res) => {
  res.render('not-found', {
    title: '404',
    message: 'Page not found',
    name: 'Coby'
  })
})


app.listen(3000)