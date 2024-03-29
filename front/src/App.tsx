import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { getAllMesages } from './store/slice/MessageSlice';
import axios from 'axios';
import MessagesList from './components/MessageList';
import { Button, TextField } from '@mui/material';

function App() {
  const { messages } = useAppSelector((state) => state.messagesSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllMesages());
  }, [dispatch]);

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await axios.post('http://localhost:8000/messages/', formData);
  };

  return (
    <>
    <form onSubmit={onHandleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', marginTop: '20px' }}>
      <TextField
        type="file"
        name="file"
        variant="outlined"
        style={{ margin: '10px 0' }}
      />
      <TextField
        label="Message"
        name="message"
        required
        variant="outlined"
        style={{ margin: '10px 0' }}
      />
      <TextField
        label="Author"
        name="author"
        variant="outlined"
        style={{ margin: '10px 0' }}
      />
      <Button type="submit" variant="contained" color="primary">
        Отправить
      </Button>
    </form>
    <MessagesList messages={messages} />
  </>
  );
}

export default App;
