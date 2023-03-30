const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'my_database',
  password: '$Paul2803',
  port: 5432,
});

//change the DB from merchants to amongLol 
// need to have a button to draw a role and delete it from Db

const getMerchants = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM amongLol ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const addRole = () => {
    return new Promise(function(resolve, reject) {
      pool.query("insert into amongLol (role) VALUES ('Jungle'), ('Mid'), ('Top'), ('ADC')", (error, results) => {
        if (error) {
          reject(error)
        }
      })
    })
  }

  const deleteMerchant = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM amongLol WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Merchant deleted with ID: ${id}`)
      })
    })
  }
  
  module.exports = {
    getMerchants,
    createMerchant,
    deleteMerchant,
  }