const fs = require("fs");
const Slugger = require("slug");
const moment = require("moment");
require("moment/locale/hu");
const feeds = require("./feeds.json");
const { stringSlice } = require("./utils/stringSlice");

moment.locale("hu");

async function getData() {
  const feedData = await Promise.all(
    feeds.map(async (feed) => {
      const fileNameWithPath = `feeds/${Slugger(feed.title)}.txt`;
      if (fs.existsSync(fileNameWithPath)) {
        return fs.promises.readFile(
          fileNameWithPath,
          "utf8",
          function (err, data) {
            JSON.parse(data);
          }
        );
      }
    })
  );

  const issetFiles = !!feedData.filter((x) => x !== undefined).length;
  if (!issetFiles) {
    return [];
  }

  let feedItems = [];
  feedData.map((main) => {
    const mainToObj = JSON.parse(main);
    mainToObj.forEach((feedItem) => {
      const newFeedItem = {
        ...feedItem,
        content: stringSlice(feedItem.content, 150),
        humanDate: moment(feedItem.date).startOf("day").fromNow(),
      };
      feedItems.push(newFeedItem);
    });
  });

  feedItems.sort((a, b) => {
    var c = new Date(a.date);
    var d = new Date(b.date);
    return d - c;
  });

  return feedItems;
}

exports.getData = getData;
