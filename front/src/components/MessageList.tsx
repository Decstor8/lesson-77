import React from 'react';
import { IMessage } from '../types'; // Предполагаем, что вы определили интерфейс IMessage для типизации
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

interface MessagesListProps {
  messages: IMessage[];
}

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  return (
    <>
        <Grid container spacing={2}>
      {messages.map((message) => (
        <Grid item key={message.id} xs={12} sm={6} md={4}>
          <Card>
            {message.image && (
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:8000/${message.image}`}
                alt="User uploaded"
              />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {message.message}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Author: {message.author}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default MessagesList;
