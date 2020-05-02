import React, { useState, useEffect } from "react";
import { Page as _Page } from "../../../apis/models/page";
import { Grid, Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import DraggableDialog from "../DraggableDialog";

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [openDialDeletePage, setOpenDialDeletePage] = useState(false);
  let isFirst = true;
  populatePages = () => {
    const result = _Page.find().fetch();
    if (!result && !isFirst) {
      console.error("Error: Page Not Found/or you don't have access on it!!");
      alert("page not found/or you don't have access on it! ");
    }

    if (!isFirst) setPages(result);
  };

  useEffect(() => {
    Tracker.autorun(() => {
      populatePages();
    });
    isFirst = false;
  }, []);

  handlePageDelete = (pageId) => {
    setOpenDialDeletePage(true);
    const item = _.find(pages, ["_id", pageId]);

    var newPagesList = [...pages];
    var index = page.indexOf(item);
    if (index !== -1) {
      newPagesList.splice(index, 1);
      setPages(newPagesList);
    }

    _Page.remove(pageId, (err) => {
      err && console.error(`Remover page error : ${Date.now()}`, err);
      newPagesList[index] = item;
      setPages(newPagesList);
    });
  };
  return (
    <>
      <DraggableDialog open={openDialDeletePage} />
      <Grid container className="mt-2" alignItems="center" spacing={2}>
        <Grid item xs={12} sm={12}>
          {/* <Paper elevation={3}> */}
          {/* <PageCard onPageDelete={handlePageDelete}></PageCard> */}
        </Grid>
      </Grid>
    </>
  ); //<pageCard page={page} >
};

export default Pages;
