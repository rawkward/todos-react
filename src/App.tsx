import { useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const remaining = tasks.filter((task) => !task.completed).length;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <h1>todos</h1>
      <div>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Название задачи"
        />
        <button onClick={addTask}>Добавить</button>
      </div>

      <div data-testid="all-tasks-section">
        <h3>Все задачи ({tasks.length})</h3>
        <TaskList tasks={tasks} onToggle={toggleTask} />
      </div>

      <div data-testid="remaining-section">
        <h3>Готово ({remaining})</h3>
        <TaskList
          tasks={tasks.filter((t) => !t.completed)}
          onToggle={toggleTask}
        />
      </div>

      <div data-testid="completed-section">
        <h3>Не готово ({tasks.length - remaining})</h3>
        <TaskList
          tasks={tasks.filter((t) => t.completed)}
          onToggle={toggleTask}
        />
      </div>

      <button onClick={clearCompleted} disabled={tasks.length === remaining}>
        Очистить список готовых задач
      </button>
    </div>
  );
}

function TaskList({
  tasks,
  onToggle,
}: {
  tasks: Task[];
  onToggle: (id: number) => void;
}) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} style={{ listStyle: "none" }}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
