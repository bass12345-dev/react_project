import { useState } from 'react'
import { supabase } from '../../utils/supabase'
import { useEffect } from 'react'
import { Cards } from '../../components/Cards';
import { Logs } from './debt_components/Logs';
import { DebtTable } from './debt_components/DebtTable';
import { AddDebtModal } from './debt_components/modals/AddDebtModal';


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
        <Cards/>
        <a href="#" className="font-varela font-bold text-blue-400">
          View Analytics
        </a>
      </div>

      <div className="flex flex-col md:flex-row mt-10 gap-x-4 gap-y-4 ">
        <DebtTable debt={debt}/>
       <Logs  />
      </div>
   
    </>
  )
}

export default Debt
