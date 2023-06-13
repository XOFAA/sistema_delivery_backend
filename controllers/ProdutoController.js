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
                    message:'Não foi possivel cadastrar esse produto, ele já existe'
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
                    message:'produto cadastrado com sucesso'
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
        const produtos = await Produto.findByPk(req.params.id)
        const nomeExiste=await Produto.findOne({
          where:{
            titulo:req.body.titulo
          }
        })

        if(produtos){
         
          if(produtos.img){
            fs.unlinkSync('public/images/'+produtos.img)
          }
          if(nomeExiste){
            
            res.status(501).json({
              message:'não é possivel atualizar esse produto com esse nome, pois o nome já existe'
            })
          }else{
            await produtos.update({
              titulo:req.body.titulo,
              descricao:req.body.descricao,
              valor:req.body.valor,
              status:req.body.status,
              img:req.file?req.file.filename:null
            })
          }
          res.status(200).json({
            message:'produto atualizado com sucesso'
          })
        }else{
          res.status(500).json({
            message:'erro ao atualizar o produto'
          })
        }

      } catch (error) {
        if(req.file){
          fs.unlinkSync(req.file.path)
        }
        res.status(400).json({
          error:true,
          message:error.message
        })
      }
       
    }
    
      
      
}

module.exports = ProdutoController