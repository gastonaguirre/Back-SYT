const {Users} = require("../db");

async function deleteUser (id,paranoid){
    if (paranoid) {
        await Users.destroy({
            where:{
                id
            }
        })
        return "Usuario Inactivo correctamente"
    }else if (!paranoid){
        await Users.destroy({
            where:{
                id
            },
            force:true
        })
        return "Usuario eliminado  correctamente "
    }
}

module.exports={
    deleteUser
}