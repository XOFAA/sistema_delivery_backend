const {Bairros}=require('../models/')


class BairrosController{

    static async getBairros(req,res){

        try {
            const bairros = await Bairros.findAll()
            res.status(200).json({
                data:bairros
            })
        } catch (error) {
            res.status(400).json({
                error:true,
                message:error.mesage
            })
        }
    }

    static async createBairro(req,res){

        try {
            const bairros = await Bairros.findOne({
                where:{
                    bairro:req.body.bairro
                }
            })

            if(!bairros){
                await Bairros.create({
                    bairro:req.body.bairro,
                    taxa:req.body.taxa
                })
                res.status(200).json({
                    message:'cadastro feito com sucesso'
                })
            }else{
                res.status(501).json({
                    message:'ja existe um bairro com esse nome'
                })
            }
     
        } catch (error) {
            res.status(400).json({
                error:true,
                message:error.message
            })
        }
    }

    static async updateBairro(req,res){

        try {
        const bairros = await Bairros.findByPk(req.params.id)

        if(!bairros){
            res.status(501).json({
                message: 'Bairro não encontrado'
            })
        }else{
            bairros.update({
                bairro:req.body.bairro,
                taxa:req.body.taxa
            })
            res.status(200).json({
                message:'Bairro Atualizado com sucesso'
            })
        }
        } catch (error) {
            res.status(500).json({
                error:true,
                message:error.message
            })
        }
    }

    static async deleteBairro(req,res){

        try {
            const bairros =await Bairros.findByPk(req.params.id)

            if(!bairros){
                res.status(501).json({
                    message:'bairro nao encontrado'
                })
            }else{
                bairros.destroy()
                res.status(200).json({
                    message:'bairro deletado com sucesso'
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

module.exports = BairrosController


