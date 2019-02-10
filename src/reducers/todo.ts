import { Todo, TodoAction, TodoActionType } from "../model/model"
import { createReducer2 } from "./createReducer"

export const todoList = createReducer2([], {
  [TodoActionType.ADD_TODO](state: Array<Todo>, action: TodoAction<Todo>): Todo[] {
    return [...state, action.payload]
  },
  [TodoActionType.COMPLETE_TODO](state: Array<Todo>, action: TodoAction<number>): Todo[] {
    // search after todo item with the given id and set completed to true
    return state.map(t => (t.id === action.payload ? { ...t, completed: true } : t))
  },
  [TodoActionType.UNCOMPLETE_TODO](state: Array<Todo>, action: TodoAction<number>): Todo[] {
    // search after todo item with the given id and set completed to false
    return state.map(t => (t.id === action.payload ? { ...t, completed: false } : t))
  },
  [TodoActionType.DELETE_TODO](state: Array<Todo>, action: TodoAction<number>): Todo[] {
    // remove all todos with the given id
    return state.filter(t => t.id !== action.payload)
  },
})
