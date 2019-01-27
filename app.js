// Book constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI(){}

// add Book to List
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');

  // create row
  row = document.createElement('tr');

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a class='delete'>X</a></td>
  `;

  list.appendChild(row);
}

UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function(message, className){
  // create div
  const div = document.createElement('div');
  // add classes
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));

  // get the parent
  const container = document.querySelector('.container');
  // get form
  const form = document.getElementById('book-form');

  container.insertBefore(div, form);

  // disapear alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// UI delete books
UI.prototype.deleteBook = function(target){
  if(target.classList.contains('delete')){
    target.parentElement.parentElement.remove();
    return 1;
  }
}

// Event Listeners
document.getElementById('book-form').addEventListener('submit',
function(e){
  // get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);

  // instanciate ui
  const ui = new UI();

  // validation
  if(book.title === '' || book.author === '' || book.isbn === ''){
    ui.showAlert('Please fill all the fiels', 'error');
  }else{
    // add book to List
    ui.addBookToList(book);

    // book added success
    ui.showAlert('Book added', 'success');

    // ui clear fields
    ui.clearFields();
  }

  e.preventDefault();
})

// Event listener for book delete
document.getElementById('book-list').addEventListener('click',
function(e){
  // instanciate the UI
  const ui = new UI();

  if(ui.deleteBook(e.target)) ui.showAlert('Book deleted', 'success');

  e.preventDefault();
})
