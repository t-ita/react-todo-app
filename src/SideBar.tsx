import {
    Avatar,
    Divider,
    Drawer,
    Icon,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled
} from "@mui/material";
import {indigo, lightBlue, pink} from "@mui/material/colors";
import pjson from '../package.json';

type Props = {
    drawerOpen: boolean;
    onToggleDrawer: () => void;
    onSort: (filter: Filter) => void;
}

const DrawerList = styled('div')(() => ({
    width: 250,
}));

const DrawerHeader = styled('div')(() => ({
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: indigo[500],
    color: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

const DrawerAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: pink[500],
    width: theme.spacing(6),
    height: theme.spacing(6),
}));

const SideBar = (props: Props) => (
    <Drawer
        variant="temporary"
        open={props.drawerOpen}
        onClose={props.onToggleDrawer}
    >
        <DrawerList role="presentation" onClick={props.onToggleDrawer}>
            <DrawerHeader>
                <DrawerAvatar>
                    <Icon>create</Icon>
                </DrawerAvatar>
                <p>TodoApp version: {pjson.version}</p>
            </DrawerHeader>
        </DrawerList>
        <List>
            <ListItem disablePadding>
                <ListItemButton
                    aria-label="list-all"
                    onClick={() => props.onSort('all')}
                >
                    <ListItemIcon>
                        <Icon>subject</Icon>
                    </ListItemIcon>
                    <ListItemText secondary="すべてのタスク"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton
                    aria-label="list-unchecked"
                    onClick={() => props.onSort('unchecked')}
                >
                    <ListItemIcon>
                        <Icon sx={{ color: lightBlue[500]}}>radio_button_unchecked</Icon>
                    </ListItemIcon>
                    <ListItemText secondary="現在のタスク"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton
                    aria-label="list-checked"
                    onClick={() => props.onSort('checked')}
                >
                    <ListItemIcon>
                        <Icon sx={{ color: pink.A200}}>check_circle_outline</Icon>
                    </ListItemIcon>
                    <ListItemText secondary="完了したタスク"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton
                    aria-label="list-removed"
                    onClick={() => props.onSort('removed')}
                >
                    <ListItemIcon>
                        <Icon>delete</Icon>
                    </ListItemIcon>
                    <ListItemText secondary="ごみ箱"/>
                </ListItemButton>
            </ListItem>
            <Divider />
        </List>
    </Drawer>
)
export default SideBar;