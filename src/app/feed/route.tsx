import {Feed} from "feed";
import {getPosts} from "@/lib/notion";

const feed = new Feed({
  title: "RealTong's Blog",
  description: "This is my personal blog!",
  id: "https://realtong.cn/",
  link: "https://realtong.cn/",
  language: "zh", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: "https://realtong.cn/logo.png",
  favicon: "https://realtong.cn/favicon.ico",
  copyright: "All rights reserved 2024, RealTong",
  author: {
    name: "John Doe",
    email: "johndoe@example.com",
    link: "https://example.com/johndoe"
  }
});


async function generateFeed(posts: any[]) {
  feed.addCategory("Development");

  feed.addContributor({
    name: "RealTong",
    email: "i@realtong.cn",
    link: "https://realtong.cn"
  });
  posts.forEach(post => {
    feed.addItem({
      title: post.properties.name.title[0].plain_text,
      id: post.id,
      link: `https://www.realtong.cn/blog/${post.properties.slug.rich_text[0].plain_text}`,
      description: post.properties.preview.rich_text[0].plain_text,
      date: new Date(post.properties.date.date.start),
    });
  });
  return feed.rss2();
}

export async function GET() {
  const posts = await getPosts();
  const feed = await generateFeed(posts);
  return new Response(feed, {
    headers: { "Content-Type": "application/rss+xml" },
  });
}
