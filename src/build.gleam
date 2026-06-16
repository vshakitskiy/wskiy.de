import app/blog
import app/page
import app/rss
import filepath
import gleam/io
import gleam/list
import gleam/string
import lustre/element
import simplifile
import temporary

const out_directory = "dist"

const asset_directory = "assets"

const posts_directory = "writing"

const pages = [
  #(page.home, "index.html"),
  #(page.my_work, "work.html"),
  #(page.contact, "contact.html"),
  #(page.not_found, "404.html"),
]

pub fn main() -> Nil {
  let assert Ok(posts) = blog.parse_posts(posts_directory)
    as "failed to parse posts!"

  let assert Ok(_nil) = build(posts)

  io.println("Success!")
}

fn build(posts: List(blog.Post)) -> Result(Nil, simplifile.FileError) {
  use temporary_directory <- temporary.create(temporary.directory())

  list.map(pages, fn(page) {
    let #(element, filename) = page
    build_page(directory: temporary_directory, element: element(), filename:)
  })

  build_page(
    directory: temporary_directory,
    element: page.blog_index(posts),
    filename: "blog.html",
  )

  let assert Ok(_nil) =
    simplifile.create_directory(filepath.join(temporary_directory, "blog"))
    as "failed to create blog directory!"

  list.each(posts, fn(post) {
    build_page(
      directory: filepath.join(temporary_directory, "blog"),
      element: page.blog_post(post),
      filename: post.slug <> ".html",
    )
  })

  build_rss(temporary_directory, posts)

  let assert Ok(_nil) =
    simplifile.copy_directory(at: asset_directory, to: temporary_directory)
    as "failed to copy assets!"

  let _ = simplifile.delete(out_directory)
  let assert Ok(_nil) = simplifile.create_directory(out_directory)
    as "failed to create out directory!"

  let assert Ok(_nil) =
    simplifile.copy_directory(at: temporary_directory, to: out_directory)
    as "failed to copy temporary directory into output directory!"

  Nil
}

fn build_page(
  directory directory: String,
  element element: element.Element(a),
  filename filename: String,
) -> Nil {
  let assert Ok(_nil) =
    element.to_document_string(element)
    |> simplifile.write(to: filepath.join(directory, filename))
    as { "failed to create " <> filename <> "!" }

  Nil
}

fn build_rss(directory: String, posts: List(blog.Post)) -> Nil {
  let public_posts = list.filter(posts, fn(post) { post.public })

  let assert Ok(_nil) =
    rss.from_posts(public_posts)
    |> element.to_string()
    |> string.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n", _)
    |> simplifile.write(to: filepath.join(directory, "feed.xml"))
    as "failed to create feed.xml!"

  Nil
}
