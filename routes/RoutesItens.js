const express = require('express')
const ItensAdicionaisController = require('../controllers/ItensAdicionais.controller')

const RoutesItens=express.Router()


RoutesItens.get('/itens/',ItensAdicionaisController.getItens)
RoutesItens.post('/itens/create',ItensAdicionaisController.createItem)
RoutesItens.put('/itens/update/:id',ItensAdicionaisController.updateItem)
RoutesItens.delete('/itens/delete/:id',ItensAdicionaisController.deleteItem)
module.exports = RoutesItens