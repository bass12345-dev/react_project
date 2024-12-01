import { Button, Label, Modal, Spinner, Textarea, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DebexInputs, DebtInputs, PaytoItem } from "../../utils/Types";
import { useEffect, useRef, useState } from "react";
import { DebexDBCreate, getDateSelectedType, getpayToItems } from "../../service/Service";
import { crud_type, debex, debex_type, supabase } from "../../utils/supabase";
import Swal from "sweetalert2";
import Select from 'react-select';

export const DebexModal = ({ openModal, ToggleModal, debexData,debexItem }: { openModal: any, ToggleModal: any, debexData: any, debexItem:any }) => {

    const [payees, setPayees] = useState([]);
    const [loader, setLoader] = useState(false);
    const payee = useRef(null);
    const { Create } = DebexDBCreate();
    
    //<!------------------ Fetch Data Payees ---------------------!>

    const getPayees = async() => {
        let items_arr:any = [];
        let payees = getpayToItems();
        if((await payees).length > 0){
        // Fetching data from the database and setting it to state
            (await payees).forEach((item: any) => {
                items_arr.push({ value: item.payto_id, label: item.first_name });
            });
            setPayees(items_arr);
          }else{
            setPayees([]); // Clear state if no data
          }
        }
      
      useEffect(() => {
        getPayees();
      }, []);
    
    //<!--------------- End----------------!>
    
    
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
        const date = await getDateSelectedType(debexItem.debex_type,data.date);
        let items = {
            total_amount    : parseFloat(data.total_amount),
            payto_id        : payee.current,
            reason          : data.reason,
            type            : debexItem.debex_type,
            due_date        : date, 
            paid_date       : date, 
            date_acquired   : date, 
        }

        let result = await Create(items);

        if(!result.error){
            Swal.fire({icon: "success",title: "Success...",text: "Data Added Successfully"});
            setLoader(false);
            reset();
            debexData();
        }else{
            Swal.fire({icon: "error", title: "Failed...", text: "Failed to Add Data"});
        }
       
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

