import gleam/list
import gleam/result
import gleam/string
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
  MyWork
}

type Model =
  Route

fn init(_args) -> #(Model, Effect(Msg)) {
  let route =
    modem.initial_uri()
    |> result.map(fn(uri) { uri.path_segments(uri.path) })
    |> fn(path) {
      case path {
        Ok(["work"]) -> MyWork
        _ -> Home
      }
    }

  #(route, modem.init(on_url_change))
}

fn on_url_change(uri: uri.Uri) -> Msg {
  case uri.path_segments(uri.path) {
    ["work"] -> OnRouterChange(MyWork)
    _ -> OnRouterChange(Home)
  }
}

type Msg {
  OnRouterChange(Route)
}

fn update(_model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
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
        MyWork -> view_my_work()
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
        html.a([attribute.href("/work")], [html.text("My work")]),
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
          view_tag(Tag("gleam", "https://gleam.run")),
          html.text(", "),
          view_tag(Tag(
            "hyperflip",
            "https://rateyourmusic.com/list/Hyp3r10n/_dariacore-hyperflip/1/",
          )),
          html.text("."),
        ],
      ),
    ]),
  ])
}

fn view_tag(tag: Tag) -> Element(Msg) {
  html.a(
    [
      attribute.class("text-detail"),
      attribute.href(tag.link),
      attribute.target("_blank"),
    ],
    [
      html.text("#" <> tag.name),
    ],
  )
}

type Project {
  Project(
    name: String,
    description: String,
    github_url: String,
    tags: List(Tag),
  )
}

type Tag {
  Tag(name: String, link: String)
}

fn get_projects() {
  [
    Project(
      name: "ewe",
      description: "Package for building web servers. It supports
      HTTP/1.0, HTTP/1.1, as well as WebSockets & Server-Sent Events. Detailed
      documentation and examples can be found on hexdocs.",
      github_url: "https://github.com/vshakitskiy/ewe",
      tags: [
        Tag("gleam", "https://gleam.run"),
        Tag("hexdocs", "https://hexdocs.pm/ewe"),
      ],
    ),
  ]
}

fn view_my_work() -> Element(Msg) {
  html.section([], [
    html.h1([attribute.class("font-bold text-xl md:text-2xl xl:text-3xl")], [
      html.text("My Work"),
    ]),
    html.ul([attribute.class("mt-4")], list.map(get_projects(), view_project)),
  ])
}

fn view_project(project: Project) {
  html.div([attribute.class("")], [
    html.div([attribute.class("flex items-center gap-2 md:gap-3")], [
      html.h2(
        [attribute.class("font-semibold text-lg md:text-xl xl:text-2xl")],
        [
          html.text(project.name),
        ],
      ),
      html.a(
        [
          attribute.href(project.github_url),
          attribute.target("_blank"),
          attribute.class("block"),
        ],
        [
          html.img([
            attribute.src("/icons/github.svg"),
            attribute.alt("github"),
            attribute.class("size-5 md:size-6"),
          ]),
        ],
      ),
    ]),
    html.p(
      [
        attribute.class(
          "text-justify leading-6 xs:max-w-md sm:max-w-lg md:max-w-xl xl:max-w-2xl 2xl:max-w-3xl
            md:text-lg xl:text-xl",
        ),
      ],
      [
        html.text(project.description),
      ],
    ),
    html.p(
      [attribute.class("mt-2 md:text-lg xl:text-xl")],
      list.map(project.tags, view_tag) |> list.intersperse(html.text(", ")),
    ),
  ])
}
