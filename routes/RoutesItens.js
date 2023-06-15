const express = require('express')
const ItensAdicionaisController = require('../controllers/ItensAdicionais.controller')

const RoutesItens=express.Router()


RoutesItens.get('/itens/',ItensAdicionaisController.getItens)
RoutesItens.post('/itens/create',ItensAdicionaisController.createItem)

module.exports = RoutesItens