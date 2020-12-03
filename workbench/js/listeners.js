/****** LISTENERS ******/
console.log("LISTENERS");

paste.onblur = (event) => {
  if (paste.value.trim() !== "") {
    var key = event.which || event.keyCode;
    var elem = document.activeElement;
    if (key !== 13) {
      loadData_v2(paste.value);
      paste.value = "";
      //output.scrollIntoView({ behavior: "smooth" });
    }
  }
};

paste.onchange = (event) => {
  window.header.options.warnOnReset = true;
};

paste.onkeyup = (event) => {
  // allows for a blank first cell
  var split = paste.value.split("\t");
  if (split[0] === "" && split[1] !== "" && paste.value !== "") {
    paste.value = "\t" + paste.value.trim();
  } else {
    paste.value = paste.value.trim();
  }
};

document.addEventListener("keypress", (event) => {
  var key = event.which || event.keyCode;
  var elem = document.activeElement;
  if (key === 13) {
    // Enter
    if (elem.classList.contains("calc")) {
      figure_v2(elem);
    } else if (elem.id === "paste") {
      loadData_v2(paste.value);
      paste.value = "";
      output.scrollIntoView({ behavior: "smooth" });
    }
  }
});

document.addEventListener("keydown", (e) => {
  if (!document.key) {
    document.key = [];
  } else if (document.key.length === 2) {
    document.key.shift();
  }
  var elems = {
    86: document.getElementById("paste"), // alt - f
    8: clearDatabase // alt - backspace
  };
  document.key.push(e.which || e.keyCode);
  console.log(document.key);
  var key = document.key[1];
  if (document.key[0] === 18 && key && key !== 18) {
    if (typeof elems[key] === "function") {
      warn.innerHTML = elems[key]();
      return;
    } else if (elems[key]) {
      // e.preventDefault();
      console.log(document.key + " - " + elems[key].id + " field");
      elems[key].scrollIntoView({ behavior: "smooth" });
      if (elems[key].tagName === "INPUT") {
        elems[key].select();
        elems[key].focus();
      }
    }
  }
});

document.addEventListener("change", (event) => {
  var active = document.activeElement;
  if ((active.type = "checkbox")) {
    var text = active.parentNode.innerText.split(/[\[\:]/)[0];
    simpleCopy(text);
  }
});

function addListeners() {
    var lines = document.getElementsByClassName("line");
    for (var i in lines) {
      if (lines[i].id && !lines[i].classList.contains("hidden")) {
        lines[i].setAttribute("tabindex", "0");
        lines[i].classList.add("click");
        lines[i].addEventListener("click", toggleDisable);
        lines[i].addEventListener("contextmenu", editLine);
        lines[i].addEventListener("keypress", (event) => {
          var active = document.activeElement;
          event = event || window.event;
          var key = event.which || event.keyCode;
          if (!event.shiftKey && key === 13) {
            // enter
            console.log("Disabling " + active.id);
            toggleDisable();
          } else if (event.shiftKey && key === 13) {
            // shift - enter
            active.scrollIntoView({ behavior: "smooth", block: "center" });
            editLine(event);
          } else if (
            !event.shiftKey 
            && !event.altKey 
            && !event.ctrlKey 
            && !event.metaKey 
            && key !== 13 
            && key !== 9 
            && key !== 27
            && active.id.match("ans") === null) {
            editLine(event);
          }
        });
        lines[i].addEventListener("keydown", (event) => {
          var active = document.activeElement;
          var key = event.which || event.keyCode;
          if (key === 32) {
            // space
            event.preventDefault();
            // active.scrollIntoView({ behavior: "smooth", block: "center" });
            toggleDisable();
          } else if (key === 40) {
            // down arrow
            // arrow keys need "keydown"
            // event.preventDefault();
            // active.dispatchEvent(new KeyboardEvent('keydown',{keyCode: 8, which: 8}));
            // window.nav[active.id].prev.focus()
          } else if (key === 38) {
            // up arrow
            // arrow keys need "keydown"
            // window.nav[active.id].next.focus()
          }
        });
      }
    } // end lines loop
    var docs = document.getElementsByClassName("doc-banner");
    for (var ea in docs) {
      if (docs[ea].id) {
        docs[ea].classList.add("click");
        docs[ea].addEventListener("click", toggleHidden);
      }
    } // end docs loop
  }