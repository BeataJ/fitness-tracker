import { Action } from "@ngrx/store"

interface State {
  isLoading: boolean
}

const initialState: State = {
  isLoading: false
}

export function uiReducer(state = initialState, action: Action){

};
