const {ItemAdicional}=require('../models')



class ItensAdicionaisController{
    
    static async getItens(req,res){

        try {
        const itens=await Item.findAll()
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
                message:'erro ao cadastrar item adicional'
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
module.exports=ItensAdicionaisController