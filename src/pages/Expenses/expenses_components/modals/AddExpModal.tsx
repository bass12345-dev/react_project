import { Button, Checkbox, Label, Modal, Spinner, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { getpayToItems } from "../../../../service/Service";
import { DebtInputs, PaytoItem } from "../../../../utils/Types";
import { debex, debex_type, paytoDB, supabase} from "../../../../utils/supabase";
import { SubmitHandler, useForm } from "react-hook-form";
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";
export const AddExpModal = ({ openModal, ToggleModal, getExpenses }: { openModal: any, ToggleModal: any, getExpenses:any }) => {


    const [pay_to_who, setPayToPerson] = useState<String>('')
    const [loader, setLoader] = useState(false);


    //<!------------------ Fetch Data ---------------------!>
    const [pay_to, setPayTo] = useState<PaytoItem[]>([]);
  
    const getpayTo = async() => {
        let items_arr:any = [];
        if((await getpayToItems()).length > 0){
        // Fetching data from the database and setting it to state
            let items = await getpayToItems();
            items.forEach((item: PaytoItem) => {
                items_arr.push({ value: item.payto_id, label: item.first_name });
            });

            setPayTo(items_arr);
        
        }else{
            setPayTo([]);
        }
        }
    
    useEffect(() => {
        getpayTo();
        
    }, []);

    const handleChange = (e:any) =>{
        setPayToPerson(e.value)
    }
    //<!------------------ END ---------------------!>

    //<!------------------ Insert Data ---------------------!>
    const {
        handleSubmit,
        register,
        reset,
    } = useForm<DebtInputs>()
    const onSubmit: SubmitHandler<DebtInputs> = (data) => InsertData(data)

    async function InsertData(data:any){
        
        if(pay_to_who == ''){
            alert('Please select Payee')
            return;
        }

        let items = {
            total_amount    : data.total_amount,
            payto_id        : pay_to_who,
            reason          : data.reason,
            type            : debex_type[1],
            date            : data.date,
        }

       setLoader(true);
        const { error } = await supabase
        .from(debex)
        .insert([items]);
        if(!error){
            Swal.fire(
                {
                    icon: "success",
                    title: "Success...",
                    text: "Data Added Successfully",
                }
            )
            setLoader(false);
            reset();
            getExpenses();
        }else{
            setLoader(false);
        }
    }


    return (
        <>
            <Modal show={openModal} size="md" popup onClose={ToggleModal}  >
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Expenses</h3>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="reason" value="Reason" />
                                </div>
                                <Textarea id="reason" required {...register("reason")}  />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="pay_to" value="Pay to"  />
                                </div>
                                <Select id="pay_to" options={pay_to} onChange={handleChange}    />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="amount" value="Amount" />
                                </div>
                                <TextInput id="amount" type="number" {...register("total_amount")} required />
                            </div>


                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="date" value="date" />
                                </div>
                                <TextInput id="date" type="date" {...register("date")} required />
                            </div>


                            <div className="w-full flex justify-end">
                            <Button type="submit" className="bg-debexPrimary hover:bg-red-500" disabled={loader} ><Spinner hidden={!loader} aria-label="Default status example" />{!loader ? 'Add' : ''}</Button>
                            </div>

                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </>
    )
}
