import { useEffect, useState } from "react";
import { Cards } from "../../components/Cards"
import { ExpensesTable } from "./expenses_components/ExpensesTable"
import { DebtItem } from "../../utils/Types";
import { getDebexItems } from "../../service/Service";
import { debex_type } from "../../utils/supabase";
import { Button } from "flowbite-react";
import { DebexModal } from "../../components/Modals/DebexModal";

function Expenses() {


   //<!--------------- Get Expenses----------------!>
  const [expenses, setExpenses] = useState<DebtItem[]>([]);
  const [openModal, setOpenModal] = useState(false);
  //<!--------------- End----------------!>

   //<!---------------Toggle Modal----------------!>
  const ToggleModal = () => {
    setOpenModal(!openModal);
  }
   //<!--------------- End----------------!>


  //<!--------------- Get Expenses ----------------!>
   const getExpenses = async () => {
    let params = { debex_type: debex_type[1], order_by: 'paid_date' };
    let debexItems = getDebexItems(params);
    if ((await debexItems).length > 0) {
      setExpenses(await debexItems);
    } else {
      setExpenses([]);
    }
   }
 
   useEffect(() => {
     getExpenses()
   }, []);
  
   //<!--------------- End----------------!>


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


     //<!---------------Object to Pass to Child Components, Ex. Modals----------------!>
  let debexItems = { 
      title: 'Expenses', 
      date_label: 'Paid Date', 
      debex_type: debex_type[1] 
    }
//<!--------------- End----------------!>

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
        <a href="#" className="font-varela font-bold text-blue-400 my-2 texts-center">
          View Analytics
        </a>
      </div>

      <div className="flex flex-col md:flex-row mt-10 gap-x-4 gap-y-4 ">
         {/* Expenses Table */}
         <div className="card bg-debexLightBlue border rounded-lg h-auto md:w-2/3  w-full px-6 py-6">
            <div className="card-buttons flex justify-end">
              <Button className="bg-debexPrimary font-varela hover:bg-red-500  text-white hover:bg-red-500 rounded-full" onClick={ToggleModal} >Add New</Button>
            </div>
            <ExpensesTable expenses={expenses} getExpenses={getExpenses}/>
          </div>
        {/* End */}

      </div>
      <DebexModal openModal={openModal} ToggleModal={ToggleModal} debexData={getExpenses} debexItem={debexItems} />
    </>
  )
}

export default Expenses
