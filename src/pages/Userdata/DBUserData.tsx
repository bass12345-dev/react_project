import { AccesToken, UserData } from "../../utils/LocaStorage";
import { supabase } from "../../utils/supabase";

export const DBUserData  = async (access_token : any) => {
    if(access_token){
        const { data, error } = await supabase
        .from('users')
        .select('first_name,last_name,user_id')
        .eq('user_id', access_token);
        if (!error) {
            localStorage.removeItem(UserData)
            let userdata = {
                given_name: data[0].first_name,
                family_name: data[0].last_name,
                id: data[0].user_id
            }
            localStorage.setItem(UserData,JSON.stringify(userdata));
            localStorage.setItem(AccesToken, access_token);
            setTimeout(() => {
                location.reload();
              }, 2000);
        }else{
            return false;
        }
        
    }else{
        return false;
    }
    
}