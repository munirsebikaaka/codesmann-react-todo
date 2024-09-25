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
        todoCancelled.splice(index, 1);
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
    <div>
      <h1 className="form-head">the react todo App</h1>

      <form className="todo-form" onSubmit={onPushToNewTodos}>
        <input
          className="type-input"
          type="text"
          placeholder="Please input your todo."
          value={onTodo}
          onChange={(e) => onSetTodo(e.target.value)}
        />
        <button className="btn todobtn">ADD</button>
      </form>
    </div>
  );
}

function NewTasks({ onTodoNew, onPushToComplete, onPushToCancelledFromNew }) {
  return (
    <div className="level-cell">
      <h1 className="heading heading-1">new todos</h1>
      {onTodoNew.length > 0 ? (
        <ul>
          {onTodoNew.map((el) => (
            <li key={el.id}>
              {el.task}
              <div>
                <button className="btn btn-1" onClick={onPushToComplete}>
                  {el.addB}
                </button>
                <button
                  className="btn btn-2"
                  onClick={onPushToCancelledFromNew}
                >
                  {el.remB}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="default">no todos available</h1>
      )}
    </div>
  );
}
function CompleteTasks({ onCompleteTask, onPushToCancelled }) {
  return (
    <div className="level-cell">
      <h1 className="heading heading-2">complete todos</h1>
      {onCompleteTask.length > 0 ? (
        <ul>
          {onCompleteTask.map((el) => (
            <li key={el.task}>
              {el.task}
              <div>
                <button className="btn btn-1" onClick={onPushToCancelled}>
                  {el.addB}
                </button>
                <button className="btn btn-2" onClick={onPushToCancelled}>
                  {el.remB}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="default">no todo available</h1>
      )}
    </div>
  );
}
function CancelledTodos({ onCancelled, onRedoTodo, onDeleteTodo }) {
  return (
    <div className="level-cell">
      <h1 className="heading heading-3">Cancelled todos</h1>
      {onCancelled.length > 0 ? (
        <ul>
          {onCancelled.map((el) => (
            <li key={el.task}>
              {el.task}
              <div>
                <button className="btn btn-1" onClick={onRedoTodo}>
                  {el.addB}
                </button>
                <button className="btn btn-2" onClick={onDeleteTodo}>
                  {el.remB}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="default">no todo available</h1>
      )}
    </div>
  );
}
export default App;
