import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { messagesApi } from '../../api/instance';

export const getAllMesages = createAsyncThunk<void>( 
    'meassges/gwtAll',
    async (_,{dispatch}) => {
        try {
            const data = await messagesApi.getMessages() 

            dispatch(setMessages(data.data))
        } catch (error) {
            
        };
    },
);
export interface messagesState {
  messages: Array<any>;
};

const initialState: messagesState = {
  messages : [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
  setMessages (state, actions){
    state.messages = actions.payload;
  },
    
  },
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;