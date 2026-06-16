import app/data
import lustre/attribute
import lustre/element
import lustre/element/html

pub fn tag(t: data.Tag) -> element.Element(a) {
  html.a(
    [
      attribute.class("tag"),
      attribute.href(t.link),
      attribute.target("_blank"),
      attribute.rel("noopener noreferrer"),
    ],
    [html.text("#" <> t.name)],
  )
}

pub fn icon(src: String) -> element.Element(a) {
  html.img([
    attribute.src(src),
    attribute.alt(""),
    attribute.attribute("aria-hidden", "true"),
    attribute.class("icon"),
  ])
}
