const express = require('express');
const RoutesCategorias = require('./routes/RoutesCategorias');
const RoutesBairros = require('./routes/RoutesBairros');
require('dotenv').config();
const app = express()

app.use(express.json())

app.use('/',RoutesCategorias,RoutesBairros)


app.listen(process.env.PORTA,()=>{
    console.log('servidor iniciado com sucesso!');
})