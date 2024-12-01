import { td_classes } from "../../../utils/_Classes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DebexDBDelete, DebexDBDeleteAlert, DebexSwalLoader, getCurrentDate } from "../../../service/Service";

export const ToPurchaseTable = ({ 
    toPurchase, 
    getToPurchase,
    TogglePurchasedModal}
    : { 
        toPurchase: any, 
        getToPurchase: any,
        TogglePurchasedModal:any 
    }) => {

        //Table headers
    let table_headers = [
        { name: "" }, 
        { name: "Product/Services/Bills" }, 
        { name: "Payee" }, 
        { name: "Amount" },
        { name: "Due Date" }, 
        { name: "Action" }
    ];

    
    const { Delete } = DebexDBDelete();

    async function remove(row: any) {

        withReactContent(Swal).fire({
            title: "Do you want to Remove?",
            text: row.reason + ' Pay to ' + row.pay_to.first_name,
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
        DebexDBDeleteAlert(result, getToPurchase);
    }


    const _class_due = (date: any) => {
        return date <= getCurrentDate() ? 'bg-red-800 text-white' : ''
    }
    //   <!---------------------- END ----------------------!>


    return (
        <>

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
                        toPurchase.length > 0 &&
                        toPurchase.map((row: any) => (
                            <tr key={row.deb_exp_id} >
                                <td scope="row" className="px-6 py-4 ">
                                    <button className="inline-flex items-center text-white font-varela  bg-green-500 hover:bg-red-500 px-4 py-1  rounded-full" onClick={() => TogglePurchasedModal(row)  }>Purchased</button>
                                </td>
                                <td scope="row" className={`${td_classes}${_class_due(row.due_date)}`}>
                                    {row.reason}
                                </td>
                                <td scope="row" className={`${td_classes}${_class_due(row.due_date)}`}>
                                    {row.pay_to.first_name} {row.pay_to.last_name}
                                </td>
                                <td scope="row" className={`${td_classes}${_class_due(row.due_date)}`}>
                                    {row.total_amount.toLocaleString()}
                                </td>
                                <td className={`${td_classes}${_class_due(row.due_date)}`}>{row.due_date == null ? <span className="text-green-600">No due date</span> : row.due_date}</td>
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

        </>


    )
}



