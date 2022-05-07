import styles from "@/styles/Home.module.css";
import { ThemeProvider } from "styled-components";
import theme from '@/public/myTheme.js';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MainFeaturedPost from "./home/MainFeaturedPost";
import FeaturedPost from "./home/FeaturedPost";

const mainFeaturedPost = {
    title: 'Post your pet diary',
    description:
      "Record the moments you spent with your precious pet",
    image: 'https://source.unsplash.com/random/?pet',
    imageText: 'main image description',
    linkText: 'Continue reading…',
};

const featuredPosts = [
    {
      title: 'Featured post',
      date: 'Nov 12',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random/?pets',
      imageLabel: 'Image Text',
    },
    {
      title: 'Post title',
      date: 'Nov 11',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random/?pets',
      imageLabel: 'Image Text',
    },
];

export function Home() {
    return (<>
      <Container maxWidth="xl">
          <MainFeaturedPost post={mainFeaturedPost}/>
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
      </Container>
    </>)
}