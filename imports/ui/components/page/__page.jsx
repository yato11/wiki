import { Page as _Page, validate } from "../../../apis/models/page";
import React, { useState, useEffect } from "react";
import "./page.css";

const Page = (props) => {
  let isFirst = true;
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
    // props.match.params.id
    const result = _Page.findOne("rAzEGnRx8Lm3mai3K");
    if (!result && !isFirst) {
      console.error("Error: Page Not Found/or you don't have access on it!!");
      alert("page not found/or you don't have access on it! ");
      //props.history.push("/");
    }
    if (!isFirst) setPageData(result);
  };

  useEffect(() => {
    Tracker.autorun(() => {
      populatePage();
    });
    isFirst = false;
  }, []);

  const handleClick = () => {
    populatePage();
  };

  return (
    <div>
      <div className="row">
        <div> Category : {pageData.category.title}</div>
        <div className="card">
          <h2>{pageData.title}</h2>
          <h5>{pageData.team}</h5>
          <p>{pageData.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
