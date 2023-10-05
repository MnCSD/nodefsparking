const express = require('express')
var cors = require('cors')
const sql = require('mssql')

const app = express()

app.use(cors())


let people = [
    {
      name: "Hannah Rickard",
      number: "06-51-99-56-83",
      id: 1
    },
    {
      name: "Hyun Namkoong",
      number: "10987654",
      id: 2
    },
    {
      name: "Courtney Martinez",
      number: "3691215",
      id: 3
    }
  ]

  const config = {
    user: 'parking',
    password: 'abcABC123!',
    server: '10.147.98.228',
    database: 'FS_Parking',
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
      },
};

  app.get('/', (request, response) => {
      response.send('<h1>Phonebook</h1>')
  })

  app.get('/api/people', (req, res) => {
    console.log("test")


    sql.connect(config, err => {
        if (err) console.log(err);

        // create a new request object
        const request = new sql.Request();

        const value = '2023-09-28T00:00:00.000Z'

        // query to the database and get the data
        request.query(`SELECT employee, date1, parkid FROM booking WHERE date1 > CONVERT(DATE, GETDATE() - 1) AND date1 < CONVERT(DATE, GETDATE() + 7)`, (err, result) => {
            if (err) console.log(err);

            // send data as response\
            console.log(result)
            res.json(result);


        });
    });
    
  })

  const PORT = 3001
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
  })