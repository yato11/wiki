import { Meteor } from "meteor/meteor";
import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Grid, TextField } from "@material-ui/core";
import moment from "moment";

import { Page as _Page } from "../../../apis/models/page";

const CommentForm = (props) => {
  const history = useHistory();
  const { register, handleSubmit, setValue } = useForm();
  const { pageId } = props;

  const addComment = (text) => {
    const newData = {
      content: text,
      create_date: moment().format(),
      author: Meteor.user().profile,
      pageId: pageId,
    };
    _Page.update({ _id: pageId }, { $push: { comments: newData } }, (err) => {
      if (err)
        console.error(
          `Error Add Comment Page id= ${pageId} : ${moment().format(
            "YYYY-MM-DD-HH:SS"
          )}`,
          err
        );
      else props.onAddComment();
    });
  };

  const onSubmit = (data) => {
    addComment(data.content);
    setValue("content", "");
    window.scrollTo({ top: 10000, behavior: "smooth" });
  };
  return (
    <form className="mt-3" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container className="p-3">
        <Grid item lg={8} md={8} sm={8}>
          <TextField
            fullWidth
            id="outlined-search"
            label="Add Comment"
            type="text"
            name="content"
            variant="outlined"
            inputRef={register({ required: true })}
          />
        </Grid>
        <Grid item className="ml-2 my-auto" lg={2} md={2} sm={2}>
          <button
            type="submit"
            style={{ width: 100, height: 55 }}
            className="btn btn-dark"
          >
            ADD
          </button>
        </Grid>
      </Grid>
    </form>
  );
};

CommentForm.propTypes = {
  pageId: PropTypes.string.isRequired,
};

export default CommentForm;
