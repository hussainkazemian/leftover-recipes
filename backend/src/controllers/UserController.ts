import { Request, Response, NextFunction } from 'express';
import { UserModel, User } from '../models/User';

export class UserController {
  private userModel: UserModel;

  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }

  public registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: User = req.body;
      const newUser = await this.userModel.create(user);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  // Add other methods like login, update, delete as needed
}