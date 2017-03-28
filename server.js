const express = require('express');
const bodyParser = require('body-parser');

const { DEV } = require('./config');
const knex = require('knex')(DEV);
var Treeize   = require('treeize');
var restaurants = new Treeize();

const app = express();
app.use(bodyParser.json());

app.get('/restaurants', (req, res) => {
  knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as grades:id', 'grades.grade as grades:grade', 'grades.score as grades:score')
  .from('restaurants')
  .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
  .orderBy('id', 'asc')
  .limit(10)
  .then(results => {
    // const hydrated = {};
    // results.forEach(row => {
    //   if (!(row.id in hydrated)) {
    //     hydrated[row.id] = {
    //       name: row.name,
    //       cuisine: row.cuisine,
    //       borough: row.borough,
    //       grades: []
    //     }
    //   }
    //   hydrated[row.id].grades.push({
    //     gradeId: row.gradeId,
    //     grade: row.grade,
    //     score: row.score
    //   })  
    // });
    // res.json(hydrated);
    restaurants.grow(results);
    res.json(restaurants.getData());
  })
  .catch(err => {
    console.log(error);
    res.sendStatus(500);
  })
  // console.log(hydrated);
});

// app.get('/restaurants/:id', (req, res) => {
//   knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id', 'grade', 'date as inspectionDate', 'score')
//     .from('restaurants')
//     .where('restaurants.id', req.params.id)
//     .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
//     .orderBy('date', 'desc')
//     .limit(1)
//     .then(results => res.json(results));
// });

// app.get('/restaurants/:id', (req, res) => {
//   knex.select('id', 'name', 'cuisine', 'borough')
//     .select(knex.raw("CONCAT(address_building_number, ' ', address_street, ' ', address_zipcode) as address"))
//     .from('restaurants')
//     .limit(10)
//     .then(results => res.json(results));
// });

// app.get('/restaurants/:id', (req, res) => {
//   knex.first('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id', 'grade', 'date as inspectionDate', 'score')
//   .select(knex.raw("CONCAT(address_building_number, ' ', address_street, ' ', address_zipcode ) as address"))
//   .from('restaurants')
//   .where('restaurants.id', req.params.id)
//   .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
//   .orderBy('date', 'desc')
//   .then(results => res.json(results));
// });



app.listen(process.env.PORT || 8080);

