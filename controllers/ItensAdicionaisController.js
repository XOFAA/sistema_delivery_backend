const {ItemAdicional,ProdutoItemAdicional}=require('../models')



class ItensAdicionaisController{
    
    static async getItens(req,res){

        try {
        const itens=await ItemAdicional.findAll()
        res.status(200).json({
            data:itens
        })

        } catch (error) {
            res.status(400).json({
                error:true,
                message:error.message
            })
        }
    }

    static async createItem(req,res){

    try {
        const itens = await ItemAdicional.findOne({
            where:{
                titulo:req.body.titulo
            }
        })
        if(!itens){
        await ItemAdicional.create({
            titulo:req.body.titulo,
            descricao:req.body.descricao,
            valor:parseFloat(req.body.valor)
        })
        res.status(200).json({
            message:'cadastro feito com sucesso'
        })
        }else{
            res.status(500).json({
                message:'item Adicional já existe'
            })
        }
    } catch (error) {
        res.status(400).json({
            error:true,
            message:error.message
        })
    }
    }

    static async updateItem(req,res){
        const itens = await ItemAdicional.findOne({
            where:{
                titulo:req.body.titulo
            }
        })
        const novoItem=await ItemAdicional.findByPk(req.params.id)
        try {
            if(itens && novoItem){
                res.status(501).json({
                    message:'já existe um item com esse nome'
                })
            }
            else{
                if(novoItem){
                    await novoItem.update({
                        titulo:req.body.titulo,
                        descricao:req.body.descricao,
                        valor:parseFloat(req.body.valor)
                    })
                    res.status(200).json({
                        message:'item alterado com sucesso'
                    })
                }else{
                    res.status(500).json({
                        message:'item não encontrado'
                    })
                }
               
            }

        } catch (error) {

            res.status(400).json({
                error:true,
                message:error.message
            })
        }
    }
    static async deleteItem(req, res) {
        try {
          const itemAdicionalId = req.params.id;
      
          // Verifica se o item adicional existe
          const itemAdicional = await ItemAdicional.findByPk(itemAdicionalId);
      
          if (!itemAdicional) {
            return res.status(404).json({
              error: true,
              message: 'Item adicional não encontrado.'
            });
          }
      
          // Exclui os registros relacionados na tabela de junção (produtoitemadicional)
          await ProdutoItemAdicional.destroy({
            where: {
              itemAdicionalId: itemAdicionalId
            }
          });
      
          // Exclui o registro do item adicional
          await itemAdicional.destroy();
      
          return res.status(200).json({
            message: 'Item adicional deletado com sucesso.'
          });
        } catch (error) {
          return res.status(500).json({
            error: true,
            message: error.message
          });
        }
      }
      
      

}
module.exports=ItensAdicionaisController