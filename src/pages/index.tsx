import { createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { ButtonBase, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { PlayCircleOutline } from "@material-ui/icons";
import { Clear } from "@material-ui/icons";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { Data, Info, Post } from "../components/types";
import connectDB, { getDataAll } from "../../utils/dbConnect";
import Posts from "../../model/Post";


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "grid",
      placeItems: "center",
      minHeight: "calc(100vh - 56px)",
    },
    container: {
      maxWidth: "500px",
    },
    item: {
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      "& a": {
        position: "absolute",
        right: 0,
        top: 0,
      },
      button: {
        position: "absolute",
        left: 0,
        top: 0,
      },
    },
  })
);
export default function Home({ posts }: Data) {
  const classes = useStyles();
  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      const res = await fetch(`http://localhost:3000/api/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={classes.root}>
      <Grid container spacing={3} className={classes.container}>
        {posts.map((post: Info) => (
          <Grid item xs={12} id={post._id}>
            <Paper className={classes.item}>
              <Link href={`/post/${post._id}`}>
                <a>
                  <ButtonBase>
                    <PlayCircleOutline />
                  </ButtonBase>
                </a>
              </Link>

              <ButtonBase onClick={() => handleDelete(post._id)}>
                <Clear />
              </ButtonBase>

              <Typography variant="h4">{post.title}</Typography>
              <p>{post.author}</p>
              <p>{post.content}</p>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export async function getStaticProps() {
  await connectDB();
  const posts = await Posts.find().lean();
  if (!posts) {
    return {
      notFound: true,
    };
  }
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
    revalidate: 1,
  };
}
