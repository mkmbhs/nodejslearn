const express = require('express');

const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));



app.use((req,res, next) => {
  var now = new Date().toString();
  var log = ` mkmbhs:% ${now} \n mkmbhs:% ${req.method}\n mkmbhs:% ${req.url}`;
  next();

  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  });
});


 app.get('/', (req, res) => {
   //res.send('<h2>Hello Express!</h1>');
   res.render('home.hbs', {
     welcomeMessage: 'Welcome To Mkmbhs Website',
     pageTitle: 'Mkmbhs',
     currentYear: new Date().getFullYear(),
   })
 });
 app.get('/about', (req, res) => {
   res.render('about.hbs', {
     pageTitle: 'about props',
     currentYear: new Date().getFullYear(),
   });

 });

 app.get('/bad', (req, res) => {
   res.send({
     errorMessage : 'Error Handling you request...',
   });
 });
 app.listen(port, () => {
   console.log(`Server is up on port ${port}`);
 });
