import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {TextField} from "@mui/material";
import {IconButton} from "@mui/material/";
import {AddBoxRounded} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('additemform is called')
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }, [])
    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addTask();
        }
    }, [])
    const addTask = useCallback(() => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }, [props.addItem, title.trim()])
    return (
        <div>
            <TextField label={'Enter text'}
                       variant={'standard'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton color='secondary' onClick={addTask}><AddBoxRounded fontSize={'large'}/></IconButton>
        </div>
    )
})

export default AddItemForm;