import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/auth/store/actionTypes'
import { User } from 'src/app/shared/types/interfaces'


export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{user: User}>()
)


export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ token: string }>()
);



export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ errors: any }>()
);
