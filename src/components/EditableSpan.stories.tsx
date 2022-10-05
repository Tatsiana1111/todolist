import React from "react";
import {action} from '@storybook/addon-actions'
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}


const onChangeCallback = action('Span was changed')


export const EditableSpanBaseExample = (props: any) => {
    return (<><EditableSpan title={'Title'} onChange={onChangeCallback}/></>)
}