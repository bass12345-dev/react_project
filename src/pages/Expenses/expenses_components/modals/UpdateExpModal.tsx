import { Button, Label, Modal, Spinner, Textarea, TextInput } from "flowbite-react";
import { DebexInputs } from "../../../../utils/Types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { DebexDBUpdate, getCurrDate, getpayToItems } from "../../../../service/Service";
import Select from 'react-select';
import Payto from "../../../PayTo/PayTo";
import { debex } from "../../../../utils/supabase";
import Swal from "sweetalert2";
export const UpdateExpModal = ({
    openEditModal,
    ToggleEditModal,
    ExpensesItem,
    payeesArr,
    debexData,
    setOpenEditModal
}: {
    openEditModal: any,
    ToggleEditModal: any,
    ExpensesItem: any,
    payeesArr: any[],
    debexData : any,
    setOpenEditModal : any
}) => {


    const defaultPayTo = { last_name: "Unknown", first_name: "Unknown" };
    const payTo = ExpensesItem.pay_to || defaultPayTo;
    let   {day,Month,Year}    = getCurrDate();
    const [loader, setLoader] = useState(false);
    const [payees, setPayees] = useState(payeesArr);
    const payee = useRef(null);
    const {Update} =  DebexDBUpdate(debex);

    //<!------------------ Insert Data ---------------------!>
    const {
        handleSubmit,
        register,
        reset,
        setValue
    } = useForm<DebexInputs>()
    const onSubmit: SubmitHandler<DebexInputs> = (data) => UpdateData(data);

    setValue('reason', ExpensesItem.reason);
    setValue('total_amount', ExpensesItem.total_amount);
    setValue('date', ExpensesItem.paid_date);

    async function UpdateData(data: any) {
      
        setLoader(true);
        let items = {
            total_amount    : parseFloat(data.total_amount),
            payto_id        : payee.current || ExpensesItem.payto_id,
            reason          : data.reason,
            paid_date       : data.date
        }

        let result = await Update(items,ExpensesItem.deb_exp_id);

        if(!result.error){
            Swal.fire({icon: "success",title: "Success...",text: "Data Updated Successfully"});
            reset(); 
            let d = new Date();
            debexData(Month, Year);
            setOpenEditModal(false);
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
        <Modal show={openEditModal} size="md" popup onClose={ToggleEditModal}  >
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Information</h3>
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
                            <Select id="pay_to" options={payees} defaultValue={{ label: payTo.first_name, value: ExpensesItem.payto_id }} onChange={handleChange} />
                            {/*  */}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="amount" value="Amount" />
                            </div>
                            <TextInput id="amount" type="number" {...register("total_amount")} required />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="date" value="Paid Date" />
                            </div>
                            <TextInput id="date" type="date"   {...register("date")} required />
                        </div>

                        <div className="w-full flex justify-end">
                            <Button type="submit"
                                className="bg-debexPrimary hover:bg-red-500"
                                disabled={loader} >
                                <Spinner hidden={!loader} aria-label="Default status example" />
                                {!loader ? 'Update' : ''}
                            </Button>
                        </div>
                    </div>
                </form>

            </Modal.Body>
        </Modal>
    );

}