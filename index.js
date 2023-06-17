const express = require('express');
const RoutesCategorias = require('./routes/RoutesCategorias');
const RoutesBairros = require('./routes/RoutesBairros');
const RoutesProduto = require('./routes/RoutesProduto');
const RoutesItens = require('./routes/RoutesItens');
const cors = require('cors')
require('dotenv').config();
const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static('public/images'));

app.use('/admin/',RoutesCategorias,RoutesBairros,RoutesProduto,RoutesItens)
app.use('/',RoutesCategorias,RoutesBairros,RoutesProduto,RoutesItens)


app.listen(process.env.PORTA,()=>{
    console.log('servidor iniciado com sucesso!');
})