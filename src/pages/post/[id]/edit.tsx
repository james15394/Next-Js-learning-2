import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

interface IFormInput {
  title: string;
  content: string;
  author: string;
  detail: string;
}

const schema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  author: yup.string().required(),
  detail: yup.string().required(),
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    placeItems: "center",
    height: "100vh",
  },
  formContainer: {
    minWidth: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& form": {
      width: "90%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: theme.spacing(2),
      "& .MuiGrid-container": {
        display: "flex",
        flexDirection: "column",
        marginBottom: theme.spacing(1),
      },
      "& input": {
        padding: theme.spacing(2),
      },
      "& .MuiInputBase-root": {
        width: "100%",
      },
    },
  },
}));

const Edit = ({ post }) => {
  const { title, content, detail, author } = post.data;
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: "all",
    reValidateMode: "onChange",
  });
  const watchAllFields = watch();
  console.log(watchAllFields);
  const classes = useStyles();
  const router = useRouter();
  const id = router.query.id;
  const updatePost = async (form: IFormInput) => {
    try {
      const res = await fetch(`http://localhost:3000/api/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    updatePost(data);
  };
  return (
    <main className={classes.root}>
      <Paper className={classes.formContainer}>
        <Typography variant="h6" gutterBottom>
          Create Post
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                defaultValue={title}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    name={name}
                    variant="outlined"
                    fullWidth
                    label="Title"
                    helperText={errors.title?.message}
                    error={Boolean(errors.title?.message)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="author"
                control={control}
                defaultValue={author}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    label="Author"
                    helperText={errors.author?.message}
                    error={Boolean(errors.author?.message)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="content"
                control={control}
                defaultValue={content}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    label="Content"
                    helperText={errors.content?.message}
                    error={Boolean(errors.content?.message)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="detail"
                control={control}
                defaultValue={detail}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    label="Detail"
                    multiline
                    rows={4}
                    helperText={errors.content?.message}
                    error={Boolean(errors.content?.message)}
                  />
                )}
              />
            </Grid>
          </Grid>
          <input type="submit" />
        </form>
      </Paper>
    </main>
  );
};

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api");
  const posts = await res.json();
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

export default Edit;
