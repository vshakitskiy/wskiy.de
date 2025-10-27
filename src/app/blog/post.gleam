import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/order.{type Order}
import gleam/string
import gleam/time/calendar.{Date}
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html

pub type Post(msg) {
  Post(
    id: String,
    title: String,
    preview: List(Content),
    preview_text: String,
    date: calendar.Date,
    tags: List(String),
    show: Bool,
    view: Element(msg),
  )
}

pub fn compare(one: Post(msg), other: Post(msg)) -> Order {
  let Date(year:, month:, day:) = one.date
  let Date(year: year_other, month: month_other, day: day_other) = other.date

  use <- order.lazy_break_tie(int.compare(year, year_other))
  let month = calendar.month_to_int(month)
  let month_other = calendar.month_to_int(month_other)
  use <- order.lazy_break_tie(int.compare(month, month_other))
  int.compare(day, day_other)
}

pub fn section(title: Option(String), elements: List(Element(msg))) {
  html.section([attribute.class("py-4 space-y-3")], [
    case title {
      Some(title) -> heading(title)
      None -> element.none()
    },
    ..elements
  ])
}

pub fn heading(text: String) {
  html.h2(
    [
      attribute.class("font-bold text-lg md:text-xl xl:text-2xl 2xl:text-3xl"),
    ],
    [
      html.text(text),
    ],
  )
}

pub type Content {
  Text(String)
  Link(Content, to: String)
  Code(String)
  Bold(Content)
  Italic(Content)
  Span(Content, class: String)
}

pub fn content_to_element(content: Content) {
  case content {
    Text(text) -> html.text(text)
    Link(content, to) ->
      html.a(
        [
          attribute.href(to),
          attribute.target("_blank"),
          attribute.class("text-detail underline"),
        ],
        [content_to_element(content)],
      )
    Code(code) ->
      html.code(
        [
          attribute.class(
            "font-monocraft bg-code-background py-1 px-3 rounded-md overflow-x-auto",
          ),
        ],
        [html.text(code)],
      )
    Bold(content) -> html.b([], [content_to_element(content)])
    Italic(content) -> html.i([], [content_to_element(content)])
    Span(content, class) ->
      html.span([attribute.class(class)], [content_to_element(content)])
  }
}

pub fn paragraph(content: List(Content)) {
  html.p(
    [
      attribute.class("text-justify leading-6 md:text-lg xl:text-xl"),
    ],
    list.map(content, content_to_element),
  )
}

pub fn quote(content: List(Content)) {
  html.blockquote(
    [attribute.class("border-l-4 border-detail pl-4")],
    list.map(content, content_to_element),
  )
}

pub fn code_block(language: String, code: String) {
  html.pre(
    [
      attribute.class("bg-code-background p-2 rounded-md overflow-x-auto"),
    ],
    [
      html.code(
        [
          attribute.class("font-monocraft hljs language-" <> language),
          attribute.data("lang", language),
        ],
        [
          html.text(string.trim(code)),
        ],
      ),
    ],
  )
}

pub fn line_break() {
  html.hr([attribute.class("my-6 border-detail border-2 border-dashed")])
}
