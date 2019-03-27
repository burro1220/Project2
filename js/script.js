/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.
   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/
const pageDiv = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');

const studentListUl = document.querySelector('.student-list')
const studentList = studentListUl.children;

const studentsPerPage = 10;



/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.
   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/
const showPage = (list, page) => {
  const firstStudentOfPage = ( page * studentsPerPage ) - 10;
  const lastStudentOfPage = ( page * studentsPerPage ) - 1;
  console.log('Seite:' + page);
  for ( let i = 0; i < studentList.length; i++ ){
    if( i >= firstStudentOfPage && i <= lastStudentOfPage ){
      studentList[i].style.display = '';
    }else {
      studentList[i].style.display = 'none';
    }
  }
  appendPageLinks(page);
};

const createElement = (elementName, property, value) => {
  const element = document.createElement(elementName);
  element[property] = value;
  return element;
};

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/
const appendPageLinks = (page) => {
  const pagesToShow = Math.ceil(studentList.length / studentsPerPage);

  // const paginationDiv = document.createElement('div');
  // paginationDiv.className = 'pagination';
  const paginationDiv = createElement('div', 'className', 'pagination');
  pageDiv.appendChild(paginationDiv);

  const paginationUl = document.createElement('ul');
  paginationDiv.appendChild(paginationUl);
  for ( let i = 1; i <= pagesToShow; i++){
    const paginationLi = document.createElement('li');
    paginationUl.appendChild(paginationLi);

    // const paginationLink = document.createElement('a');
    // paginationLink.textContent = i;
    const paginationLink = createElement('a', 'textContent', i);
    paginationLink.href = '#';
    paginationLi.appendChild(paginationLink);
    if ( i === page ){
      paginationLink.className = 'active';
    }else{
      for ( let i = 0; i < paginationUl.length; i++ ){
        paginationLink.className = ''
      }
    }
  paginationLink.addEventListener('click', (e) => {
    paginationDiv.parentNode.removeChild(paginationDiv);
      showPage(studentList, parseInt(e.target.textContent));
      e.target.className = 'active';
    });
  }

};

const searchFilter = (searchInput) => {
  const studentNames = document.querySelectorAll('h3');
  const resultCounter = []
  for ( let i = 0; i < studentNames.length; i++ ){
    if( studentNames[i].textContent.includes(searchInput) ){
      studentList[i].style.display = '';
      resultCounter.push(studentNames[i]);
    }else{
      studentList[i].style.display = 'none';
    }
  }
  const page = Math.ceil(resultCounter.length / 10)
  appendPageLinks(page)
};

const searchInput = () => {
  const studentSearchDiv = createElement('div', 'className', 'student-search');
  const searchInput = createElement('input', 'placeholder', 'Search for students...');
  const searchButton = createElement('button', 'textContent', 'Search');

  pageHeader.appendChild(studentSearchDiv);
  studentSearchDiv.appendChild(searchInput);
  studentSearchDiv.appendChild(searchButton);

  searchInput.addEventListener('keyup', (e) => {
    console.log('up: ',searchInput.value);
    searchFilter(searchInput.value);
  });

  searchButton.addEventListener('click', (e) => {
    console.log("Button clicked");
  });
};