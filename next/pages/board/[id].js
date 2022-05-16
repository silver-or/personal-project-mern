import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Update } from "@/components"
import { fetchArticleRequest, updateRequest } from "@/modules/board/update";
import { useRouter } from 'next/router'

const UpdatePage = () => {
    const router = useRouter()
    const id = router.query
    // console.log("id:"+JSON.stringify(id.id)) // ""

    const [board, setBoard] = useState({})
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchArticleRequest(id))
    }, []);

    const {article} = useSelector(state => state.update);

    useEffect(() => {setBoard(article)}, [article])
    // console.log("board : " + JSON.stringify(board))
    // console.log("article : " + JSON.stringify(article))
    
    const onChange = e => {
        e.preventDefault()
        const {name, value} = e.target;
        setBoard({...board, [name]: value})
        console.log("board:"+JSON.stringify(board))
    }
    
    const onSubmit = e => {
        e.preventDefault()
        alert('진행 1: 수정 버튼 클릭')
        console.log(`글 정보 : ${JSON.stringify(board)}`)
        dispatch(updateRequest(board))
        setBoard({title: '', content: ''})
        window.location.href = "./list"
    }

    return (<Update board={board} onChange={onChange} onSubmit={onSubmit}/>)
};

const mapStateToProps = state => ({isUpdated: state.write.isUpdated})
const updateActions = {updateRequest}

export default connect(mapStateToProps, updateActions)(UpdatePage)