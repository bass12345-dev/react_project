import { Button, Checkbox, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useState } from 'react'
import Select from 'react-select'

export const AddDebtModal = ({ openModal, ToggleModal }: { openModal: any, ToggleModal: any }) => {


    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]


    // onClose={() => setOpenModal(false)}
    return (
        <>

            <Modal show={openModal} size="md" popup onClose={ToggleModal}  >
                <Modal.Header />
                <Modal.Body>
                    <form>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Debt</h3>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Reason" />
                                </div>
                                <Textarea id="password"  required />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Pay to" />
                                </div>
                                <Select options={options} />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Amount" />
                                </div>
                                <TextInput id="password" type="text" required />
                            </div>


                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Deadline" />
                                </div>
                                <TextInput id="password" type="text" required />
                            </div>


                            <div className="w-full flex justify-end">
                                <Button className="bg-debexPrimary hover:bg-red-500">Submit</Button>
                            </div>

                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </>
    )
}