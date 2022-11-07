const {Router } = require ("express")
const router = Router();
const {getUsersInactivo, userRestore} = require ("../controllers/userInactivo.js")

router.get("/", async (req, res)=>{
    try {
        const userInactivo = await getUsersInactivo()
        // console.log(userInactivo)
        res.status(200).json(userInactivo);

    }catch(error){
        res.status(400).json({message: error.message});
    }
})

router.put("/:id", async (req, res) =>{
    try{
        const{id} = req.params;
        const restore = await userRestore(id)
        res.status(200).json(restore);
    }catch(error){
        res.status(400).json({msg: error.msg})
    }
})

module.exports =router;