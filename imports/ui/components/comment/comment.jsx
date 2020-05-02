import React, { createElement, useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Comment as _Comment, Tooltip, Avatar } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";

const Comment = (props) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <span key="comment-basic-like">
      <Tooltip title="Like">
        {createElement(action === "liked" ? LikeFilled : LikeOutlined, {
          onClick: like,
        })}
      </Tooltip>
      <span className="comment-action">{likes}</span>
    </span>,
    <span key=' key="comment-basic-dislike"'>
      <Tooltip title="Dislike">
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined,
          {
            onClick: dislike,
          }
        )}
      </Tooltip>
      <span className="comment-action">{dislikes}</span>
    </span>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <_Comment
      actions={actions}
      author={
        <a>{`${props.comment.author.firstName} ${props.comment.author.lastName}`}</a>
      }
      avatar={
        <Avatar
        //   src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        //   alt="Han Solo"
        />
      }
      content={<p>{props.comment.content}</p>}
      datetime={
        <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
          <span>
            {moment(props.comment.create_date).format("MMMM DD YYYY h:mm a")}
          </span>
        </Tooltip>
      }
    />
  );
};

export default Comment;
