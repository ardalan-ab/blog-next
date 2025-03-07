// import { Container, Typography, Box } from '@mui/material';
// import fs from 'fs/promises';
// import path from 'path';
// import matter from 'gray-matter';

// export async function getStaticPaths() {
//     const postsDirectory = path.join(process.cwd(), '/contemt/posts');
//     const filenames = await fs.readdir(postsDirectory);

//     const paths = filenames.map(filename => ({
//         params: { id: filename.replace('.md', '') },
//     }));

//     return {
//         paths,
//         fallback: true,
//     };
// }

// export async function getStaticProps({ params }) {
//     const { id } = params;
//     const postPath = path.join(process.cwd(), 'content', 'posts', `${id}.md`);
//     const fileContents = fs.readFileSync(postPath, 'utf-8');
//     const { content, data } = matter(fileContents);

//     return {
//         props: {
//             post: {
//                 title: data.title,
//                 content,
//             },
//         },
//     };
// }

// export default function Post({ post }) {
//     return (
//         <Container maxWidth="lg" sx={{ py: 5 }}>
//             <Typography variant="h3" gutterBottom>
//                 {post.title}
//             </Typography>
//             <Box>
//                 <Typography variant="body1" paragraph>
//                     {post.content}
//                 </Typography>
//             </Box>
//         </Container>
//     );
// }
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
