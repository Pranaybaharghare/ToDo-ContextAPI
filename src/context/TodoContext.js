import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todo:[
        {
            id:1,
            todo:"message",
            completed:false
        }
    ],
    addTodo: (todo)=>{},
    updateTodo: (id, todo)=>{},
    removeTodo: (id)=>{},
    completedTodo:(id)=>{}

});

export const TodoContextProvider = TodoContext.Provider;

export function useTodo(){
    return useContext(TodoContext)
}
