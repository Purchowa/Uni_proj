import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import * as http from 'http';
import { Server } from 'socket.io';
import { config } from './config';
import Controller from './interfaces/controller.interface';
import ChatController from './controllers/chat.controller';

class App {
  public app: express.Application;
  public httpServer: http.Server;
  public io: Server;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.io = new Server(this.httpServer, {
      cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
      },
    });


    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeSockets();
    this.connectToDatabase();
  }

  private initializeSockets(): void {
    console.log('Sockets work');

    const chatController = new ChatController(this.io);
    chatController.initializeRoutes(this.app);
  }


  public listen(): void {
    this.httpServer.listen(config.port, () => {
      console.log(`App listening on the port ${config.port}`);
    });

  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
    this.app.use(express.static("'../../../build"));
    this.app.use(morgan('dev'));
    this.app.use(cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 204,
      allowedHeaders: 'Content-Type,Authorization',
    }));
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }


  private connectToDatabase(): void {
    mongoose.connect(config.databaseUrl);

    const db = mongoose.connection;

    db.on('error', (error: any) => {
      console.error('Error connection - MongoDB:', error);
    });

    db.once('open', () => {
      console.log('Connect with database established');
    });
  }

}
export default App;
