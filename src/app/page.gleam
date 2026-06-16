import app/blog
import app/component
import app/data.{type Project, type Social}
import gleam/list
import lustre/attribute
import lustre/element
import lustre/element/html

pub fn home() -> element.Element(a) {
  page(
    title: "Wiskiy",
    description: "19 y/o, student & developer from Russia.",
    elements: [view_home()],
  )
}

fn view_home() -> element.Element(a) {
  html.article([attribute.class("home-section")], [
    html.figure([], [
      html.img([
        attribute.class("profile-image"),
        attribute.src("/images/me.jpg"),
        attribute.alt("Photo of me :)"),
      ]),
    ]),
    html.div([attribute.class("profile-info")], [
      html.h1([attribute.class("title")], [html.text("Vladislav Shakitskiy")]),
      html.p([attribute.class("subtitle")], [html.text("aka wiskiy")]),
      html.p([attribute.class("description")], [
        html.text(
          "19 y/o, student & developer from Russia. I'm passionate about
          networking and backend development, and I'm currently working on my
          own side projects and having fun working with new technologies. In
          love with ",
        ),
        component.tag(data.Tag("gleam", "https://gleam.run")),
        html.text(", "),
        component.tag(data.Tag(
          "hyperflip",
          "https://rateyourmusic.com/list/Hyp3r10n/_dariacore-hyperflip/1/",
        )),
        html.text("."),
      ]),
    ]),
  ])
}

pub fn my_work() -> element.Element(a) {
  page(title: "My work", description: "", elements: [view_my_work()])
}

fn view_my_work() -> element.Element(a) {
  html.section([], [
    html.h1([attribute.class("title")], [html.text("My Work")]),
    html.ul(
      [attribute.class("projects-list")],
      list.map(data.projects(), view_project),
    ),
  ])
}

fn view_project(project: Project) -> element.Element(a) {
  html.li([], [
    html.article([], [
      html.header([attribute.class("project-header")], [
        html.h2([attribute.class("subtitle")], [html.text(project.name)]),
        html.a(
          [
            attribute.href(project.github_url),
            attribute.target("_blank"),
            attribute.rel("noopener noreferrer"),
            attribute.class("github-link"),
            attribute.attribute(
              "aria-label",
              "View " <> project.name <> " on GitHub",
            ),
          ],
          [component.icon("/icons/github.svg")],
        ),
      ]),
      html.p([attribute.class("project-description")], [
        html.text(project.description),
      ]),
      html.p(
        [attribute.class("project-tags")],
        list.map(project.tags, component.tag)
          |> list.intersperse(html.text(", ")),
      ),
    ]),
  ])
}

pub fn blog_index(posts: List(blog.Post)) -> element.Element(a) {
  page(
    title: "Blog",
    description: "My writings about development and technology.",
    elements: [view_blog(posts)],
  )
}

fn view_blog(posts: List(blog.Post)) -> element.Element(a) {
  html.section([], [
    html.h1([attribute.class("title")], [html.text("My Writings")]),
    html.ul([attribute.class("posts-list")], list.map(posts, view_post_preview)),
  ])
}

fn view_post_preview(post: blog.Post) -> element.Element(a) {
  html.li([attribute.class("post-preview")], [
    html.article([], [
      html.h2([attribute.class("post-title")], [html.text(post.title)]),
      html.time([attribute.class("post-date")], [html.text(post.date)]),
      html.p(
        [attribute.class("post-tags")],
        list.map(post.tags, fn(tag) {
          html.span([attribute.class("post-tag")], [html.text("#" <> tag)])
        })
          |> list.intersperse(html.text(", ")),
      ),
      html.p([attribute.class("post-description")], [
        html.text(post.description),
      ]),
      html.a(
        [
          attribute.href("/blog/" <> post.slug),
          attribute.class("post-read-more"),
        ],
        [html.text("Read more -->")],
      ),
    ]),
  ])
}

pub fn blog_post(post: blog.Post) -> element.Element(a) {
  blog_page(title: post.title, description: post.description, elements: [
    view_blog_post(post),
  ])
}

fn view_blog_post(post: blog.Post) -> element.Element(a) {
  html.section([attribute.class("blog-post")], [
    html.a([attribute.href("/blog"), attribute.class("blog-back-link")], [
      html.text("<-- Back to blog"),
    ]),
    html.hr([attribute.class("blog-divider")]),
    html.article([], [
      html.header([attribute.class("post-header")], [
        html.h1([attribute.class("title")], [html.text(post.title)]),
        html.time([attribute.class("post-date")], [html.text(post.date)]),
        html.p(
          [attribute.class("post-tags")],
          list.map(post.tags, fn(tag) {
            html.span([attribute.class("post-tag")], [html.text("#" <> tag)])
          })
            |> list.intersperse(html.text(", ")),
        ),
      ]),
      html.div([attribute.class("post-content")], blog.render(post)),
    ]),
  ])
}

