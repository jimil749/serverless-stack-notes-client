import { useState } from 'react';

export function useFormFields (initialState) {
    const [fields, setFieldValues] = useState(initialState);    

    return [
        fields,
        function(event) {
            setFieldValues({
                ...fields,
                [event.target.id]: event.target.value
            });
        }
    ];
}