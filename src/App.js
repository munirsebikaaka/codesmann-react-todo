import { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todoNew, setTodoNew] = useState([]);
  const [todoComplete, setTodoComplete] = useState([]);
  // const [condition, setCondion] = useState(true);
  // let condition = false;

  function hundleTodosInFormComponet(e) {
    e.preventDefault();
    todoNew.push({ task: todo, addB: "TIC", remB: "EX", state: false });

    setTodo("");
  }
  function pushToComplete() {
    todoNew.map((el) => el.state === true);
  }

  return (
    <div>
      <FormTodo
        onTodo={todo}
        onSetTodo={setTodo}
        onHundleTodosInFormComponet={hundleTodosInFormComponet}
      />
      <NewToDos onNewTodos={todoNew} hundlePushToComplete={pushToComplete} />
      <CompletedTodos onTodoComplete={todoComplete} onNewTodos={todoNew} />
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
function NewToDos({ onNewTodos, hundlePushToComplete }) {
  return (
    <div>
      <h1 className="todotype">New todos</h1>
      <ul>
        {onNewTodos.map((el) => (
          <li key={el.task}>
            {el.task}
            <button onClick={hundlePushToComplete}>{el.addB}</button>
            <button>{el.remB}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
function CompletedTodos({ onTodoComplete, onCondition, onNewTodos }) {
  return (
    <div>
      <h1 className="todotype">Completed todos</h1>
      <ul>
        {onNewTodos.map((el) =>
          el.state === true ? <li key={el.task}>{el.task}</li> : ""
        )}
      </ul>
    </div>
  );
}

export default App;
