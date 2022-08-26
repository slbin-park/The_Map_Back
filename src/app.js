import express from "express";
import cors from "cors";
import routing from "./routes/router.js";

const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './build')));
app.get("/test/aws", (req, res) => {
    console.log('접속했냐')
    res.send('아마존 테스트 성공')
})
app.use("/api", routing);
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './build/index.html'));
});
export default app;
