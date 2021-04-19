const CustomerService = module.exports
const CustomerRepository = require('../repositories/CustomerRepository')
const AccountRepository = require('../repositories/AccountRepository')


CustomerService.create = async (customer) =>{
    //Buscamos el cliente por id para verificar si existe
    const customerFound = await CustomerRepository.findById(customer.id)

    //si la lista de resultados su tamaño es mayor que cero
    //es por que existe un cliente con esa cedula

    if(customerFound.length > 0){
        throw new Error('Customer already exist')
    }

    //se crea el cliente
    await CustomerRepository.create(customer)
}

CustomerService.edit = async (id,customer) =>{

    //Buscamos al cliente para verificar id si ya existe.
    const customerFound = await CustomerRepository.findById(id)
    
    //si la lista de resultados su tamaño es cero
    //es por que no existe un cliente con esa cedula
    if (customerFound.length==0) {
        throw new Error('Customer does not exist')
    }

    await CustomerRepository.edit(id,customer)
}

CustomerService.delete = async (idCustomer) =>{

    //se consultan las cuentas del cliente
    //se usa await porque debemos esperar el resultado
    const customerAccounts= await AccountRepository.listAccountsByCustomer(idCustomer)
    //si el tamaño de la lista es mayor a cero es porque tiene cuentas

    if(customerAccounts.length>0){
        throw new Error('Customer with accounts, can not be deleted')
    }

    //Se elimina el cliente
    await CustomerRepository.delete(idCustomer)
}

CustomerService.findCustomer = async (idCustomer) => {
    const customers = await CustomerRepository.findById(idCustomer)

    if(customers.length==0) {
        return undefined
    }

    return customers[0]
}

CustomerService.findAllCustomers = async () => {
    const customers = await CustomerRepository.findAll()

    return customers
}