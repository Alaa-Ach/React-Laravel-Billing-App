import { Button } from "flowbite-react";
import React from "react";

const Table = ({ data, actions = null }) => {
    const headers = Object.keys(data[0]).filter((e) => e != "id");
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        {headers.map((e, i) => (
                            <th
                                scope="col"
                                className="px-6 py-3"
                                key={`header-${i}`}
                            >
                                {e.replaceAll("_", " ")}
                            </th>
                        ))}
                        {actions && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((e, i) => {
                        return (
                            <tr
                                key={`tr-${i}`}
                                className="odd:bg-white  even:bg-gray-50  border-b "
                            >
                                {headers.map((h, y) => (
                                    <td className="px-6 py-4" key={`td-${y}`}>
                                        {e[h]}
                                    </td>
                                ))}
                                {actions && (
                                    <td>
                                        <div className="flex flex-wrap gap-1">
                                            {actions.map(
                                                (action, actionIndex) => {
                                                    return (
                                                        <span
                                                            key={
                                                                `action-` +
                                                                actionIndex
                                                            }
                                                            onClick={() =>
                                                                action.action(
                                                                    actionIndex
                                                                )
                                                            }
                                                        >
                                                            <Button
                                                                size="xs"
                                                                color="failure"
                                                            >
                                                                <span
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: action.icon,
                                                                    }}
                                                                ></span>
                                                            </Button>
                                                        </span>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
