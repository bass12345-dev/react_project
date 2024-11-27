

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { paytoDB, supabase } from '../../../utils/supabase';
import { td_classes } from '../../../utils/_Classes';

export const PaytoTable = ({ pay_to, getpayTo }: { pay_to: any,getpayTo:any }) => {

    let table_headers   =  [{ name: "Full Name"},{ name: "Phone Number"}, {name: "Address"},{ name: "Action"}]

    // <!----------------Remove---------------!>
    const remove = (row: any) => {
        withReactContent(Swal).fire({
                title: "Do you want to Remove?",
                text: row.first_name+' '+row.last_name,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, remove it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    remove_data(row.payto_id)
                }
            })
    }
    
    async function remove_data(payto_id:any){

        const {error,data} = await supabase
        .from(paytoDB)
        .delete()
        .eq('payto_id', payto_id )

        if(error){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Contact Developer if Issue persist!",
            })
        }else{
            Swal.fire(
                "Removed!",
                "Your data has been removed.",
                "success"
            )
            getpayTo()
        }

    }

    // <!----------------End Remove---------------!>
    return (
        <>
            <div className="card bg-debexLightBlue border rounded-lg h-auto md:w-2/3  w-full px-6 py-6">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {
                                    table_headers.map((row,index) =>(
                                        <th scope="col" key={index} className="px-6 py-3">{row.name}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {pay_to.map((row: any) => (
                                <tr key={row.payto_id}>
                                    <td scope="row" className={td_classes + `font-bold`}>
                                        {row.first_name} {row.last_name}
                                    </td>
                                    <td scope="row" className={td_classes}>
                                        {row.phone_number}
                                    </td>
                                    <td scope="row" className={td_classes}>
                                        {row.address}
                                    </td>
                                 

                                    <td className="px-6 py-4">
                                        <a href="#"
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2">Edit</a>
                                        <a href="#"
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={()=>remove(row)}>Remove</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

        </>


    )
}



