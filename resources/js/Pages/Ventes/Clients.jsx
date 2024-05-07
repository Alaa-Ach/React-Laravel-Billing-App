import ModalComponent from "@/Components/ModalComponent";
import React, { useEffect, useMemo, useRef } from "react";
import axios from "axios";
import Table from "@/Components/Table";
import moment from "moment";
import DialogDelete from "@/Components/DialogDelete";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Clients = () => {
    // values
    const refDialogDelete = useRef(null);
    const refModalCommand = useRef(null);

    const [ClientsDetails, setClientsDetails] = React.useState([]);
    const [productId, setProductId] = React.useState(null);

    const getClients = () => {
        axios
            .get("/api/clients")
            .then((response) => {
                setClientsDetails(response.data);
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

    useEffect(() => {
        console.log("dsdsds");
        getClients();
    }, []);
    return (
        <div>
            <div className="flex justify-between px-5 items-end mt-5">
                <h1 className="text-2xl font-bold">Employés</h1>
            </div>
            <div className="overflow-auto rounded-lg border border-gray-200 shadow-md m-5">
                {ClientsDetails && ClientsDetails.length && (
                    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 capitalize">
                            <tr>
                                {Object.keys(ClientsDetails[0]).map((e, i) => {
                                    return (
                                        <th
                                            key={i}
                                            scope="col"
                                            className="px-6 py-4 font-medium text-gray-900"
                                        >
                                            {e.replaceAll("_", " ")}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {ClientsDetails.map((cmd, CmdIndex) => {
                                return (
                                    <tr
                                        key={CmdIndex}
                                        className="hover:bg-gray-50"
                                    >
                                        <th className=" flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div className="font-medium text-gray-700">
                                                    {cmd.employé}
                                                </div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            {cmd.total_des_ventes}
                                        </td>
                                        <td className="px-6 py-4">
                                            {cmd.total_quantite}
                                        </td>
                                        {/* <td className="px-6 py-4">
                                            {cmd.total_achats}
                                        </td> */}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            {/* <Table data={products}></Table> */}
        </div>
    );
};

export default Clients;
