import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { HiTag, HiShoppingCart } from "react-icons/md";

// Commandes', 'Produits' et 'Clients'
export function Component() {
    return (
        <Tabs aria-label="Tabs with icons" style="underline">
            <Tabs.Item active title="Commandes" icon={HiShoppingCart}>
                <span className="font-medium text-gray-800 dark:text-white">
                    Profile tab's associated content
                </span>
                . Clicking another tab will toggle the visibility of this one
                for the next. The tab JavaScript swaps classes to control the
                content visibility and styling.
            </Tabs.Item>

            <Tabs.Item active title="Commandes" icon={HiShoppingCart}>
                <span className="font-medium text-gray-800 dark:text-white">
                    Profile tab's associated content
                </span>
                . Clicking another tab will toggle the visibility of this one
                for the next. The tab JavaScript swaps classes to control the
                content visibility and styling.
            </Tabs.Item>
        </Tabs>
    );
}
