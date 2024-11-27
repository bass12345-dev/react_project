import { Button } from "flowbite-react"
import { useState } from "react";
import { AddExpModal } from "./modals/AddExpModal";
import { td_classes } from "../../../utils/_Classes";

export const ExpensesTable = ({ expenses, getExpenses }: { expenses: any, getExpenses: any }) => {

    let table_headers   =  [{ name: "Expenses"},{ name: "Payee"}, {name: "Amount"},{name: "Paid Date"},{ name: "Action"}]
    const [openModal, setOpenModal] = useState(false);

    const ToggleModal = () => {
        setOpenModal(!openModal);
    }

    function remove(row:any){

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
            <AddExpModal openModal={openModal} getExpenses={getExpenses} ToggleModal={ToggleModal} />
        </>


    )
}



