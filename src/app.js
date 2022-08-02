import express from "express";
import cors from "cors";
import routing from "./routes/router.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routing);

export default app;
