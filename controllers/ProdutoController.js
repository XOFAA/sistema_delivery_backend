const {Produto,ItemAdicional,ProdutoItemAdicional}=require('../models')
const fs = require('fs');
const path=require('path');



class ProdutoController{

    static async getProduto(req,res){

        try {
            const produtos = await Produto.findAll({
              include: [
                {
                  model: ItemAdicional,
                  as: 'itensAdicionais',
                },
              ],
              
            })
            res.status(200).json({
                data:produtos
            })
            
        } catch (error) {
            res.status(400).json({
                error:true,
                message:error.message
            })
        }
    }

    static async createProduto(req, res) {
      try {
        const { titulo, descricao, categoriaId, valor, itemadicional } = req.body;
    
        const produtoExistente = await Produto.findOne({
          where: {
            titulo: titulo,
          },
        });
    
        if (produtoExistente) {
          if (req.file) {
            fs.unlinkSync(req.file.path);
          }
          return res.status(501).json({
            message: 'Não foi possível cadastrar esse produto, ele já existe',
          });
        }
    
        const novoProduto = await Produto.create({
          titulo: titulo,
          descricao: descricao,
          categoriaId: categoriaId,
          status: 'ativo',
          img: req.file ? req.file.filename : null,
          valor: parseFloat(valor),
        });
    
        // Associar os itens adicionais ao produto
        if (itemadicional && Array.isArray(itemadicional)) {
          const itensAdicionais = await ItemAdicional.findAll({
            where: {
              id: itemadicional,
            },
          });
    
          await novoProduto.setItensAdicionais(itensAdicionais);
        }
    
        res.status(200).json({
          message: 'Produto cadastrado com sucesso',
        });
      } catch (error) {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        res.status(400).json({
          error: true,
          message: error.message,
        });
      }
    }
    

    static async updateProduto(req, res) {
      try {
        const produto = await Produto.findByPk(req.params.id);
    
        if (produto) {
          if (req.body.titulo !== produto.titulo) {
            const produtoExistente = await Produto.findOne({
              where: {
                titulo: req.body.titulo
              }
            });
    
            if (produtoExistente && produtoExistente.id !== req.params.id) {
              if (req.file) {
                fs.unlinkSync(req.file.path);
              }
              return res.status(400).json({
                error: true,
                message: 'O nome do produto já está em uso.'
              });
            }
          }
    
          if (req.file) {
            fs.unlinkSync('public/images/' + produto.img);
          }
    
          await produto.update({
            titulo: req.body.titulo || produto.titulo,
            descricao: req.body.descricao || produto.descricao,
            valor: req.body.valor || produto.valor,
            status: req.body.status || produto.status,
            img: req.file ? req.file.filename : produto.img
          });
    
          // Excluir todos os itens adicionais associados ao produto
          await produto.setItensAdicionais([]);
    
          // Verificar se foram enviados novos itens adicionais na requisição
          if (req.body.itensAdicionais && req.body.itensAdicionais.length > 0) {
            const novosItensAdicionais = await ItemAdicional.findAll({
              where: {
                id: req.body.itensAdicionais
              }
            });
    
            // Criar as associações entre o produto e os novos itens adicionais
            await produto.addItensAdicionais(novosItensAdicionais);
          }
    
          return res.status(200).json({
            message: 'Produto atualizado com sucesso.'
          });
        } else {
          if (req.file) {
            fs.unlinkSync(req.file.path);
          }
    
          return res.status(404).json({
            error: true,
            message: 'Produto não encontrado.'
          });
        }
      } catch (error) {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
    
        return res.status(500).json({
          error: true,
          message: error.message
        });
      }
    }
    

    static async deleteProduto(req,res){
      try {
        const produtos = await Produto.findByPk(req.params.id)
        if(produtos){
          await ProdutoItemAdicional.destroy({
            where: {
              produtoId: produtos.id,
            },
          });
          produtos.destroy()
          res.status(200).json({
            message:'produto deletado com sucesso'
          })
        }else{
          res.status(500).json({
            message:'produto não encontrado'
          })
        }
      } catch (error) {
        res.status(400).json({
          error:true,
          message:error.message
        })
      }
    }
    
}

module.exports = ProdutoController