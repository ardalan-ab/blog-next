

import React from "react";
import fs from "fs/promises";

import path from "path";

// md convertor
import matter from "gray-matter";
// import {marked} from 'marked';
// import ReactMarkdown from 'react-markdown';
import showdown from "showdown";
import { AppBar, Card, CardContent, Container, Grid, Link, Toolbar, Typography } from "@mui/material";
import Header from "@/components/Header";
const index = ({ data,posts }) => {
  // showdown method
  // const converter = new showdown.Converter();
  // const htmlcontent= converter.makeHtml(data)

  
  return (
    <>
      {/* <div dangerouslySetInnerHTML={{ __html: htmlcontent }} /> */}

      <Header/>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h1" sx={{ mb: 2 }}>
          Welcome to My Blog
        </Typography>
        <Grid container spacing={3}>
          {posts.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Link href={`/posts/${item.id}`} variant="h6" color="primary">
                <Card
                  sx={{
                    backgroundColor: "background.paper",
                    color: "text.primary",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">Post {item.title}</Typography>
                    <Typography variant="body1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* <ReactMarkdown></ReactMarkdown> */}
    </>
  );
};

export default index;

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "/content/posts");
  const filenames = await fs.readdir(postsDirectory);
  const posts = await Promise.all (filenames.map(async (post) => {
    const postPath = path.join(postsDirectory, post);
    const content = await fs.readFile(postPath, "utf-8");
    const { data } = matter(content);

    return {
      id: post.replace(".md", ""),
      title: data.title || "بدون عنوان",
      ...data,
    };
  }));

  // marked method
  // const htmlformat=marked(content)

  return {
    props: {
       posts,
       data:null
    },
    revalidate:false
  };
}
