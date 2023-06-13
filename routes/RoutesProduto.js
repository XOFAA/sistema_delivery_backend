const express = require('express')
const ProdutoController = require('../controllers/ProdutoController')
const upload = require('../config/configMulter')

const RoutesProduto = express.Router()


RoutesProduto.get('/produtos/',ProdutoController.getProduto)
RoutesProduto.post('/produto/create',upload.single('img'),ProdutoController.createProduto)
RoutesProduto.put('/produto/update/:id',upload.single('img'),ProdutoController.updateProduto)

module.exports=RoutesProduto