import {createReducer, on, Action} from '@ngrx/store'


import {
  registerAction,
  registerSuccessAction,
  registerFailureAction
} from 'src/app/auth/store/actions/register.action'
import { AuthStateInterface } from 'src/app/shared/types/interfaces'


// Инициализируем состояние
const initialState: AuthStateInterface = {
  currentUser: null,
  isLoggedIn: false,
  isSubmitting: false,
};



// Обработчик Начала регистрации
const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),

  
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  )
)




// Вызываем Reducer
export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}
