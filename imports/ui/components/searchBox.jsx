import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Grid, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
const SearchBox = (props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (key) => {
    props.onSearch(key.key);
  };

  return (
    <form className="mt-2" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item lg={8} md={8} sm={8}>
          <TextField
            id="outlined-search"
            label="Search field"
            type="text"
            name="key"
            variant="outlined"
            inputRef={register()}
          />
        </Grid>
        <Grid item className="ml-2  " lg={2} md={2} sm={2}>
          <button
            type="submit"
            style={{ width: 80, height: 55 }}
            className="btn btn-primary"
          >
            Search
          </button>
        </Grid>
      </Grid>
    </form>
  );
};
SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
export default SearchBox;
