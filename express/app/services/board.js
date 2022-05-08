import db from "../models/index.js"
import getDatabase from "../lambdas/getDatabase.js"

export default function BoardService(){
    const Board = db.Board
    const dbo = getDatabase()
    const dbConnect = dbo.getDb()
    
    return {
        write(req, res){
            console.log(`넘어온 JSON 값 : ${JSON.stringify(req.body)}`)
            new Board(req.body).save(function (err) {
                if (err) {
                    res
                        .status(500)
                        .send({message: err});
                    console.log('글쓰기 실패')
                    return;
                } else {
                    res
                        .status(200)
                        .json({ok: 'ok'})
                    console.log('글쓰기 성공')
                }
            })
        },
        getArticles(_req, res){
            Board.find()
            .exec((err, boards) => {
                if (err) return res.status(400).send(err)
                res.status(200).json({success:true, boards})
            })
        }
    }
}