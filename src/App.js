import { useState } from "react";
/*

*/
function App() {
  const [todo, setTodo] = useState("");
  const [todoNew, setTodoNew] = useState([]);
  const [todoComplete, setTodoComplete] = useState([]);
  const [todoCancelled, setTodoCancelled] = useState([]);
  function hundleTodosInFormComponet(e) {
    e.preventDefault();
    todoNew.push({
      task: todo,
      addB: "TIC",
      remB: "EX",
      id: Date.now(),
      state: false,
    });
    setTodo("");
  }
  function pushToCancelledFromNew() {
    setTodoNew(() =>
      todoNew.map((el) => {
        const index = todoNew.indexOf(el);
        todoNew.splice(index);
        todoCancelled.push(el);
      })
    );
  }
  function pushToComplete() {
    setTodoNew(() =>
      todoNew.map((el) => {
        const index = todoNew.indexOf(el);
        todoNew.splice(index);
        todoComplete.push(el);
      })
    );
  }

  function pushToCancelled() {
    setTodoComplete(() =>
      todoComplete.map((el) => {
        const index = todoComplete.indexOf(el);
        todoComplete.splice(index);
        todoCancelled.push(el);
      })
    );
  }
  function redoTodo() {
    setTodoCancelled(() =>
      todoCancelled.map((el) => {
        const index = todoCancelled.indexOf(el);
        todoCancelled.splice(index);
        todoNew.push(el);
      })
    );
  }
  function deleteTodo() {
    setTodoCancelled(() =>
      todoCancelled.map((el) => {
        const index = todoCancelled.indexOf(el);
        todoCancelled.splice(index);
      })
    );
  }
  return (
    <div>
      <Form
        onTodo={todo}
        onSetTodo={setTodo}
        onPushToNewTodos={hundleTodosInFormComponet}
      />
      <div className="bord">
        <NewTasks
          onTodoNew={todoNew}
          onPushToComplete={pushToComplete}
          onPushToCancelledFromNew={pushToCancelledFromNew}
        />
        <CompleteTasks
          onCompleteTask={todoComplete}
          onPushToCancelled={pushToCancelled}
        />
        <CancelledTodos
          onCancelled={todoCancelled}
          onRedoTodo={redoTodo}
          onDeleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}
function Form({ onTodo, onSetTodo, onPushToNewTodos }) {
  return (
    <form onSubmit={onPushToNewTodos}>
      <h1>todo new version</h1>
      <input
        type="text"
        value={onTodo}
        onChange={(e) => onSetTodo(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}

function NewTasks({ onTodoNew, onPushToComplete, onPushToCancelledFromNew }) {
  return (
    <div>
      <h1>new todos</h1>
      <ul>
        {onTodoNew.map((el) => (
          <li key={el.id}>
            {el.task}
            <button onClick={onPushToComplete}>{el.addB}</button>
            <button onClick={onPushToCancelledFromNew}>{el.remB}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
function CompleteTasks({ onCompleteTask, onPushToCancelled }) {
  return (
    <div>
      <h1>complete todos</h1>
      <ul>
        {onCompleteTask.map((el) => (
          <li key={el.task}>
            {el.task}
            <button onClick={onPushToCancelled}>{el.addB}</button>
            <button onClick={onPushToCancelled}>{el.remB}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
function CancelledTodos({ onCancelled, onRedoTodo, onDeleteTodo }) {
  return (
    <div>
      <h1>Cancelled todos</h1>
      <ul>
        {onCancelled.map((el) => (
          <li key={el.task}>
            {el.task}
            <button onClick={onRedoTodo}>{el.addB}</button>
            <button onClick={onDeleteTodo}>{el.remB}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
