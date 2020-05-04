import { Menu as MenuList } from "antd";
import "antd/dist/antd.css";
import { useHistory } from "react-router-dom";

import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import SearchBox from "./searchBox";

import React, { useState, useEffect } from "react";
import { Page as _Page } from "../../apis/models/page";
import _ from "lodash";

const Menu = (props) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  let history = useHistory();

  let isFirst = true;

  populatePages = () => {
    const result = _Page.find({}, { sort: { create_date: -1 } }).fetch();
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
  });

  handleClick = (e) => {
    setCurrentPage(e.key);
    history.push(`/page/${pages[e.key]._id}`);
  };

  handleSearch = (key) => {
    let result;

    if (key.trim() == "") {
      result = _Page.find().fetch();
    } else {
      Meteor.call("getPagesByFullTextPage", key, function (error, result) {
        if (error) {
          console.log(error);
        } else {
          setPages(JSON.parse(result));
        }
      });
    }

    setPages(result);
  };

  return (
    <div style={{ position: "fixed" }}>
      <MenuList
        className="mt-2 pr-2"
        // defaultSelectedKeys={["0"]}
        // defaultOpenKeys={["sub1"]}
        selectedKeys={currentPage}
        mode="inline"
        style={{
          height: "80vh",
          overflowX: "hidden",
        }}
        theme="light"
        onClick={handleClick}
      >
        {pages && pages.length > 0 ? (
          pages.map((p, index) => {
            return <MenuList.Item key={index}>{p.title}</MenuList.Item>;
          })
        ) : (
          <il class="ant-menu-item ant-menu-item-only-child ">
            No data found!
          </il>
        )}
      </MenuList>
      <SearchBox onSearch={handleSearch} />
    </div>
  );
};

export default Menu;

// db.Pages.find( { $text: { $search: "java coffee shop" } } )
