import {FunctionComponent, useEffect, useState} from "react";
import client from "../../../../actions/customer"
import customerDetailsStyles from "./customerDetails.module.css"
import addCustomerFormStyles from "../../addCustomerForm/addCustomerForm.module.css";
import {CloseOutlined} from "@ant-design/icons";

interface Props{
    customerId:number,
    closePopup:()=>void
}

interface CustomerType{
    "id": number,
    "firstName": string,
    "lastName": string,
    "email": string,
    "address": string,
    "phoneNumber": string,
    "additionalInfo": string
}

export const CustomerDetails:FunctionComponent<Props>=(props:Props)=>{

    const [customer, setCustomer] = useState<CustomerType>({
        additionalInfo: "",
        address: "",
        email: "",
        firstName: "",
        id: 0,
        lastName: "",
        phoneNumber: ""
    })

    useEffect(()=>{
        client.getCustomerById(props.customerId.toString())
            .then((response)=>{
                setCustomer(response.data)
        })
            .catch((e)=>{
                console.log(e);
            })
    },[])

    return(
        <div className={customerDetailsStyles.window}>
            <CloseOutlined onClick={()=>props.closePopup()} className={customerDetailsStyles["close-button"]}/>
            <div className={customerDetailsStyles.title}>CUSTOMER DETAILS</div>
            <div>
                <span className={customerDetailsStyles.text}>First name: </span><span className={customerDetailsStyles.value}>{customer.firstName}</span>
            </div>
            <div>
                <span className={customerDetailsStyles.text}>Last name: </span><span className={customerDetailsStyles.value}>{customer.lastName}</span>
            </div>
            <div>
                <span className={customerDetailsStyles.text}>Email: </span><span className={customerDetailsStyles.value}>{customer.email}</span>
            </div>
            <div>
                <span className={customerDetailsStyles.text}>Address: </span><span className={customerDetailsStyles.value}>{customer.address}</span>
            </div>
            <div>
                <span className={customerDetailsStyles.text}>Phone number: </span><span className={customerDetailsStyles.value}>{customer.phoneNumber}</span>
            </div>
            <div>
                <span className={customerDetailsStyles.text}>Additional info: </span><span className={customerDetailsStyles.value}>{customer.additionalInfo}</span>
            </div>
        </div>
    )
}