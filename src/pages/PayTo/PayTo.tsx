import { useState } from 'react'
import { paytoDB, supabase } from '../../utils/supabase'
import { useEffect } from 'react'
import { Cards } from '../../components/Cards';
import { PaytoTable } from './PayToComponents/PaytoTable';
import { AddForm } from './PayToComponents/AddForm';
import { PaytoItem } from '../../utils/Types';
import { getpayToItems } from '../../service/Service';



function Payto() {
  
  const [pay_to, setPayTo] = useState<PaytoItem[]>([]);
    
  //<!------------------ Fetch Data ---------------------!>
  
  const getpayTo = async() => {
    if((await getpayToItems()).length > 0){
        setPayTo(await getpayToItems());
      }else{
        setPayTo([]);
      }
    }
  
  useEffect(() => {
    getpayTo()
  }, []);
  

  return (
    <>
      {/* Display Amount Cards */}
      <div className="flex flex-col md:flex-row mt-10 gap-x-4 gap-y-4 ">
       <PaytoTable getpayTo={getpayTo}  pay_to={pay_to} />
       <AddForm getpayTo={getpayTo}/>
      </div>
   
    </>
  )
}


export default Payto;

