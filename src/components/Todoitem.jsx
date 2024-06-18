import React, { useState } from 'react'
import { useTodo } from '../context';

function Todoitem({ todo }) {
    const [toDoEditable, setToDoEditable] = useState(false);
    const [todoMessage, setTodoMessage] = useState(todo.todo);
    const { updateTodo, removeTodo, completedTodo } = useTodo();

    function editTodo() {
        updateTodo(todo.id, { ...todo, todo: todoMessage });
        setToDoEditable(false)
    }

    function toggleComplete(){
        completedTodo(todo.id);
    }
    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
                }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleComplete}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${toDoEditable ? "border-black/10 px-2" : "border-transparent"
                    } ${todo.completed ? "line-through" : ""}`}
                value={todoMessage}
                onChange={(e) => setTodoMessage(e.target.value)}
                readOnly={!toDoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (toDoEditable) {
                        editTodo();
                    } else setToDoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {toDoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => removeTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    )
}

export default Todoitem