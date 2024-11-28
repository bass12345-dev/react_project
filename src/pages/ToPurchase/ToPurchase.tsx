import { Button } from "flowbite-react"
import { useEffect, useState } from "react";
import { DebtItem } from "../../utils/Types";
import { getDebexItems} from "../../service/Service";
import { debex, debex_type, supabase } from "../../utils/supabase";
import { td_classes } from "../../utils/_Classes";
import { DebexModal } from "../../components/Modals/DebexModal";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";


export const ToPurchase = () => {

    let table_headers   =  [{ name: ""},{ name: "Product/Services"}, {name: "Payee"},{name: "Amount"},{name: "Paid Date"},{ name: "Action"}]
    const [openModal, setOpenModal] = useState(false);
    const [expenses, setExpenses] = useState<DebtItem[]>([]);

    const debexItems = async () => {
      if ((await getDebexItems(debex_type[2])).length > 0) {
        setExpenses(await getDebexItems(debex_type[2]));
       
      } else {
        setExpenses([]);
      }
    }
  
    useEffect(() => {
        debexItems()
     
    }, []);

    const ToggleModal = () => {
        setOpenModal(!openModal);
    }


    function remove(row:any){
        withReactContent(Swal).fire({
            title: "Do you want to Remove?",
            text: row.reason+' Pay to '+row.pay_to.first_name,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                remove_debex_data(row.deb_exp_id)
            }
        })

    }


    async function remove_debex_data(id:string){

        const {error,data} = await supabase
        .from(debex)
        .delete()
        .eq('deb_exp_id', id )
        if(error){
      
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Contact Developer if Issue persist!",
            })
        }else{
         
            Swal.fire(
                "Removed!",
                "Data has been removed.",
                "success"
            )
            debexItems()
           
        }
      }

      
    return (
        <>
            <div className="card bg-debexLightBlue border rounded-lg h-auto   w-full px-6 py-6">
                <div className="card-buttons flex justify-end">
                    <Button className="bg-debexPrimary font-varela hover:bg-red-500  text-white hover:bg-red-500 rounded-full" onClick={ToggleModal}>Add New</Button>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {
                                    table_headers.map((row, index) => (
                                        <th scope="col" key={index} className="px-6 py-3">{row.name}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                            expenses.length > 0 &&
                                expenses.map((row: any) => (
                                    <tr key={row.deb_exp_id}>
                                        <td scope="row" className="px-6 py-4 ">
                                        <button className="  inline-flex items-center text-white font-varela  bg-green-500 hover:bg-red-500 px-4 py-1  rounded-full">Purchase</button>
                                        </td>
                                        <td scope="row"  className={td_classes}>
                                           {row.reason}
                                        </td>
                                        <td scope="row"  className={td_classes}>
                                            {row.pay_to.first_name} {row.pay_to.last_name}
                                        </td>
                                        <td scope="row" className={td_classes}>
                                            {row.total_amount.toLocaleString()}
                                        </td>
                                        <td className={td_classes}>0</td>
                                        <td className="px-6 py-4">
                                            <a href="#"
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2">Edit</a>
                                            <a href="#"
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={()=>remove(row)}>Remove</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <DebexModal openModal={openModal} debexItems={debexItems} title={'To Purchase'} debex_type={debex_type[2]} ToggleModal={ToggleModal}/>
        </>
    )

}