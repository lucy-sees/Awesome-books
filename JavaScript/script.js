const listContainer = document.getElementById('list-container');
const addBTN = document.getElementById('add-btn');
const list = document.getElementById('list');
const addNewBtn = document.getElementById('add-new');
const contactInfo = document.getElementById('contact');
const bookList = document.getElementById('book-list');
const addNewSection = document.getElementById('add-new-section');
const contactSection = document.getElementById('contact-section');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static booksData = [];

  static addBook() {
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();

    if (title && author) {
      const newbook = new Book(title, author);
      this.booksData.push(newbook);
    }
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }

  static setToLocal() {
    localStorage.setItem('bookCollection', JSON.stringify(this.booksData));
  }

  static getFromLocal() {
    const getData = localStorage.getItem('bookCollection');
    if (getData) {
      this.booksData = JSON.parse(getData);
    }
  }

  static createDynamicBooks() {
    this.getFromLocal();
    listContainer.innerHTML = '';
    this.booksData.forEach((book, index) => {
      const contentContainer = document.createElement('div');
      contentContainer.className = 'content-container container-fluid';

      const listItem = document.createElement('li');
      listItem.classList.add('list-item');
      listItem.appendChild(contentContainer);

      const titleContainer = document.createElement('div');
      titleContainer.className = 'title-container container-fluid';
      contentContainer.appendChild(titleContainer);

      const bookName = document.createElement('h2');
      bookName.classList.add('book-name');
      bookName.textContent = `"${book.title}" by ${book.author}`;
      titleContainer.appendChild(bookName);

      const authorContainer = document.createElement('div');
      authorContainer.classList.add('author-container');
      contentContainer.appendChild(authorContainer);

      const authorName = document.createElement('p');
      authorName.classList.add('author-name');
      authorName.textContent = book.author;
      // authorContainer.appendChild(authorName);

      const btnContainer = document.createElement('div');
      btnContainer.classList.add('btn-container');

      const removeBTN = document.createElement('button');
      removeBTN.textContent = 'Remove';
      removeBTN.className = 'remove-btn btn-responsive btn-sm p-1 bg-black text-white border-4 border-danger rounded fw-bold ';
      removeBTN.addEventListener('click', () => {
        this.booksData = this.booksData.filter((book, i) => i !== index);
        this.setToLocal();
        this.createDynamicBooks();
      });
      btnContainer.appendChild(removeBTN);

      listItem.appendChild(btnContainer);

      listContainer.appendChild(listItem);
    });
  }

  static showList() {
    bookList.style.display = 'flex';
    addNewSection.style.display = 'none';
    contactSection.style.display = 'none';
  }

  static showForm() {
    bookList.style.display = 'none';
    addNewSection.style.display = 'flex';
    contactSection.style.display = 'none';
  }

  static showContact() {
    bookList.style.display = 'none';
    addNewSection.style.display = 'none';
    contactSection.style.display = 'flex';
  }
}

addBTN.addEventListener('click', (e) => {
  e.preventDefault();
  Book.addBook();
  Book.setToLocal();
  Book.createDynamicBooks();
});

list.addEventListener('click', Book.showList);
addNewBtn.addEventListener('click', Book.showForm);
contactInfo.addEventListener('click', Book.showContact);

window.addEventListener('load', Book.createDynamicBooks());

// Get the current date and time
const currentDate = new Date();
// Format the date as desired (e.g., "Month Day, Year")
const dayOptions = { year: 'numeric', month: 'long', day: 'numeric' };
const timeOptions = { hour: 'numeric', minute: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-US', dayOptions);
const formattedTime = currentDate.toLocaleTimeString('en-US', timeOptions);
// Display the formatted date in the "currentDate" div
const currentDateDiv = document.getElementById('currentDate');
currentDateDiv.textContent = `${formattedDate}`;
currentDateDiv.textContent += ` ${formattedTime}`;
currentDateDiv.className = 'bg-danger text-white border-3 border rounded fw-bold py-1 px-1 m-1 d-flex align-self-end';
