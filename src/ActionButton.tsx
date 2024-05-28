type Props = {
    todos: Todo[];
    onEmpty: () => void;
}

const ActionButton = (props: Props) => {
    return <button
        onClick={props.onEmpty}
        disabled={props.todos.filter((todo) => todo.removed).length === 0}
    >
        ごみ箱を空にする
    </button>;
}
export default ActionButton;
