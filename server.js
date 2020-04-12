'use strict';

// dependencies

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const superagent = require('superagent');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');



//Test Route
app.get('/test', (req, res) => {
  res.status(200).send('Hello ');
});

//Render index
app.get('/main', (req, res) => {
  res.render('pages/index');
});
app.get('/', (req, res) => {
  res.render('pages/index');
});




//ERROR

app.get('/error', (request, response) => {
  response.render('pages/error');
});

//SEARCHES

app.get('/searches', (req, res) => {
  res.render('pages/index');
});

app.post('/searches', (req, res) => {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  // console.log('url link ', url);

  if (req.body.searchtype === 'title') {
    url = url+"intitle:" + req.body.search;
  }
  else if (req.body.searchtype === 'author') {
    url = url+"inauthor:" + req.body.search;
    // console.log(url)
  }

  superagent.get(url)
    .then(data => {

      // console.log(data);
      let book = data.body.items;
      res.render('pages/searches/show', { books: book });
    })
    .catch(error => {

      res.render('pages/error');
    });
});
app.get('*', function(req, res){
  res.render('pages/error');
});


app.listen(PORT, () => console.log('listening from port', PORT));
