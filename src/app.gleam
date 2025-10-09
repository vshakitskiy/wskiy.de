import app/blog
import app/route.{type Route}
import gleam/list
import gleam/result
import lustre
import lustre/attribute
import lustre/effect.{type Effect}
import lustre/element.{type Element}
import lustre/element/html
import modem

pub fn main() {
  let app = lustre.application(init, update, view_layout)
  let assert Ok(_) = lustre.start(app, "#app", Nil)

  Nil
}

type Model =
  route.Route

fn init(_args) -> #(Model, Effect(Msg)) {
  let route =
    modem.initial_uri()
    |> result.map(route.from_uri)
    |> result.unwrap(route.NotFound)

  #(route, modem.init(fn(uri) { OnRouterChange(route.from_uri(uri)) }))
}

type Msg {
  OnRouterChange(Route)
}

fn update(_model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    OnRouterChange(route) -> #(route, effect.none())
  }
}

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

fn view_layout(model: Model) -> Element(Msg) {
  element.fragment([
    view_header(),
    html.main([attribute.class("flex-1 flex items-center justify-center")], [
      case model {
        route.Home -> view_home()
        route.Work -> view_my_work()
        route.Blog -> view_blog()
        route.Contact -> view_contact()

        route.NotFound -> view_not_found()
      },
    ]),
    view_footer(),
  ])
}

fn view_header() -> Element(Msg) {
  html.header([attribute.class("py-4")], [
    html.nav([], [
      html.ul([attribute.class("flex justify-center gap-6")], [
        html.li([], [
          html.a([attribute.href("/")], [html.text("Home")]),
        ]),
        html.li([], [
          html.a([attribute.href("/work")], [html.text("Work")]),
        ]),
        html.li([], [
          html.a([attribute.href("/blog")], [html.text("Blog")]),
        ]),
        html.li([], [
          html.a([attribute.href("/contact")], [html.text("Contact")]),
        ]),
      ]),
    ]),
  ])
}

fn view_footer() -> Element(Msg) {
  html.footer([attribute.class("py-4")], [
    html.p([attribute.class("text-center text-sm text-stone-500")], [
      html.text("Made with Lustre. "),
      html.a(
        [
          attribute.class("underline"),
          attribute.href("https://github.com/vshakitskiy/www"),
          attribute.target("_blank"),
        ],
        [html.text("Source")],
      ),
    ]),
  ])
}

// -----------------------------------------------------------------------------
// Home
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// My Work
// -----------------------------------------------------------------------------

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
          "text-justify leading-6 xs:max-w-md sm:max-w-lg md:max-w-xl 
          xl:max-w-2xl 2xl:max-w-3xl md:text-lg xl:text-xl",
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

// -----------------------------------------------------------------------------
// Blog
// -----------------------------------------------------------------------------

fn view_blog() -> Element(Msg) {
  let assert [post] = blog.posts()

  blog.view_post(post)
}

// -----------------------------------------------------------------------------
// Contact
// -----------------------------------------------------------------------------

type Social {
  Social(name: String, display: String, link: String, icon_url: String)
}

fn get_socials() {
  [
    Social(
      name: "Email",
      display: "vshakitskiy@gmail.com",
      link: "mailto:vshakitskiy@gmail.com",
      icon_url: "/icons/email.svg",
    ),
    Social(
      name: "Discord",
      display: "@vshakitskiy",
      link: "https://discord.com/users/511911643475738656",
      icon_url: "/icons/discord.svg",
    ),
    Social(
      name: "GitHub",
      display: "vshakitskiy",
      link: "https://github.com/vshakitskiy",
      icon_url: "/icons/github.svg",
    ),
    Social(
      name: "Telegram",
      display: "@vshakitskiy",
      link: "https://t.me/vshakitskiy",
      icon_url: "/icons/telegram.svg",
    ),
  ]
}

fn view_contact() -> Element(Msg) {
  html.section([attribute.class("")], [
    html.h1([attribute.class("font-bold text-xl md:text-2xl xl:text-3xl")], [
      html.text("Get In Touch"),
    ]),
    html.p(
      [
        attribute.class(
          "mt-2 text-justify leading-6 md:text-lg xl:text-xl xs:max-w-md 
          sm:max-w-lg md:max-w-xl xl:max-w-2xl 2xl:max-w-3xl",
        ),
      ],
      [
        html.text(
          "You can contact me anytime via email or through my social media
      accounts!",
        ),
      ],
    ),
    html.ul(
      [
        attribute.class(
          "mt-4 flex flex-col gap-2 sm:justify-around sm:flex-row sm:flex-wrap 
          xs:max-w-md sm:max-w-lg md:max-w-xl xl:max-w-2xl 2xl:max-w-3xl",
        ),
      ],
      // TODO: add status indicator
      list.map(get_socials(), view_social),
    ),
  ])
}

fn view_social(social: Social) {
  html.li(
    [
      attribute.class("w-full sm:w-[49%]"),
    ],
    [
      html.div([attribute.class("flex items-center gap-2")], [
        html.img([
          attribute.src(social.icon_url),
          attribute.alt(social.name),
          attribute.class("size-5 md:size-6"),
        ]),
        html.span([attribute.class("md:text-lg xl:text-xl")], [
          html.text(social.name),
        ]),
      ]),
      html.a(
        [
          attribute.href(social.link),
          attribute.target("_blank"),
          attribute.class("block underline text-detail md:text-lg xl:text-xl"),
        ],
        [
          html.text(social.display),
        ],
      ),
    ],
  )
}

// -----------------------------------------------------------------------------
// 404
// -----------------------------------------------------------------------------

fn view_not_found() -> Element(Msg) {
  html.section([], [
    html.h1([attribute.class("font-bold text-3xl md:text-4xl")], [
      html.text("404"),
    ]),
    html.p([attribute.class("mt-2 md:text-lg xl:text-xl")], [
      html.text("Maybe you're lost?"),
    ]),
    html.a(
      [
        attribute.href("/"),
        attribute.class("text-detail md:text-lg xl:text-xl"),
      ],
      [
        html.text("<-- Home"),
      ],
    ),
  ])
}
