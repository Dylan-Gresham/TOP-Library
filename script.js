let library = [];

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const newButton = document.getElementById('new');
const deleteButton = document.getElementById('delete');
const clearButton = document.getElementById('clear');
const table = document.getElementById('table');
const tableBody = document.getElementById('tbody');

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


newButton.addEventListener('click', event => {
    // Get title
    let title = prompt("What's the title of the book?");
    if(title === null) {
        event.stopPropagation();

        return;
    } else {
        title = title.trim();
    }

    while(title === undefined || title === "") {
        title = prompt("What's the title of the book?");
        if(title === null) {
            event.stopPropagation();

            return;
        } else {
            title = title.trim();
        }
    }

    // Get author
    let author = prompt(`Who's the author of ${title}?`);
    if(author === null) {
        event.stopPropagation();

        return;
    } else {
        author = author.trim();
    }

    while(author === undefined || author === "") {
        author = prompt(`Who's the author of ${title}?`);
        if(author === null) {
            event.stopPropagation();

            return;
        } else {
            author = author.trim();
        }
    }

    // Get number of pages in the book
    let pages = prompt(`How many pages are in ${title}?`);
    if(pages === null) {
        event.stopPropagation();

        return;
    } else {
        pages = pages.trim();
    }

    while(isNaN(pages) || pages === undefined || pages === "") {
        pages = prompt(`How many pages are in ${title}?`);
        if(pages === null) {
            event.stopPropagation();

            return;
        } else {
            pages = pages.trim();
        }
    }

    // Get boolean for if user has finished the book (true) or not (false)
    let completed = prompt(`Have you finished reading ${title}? Enter true or false:`).toLowerCase();
    if(completed === null) {
        event.stopPropagation();

        return;
    } else {
        completed = completed.trim();
    }

    while(completed === undefined || completed === "" ||!(completed === 'true' || completed === 'false')) {
        completed = prompt(`Have you finished reading ${title}? Enter true or false:`).toLowerCase();
        if(completed === null) {
            event.stopPropagation();

            return;
        } else {
            completed = completed.trim();
        }
    }

    // Create the new book
    let newBook = new Book(title, author, pages, completed);
    addBookToLibrary(newBook); // Add to array & table

    event.stopPropagation();
});

clearButton.addEventListener('click', event => {
    tableBody.replaceChildren(); // Removes all children

    event.stopPropagation();
});

deleteButton.addEventListener('click', event => {
    // Gets title to delete
    let deleteTitle = prompt("What's the name of the book you want to delete?");
    if(deleteTitle === null) {
        event.stopPropagation();

        return;
    } else {
        deleteTitle = deleteTitle.trim();
    }

    while(deleteTitle === undefined || deleteTitle === "") {
        deleteTitle = prompt("What's the name of the book you want to delete?");
        if(deleteTitle === null) {
            event.stopPropagation();

            return;
        } else {
            deleteTitle = deleteTitle.trim();
        }
    }

    // Finds index in library
    let oldLength = library.length;
    let i = 0;
    for(i = 0; i < library.length + 1; i++) {
        if(library[i].title === deleteTitle) {
            library.splice(i, 1);
            break;
        }
    }

    if(i === oldLength) {
        event.stopPropagation();
        
        return;
    }

    // Removes row at the found index
    table.deleteRow(i + 1); // + 1 to correct for table vs array indexing

    event.stopPropagation();
});
