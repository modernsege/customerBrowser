import {FunctionComponent, useState} from "react";
import customerTileStyles from "./customerTile.module.css"
import {DeleteOutlined, InfoCircleOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import Popup from 'reactjs-popup';
import {CustomerDetails} from "./customerDetails/CustomerDetails";
import {message, Popconfirm} from "antd";


interface Props{
    customer: CustomerType,
    deleteCustomer: (id:number)=>void,
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


export const CustomerTile: FunctionComponent<Props>=(props: Props)=> {
    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);

    function confirm() {
        props.deleteCustomer(props.customer.id)
    }

    function closePopup(){
        setIsPopupOpened(false)
    }

    return(
        <div className={customerTileStyles.tile}>
            <span className={customerTileStyles["customer-name"]}>{props.customer.firstName} {props.customer.lastName}</span>
            <div className={customerTileStyles.buttons}>
                <Popup onOpen={()=>setIsPopupOpened(true)} onClose={()=>setIsPopupOpened(false)} open={isPopupOpened} trigger={
                    <span className={customerTileStyles.info}>
                        SHOW DETAILS <InfoCircleOutlined />
                    </span>} modal>
                    <CustomerDetails closePopup={closePopup} customerId={props.customer.id}/>
                </Popup>
                <Popconfirm
                    title="Are you sure to delete this customer?"
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="Cancel"
                >
                    <span className={customerTileStyles.delete}>DELETE <DeleteOutlined /></span>
                </Popconfirm>

            </div>
        </div>
    )
}