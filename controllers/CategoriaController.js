const { Categoria,Produto,ItemAdicional,ProdutoItemAdicional } = require('../models')


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
    
    static async deleteCategoria(req, res) {
        try {
          const categoria = await Categoria.findByPk(req.params.id);
      
          if (!categoria) {
            return res.status(500).json({
              message: 'Categoria não existe',
            });
          }
      
          const produtos = await Produto.findAll({
            where: {
              categoriaId: req.params.id,
            },
          });
      
          if (produtos.length > 0) {
            for (let i = 0; i < produtos.length; i++) {
              const produto = produtos[i];
      
              await ProdutoItemAdicional.destroy({
                where: {
                  produtoId: produto.id,
                },
              });
      
              await produto.destroy();
            }
          }
      
          await categoria.destroy();
      
          return res.status(200).json({
            message: 'Categoria, produtos e itens adicionais excluídos com sucesso',
          });
        } catch (error) {
          // Lide com o erro adequadamente
          console.error(error);
          return res.status(500).json({
            message: 'Ocorreu um erro ao excluir a categoria',
          });
        }
      }
      

}


module.exports = CategoriaController