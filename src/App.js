import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask("");
        }
    };
    const toggleTask = (id) => {
        setTasks(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
    };
    const clearCompleted = () => {
        setTasks(tasks.filter((task) => !task.completed));
    };
    const remaining = tasks.filter((task) => !task.completed).length;
    return (_jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            padding: "20px",
        }, children: [_jsx("h1", { children: "todos" }), _jsxs("div", { children: [_jsx("input", { value: newTask, onChange: (e) => setNewTask(e.target.value), onKeyDown: (e) => e.key === "Enter" && addTask(), placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438" }), _jsx("button", { onClick: addTask, children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C" })] }), _jsxs("div", { "data-testid": "all-tasks-section", children: [_jsxs("h3", { children: ["\u0412\u0441\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 (", tasks.length, ")"] }), _jsx(TaskList, { tasks: tasks, onToggle: toggleTask })] }), _jsxs("div", { "data-testid": "remaining-section", children: [_jsxs("h3", { children: ["\u0413\u043E\u0442\u043E\u0432\u043E (", remaining, ")"] }), _jsx(TaskList, { tasks: tasks.filter((t) => !t.completed), onToggle: toggleTask })] }), _jsxs("div", { "data-testid": "completed-section", children: [_jsxs("h3", { children: ["\u041D\u0435 \u0433\u043E\u0442\u043E\u0432\u043E (", tasks.length - remaining, ")"] }), _jsx(TaskList, { tasks: tasks.filter((t) => t.completed), onToggle: toggleTask })] }), _jsx("button", { onClick: clearCompleted, disabled: tasks.length === remaining, children: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0433\u043E\u0442\u043E\u0432\u044B\u0445 \u0437\u0430\u0434\u0430\u0447" })] }));
}
function TaskList({ tasks, onToggle, }) {
    return (_jsx("ul", { children: tasks.map((task) => (_jsx("li", { style: { listStyle: "none" }, children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: task.completed, onChange: () => onToggle(task.id) }), _jsx("span", { style: {
                            textDecoration: task.completed ? "line-through" : "none",
                        }, children: task.text })] }) }, task.id))) }));
}
