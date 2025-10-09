import app/blog/post
import gleam/option.{None, Some}
import gleam/time/calendar
import lustre/element/html

pub fn post() {
  post.Post(
    id: "test_post",
    title: "Test Post",
    description: "This is a test post",
    date: calendar.Date(day: 1, month: calendar.January, year: 2021),
    tags: ["gleam", "test", "lorem ipsum"],
    show: True,
    view: view(),
  )
}

const hello_world = "
import gleam/io

fn main() {
  // This is a comment
  let x = <<3, 1, 4, 1, 5, 9>>
  io.println(\"Hello, world!\")
}
"

pub fn view() {
  html.article([], [
    post.section(Some("What is Lorem Ipsum?"), [
      post.paragraph([
        post.Text(
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        ),
        post.Link(
          post.Bold(post.Italic(post.Text("Lorem Ipsum"))),
          "https://www.lipsum.com/",
        ),
        post.Text(
          " has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
        ),
        post.Bold(post.Text(
          "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        )),
        post.Text(
          " It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        ),
      ]),
    ]),
    post.section(Some("Where does it come from?"), [
      post.paragraph([
        post.Text(
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.",
        ),
      ]),
    ]),
    post.section(Some("Why do we use it?"), [
      post.paragraph([
        post.Text(
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        ),
      ]),
      post.quote([
        post.Text(
          "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. ",
        ),
        post.Code("use"),
        post.Text(" is not simply random text."),
        post.Bold(post.Text(
          " Contrary to popular belief, Lorem Ipsum is not simply random text.",
        )),
      ]),
    ]),
    post.line_break(),
    post.section(None, [
      post.code_block("gleam", hello_world),
    ]),
  ])
}
