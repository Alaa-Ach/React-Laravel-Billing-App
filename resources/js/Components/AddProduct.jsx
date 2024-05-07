import React, { useRef } from "react";
import ModalComponent from "./ModalComponent";
import { Button, Label, Modal } from "flowbite-react";
import TextInput from "./TextInput";

const initialValues = {
    product: "dssd",
    description: "lorem dsds",
    quantity: 0,
    price: 0,
    tax: 0,
    hors_tax: 0,
};
const AddProduct = ({ callBack, className = "" }) => {
    // product values
    const [showAddProduct, setShowAddProduct] = React.useState(
        JSON.parse(JSON.stringify(initialValues))
    );
    // handle input action
    function onInput(name, value) {
        setShowAddProduct({
            ...showAddProduct,
            [name]: value,
        });
    }
    // show and hide modale
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setShowAddProduct(JSON.parse(JSON.stringify(initialValues)));

        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800,

        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const refProductModal = useRef(null);

    return (
        <div className={className}>
            <a
                className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    refProductModal?.current.openModal();
                }}
            >
                Ajouter un produit
            </a>
            <ModalComponent
                ref={refProductModal}
                showParams={open}
                onClose={handleClose}
            >
                <Modal.Header>Produit</Modal.Header>
                <ModalComponent.Body>
                    {" "}
                    <div className="py-5">
                        <div className="grid grid-cols-3 gap-2">
                            <div>
                                <div className="mb-2 block">
                                    <Label value="Produit" />
                                </div>
                                <TextInput
                                    value={showAddProduct.product}
                                    onChange={(e) =>
                                        onInput("product", e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label value="description" />
                                </div>
                                <TextInput
                                    value={showAddProduct.description}
                                    onChange={(e) =>
                                        onInput("description", e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label value="Quantite" />
                                </div>
                                <TextInput
                                    type="number"
                                    value={showAddProduct.quantity}
                                    onChange={(e) =>
                                        onInput("quantity", e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label value="Prix" />
                                </div>
                                <TextInput
                                    type="number"
                                    value={showAddProduct.price}
                                    onChange={(e) =>
                                        onInput("price", e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label value="Taxe" />
                                </div>
                                <TextInput
                                    type="number"
                                    value={showAddProduct.tax}
                                    onChange={(e) =>
                                        onInput("tax", e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label value="Hors Taxe" />
                                </div>
                                <TextInput
                                    type="number"
                                    value={showAddProduct.hors_tax}
                                    onChange={(e) =>
                                        onInput("hors_tax", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </ModalComponent.Body>
                <ModalComponent.Buttons>
                    <Button
                        onClick={() => {
                            refProductModal?.current.closeModal();

                            callBack(showAddProduct);
                        }}
                    >
                        Enregistrer
                    </Button>
                </ModalComponent.Buttons>
            </ModalComponent>
        </div>
    );
};

export default AddProduct;
