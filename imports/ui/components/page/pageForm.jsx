import { Page as _Page, validatePage } from "../../../apis/models/page";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import moment from "moment";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@material-ui/core";
import { Team } from "../../../apis/models/team";
import { Category } from "../../../apis/models/category";
import CKEditor from "@ckeditor/ckeditor5-react";
import { Meteor } from "meteor/meteor";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { date } from "joi";

const pageForm = (props) => {
  const [isFirst, setIsFirst] = React.useState(true);
  const [categoryList, setCategoryList] = useState([
    { _id: "CgHpB8oPDE3fxhh8L", title: "Process" },
    // { _id: "dHW7q852ey8gF9aCW", title: "Template" },
    // { _id: "mroa8tdsqDAAPJXvz", title: "Tool" },
    // { _id: "pFB6nLzjvBWgv5Hx5", title: "Resource" },
  ]);
  const [teamList, setTeamList] = useState([
    { _id: "EXRe4MxgWbgaXxwDy", title: "All" },
    // { _id: "BMjN2YfnFPTzNwE7J", title: "Sales" },
    // { _id: "B3bpx45EuLgRm9FMJ", title: "IT" },
  ]);
  const [teamIndex, setTeamIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const { register, handleSubmit, getValues, errors, setValue } = useForm();
  const [pageData, setPageData] = useState({
    id: "",
    title: "",
    content: "",
    team: "",
    category: {
      _id: "",
      title: "",
      meta: {
        target_group: "",
        use_case: "",
        contact_person: "",
        link: "",
      },
      metadata: "",
      author: "",
    },
  });

  populatePage = () => {
    const pageId = props.match.params.id;
    if (pageId == "new") return;

    Meteor.call("getPageById", pageId, function (error, result) {
      if (error) {
        console.error("Error: Page Not Found/or you don't have access on it!!");
        alert("page not found/or you don't have access on  it! ");
        console.log(error);
        props.history.push("/home");
      } else {
        data = JSON.parse(result);
        setValue("title", data.title);
        setValue("content", data.content);
        setValue("team", data.team);
        setValue("category._id", data.category._id);
        setValue("category.title", data.category.title);
        setValue("category.meta.target_group", data.category.meta.target_group);
        setValue("category.meta.use_case", data.category.meta.use_case);
        setValue(
          "category.meta.contact_person",
          data.category.meta.contact_person
        );
        setValue("category.meta.link", data.category.meta.link);
        setValue("category.metadata", data.category.metadata);
        setValue("metadata", data.metadata);
        setValue("content", data.content);

        // setTeamIndex(teamList.indexOf(_.get(teamList, ["title", data.team])));
        // setCategoryIndex(
        //   categoryList.indexOf(
        //     _.get(categoryList, ["title", data.category.title])
        //   )
        // );

        setPageData(data);
      }
    });
  };
  populateTeams = () => {
    Meteor.call("getTeams", function (error, result) {
      if (error) {
        console.log(error);
      } else {
        setTeamList(JSON.parse(result));
      }
    });
  };
  populateCategories = () => {
    Meteor.call("getCategories", function (error, result) {
      if (error) {
        console.log(error);
      } else {
        setCategoryList(JSON.parse(result));
      }
    });
  };
  const handleTeamChange = (event) => {
    setTeamIndex(event.target.value);
    setValue("team", teamList[event.target.value].title);
  };
  const handleCategoryChange = (event) => {
    setCategoryIndex(event.target.value);
    setValue("category.title", categoryList[event.target.value].title);
    setValue("category._id", categoryList[event.target.value]._id);
  };

  useEffect(() => {
    populatePage();
    setIsFirst(false);
  }, [props.match.params.id]);
  useEffect(() => {
    populateTeams();

    populateCategories();
  }, []);
  React.useEffect(() => {
    register({ name: "team" }, { required: true });
    register({ name: "category.title" }, { required: true });

    setValue("team", teamList[teamIndex].title);
    setValue("category.title", categoryList[categoryIndex].title);
    register({ name: "content" });
  }, []);

  const renderInput = (name = "title", lable, type = "text", isRequierd) => {
    return (
      <TextField
        variant="outlined"
        className="w-100"
        type={type}
        //placeholder={placeholder || name}
        name={name}
        defaultValue={props.match.params.id == "new" ? "" : " "}
        label={lable || name}
        helperText={(_.get(errors, name) && _.get(errors, name).message) || " "}
        inputRef={register({ required: isRequierd || `Please enter ${name}.` })}
        error={_.get(errors, name) ? true : false}
      />
    );
  };

  const newPage = (data) => {
    data.author = Meteor.userId();
    data.create_date = moment().format();
    data.author = Meteor.user().profile;
    const { error } = validatePage(data);

    if (!error) {
      try {
        const pageId = _Page.insert(data);
        props.history.replace(`/page/${pageId}`);
      } catch (ex) {
        console.log(
          "Inserting page has error: " + moment().format("YYYY-MM-DD-HH:SS"),
          ex
        );
      }
    } else
      error &&
        console.log(
          "this validate error schema : " + moment().format("YYYY-MM-DD-HH:SS"),
          error.message
        );
  };

  const editPage = (data, pageId) => {
    console.log("edit page, new data:", data);
    const newData = _.pick(data, [
      "metadata",
      "meta",
      "title",
      "team",
      "content",
    ]);

    // const { error } = validatePage(data);
    // if (!error)
    _Page.update({ _id: pageId }, { $set: { ...newData } }, (err) => {
      if (err)
        console.error(
          `Error update Page id= ${pageId} : ${moment().format(
            "YYYY-MM-DD-HH:SS"
          )}`,
          err
        );
      else props.history.replace(`/page/${pageId}`);
    });
    // else {
    //   console.warn("Update page data invaled validate :", error.message);
    // }
  };
  const onSubmit = (data) => {
    data.category._id = categoryList[categoryIndex]._id;
    let pageId = props.match.params.id;
    try {
      if (pageId == "new") newPage(data);
      else editPage(data, pageId);
    } catch (ex) {
      console.error(
        `Error user dosen't have permission ${moment().format(
          "YYYY-MM-DD-HH:SS"
        )}: `,
        ex
      );
      return;
    }
  };

  return (
    <div className=" p-1">
      <div className="p-2 card w-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column  justify-content-center align-items-center "
        >
          <h3 className="align-self-start">
            {props.match.params.id == "new" ? "New Page" : "Edit Page"}
          </h3>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={6}>
              {renderInput("title", "Title")}
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              {renderInput("metadata", "MetaData")}
            </Grid>
            <Grid className="p-2" item xs={12} sm={4} lg={4}>
              <FormControl className="w-100" variant="outlined">
                <InputLabel id="demo-simple-select-label">Team</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="team"
                  value={teamIndex}
                  label="Team"
                  onChange={handleTeamChange}
                >
                  {teamList.map((t, index) => {
                    return (
                      <MenuItem key={t._id} value={index}>
                        {t.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid className="m-1" item xs={12} sm={12} lg={12}>
              <div className="editor mb-1">
                <h4>Content </h4>
                <CKEditor
                  id="editor"
                  editor={ClassicEditor}
                  data={pageData.content}
                  onInit={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setValue("content", data);
                    // console.log({ event, editor, data });
                  }}
                />
              </div>
            </Grid>
          </Grid>

          <h3 className="align-self-start">Category</h3>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={6}>
              <FormControl variant="outlined" className="w-100">
                <InputLabel htmlFor="categoryselect">Category</InputLabel>
                <Select
                  labelId="categoryselect"
                  id="category.title"
                  value={categoryIndex}
                  label="Category Title"
                  name="category.title"
                  onChange={handleCategoryChange}
                >
                  {categoryList.map((t, index) => {
                    return (
                      <MenuItem key={t._id} value={index}>
                        {t.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              {renderInput("category.meta.target_group", "Targe Group")}
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              {renderInput("category.meta.use_case", " Use Case")}
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              {renderInput("category.meta.contact_person", "Contact Person")}
            </Grid>
            {categoryList[categoryIndex].title == "Tool" && (
              <Grid item xs={12} sm={6} lg={6}>
                {renderInput("category.meta.link", "Link", "text", false)}
              </Grid>
            )}
            <Grid item xs={12} sm={6} lg={6}></Grid>
          </Grid>

          <button
            type="submit"
            style={{ width: "-webkit-fill-available", height: 55 }}
            className="btn btn-primary"
          >
            {props.match.params.id == "new" ? "Create" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default pageForm;
