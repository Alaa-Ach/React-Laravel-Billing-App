import React, { useEffect, useMemo, useRef, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { HiTag, HiShoppingCart, HiUser } from "react-icons/hi";
import { Tabs } from "flowbite-react";
import ModalNewAchat from "@/Components/ModalNewAchat";
import ModalNewCommand from "@/Components/ModalNewCommand";

import axios from "axios";

import moment from "moment";

import DialogDelete from "@/Components/DialogDelete";
const Achats = ({ auth }) => {
    // values
    const refDialogDelete = useRef(null);
    const refModalCommand = useRef(null);

    const [commandes, setCommandes] = React.useState([]);
    const [commandId, setCommandId] = React.useState(null);

    const getVentes = () => {
        axios
            .get("/api/achats")
            .then((response) => {
                setCommandes(response.data);
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
    const openEditCommand = (id) => {
        axios
            .get("/api/achats/" + id)
            .then((response) => {
                console.log("response get element", response.data);
                const temp = {
                    ...response.data,
                    products: response.data.products.map((e) => {
                        return [
                            "id",
                            "product",
                            "description",
                            "quantity",
                            "price",
                            "tax",
                            "hors_tax",
                        ].reduce((acc, value) => {
                            acc[value] = e[value];
                            return acc;
                        }, {});
                    }),
                };
                refModalCommand?.current.setCommand(temp);
            })
            .catch((error) => {
                console.error("error ", error);
            })
            .finally(() => {});
    };
    const deleteCommand = () => {
        axios
            .delete("/api/achats/" + commandId)
            .then((response) => {
                alertify.notify(
                    "Commande supprimée avec succès.",
                    "success",
                    3
                );
                getVentes();
                console.log("delete command");
            })
            .catch((error) => {
                console.error("error delete command", error);
            })
            .finally(() => {});
    };
    useEffect(() => {
        console.log("dsdsds");
        getVentes();
    }, []);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Achats
                    </h2>
                    <ModalNewAchat ref={refModalCommand} />
                </div>
            }
        >
            <DialogDelete
                deleteName="cette commande"
                acceptCallBack={deleteCommand}
                ref={refDialogDelete}
            />
            <Head title="Achats"></Head>
            <div>
                <DialogDelete
                    deleteName="cette commande"
                    acceptCallBack={deleteCommand}
                    ref={refDialogDelete}
                />

                <div className="overflow-auto rounded-lg border border-gray-200 shadow-md m-5">
                    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-4 font-medium text-gray-900"
                                >
                                    Nom de fournisseur
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-4 font-medium text-gray-900"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-4 font-medium text-gray-900"
                                >
                                    Arrivée prévue
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
                            {commandes.map((cmd, CmdIndex) => {
                                return (
                                    <tr
                                        key={CmdIndex}
                                        className="hover:bg-gray-50"
                                    >
                                        <th className=" flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div className="font-medium text-gray-700">
                                                    {cmd.supplier}
                                                </div>
                                                {/* <div className="text-gray-400">
                                                jobs@sailboatui.com
                                            </div> */}
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1 rounded-full
                                        bg-${
                                            cmd.isPaid ? "green" : "red"
                                        }-50 px-2 py-1 text-xs font-semibold text-${
                                                    cmd.isPaid ? "green" : "red"
                                                }-600`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full bg-${
                                                        cmd.isPaid
                                                            ? "green"
                                                            : "red"
                                                    }-600`}
                                                ></span>
                                                {cmd.isPaid
                                                    ? "Payee"
                                                    : "Non Payee"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {moment(cmd.expiring_date).format(
                                                "DD-MM-yyyy"
                                            )}
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
                                                        setCommandId(cmd.id);
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
                                                {/* edit action */}
                                                <a
                                                    onClick={() => {
                                                        console.log(
                                                            "object",
                                                            cmd.id
                                                        );
                                                        openEditCommand(cmd.id);
                                                    }}
                                                    x-data="{ tooltip: 'Edite' }"
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
                                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
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
                {/* <Table data={commandes}></Table> */}
            </div>
        </AuthenticatedLayout>
    );
};

export default Achats;
