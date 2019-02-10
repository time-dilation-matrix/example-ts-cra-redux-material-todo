export interface Todo {
  id: number
  text: string
  completed: boolean
}

export enum TodoActionType {
  ADD_TODO,
  DELETE_TODO,
  COMPLETE_TODO,
  UNCOMPLETE_TODO,
}

export interface TodoAction<T> {
  type: TodoActionType
  payload: T
}
