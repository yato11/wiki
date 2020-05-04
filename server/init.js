import { Team } from "../imports/apis/models/team";
import { Category } from "../imports/apis/models/category";
import { Page, validatePage } from "../imports/apis/models/page";
import { Meteor } from "meteor/meteor";

export const initData = () => {
  console.log("initData on the server...");
  setupTeams();
  setupCategories();
  setupPageIndexSearch();
  methodsSubscribe();
};

const methodsSubscribe = () => {
  Meteor.methods({
    getCategories: () => {
      var result = Category.find().fetch();

      return JSON.stringify(result);
    },
    getTeams: () => {
      var result = Team.find().fetch();

      return JSON.stringify(result);
    },

    getPagesByFullTextPage: function (key) {
      var result = Page.find({ $text: { $search: key } }).fetch();
      return JSON.stringify(result);
    },
    getPageById: function (pageId) {
      var result = Page.find({ _id: pageId }).fetch()[0];
      return JSON.stringify(result);
    },
  });
  Meteor.publish("pages", () => {
    return Page.find({ $text: { $search: "aaa" } }).fetch();
  });

  Meteor.publish("teams", () => {
    return Team.find();
  });
};

const testschema = async () => {
  // Page.insert(page)

  const page = {
    title: "title3",
    content: "content",
    team: "team3",
    category: {
      _id: "2",
      title: "Tool",
      meta: {
        target_group: "target2",
        use_case: "case 2",
        contact_person: "contact person2",
        link: "link2",
      },
    },
    metadata: "meta date for page1",

    // author: "abd1",
  };

  const { error } = validatePage(page);
  console.log(error.message);
  try {
  } catch (e) {
    console.log("this schema error : ", e);
  }
};

function setupTeams() {
  if (Team.find().count() == 0) {
    [
      {
        title: "All",
        description: "Everything concerning everyone",
      },
      {
        title: "Sales",
        description: "Concerning our sellers",
      },
      {
        title: "IT",
        description: "Development and infrastructure",
      },
    ].forEach((team) => {
      Team.insert(team);
    });
  }
}
const setupCategories = async () => {
  if (Category.find().count() === 0) {
    [
      {
        title: "Process",
      },
      {
        title: "Tool",
      },
      {
        title: "Template",
      },
      {
        title: "Resource",
      },
    ].forEach((category) => {
      Category.insert(category);
    });
  }
};

const setupPageIndexSearch = () => {
  try {
    Page._ensureIndex({ content: "text", metadata: "text", title: "text" });
  } catch (ex) {
    console.error("Error setupPageIndexSearch : ", ex);
  }
};
