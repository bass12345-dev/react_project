import { useState } from 'react'
import './App.css'
import { supabase } from './utils/supabase'
import { useEffect } from'react'
function App() {
  const [total_amount, setTotalAmount]  = useState('');
  const [payto, setPayTo]               = useState('');
  const [reason, setReason]             = useState('');
  const [message, setMessage] = useState('');

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
    const { data: debtData,error} = await supabase.from('deb_exp').select()

    if (error) {
      console.error("Error fetching debt data:", error.message);
    } else {
      console.log(debtData)
      setDebt(debtData); // Ensure that debtData is an array or default to an empty array
    }
    
    
  }
  useEffect(() => {
    getDebt()
  }, [])
  

  const handleSubmit = async (e : any) => {
    e.preventDefault();

    const debtData = {
      total_amount : total_amount,
      pay_to : payto,
      reason : reason,
      type : 'debt',
      date : '2024-11-03',
      time : '21:16:43',
    };
    
    
    const {  error } = await supabase
      .from('deb_exp')
      .insert([debtData]);

    if (error) {
      setMessage(`Error: ${error.message}`);
     
    } else {
      getDebt();
      setTotalAmount('');
      setPayTo('');
      setTotalAmount('');
      setReason('');
      setMessage('Data added successfully!');
      
    }
  };


  return (
    <>
     <div className="App">
      <h1>Add Debt</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="text"
            value={total_amount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Pay to:
          <input
            type="text"
            value={payto}
            onChange={(e) => setPayTo(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Reason:
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </label>

        <br />
        
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}

      <div>
      {debt.map((todo) => (
        <li key={todo.deb_exp_id}>{todo.total_amount} to {todo.pay_to} for {todo.reason}</li>
      ))}
    </div>
    </div>
    </>
  )
}

export default App
