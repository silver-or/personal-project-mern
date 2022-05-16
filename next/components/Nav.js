import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import {Header} from '@/components';
import theme from '@/public/myTheme.js';

const sections = [
  { title: '글쓰기', url: '/board/write' },
  { title: '조회', url: '/board/list' }
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