import { useEffect, useState } from "react";

export default function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);
    
    useEffect(() => {
        setValues(initialValues);
    }, []);

    const handleChanges = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    }

    return [values, handleChanges, setValues];
}