import gleam/result
import gleam/uri
import lustre
import lustre/attribute
import lustre/effect.{type Effect}
import lustre/element.{type Element}
import lustre/element/html
import modem

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)

  Nil
}

pub type Route {
  Home
}

type Model =
  Route

fn init(_args) -> #(Model, Effect(Msg)) {
  let route =
    modem.initial_uri()
    |> result.map(fn(uri) { uri.path_segments(uri.path) })
    |> fn(path) {
      case path {
        _ -> Home
      }
    }

  #(route, modem.init(on_url_change))
}

fn on_url_change(uri: uri.Uri) -> Msg {
  case uri.path_segments(uri.path) {
    _ -> OnRouterChange(Home)
  }
}

type Msg {
  OnRouterChange(Route)
}

fn update(model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    OnRouterChange(route) -> #(route, effect.none())
  }
}

fn view(model: Model) -> Element(Msg) {
  element.fragment([
    view_header(),
    html.main([attribute.class("flex-1 flex items-center justify-center")], [
      case model {
        Home -> view_home()
      },
    ]),
    view_footer(),
  ])
}

fn view_header() -> Element(Msg) {
  html.header([attribute.class("h-7")], [
    html.nav([attribute.class("bg-background")], [
      html.div([attribute.class("")], [
        html.a([attribute.href("/")], [html.text("Home")]),
      ]),
    ]),
  ])
}

fn view_footer() -> Element(Msg) {
  html.footer([], [
    html.p([attribute.class("my-4 text-center text-sm text-stone-500")], [
      html.text("Made with Gleam & Lustre"),
    ]),
  ])
}

fn view_home() -> Element(Msg) {
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
            "mt-4 text-justify leading-6 xs:max-w-md sm:max-w-sm md:max-w-lg
            md:text-lg xl:text-xl",
          ),
        ],
        [
          html.text(
            "19 y/o, student & developer from Russia. I'm passionate about
            networking and backend development, and I'm currently working on my
            own side projects and having fun working with new technologies. In
            love with ",
          ),
          tag("gleam", "https://gleam.run"),
          html.text(", "),
          tag(
            "hyperflip",
            "https://rateyourmusic.com/list/Hyp3r10n/_dariacore-hyperflip/1/",
          ),
          html.text("."),
        ],
      ),
    ]),
  ])
}

fn tag(name: String, link: String) -> Element(Msg) {
  html.a(
    [
      attribute.class("text-detail"),
      attribute.href(link),
      attribute.target("_blank"),
    ],
    [
      html.text("#" <> name),
    ],
  )
}
