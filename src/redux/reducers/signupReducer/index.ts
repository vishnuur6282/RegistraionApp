import {createSlice} from '@reduxjs/toolkit';
import {FormValuesType} from '../../../screens/registration';
import imagePaths from '../../../constants/images';
import {PURGE} from 'redux-persist';

interface stateType {
  users: FormValuesType[];
  currentUser: FormValuesType;
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: <stateType | any>{
    users: [],
    currentUser: {},
  },
  reducers: {
    onSigningUp: (state, action) => {
      const randomIndex = Math.floor(Math.random() * imagePaths.length);
      const newUser = {
        ...action.payload,
        imageUrl: imagePaths[randomIndex],
      };
      state.users = [...state.users, newUser];
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, state => {
      state.currentUser = {};
    });
  },
});

// Action creators are generated for each case reducer function
export const {onSigningUp, setCurrentUser, updateUsers} = counterSlice.actions;

export default counterSlice.reducer;
