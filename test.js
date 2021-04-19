//importando el repositorio
const ClienteRepository = require('./app/repositories/CustomerRepository')
const AccountRepository = require('./app/repositories/AccountRepository')
const CustomerService = require('./app/services/CustomerService')
const AccountService = require('./app/services/AccountService')

console.log('Probando..........')

/* async function probarCrearCuenta(){
    const result = await AccountService.create({
        id:'cuenta4',
        customerid:'1',
    })
    console.log(result)
}

probarCrearCuenta().then(console.log('OK')) */

/* console.log('Probando..........')

async function probarListarCuentasCliente(){
    const result = await AccountService.listAccountsByCustomer('568768')
    console.log(result)
}

probarListarCuentasCliente().then(console.log('OK')) */


/* async function probarBuscarCliente(){
    const customer= await CustomerService.findCustomer('1234')
    console.log(customer)
}
probarBuscarCliente().then(console.log('OK')) */

/* async function probarEliminarCliente(){
    await CustomerService.delete('2345')
}
probarEliminarCliente().then(console.log('OK'))
 */

/* async function probarEditarCliente(){
    await CustomerService.edit('345',{
        lastname:'Quitian',
        name:'Obdulio',
    })
}

probarEditarCliente().then(console.log('OK')) */

async function probarCrearCliente(){
    await CustomerService.create({
        id:'2345',
        lastname: 'baca',
        name: 'fabian',
        email: 'fabian@gmail.com'
    })
}

probarCrearCliente().then(console.log('OK'))

/* AccountRepository.create({
    id:'fafa',
    customerid:'1',
    amount:'5000',
    opennedat:'2021-04-16'
})
.then(console.log) */

/* async function probandoListarCuentas(){
    const list = await AccountRepository.listAccountsByCustomer('1')
    console.log(list)
}
probandoListarCuentas()
.then(console.log('OK'))
 */

/* ClienteRepository.create({
    name:'Juan',
    lastname:'Ferrer',
    id:'4321',
    email:'Juan@gmail.com'
}).then(console.log)//para que el programa espere que la operacion termine



async function probandoElBuscar(){
    const cliente = await ClienteRepository.findById('4321')
    console.log(cliente)
}

probandoElBuscar()
.then(console.log('OK')) // para que el programa espere la respuesta

//async, siempre que haya un await dentro de una funcion, la funcion debe llevar async
async function probandoElEditar(){
    await ClienteRepository.edit('4321',{
        name:'Jose',
        lastname:'Perez',
    })
}

probandoElEditar()
.then(console.log('OK')) //Para que el programa espere a que la operacion termine

async function probandoEliminar(){
    await ClienteRepository.delete('4321')
}

probandoEliminar()
.then(console.log('OK')) */