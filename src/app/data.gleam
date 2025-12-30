pub type Tag {
  Tag(name: String, link: String)
}

pub type Project {
  Project(
    name: String,
    description: String,
    github_url: String,
    tags: List(Tag),
  )
}

pub type Social {
  Social(name: String, display: String, link: String, icon_url: String)
}

pub fn projects() -> List(Project) {
  [
    Project(
      name: "ewe",
      description: "Package for building web servers. It supports HTTP/1.0,
      HTTP/1.1, as well as WebSockets & Server-Sent Events. Detailed
      documentation and examples can be found on hexdocs.",
      github_url: "https://github.com/vshakitskiy/ewe",
      tags: [
        Tag("gleam", "https://gleam.run"),
        Tag("hexdocs", "https://hexdocs.pm/ewe"),
      ],
    ),
  ]
}

pub fn socials() -> List(Social) {
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
