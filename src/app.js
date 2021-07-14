//Here we will import the express module. express is just a function.
//Later on we use different methods to configure the app/server to our needs.

const request = require('request');
const geocode = require('./utils/geocode.js');
const information = require('./utils/information.js')
const path = require('path');
const express = require('express');
const hbs = require('hbs'); // Needed for partials.

const app = express();


//For rendering html files or even a whole directory, we have to use the below function. path module
// is used to join 2 or more paths given as arguments.

//Defining paths for Express config.
const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Setting the handlebars and 'views' folder location.
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath) // Telling the express where the partials folder is located.

//Serving up the whole public directory to the server.
app.use(express.static(publicPath)) //Only the root folder needs to be added.



//get() function is used to respond to the user when the user goes to the route given as the first argument.
//here the empty route indicates present location.
// app.get('', (req, res) => {
//   res.send('<h2>Hello Express!</h2>');
// })
//Since 'public' becomes the root folder, the above function can be removed.

app.get('', (req, res) => {
  res.render('index', { // It,s optional whether you want to write the extension.(.hbs)
    title: 'Weather app',
    name: 'Created by Dhiren'
  })
})


//We want to know the request. Basically we want to know the string that is typed by the user.
//Then we will use the geocode and information(forecast) to get the answer and again send it to the browser.
//req contains the query.
app.get('/products', (req, res) => {

  if (!req.query.search)
  return res.send({
    error: 'You must provide a search term.'
  })
  //We can write 'else' statement instead of 'return' but it's just a good practice.

  console.log(req.query.search);
  res.send({
    product: []
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address)
  return res.send({
    error: 'You must provide an address'
  })

  // console.log('Address provided : ' + req.query.address);
  geocode(req.query.address, (error, {place=':/', lat=0, lon=0} = {}) => {
       if(error)
       return res.send({error})
         // console.log(place + ' has the coordinates : ' + lat + ', ' + lon);
       information(lat, lon, (error, newdata) => {
         // The final information will be available here.
         if(error)
         return res.send({error})

         return res.send({
           address: place,
           text: newdata
         })

         })
      })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: 'Created by Dhiren'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Created by Dhiren'
  })
})

//Any wild card matching can be used and send any specific message to the user.
app.get('*', (req, res) => {
  res.send('ERROR 404 <br> PAGE NOT FOUND');
})


//The function used below in the second argument is optional.
app.listen(3000, () => {
  console.log("Server is up..");
})
