const API_KEY = "AIzaSyBwbuM_lC3LbUeoe6VevD6AnHjQ281P_u4";

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search-btn");
const form = document.getElementById("form");
const body = document.querySelector("body");
const container = document.querySelector(".container");
const bookList = document.querySelector(".booklist");

async function getData(name) {
  const respData = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${name},Light&key=${API_KEY}`
  );
  const data = await respData.json();

  return data;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  container.innerHTML = "";
  bookList.innerHTML = "";
  const books = await getData(searchTerm.value);
  books.items.forEach((book) => {
    console.log(book);
    const bookEl = document.createElement("div");
    bookEl.classList.add("book-info");

    bookEl.innerHTML = `
    <div class="book-cover">
      <img
        src="${book.volumeInfo.imageLinks["smallThumbnail"]}"
        alt="${book.volumeInfo.authors}"
      />
    </div>
    <div class='title'>   
    <h4>${book.volumeInfo.title}</h4>
    <h5>${book.volumeInfo.authors}</h5>
    </div>

    <div class="read-more">
      <h3>Overview:</h3>
      <span>${
        book.searchInfo.textSnippet ? book.searchInfo.textSnippet : ""
      }</span>
    </div>
    `;

    bookList.appendChild(bookEl);
    searchTerm.value = "";

    console.log(book.volumeInfo.imageLinks);
  });
});
