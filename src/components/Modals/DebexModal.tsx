import { Button, Label, Modal, Spinner, Textarea, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DebexInputs, DebtInputs, PaytoItem } from "../../utils/Types";
import { useEffect, useState } from "react";
import { getpayToItems } from "../../service/Service";
import { debex, debex_type, supabase } from "../../utils/supabase";
import Swal from "sweetalert2";
import Select from 'react-select';

export const DebexModal = ({ openModal, ToggleModal, debexItems,purc_item }: { openModal: any, ToggleModal: any, debexItems: any, purc_item:any }) => {

    const [pay_to, setPayTo] = useState([]);
    const [loader, setLoader] = useState(false);
    const [pay_to_who, setPayToPerson] = useState<String>('')
    
    //<!------------------ Fetch Data ---------------------!>

    const getpayTo = async() => {
        let items_arr:any = [];
        if((await getpayToItems()).length > 0){
        // Fetching data from the database and setting it to state
            let items = await getpayToItems();
            items.forEach((item: any) => {
                items_arr.push({ value: item.payto_id, label: item.first_name });
            });
    
            setPayTo(items_arr);
          }
        }
      
      useEffect(() => {
        getpayTo();
        
      }, []);

      

    function getDate(_date:any){
        let date = null;
        switch (purc_item.debex_type) {
            case debex_type[0] :
                date = _date;
                break;
            case debex_type[1] :
                date = _date;
                break;
            case debex_type[2] :
                date = _date;
                break;
            default:
                date = null
                break;
        }

        return date;
    }

    //<!------------------ Insert Data ---------------------!>
    const {
        handleSubmit,
        register,
        reset,
    } = useForm<DebexInputs>()
    const onSubmit: SubmitHandler<DebexInputs> = (data) => InsertData(data);

    async function InsertData(data: any) {

        if(pay_to_who == ''){
            alert('Please select Payee')
            return;
        }

        const date = getDate(data.date);
        console.log(date)
        let items = {
            total_amount    : data.total_amount,
            payto_id        : pay_to_who,
            reason          : data.reason,
            type            : purc_item.debex_type,
            due_date        : date, 
            paid_date       : date, 
            date_acquired   : date, 
        }

        setLoader(true);
        const { error } = await supabase
            .from(debex)
            .insert([items]);
        if (!error) {
            Swal.fire(
                {
                    icon: "success",
                    title: "Success...",
                    text: "Data Added Successfully",
                }
            )
            setLoader(false);
            reset();
            debexItems();
        } else {
            setLoader(false);
        }
    }


    const handleChange = (e: any) => {
        setPayToPerson(e.value)
    }

    return (
        <Modal show={openModal} size="md" popup onClose={ToggleModal}  >
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">{purc_item.title}</h3>

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
                            <Select id="pay_to" options={pay_to} onChange={handleChange}     />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="amount" value="Amount" />
                            </div>
                            <TextInput id="amount" type="number" {...register("total_amount")} required />
                        </div>


                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="date" value={purc_item.date_label} />
                            </div>
                            <TextInput id="date" type="date"   {...register("date")}  required={purc_item.debex_type != debex_type[2] ? true:false}  />
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

