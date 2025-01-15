import withReactContent from "sweetalert2-react-content";
import { debex, debex_type, paytoDB, supabase } from "../utils/supabase";
import Swal from "sweetalert2";
import { useState } from "react";




// <!------------- Global Create Method -----------------!>
export const DebexDBCreate = (table:any) => {

  const Create = async (items: any) => {
    const {data:result, error } = await supabase
      .from(table)
      .insert([items]);
    return {result,error};
  }

  return { Create };
}

// <!------------- End -----------------!>





// <!------------- Pay To Service -----------------!>
export const getpayToItems = async () => {
  const { data: payToData, error } = await supabase.from(paytoDB).select().order('created_at', { ascending: false })

  if (error) {
    return [];
  } else {
    return payToData;
  }
}


// <!-------------Debt Service-----------------!>

//Update
export const DebexDBUpdate = (table:any) => {

  const Update = async (items: any,id:any) => {
    const {data:result, error } = await supabase
      .from(table)
      .update([items])
      .eq('deb_exp_id', id);
    return {result,error};
  }

  return { Update };
}

//Delete
export const DebexDBDelete = () => {

  const Delete = async (id: any) => {
    const {data:result, error } = await supabase
      .from(debex)
      .delete()
      .eq('deb_exp_id', id) 
    return {result,error};
  }
  
  return { Delete };
}


export const getDebexItems = async (params: any) => {



  const { data: debtData, error } = await supabase.from(debex).select(
    `
      deb_exp_id,
      total_amount,
      reason,
      type,
      payto_id,
      due_date,
      paid_date,
      date_acquired,
      ${paytoDB}(first_name,last_name)
     `
  ).eq('type', params.debex_type)
  
  .order(params.order_by, { ascending: false })
  if (error) {
    return [];
  } else {
    return debtData;
  }
}

export const getDebexItemsByMonth = async (params: any) => {

  const startOfMonth = `${params.year}-${params.month}-01`;
  const nextMonth = new Date(params.year, params.month, 1); // JS months are 0-indexed
  const startOfNextMonth = nextMonth.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  
    const { data: debtData, error } = await supabase.from(debex).select(
      `
        deb_exp_id,
        total_amount,
        reason,
        type,
        payto_id,
        due_date,
        paid_date,
        date_acquired,
        ${paytoDB}(first_name,last_name)
       `
    ).eq('type', params.debex_type)
    .gte('paid_date', startOfMonth)
    .lt('paid_date', startOfNextMonth)  // Correct date for next month
    .order(params.order_by, { ascending: false })
    if (error) {
      return [];
    } else {
      return debtData;
    }
  }

export const getDebexItem = async (params: any) => {
  const { data: debtData, error } = await supabase.from(debex).select(
    `
      deb_exp_id,
      total_amount,
      reason,
      type,
      payto_id,
      due_date,
      paid_date,
      date_acquired,
      ${paytoDB}(first_name,last_name)
     `
  ).eq('deb_exp_id', params.debex_id)
  if (error) {
    return [];
  } else {
    return debtData;
  }
}




export const getPayees = async() => {
  let items_arr:any = [];
  let payees = getpayToItems();
  if((await payees).length > 0){
  // Fetching data from the database and setting it to state
      (await payees).forEach((item: any) => {
          items_arr.push({ value: item.payto_id, label: item.first_name });
      });
      
    }
  return items_arr;
}






// <!------------- Swal Display -----------------!>

export const  DebexDBDeleteAlert = (result:any,getDebt:any) => {
  
  
  if(!result.error){
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Data has been deleted successfully!",
    });
    getDebt();
  }else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong! Contact Developer if Issue persist!",
    });
  }
}

//Loader
export const DebexSwalLoader = () => {
  Swal.fire({
    title: "Removing Data",
    html: "",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
   
  })
}

// <!------------- End-----------------!>






// <!------------- Date Selected Type -----------------!>
export const getDateSelectedType = async (debexSelectedType: any,_date:any) => {

      let due_date = null;
      let paid_date = null;
      let acquired_date = null;

      switch (debexSelectedType) {
            case debex_type[0] :
                acquired_date = _date;
                break;
            case debex_type[1] :
                paid_date = _date;
                break;
            case debex_type[2] :
                due_date = _date;
                break;
        }

      return {due_date,paid_date,acquired_date};

}

// <!------------- End-----------------!>





export const getCurrentDate = () => {
  // <!---------------- Get Current Date---------------->
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return year + '-' + month + '-' + day;
  // <!---------------- End---------------->
}


export const getCurrDate = () => {
  // <!---------------- Get Current Date---------------->
  const date  = new Date();
  let day     = date.getDate();
  let Month   =  date.getMonth() < 10 ? `0${date.getMonth() + 1}` :  date.getMonth() + 1 ;
  let Year    = date.getFullYear();
  return {day,Month,Year};  // <!---------------- End---------------->
}
