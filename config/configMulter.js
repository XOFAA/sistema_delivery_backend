const multer = require ('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images')
    },
    filename:function(req,file,cb){
        const nome = Date.now() + '-' + file.originalname
        cb(null,nome)
    }

})
const upload = multer({storage:storage})

module.exports=upload