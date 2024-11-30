import { useState } from 'react'
import { debex_type, paytoDB, supabase } from '../../utils/supabase'
import { useEffect } from 'react'
import { Cards } from '../../components/Cards';
import { Logs } from './debt_components/Logs';
import { DebtTable } from './debt_components/DebtTable';
import { DebtItem, PaytoItem } from '../../utils/Types';
import { getDebexItems, getpayToItems } from '../../service/Service';


function Debt() {

  //<!--------------- Get Debt ----------------!>
  const [debt, setDebt] = useState<DebtItem[]>([]);
  const getDebt = async () => {
    let params = { debex_type: debex_type[0], order_by: 'date_acquired' };
    if ((await getDebexItems(params)).length > 0) {
      setDebt(await getDebexItems(params));
    } else {
      setDebt([]);
    }
  }

  useEffect(() => {
    getDebt()
  }, []);
  //<!--------------- End----------------!>

  let card_items = [
    {
      title: 'Debt Amount',
      amount: 'P 123.45',
      color: 'bg-red-800',
      icon: 'fas fa-money-check-alt'
    }
  ]




  return (
    <>
      {/* Display Amount Cards */}
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
        <DebtTable debt={debt} getDebt={getDebt} />
        <Logs />
      </div>

    </>
  )
}

export default Debt
