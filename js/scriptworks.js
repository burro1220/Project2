/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/



//create list of students from html
studentsList = document.querySelectorAll('.student-item');
//create global variables
const searchButton = document.createElement('button');
const searchField = document.createElement('input');
const searchDiv = document.createElement('div');
const error = document.createElement('h3');

//create and append search field & button
function makeSearch() {
  const pageHeader = document.querySelector('.page-header');
  searchDiv.className = "student-search";
  searchField.placeholder = "Search for students...";
  searchButton.textContent = "Search";
  pageHeader.appendChild(searchDiv).appendChild(searchField);
  searchDiv.appendChild(searchButton);

};


//create and call search when button is clicked
searchField.addEventListener('keyup', (e) => {
  const searchText = e.target.value;
  function search(str, list,){
    for(i=0; i < list.length; i++){
      let student = list[i];
      let names = document.querySelectorAll('h3');
      let name = names[i].textContent;
      if(name.includes(searchText)) {
        student.className = 'student-item cf show';
      } else {
        student.className = 'student-item cf hide';
      }

    }
    let notMatching = document.querySelectorAll('.hide');
    for(i=0; i<notMatching.length; i++){
      notMatching[i].style.display = 'none';
    };
    let matches = document.querySelectorAll('.show');


    //show matches
    showPage(matches, 1);
    appendPageLinks(matches);
    // set listeners on page links
    const aTags = document.querySelectorAll('a');
    //loop throught aTags and set click listener
    for(let i = 0; i < aTags.length; i++) {
      const oldAtags = document.querySelectorAll('a');
      oldAtags[i].addEventListener('click', (e) => {
        showPage(studentsList, i+1);
        removeActive();
        //set active class
        e.target.className = "active";
        });
    };
    //check length of hidden array and if all students are hidden return error
    if (matches.length == 0) {
      makeError();
    } else {
      //remove error
      if (document.querySelector('.error')) {
      searchDiv.removeChild(error);

      }
    }

  };
  search(searchText, studentsList);

});

//if no students append this error div
function makeError(){
  error.textContent = "There are no students by that name.";
  error.className = "error"
  searchDiv.appendChild(error);
};
/***
    FX showPage takes 2 parameters: a list of students and a page# to display
    10 students at a time
***/
function showPage(list, page) {
  for (let i=0 ; i < list.length; i++){
    let index = i;
    let student = list[i];
    let minIndex = page * 10 - 10;
    let maxIndex = page * 10 - 1;
    if(index <= maxIndex && index >= minIndex){
      student.style.display = "block";
    } else {
      student.style.display = "none";
    }
  };
};
/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/
function appendPageLinks(list) {
  const page = document.querySelector('div.page')
  //if already pagination remove it
  const pagination = document.querySelector('.pagination');
  if (pagination) {
    page.removeChild(pagination);
  };


  // determine number of pages needed
  const numPages = Math.ceil(list.length/10);
  //create new div to hold pagination numbers
  const div = document.createElement('div');
  //set div className to Pagination
  div.className = "pagination";
  //append the new div to page reference
  page.appendChild(div);
  //create and append ul to pagination div
  const ul = document.createElement('ul');
  div.appendChild(ul);
  //loop through and create/append list items and links
  for(i = 1; i <= numPages; i++){
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = i + ' ';
    li.appendChild(a);
    ul.appendChild(li)
  }
};
// remove active link from pagination
function removeActive(){
  for(let i=0; i < aTags.length; i++){
    aTags[i].classList.remove('active');
  };
};

//setup for initial view
function pageSetup(list) {
  showPage(list, 1);
  appendPageLinks(list);
  makeSearch();
};
//prepare page -- IS THIS THE BEST WAY TO DO THIS?????????
window.onload = pageSetup(studentsList);

//IF I MOVE THIS CODE TO TOP THEN EVENT LISTENERS DON'T GET SET???
//HAVE TO SET aTags AFTER PAGE SETUP HAS COMPLETED...?
const aTags = document.querySelectorAll('a');
//loop throught aTags and set click listener
for(let i = 0; i < aTags.length; i++) {
  aTags[i].addEventListener('click', (e) => {
    removeActive();
    showPage(studentsList, i+1);
    //set active class
    e.target.className = "active";
    });
};
