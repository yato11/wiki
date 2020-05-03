import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {Card
,
  CardHeader
,
CardMedia 
,CardContent
,CardActions
 
,Avatar
,Collapse 
,Menu
,MenuItem
,{ Page as _Page } 
,Typography
,IconButton

} from "@material-ui/core ";
import  from "@material-ui/icons/AccountCircle";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AccountCircleIcon from "@material-ui/core/Avatar";


import { red } from "@material-ui/core/colors";



import  from "../../../apis/models/page";
import DraggableDialog from "../DraggableDialog";
import moment from "moment";
import FolderIcon from "@material-ui/icons/Folder";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import Comments from "../comment/comments";
import CommentForm from "../comment/commentForm";

export default function Page(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 800,
      marginTop: "15px",
      marginLeft: "5px",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialDeletePage, setOpenDialDeletePage] = useState(false);
  // const [isFirst, setIsFirst] = React.useState(true);
  const [data, setData] = useState({
    id: "",
    title: "",
    content: "",
    team: "",
    metadata: "",
    author: "",
    create_date: "",
    category: {
      _id: "",
      title: "",
      meta: {
        target_group: "",
        use_case: "",
        contact_person: "",
        link: "",
      },
    },
  });
  // const { data } = props;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  populatePage = () => {
    const pageId = props.match.params.id;

    Meteor.call("getPageById", pageId, function (error, result) {
      console.log("this is call methiid  page");
      if (error) {
        console.error("Error: Page Not Found/or you don't have access on it!!");
        alert("page not found/or you don't have access on  it! ");
        console.log(error);
        props.history.push("/home");
      } else {
        setData(JSON.parse(result));
      }
    });
  };

  useEffect(() => {
    Tracker.autorun(() => {
      populatePage();
    });
    console.log("8");
  }, [props.match.params.id]);

  handleAddComment = () => {
    //for refresh data from data base after add comment to this page.
    Tracker.autorun(() => {
      populatePage();
    });
  };
  const handleClose = (e, type) => {
    setAnchorEl(null);
    if (type == "edit") props.history.push(`/pageForm/${data._id}`);
    if (type == "delete") setOpenDialDeletePage(true);
  };
  handlePageDelete = () => {
    const pageId = data._id;

    _Page.remove({ _id: pageId }, (err) => {
      err && console.error(`Remover page error : ${Date.now()}`, err);
      !err && console.warn("Delete page successfully!");
      props.history.replace("/home");
    });
    setOpenDialDeletePage(false);
  };
  return (
    <>
      <DraggableDialog
        onAggree={handlePageDelete}
        onClose={(isOpen) => {
          setOpenDialDeletePage(isOpen);
        }}
        title={data.title}
        message="Do you want to delete this page?"
        open={openDialDeletePage}
      />
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {data.author && data.author.firstName.toString().substr(0, 1)}
            </Avatar>
          }
          action={
            <>
              <IconButton onClick={handleClick} aria-label="settings">
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={(e) => handleClose(e, "edit")}>
                  <EditOutlinedIcon color="primary" /> Edit
                </MenuItem>
                <MenuItem onClick={(e) => handleClose(e, "delete")}>
                  <HighlightOffOutlinedIcon color="error" /> Delete
                </MenuItem>
              </Menu>
            </>
          }
          title={data.title}
          subheader={
            <div className="d-flex flex-column  ">
              <div className="row d-flex justify-content-between">
                <span>
                  <AccessAlarmsIcon style={{ fontSize: 20 }} />{" "}
                  {moment(data.create_date).format("MMMM DD YYYY h:mm a")}
                </span>
                <span>
                  <FolderIcon style={{ fontSize: 20 }} />
                  {"  "} {data && data.category && data.category.title}
                </span>
              </div>
              <div className="row">
                <span>
                  <AccountCircleIcon style={{ fontSize: 20 }} />
                  {data.author &&
                    `${data.author.firstName} ${data.author.lastName}`}
                </span>
              </div>
            </div>
          }
        />

        {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
        <CardContent style={{ minHeight: 500, maxHeight: 1000 }}>
          <Typography variant="body2" color="textSecondary" component="div">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      {data._id && (
        <CommentForm onAddComment={handleAddComment} pageId={data._id} />
      )}
      {data.comments && <Comments comments={data.comments} />}
    </>
  );
}
