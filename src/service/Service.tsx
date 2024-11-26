import { paytoDB, supabase } from "../utils/supabase";


// <!------------- Pay To Service -----------------!>
export const getpayToItems = async() => {
    const { data: payToData, error } = await supabase.from(paytoDB).select().order('created_at', { ascending: false })

    if (error) {
      return [];
    } else {
      return payToData;
    }
  }