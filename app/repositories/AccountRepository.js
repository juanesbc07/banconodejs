const AccountRepository = module.exports
const DB = require('../config/database')


AccountRepository.create = (account) => {
    return DB('accounts').insert(account)
}

AccountRepository.delete =(accountId)=>{
    return DB('accounts').where({id: accountId}).del()
}

AccountRepository.findById= (accountId) => {
    return DB('accounts').where({id : accountId}).select('*')
}

AccountRepository.edit =(accountId, account) =>{
    return DB('accounts').where({ id: accountId}).update(account)
}

AccountRepository.listAccountsByCustomer = (customerId)=>{
    return DB('accounts').where({customerid : customerId}).select('*')
}