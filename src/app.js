const express = require('express')
const aiportRoutes = require('./routes/routes')
const app = express()
const port = 3000

app.use(express.json())
app.use(aiportRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})