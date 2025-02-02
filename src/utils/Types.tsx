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

export type PayeeInfo = {
  payee: string;
  totalAmount: number;
  reason:string
};

//<!--------------End--------------!>


// <!-------------Debt Item-------------!>
export type DebtItem = {
      deb_exp_id: string;
      total_amount: number;
      payto_id : string;
      pay_to: any;
     
      reason: string;
      type: string;
      due_date: string;
      paid_date: string;
      date_acquired:string;

     
    };

export type DebtInputs = {
      reason:string,
      pay_to:string,
      total_amount:number,
      type:string,
      date: string,
      time: string,
  
}
//<!--------------End--------------!>


//<!------------Inputs--------------!>
export type DebexInputs = {
  reason:string,
  pay_to:string,
  total_amount:number,
  type:string,
  date: string,
  time: string,

}
  


//<!------------Card Item Display--------------!>
export type CardItem = {
  title: string,
  amount: number,
  color: string,
  icon: string
}
