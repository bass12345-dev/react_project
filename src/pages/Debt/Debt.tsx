import { useState } from 'react'
import { debex_type } from '../../utils/supabase'
import { useEffect } from 'react'
import { Cards } from '../../components/Cards';
import { DebtTable } from './debt_components/DebtTable';
import { DebtItem } from '../../utils/Types';
import { getDebexItems, getPayees } from '../../service/Service';
import { Button } from 'flowbite-react';
import { DebexModal } from '../../components/Modals/DebexModal';
import { Logs } from './debt_components/Logs';

import { useMemo } from 'react';

import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';


const data: Person[] = [
  {
    name: {
      firstName: 'Zachary',
      lastName: 'Davis',
    },
    address: '261 Battle Ford',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Robert',
      lastName: 'Smith',
    },
    address: '566 Brakus Inlet',
    city: 'Westerville',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Yan',
    },
    address: '7777 Kuhic Knoll',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'John',
      lastName: 'Upton',
    },
    address: '722 Emie Stream',
    city: 'Huntington',
    state: 'Washington',
  },
  {
    name: {
      firstName: 'Nathan',
      lastName: 'Harris',
    },
    address: '1 Kuhic Knoll',
    city: 'Ohiowa',
    state: 'Nebraska',
  },
];


type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};




function Debt() {
  //<!---------------State Management----------------!>
  const [debt, setDebt] = useState<DebtItem[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [payeesArr, setPayees] = useState(getPayees());
  //<!--------------- End----------------!>

   //<!---------------Toggle Modal----------------!>
  const ToggleModal = () => {
    setOpenModal(!openModal);
  }
   //<!--------------- End----------------!>

  //<!--------------- Get Debt ----------------!>
  const getDebt = async () => {
    let params = { debex_type: debex_type[0], order_by: 'date_acquired' };
    let debexItems = getDebexItems(params);
    if ((await debexItems).length > 0) {
      setDebt(await debexItems);
    } else {
      setDebt([]);
    }
  }

  useEffect(() => {
    getDebt();
  }, []);
  //<!--------------- End----------------!>

  let card_items = [
    {
      title: 'Debt Amount',
      amount: 'P 123.45',
      color: 'bg-red-800',
      icon: 'fas fa-money-check-alt'
    }
  ]

   //<!---------------Object to Pass to Child Components, Ex. Modals----------------!>
  let debexItems = { 
                    title: 'Debt', 
                    date_label: 'Acquired Date', 
                    debex_type: debex_type[0] 
                  }
  //<!--------------- End----------------!>


  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ],
    [],
  );


  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });


  return (
    <>
    
      <div className="flex justify-between sm:flex-row flex-wrap mt-10">
        {/* Display Amount Cards */}
        <div className="flex  sm:flex-row gap-3 flex-wrap ">
          {
            card_items.map((row: any, index) => (
              <Cards key={index} row_card_item={row} />
            ))
          }
        </div>
        {/* End */}

        {/* View Analytics */}
        <a href="#" className="font-varela font-bold text-blue-400">
          View Analytics
        </a>
        {/* End */}
      </div>

      <div className="flex flex-col md:flex-row mt-10 gap-x-4 gap-y-4 ">
        {/* Debt Table */}
          <div className="card bg-debexLightBlue border rounded-lg h-auto md:w-2/3  w-full px-6 py-6">
            <div className="card-buttons flex justify-end">
              <Button className="bg-debexPrimary font-varela hover:bg-red-500  text-white hover:bg-red-500 rounded-full" onClick={ToggleModal} >Add New</Button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <MantineReactTable table={table} />
            </div>
            {/* <DebtTable debt={debt} getDebt={getDebt} /> */}
          </div>
        {/* End */}
        
        {/* Logs List */}
        <Logs />
        {/* End */}
      </div>
      <DebexModal 
        openModal={openModal} 
        ToggleModal={ToggleModal} 
        debexData={getDebt} 
        debexItem={debexItems}
        payeesArr={payeesArr} 
      />
    </>
  )
}

export default Debt
