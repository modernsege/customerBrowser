import {FunctionComponent, useEffect, useState} from "react";
import customerPageStyles from './customerPage.module.css'
import customers from "../../actions/customer";
import {Input, Pagination, Button, message} from "antd";
import 'antd/dist/antd.css';
import {CustomerTile} from "./customerTile/CustomerTile";
import {PlusOutlined} from '@ant-design/icons';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {AddCustomerForm} from "./addCustomerForm/AddCustomerForm";
import client from "../../actions/customer";


interface Props{
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

export const CustomerPage: FunctionComponent<Props>=(props: Props)=> {
    const [customerList, setCustomerList] = useState<CustomerType[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageLimit, setPageLimit] = useState<number>(15);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);

    useEffect(()=>{
        customers.getAll(pageLimit.toString(),pageNumber.toString())
            .then((response)=> {
                setCustomerList(response.data.content);
                setTotalElements(response.data.totalElements)
            })
            .catch(e=>{
                console.log(e)
            })
    },[pageNumber, pageLimit, totalElements])

    function onShowSizeChange(current: number, pageLimit: number) {
        setPageLimit(pageLimit)
    }
    function onPageChange(current: number, pageLimit: number){
        setPageNumber(current-1)
    }

    function deleteCustomer(id:number){
        client.deleteCustomer(id.toString())
            .then((response)=>{
                message.success(response.data);
            })
            .catch((e)=>{
                message.error(e);
            })
        let updatedCustomerList = customerList.filter(customer => customer.id !== id);
        setCustomerList(updatedCustomerList);
    }

    function addCustomer(firstName:string,lastName:string,email:string,address:string,phoneNumber:string,additionalInfo:string){
        client.addCustomer(firstName,lastName,email,address,phoneNumber,additionalInfo)
            .then((response)=>{
                message.success(response.data)
            })
            .catch((e)=>{
                message.error(e.response.data)
            })
        setTotalElements(elements=>elements+1)
    }

    function closePopup(){
        setIsPopupOpened(false)
    }

    return(
        <div className={customerPageStyles["main-window"]}>
            <div className={customerPageStyles.title}>
                CUSTOMER BROWSER
            </div>
            <div className={customerPageStyles["customers-list"]}>
                <div className={customerPageStyles.add}>

                    <Popup onOpen={()=>setIsPopupOpened(true)} onClose={()=>setIsPopupOpened(false)} open={isPopupOpened} trigger={<span className={customerPageStyles["add-span"]}>ADD CUSTOMER <PlusOutlined /> </span>} modal >
                        <AddCustomerForm closePopup={closePopup} addCustomer={addCustomer}/>
                    </Popup>
                </div>
                {customerList.slice(0).reverse().map(customer=><CustomerTile deleteCustomer={deleteCustomer} key={customer.id} customer={customer}/>)}
            </div>
            {
                <div className={customerPageStyles.pagination}>
                    <Pagination
                        showQuickJumper={true}
                        onShowSizeChange={onShowSizeChange}
                        defaultCurrent={1}
                        total={totalElements}
                        pageSize={pageLimit}
                        pageSizeOptions={[15,30,45,60]}
                        onChange={onPageChange}
                        responsive={true}
                    />
                </div>
                }
        </div>
    )
}