pub fn contact() -> element.Element(a) {
  page(title: "Contact", description: "", elements: [view_contact()])
}

fn view_contact() -> element.Element(a) {
  html.section([], [
    html.h1([attribute.class("title")], [html.text("Get In Touch")]),
    html.p([attribute.class("contact-description")], [
      html.text(
        "You can contact me anytime via email or through my social media
        accounts!",
      ),
    ]),
    html.address(
      [attribute.class("socials-list")],
      list.map(data.socials(), view_social),
    ),
  ])
}

fn view_social(social: Social) -> element.Element(a) {
  html.div([attribute.class("social-item")], [
    html.span([attribute.class("social-header")], [
      component.icon(social.icon_url),
      html.span([attribute.class("social-name")], [html.text(social.name)]),
    ]),
    html.a(
      [
        attribute.href(social.link),
        attribute.target("_blank"),
        attribute.rel("noopener noreferrer"),
        attribute.class("social-link"),
      ],
      [html.text(social.display)],
    ),
  ])
}

pub fn not_found() -> element.Element(a) {
  page(title: "Not found", description: "Maybe you're lost?", elements: [
    view_not_found(),
  ])
}

fn view_not_found() -> element.Element(a) {
  html.section([], [
    html.h1([attribute.class("error-title")], [html.text("404")]),
    html.p([attribute.class("error-text")], [html.text("Maybe you're lost?")]),
    html.a([attribute.href("/"), attribute.class("home-link")], [
      html.text("<-- Home"),
    ]),
  ])
}

fn page(
  title title: String,
  description description: String,
  elements elements: List(element.Element(a)),
) -> element.Element(a) {
  page_with_scripts(title:, description:, elements:, scripts: [])
}

fn blog_page(
  title title: String,
  description description: String,
  elements elements: List(element.Element(a)),
) -> element.Element(a) {
  page_with_scripts(title:, description:, elements:, scripts: [
    html.script([attribute.src("/highlight.min.js")], ""),
    html.script([attribute.src("/gleam.min.js")], ""),
    html.script([], "hljs.highlightAll();"),
  ])
}

fn page_with_scripts(
  title title: String,
  description description: String,
  elements elements: List(element.Element(a)),
  scripts scripts: List(element.Element(a)),
) -> element.Element(a) {
  html.html([attribute.attribute("lang", "en")], [
    html.head([], [
      html.meta([attribute.attribute("charset", "utf-8")]),
      html.meta([
        attribute.name("viewport"),
        attribute.attribute(
          "content",
          "width=device-width, initial-scale=1.0, viewport-fit=cover",
        ),
      ]),
      html.meta([
        attribute.name("description"),
        attribute.attribute("content", description),
      ]),
      html.title([], title),
      html.link([
        attribute.rel("alternate"),
        attribute.type_("application/rss+xml"),
        attribute.title("wskiy.de posts feed"),
        attribute.href("https://wskiy.de/feed.xml"),
      ]),
      html.link([attribute.rel("stylesheet"), attribute.href("/style.css")]),
    ]),
    html.body([], [
      view_header(),
      html.main([attribute.class("main")], elements),
      view_footer(),
      ..scripts
    ]),
  ])
}

fn view_header() -> element.Element(a) {
  html.header([attribute.class("header")], [
    html.nav([attribute.attribute("aria-label", "Main navigation")], [
      html.ul([attribute.class("nav-list")], [
        html.li([], [html.a([attribute.href("/")], [html.text("Home")])]),
        html.li([], [html.a([attribute.href("/work")], [html.text("Work")])]),
        html.li([], [html.a([attribute.href("/blog")], [html.text("Blog")])]),
        html.li([], [
          html.a([attribute.href("/contact")], [html.text("Contact")]),
        ]),
      ]),
    ]),
  ])
}

fn view_footer() -> element.Element(a) {
  html.footer([attribute.class("footer")], [
    html.p([attribute.class("footer-text")], [
      html.text("Made with Lustre. "),
      html.a(
        [
          attribute.class("footer-link"),
          attribute.href("https://github.com/vshakitskiy/www"),
          attribute.target("_blank"),
          attribute.rel("noopener noreferrer"),
        ],
        [html.text("Source")],
      ),
    ]),
  ])
}
