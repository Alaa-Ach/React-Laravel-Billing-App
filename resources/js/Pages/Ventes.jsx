import React, { useEffect, useMemo, useRef, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Commandes from "./Ventes/Commandes";
import { HiTag, HiShoppingCart, HiUser } from "react-icons/hi";
import { Tabs } from "flowbite-react";
import Products from "./Ventes/Products";
import Clients from "./Ventes/Clients";

const Ventes = ({ auth }) => {
    const tabsRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ventes
                </h2>
            }
        >
            <Head title="Ventes"></Head>
            <Tabs
                ref={tabsRef}
                onActiveTabChange={(tab) => setActiveTab(tab)}
                aria-label="Tabs with icons"
                style="underline"
            >
                <Tabs.Item active title="Ventes" icon={HiShoppingCart}>
                    {activeTab == 0 && <Commandes />}
                </Tabs.Item>

                <Tabs.Item active title="Produits" icon={HiTag}>
                    {activeTab == 1 && <Products />}
                </Tabs.Item>
                <Tabs.Item active title="Employé" icon={HiUser}>
                    {activeTab == 2 && <Clients />}
                </Tabs.Item>
            </Tabs>
        </AuthenticatedLayout>
    );
};

export default Ventes;
