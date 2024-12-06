import { Button } from "flowbite-react"
import { useState } from "react";
import { td_classes } from "../../../utils/_Classes";
import { debex, debex_type, supabase } from "../../../utils/supabase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DebexModal } from "../../../components/Modals/DebexModal";
import { DebexDBDelete, DebexDBDeleteAlert, DebexSwalLoader } from "../../../service/Service";

export const ExpensesTable = ({ 
    expenses, 
    getExpenses }
    :{ 
    expenses: any, 
    getExpenses: any }) => {

    let table_headers   =  [
        { name: "Expenses"},
        { name: "Payee"}, 
        {name: "Amount"},
        {name: "Paid Date"},
        { name: "Action"}]
        
    const { Delete } = DebexDBDelete();

    
    async function remove(row:any){

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
                remove_data(row.deb_exp_id)
            }
        })
        
    }


    async function remove_data(id: string) {
        DebexSwalLoader();
        let result = await Delete(id);
        DebexDBDeleteAlert(result,getExpenses);
    }

    return (
        <>
            
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
                            {
                            expenses.length > 0 &&
                                expenses.map((row: any) => (
                                    <tr key={row.deb_exp_id}>
                                        <td scope="row" className="px-6 py-4 ">
                                            <a href="./debt/index.html" className="font-mediumb text-blue-400 underline">{row.reason}</a>
                                        </td>
                                        <td scope="row"  className={td_classes}>
                                            {row.pay_to.first_name} {row.pay_to.last_name}
                                        </td>
                                        <td scope="row" className={td_classes}>
                                            {row.total_amount.toLocaleString()}
                                        </td>
                                        <td className={td_classes}>{row.paid_date}</td>
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
           
        </>


    )
}



