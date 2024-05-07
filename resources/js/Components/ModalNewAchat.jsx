import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import PrimaryButton from "./PrimaryButton";

import AddProduct from "./AddProduct";
import {
    Datepicker,
    Button,
    Checkbox,
    Label,
    TextInput,
    Spinner,
    Badge,
    ToggleSwitch,
} from "flowbite-react";

import Table from "./Table";
import ModalTest from "./ModalComponent";
import ModalComponent from "./ModalComponent";
import axios from "axios";
const ModalNewAchat = forwardRef(({ callBack }, ref) => {
    const refModal = useRef(null);
    const [loading, setLoading] = React.useState(false);
    const [CommandeValue, setCommandeValue] = React.useState({
        supplier: "",
        delivery_date: new Date(),
        products: [],
    });
    // computed values
    const style = {
        popup: {
            root: {
                inner: "inline-block fixed rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700",
            },
        },
    };

    const disableSave = useMemo(() => {
        return (
            loading ||
            (CommandeValue.supplier &&
                CommandeValue.delivery_date &&
                CommandeValue?.products?.length)
        );
    }, [
        CommandeValue.supplier,
        CommandeValue.delivery_date,
        CommandeValue?.products?.length,
        loading,
    ]);

    // functions
    // button send request add
    function formatDate(date) {
        date = new Date(date);
        const year = date.getFullYear(); // Gets the year (4 digits)
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Gets the month, remember months are 0-based in JavaScript
        const day = date.getDate().toString().padStart(2, "0"); // Gets the day of the month

        return `${year}-${month}-${day}`; // Returns the formatted date string
    }
    const addCommand = () => {
        const temp = {
            ...CommandeValue,
            delivery_date: formatDate(CommandeValue.delivery_date),
        };
        setLoading(true);
        // console.log(object);
        // return
        axios
            .post("/api/achats", temp)
            .then(() => {
                refModal?.current.closeModal();
                callBack();
                alertify.notify(
                    "Commande a été ajoutée avec succès. ",
                    "success",
                    3
                );
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false);
            });
    };
    const updateCommand = () => {
        const temp = {
            ...CommandeValue,
            delivery_date: formatDate(CommandeValue.delivery_date),
        };
        setLoading(true);
        // console.log(object);
        // return
        axios
            .put("/api/achats/" + temp.id, temp)
            .then(() => {
                refModal?.current.closeModal();
                callBack();
                alertify.notify(
                    "Commande a été modifiée avec succès. ",
                    "success",
                    3
                );
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false);
            });
    };
    function onInput(name, value) {
        setCommandeValue({
            ...CommandeValue,
            [name]: value,
        });
    }
    useImperativeHandle(ref, () => ({
        setCommand: (value) => {
            setCommandeValue(value);
            refModal?.current.openModal();
        },
    }));
    return (
        <>
            <ModalComponent
                onOpenModal={() => {
                    setCommandeValue({
                        supplier: "",
                        delivery_date: new Date(),
                        products: [],
                    });
                }}
                ref={refModal}
                name="Nouveau"
            >
                <ModalComponent.Header>Commande</ModalComponent.Header>
                <ModalComponent.Body>
                    <div className="py-5 disabled">
                        <div className="grid grid-cols-2 gap-2">
                            {/* client name */}
                            <div>
                                <div className="mb-2 block">
                                    <Label value="Nom du fournisseur" />
                                </div>
                                <TextInput
                                    value={CommandeValue.supplier}
                                    onInput={(e) =>
                                        onInput("supplier", e.target.value)
                                    }
                                />
                            </div>
                            {/* expiring date */}
                            <div>
                                <div className="mb-2 block">
                                    <Label value="Arrivée prévue" />
                                </div>
                                <Datepicker
                                    theme={style}
                                    value={`${CommandeValue.delivery_date}`.slice(
                                        0,
                                        10
                                    )}
                                    onSelectedDateChanged={(date) => {
                                        console.log(date);
                                        onInput("delivery_date", date);
                                    }}
                                    color="white"
                                />
                            </div>
                            {/* mstatus */}
                            {CommandeValue?.id && (
                                <div className="my-2">
                                    <span className="flex gap-2">
                                        <Label value="Status" />
                                        {CommandeValue?.isPaid ? (
                                            <Badge color="success">Payee</Badge>
                                        ) : (
                                            <Badge color="failure">
                                                Non Payee
                                            </Badge>
                                        )}
                                    </span>
                                    <ToggleSwitch
                                        checked={CommandeValue.isPaid}
                                        label="Confirme"
                                        onChange={() => {
                                            onInput(
                                                "isPaid",
                                                !CommandeValue.isPaid
                                            );
                                        }}
                                    />
                                </div>
                            )}
                            {/* products section */}
                            <div className="col-span-2">
                                <h3>Produits</h3>
                                {!CommandeValue?.products?.length ? (
                                    <p className="text-gray-600 w-full bg-slate-200 rounded-md py-5 text-center">
                                        Aucun produit
                                    </p>
                                ) : (
                                    <Table
                                        data={CommandeValue?.products}
                                        actions={[
                                            {
                                                icon: `<svg className="w-[25px] h-[25px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                                              </svg>
                                              `,
                                                type: "failure",
                                                action: (index) => {
                                                    let temp = JSON.parse(
                                                        JSON.stringify(
                                                            CommandeValue.products
                                                        )
                                                    );
                                                    temp.splice(index, 1);
                                                    onInput("products", temp);
                                                },
                                            },
                                        ]}
                                    ></Table>
                                )}

                                <div
                                    className="
                                    flex
                                    justify-between"
                                >
                                    <AddProduct
                                        className="mt-2"
                                        callBack={(e) => {
                                            console.log(
                                                "this",
                                                CommandeValue.products
                                            );
                                            onInput(
                                                "products",
                                                CommandeValue.products.concat(e)
                                            );
                                        }}
                                    />
                                    <div>
                                        Total:
                                        <span> </span>
                                        <b>
                                            {CommandeValue.products.reduce(
                                                (acc, curr) =>
                                                    acc +
                                                    curr.price * curr.quantity,
                                                0
                                            )}
                                        </b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalComponent.Body>
                <ModalComponent.Buttons>
                    <Button
                        isProcessing={loading}
                        disabled={!disableSave}
                        onClick={() => {
                            CommandeValue.id ? updateCommand() : addCommand();
                        }}
                    >
                        {CommandeValue.id ? "Enregistrer" : "Ajouter"}
                    </Button>
                </ModalComponent.Buttons>
            </ModalComponent>
        </>
    );
});

export default ModalNewAchat;
