const express = require('express')
const ProdutoController = require('../controllers/ProdutoController')
const upload = require('../config/configMulter')

const RoutesProduto = express.Router()

RoutesProduto.get('/produto/:id',ProdutoController.getUmProduto)
RoutesProduto.get('/produtos/',ProdutoController.getProduto)
RoutesProduto.post('/produto/create',upload.single('img'),ProdutoController.createProduto)
RoutesProduto.put('/produto/update/:id',upload.single('img'),ProdutoController.updateProduto)
RoutesProduto.delete('/produto/delete/:id',ProdutoController.deleteProduto)
module.exports=RoutesProduto