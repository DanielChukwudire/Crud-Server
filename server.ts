import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = 4500;

app.use(express.json());
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: string;
}

let users: User[] = [];

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Users gotten successfully", data: users });
});

app.post("/", (req: Request<{}, {}, User>, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = users.find((e) => e.email === email);

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  if (firstName && lastName && email && password) {
    const newUser: User = {
      id: users.length + 1,
      firstName,
      lastName,
      email,
      password,
      createdAt: new Date(),
    };
    users.push(newUser);

    return res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } else {
    return res.status(400).json({ message: "All fields are required." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
