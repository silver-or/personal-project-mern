import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import {Header} from '@/components';
import theme from '@/public/myTheme.js';

const sections = [
  { title: '글쓰기', url: '/basic/write' },
  { title: '조회', url: '/basic/list' },
  { title: '수정', url: '/basic/update' },
  { title: '삭제', url: '/basic/delete' }
];

export function Nav() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Pet Diary" sections={sections} />
      </Container>
    </ThemeProvider>
  );
}