import app/blog
import app/component
import app/data.{type Project, type Social, Tag}
import gleam/list
import lustre/attribute as attr
import lustre/element.{type Element}
import lustre/element/html

// --- Home -------------------------------------------------------------------

pub fn home() -> Element(a) {
  page(
    title: "Wiskiy",
    description: "19 y/o, student & developer from Russia.",
    elements: [view_home()],
  )
}

fn view_home() -> Element(a) {
  html.article([attr.class("home-section")], [
    html.figure([], [
      html.img([
        attr.class("profile-image"),
        attr.src("/images/me.jpg"),
        attr.alt("Photo of me :)"),
      ]),
    ]),
    html.div([attr.class("profile-info")], [
      html.h1([attr.class("title")], [html.text("Vladislav Shakitskiy")]),
      html.p([attr.class("subtitle")], [html.text("aka wiskiy")]),
      html.p([attr.class("description")], [
        html.text(
          "19 y/o, student & developer from Russia. I'm passionate about
          networking and backend development, and I'm currently working on my
          own side projects and having fun working with new technologies. In
          love with ",
        ),
        component.tag(Tag("gleam", "https://gleam.run")),
        html.text(", "),
        component.tag(Tag(
          "hyperflip",
          "https://rateyourmusic.com/list/Hyp3r10n/_dariacore-hyperflip/1/",
        )),
        html.text("."),
      ]),
    ]),
  ])
}

// --- My work ----------------------------------------------------------------

pub fn my_work() -> Element(a) {
  page(title: "My work", description: "", elements: [view_my_work()])
}

fn view_my_work() -> Element(a) {
  html.section([], [
    html.h1([attr.class("title")], [html.text("My Work")]),
    html.ul(
      [attr.class("projects-list")],
      list.map(data.projects(), view_project),
    ),
  ])
}

fn view_project(project: Project) -> Element(a) {
  html.li([], [
    html.article([], [
      html.header([attr.class("project-header")], [
        html.h2([attr.class("subtitle")], [html.text(project.name)]),
        html.a(
          [
            attr.href(project.github_url),
            attr.target("_blank"),
            attr.rel("noopener noreferrer"),
            attr.class("github-link"),
            attr.attribute(
              "aria-label",
              "View " <> project.name <> " on GitHub",
            ),
          ],
          [component.icon("/icons/github.svg")],
        ),
      ]),
      html.p([attr.class("project-description")], [
        html.text(project.description),
      ]),
      html.p(
        [attr.class("project-tags")],
        list.map(project.tags, component.tag)
          |> list.intersperse(html.text(", ")),
      ),
    ]),
  ])
}

// --- Blog -------------------------------------------------------------------

pub fn blog_index(posts: List(blog.Post)) -> Element(a) {
  page(
    title: "Blog",
    description: "My writings about development and technology.",
    elements: [view_blog(posts)],
  )
}

fn view_blog(posts: List(blog.Post)) -> Element(a) {
  html.section([], [
    html.h1([attr.class("title")], [html.text("My Writings")]),
    html.ul([attr.class("posts-list")], list.map(posts, view_post_preview)),
  ])
}

fn view_post_preview(post: blog.Post) -> Element(a) {
  html.li([attr.class("post-preview")], [
    html.article([], [
      html.h2([attr.class("post-title")], [html.text(post.title)]),
      html.time([attr.class("post-date")], [html.text(post.date)]),
      html.p(
        [attr.class("post-tags")],
        list.map(post.tags, fn(tag) {
          html.span([attr.class("post-tag")], [html.text("#" <> tag)])
        })
          |> list.intersperse(html.text(", ")),
      ),
      html.p([attr.class("post-description")], [html.text(post.description)]),
      html.a(
        [
          attr.href("/blog/" <> post.slug),
          attr.class("post-read-more"),
        ],
        [html.text("Read more -->")],
      ),
    ]),
  ])
}

pub fn blog_post(post: blog.Post) -> Element(a) {
  blog_page(title: post.title, description: post.description, elements: [
    view_blog_post(post),
  ])
}

fn view_blog_post(post: blog.Post) -> Element(a) {
  html.section([attr.class("blog-post")], [
    html.a([attr.href("/blog"), attr.class("blog-back-link")], [
      html.text("<-- Back to blog"),
    ]),
    html.hr([attr.class("blog-divider")]),
    html.article([], [
      html.header([attr.class("post-header")], [
        html.h1([attr.class("title")], [html.text(post.title)]),
        html.time([attr.class("post-date")], [html.text(post.date)]),
        html.p(
          [attr.class("post-tags")],
          list.map(post.tags, fn(tag) {
            html.span([attr.class("post-tag")], [html.text("#" <> tag)])
          })
            |> list.intersperse(html.text(", ")),
        ),
      ]),
      html.div([attr.class("post-content")], blog.render(post)),
    ]),
  ])
}

