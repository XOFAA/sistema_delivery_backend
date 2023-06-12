const express = require('express')
const BairrosController = require('../controllers/BairrosController')

const RoutesBairros = express.Router()



RoutesBairros.get('/bairros',BairrosController.getBairros)
RoutesBairros.post('/bairros/create',BairrosController.createBairro)
RoutesBairros.put('/bairros/update/:id',BairrosController.updateBairro)
RoutesBairros.delete('/bairros/delete/:id',BairrosController.deleteBairro)

module.exports = RoutesBairros