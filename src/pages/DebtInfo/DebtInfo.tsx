import { Button } from "flowbite-react";
import { Component, ReactNode, useEffect, useState } from "react";
import { DebtItem } from "../../utils/Types";
import { getDebexItem } from "../../service/Service";
import { useParams } from "react-router"

const DebtInfo =  () =>  {

    
        let params = useParams()
        let table_headers = [{ name: "Amount" }, { name: "Paid Date" }, { name: "Action" }];
        
        const [info, setInfo] = useState([]);


        const getInfo = async () => {
            const param = { debex_id: params.id };
            let items_arr:any = [];
            try {
              const debexItem = await getDebexItem(param); // Call API once
              if (debexItem.length > 0) {
                let items = await getDebexItem(param);
                items.forEach((item: any) => {
                    items_arr.push({payee:`${item.pay_to.first_name} ${item.pay_to.last_name}`});
                });
        
                setInfo(items_arr);
               
              } else {
                setInfo([]); // Clear state if no data
              }
            } catch (error) {
              console.error("Error fetching debt:", error);
              setInfo([]); // Handle potential errors gracefully
            }
          };
        
          useEffect(() => {
            getInfo()
          }, []);

 
          console.log(info)
        
        return (
            <>
                <div className="flex flex-col md:flex-row mt-10 gap-x-4 gap-y-4 ">
                    <div className="card bg-debexLightBlue border rounded-lg h-auto md:w-1/3  sm:w-full px-6 py-6">
                        <div className="card-buttons flex justify-start mb-5">
                            <p className="text-2xl font-varela font-bold">Debt Information</p>
                        </div>


                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        
                                <tbody>
                                    <tr>
                                        <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                           Payee
                                        </th>
                                        <td className="px-2 py-2">
                                          
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                       
                                        </th>
                                        <td className="px-2 py-2">
                                           Al Dugso
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                           Amount
                                        </th>
                                        <td className="px-2 py-2">
                                           Al Dugso
                                        </td>
                                        
                                    </tr>
                                    
                                    
                                 
                                  
                                </tbody>
                            </table>
                        </div>

                        {/* <div className="card-buttons flex w-3/4 bg-green-200  justify-between mb-2 ">
                            <p className="text-1xl font-varela">Name </p>
                            <p className="text-1xl font-varela">:</p>
                            <p className="text-1xl w-1/2 font-varela t">Al Dugsp</p>
                        </div>
                        <div className="card-buttons flex w-3/4 bg-green-200  justify-between mb-2 ">
                            <p className="text-1xl font-varela">Reason</p>
                            <p className="text-1xl font-varela">:</p>
                            <p className="text-1xl font-varela w-1/2 ">Laptop</p>
                        </div>
                        <div className="card-buttons flex w-3/4  justify-between mb-2 ">
                            <p className="text-1xl font-varela">Amount</p>
                             <p className="text-1xl font-varela">:</p>
                            <p className="text-1xl font-varela w-1/2 ">123</p>
                        </div> */}
                    </div>
                    <div className="card bg-debexLightBlue border rounded-lg h-auto md:w-2/3  w-full px-6 py-6">
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
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    
}

export default DebtInfo;