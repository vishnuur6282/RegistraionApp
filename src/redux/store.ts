import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './reducers/signupReducer/index';

export default configureStore({
  reducer: {users: counterReducer},
});
