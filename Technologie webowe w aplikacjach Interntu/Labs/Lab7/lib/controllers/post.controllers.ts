import Controller from '../interfaces/controller.interface';
import PostModel from '../models/PostModel';
import { Request, Response, NextFunction, Router } from 'express';


class PostController implements Controller {
    public path = '/api/posts';
    public pathSinglePost = '/api/post';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getPosts);
        this.router.get(this.pathSinglePost, this.getSinglePost);
        this.router.post(this.path, this.createPost);
    }

    private getPosts = async (request: Request, response: Response) => {
        try {
            const posts = await PostModel.find({}); // findAll
            // Odpowiedź JSON z obiektami postów
            response.json(posts);
        } catch (error) {
            // Obsługa błędów
            console.error('Błąd podczas pobierania postów:', error);
            response.status(500).json({ error: 'Wystąpił błąd podczas pobierania postów' });
        }
    };

    private getSinglePost = async (request: Request, response: Response) => {
        try {
            const posts = await PostModel.find({ title: 'Post 1' }); // find by title

            response.json(posts);
        } catch (error) {

            console.error('Błąd podczas pobierania postów:', error);
            response.status(500).json({ error: 'Wystąpił błąd podczas pobierania postów' });
        }
    };

    private createPost = async (request: Request, response: Response) => {
        const { title, text, image } = request.body;

        try {
            const newPost = new PostModel({ title, text, image });
            await newPost.save();
            response.status(201).json(newPost);
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({ error: 'Error occurred' });
        }
    };
}

export default PostController;