import { Todo, TodoAction } from "../model/model"

export default function createReducer(initialState: Object, handlers: Object) {
  return function reducer(state: Object = initialState, action: TodoAction<any>) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export function createReducer2(initialState: Todo[], handlers: Object) {
  return function reducer(state: Todo[] = initialState, action: TodoAction<any>): Todo[] {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
