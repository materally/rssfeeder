const fs = require("fs");
const Parser = require("rss-parser");
const Slugger = require("slug");
const feeds = require("./feeds.json");

function rssFeeder() {
  feeds.map((feed) => {
    (async function main() {
      const parser = new Parser();
      const feedResult = await parser.parseURL(feed.url);
      const fileNameWithPath = `feeds/${Slugger(feed.title)}.txt`;

      let items = [];
      await Promise.all(
        feedResult.items.map(async (currentItem) => {
          items.push({
            author: feed.title,
            title: currentItem.title,
            url: currentItem.link,
            categories: currentItem?.categories,
            date: currentItem?.pubDate,
            content: currentItem?.contentSnippet,
          });
        })
      );

      fs.writeFileSync(fileNameWithPath, JSON.stringify(items));
    })();
  });

  return true;
}

exports.rssFeeder = rssFeeder;
