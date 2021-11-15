const express = require('express');
const path = require('path');
const routes = require('./routes')


const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection');

app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.use(routes);


sequelize.sync({ force: false }).then(() =>{
    app.listen(PORT, () => console.log('Now Listening'));
})