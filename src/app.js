const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const app = express();

// Controllers
const contractRoutes = require('./routes/contractRoutes')
const jobRoutes      = require('./routes/jobRoutes')    

app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

// Endpoint-path
app.use('/contracts', contractRoutes)
app.use('/jobs', jobRoutes)

app.all('*', (req,res) => { 
    res.status(500).json({'msg': 'Invalid API Route'}).end()
})

module.exports = app;
