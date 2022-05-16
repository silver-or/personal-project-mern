import React, { useEffect, useState } from "react";
import { List } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { deleteRequest } from "@/modules/board/delete";
import { fetchListRequest } from "@/modules/board/list";

const ListPage = () => {
    const [data, setData] = useState([])
    const [id, setId] = useState("")
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchListRequest())
    }, []);

    const { list } = useSelector(state => state.list);
    console.log(JSON.stringify(list))

    useEffect(() => {setData(list)})

    console.log("data: " + JSON.stringify(data))

    const onClickDelete = (board, e) => {
        e.preventDefault()
        alert('진행 1: 삭제 버튼 클릭')
        console.log("board " + JSON.stringify(board))
        // setId(board._id)
        // console.log("id "+id)
        dispatch(deleteRequest(board))
        window.location.href = "./list"

    }
    
    return <List data={data} onClickDelete={onClickDelete}/>
};

export default ListPage