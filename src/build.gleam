import app/page
import filepath
import gleam/io
import gleam/list
import lustre/element.{type Element}
import simplifile
import temporary

const out_directory: String = "dist"

const asset_directory: String = "assets"

const posts_directory: String = "writing"

pub fn main() -> Nil {
  let _name = ""
  // TODO: handle blog posts

  let assert Ok(_nil) = build()

  io.println("Success!")
}

const pages = [
  #(page.home, "index.html"),
  #(page.my_work, "work.html"),
  #(page.contact, "contact.html"),
  #(page.not_found, "404.html"),
]

fn build() -> Result(Nil, simplifile.FileError) {
  use temporary_directory <- temporary.create(temporary.directory())

  list.map(pages, fn(page) {
    build_page(
      directory: temporary_directory,
      element: page.0(),
      filename: page.1,
    )
  })

  // TODO: handle rss

  let assert Ok(_nil) =
    simplifile.copy_directory(at: asset_directory, to: temporary_directory)
    as "failed to copy assets!"
  let assert Ok(_nil) = simplifile.delete(out_directory)
    as "failed to delete out directory!"
  let assert Ok(_nil) = simplifile.create_directory(out_directory)
    as "failed to create out directory!"
  let assert Ok(_nil) =
    simplifile.copy_directory(at: temporary_directory, to: out_directory)
    as "failed to copy temporary directory into output directory!"

  Nil
}

fn build_page(
  directory directory: String,
  element element: Element(a),
  filename filename: String,
) -> Nil {
  let assert Ok(_nil) =
    element.to_document_string(element)
    |> simplifile.write(to: filepath.join(directory, filename))
    as { "failed to create " <> filename <> "!" }

  Nil
}
