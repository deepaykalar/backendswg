import express from 'express'
import { swaggerUiServe, swaggerUiSetup } from "./swagger.js";
import { getAllUsers, addUser } from "./services/userService.js";

const app = express();
app.use(express.json());

//swagger docs route

app.use("/api-docs", swaggerUiServe, swaggerUiSetup);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of all users
 *       500:
 *         description: Internal server error
 */


app.get("/users", (req, res) => {
  res.json(getAllUsers())
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fname
 *             properties:
 *               fname:
 *                 type: string
 *                 example: Deepa
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */


app.post("/users", (req, res) => {
  const { fname } = req.body;
  const newUser = addUser(fname);
  res.status(201).json(newUser);
});


app.listen(5000, (err) => {
  if (err) console.log(err)
  else console.log(5000)

})