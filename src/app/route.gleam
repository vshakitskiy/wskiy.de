import gleam/uri

pub type Route {
  Home
  Work
  Blog
  BlogPost(id: String)
  Contact

  NotFound
}

pub fn from_uri(uri: uri.Uri) -> Route {
  case uri.path_segments(uri.path) {
    [] -> Home
    ["work"] -> Work
    ["blog"] -> Blog
    ["blog", id] -> BlogPost(id)
    ["contact"] -> Contact

    _ -> NotFound
  }
}
