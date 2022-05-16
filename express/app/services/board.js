import db from "../models/index.js"
import getDatabase from "../lambdas/getDatabase.js"
import mongoose from 'mongoose'

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
        fetchList(_req, res){
            Board.find()
            .exec((err, boards) => {
                if (err) return res.status(400).send(err)
                res.status(200).json({success:true, boards})
            })
        },
        fetchArticle(req, res){
            console.log("fetchArticle")
            Board.findById(req.params.id)
            .exec((err, board) => {
                if (err) return res.status(400).send(err)
                res.status(200).json({success:true, board})
                console.log("fetch 성공" + board)
            })
        },
        update(req, res){
            console.log("update")
            Board.updateOne({_id: req.params._id}, {$set : {title : req.body.title, content: req.body.content}})
            .exec((err, board) => {
                if (err) return res.status(400).send(err)
                res.status(200).json({success:true, board})
                console.log("update 성공")
            })
        },
        delete(req, res){
            console.log("delete")
            Board.deleteOne({_id: req.params.id})
            .exec((err, board) => {
                if (err) return res.status(400).send(err)
                res.status(200).json({success:true, board})
                console.log("delete 성공")
            })
        },
    }
}