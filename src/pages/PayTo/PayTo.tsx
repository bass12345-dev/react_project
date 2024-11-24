import { useState } from 'react'
import { supabase } from '../../utils/supabase'
import { useEffect } from 'react'
import { Cards } from '../../components/Cards';
import { PaytoTable } from './PayToComponents/PaytoTable';
import { AddForm } from './PayToComponents/AddForm';



function Payto() {
  
  return (
    <>
      {/* Display Amount Cards */}
      <div className="flex flex-col md:flex-row mt-10 gap-x-4 gap-y-4 ">
       <PaytoTable/>
       <AddForm/>
      </div>
   
    </>
  )
}

export default Payto
