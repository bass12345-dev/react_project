import { useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MantineReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMantineReactTable,
} from 'mantine-react-table';
import {
  ActionIcon,
  Button,
  Flex,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { ModalsProvider, modals } from '@mantine/modals';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';


type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};


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

function Mantine() {
 
const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});


  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
        mantineEditTextInputProps: {
          type: 'email',
          required: true,
          error: validationErrors?.firstName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        mantineEditTextInputProps: {
          type: 'email',
          required: true,
          error: validationErrors?.lastName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              lastName: undefined,
            }),
        },
      },

    
    ],
    [validationErrors],
  );


  const openDeleteConfirmModal = (row: MRT_Row<Person>) =>
    modals.openConfirmModal({
      title: 'Are you sure you want to delete this user?',
      children: (
        <Text>
          Are you sure you want to delete sample
          sample? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => console.log('123'),
    });

  const table = useMantineReactTable({
    columns,
    data: data,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
   
    renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
      <Stack>
        <Title order={3}>Create New User</Title>
        {internalEditComponents}
        <Flex justify="flex-end" mt="xl">
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </Flex>
      </Stack>
    ),
    renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
      <Stack>
        <Title order={3}>Edit User</Title>
        {internalEditComponents}
        <Flex justify="flex-end" mt="xl">
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </Flex>
      </Stack>
    ),
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon onClick={() => table.setEditingRow(row)}>
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon color="red">
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New User
      </Button>
    ),
    
  });

  return <MantineReactTable table={table} />;
}

export default Mantine
