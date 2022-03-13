import {FunctionComponent, useState} from "react";
import addCustomerFormStyles from "./addCustomerForm.module.css";
import {Button, Input, message} from "antd";
import {CloseOutlined} from '@ant-design/icons';

interface Props{
    addCustomer:(firstName:string,lastName:string,email:string,address:string,phoneNumber:string,additionalInfo:string)=>void,
    closePopup:()=>void
}

export const AddCustomerForm: FunctionComponent<Props>=(props: Props)=> {
const [firstName, setFirstName] = useState<string>("");
const [lastName, setLastName] = useState<string>("");
const [email, setEmail] = useState<string>("");
const [address, setAddress] = useState<string>("");
const [phoneNumber, setPhoneNumber] = useState<string>("");
const [additionalInfo, setAdditionalInfo] = useState<string>("");

    function handleConfirmClick(){
        props.addCustomer(firstName,lastName,email,address,phoneNumber,additionalInfo);
        props.closePopup();
    }

    return(
        <div className={addCustomerFormStyles.form}>
            <CloseOutlined onClick={()=>props.closePopup()} className={addCustomerFormStyles["close-button"]}/>
            <div className={addCustomerFormStyles["in-form-div"]}><span className={addCustomerFormStyles["text-before"]}>First name</span>
                <Input className={addCustomerFormStyles.input}  onChange={(e)=>setFirstName(e.target.value)}/>
            </div>
            <div className={addCustomerFormStyles["in-form-div"]}><span className={addCustomerFormStyles["text-before"]}>Last name</span>
                <Input className={addCustomerFormStyles.input} onChange={(e)=>setLastName(e.target.value)}/>
            </div>
            <div className={addCustomerFormStyles["in-form-div"]}><span className={addCustomerFormStyles["text-before"]}>Email</span>
                <Input className={addCustomerFormStyles.input} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className={addCustomerFormStyles["in-form-div"]}><span className={addCustomerFormStyles["text-before"]}>Address</span>
                <Input className={addCustomerFormStyles.input} onChange={(e)=>setAddress(e.target.value)}/>
            </div>
            <div className={addCustomerFormStyles["in-form-div"]}><span className={addCustomerFormStyles["text-before"]}>Phone number</span>
                <Input className={addCustomerFormStyles.input} onChange={(e)=>setPhoneNumber(e.target.value)}/>
            </div>
            <div className={addCustomerFormStyles["in-form-div"]}><span className={addCustomerFormStyles["text-before"]}>Additional info</span>
                <Input className={addCustomerFormStyles.input} onChange={(e)=>setAdditionalInfo(e.target.value)}/>
            </div>
            <Button className={addCustomerFormStyles.button} type="primary" onClick={handleConfirmClick}>Confirm</Button>
        </div>
    )
}