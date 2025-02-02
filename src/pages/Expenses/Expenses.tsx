import { useEffect, useState } from "react";
import { Cards } from "../../components/Cards"
import { ExpensesTable } from "./expenses_components/ExpensesTable"
import { DebtItem } from "../../utils/Types";
import { getCurrDate, getDebexItemsByMonth, getPayees, getpayToItems } from "../../service/Service";
import { debex_type } from "../../utils/supabase";
import { Button, TextInput } from "flowbite-react";
import { DebexModal } from "../../components/Modals/DebexModal";
import { UpdateExpModal } from "./expenses_components/modals/UpdateExpModal";



function Expenses() {


   //<!--------------- Get Expenses----------------!>
  const [expenses, setExpenses]               = useState<DebtItem[]>([]);
  const [openModal, setOpenModal]             = useState(false);
  const [openEditModal, setOpenEditModal]             = useState(false);
  const [totalExpenses, setTotalExpenses]     = useState<any>('');
  const [thisMonthExpenses,setMonthExpenses]  = useState<any>('');
  let   {day,Month,Year}                      = getCurrDate();
  const [currMonth, setcurrMonth]             = useState<any>(Month);
  const [currYear, setcurrYear]               = useState<any>(Year);

  const [ExpensesItem, setExpensesItem] = useState([]);
  const [payeesArr, setPayeesArr] = useState<Array<{ value: string; label: string }>>([]);

    
        //<!------------------ Fetch Data Payees ---------------------!>
        const fetchPayees = async () => {
        try {
                const payees = await getPayees();
                setPayeesArr(payees);
            } catch (error) {
                console.error('Error fetching payees:', error);
            }
        };
        

      
      //<!--------------- End----------------!>
      
  



  //<!--------------- End----------------!>

   //<!---------------Toggle Modal----------------!>
  const ToggleModal = () => {
    setOpenModal(!openModal);
  }
  const ToggleEditModal = (row:any) => {
    setOpenEditModal(!openEditModal);
    setExpensesItem(row)
  }
   //<!--------------- End----------------!>

  const updateExpenses = (e:any) => {
    const date_arr = e.target.value.split('-');
    setcurrMonth(parseInt(date_arr[1]));
    setcurrYear(parseInt(date_arr[0]));
    getExpenses(date_arr[1],date_arr[0]);
  }

  
  //<!--------------- Get Expenses ----------------!>
   const getExpenses = async (currMonth:any,currYear:any) => {
    
    let params = { 
      debex_type: debex_type[1], 
      order_by: 'paid_date',
      month: parseInt(currMonth),
      year : currYear 
    };

    console.log(params)
    let debexItems = getDebexItemsByMonth(params);
    if ((await debexItems).length > 0) {
      let data = await debexItems;   
      setExpenses(data);
      
      // setExpenses(data.filter(item => new Date(item.paid_date).getMonth() === new Date(CurrMonthYear).getMonth() && new Date(item.paid_date).getFullYear() == new Date(CurrMonthYear).getFullYear()));
      setTotalExpenses(data.reduce((acc, curr) => acc + curr.total_amount, 0)); // Calculate total expenses
      setMonthExpenses(data.filter(item => new Date(item.paid_date).getMonth() === currMonth - 1 && new Date(item.paid_date).getFullYear() == currYear).reduce((acc, curr) => acc + curr.total_amount, 0)); // Calculate expenses for this month
      
    } else {
      setExpenses([]);
    }
   }
 
   useEffect(() => {
     getExpenses(Month,Year);
     fetchPayees();
     
    
   }, []);
  
   //<!--------------- End----------------!>


  let card_items = [
    {
      title: 'This Month',
      amount: thisMonthExpenses.toLocaleString(undefined, {minimumFractionDigits: 2}),
      color: 'bg-yellow-800',
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
            <div className="card-buttons flex justify-between">
              <TextInput id="select_month" type="month" placeholder="Juan" defaultValue={`${currYear}-${currMonth}`} onChange={(e) =>updateExpenses(e)}   shadow />
              <Button className="bg-debexPrimary font-varela hover:bg-red-500  text-white hover:bg-red-500 rounded-full" onClick={ToggleModal} >Add New</Button>
            </div>
            <ExpensesTable 
                          expenses={expenses} 
                          getExpenses={getExpenses} 
                          ToggleEditModal={ToggleEditModal} />

          </div>
        {/* End */}
      </div>
      {
        payeesArr.length > 0 &&

        <UpdateExpModal 
        openEditModal={openEditModal} 
        ToggleEditModal={ToggleEditModal} 
        ExpensesItem={ExpensesItem}
        payeesArr={payeesArr} 
        debexData={getExpenses} 
        setOpenEditModal = {setOpenEditModal}
         />
      }

      {
        payeesArr.length > 0 &&

        <DebexModal 
                  openModal={openModal} 
                  payeesArr={payeesArr} 
                  ToggleModal={ToggleModal} 
                  debexData={getExpenses} 
                  debexItem={debexItems}/>
      }
    

     
    </>
  )
}

export default Expenses
