import {useState} from "react";
import FormDialog from "./FormDialog.tsx";
import ActionButton from "./ActionButton.tsx";
import SideBar from "./SideBar.tsx";
import {TodoItem} from "./TodoItem.tsx";

const App = () => {
    // 初期値；空文字列
    const [text, setText] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<Filter>('all');

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


    return (
        <div>
            <SideBar onSort={handleSort} />
            <FormDialog text={text} onSubmit={handleSubmit} onChange={handleChange} />
            <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
            <ActionButton onEmpty={handleEmpty} todos={todos} />
        </div>
    );
};
export default App;