import lustre
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html

pub fn main() {
  let app = lustre.simple(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)

  Nil
}

type Model =
  Nil

fn init(_args) -> Model {
  Nil
}

type Msg

fn update(model: Model, msg: Msg) -> Model {
  Nil
}

fn view(model: Model) -> Element(Msg) {
  element.fragment([
    view_navbar(),
    html.main([attribute.class("flex-1 flex items-center justify-center")], [
      view_hero(),
    ]),
  ])
}

fn view_navbar() -> Element(Msg) {
  html.header([], [
    html.nav([attribute.class("bg-background")], [
      html.div([attribute.class("")], [
        html.a([attribute.href("/")], [html.text("Home")]),
      ]),
    ]),
  ])
}

fn view_hero() -> Element(Msg) {
  html.section([attribute.class("sm:flex sm:gap-6")], [
    html.div([], [
      html.img([
        attribute.class(
          "rounded-md xs:size-60 sm:size-50 md:size-60 lg:size-80 xl:size-90",
        ),
        attribute.src("/images/me.jpg"),
        attribute.alt("me"),
      ]),
    ]),
    html.div([attribute.class("mt-3 sm:flex-1 sm:mt-0")], [
      html.h1([attribute.class("font-bold text-xl md:text-2xl xl:text-3xl")], [
        html.text("Vladislav Shakitskiy"),
      ]),
      html.h2(
        [attribute.class("font-semibold text-lg md:text-xl xl:text-2xl")],
        [
          html.text("aka wiskiy"),
        ],
      ),
      html.p(
        [
          attribute.class(
            "mt-4 text-justify leading-6 xs:max-w-md sm:max-w-sm md:max-w-lg md:text-lg xl:text-xl",
          ),
        ],
        [
          html.text(
            "19 y/o, student & developer from Russia. I'm passionate about networking and backend development, and I'm currently working on my own side projects and having fun working with new technologies. In love with ",
          ),
          html.a(
            [
              attribute.class("text-detail"),
              attribute.href("https://gleam.run"),
              attribute.target("_blank"),
            ],
            [html.text("#gleam")],
          ),
          html.text(", "),
          html.a(
            [
              attribute.class("text-detail"),
              attribute.href(
                "https://rateyourmusic.com/list/Hyp3r10n/_dariacore-hyperflip/1/",
              ),
              attribute.target("_blank"),
            ],
            [
              html.text("#hyperflip"),
            ],
          ),
          html.text("."),
        ],
      ),
    ]),
  ])
}
