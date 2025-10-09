import app/blog/post.{type Post}
import app/blog/post/test_post
import gleam/int
import gleam/list
import gleam/time/calendar
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html

pub fn list_posts() -> List(Post(msg)) {
  [test_post.post()]
}

pub fn get_post(id: String) -> Result(Post(msg), Nil) {
  list.find(list_posts(), fn(post) { post.id == id })
}

pub fn view_posts_preview(posts: List(Post(msg))) -> Element(msg) {
  html.ul(
    [attribute.class("mt-4 space-y-4")],
    list.map(posts, view_post_preview),
  )
}

fn view_post_preview(post: Post(msg)) -> Element(msg) {
  html.li([attribute.class("")], [
    html.h2([attribute.class("font-bold text-lg md:text-xl xl:text-2xl")], [
      html.text(post.title),
    ]),
    html.p([attribute.class("mt-2 italic leading-6 md:text-lg xl:text-xl")], [
      html.text(date_to_string(post.date)),
    ]),
    html.p(
      [attribute.class("leading-6 md:text-lg xl:text-xl")],
      view_post_tags(post.tags),
    ),
    html.p(
      [
        attribute.class(
          "mt-2 text-justify leading-6 md:text-lg xl:text-xl xs:max-w-md sm:max-w-lg md:max-w-xl xl:max-w-2xl 2xl:max-w-3xl",
        ),
      ],
      list.map(post.preview, post.content_to_element),
    ),
    html.a(
      [
        attribute.href("/blog/" <> post.id),
        attribute.class(
          "mt-2 block text-detail underline md:text-lg xl:text-xl",
        ),
      ],
      [
        html.text("Read more -->"),
      ],
    ),
  ])
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
