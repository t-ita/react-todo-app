import {AppBar, Box, Icon, IconButton, Toolbar, Typography} from "@mui/material";

type Props = {
    filter: Filter,
    onToggleDrawer: () => void
}

const translator = (arg: Filter) => {
    switch (arg) {
        case 'all':
            return 'すべてのタスク';
        case 'unchecked':
            return '現在のタスク';
        case "checked":
            return '完了したタスク';
        case 'removed':
            return 'ごみ箱';
        default:
            return 'TODO';
    }
}

const ToolBar = (props: Props) => (
    <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    aria-label="menu-botton"
                    size="large"
                    edge="start"
                    color="inherit"
                    sx={{mr: 2}}
                    onClick={props.onToggleDrawer}
                >
                    <Icon>menu</Icon>
                </IconButton>
                <Typography>{translator(props.filter)}</Typography>
            </Toolbar>
        </AppBar>
    </Box>
);
export default ToolBar;