import tableStyles from "@/styles/Table.module.css"
import { Button, IconButton } from "@mui/material"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import styles from "@/styles/List.module.css"
import Link from "next/link";
import { useRouter } from "next/router";

const Table = ({columns, colspan, data, onClickDelete}) => {
    const router = useRouter()
    return (
        <table className="table table-hover">
        <thead>
            <tr>
                {columns.map((column, index) => (
                    <th key={index}>{column}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {data.length == 0 ? 
            <tr>
                <td colSpan={colspan}>데이터가 없습니다.</td>
            </tr>
            : data.map((board) => (
                <tr key={board._id}>
                    <td>{board.title}</td>
                    <td>{board.content}</td>
                    <td>
                        <IconButton aria-label="delete" size="small" style={{marginRight: 10 + "px"}} onClick={e => onClickDelete(board, e)} className={styles.none}>
                            <DeleteOutlineOutlinedIcon fontSize="small"/>
                        </IconButton>
                        <IconButton aria-label="edit" size="small"
                            onClick={() => {
                                router.push({
                                    pathname: '/board/[id]',
                                    query: {id: board._id}
                                })
                            }}>
                            <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    )
}

export function List({data, onClickDelete}){
    const columns = ["글 제목", "내용"]
    return<>
    <div className={tableStyles.table}>
        <Table columns={columns} colspan={2} data={data} onClickDelete={onClickDelete}/>
    </div>
    </>
}