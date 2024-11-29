import { Button, Label, Modal, Spinner, Textarea, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DebexInputs, DebtInputs, PaytoItem } from "../../utils/Types";
import { useEffect, useState } from "react";
import { getCurrentDate, getDebexItems, getpayToItems } from "../../service/Service";
import { debex, supabase } from "../../utils/supabase";
import Swal from "sweetalert2";
import Select from 'react-select';
import moment from 'moment';

export const PurchasedModal = ({ openModal, ToggleModal, debexItems, purc_item }: { openModal: any, ToggleModal: any, debexItems: any, purc_item: any }) => {


    const [loader, setLoader] = useState(false);
    const [purchased_items, setPurchasedItems] = useState([]) //Modals
    const [amount, setAmount] = useState<number>(0);

    //<!------------------ Insert Data ---------------------!>
    const {
        handleSubmit,
        register,
        reset,
    } = useForm<DebexInputs>()
    const onSubmit: SubmitHandler<DebexInputs> = (data) => InsertData(data);






    async function InsertData(data: any) {

        let items = {
            total_amount: data.total_amount,
            paid_date : data.date,
            type:'expenses'
        }

        setLoader(true);
        const { error } = await supabase
            .from(debex)
            .update(items)
            .eq('deb_exp_id', purc_item.deb_exp_id)
        if (!error) {
            Swal.fire(
                {
                    icon: "success",
                    title: "Success...",
                    text: "Added To Expenses Successfully",
                }
            )
            setLoader(false);
            reset();
            debexItems();
            setAmount(0);
        } else {
            setLoader(false);
        }
    }
    


    function calculateSave(e: any) {
        const val = purc_item.total_amount - e.target.value;
        setAmount(val);

    }

    

    return (
        <Modal show={openModal} size="md" popup onClose={ToggleModal}  >
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-1">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">{purc_item.reason}</h3>
                        {
                            purc_item.due_date == null ? <h4 className="text-sm font-medium text-green-700 dark:text-white">No Due Date</h4> : <h4 className="text-sm font-medium text-red-500 dark:text-white">Due Date :  {purc_item.due_date}</h4>
                        }
                        <h1 className="text-xl font-medium text-center  text-gray-900 dark:text-white">{purc_item.total_amount}</h1>
                        {
                            amount > 0 ? <h1 className="text-xl font-medium text-center  text-green-500 dark:text-white">You saved {amount}</h1> : ''
                        }

                    </div>
                    <div className="space-y-6 mt-3">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="amount" value="Amount" />
                            </div>

                            <TextInput id="amount" type="number" {...register("total_amount")}
                                onChange={(evt) => { calculateSave(evt) }}
                                required />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="date" value="Paid Date" />
                            </div>
                            <TextInput id="date" type="date"   {...register("date")} required />
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

