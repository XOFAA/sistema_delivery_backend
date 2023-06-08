const express = require('express');
const RoutesCategorias = require('./routes/RoutesCategorias');
require('dotenv').config();
const app = express()

app.use(express.json())
app.use('/',RoutesCategorias)


app.listen(process.env.PORTA,()=>{
    console.log('servidor iniciado com sucesso!');
})