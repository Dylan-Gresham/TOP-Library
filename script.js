/* Library logic: */
let library = [];

// Create Book object constructor
function Book(title, author, pages, read = false, rating = 'N/A') {
    // Input validation
    read = (read === "true") ? true : false;
    
    // Set values
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;

    return;
}

// Get elements
const newButton = document.getElementById('new');
const deleteButton = document.getElementById('delete');
const clearButton = document.getElementById('clear');
const table = document.getElementById('table');
const tableBody = document.getElementById('tbody');
const dialogElement = document.getElementById('addDialog');

// Logic for adding a book to both the library array and the table
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
    const newCheckButton = document.createElement('input');
    newCheckButton.type = "checkbox";
    newCheckButton.classList.add('readButton');
    
    newCheckButton.addEventListener('click', event => {
        let i = newCheckButton.parentElement.parentElement.rowIndex - 1;
        if(library[i].read === true) {
            library[i].read = false;
        } else {
            library[i].read = true;
        }

        event.stopPropagation();

        return;
    });

    if(book.read === true) {
        newCheckButton.checked = true;
    } else {
        newCheckButton.checked = false;
    }
    newRead.appendChild(newCheckButton);

    const newRating = document.createElement('td');
    newRating.textContent = book.rating;

    // Add table cells to table row
    newRow.appendChild(newTitle);
    newRow.appendChild(newAuthor);
    newRow.appendChild(newPages);
    newRow.appendChild(newRead);
    newRow.appendChild(newRating);

    // Add table row to table body
    tableBody.appendChild(newRow);
    
    return;
}

// Button Logic
newButton.addEventListener('click', event => {
    dialogElement.showModal();

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

/* Adding Dialog Form Logic: */
// Get elements of the dialog
const dialogForm = document.getElementById('addDialogForm');
const newTitle = document.getElementById('newTitle');
const newAuthor = document.getElementById('newAuthor');
const newPages = document.getElementById('newPages');
const newFinished = document.getElementById('newFinished');
const newRating = document.getElementById('newRating');
const addButton = document.getElementById('addButton');
const cancelButton = document.getElementById('cancelButton');


// Cancel button triggers close event, book will be created and added here.
dialogElement.addEventListener('close', event => {
    // Handle if the dialog is canceled and not "submitted"
    if(dialogElement.returnValue === "") {
        event.stopPropagation();

        return;
    }

    // Create array of return values
    let returnTokens = dialogElement.returnValue.split(", ");
    
    // Create book and add to library/table
    let newBook = new Book(returnTokens[0], returnTokens[1], +returnTokens[2], returnTokens[3], +returnTokens[4]);
    addBookToLibrary(newBook);

    event.stopPropagation();
});

// Implement explicit cancel button logic to override the required attributes
cancelButton.addEventListener('click', event => {
    dialogElement.close(); // No parameters with the close function so that the dialogElement listener catches it

    event.stopPropagation();
});

// Validate then "Submit" the information entered.
addButton.addEventListener('click', event => {
    event.preventDefault(); // Stops submission to page itself
    const numValidationRegex = /^[0-9]+$/;

    let numPages = newPages.value;
    let ratingNum = newRating.value;

    if(!numPages.match(numValidationRegex)) {
        event.stopPropagation();

        return;
    } else if(!ratingNum.match(numValidationRegex)) {
        event.stopPropagation();

        return;
    }

    // Close the dialog and "submit" the information
    dialogElement.close(`${newTitle.value}, ${newAuthor.value}, ${numPages}, ${newFinished.checked}, ${ratingNum}`);

    event.stopPropagation();
});

/* Deletion Dialog Form Logic: */
// Get elements of the dialog

// Cancel button triggers close event, book will be found and deleted here.
