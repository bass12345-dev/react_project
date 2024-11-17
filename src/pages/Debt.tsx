import { useState } from 'react'
import { supabase } from './../utils/supabase'
import { useEffect } from 'react'


function Debt() {


  // Define a type based on your `deb_exp` table's structure
  type DebtItem = {
    deb_exp_id: string;
    total_amount: number;
    pay_to: string;
    reason: string;
    type: string;
    date: string;
    time: string; // Add other fields based on your table
    // Add other fields based on your table
  };

  const [debt, setDebt] = useState<DebtItem[]>([]);

  async function getDebt() {
    const { data: debtData, error } = await supabase.from('deb_exp').select()

    if (error) {
      setDebt([]);
    } else {
      console.log(debtData)
      setDebt(debtData); // Ensure that debtData is an array or default to an empty array
    }


  }
  useEffect(() => {
    getDebt()
  }, [])

  return (
    <>
      {/* Display Amount Cards */}
      <div className="flex justify-between sm:flex-row flex-wrap mt-10">
        <a href="#"
          className="block w-1/2 md:w-64 px-4 py-2 bg-red-800  rounded-lg shadow hover:bg-gray-100 dark:bg-red-800 dark:border-gray-700 dark:hover:bg-red-500">
          <p className="font-normal text-gray-400 dark:text-gray-200">Total Debt Amount</p>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">P 5,000</h5>
        </a>
        <a href="#" className="font-varela font-bold text-blue-400">
          View Analytics
        </a>
      </div>

      <div className="flex flex-col md:flex-row mt-10 gap-x-4 gap-y-4 ">
        <div className="card bg-debexLightBlue border rounded-lg h-auto md:w-2/3  w-full px-6 py-6">
          <div className="card-buttons flex justify-end">
            <button
              className="  inline-flex items-center text-white font-varela  bg-debexPrimary hover:bg-red-500 px-9 py-1  rounded-full" data-modal-target="crud-modal" data-modal-toggle="crud-modal">Add
              New</button>
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
                {debt.map((row) => (
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
        <div className="card bg-debexLightBlue border rounded-lg h-auto md:w-1/3  sm:w-full px-6 py-6">
          <div className="card-buttons flex justify-start mb-2">
            <p className="text-1xl font-varela font-bold">Logs</p>
          </div>
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            <li className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black truncate dark:text-black">
                    Al Dugso - Laptop
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-600">
                    12th Feb, 2023 at 10:00 AM
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-red-900 dark:text-red">
                  $320
                </div>
              </div>
            </li>
            <li className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black truncate dark:text-black">
                    Al Dugso - Laptop
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-600">
                    12th Feb, 2023 at 10:00 AM
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-red-900 dark:text-red">
                  $320
                </div>
              </div>
            </li>
            <li className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black truncate dark:text-black">
                    Al Dugso - Laptop
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-600">
                    12th Feb, 2023 at 10:00 AM
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-red-900 dark:text-red">
                  $320
                </div>
              </div>
            </li>
            <li className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black truncate dark:text-black">
                    Al Dugso - Laptop
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-600">
                    12th Feb, 2023 at 10:00 AM
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-red-900 dark:text-red">
                  $320
                </div>
              </div>
            </li>
            <li className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black truncate dark:text-black">
                    Al Dugso - Laptop
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-600">
                    12th Feb, 2023 at 10:00 AM
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-red-900 dark:text-red">
                  $320
                </div>
              </div>
            </li>

          </ul>
          <a href="" className="text-blue-500 ">See More</a>
        </div>
      </div>


    </>
  )
}

export default Debt
