export function Write(){
    const [board, setBoard] = useState({
        title: '', content: ''
    })
    const dispatch = useDispatch()
    const handleChange = e => {
        e.preventDefault()
        const {name, value} = e.target;
        setBoard({...board, [name]: value})
    }
    const handleClick = e => {
      window.location.href = "./list"
    }

    return (<form onSubmit={
        e => {
            e.preventDefault()
            alert('진행 1: 글쓰기 버튼 클릭')
            dispatch(boardActions.addArticleRequest(board))
            setBoard({
                title: '', content: ''
            })
        }
    }
    >
        <ThemeProvider theme={theme}>
            <div style={{width:700 + "px", height:200 + "px"}}>
                <label><b>제목</b></label> <br/>
                <input type="text" onChange={handleChange} id="title" name="title" placeholder="제목 입력" style={{width:700 + "px"}}/>
                <hr/>
                <input type="textarea"  id="content" name="content" onChange={handleChange} placeholder="내용 입력" style={{width:700 + "px", height:200 + "px"}}></input>
                <br/><br/>
                <Button type="submit" onClick={handleClick} variant="outlined" size="small" style={{float:"right", display: "flex"}}> 등록 </Button>
            </div>
        </ThemeProvider>

    </form>)
}