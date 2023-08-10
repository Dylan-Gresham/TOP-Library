let library = [];

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    library.push(book); // Add to array

    // Create DOM elements to update the table
    const newRow = document.createElement('tr');

    const newTitle = document.createElement('td');
    newTitle.textContent = book.title;

    const newAuthor = document.createElement('td');
    newAuthor.textContent = book.author;

    const newPages = document.createElement('td');
    newPages.textContent = book.pages;

    const newRead = document.createElement('td');
    if(book.read === 'true') {
        newRead.textContent = 'Yes';
    } else {
        newRead.textContent = 'No';
    }

    // Add table cells to table row
    newRow.appendChild(newTitle);
    newRow.appendChild(newAuthor);
    newRow.appendChild(newPages);
    newRow.appendChild(newRead);

    // Add table row to table body
    tableBody.appendChild(newRow);
    
    return;
}

const newButton = document.getElementById('new');
const deleteButton = document.getElementById('delete');
const clearButton = document.getElementById('clear');
const tableBody = document.getElementById('tbody');

newButton.addEventListener('click', event => {
    let title = prompt("What's the title of the book?");
    if(title === null) {
        return;
    } else {
        title = title.trim();
    }

    while(title === undefined || title === "") {
        title = prompt("What's the title of the book?");
        if(title === null) {
            return;
        } else {
            title = title.trim();
        }
    }

    let author = prompt(`Who's the author of ${title}?`);
    if(author === null) {
        return;
    } else {
        author = author.trim();
    }

    while(author === undefined || author === "") {
        author = prompt(`Who's the author of ${title}?`);
        if(author === null) {
            return;
        } else {
            author = author.trim();
        }
    }

    let pages = prompt(`How many pages are in ${title}?`);
    if(pages === null) {
        return;
    } else {
        pages = pages.trim();
    }

    while(+pages === NaN || pages === undefined || pages === "") {
        pages = prompt(`How many pages are in ${title}?`);
        if(pages === null) {
            return;
        } else {
            pages = pages.trim();
        }
    }

    let completed = prompt(`Have you finished reading ${title}? Enter true or false:`).toLowerCase();
    if(completed === null) {
        return;
    } else {
        completed = completed.trim();
    }

    while(completed === undefined || completed === "" ||!(completed === 'true' || completed === 'false')) {
        completed = prompt(`Have you finished reading ${title}? Enter true or false:`).toLowerCase();
        if(completed === null) {
            return;
        } else {
            completed = completed.trim();
        }
    }

    let newBook = new Book(title, author, pages, completed);
    addBookToLibrary(newBook);
});
