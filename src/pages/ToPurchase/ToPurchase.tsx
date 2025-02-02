import { Button } from "flowbite-react"
import { useEffect, useState } from "react";
import { CardItem, DebtItem } from "../../utils/Types";
import { DebexDBDelete, getCurrentDate, getDebexItems, getPayees, getpayToItems } from "../../service/Service";
import { debex, debex_type, supabase } from "../../utils/supabase";
import { DebexModal } from "../../components/Modals/DebexModal";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { PurchasedModal } from "../../components/Modals/PurchasedModal";
import { Cards } from "../../components/Cards";
import { ToPurchaseTable } from "./to_purchase_componentss/ToPurchaseTable";


export const ToPurchase = () => {

    
    //State
    const [openModal, setOpenModal] = useState(false); //Modals
    const [openPurchasedModal, setOpenPurchasedModal] = useState(false); //Modals
    const [PurchasedItem, setPurchasedItem] = useState([]) //Modals
    const [to_purchased, setToPurchased] = useState<DebtItem[]>([]);//Debex Items
    const [Total,setTotal] = useState('');
    const [payeesArr, setPayeesArr] = useState<Array<{ value: string; label: string }>>([]);


    
    
        
    //<!------------------ Fetch Data Payees ---------------------!>
    const fetchPayees = async () => {
    try {
            const payees = await getPayees();
            setPayeesArr(payees);
        } catch (error) {
            console.error('Error fetching payees:', error);
        }
    };
      
            
    
          
          //<!--------------- End----------------!>

    // <!---------------- Get  Debex Items---------------->
    const getToPurchase = async () => {
        let params = { debex_type: debex_type[2], order_by: 'due_date' };
        let debexItems = getDebexItems(params);

        if ((await debexItems).length > 0) {
            let data = await getDebexItems(params)
            setToPurchased(data);
            let total = data.reduce((acc, item) => acc + item.total_amount, 0);
            setTotal(total.toLocaleString(undefined, {minimumFractionDigits: 2}));

        } else {
            setToPurchased([]);
        }
        
    }

    useEffect(() => {
      getToPurchase();
      fetchPayees();
    }, []);
    // <!---------------- End---------------->

    // <!---------------- Toggle Modal---------------->
    const ToggleModal = () => {
        setOpenModal(!openModal);
    }

    function TogglePurchasedModal(row:any) {
        setOpenPurchasedModal(!openPurchasedModal);
        setPurchasedItem(row)
       
    }

    //   <!---------------------- END ----------------------!>


    let card_items = [
        {
          title: 'Total',
          amount: Total,
          color: 'bg-red-800',
          icon: 'fas fa-money-check-alt'
        },

      ]


      //<!---------------Object to Pass to Child Components, Ex. Modals----------------!>
    let debexItems = { 
        title: 'To Purchase/Bills', 
        date_label: 'Due Date', 
        debex_type: debex_type[2] 
    }
    //<!--------------- End----------------!>
  

    return (
        <>
            <div className="flex justify-between sm:flex-row flex-wrap mt-10">
                <div className="flex  sm:flex-row gap-3 flex-wrap ">
                    {
                        card_items.map((row: any, index) => (
                            <Cards key={index} row_card_item={row} />
                        ))
                    }

                </div>
                <a href="#" className="font-varela font-bold text-blue-400">
                    View Analytics
                </a>
            </div>
            <div className="card 
                            bg-debexLightBlue 
                            border 
                            rounded-lg 
                            h-auto   
                            w-full 
                            px-6 py-6 
                            mt-10">
                <div className="card-buttons flex justify-end">
                    <Button className="bg-debexPrimary 
                                        font-varela 
                                        hover:bg-red-500  
                                        text-white 
                                        hover:bg-red-500 
                                        rounded-full" 
                                        onClick={ToggleModal}
                                        >Add New
                    </Button>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                  <ToPurchaseTable 
                        toPurchase={to_purchased} 
                        getToPurchase={getToPurchase} 
                        TogglePurchasedModal={TogglePurchasedModal}  
                    />
                </div>
            </div>
            <DebexModal 
                    openModal={openModal} 
                    ToggleModal={ToggleModal} 
                    debexData={getToPurchase} 
                    debexItem={debexItems} 
                    payeesArr={payeesArr} 
            />
            <PurchasedModal 
                    openModal={openPurchasedModal}  
                    ToggleModal={TogglePurchasedModal} 
                    setOpenPurchasedModal ={setOpenPurchasedModal}
                    debexItems={getToPurchase} 
                    purc_item={PurchasedItem} 
            />
        </>
    )

}