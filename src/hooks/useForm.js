import { useState } from "react";

export default function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);
    console.log(values)
    const handleChanges = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    }

    return [values, handleChanges];
}