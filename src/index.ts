import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectPostgres, psql } from "./database/db";
import { routes } from "./routes/routes";
import * as cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectPostgres();

app.use(cors.default())

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server LIVE RELOAD");
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', routes());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});