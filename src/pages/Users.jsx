import { EyeIcon, UserPlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react"
import { roles } from "../helpers/mapping.js";
import useApp from "../hooks/useApp";
import { Table, Space } from "antd";
import ModalUser from "../components/ModalUser";
import Spinner from "../components/Spinner";

function Users() {



    const [searchTerm, setSearchTerm] = useState('');

    const { getUsers, users, handleModalUser, isLoading, filteredUsers, searchUser, setIsEditingUser} = useApp();



    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        setSearchTerm('');
    }, [users]);

    const handleChangeSearch = (e) => {
        setSearchTerm(e.target.value);
        searchUser(e.target.value);
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            responsive: ['md']
        },
        {
            title: 'Nombres',
            dataIndex: '',
            key: 'firstName',
            render: (dataIndex) => {
                return `${dataIndex.firstName} ${dataIndex.secondName}`;
            },
            sorter: (a, b) => a.firstName.localeCompare(b.firstName)
        },
        {
            title: 'Apellidos',
            dataIndex: '',
            key: 'surname',
            render: (dataIndex) => {
                return `${dataIndex.surname} ${dataIndex.secondSurName}`
            },
            sorter: (a, b) => a.surname.localeCompare(b.surname),
            filterSearch: true,
            onFilter: (value, record) => record.includes(value)
        },
        {
            title: '# Documento',
            dataIndex: 'documentNumber',
            key: 'documentNumber',
            responsive: ['md'],
            width: '15%'
        },
        {
            title: 'Acciones',
            dataIndex: '',
            key: 'action',
            render: (dataIndex) => {
                return (
                    <Space >
                        <button
                            type="button"
                            className="py-1 px-2 rounded text-blue-600 text-xs transition-colors font-bold hover:bg-neutral-200 text-center"
                            onClick={() => handleModalUser(dataIndex.id)}
                        >
                            <EyeIcon className="h-5 w-5" />
                        </button>
                        {
                            dataIndex.role !== 1 &&
                            <button
                                type="button"
                                className="py-1 px-2 rounded text-blue-600 text-xs transition-colors font-bold hover:bg-neutral-200 text-center"
                                onClick={() => {
                                    setIsEditingUser(true);
                                    handleModalUser(dataIndex.id)
                                }}
                            >
                                <PencilSquareIcon className="h-5 w-5" />
                            </button>
                        }

                    </Space>
                )

            },
            width: '15%'
        }
    ]

    if (isLoading) return <Spinner />
    return (
        <div>
            <div className="flex flex-col gap-5 md:flex-row items-center justify-between md:gap-0">
                <h1 className="text-3xl text-neutral-900 font-bold">Lista de Usuarios</h1>
                <button
                    type="button"
                    className="bg-blue-500 text-white uppercase text-sm font-bold py-2 px-4 rounded flex items-center gap-2 hover:bg-blue-600 transition-colors"
                    onClick={() => handleModalUser()}
                >
                    <UserPlusIcon className="h-5 w-5" />
                    Crear Usuario
                </button>
            </div>

            <div className="mt-8">
                <input
                    type="search"
                    className="block border border-neutral-300 rounded-md py-2 px-3 flex-1 focus:outline-none focus:border-blue-600 w-full md:w-2/5 mb-5 md:transition-all md:focus:w-3/5 md:duration-[500ms]"
                    placeholder="Buscar por nombre o documento..."
                    value={searchTerm}
                    onChange={handleChangeSearch}
                />
                <Table dataSource={filteredUsers} columns={columns} pagination={{ position: ['bottomCenter'], pageSize: 8 }} rowKey={(data) => data.id} />
            </div>

            <ModalUser />
        </div>
    )
}

export default Users