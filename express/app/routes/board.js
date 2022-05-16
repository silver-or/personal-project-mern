import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import BoardService from "../services/board.js"

const corsOptions = {
    origin : process.env.ORIGIN,
    optionsSuccessStatus : 200
}

dotenv.config()
const app = express()
app.use(cors({
    origin:'*',
    credentials: 'true'
}))

app.use(function(_req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
      "Access-Control-Allow-Origin", "*"
    );
    next();
});

app.post('/write', cors(corsOptions), (req, res) => {
    // const service = new BoardService()
    // res.status(200).json(service.add(req, res))
    console.log("express write 진입")
    BoardService().write(req, res)
})

app.get('/list', cors(corsOptions), (req, res) => {
    // const service = new BoardService()
    // res.status(200).json(service.getArticles(req, res))
    console.log("express list 진입")
    BoardService().fetchList(req, res)
})

app.get('/fetchArticle/:id', cors(corsOptions), (req, res) => {
    console.log("express fetchArticle 진입")
    BoardService().fetchArticle(req, res)
})

app.post('/update/:_id', cors(corsOptions), (req, res) => {
    console.log("express update 진입")
    BoardService().update(req, res)
})

app.post('/delete/:id', cors(corsOptions), (req, res) => {
    console.log("express delete 진입")
    BoardService().delete(req, res)
})


export default app