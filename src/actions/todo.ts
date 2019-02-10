import { Todo, TodoAction, TodoActionType } from "../model/model"

export function addTodo(todo: Todo): TodoAction<Todo> {
  return {
    type: TodoActionType.ADD_TODO,
    payload: todo,
  }
}

// Async Function expample with redux-thunk
export function completeTodo(todoId: number) {
  // here you could do API eg

  return (dispatch: Function, getState: Function) => {
    dispatch({ type: TodoActionType.COMPLETE_TODO, payload: todoId })
  }
}

export function uncompleteTodo(todoId: number): TodoAction<number> {
  return {
    type: TodoActionType.UNCOMPLETE_TODO,
    payload: todoId,
  }
}

export function deleteTodo(todoId: number): TodoAction<number> {
  return {
    type: TodoActionType.DELETE_TODO,
    payload: todoId,
  }
}
