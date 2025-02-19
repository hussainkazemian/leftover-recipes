import { Database } from 'sqlite3';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  name: string;
  family_name: string;
  contact_number?: string;
  profession?: string;
  age?: number;
  role?: string;
  created_at?: Date;
}

export class UserModel {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  public create(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO users (username, email, password, name, family_name, contact_number, profession, age, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const params = [
        user.username,
        user.email,
        user.password,
        user.name,
        user.family_name,
        user.contact_number,
        user.profession,
        user.age,
        user.role || 'user',
      ];
      this.db.run(sql, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ ...user, id: this.lastID });
      });
    });
  }

  // Add other methods like get, update, delete as needed
}