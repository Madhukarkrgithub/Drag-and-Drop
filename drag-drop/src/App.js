import { useState } from "react";
import "./App.css";

function App() {
  const TODO = "TODO";
  const PROGRESS = "PROGRESS"; 
  const REVIEW = "REVIEW";
  const DONE = "DONE"; 

  const [value, setValue] = useState("");
  const [task, setTask] = useState([]);
  const [dragTask, setDragTask] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      // Enter key pressed
      if (updateItem) {
        // user is coming for an update
        const obj = {
          title: value,
          id: updateItem.id,
          status: updateItem.status,
        };
        const copyTask = [...task];
        const filerList = copyTask.filter((item) => item.id !== updateItem.id);
        setTask((prevTask) => [...filerList, obj]);
        setUpdateItem(null);
      } else {
        const obj = {
          title: value,
          status: TODO,
          id: Date.now(),
        };
        setTask((prevTask) => [...prevTask, obj]);
      }
      setValue("");
    }
  };

  const handleDrag = (e, task) => {
    e.preventDefault(); // To improve UX
    setDragTask(task);
  };

  const handleDragDrop = (status) => {
    let copyTask = [...task];
    copyTask = copyTask.map((item) => {
      if (dragTask.id === item.id) {
        item.status = status;
      }
      return item;
    });
    setTask(copyTask);
    setDragTask(null);
  };

  const handleDrop = (e) => {
    const status = e.target.getAttribute("data-status");
    if (status === TODO) {
      handleDragDrop(TODO);
    } else if (status === PROGRESS) {
      // Fixed typo
      handleDragDrop(PROGRESS);
    } else if (status === REVIEW) {
      handleDragDrop(REVIEW);
    } else if (status === DONE) {
      handleDragDrop(DONE);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };
  const deleteTask = (item) => {
    let copyTask = [...task];
    copyTask = copyTask.filter((task) => task.id !== item.id);
    setTask(copyTask);
  };
  const updateTask = (task) => {
    setUpdateItem(task);
    setValue(task.title);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <input
        onChange={handleChange}
        type="text"
        value={value}
        onKeyDown={handleKeyDown}
      />

      <div className="board">
        <div
          className="todo"
          onDrop={handleDrop}
          onDragOver={onDragOver}
          data-status={TODO} 
        >
          <h2 className="todo-col">Todo</h2>
          {task.length > 0 &&
            task.map(
              (task) =>
                task.status === TODO && (
                  <div
                    onDrag={(e) => handleDrag(e, task)}
                    draggable
                    key={task.id}
                    className="task-item"
                  >
                    {task.title}
                    <div>
                      <span className="btn" onClick={() => updateTask(task)}>
                        ✏️
                      </span>
                      <span onClick={(e) => deleteTask(task)} className="btn">
                        ✖
                      </span>
                    </div>
                  </div>
                )
            )}
        </div>

        <div
          className="in-progress"
          data-status={PROGRESS} 
          onDrop={handleDrop}
          onDragOver={onDragOver}
        >
          <h2 className="in-progress-col">In Progress</h2>
          {task.length > 0 &&
            task.map(
              (task) =>
                task.status === PROGRESS && (
                  <div
                    onDrag={(e) => handleDrag(e, task)}
                    draggable
                    key={task.id}
                    className="task-item"
                  >
                    {task.title}
                    <div>
                      <span className="btn" onClick={() => updateTask(task)}>
                        ✏️
                      </span>
                      <span onClick={(e) => deleteTask(task)} className="btn">
                        ✖
                      </span>
                    </div>
                  </div>
                )
            )}
        </div>

        <div
          className="review"
          data-status={REVIEW} 
          onDrop={handleDrop}
          onDragOver={onDragOver}
        >
          <h2 className="review-col">Review</h2>
          {task.length > 0 &&
            task.map(
              (task) =>
                task.status === REVIEW && (
                  <div
                    onDrag={(e) => handleDrag(e, task)}
                    draggable
                    key={task.id}
                    className="task-item"
                  >
                    {task.title}
                    <div>
                      <span className="btn" onClick={() => updateTask(task)}>
                        ✏️
                      </span>
                      <span onClick={(e) => deleteTask(task)} className="btn">
                        ✖
                      </span>
                    </div>
                  </div>
                )
            )}
        </div>

        <div
          className="done"
          data-status={DONE} 
          onDrop={handleDrop}
          onDragOver={onDragOver}
        >
          <h2 className="done-col">Done</h2>
          {task.length > 0 &&
            task.map(
              (task) =>
                task.status === DONE && (
                  <div
                    onDrag={(e) => handleDrag(e, task)}
                    draggable
                    key={task.id}
                    className="task-item"
                  >
                    {task.title}
                    <div>
                      <span className="btn" onClick={() => updateTask(task)}>
                        ✏️
                      </span>
                      <span onClick={(e) => deleteTask(task)} className="btn">
                        ✖
                      </span>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
