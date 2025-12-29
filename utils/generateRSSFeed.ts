import RSS from "rss";
import { getSortedPosts } from "./mdxUtils";
import fs from "fs";
import { SITE_URL } from ".";

export default async function generateRssFeed() {
  const allArticles = await getSortedPosts("Article");
  const allToys = await getSortedPosts("Toy");

  // TODO: image_url
  const feedOptions = {
    title: "Blog | Danish Haroon",
    description: "Cool experiments and articles about React and CSS.",
    language: "en-us",
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/rss.xml`,
    // image_url: `${SITE_URL}/logo.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Danish Haroon`,
  };
  const feed = new RSS(feedOptions);

  // TODO: categody for each post (tags)?
  const author = "Danish Haroon";
  const articlesItems = allArticles.map((post) => {
    const url = `${SITE_URL}/blog/${post.slug}`;
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.abstract,
      url,
      guid: url,
      date: post.frontmatter.publishedOn,
      author: "Danish Haroon",
    };
  });
  const toysItems = allToys.map((post) => {
    const url = `${SITE_URL}/toys/${post.slug}`;

    return {
      title: post.frontmatter.title,
      description: post.frontmatter.abstract,
      url,
      guid: url,
      date: post.frontmatter.publishedOn,
      author: "Danish Haroon",
    };
  });
  const feedItems = [...articlesItems, ...toysItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  feedItems.map((item) => feed.item(item));
  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}
