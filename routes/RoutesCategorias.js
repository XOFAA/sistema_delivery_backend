const express =require('express')
const CategoriaController = require('../controllers/CategoriaController')
const RoutesCategorias = express.Router()


RoutesCategorias.get('/categorias',CategoriaController.getCategoria)
RoutesCategorias.post('/categorias/create',CategoriaController.createCategoria)
RoutesCategorias.put('/categorias/update/:id',CategoriaController.updateCategoria)
RoutesCategorias.delete('/categorias/delete/:id',CategoriaController.deleteCategoria)

module.exports = RoutesCategorias