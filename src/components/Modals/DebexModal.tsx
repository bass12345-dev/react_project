import { Button, Label, Modal, Spinner, Textarea, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DebexInputs, DebtInputs, PaytoItem } from "../../utils/Types";
import { useEffect, useRef, useState } from "react";
import { DebexDBCreate, getDateSelectedType, getpayToItems } from "../../service/Service";
import { crud_type, debex, debex_type, supabase } from "../../utils/supabase";
import Swal from "sweetalert2";
import Select from 'react-select';

export const DebexModal = ({ 
    payeesArr, 
    openModal, 
    ToggleModal, 
    debexData,
    debexItem 
    }:{ 
    payeesArr : any, 
    openModal: any, 
    ToggleModal: any, 
    debexData: any, 
    debexItem:any 
}) => {

    const [payees, setPayees] = useState(payeesArr);
    const [loader, setLoader] = useState(false);
    const payee = useRef(null);
    const { Create } = DebexDBCreate(debex);
    
   
    
    //<!------------------ Insert Data ---------------------!>
    const {
        handleSubmit,
        register,
        reset,
    } = useForm<DebexInputs>()
    const onSubmit: SubmitHandler<DebexInputs> = (data) => InsertData(data);

    async function InsertData(data: any) {

        if(payee.current == null){
            alert('Please select Payee')
            return;
        }
        setLoader(true);
        const {due_date,paid_date,acquired_date} = await getDateSelectedType(debexItem.debex_type,data.date);
        let items = {
            total_amount    : parseFloat(data.total_amount),
            payto_id        : payee.current,
            reason          : data.reason,
            type            : debexItem.debex_type,
            due_date        : due_date  || null, 
            paid_date       : paid_date ||  null, 
            date_acquired   : acquired_date || null, 
        }
        let result = await Create(items);
        if(!result.error){
            Swal.fire({icon: "success",title: "Success...",text: "Data Added Successfully"});
            
            reset();
            debexData();
        }else{
            Swal.fire({icon: "error", title: "Failed...", text: "Failed to Add Data"});
        }
        setLoader(false);
    }

    
    //<!------------------ Select Payee ---------------------!>
    const handleChange = (e: any) => {
       payee.current = e.value
    }
    //<!------------------ End ---------------------!>

    return (
        <Modal show={openModal} size="md" popup onClose={ToggleModal}  >
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">{debexItem.title}</h3>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="reason" value="Reason" />
                            </div>
                            <Textarea id="reason" required {...register("reason")} />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="pay_to" value="Pay to" />
                            </div>
                            <Select id="pay_to" options={payees} onChange={handleChange}     />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="amount" value="Amount" />
                            </div>
                            <TextInput id="amount" type="number" {...register("total_amount")} required />
                        </div>


                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="date" value={debexItem.date_label} />
                            </div>
                            <TextInput id="date" type="date"   {...register("date")}  required={debexItem.debex_type != debex_type[2] ? true:false}  />
                        </div>


                        <div className="w-full flex justify-end">
                            <Button type="submit" className="bg-debexPrimary hover:bg-red-500" disabled={loader} ><Spinner hidden={!loader} aria-label="Default status example" />{!loader ? 'Add' : ''}</Button>
                        </div>

                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

