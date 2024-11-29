import withReactContent from "sweetalert2-react-content";
import { debex, paytoDB, supabase } from "../utils/supabase";
import Swal from "sweetalert2";


// <!------------- Pay To Service -----------------!>
export const getpayToItems = async() => {
    const { data: payToData, error } = await supabase.from(paytoDB).select().order('created_at', { ascending: false })

    if (error) {
      return [];
    } else {
      return payToData;
    }
  }


  // <!-------------Debt Service-----------------!>

  export const getDebexItems = async(params:any) => {
    const { data: debtData, error } = await supabase.from(debex).select(
      `
      deb_exp_id,
      total_amount,
      reason,
      type,
      payto_id,
      due_date,
      paid_date,
      ${paytoDB}(first_name,last_name)
     `
    ).eq('type', params.debex_type).order(params.order_by, { ascending: false })
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
    return year+'-'+month+'-'+day;
      // <!---------------- End---------------->
}