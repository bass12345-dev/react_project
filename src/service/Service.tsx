import { debex, paytoDB, supabase } from "../utils/supabase";


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

  export const getDebtItems = async() => {
    const { data: debtData, error } = await supabase.from(debex).select(
      `
      deb_exp_id,
      total_amount,
      reason,
      type,
      payto_id,
      date,
      ${paytoDB}(first_name,last_name)
     `
    ).order('date', { ascending: false })
    if (error) {
      return [];
    } else {
      return debtData;
    }
  }