const AccountController = module.exports
//Importando el modulo de la logica (service)
const AccountService = require('../services/AccountService');

AccountController.listAccountsByCustomer = async(req,res,next)=> {
    const params = req.params;

    try {
        const response = await AccountService.listAccountsByCustomer(params.id)

        //enviando respuesta al cliente que retorna la logica
        res.send(response)
    } catch (error) {
        console.log({error});
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}

AccountController.createAccount = async(req, res,next) =>{
    const body = req.body;

    try {
        await AccountService.create(body)
        res.send({message: 'account created'})
    } catch (error) {
        console.log({error});
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}

AccountController.delete = async(req,res,next)=>{
    
    const params = req.params;
    try {
        await AccountService.delete(params.id)

        //enviando respuesta al cliente (postman por ejemplo)
        res.send({message:'Account deleted'})
    } catch (error) {
        console.log({error})
        //retornando al cliente (postman por ejemplo) el error
        res.status(500).send({error:error.message}).end();
        next(error);
    }
}

AccountController.retirar = async (req, res, next) =>{
    
    const params = req.params;
    //extrayendo el body de la peticion
    const body = req.body;

    try {
        await AccountService.retirar(body)

        res.send({message: 'successful withdrawal'})
    } catch (error) {
        
        console.log({error});
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}

AccountController.consignar = async (req, res, next) =>{
    
    const params = req.params;
    //extrayendo el body de la peticion
    const body = req.body;

    try {
        
        await AccountService.consignar(body)

        res.send({message: 'successful consignment'})
    } catch (error) {
        
        console.log({error});
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}

AccountController.transferir = async (req, res, next) =>{
    
        
    //extrayendo el body de la peticion
    const body = req.body;

    try {
        
        await AccountService.transferir(body)

        res.send({message: 'successful transfer'})
    } catch (error) {
        
        console.log({error});
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}