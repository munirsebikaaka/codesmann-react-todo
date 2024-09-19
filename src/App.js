import { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todoNew, setTodoNew] = useState([]);
  function hundleTodosInFormComponet(e) {
    e.preventDefault();
    todoNew.push({
      task: todo,
      addB: "TIC",
      remB: "EX",
      id: Date.now(),
      state: false,
      cancel: false,
    });

    setTodo("");
  }
  function toggleState(id) {
    setTodoNew(
      todoNew.map((el) =>
        el.id === id ? { ...el, state: true, complete: false } : el
      )
    );
  }
  function moveToCancelled(id) {
    setTodoNew(
      todoNew.map((el) => (el.id === id ? { ...el, complete: true } : el))
    );
  }
  function redoTodos() {
    todoNew.map((el) => (el ? { ...el, id: Date.now(), state: false } : el));
  }
  function cancelAllTodos(id) {
    todoNew.map((el) => (el.id === id ? { ...el, cancel: true } : el));
  }
  return (
    <div>
      <FormTodo
        onTodo={todo}
        onSetTodo={setTodo}
        onHundleTodosInFormComponet={hundleTodosInFormComponet}
      />
      <div className="bord">
        <NewToDos
          onNewTodos={todoNew}
          hundleToggleState={toggleState}
          onHundleCancelAllTodos={cancelAllTodos}
        />
        <CompletedTodos
          onNewTodos={todoNew}
          onHundleMoveToCancelled={moveToCancelled}
        />
        <CancelledTodos onNewTodos={todoNew} onHundleRedoTodos={redoTodos} />
      </div>
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
function NewToDos({ onNewTodos, hundleToggleState, onHundleCancelAllTodos }) {
  return (
    <div>
      <h1 className="todotype">New todos</h1>
      <ul>
        {onNewTodos.map(
          (el) =>
            el.state === false && (
              <li key={el.task}>
                {el.task}
                <button onClick={() => hundleToggleState(el.id)}>
                  {el.addB}
                </button>
                <button onClick={() => onHundleCancelAllTodos(el.id)}>
                  {el.remB}
                </button>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
function CompletedTodos({ onNewTodos, onHundleMoveToCancelled }) {
  return (
    <div>
      <h1 className="todotype">Completed todos</h1>
      <ul>
        {onNewTodos.map(
          (el) =>
            el.state &&
            !el.complete && (
              <li key={el.task}>
                {el.task}
                <button onClick={() => onHundleMoveToCancelled(el.id)}>
                  {el.addB}
                </button>
                <button>{el.remB}</button>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
function CancelledTodos({ onNewTodos, onHundleRedoTodos }) {
  return (
    <div>
      <h1>Cancelled todos</h1>
      <ul>
        {onNewTodos.map((el) =>
          el.complete ? (
            <li>
              {el.task}
              <button onClick={onHundleRedoTodos}>{el.addB}</button>
              <button>{el.remB}</button>
            </li>
          ) : (
            el.cancel && (
              <li>
                {el.task}
                <button>{el.addB}</button>
                <button>{el.remB}</button>
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
}

export default App;
