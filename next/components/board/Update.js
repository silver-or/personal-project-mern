import Button from '@mui/material/Button';
import theme from '@/public/myTheme.js';
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';

export function Update({board, onChange, onSubmit}){
    return (<form onSubmit={onSubmit}>
        <ThemeProvider theme={theme}>
            <div style={{width:700 + "px", height:200 + "px", margin: '0 auto', paddingTop: 50 + "px"}}>
                <label><Typography style={{float:"left", display: "flex"}}> 제목 </Typography></label>
                <input type="text" onChange={onChange} defaultValue={board.title||""}  id="title" name="title" placeholder="제목 입력" style={{width:700 + "px"}}/>
                <hr/>
                <input type="textarea" onChange={onChange} defaultValue={board.content||""}  id="content" name="content" placeholder="내용 입력" style={{width:700 + "px", height:200 + "px"}}></input>
                <br/><br/>
                <Button type="submit" variant="outlined" size="small" style={{float:"right", display: "flex"}}> 수정 </Button>
            </div>
        </ThemeProvider>
    </form>)
}