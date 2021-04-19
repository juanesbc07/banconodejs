const AccountService = module.exports
const CustomerRepository = require('../repositories/CustomerRepository')
const AccountRepository = require('../repositories/AccountRepository')

AccountService.listAccountsByCustomer = async (customerId)=>{

    //Buscamos el cliente por ID para verificar que existe
    const customerFound = await CustomerRepository.findById(customerId)

    //Si la lista de tamaño es cero es porqué no existe ningun
    //cliente con ese ID
    if (customerFound==0) {
        throw new Error('Customer does not exist')
    }

    return AccountRepository.listAccountsByCustomer(customerId)

}

AccountService.create = async (account)=>{
    //Buscamos el cliente por id para verificar si existe
    const customerFound = await CustomerRepository.findById(account.customerid)

    //Si la lista da resultado 0 es porqué no existe un cliente con esa cedula
    if (customerFound.length==0){
        throw new Error('Customer does not exist')
    }

    //Consultando las cuentas del cliente
    const accountsByCustomer = await AccountRepository.listAccountsByCustomer(account.customerid)

    //Verificando que solo tenga hasta 3 cuentas
    if (accountsByCustomer.length>=3) {
        
        throw new Error('no more than 3 accounts')
    }

    account.opennedat = new Date();//fecha apertura
    account.amount =0;//Saldo inicial

    await AccountRepository.create(account)
}

AccountService.delete = async(accountId) =>{

    const accountFound = await AccountRepository.findById(accountId)

    if (accountFound[0].amount > 0) {
        throw new Error('the account has amount')
    }

    await AccountRepository.delete(accountId)
}

AccountService.retirar = async (transaccion) =>{
    const accountFound = await AccountRepository.findById(transaccion.id)
    

    if (accountFound.length ==0 ) {
        throw new Error('Account does not exist')
    }

    if (transaccion.amount>accountFound[0].amount){

        throw new Error('the transaction amount exceeds the account amount')
    }

     transaccion.amount = accountFound[0].amount - transaccion.amount
     const account=transaccion;
     const accountId=transaccion.id

    await AccountRepository.edit(accountId, account)
}

AccountService.consignar = async (transaccion) =>{
    const accountFound = await AccountRepository.findById(transaccion.id)
    

    if (accountFound.length ==0 ) {
        throw new Error('Account does not exist')
    }
    
    transaccion.amount =  Number(accountFound[0].amount) + Number(transaccion.amount);

    const account=transaccion;
    const accountId=transaccion.id

    await AccountRepository.edit(accountId, account)
}

AccountService.transferir = async (transaccion) =>{
    //Buscamos la cuenta del cleinte
    
    const accountFound = await AccountRepository.findById(transaccion.id)
    const accountFound2 = await AccountRepository.findById(transaccion.id2)
    
    //si el tamaño es cero de la lista de resultados 
    //Es que no existe un cliente con esa cedula

    if (accountFound.length == 0 ) {
        throw new Error('La cuenta de origen no existe')
    }
    if (accountFound2.length == 0 ) {
        throw new Error('La cuenta de Destino no existe')
    }
    var accountFoundM = accountFound[0].amount
    console.log("el monto de la base de datos es " + accountFoundM)//20000
    var TotalTrasaccion = accountFoundM - transaccion.amount
    console.log("el monto despues del retiro es " + TotalTrasaccion)
    if(TotalTrasaccion < 0)
    {
        throw new Error('saldo insuficiente')
    }else{
        accountFound[0].amount = TotalTrasaccion
        console.log("el nuevo monto en la BD sera " + accountFound[0].amount)
    await AccountRepository.edit(transaccion.id, accountFound[0])

        var cuentaDestinoM = accountFound2[0].amount
        console.log("cuentaDestino : " + cuentaDestinoM)
        var TotalTrasaccionD = cuentaDestinoM+transaccion.amount
        console.log(" TotalTrasaccionD" + TotalTrasaccionD)
        accountFound2[0].amount = TotalTrasaccionD
        console.log("accountFound2[0].amount " + accountFound2[0].amount)
        await AccountRepository.edit(transaccion.id2, accountFound2[0])


    }


}