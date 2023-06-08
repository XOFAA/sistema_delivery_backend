const express =require('express')
const CategoriaController = require('../controllers/CategoriaController')
const RoutesCategorias = express.Router()


RoutesCategorias.get('/categorias',CategoriaController.getCategoria)
RoutesCategorias.post('/create',CategoriaController.createCategoria)


module.exports =RoutesCategorias