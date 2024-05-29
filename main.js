const books = [];
const EVENT_CHANGE = "change-books";
const SAVED_EVENT = "saved-books";
const STORAGE_KEY = "BOOKSELF_APPS";

// test script 1
// test script 2

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addBook();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Buku Berhasil Ditambahkan",
      text: "Data Buku Berada Di List Belum Dibaca",
      showConfirmButton: false,
      timer: 1500,
    });
    e.target.reset();
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function isStorageExist() {
  if (typeof Storage === undefined) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Browser kamu tidak mendukung local storage!",
    });
    return false;
  }
  return true;
}

function addBook() {
  const inputTitle = document.getElementById("title").value;
  const inputAuthor = document.getElementById("author").value;
  const inputYear = document.getElementById("date").value;

  const generatedID = generateId();
  const newBook = generateNewBook(generatedID, inputTitle, inputAuthor, inputYear, false);
  books.push(newBook);

  document.dispatchEvent(new Event(EVENT_CHANGE));
  saveData();
}

function generateId() {
  return +new Date();
}

function generateNewBook(id, bookTitle, inputAuthor, inputYear, isReaded) {
  return {
    id,
    bookTitle,
    inputAuthor,
    inputYear,
    isReaded,
  };
}

function makeBook(newBook) {
  const bookTitle = document.createElement("h2");
  bookTitle.innerText = newBook.bookTitle;

  const authorName = document.createElement("p");
  authorName.innerText = newBook.inputAuthor;
  const bookYear = document.createElement("p");
  bookYear.innerText = newBook.inputYear;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(bookTitle, authorName, bookYear);

  const container = document.createElement("div");
  container.classList.add("item", "list-item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", `book-${newBook.id}`);

  if (newBook.isReaded) {
    const undoButton = document.createElement("img");
    undoButton.setAttribute("src", "assets/icon/undo-outline.svg");
    undoButton.classList.add("undo-button");

    undoButton.addEventListener("click", function () {
      Swal.fire({
        title: "Pindah Data Buku!",
        text: "Anda Yakin Mengembalikan Buku ke Daftar Belum Dibaca?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        confirmButtonColor: "#00b3ff",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          undoBookTitleFromReaded(newBook.id);
          Swal.fire("Data Buku Dikembalikan ke List Belum Dibaca!", "", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Dibatalkan", "", "error");
        }
      });
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", function () {
      Swal.fire({
        title: "Hapus Data Buku!",
        text: "Anda Yakin Menghapus Buku Dari Rak Yang Sudah Dibaca?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "#d33",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          removeBookTitleFromReaded(newBook.id);
          Swal.fire("Data Buku Berhasil Dihapus!", "", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Dibatalkan", "", "error");
        }
      });
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");

    checkButton.addEventListener("click", function () {
      Swal.fire({
        title: "Pindah Data Buku!",
        text: "Anda Yakin Buku Telah Dibaca?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        confirmButtonColor: "#00b3ff",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          addBookTitleToReadList(newBook.id);
          Swal.fire("Data Buku Dipindahkan ke List Sudah Dibaca!", "", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Dibatalkan", "", "error");
        }
      });
    });

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");

    editButton.addEventListener("click", function () {
      Swal.fire({
        title: "Update Data Buku!",
        text: "Anda Yakin Ingin Edit Buku Dari Rak Yang Belum Dibaca?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        confirmButtonColor: "#00b3ff",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          // removeBookTitleFromReaded(newBook.id);
          Swal.fire("Data Buku Berhasil Dihapus!", "", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Dibatalkan", "", "error");
        }
      });
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", function () {
      Swal.fire({
        title: "Hapus Data Buku!",
        text: "Anda Yakin Menghapus Buku Dari Rak Yang Belum Dibaca?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "#d33",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          removeBookTitleFromReaded(newBook.id);
          Swal.fire("Data Buku Berhasil Dihapus!", "", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Dibatalkan", "", "error");
        }
      });
    });

    container.append(checkButton, editButton, trashButton);
  }

  return container;
}

document.addEventListener(EVENT_CHANGE, function () {
  const list = books.length;
  const read = [];
  const unRead = [];
  const unReadBooksList = document.getElementById("books");
  unReadBooksList.innerHTML = "";

  const readBookList = document.getElementById("books-items");
  readBookList.innerHTML = "";

  const unReadBook = document.getElementById("unread-book");
  unReadBook.innerText = "";
  const readBook = document.getElementById("read-book");
  readBook.innerText = "";

  for (const bookItem of books) {
    const bookList = makeBook(bookItem);
    if (bookItem.isReaded) {
      readBookList.append(bookList);
      read.push(readBookList);
      readBook.innerText = read.length;
    } else {
      unReadBooksList.append(bookList);
      unRead.push(bookList);
      unReadBook.innerText = unRead.length;
    }
  }
  ifNoList();
  totalOfBooks();
});

function ifNoList() {
  const list = books.length;
  const container = document.querySelector(".no-list");
  if (list == 0) {
    container.classList.add("picture");
  } else {
    container.classList.remove("picture");
  }
}

const resetList = document.getElementById("btn-reset");
resetList.addEventListener("click", function () {
  const reset = books.length;
  if (reset == 0) {
    Swal.fire({
      title: "List Buku Kosong?",
      icon: "question",
    });
  } else {
    Swal.fire({
      title: "Hapus Semua List Buku!",
      text: "Anda Yakin Menghapus Semua List?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      confirmButtonColor: "#d33",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        resetBookList(reset);
        Swal.fire("Semua List Buku Berhasil Dihapus!", "", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Dibatalkan", "", "error");
      }
    });
  }
});

function totalOfBooks() {
  const totalBooks = document.getElementById("total-books");
  totalBooks.innerHTML = books.length;
}

function addBookTitleToReadList(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isReaded = true;
  document.dispatchEvent(new Event(EVENT_CHANGE));
  saveData();
}

document.getElementById("bookTitle").addEventListener("keyup", function () {
  const inputValue = document.getElementById("bookTitle").value;
  const listBooks = document.querySelectorAll(".list-item");

  for (let i = 0; i < listBooks.length; i++) {
    if (!inputValue || listBooks[i].textContent.toLowerCase().indexOf(inputValue) > -1) {
      listBooks[i].classList.remove("hide");
    } else {
      listBooks[i].classList.add("hide");
    }
  }
});

function findBook(bookId) {
  for (const todoItem of books) {
    if (todoItem.id === bookId) {
      return todoItem;
    }
  }
  return null;
}

function removeBookTitleFromReaded(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(EVENT_CHANGE));
  saveData();
}
function resetBookList(newBook) {
  const resetAll = bookIndex(newBook);

  if (resetAll) return;

  books.splice(resetAll);
  document.dispatchEvent(new Event(EVENT_CHANGE));
  saveData();
}

function undoBookTitleFromReaded(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isReaded = false;
  document.dispatchEvent(new Event(EVENT_CHANGE));
  saveData();
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }

  return -1;
}

function bookIndex(newBook) {
  for (const index in books) {
    if (books[index] === newBook) {
      return index;
    }
  }
}
// function updateBook(bookId) {
//   const
// }
document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(EVENT_CHANGE));
}
