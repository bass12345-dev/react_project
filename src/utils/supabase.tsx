import { createClient } from "@supabase/supabase-js";


export const supabase = createClient('https://fruxdjhzpmmalokokaci.supabase.co',
                                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZydXhkamh6cG1tYWxva29rYWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2MjgwNjMsImV4cCI6MjA0NjIwNDA2M30.kYdDyqaggZxUPK_b1zm0hvjw9VDrk-nTWDlB8kivq1Q'

);

export const userDB = 'users';
export const paytoDB = 'pay_to';
export const debex = 'deb_exp';

export const debex_type = ['debt','expenses','to-purchase']
export const crud_type = ['create'];