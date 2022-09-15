const express = require('express')
const airportRoutes = require('./routes/routes')
const app = express()
const port = 3000

app.use(express.json())
app.use(airportRoutes)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})