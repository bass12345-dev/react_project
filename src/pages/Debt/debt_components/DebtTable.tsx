
import { debex, supabase } from '../../../utils/supabase';
import withReactContent from 'sweetalert2-react-content';
import { td_classes } from '../../../utils/_Classes';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { DebexDBDelete, DebexDBDeleteAlert } from '../../../service/Service';
export const DebtTable = ({ debt, getDebt }: { debt: any, getDebt: any }) => {

    let table_headers = [{ name: "DEBT" }, { name: "Payee" }, { name: "Date Acquired" }, { name: "Total Amount" }, { name: "Balance" }, { name: "Action" }]
    const { Delete } = DebexDBDelete();

    // <!----------------Remove---------------!>
    const remove = (row: any) => {
        withReactContent(Swal).fire({
            title: "Do you want to Remove?",
            text: row.reason,
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

        let result = await Delete(id);
        DebexDBDeleteAlert(result,getDebt);
    }



    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative">
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
                            debt.length > 0 &&
                            debt.map((row: any) => (
                                <tr key={row.deb_exp_id}>
                                    <td scope="row" className="px-6 py-4 ">
                                        <Link to={`/debt/${row.deb_exp_id}`} className="font-mediumb text-blue-700 underline">{row.reason}</Link>
                                        {/* <a href="./debt/index.html" ></a> */}
                                    </td>
                                    <td scope="row" className={td_classes}>
                                        {row.pay_to.first_name} {row.pay_to.last_name}
                                    </td>
                                    <td scope="row" className={td_classes}>
                                        {row.date_acquired}
                                    </td>
                                    <td scope="row" className={td_classes}>
                                        {row.total_amount.toLocaleString()}
                                    </td>
                                    <td className={td_classes}>0</td>
                                    <td className="px-6 py-4">
                                        <a href="#"
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2">Edit</a>
                                        <a href="#"
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => remove(row)}>Remove</a>
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



