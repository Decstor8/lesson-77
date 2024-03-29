import { Request, Response, Router } from 'express';
import { imagesUpload } from '../multer';
const fs = require('fs');
import { Message } from '../types';
const messagesRouter = Router();

messagesRouter.post('/',imagesUpload.single('file') ,async (req, res) => {
    const { message, author, } = req.body;
    
    if (!req.body.message) {
        return res.status(400).send({'error': 'Error'});
    }
    
    const newMessage: Message = {
        id: crypto.randomUUID(),
        message, 
        author : author || 'Anonumys', 
        image: req.file ? req.file.filename : null,
    };

    fs.readFile('db.json', (err: Error, data: string) => {
        if (err) {
            return res.status(500).json({error: 'Internal server error'});
        }

        const db = JSON.parse(data.toString() || '{}');
        db.messages = db.messages || [];
        db.messages.push(newMessage);

        fs.writeFile('db.json', JSON.stringify(db, null, 2), (err: Error) => {
            res.status(200).json(newMessage);
        });
    });
});

messagesRouter.get('/', (_, res: Response) => {
    fs.readFile('db.json', (err: Error, data: string) => {
        if (err) {
            return res.status(500).json({error: 'Внутренняя ошибка сервера'});
        };

        const db = JSON.parse(data.toString());
        let messages = db.messages || [];  
        res.json(messages);
    });
});

export default messagesRouter;