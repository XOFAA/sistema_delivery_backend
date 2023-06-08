const {Categoria} = require('../models')


class CategoriaController {

    static async getCategoria(req,res){

        try {
            const categorias=await Categoria.findAll()
            res.status(200).json({
                data:categorias
            })
            
        } catch (error) {
            res.status(404).json({
                error:true,
                message:error.message
            })
        }
    }
    
    static async createCategoria (req,res){
    
        try {
          const categorias = await Categoria.findOne({
            where:{
                nome:req.body.nome
            }
          })

          if(!categorias){
            await Categoria.create({
                nome:req.body.nome
            })
            res.status(200).json({
                message:'categoria criada com sucesso'
            })
          } else {
            res.status(500).json({
                message:'nome da categoria ja existe'
            })
          }
          

        } catch (error) {
            res.status(404).json({
                error:true,
                message:error.message
            })
        }
    }

}


module.exports=CategoriaController