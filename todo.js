// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
var inCompleteItems = [
  "Hit the gym",
  "Meet George",
  "Buy eggs",
  "Read a book",
  "Organize office",
];
var completeItems = ["Pay bills"];
var showComplete = true;
var showInComplete = true;

refreshList(showComplete, showInComplete);

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      var value = ev.target.innerText.replace("\n\u00D7", "");

      if (ev.target.classList.contains("checked")) {
        inCompleteItems.push(value);
        const index = completeItems.findIndex((v) => v === value);
        completeItems.splice(index, 1);
      } else {
        completeItems.push(value);
        const index = inCompleteItems.findIndex((v) => v === value);
        inCompleteItems.splice(index, 1);
      }

      refreshList(showComplete, showInComplete);
    }
  },
  false
);

// Create a new list item when clicking on the "Add" button
function newElement() {
  if (inputValue === "") {
    alert("You must write something!");
    return;
  }

  var inputValue = document.getElementById("myInput").value;
  inCompleteItems.push(inputValue);

  document.getElementById("myInput").value = "";

  refreshList();
}

function addElement(itemName, isComplete) {
  var li = document.createElement("li");
  var t = document.createTextNode(itemName);
  li.appendChild(t);
  document.getElementById("myUL").appendChild(li);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  span.onclick = function () {
    var div = this.parentElement;
    var value = div.innerText.replace("\n\u00D7", "");
    if (div.classList.contains("checked")) {
      const index = completeItems.findIndex((v) => v === value);
      completeItems.splice(index, 1);
    } else {
      const index = inCompleteItems.findIndex((v) => v === value);
      inCompleteItems.splice(index, 1);
    }

    refreshList();
  };

  if (isComplete) {
    li.classList.add("checked");
  }
}

function refreshList() {
  document.getElementById("myUL").innerHTML = "";
  if (showInComplete) {
    inCompleteItems.forEach((item) => {
      addElement(item);
    });
  }

  if (showComplete) {
    completeItems.forEach((item) => {
      addElement(item, true);
    });
  }
}

function toggleShowInComplete() {
  showComplete = false;
  showInComplete = true;
  refreshList();
}

function toggleShowComplete() {
  showComplete = true;
  showInComplete = false;
  refreshList();
}

function toggleShowAll() {
  showComplete = true;
  showInComplete = true;
  refreshList();
}

function reverseListing() {
  inCompleteItems.reverse();
  refreshList();
}
