import withReactContent from "sweetalert2-react-content";
import { debex, debex_type, paytoDB, supabase } from "../utils/supabase";
import Swal from "sweetalert2";
import { useState } from "react";


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

export const DebexDBCreate = (table:any) => {

  const Create = async (items: any) => {
    const {data:result, error } = await supabase
      .from(table)
      .insert([items]);
    return {result,error};
  }

  return { Create };
}

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


export const getDateSelectedType = async (debexSelectedType: any,_date:any) => {

      let date = null;
        switch (debexSelectedType) {
            case debex_type[0] :
                date = _date;
                break;
            case debex_type[1] :
                date = _date;
                break;
            case debex_type[2] :
                date = _date;
                break;
            default:
                date = null
                break;
        }

      return date;

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
  ).eq('type', params.debex_type).order(params.order_by, { ascending: false })
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


export const getCurrentDate = () => {
  // <!---------------- Get Current Date---------------->
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return year + '-' + month + '-' + day;
  // <!---------------- End---------------->
}