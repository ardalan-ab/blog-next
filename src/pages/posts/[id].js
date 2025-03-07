
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import showdown from "showdown";
import { Container, Typography, Paper } from "@mui/material";
import Header from "@/components/Header";

export default function PostPage({ post }) {
  return (
    <>
      <Header />

      <Container>
        <Paper sx={{ padding: 3, marginTop: 3 }}>
          <Typography variant="h3">{post.title}</Typography>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </Paper>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "content", "posts");
  const filenames = await fs.readdir(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: { id: filename.replace(".md", "") },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const postPath = path.join(process.cwd(), "content", "posts", `${id}.md`);
  const fileContents = await fs.readFile(postPath, "utf-8");
  const { content, data } = matter(fileContents);

  const converter = new showdown.Converter();
  const htmlContent = converter.makeHtml(content);

  return {
    props: {
      post: {
        title: data.title || "بدون عنوان",
        content: htmlContent,
      },
    },
    revalidate:60
  };
}
