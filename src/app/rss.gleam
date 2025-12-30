import app/blog.{type Post}
import gleam/int
import gleam/list
import gleam/order
import gleam/result
import gleam/string
import lustre/attribute
import lustre/element.{type Element, element}
import lustre/element/html

pub fn from_posts(posts: List(Post)) -> Element(a) {
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

  element("rss", [attribute.attribute("version", "2.0")], [
    element("channel", [], [
      element("title", [], [html.text("wskiy.de posts feed")]),
      link("https://wskiy.de"),
      element("description", [], [
        html.text("My writings about programming and stuff."),
      ]),
      element("language", [], [html.text("en")]),
      element("pubDate", [], [html.text(to_rss_date(latest_date))]),
      ..list.map(posts, to_item)
    ]),
  ])
}

fn to_item(post: Post) -> Element(a) {
  element("item", [], [
    element("title", [], [html.text(post.title)]),
    link("https://wskiy.de/blog/" <> post.slug),
    element("description", [], [html.text(post.description)]),
    element("author", [], [html.text("vshakitskiy@gmail.com")]),
    element("pubDate", [], [html.text(to_rss_date(post.date))]),
  ])
}

fn link(url: String) -> Element(a) {
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
  let a_parts = parse_date(a)
  let b_parts = parse_date(b)

  case a_parts, b_parts {
    #(ay, am, ad), #(by, bm, bd) -> {
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
  }
}

fn parse_date(date: String) -> #(Int, Int, Int) {
  let parts =
    date
    |> string.replace(",", "")
    |> string.split(" ")

  case parts {
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
