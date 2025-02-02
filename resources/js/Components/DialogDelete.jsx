"use client";

import { Button, Modal } from "flowbite-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DialogDelete = forwardRef(
    ({ deleteName, acceptCallBack, DenyCallBack }, ref) => {
        const [openModal, setOpenModal] = useState(false);
        useImperativeHandle(ref, () => ({
            openModal: () => {
                setOpenModal(true);
            },
            closeModal: () => {
                setOpenModal(false);
            },
        }));
        return (
            <>
                <Modal
                    show={openModal}
                    size="md"
                    onClose={() => setOpenModal(false)}
                    popup
                >
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Êtes-vous sûr de vouloir supprimer
                                {` ${deleteName}`}?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button
                                    color="failure"
                                    onClick={() => {
                                        acceptCallBack();
                                        setOpenModal(false);
                                    }}
                                >
                                    Oui
                                </Button>
                                <Button
                                    color="gray"
                                    onClick={() => {
                                        if (DenyCallBack) DenyCallBack();

                                        setOpenModal(false);
                                    }}
                                >
                                    Annuler
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
);

export default DialogDelete;
