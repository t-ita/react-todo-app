import React from "react";

type Props = {
    text: string;
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormDialog = (props: Props) => (
    <form onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit();
    }}>
        <input
            type="text"
            value={props.text}
            onChange={props.onChange}/>
        <input
            type="submit"
            value="追加"
            onSubmit={props.onSubmit}
        />
    </form>
);
export default FormDialog;
