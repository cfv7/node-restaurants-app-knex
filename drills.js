const { DEV } = require('./config');
const knex = require('knex')(DEV);

// clear the console before each run
process.stdout.write('\033c');

// knex.select('id', 'name', 'borough', 'cuisine')
//   .from('restaurants')
//   .debug(true) 
//   .then(results => console.log(results));

// knex.select('id', 'name', 'borough', 'cuisine')
//   .from('restaurants')
//   .where({cuisine: 'Italian'})
//   .then(results => console.log(JSON.stringify(results, null, 4)));

// knex.select('id', 'name')
//   .from('restaurants')
//   .where({cuisine: 'Italian'})
//   .limit(10)
//   .then(results => console.log(JSON.stringify(results, null, 4)));

// knex.count('id', 'name', 'borough', 'cuisine')
//   .from('restaurants')
//   .where({cuisine: 'Thai'})
//   .then(results => console.log(JSON.stringify(results, null, 4)));

// knex.count('id', 'name', 'borough', 'cuisine')
//   .from('restaurants')
//   .then(results => console.log(JSON.stringify(results, null, 4)));

// knex.count('id', 'name', 'borough', 'cuisine')
//   .from('restaurants')
//   .where({cuisine: 'Thai'})
//   .where({address_zipcode: 11372})
//   .then(results => console.log(JSON.stringify(results, null, 4)));

// knex.select('id', 'name', 'address_zipcode')
//   .from('restaurants')
//   .where({cuisine: 'Italian'})
//   .where({address_zipcode:('10012','10013','10014')})
//   .orderBy('name', 'asc')
//   .then(results => console.log(JSON.stringify(results, null, 4)));

// knex('restaurants')
//   .insert([{name: 'Byte Cafe', 
//   borough: 'Brooklyn', 
//   cuisine: 'coffee', 
//   address_building_number: '123',
//   address_street: 'Atlantic Avenue',
//   address_zipcode: '11231'}])
//   .then(results => console.log(JSON.stringify(results, null, 4)));

//  knex('restaurants')
//   .returning(['id', 'name'])
//   .insert([{name: 'Byte Bar & Grill', 
//   borough: 'Brooklyn', 
//   cuisine: 'Italian', 
//   address_building_number: '123',
//   address_street: 'Atlantic Avenue',
//   address_zipcode: '11231'}])
//   .then(results => console.log(JSON.stringify(results, null, 4)));

// knex('restaurants')
//  .returning(['id','name'])
//  .insert([
//    { name: 'Abacore Line', borough: 'Brooklyn', cuisine:'Seafood', address_street:'Abacore Street', address_building_number:'1234', address_zipcode:11224},
//    { name: 'Bethany Bee', borough: 'Brooklyn', cuisine:'American', address_street:'Bethany Street', address_building_number:'12',address_zipcode:11224},
//    { name: 'Catherines Cake', borough: 'Brooklyn', cuisine:'Dessert', address_street:'Cake Street', address_building_number:'31', address_zipcode:11224}
//  ])
// .then(results => console.log(JSON.stringify(results, null, 4)));

// knex('restaurants')
//   .returning(['id', 'name'])
//   .where({nyc_restaurant_id: '30191841'})
//   .update({name:'DJ Reynolds Pub & Restaurant'})
//   .then(results => console.log(JSON.stringify(results, null, 4)));

// knex('grades')
//   .returning(['grade', 'id'])
//   .where({id: 430})
//   .del()
//   .then(results => console.log(JSON.stringify(results, null, 4)));

// knex('restaurants')
//   .returning(['name', 'id'])
//   .where({id: 2})
//   .del()
//   .then(results => console.log(JSON.stringify(results, null, 4)));

// knex.schema.createTable('inspectors', function (table) {
//   table.increments('uid').primary();
//   table.string('first_name', 10).notNullable();
//   table.string('last_name', 10).notNullable();
//   table.timestamps();
//   table.specificType('borough', 'borough_options')
// }).then(result => {
//   console.log(result)
// })

// knex.schema.table('grades', function(table) {
//   table.string('notes');
// }).then(result => {
//   console.log(result)
// })

// knex.schema.dropTable('inspectors')
//   .then(result => {
//     console.log(result)
//   })


// HYDRATE drill
const hydrated = {};
restaurants.forEach(row => {
  if (!(row.id in hydrated)) {
    hydrated[row.id] = {
      name: row.name,
      cuisine: row.cuisine,
      borough: row.borough,
      grades: []
    }
  }
  hydrated[row.id].grades.push({
    gradeId: row.gradeId,
    grade: row.grade,
    score: row.score
  });
});
console.log(hydrated);

// Destroy the connection pool
knex.destroy().then(() => { console.log('closed') })

