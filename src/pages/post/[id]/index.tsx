import Paper from "@material-ui/core/Paper";
import fetch from "isomorphic-unfetch";
import { Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: { display: "grid", placeItems: "center" },
    container: {
      maxWidth: "700px",
      position: "relative",
      padding: theme.spacing(1, 2),
    },
    button: {
      position: "absolute",
      top: 0,
      right: 0,
    },
  })
);

const Post = ({ post }) => {
  const { title, author, detail } = post.data;
  const classes = useStyles();
  const router = useRouter();
  const id = router.query.id;
  const handleClick = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className={classes.root}>
      <Paper className={classes.container}>
        <Button
          color="primary"
          className={classes.button}
          onClick={handleClick}
        >
          <ClearIcon />
        </Button>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="h6">{author}</Typography>
        <Typography variant="h5">{detail}</Typography>
        <Button variant="contained" color="primary">
          <Link href={`/post/${id}/edit`}>
            <a>Edit</a>
          </Link>
        </Button>
      </Paper>
    </main>
  );
};

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api");
  const posts = await res.json();
  console.log(posts);
  const paths = posts.data.map((post) => ({
    params: { id: post._id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/${params.id}`);
  const post = await res.json();
  return { props: { post } };
}
export default Post;
