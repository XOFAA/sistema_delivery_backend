const { Categoria,Produto,ItemAdicional } = require('../models')


class CategoriaController {

    static async getCategoria(req, res) {

        try {
            const categorias = await Categoria.findAll({
                include:[{
                    model:Produto
                },
                {
                    model: ItemAdicional,
                    as: 'itensAdicionais',
                }
            
            ]
            })
            res.status(200).json({
                data: categorias
            })

        } catch (error) {
            res.status(404).json({
                error: true,
                message: error.message
            })
        }
    }

    static async createCategoria(req, res) {

        try {
            const categorias = await Categoria.findOne({
                where: {
                    nome: req.body.nome
                }
            })

            if (!categorias) {
                await Categoria.create({
                    nome: req.body.nome
                })
                res.status(200).json({
                    message: 'categoria criada com sucesso'
                })
            } else {
                res.status(500).json({
                    message: 'nome da categoria ja existe'
                })
            }


        } catch (error) {
            res.status(404).json({
                error: true,
                message: error.message
            })
        }
    }

    static async updateCategoria(req, res) {

        try {
            const categorias = await Categoria.findOne({
                where: {
                    nome: req.body.nome
                }
            })
            const novaCategorias = await Categoria.findByPk(req.params.id)

            if (categorias && novaCategorias) {
                res.status(500).json({
                    message: 'Nome da categoria já existe'
                })
            } else {
                if (!novaCategorias) {
                    res.status(500).json({
                        message: 'categoria não existe'
                    })
                } else {
                    novaCategorias.update({
                        nome: req.body.nome
                    })
                    res.status(200).json({
                        message: 'Nome da categoria atualizada com sucesso'
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
    
    static async deleteCategoria(req,res){

        try {

        const categorias=await Categoria.findByPk(req.params.id)
        
        if(!categorias){
            res.status(500).json({
                message:'categoria não existe'
            })
        }else{
            categorias.destroy()
            res.status(200).json({
                message:'categoria deletada com sucesso'
            })
        }
        } catch (error) {
            
        }
    }

}


module.exports = CategoriaController