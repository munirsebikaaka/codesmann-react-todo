import { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todoNew, setTodoNew] = useState([]);

  function hundleTodosInFormComponet(e) {
    e.preventDefault();
    todoNew.push({ task: todo, addB: "TIC", remB: "EX" });
    setTodo("");
  }

  return (
    <div>
      <FormTodo
        onTodo={todo}
        onSetTodo={setTodo}
        onHundleTodosInFormComponet={hundleTodosInFormComponet}
      />
      <NewToDos onNewTodos={todoNew} />
    </div>
  );
}
function FormTodo({ onTodo, onSetTodo, onHundleTodosInFormComponet }) {
  return (
    <div>
      <h1 className="todoname">The react todo app</h1>
      <form className="todoform" onSubmit={onHundleTodosInFormComponet}>
        <input
          type="text"
          value={onTodo}
          onChange={(e) => onSetTodo(e.target.value)}
          placeholder="Pleaase input task"
        />
        <button>ADD</button>
      </form>
    </div>
  );
}
function NewToDos({ onNewTodos }) {
  return (
    <ul>
      {onNewTodos.map((el) => (
        <li key={el.task}>
          {el.task}
          <button>{el.addB}</button>
          <button>{el.remB}</button>
        </li>
      ))}
    </ul>
  );
}

export default App;
