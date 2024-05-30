import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled} from "@mui/material";

type Props = {
    alertOpen: boolean;
    onEmpty: () => void;
    onToggleAlert: () => void;
}

const Alert = styled(Dialog)(() => ({
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}))

const AlertDialog = (props: Props) => (
    <Alert open={props.alertOpen} onClose={props.onToggleAlert}>
        <DialogTitle>アラート</DialogTitle>
        <DialogContent>
            <DialogContentText>本当にごみ箱を空にしますか？</DialogContentText>
            <DialogContentText>この操作は取り消しできません</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                aria-label="alert-cancel"
                onClick={props.onToggleAlert}
                color="primary"
            >
                キャンセル
            </Button>
            <Button
                aria-label="alert-ok"
                onClick={() => {
                    props.onToggleAlert();
                    props.onEmpty();
                }}
                color="secondary"
                autoFocus
            >
                OK
            </Button>

        </DialogActions>
    </Alert>
)
export default AlertDialog;