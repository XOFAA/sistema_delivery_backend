const {Produto}=require('../models')
const fs = require('fs');
const path=require('path')


class ProdutoController{

    static async getProduto(req,res){

        try {
            const produtos = await Produto.findAll()
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

    static async createProduto(req,res){
        try {
            const produtos=await Produto.findOne({
                where:{
                    titulo:req.body.titulo
                    
                }
            }) 
            if(produtos){
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                res.status(501).json({
                    message:'Não foi possivel cadastrar esse produtos, ele já existe'
                })
            }else{
                await Produto.create({
                    titulo:req.body.titulo,
                    descricao:req.body.descricao,
                    categoriaId:req.body.categoriaId,
                    status:'ativo',
                    img:req.file ? req.file.filename : null,
                    valor:parseFloat(req.body.valor)
                })
                res.status(200).json({
                    message:'produtos cadastrado com sucesso'
                })
            }
        } catch (error) {
            
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(400).json({
                error:true,
                message:error.message
            })
        }
    }

    static async updateProduto(req, res) {

      try {
        const produtos = await Produto.findByPk(req.params.id);
      
        if (produtos) {
          if (req.body.titulo !== produtos.titulo) {
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
                message: 'O nome do produtos já está em uso.'
              });
            }
          }
      
          if (req.file) {
            fs.unlinkSync('public/images/' + produtos.img);
          }
      
          await produtos.update({
            titulo: req.body.titulo || produtos.titulo,
            descricao: req.body.descricao || produtos.descricao,
            valor: req.body.valor || produtos.valor,
            status: req.body.status || produtos.status,
            img: req.file ? req.file.filename : produtos.img
          });
      
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
    
}

module.exports = ProdutoController