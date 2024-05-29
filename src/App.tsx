import {useState} from "react";
import FormDialog from "./FormDialog.tsx";
import ActionButton from "./ActionButton.tsx";
import SideBar from "./SideBar.tsx";
import {TodoItem} from "./TodoItem.tsx";
import ToolBar from "./ToolBar.tsx";
import {createTheme, GlobalStyles, ThemeProvider} from "@mui/material";
import {indigo, pink} from "@mui/material/colors";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const handleSubmit = () => {
        if (!text) return;

        const newTodo: Todo = {
            value: text,
            id: new Date().getTime(),
            checked: false,
            removed: false,
        }

        setTodos((todos) => [newTodo, ...todos]);
        setText('');
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

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
            <ToolBar filter={filter} onToggleDrawer={handleToggleDrawer} />
            <SideBar
                drawerOpen={drawerOpen}
                onToggleDrawer={handleToggleDrawer}
                onSort={handleSort} />
            <FormDialog text={text} onSubmit={handleSubmit} onChange={handleChange} />
            <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
            <ActionButton onEmpty={handleEmpty} todos={todos} />
        </ThemeProvider>
    );
};
export default App;