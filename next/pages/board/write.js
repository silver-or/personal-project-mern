import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Write } from "@/components";
import { writeRequest } from "@/modules/board/write";

const WritePage = () => {
    const [board, setBoard] = useState({title: '', content: ''})
    const dispatch = useDispatch()
    const onChange = e => {
        e.preventDefault()
        const {name, value} = e.target;
        setBoard({...board, [name]: value})
        console.log(board)
    }
    const onSubmit = e => {
        e.preventDefault()
        alert('진행 1: 글쓰기 버튼 클릭')
        console.log(`글 정보 : ${JSON.stringify(board)}`)
        dispatch(writeRequest(board))
        setBoard({title: '', content: ''})
        window.location.href = "./list"
    }

    return (<Write onChange={onChange} onSubmit={onSubmit}/>)
};

const mapStateToProps = state => ({isWritten: state.write.isWritten})
const writeActions = {writeRequest}

export default connect(mapStateToProps, writeActions)(WritePage)