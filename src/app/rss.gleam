import app/blog
import gleam/int
import gleam/list
import gleam/order
import gleam/result
import gleam/string
import lustre/attribute
import lustre/element.{element as tag}
import lustre/element/html

pub fn from_posts(posts: List(blog.Post)) -> element.Element(a) {
  let latest_date = case posts {
    [first, ..rest] ->
      list.fold(rest, first.date, fn(latest, post) {
        case compare_dates(post.date, latest) {
          True -> post.date
          False -> latest
        }
      })
    [] -> ""
  }

  tag("rss", [attribute.attribute("version", "2.0")], [
    tag("channel", [], [
      tag("title", [], [html.text("wskiy.de posts feed")]),
      link("https://wskiy.de"),
      tag("description", [], [
        html.text("My writings about programming and stuff."),
      ]),
      tag("language", [], [html.text("en")]),
      tag("pubDate", [], [html.text(to_rss_date(latest_date))]),
      ..list.map(posts, to_item)
    ]),
  ])
}

fn to_item(post: blog.Post) -> element.Element(a) {
  tag("item", [], [
    tag("title", [], [html.text(post.title)]),
    link("https://wskiy.de/blog/" <> post.slug),
    tag("description", [], [html.text(post.description)]),
    tag("author", [], [html.text("vshakitskiy@gmail.com")]),
    tag("pubDate", [], [html.text(to_rss_date(post.date))]),
  ])
}

fn link(url: String) -> element.Element(a) {
  element.unsafe_raw_html("", "link", [], url)
}

fn to_rss_date(date: String) -> String {
  let parts =
    date
    |> string.replace(",", "")
    |> string.split(" ")

  case parts {
    [day, month, year] -> {
      let day = string.pad_start(day, to: 2, with: "0")
      let month = to_short_month(month)
      day <> " " <> month <> " " <> year <> " 00:00:00 GMT"
    }
    _ -> date
  }
}

fn to_short_month(month: String) -> String {
  case string.lowercase(month) {
    "january" -> "Jan"
    "february" -> "Feb"
    "march" -> "Mar"
    "april" -> "Apr"
    "may" -> "May"
    "june" -> "Jun"
    "july" -> "Jul"
    "august" -> "Aug"
    "september" -> "Sep"
    "october" -> "Oct"
    "november" -> "Nov"
    "december" -> "Dec"
    _ -> month
  }
}

fn compare_dates(a: String, b: String) -> Bool {
  let #(ay, am, ad) = parse_date(a)
  let #(by, bm, bd) = parse_date(b)

  case int.compare(ay, by) {
    order.Gt -> True
    order.Lt -> False
    order.Eq ->
      case int.compare(am, bm) {
        order.Gt -> True
        order.Lt -> False
        order.Eq -> ad > bd
      }
  }
}

fn parse_date(date: String) -> #(Int, Int, Int) {
  case string.replace(date, ",", "") |> string.split(" ") {
    [day, month, year] -> {
      let day = int.parse(day) |> result.unwrap(1)
      let year = int.parse(year) |> result.unwrap(2000)
      let month = month_to_number(month)
      #(year, month, day)
    }
    _ -> #(2000, 1, 1)
  }
}

fn month_to_number(month: String) -> Int {
  case string.lowercase(month) {
    "january" -> 1
    "february" -> 2
    "march" -> 3
    "april" -> 4
    "may" -> 5
    "june" -> 6
    "july" -> 7
    "august" -> 8
    "september" -> 9
    "october" -> 10
    "november" -> 11
    "december" -> 12
    _ -> 1
  }
}
