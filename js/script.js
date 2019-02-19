/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/




/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.


***/
//create list of students from html
studentsList = document.querySelectorAll('.student-item');



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
  // determine number of pages needed
  const numPages = Math.ceil(list.length/10);
  // set node reference for appending div
  const page = document.querySelector('div.page');
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


//setup for initial view
function pageSetup(list) {
  showPage(list, 1);
  appendPageLinks(list);
};
window.onload = pageSetup(studentsList);


// remove active links from pagination and add active to target
//credit https://stackoverflow.com/questions/38990163/how-can-i-add-and-remove-an-active-class-to-an-element-in-pure-javascript/38990288
function removeActive() {
  var el = document.querySelectorAll(".active");
    if(el){
    el.classList.remove('.active')
  } else {
    console.log('no el');
  }

};



//set click listener on a tags
aTags = document.querySelectorAll('a');
for(let i = 1; i < aTags.length; i++) {
  aTags[i].addEventListener('click', (e) => {
    showPage(studentsList, i);
    removeActive();
    e.target.className = 'active';

  });
}

// Remember to delete the comments that came with this file, and replace them with your own code comments.
