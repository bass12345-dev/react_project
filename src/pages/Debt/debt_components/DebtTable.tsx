import { useState } from 'react'
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { AddDebtModal } from './modals/AddDebtModal';
export const DebtTable = ({debt}:{debt:any}) => {


    const [openModal, setOpenModal] = useState(false);


    const ToggleModal = () =>  {
        setOpenModal(!openModal);
    }

    return (
        <>
        <div className="card bg-debexLightBlue border rounded-lg h-auto md:w-2/3  w-full px-6 py-6">
            <div className="card-buttons flex justify-end">
                <Button className="bg-debexPrimary font-varela hover:bg-red-500  text-white hover:bg-red-500 rounded-full" onClick={ToggleModal} >Add New</Button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                DEBT
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Pay to
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Total Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Balance
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {debt.map((row:any) => (
                            <tr key={row.deb_exp_id}>
                                <td scope="row" className="px-6 py-4 ">
                                    <a href="./debt/index.html" className="font-mediumb text-blue-400 underline">{row.reason}</a>
                                </td>
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {row.pay_to}
                                </td>
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {row.total_amount}
                                </td>
                                <td></td>
                                <td className="px-6 py-4">
                                    <a href="#"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    <a href="#"
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
           
        </div>

        <AddDebtModal openModal={openModal} ToggleModal={ToggleModal}   />

    </>
        

    )
}