// --- Contact ----------------------------------------------------------------

pub fn contact() -> Element(a) {
  page(title: "Contact", description: "", elements: [view_contact()])
}

fn view_contact() -> Element(a) {
  html.section([], [
    html.h1([attr.class("title")], [html.text("Get In Touch")]),
    html.p([attr.class("contact-description")], [
      html.text(
        "You can contact me anytime via email or through my social media
        accounts!",
      ),
    ]),
    html.address(
      [attr.class("socials-list")],
      list.map(data.socials(), view_social),
    ),
  ])
}

fn view_social(social: Social) -> Element(a) {
  html.div([attr.class("social-item")], [
    html.span([attr.class("social-header")], [
      component.icon(social.icon_url),
      html.span([attr.class("social-name")], [html.text(social.name)]),
    ]),
    html.a(
      [
        attr.href(social.link),
        attr.target("_blank"),
        attr.rel("noopener noreferrer"),
        attr.class("social-link"),
      ],
      [html.text(social.display)],
    ),
  ])
}

// --- 404 --------------------------------------------------------------------

pub fn not_found() -> Element(a) {
  page(title: "Not found", description: "Maybe you're lost?", elements: [
    view_not_found(),
  ])
}

fn view_not_found() -> Element(a) {
  html.section([], [
    html.h1([attr.class("error-title")], [html.text("404")]),
    html.p([attr.class("error-text")], [html.text("Maybe you're lost?")]),
    html.a([attr.href("/"), attr.class("home-link")], [html.text("<-- Home")]),
  ])
}

// --- Page Template ----------------------------------------------------------

fn page(
  title title: String,
  description description: String,
  elements elements: List(Element(a)),
) -> Element(a) {
  page_with_scripts(title:, description:, elements:, scripts: [])
}

fn blog_page(
  title title: String,
  description description: String,
  elements elements: List(Element(a)),
) -> Element(a) {
  page_with_scripts(title:, description:, elements:, scripts: [
    html.script([attr.src("/highlight.min.js")], ""),
    html.script([attr.src("/gleam.min.js")], ""),
    html.script([], "hljs.highlightAll();"),
  ])
}

fn page_with_scripts(
  title title: String,
  description description: String,
  elements elements: List(Element(a)),
  scripts scripts: List(Element(a)),
) -> Element(a) {
  html.html([attr.attribute("lang", "en")], [
    html.head([], [
      html.meta([attr.attribute("charset", "utf-8")]),
      html.meta([
        attr.name("viewport"),
        attr.attribute(
          "content",
          "width=device-width, initial-scale=1.0, viewport-fit=cover",
        ),
      ]),
      html.meta([
        attr.name("description"),
        attr.attribute("content", description),
      ]),
      html.title([], title),
      html.link([
        attr.rel("alternate"),
        attr.type_("application/rss+xml"),
        attr.title("wskiy.de posts feed"),
        attr.href("https://wskiy.de/feed.xml"),
      ]),
      html.link([attr.rel("stylesheet"), attr.href("/style.css")]),
    ]),
    html.body([], [
      view_header(),
      html.main([attr.class("main")], elements),
      view_footer(),
      ..scripts
    ]),
  ])
}

fn view_header() -> Element(a) {
  html.header([attr.class("header")], [
    html.nav([attr.attribute("aria-label", "Main navigation")], [
      html.ul([attr.class("nav-list")], [
        html.li([], [html.a([attr.href("/")], [html.text("Home")])]),
        html.li([], [html.a([attr.href("/work")], [html.text("Work")])]),
        html.li([], [html.a([attr.href("/blog")], [html.text("Blog")])]),
        html.li([], [
          html.a([attr.href("/contact")], [html.text("Contact")]),
        ]),
      ]),
    ]),
  ])
}

fn view_footer() -> Element(a) {
  html.footer([attr.class("footer")], [
    html.p([attr.class("footer-text")], [
      html.text("Made with Lustre. "),
      html.a(
        [
          attr.class("footer-link"),
          attr.href("https://github.com/vshakitskiy/www"),
          attr.target("_blank"),
          attr.rel("noopener noreferrer"),
        ],
        [html.text("Source")],
      ),
    ]),
  ])
}
