const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const app = express();

// Controllers
const contractRoutes = require('./routes/contractRoutes')

app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

// Endpoint-path
app.use('/contracts', contractRoutes)

app.all('*', (req,res) => { 
    res.status(500).json({'msg': 'Invalid API Route'}).end()
})

module.exports = app;
