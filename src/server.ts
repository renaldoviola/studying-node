import express, { Request, Response, NextFunction } from "express";
import cors from 'cors';

import 'express-async-errors';

import routes from "./routes";
import 'reflect-metadata';
import AppError from './errors/AppError';

import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use(cors);
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// Tratamento de erros global.

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })

});


app.get("/", (request, response) => {
  return response.json({ message: "Renaldo Viola" });
});

app.listen(3333, () => {
  console.log("Server started on port 3333...");
});
