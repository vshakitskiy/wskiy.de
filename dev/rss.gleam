import app/blog
import app/blog/post.{type Post}
import gleam/int
import gleam/list
import gleam/order
import gleam/string
import gleam/time/calendar
import lustre/attribute
import lustre/element.{type Element, element}
import lustre/element/html
import simplifile

pub fn main() {
  let posts = blog.list_posts()

  let assert Ok(_) =
    feed_from_posts(posts)
    |> element.to_string()
    |> string.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n", _)
    |> simplifile.write(to: "assets/feed.xml")
    as "failed to create feed.xml"
}

pub fn feed_from_posts(posts: List(Post(msg))) -> Element(msg) {
  let assert Ok(latest_post) =
    list.reduce(posts, fn(one, other) {
      case post.compare(one, other) {
        order.Gt | order.Eq -> one
        order.Lt -> other
      }
    })

  element("rss", [attribute.attribute("version", "2.0")], [
    element("channel", [], [
      element("title", [], [html.text("wskiy.de posts feed")]),
      link("https://wskiy.de"),
      element("description", [], [
        html.text("My writings about programming and stuff."),
      ]),
      element("language", [], [html.text("en")]),
      element("pubDate", [], [
        html.text(to_rss_date_string(latest_post.date)),
      ]),
      ..list.map(posts, to_feed_item)
    ]),
  ])
}

fn to_feed_item(post: Post(msg)) -> Element(msg) {
  element("item", [], [
    element("title", [], [html.text(post.title)]),
    link("https://wskiy.de/blog/" <> post.id),
    element("description", [], [
      html.text(post.preview_text),
    ]),
    element("author", [], [html.text("vshakitskiy@gmail.com")]),
    element("pubDate", [], [html.text(to_rss_date_string(post.date))]),
  ])
}

fn to_rss_date_string(date: calendar.Date) -> String {
  let calendar.Date(year:, month:, day:) = date

  let day = int.to_string(day) |> string.pad_start(to: 2, with: "0")
  let year = int.to_string(year)

  let month = case month {
    calendar.April -> "Apr"
    calendar.August -> "Aug"
    calendar.December -> "Dec"
    calendar.February -> "Feb"
    calendar.January -> "Jan"
    calendar.July -> "Jul"
    calendar.June -> "Jun"
    calendar.March -> "Mar"
    calendar.May -> "May"
    calendar.November -> "Nov"
    calendar.October -> "Oct"
    calendar.September -> "Sep"
  }

  day <> " " <> month <> " " <> year <> " 00:00:00 GMT"
}

fn link(url: String) -> Element(msg) {
  element.unsafe_raw_html("", "link", [], url)
}
