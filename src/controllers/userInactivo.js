const {Users} = require ("../db");
const {Op} = require ("sequelize");

async function getUsersInactivo(){

    const usersInactivo = await Users.findAll({
        where:{
            deletedAt:{
                [Op.ne]:null
            },
        },
        paranoid: false //false
    })

    return usersInactivo
}

async function userRestore (id){
    const restoreUser = await Users.restore({
        where:{
            id:{
                [Op.eq]:id
            },
        },
    })
    return (`Usuario restaurando Correctamente ${id}`)
}
//nuevo pa
module.exports ={
    getUsersInactivo,
    userRestore,
}