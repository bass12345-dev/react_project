import { useEffect, useState } from "react";
import { Cards } from "../../components/Cards"
import { ExpensesTable } from "./expenses_components/ExpensesTable"
import { DebtItem } from "../../utils/Types";
import { getDebexItems } from "../../service/Service";

function Expenses() {


   //<!--------------- Get Expenses----------------!>
   const [expenses, setExpenses] = useState<DebtItem[]>([]);
   const getExpenses = async () => {
     if ((await getDebexItems('expenses')).length > 0) {
       setExpenses(await getDebexItems('expenses'));
      
     } else {
       setExpenses([]);
     }
   }
 
   useEffect(() => {
     getExpenses()
    
   }, []);
   
  let card_items = [
    {
      title: 'Total Expenses',
      amount: 'P 123.45',
      color: 'bg-red-800',
      icon: 'fas fa-money-check-alt'
    },
    {
      title: 'This Month',
      amount: 'P 123.45',
      color: 'bg-yellow-500',
      icon: 'fas fa-money-check-alt'
    }
  ]

  return (
    <>
      <div className="flex justify-between sm:flex-row flex-wrap mt-10">
        <div className="flex  sm:flex-row gap-3 flex-wrap ">
          {
              card_items.map((row:any,index) => (
                <Cards key={index} row_card_item={row} />
              ))
            }
        </div>
        <a href="#" className="font-varela font-bold text-blue-400">
          View Analytics
        </a>
      </div>

      <div className="flex flex-col md:flex-row mt-10 gap-x-4 gap-y-4 ">
        <ExpensesTable expenses={expenses} getExpenses={getExpenses}/>
      </div>
    </>
  )
}

export default Expenses
