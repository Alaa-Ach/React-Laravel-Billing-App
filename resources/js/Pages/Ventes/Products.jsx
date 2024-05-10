import ModalComponent from "@/Components/ModalComponent";
import React, { useEffect, useMemo, useRef } from "react";
import axios from "axios";
import Table from "@/Components/Table";
import moment from "moment";
import DialogDelete from "@/Components/DialogDelete";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchField from "@/Components/SearchField";

const Products = () => {
    // values
    const refDialogDelete = useRef(null);
    const refModalCommand = useRef(null);
    const [search, setSearch] = React.useState("");

    const [products, setProducts] = React.useState([]);
    const [productId, setProductId] = React.useState(null);

    const getVentes = () => {
        axios
            .get("/api/products", {
                params: {
                    q: search,
                },
            })
            .then((response) => {
                setProducts(response.data);
                console.log("get data", response.data);
                // notyMsg({ text: `.`, type: 'success' })
            })
            .catch((error) => {
                console.error("error get data", error);
                // notyMsg({
                //   text: window.errorMsg(error, 'Something went wrong! Please try again.'),
                //   type: 'error'
                // });
            })
            .finally(() => {});
    };

    const deleteProduct = () => {
        axios
            .delete("/api/products/" + productId)
            .then((response) => {
                alertify.notify("Produit supprimée avec succès.", "success", 3);
                getVentes();
                console.log("delete product");
            })
            .catch((error) => {
                console.error("error delete product", error);
            })
            .finally(() => {});
    };
    useEffect(() => {
        console.log("dsdsds");
        getVentes();
    }, []);
    return (
        <div>
            <DialogDelete
                deleteName="ce produit"
                acceptCallBack={deleteProduct}
                ref={refDialogDelete}
            />
            <div className="flex justify-between px-5 items-end mt-5">
                <h1 className="text-2xl font-bold">Produits</h1>
            </div>

            {/* search */}
            <SearchField onValueChange={setSearch} onSearch={getVentes} />
            <div className="overflow-auto rounded-lg border border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            >
                                Nom de Produit
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            >
                                Description
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            >
                                Quantite
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            >
                                Prix
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            >
                                Tax
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            >
                                Hors Tax
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            >
                                Date de creation
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 font-medium text-gray-900"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {products.map((cmd, CmdIndex) => {
                            return (
                                <tr key={CmdIndex} className="hover:bg-gray-50">
                                    <th className=" flex gap-3 px-6 py-4 font-normal text-gray-900">
                                        <div className="text-sm">
                                            <div className="font-medium text-gray-700">
                                                {cmd.product}
                                            </div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        {cmd.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {cmd.quantity}
                                    </td>
                                    <td className="px-6 py-4">{cmd.price}</td>
                                    <td className="px-6 py-4">{cmd.tax}</td>
                                    <td className="px-6 py-4">
                                        {cmd.hors_tax}
                                    </td>
                                    <td className="px-6 py-4">
                                        {moment(cmd.created_at).format(
                                            "DD-MM-yyyy"
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-start gap-4">
                                            {/* delete action */}
                                            <a
                                                onClick={() => {
                                                    setProductId(cmd.id);
                                                    refDialogDelete?.current.openModal();
                                                }}
                                                x-data="{ tooltip: 'Delete' }"
                                                href="#"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-6 w-6"
                                                    x-tooltip="tooltip"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {/* <Table data={products}></Table> */}
        </div>
    );
};

export default Products;
