import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon as PencilSquareIconSolid } from "@heroicons/react/24/solid";
import FormUser from "./FormUser";
import useApp from "../hooks/useApp";
import Spinner from "./Spinner";


function ModalUser() {

    const {
        modalUser,
        handleModalUser,
        isEditingUser,
        currentUser,
        isLoadingOptions
    } = useApp();

    const title = currentUser.id ? isEditingUser ? 'Editar Usuario' : 'Ver Usuario' : 'Crear Usuario'

    return (
        <Transition.Root show={modalUser} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalUser}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-neutral-80 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="rounded-md text-neutral-700 hover:text-neutral-900 focus:outline-none"
                                    onClick={handleModalUser}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <XCircleIcon className="h-6 w-6" />
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="div" className="flex gap-4 border-b border-neutral-300 pb-2">

                                        <h1 className="text-2xl text-neutral-900 font-bold">{title}</h1>

                                    </Dialog.Title>

                                    {
                                        isLoadingOptions ? <Spinner /> : (
                                            <div className="mt-5">
                                                {
                                                    currentUser.id ? <FormUser editMode={true} /> : <FormUser editMode={false} />
                                                }

                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalUser