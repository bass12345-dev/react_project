import { Button } from "flowbite-react";
import { Component, ReactNode, useEffect, useState } from "react";
import { DebtItem } from "../../utils/Types";
import { getDebexItem } from "../../service/Service";
import { useParams } from "react-router"
import Information from "./debt_info_components/Information";

const DebtInfo = () => {
    let table_headers = [{ name: "Amount" }, { name: "Paid Date" }, { name: "Action" }];
   


    return (
        <>
            <div className="flex flex-col md:flex-row mt-10 gap-x-4 gap-y-4 ">
               <Information/>
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