const studentListChildren = document.querySelector("ul.student-list").children;
const page = document.querySelector("div.page");
const pageHeader = document.querySelector("div.page-header");
const div = createEl("div", "class", "pagination");
const ul = createEl("ul", "class", "pages");
const getLinks = document.querySelector("ul.pages");
const getDiv = document.querySelector("div.pagination");
let number = Math.ceil(studentListChildren.length / 10);


// This function creates the pages with a list and pages shown with a max of 10 items per page.
function showPage(list, page) {
  let end = page * 10;
  let start = end - 10;
  for (let i = 0; i < list.length; i++) {
    if (i >= start && i < end) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
  
}

// This function creates the element and sets the attribute to the arguments given.
function createEl(elem, attr, name) {
  let element = document.createElement(elem);
  element.setAttribute(attr, name);
  return element;
}

// Need to dynamically add links based on amount of people on the list.
// CreateLi function within the appendPageLinks function is to create elements used in the loop.
function appendPageLinks(list) {
//change num to list.length and remove num from function
  for (let i = 1; i <= list.length; i++) {
  
    let li = createEl("li", "class", "link");
    let a = createEl("a", "href", "#");
    a.setAttribute("class", "active");
    a.textContent = i;
    li.appendChild(a);
    ul.appendChild(li);

    a.addEventListener("click", e => {
      showPage(list, e.target.textContent);
    });
  }
  div.appendChild(ul);
   page.appendChild(div);
   
}

// This function creates the search elements and then appends them to the page.
function inputSearch() {
  let divSearch = createEl("div", "class", "student-search");
  let input = createEl("input", "placeholder", "Search for students...");
  let button = createEl("button", "class", "button");
  pageHeader.appendChild(divSearch);
  divSearch.appendChild(input);
  divSearch.appendChild(button);
  button.textContent = "Search";
  input.setAttribute("class", "input");
}

// This function will display the list item search results to the page while hiding all other list items.
function getSearch() {
  const getInput = document.querySelector("input.input");
  const getButton = document.querySelector("button.button");
  const getNames = document.querySelectorAll("h3");
  const getLinks = document.querySelector("ul.pages");
  const divHeader = document.querySelector("div.pagination");
  const studentlist = document.querySelector("ul.student-list");

  getButton.addEventListener("click", () => {
    
    let value = getInput.value;
    let match = []; // array for matched names
    let notMatch = []; // array for unmatched names
    for (let i = 0; i < studentListChildren.length; i++) {
      if (getNames[i].textContent.includes(value)) {
        match.push(getNames[i]);
        
      } else {
        //studentListChildren[i].style.display = "none";
        //notMatch.push(getNames[i].textContent);
      }
      
      
    }
    showPage(match, 1);
   //  if (value === "") {
   //    location.reload();
   //  }
    if (match.length == 0){
      studentlist.innerHTML = `<p>No results found. Please click Show List to try again.</p>`;
    } 
    getInput.style.display = "none";
    getButton.textContent = "Show List";

    
    
    
  });
  
}



// Main function will be called first.
function main() {
  showPage(studentListChildren, 1);
  inputSearch();
  getSearch();
  appendPageLinks(studentListChildren);

}

main();