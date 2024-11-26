 // <!--------------Pay To Types------------!>
 export type PaytoItem = {
    payto_id: string,
    first_name:string,
    last_name:string,
    phone_number:string,
    created_at:string,
  };

export type PayToInputs = {
    first_name: string,
    last_name: string,
    phone_number: string,
    address: string,
  }

//<!--------------End--------------!>


// <!-------------Debt Item-------------!>
export type DebtItem = {
      deb_exp_id: string;
      total_amount: number;
      pay_to: string;
      reason: string;
      type: string;
      date: string;
      time: string; // Add other fields based on your table
      // Add other fields based on your table
    };
//<!--------------End--------------!>
  