import {useState} from "react";
import FormDialog from "./FormDialog.tsx";
import ActionButton from "./ActionButton.tsx";
import SideBar from "./SideBar.tsx";
import {TodoItem} from "./TodoItem.tsx";
import ToolBar from "./ToolBar.tsx";
import {createTheme, GlobalStyles, ThemeProvider} from "@mui/material";
import {indigo, pink} from "@mui/material/colors";
import QR from "./QR.tsx";
import AlertDialog from "./AlertDialog.tsx";

const theme = createTheme({
    palette: {
        primary: {
            main: indigo[500],
            light: '#757de8',
            dark: '#002984',
        },
        secondary: {
            main: pink[500],
            light: '#ff6090',
            dark: '#b0003a',
        },
    }
})

const App = () => {
    // 初期値；空文字列
    const [text, setText] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<Filter>('all');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [qrOpen, setQrOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    const handleSubmit = () => {
        if (!text) {
            // 何も入力されなかったとき
            setDialogOpen((dialogOpen) => !dialogOpen);
            return;
        }

        const newTodo: Todo = {
            value: text,
            id: new Date().getTime(),
            checked: false,
            removed: false,
        }

        setTodos((todos) => [newTodo, ...todos]);
        setText('');
        // FormDialog コンポーネントを閉じる
        setDialogOpen((dialogOpen) => !dialogOpen );
    }

    const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
        id: number,
        key: K,
        value: V,
    ) => {
        setTodos((todos) => {
            return todos.map((todo) => {
                if (todo.id === id) {
                    return {...todo, [key]: value};
                } else {
                    return todo;
                }
            });
        });
    };

    const handleSort = (filter: Filter) => {
        setFilter(filter);
    }

    const handleEmpty = () => {
        setTodos((todos) => todos.filter((todo) => !todo.removed));
    }

    const handleToggleDrawer = () => {
        setDrawerOpen((drawerOpen) => !drawerOpen );
    }

    const handleToggleQR = () => {
        setQrOpen((qrOpen) => !qrOpen);
    }

    const handleToggleDialog = () => {
        setDialogOpen((dialogOpen) => !dialogOpen);
        setText('');
    }

    const handleToggleAlert = () => {
        setAlertOpen((alertOpen) => !alertOpen);
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
            <ToolBar filter={filter} onToggleDrawer={handleToggleDrawer} />
            <SideBar
                drawerOpen={drawerOpen}
                onToggleQR={handleToggleQR}
                onToggleDrawer={handleToggleDrawer}
                onSort={handleSort}
            />
            <QR open={qrOpen} onClose={handleToggleQR}/>
            <FormDialog
                text={text}
                dialogOpen={dialogOpen}
                onSubmit={handleSubmit}
                onChange={handleChange}
                onToggleDialog={handleToggleDialog}
            />
            <AlertDialog
                alertOpen={alertOpen}
                onEmpty={handleEmpty}
                onToggleAlert={handleToggleAlert} />
            <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
            <ActionButton
                todos={todos}
                filter={filter}
                alertOpen={alertOpen}
                dialogOpen={dialogOpen}
                onToggleAlert={handleToggleAlert}
                onToggleDialog={handleToggleDialog}
            />
        </ThemeProvider>
    );
};
export default App;