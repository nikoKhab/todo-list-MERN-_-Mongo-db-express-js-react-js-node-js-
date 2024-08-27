// import { FcApproval } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
import './App.css';

function App() {
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await fetch('http://localhost:3000/tasks');
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.log(err);
      }
    };
    getTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/create/${inputRef.current.value}`, {
        method: 'POST',
      });
      const data = await res.json();
      setTasks([...tasks, data]);
    } catch (err) {
      console.log(err);
    }
    inputRef.current.value = '';
    inputRef.current.focus();
  };

  const deleteTask = async (task) => {
    try {
      await fetch(`http://localhost:3000/tasks/delete/${task._id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter((t) => t._id !== task._id));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleDone = async (task) => {
    try {
      await fetch(`http://localhost:3000/tasks/update/${task._id}`, {
        method: 'PUT',
      });
      setTasks(
        tasks.map((t) =>
          t._id === task._id ? { ...t, isDone: !t.isDone } : t
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="main">
        <div className="input-container">
          <input ref={inputRef} className="input" type="text" />
          <button onClick={handleAddTask} className="addBtn">
            Add Task
          </button>
        </div>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task, index) => (
              <li
                key={index}
                className={task.isDone ? 'done' : 'task'}
              >
                {task.title}
                <div className="btnCont">
                  <button
                    onClick={() => deleteTask(task)}
                    className="deleteBtn"
                  >
                    Delete
                  </button>
                  {!task.isDone ? (
                    <button
                      onClick={() => toggleDone(task)}
                      className="doneBtn"
                    >
                      mark done
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleDone(task)}
                      className="undoneBtn"
                    >
                      mark undone
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <h2>No tasks found</h2>
        )}
      </div>
    </>
  );
}

export default App;
