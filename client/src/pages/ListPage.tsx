import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Column, Row, useRowSelect, useTable } from "react-table";
import { IndeterminateCheckbox } from "../components/IndeterminateCheckbox";
import ToolBar from "../components/ToolBar";
import { ListContext } from "../context";
import { useRequest } from "../hooks/useRequest";

const dateFormater = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
});

export interface IData {
    last_login_time: string;
    registration_time: string;
    id: number;
    name: string;
    email: string;
    status: "active" | "blocked";
}

const tokenJson = localStorage.getItem("token");
const token = tokenJson ? JSON.parse(tokenJson) : null;

const ListPage: FC = observer(() => {
    const [isLoading, setIsLoading] = useState(false);
    const list = useContext(ListContext);
    const { error, request } = useRequest();

    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            await request("/api/users", "GET", null, {
                Authorization: `Bearer ${token}`,
            })
                .then(response => {
                    list.setItems(response);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        if (token) {
            fetchData();
        } else {
            setIsLoading(false);
        }
        return () => {
            setIsLoading(true);
        };
    }, [request]);

    const data = useMemo(() => {
        return list.items.map(i => {
            return {
                ...i,
                last_login_time: dateFormater.format(
                    new Date(i.last_login_time)
                ),
                registration_time: dateFormater.format(
                    new Date(i.registration_time)
                ),
            };
        });
    }, [list.items]);
    const columns: Column<IData>[] = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "id",
            },
            {
                Header: "name",
                accessor: "name",
            },
            {
                Header: "email",
                accessor: "email",
            },
            {
                Header: "Last login",
                accessor: "last_login_time",
            },
            {
                Header: "Registred",
                accessor: "registration_time",
            },
            {
                Header: "Status",
                accessor: "status",
            },
        ],
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds },
    } = useTable(
        {   
            columns,
            data,
        },
        useRowSelect,
        ({ visibleColumns }) => {
            visibleColumns.push(columns => [
                {
                    id: "selection",

                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <IndeterminateCheckbox
                            {...getToggleAllRowsSelectedProps()}
                        />
                    ),

                    Cell: ({ row }: { row: Row<IData> }) => (
                        <IndeterminateCheckbox
                            {...row.getToggleRowSelectedProps()}
                        />
                    ),
                },
                ...columns,
            ]);
        }
    );
    return (
        <div className="w-full flex justify-center">
            <div className=" w-full container h-full flex flex-col justify-center pt-2">
                <ToolBar
                    selectedUsers={selectedFlatRows}
                    setIsLoading={setIsLoading}
                />
                <table
                    {...getTableProps()}
                    className="border-collapse mt-2 border-2 border-sky-200 p-2"
                >
                    <thead>
                        {headerGroups.map(hg => (
                            <tr {...hg.getHeaderGroupProps()}>
                                {hg.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps()}
                                        className="bg-sky-200"
                                    >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(r => {
                            prepareRow(r);
                            return (
                                <tr
                                    {...r.getRowProps()}
                                    className="border-2 border-collapse border-sky-200 mx-5"
                                >
                                    {r.cells.map(c => (
                                        <td
                                            key={c.column.id}
                                            {...c.getCellProps}
                                            className="border-2 border-collapse border-sky-200 px-2 my-5"
                                        >
                                            {c.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
});
export default ListPage;
