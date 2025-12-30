import app/data.{type Tag}
import lustre/attribute as attr
import lustre/element.{type Element}
import lustre/element/html

pub fn tag(t: Tag) -> Element(a) {
  html.a(
    [
      attr.class("tag"),
      attr.href(t.link),
      attr.target("_blank"),
      attr.rel("noopener noreferrer"),
    ],
    [html.text("#" <> t.name)],
  )
}

pub fn icon(src: String) -> Element(a) {
  html.img([
    attr.src(src),
    attr.alt(""),
    attr.attribute("aria-hidden", "true"),
    attr.class("icon"),
  ])
}
