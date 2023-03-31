

function Alert({ alert }) {
    return (
        <div
            className={`${alert.error === true ? 'from-red-500 to-red-600' : 'from-sky-600 to-sky-700'} bg-gradient-to-br text-center p-3 
            rounded text-white mb-5 font-bold uppercase text-sm`}
        >
            {alert.msg}
        </div>
    )
}

export default Alert