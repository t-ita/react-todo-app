import React from "react";
import {Button, Dialog, DialogActions, TextField} from "@mui/material";

type Props = {
    text: string;
    dialogOpen: boolean;
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onToggleDialog: () => void;
}

const FormDialog = (props: Props) => (
    <Dialog fullWidth open={props.dialogOpen} onClose={props.onToggleDialog}>
        <form
            onSubmit={(e) => {
                e.preventDefault();
                props.onSubmit();
            }}
        >
            <div style={{ margin: '1em' }}>
                <TextField
                    aria-label="todo-input"
                    variant="standard"
                    style={{
                        width: '100%',
                        fontSize: '16px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
                    }}
                    label="タスクを入力..."
                    onChange={(e) => props.onChange(e)}
                    value={props.text}
                    autoFocus
                />
                <DialogActions>
                    <Button
                        aria-label="form-add"
                        color="secondary"
                        onClick={props.onSubmit}
                    >
                        追加
                    </Button>
                </DialogActions>
            </div>
        </form>
    </Dialog>);
export default FormDialog;
