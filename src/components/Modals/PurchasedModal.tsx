import { Button, Label, Modal, Spinner, Textarea, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DebexInputs, DebtInputs, PaytoItem } from "../../utils/Types";
import { useState } from "react";
import { DebexDBUpdate } from "../../service/Service";
import { debex, debex_type} from "../../utils/supabase";
import Swal from "sweetalert2";


export const PurchasedModal = ({ 
        openModal, 
        ToggleModal,
        setOpenPurchasedModal, 
        debexItems, 
        purc_item 
        }: { 
        openModal: any, 
        ToggleModal: any, 
        setOpenPurchasedModal :any, 
        debexItems: any, 
        purc_item: any 
    }) => {


    const [loader, setLoader] = useState(false);
    const { Update } = DebexDBUpdate(debex);
    
   
    //<!------------------ Insert Data ---------------------!>
    const {
        handleSubmit,
        register,
        reset,
        setValue
    } = useForm<DebexInputs>()
    const onSubmit: SubmitHandler<DebexInputs> = (data) => UpdateData(data);

    setValue('total_amount',purc_item.total_amount);
    setValue('date',purc_item.due_date);
    

    async function UpdateData(data: any) {

        let items = {
            total_amount    : data.total_amount,
            paid_date       : data.date,
            type            : debex_type[1]
        }

        setLoader(true);
        let result = await Update(items,purc_item.deb_exp_id);

        if(!result.error){
            Swal.fire({icon: "success",title: "Success...",text: "Data Added Successfully"});
            setLoader(false);
            reset();
            debexItems();
            ToggleModal = false;
        }else{
            Swal.fire({icon: "error", title: "Failed...", text: "Failed to Add Data"});
            setLoader(false);
        }

        setOpenPurchasedModal(false);
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
                        <h1 className="text-xl font-medium text-center  text-gray-900 dark:text-white">Anticipated Amount : {purc_item.total_amount}</h1>
                     
                    </div>
                    <div className="space-y-6 mt-3">
                        <div>
                            <div className="mb-2 flex justify-between">
                                <Label htmlFor="amount" value="Actual Amount" /><span className="mx-3 text-sm text-right text-red-500">*Update if needed</span>
                            </div>

                            <TextInput id="amount"  type="number" {...register("total_amount")}
                                required />
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
                                    {!loader ? 'Submit' : ''}
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

