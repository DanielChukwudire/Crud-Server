import express, { Application, Response, Request } from "express";

interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

const app: Application = express();
const port = 3000;

let users: User[] = [];

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "user gotten successfully", data: users });
});

app.post("/", (req: Request<User>, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const checkIFUserExists = users.findIndex((e) => e.email === email);

  if (checkIFUserExists !== -1) {
    res.status(409).json({ message: "User already exists" });
  }
  if (firstName && lastName && email && password) {
    const newUser: User = {
      id: users.length + 1,
      firstName,
      lastName,
      email,
      password,
    };
    users.push(newUser);
    res
      .status(200)
      .json({ message: "User created successfully", data: newUser });
  } else {
    res.status(400).json({ message: "All fields are required" });
  }
});

app.patch("/", (req: Request<User>, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const findUser = users.find((e) => e.email === email);

  if (findUser) {
    if (firstName) findUser.firstName = firstName;
    if (lastName) findUser.lastName = lastName;
    if (password) findUser.password = password;
  } else {
    return res.status(404).json({ message: "User not founded" });
  }
  res
    .status(200)
    .json({ message: "User updated successfully", data: findUser });
});
app.listen(port, () => {
  console.log(`server is here on http://localhost:${port}`);
});
