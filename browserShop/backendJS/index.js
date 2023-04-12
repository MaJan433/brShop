const cors = require('cors')
const express = require('express')
const bodyParser = require("body-parser");
const {mainRouter} = require("./router")
const {Router} = require('express')

const PORT = 3001
const app = express();
// console.log(mainRouter)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/api', mainRouter)

app.listen(PORT, 'localhost')
