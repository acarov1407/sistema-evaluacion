import { useState } from "react";

function MyInput({ value, handleValue, data, index, autoFocus }) {

    const [rows, setRows] = useState(1);


    const handleChange = (e) => {
        const textareaLineHeight = 24;
        const previousRows = e.target.rows;
        e.target.rows = 1;
        const currentRows = Math.ceil(e.target.scrollHeight / textareaLineHeight);
        e.target.rows = previousRows;
        handleValue(e.target.value, index);
        if (!e.target.value) {
            setRows(1);
            return;
        }
        setRows(currentRows);
    }



    const handleBlur = (e) => {
        if (!e.target.value) {
            setRows(1);
        }
    }

    return (
        <textarea
            className="block border border-neutral-300 rounded-md py-2 px-3 flex-1 w-full focus:outline-none focus:border-blue-600 resize-none overflow-hidden"
            value={value}
            rows={rows}
            onChange={handleChange}
            onBlur={handleBlur}
            id={data.id}
            name={data.name}
            disabled={data.disabled}
            autoFocus={autoFocus}
            placeholder={data.placeholder}
            required
        />
    )
}

export default MyInput