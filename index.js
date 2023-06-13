const express = require('express');
const RoutesCategorias = require('./routes/RoutesCategorias');
const RoutesBairros = require('./routes/RoutesBairros');
const RoutesProduto = require('./routes/RoutesProduto');
require('dotenv').config();
const app = express()

app.use(express.json())
app.use('/files', express.static('public/images'));
app.use('/',RoutesCategorias,RoutesBairros,RoutesProduto)


app.listen(process.env.PORTA,()=>{
    console.log('servidor iniciado com sucesso!');
})