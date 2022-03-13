import client from '../services/api'

const customer = {
    getAll: (pageLimit:string, pageNumber:string)=>{
        return(client.get("/customers",
            {params: {
                    limit: pageLimit,
                    page: pageNumber,
                }
            }
            ))
    },
    getCustomerById: (id:string)=>{
        return(client.get(`/customers/${id}`))
    },
    addCustomer: (firstName:string, lastName:string, email:string, address:string, phoneNumber:string, additionalInfo:string)=>{
        return(client.post(`/customers`,{
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "address": address,
                "phoneNumber": phoneNumber,
                "additionalInfo": additionalInfo
        },{ headers: {
                    'Content-Type': 'application/json'
                }}
        ))
    },
    deleteCustomer:(id:string)=>{
        return(client.delete(`/customers/${id}`))
    }

}

export default customer;