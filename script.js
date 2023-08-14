/* Library logic: */
let library = [];

// Create Book object constructor
class Book {
    constructor(title, author, pages, read = false, rating = 'N/A') {
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
}

// Get elements
const newButton = document.getElementById('new');
const deleteButton = document.getElementById('delete');
const clearButton = document.getElementById('clear');
const table = document.getElementById('table');
const tableBody = document.getElementById('tbody');
const addDialogElement = document.getElementById('addDialog');
const deleteDialogElement = document.getElementById('deleteDialog');

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

    const newDeleteTD = document.createElement('td');
    const newDeleteButton = document.createElement('button');
    newDeleteButton.setAttribute('value', library.length);
    newDeleteButton.classList.add('tableRemove');
    newDeleteButton.textContent = 'Delete';
    newDeleteButton.addEventListener('click', event => {
        library.splice(newDeleteButton.getAttribute('value'), 1);
        table.deleteRow(newDeleteButton.getAttribute('value'));
    });
    newDeleteTD.appendChild(newDeleteButton);

    // Add table cells to table row
    newRow.appendChild(newTitle);
    newRow.appendChild(newAuthor);
    newRow.appendChild(newPages);
    newRow.appendChild(newRead);
    newRow.appendChild(newRating);
    newRow.appendChild(newDeleteTD);

    // Add table row to table body
    tableBody.appendChild(newRow);
    
    return;
}

// Button Logic
newButton.addEventListener('click', event => {
    addDialogElement.showModal();

    event.stopPropagation();
});

clearButton.addEventListener('click', event => {
    tableBody.replaceChildren(); // Removes all children

    event.stopPropagation();
});

deleteButton.addEventListener('click', event => {
    deleteDialogElement.showModal();

    event.stopPropagation();
});

/* Adding Dialog Form Logic: */
// Get elements of the dialog
const newTitle = document.getElementById('newTitle');
const newAuthor = document.getElementById('newAuthor');
const newPages = document.getElementById('newPages');
const newFinished = document.getElementById('newFinished');
const newRating = document.getElementById('newRating');
const addButton = document.getElementById('addButton');
const addCancelButton = document.getElementById('addCancelButton');

// Cancel button triggers close event, book will be created and added here.
addDialogElement.addEventListener('close', event => {
    // Handle if the dialog is canceled and not "submitted"
    if(addDialogElement.returnValue === "") {
        event.stopPropagation();

        return;
    }

    // Create array of return values
    let returnTokens = addDialogElement.returnValue.split(", ");
    
    // Create book and add to library/table
    let newBook;
    if(returnTokens[4] === '') {
        newBook = new Book(returnTokens[0], returnTokens[1], +returnTokens[2], returnTokens[3]);
    } else {
        newBook = new Book(returnTokens[0], returnTokens[1], +returnTokens[2], returnTokens[3], +returnTokens[4]);
    }

    addBookToLibrary(newBook);

    event.stopPropagation();
});

// Implement explicit cancel button logic to override the required attributes
addCancelButton.addEventListener('click', event => {
    addDialogElement.close(''); // No parameters with the close function so that the dialogElement listener catches it

    event.stopPropagation();
});

// Validate then "Submit" the information entered.
addButton.addEventListener('click', event => {
    event.preventDefault(); // Stops submission to page itself
    const numValidationRegex = /^[0-9]+$/; // Define validation regex

    // Placeholder variables
    let addTitle = newTitle.value.trim();
    let addAuthor = newAuthor.value.trim();
    let numPages = newPages.value;
    let completed = newFinished.checked;
    let ratingNum = newRating.value;
    let requireRatingValidation = (ratingNum === '') ? false : true;

    // Input validation
    if(!numPages.match(numValidationRegex)) {
        event.stopPropagation();

        return;
    } else if(requireRatingValidation) {
        if(!ratingNum.match(numValidationRegex)) {
            event.stopPropagation();
            
            return;
        }
    } else if(addTitle === '' || addAuthor === '') {
        event.stopPropagation();

        return;
    }

    // Close the dialog and "submit" the information
    newTitle.value = '';
    newAuthor.value = '';
    newPages.value = '';
    newFinished.checked = false;
    newRating.value = '';
    addDialogElement.close(`${addTitle}, ${addAuthor}, ${numPages}, ${completed}, ${ratingNum}`);

    event.stopPropagation();
});

addDialogElement.addEventListener('keypress', event => {
    if(event.key === 'Enter') {
        addButton.click();
    }

    event.stopPropagation();
});

/* Deletion Dialog Form Logic: */
// Get elements of the dialog
const deleteTitle = document.getElementById('deleteTitle');
const dialogDeleteButton = document.getElementById('dialogDeleteButton');
const deleteCancelButton = document.getElementById('deleteCancelButton');

// Cancel button triggers close event, book will be found and deleted here.
deleteDialogElement.addEventListener('close', event => {
    let delTitle = deleteDialogElement.returnValue; // Get title from the form

    // Handle if the form is canceled
    if(delTitle === '') {
        event.stopPropagation();

        return;
    }

    // Finds index in library
    let oldLength = library.length;
    if(oldLength !== 0) {
        let i = 0;
        for(i = 0; i < library.length + 1; i++) {
            if(library[i].title === delTitle) { // if found
                library.splice(i, 1); // Remove from the library array
                table.deleteRow(i + 1); // + 1 to correct for table vs array indexing
                break; // Exit the loop
            }
        }
    }

    // Alert if nothing was found
    if(oldLength === library.length) {
        alert(`A book matching the title ${delTitle} was not found in the library. Nothing has been removed.`);
    }

    event.stopPropagation();
});

// Implement explicit cancel button logic to override the required attributes
deleteCancelButton.addEventListener('click', event => {
    deleteDialogElement.close('');

    event.stopPropagation();
});

deleteButton.addEventListener('click', event => {
    event.preventDefault(); // Prevent actual submission

    // Get the title with no leading or trailing whitespace
    let delTitle = deleteTitle.value.trim();

    // Validate something was entered other than just whitespace
    if(delTitle === '') {
        event.stopPropagation();

        return;
    }

    deleteTitle.value = '';
    deleteDialogElement.close(delTitle);

    event.stopPropagation();
});

deleteDialogElement.addEventListener('keypress', event => {
    if(event.key === 'Enter') {
        deleteButton.click();
    }

    event.stopPropagation();
});
