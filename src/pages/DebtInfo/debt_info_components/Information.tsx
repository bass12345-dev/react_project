import { useEffect, useState } from "react";
import { getDebexItem } from "../../../service/Service";
import { useParams } from "react-router"
import { PayeeInfo } from "../../../utils/Types";

const Information = () => {



    let params = useParams()

    const [debtInfo, setDebtInfo] = useState<PayeeInfo[]>([]);
    const [is_loading, setLoading] = useState(true);


    const getInfo = async () => {
        const param = { debex_id: params.id };
        let items_arr: any = [];
        try {
            const debexItem = await getDebexItem(param); // Call API once
            if (debexItem.length > 0) {
                let items = await getDebexItem(param);
                items.forEach((item: any) => {
                    items_arr.push({
                        payee: `${item.pay_to.first_name} ${item.pay_to.last_name}`,
                        totalAmount: item.total_amount,
                        reason : item.reason

                    });
                });
                setDebtInfo(items_arr);

            } else {
                setDebtInfo([]); // Clear state if no data
            }
        } catch (error) {
            console.error("Error fetching debt:", error);
            setDebtInfo([]); // Handle potential errors gracefully
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getInfo();
    }, []);

    console.log(debtInfo)


    return (
        <div className="card bg-debexLightBlue border rounded-lg h-auto md:w-1/3  sm:w-full px-6 py-6">
            <div className="card-buttons flex justify-start mb-5">
                <p className="text-2xl font-varela font-bold">Debt Information</p>
            </div>


            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    {!is_loading &&
                        <tbody>
                            <tr>
                                <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Payee
                                </th>
                                <td className="px-2 py-2">
                                    {debtInfo[0].payee}
                                </td>

                            </tr>
                            <tr>
                                <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Reason
                                </th>
                                <td className="px-2 py-2">
                                    {debtInfo[0].reason}
                                </td>

                            </tr>
                            <tr>
                                <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Amount
                                </th>
                                <td className="px-2 py-2">
                                    {debtInfo[0].totalAmount.toLocaleString()}
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
        </div>
    );

}

export default Information;