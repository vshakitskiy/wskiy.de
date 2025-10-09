import app/blog/post.{type Post}
import app/blog/post/test_post
import gleam/int
import gleam/list
import gleam/time/calendar
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html

pub fn posts() -> List(Post(msg)) {
  [test_post.post()]
}

pub fn view_post(post: Post(msg)) {
  highlight()

  html.section([attribute.class("max-w-full")], [
    html.a(
      [
        attribute.href("/blog"),
        attribute.class("block text-detail underline md:text-lg xl:text-xl"),
      ],
      [
        html.text("<-- Back to blog"),
      ],
    ),
    html.hr([attribute.class("my-6 border-detail border-2 border-dashed")]),
    html.div([attribute.class("mt-8")], [
      html.h1(
        [attribute.class("font-bold text-xl md:text-2xl xl:text-3xl mt-8")],
        [
          html.text(post.title),
        ],
      ),
      html.p(
        [
          attribute.class("mt-2 italic leading-6 md:text-lg xl:text-xl"),
        ],
        [html.text(date_to_string(post.date))],
      ),
      html.p(
        [
          attribute.class("mt-2 leading-6 md:text-lg xl:text-xl"),
        ],
        view_post_tags(post.tags),
      ),
    ]),
    post.view,
  ])
}

fn date_to_string(date: calendar.Date) -> String {
  int.to_string(date.day)
  <> " "
  <> calendar.month_to_string(date.month)
  <> " "
  <> int.to_string(date.year)
}

fn view_post_tags(tags: List(String)) -> List(Element(msg)) {
  list.map(tags, fn(tag) {
    html.span([attribute.class("text-detail")], [
      html.text("#" <> tag),
    ])
  })
  |> list.intersperse(html.text(", "))
}

@external(javascript, "../ffi.mjs", "highlight")
fn highlight() -> Nil
