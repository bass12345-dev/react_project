
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form"
import { paytoDB, supabase } from './../../../utils/supabase'
import { useState } from 'react'
import { Loader } from "../../../components/Alerts";
import { Spinner } from "flowbite-react";
import SweetAlert2 from 'react-sweetalert2';
export const AddForm = () => {
    const [loader, setLoader] = useState(false);
    const [swalProps, setSwalProps] = useState({});
    type Inputs = {
        first_name: string,
        last_name: string,
        phone_number: string,
      }


      const {
        handleSubmit,
        register,
        reset,
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = (data) => InsertData(data)

    
    async function InsertData(data:any){
        setLoader(true);
        const { error } = await supabase
        .from(paytoDB)
        .insert([data]);
        if(!error){
            setSwalProps({
                show: true,
                title: 'Success',
                text: 'Added Successfully',
            });
            setLoader(false);
            reset();
        }else{
            setLoader(false);
        }
    }

    return (
        <div className="card bg-debexLightBlue border rounded-lg h-auto md:w-1/3  sm:w-full px-6 py-6">
            <div className="card-buttons flex justify-start mb-2">
                <p className="text-1xl font-varela font-bold">Add Information</p>
            </div>
            <SweetAlert2 {...swalProps} />
            <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="first_name" value="First Name" />
                    </div>
                    <TextInput id="first_name" type="text" placeholder="Juan " {...register("first_name")} required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="last_name" value="Last Name" />
                    </div>
                    <TextInput id="last_name" type="text" placeholder="Tamad" {...register("last_name")} shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="last_name" value="Phone Number" />
                    </div>
                    <TextInput id="last_name" type="number" placeholder="09xxxxxxxx" {...register("phone_number")}  shadow />
                </div>
               
                <div>
                    <Button disabled={loader} className="w-full" type="submit"> {!loader ? 'Add' : ''} <Spinner hidden={!loader} aria-label="Default status example" /></Button>
                </div>
               
            </form>
            

        </div>
    )
}