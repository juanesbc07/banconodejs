const CustomerController = module.exports
const { response } = require('express');
//Importando el modulo de logica (service)
const CustomerService = require('../services/CustomerService');

//los parametros req, res y next siempre son requeridos
//Para el correcto funcionamiento del controlador
//acá no va definido el path, se hace en otra parte.

CustomerController.delete = async(req,res,next)=>{
    //Extrayendo los PathParams de la peticion
    const params = req.params;

    try {
        //Se supone que el id llega asi /customers/:id (aca no es con{} sino con :)
        //await (ya que el metodo es async) para esperar que termine
        await CustomerService.delete(params.id)

        //enviando respuesta al cliente (postman por ejemplo)
        res.send({message:'customer deleted'})


    } catch (error) {//Manejando las excepciones

        console.log({error})
        //retornando al cliente (postman por ejemplo) el error
        res.status(500).send({error:error.message}).end();
        next(error);
    }
}

//PUT /customers/:id Body: datos a editar
CustomerController.edit = async(req,res,next)=>{
    const params = req.params;
    //extrayendo el body de la peticion
    const body = req.body;

    try {
        await CustomerService.edit(params.id , body)

        res.send({message: 'customer updated'})
    } catch (error) {
        
        console.log({error});
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}

CustomerController.create = async(req,res,next) =>{

    const body = req.body;
    try {
        await CustomerService.create(body)
        res.send({message: 'client created'})
    } catch (error) {
        console.log({error});
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}

CustomerController.findCustomer = async(req,res,next)=>{

    const params = req.params;

    try {
        const response =await CustomerService.findCustomer(params.id)

        res.send(response)

    } catch (error) {
        console.log({error});
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}

CustomerController.findAllCustomers = async(req,res,next)=>{

    try {
        const response =await CustomerService.findAllCustomers()

        res.send(response)
        
    } catch (error) {
        console.log({error});
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}