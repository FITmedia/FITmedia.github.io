var db = {
  searchIRS: "site:irs.gov ",
  searchIntuit: "site:ttlc.intuit.com ",
  searchUScode: "site:law.cornell.edu/uscode/text/26 "
};

var copies = {
  div1: `This is Jamie with <span class="highlight">TurboTax Live</span>. I'm a <span class="highlight">Credentialed Tax Expert</span> with 6 years experience. How can I help you today?`,
  div2: `The best way for me to help you is to <span class="highlight">share your TurboTax Live Screen</span>. You should see a pop-up that says: See your expert and share your screen. Please click Accept.`,
  div3: `Thank you, we're now connected. I won't see any private information and can only see what's on your TurboTax Live screen. You might see me outlining something on your screen with a red box, but I cannot make any changes.
<br>
If you minimize your TurboTax screen or go to a link, you may lose sight of the chat window. To return, select Live Help on your screen.`,
  div4: `Have I <span class="highlight">resolved all of your issues</span> today?`,
  div5: `You may <span class="highlight">receive a survey</span> based on my performance, and I'd appreciate your honest feedback. Thanks for choosing TurboTax Live!`
};

function srch(elem) {
  var id = elem.id;
  var text = db[id];
  var search = text + elem.value;
  var encode = encodeURI(search);
  elem.value = "";
  var url = "https://www.google.com/search?q=" + encode;
  window.open(url);
  //location = url;
}

function decorCopy(id, text) {
  if (!text) {
    text = "copied!";
  }
  var elem = document.getElementById(id);
  var border = document.getElementById("border_" + id);
  var btn = document.getElementById("btn_copy_" + id);
  var oldTxt = btn.innerHTML;
  btn.innerHTML = text;
  btn.classList.add("lite");
  border.classList.add("lite");
  if (text !== "copied!") {
    deleteCopyItem(border);
  } else {
    simpleCopy(elem);
    setTimeout(() => {
      btn.innerHTML = oldTxt;
      btn.classList.remove("lite");
      border.classList.remove("lite");
    }, 2000);
  }
}

function decorClose(id, text) {
  if (!text) {
    text = "•";
  }
  var border = document.getElementById("border_" + id);
  var btn = document.getElementById("btn_close_" + id);
  btn.innerHTML = text;
  btn.classList.add("lite");
  border.classList.add("lite");
  setTimeout(() => {
    deleteCopyItem(border);
  }, 250);
}

function simpleCopy(elem) {
  var active = document.activeElement;
  var text = elem.innerHTML.replace(/<br>/gi, "\n").replace(/<[^>]+>/gi, "");
  //hiddenInput.style.display = "block";
  hiddenInput.value = text.trim(); // removed 8.24.20 - .trim();
  hiddenInput.select();
  console.log(
    "Copying: " +
      hiddenInput.value +
      ", which has " +
      hiddenInput.value.length +
      " characters."
  );
  var success = document.execCommand("copy");
  active.focus();
  //hiddenInput.style.display = "none";
  console.log("Copy successful?: " + success);
  if (success) {
    return "successful";
  } else {
    return "failed";
  }
}

function deleteCopyItem(idOrElem) {
  // get div id
  if (typeof idOrElem === "string") {
    var id = idOrElem;
    var divId = "border_" + id;
    var elem = document.getElementById(divId);
  } else {
    var elem = idOrElem;
    var id = elem.id;
  }
  elem.outerHTML = "";
  delete copies[id];
}

function setCopyItems(items, clear) {
  if (clear) {
    document.getElementById("copy-items").innerHTML = "";
    copies = {};
  }
  if (Object.keys(copies).length === 0) {
    var ct = 1;
  } else {
    var ct = Object.keys(copies).length + 1;
  }
  for (var i in items) {
    var text = items[i];
    var id = `div${ct}`;
    console.log(id);
    text = appendInputs(
      `<div id="${id}" class="copy_text" contenteditable="true">${text}</div>`
    );
    var div = `<div id="border_${id}" class="copy_border">
        <div id="warn_${id}" class="copy_control"><span id="btn_copy_${id}" class="copy_btn warn" onclick="decorCopy('${id}')">copy</span><span id="btn_close_${id}" class="copy_btn" onclick="decorClose('${id}')">&#10005;</span></div>
        ${text}
      </div>`;
    document.getElementById("copy-items").innerHTML += div;
    copies[id] = div;
    console.log(copies[id]);
    ct++;
  }
  //console.log(JSON.stringify(copies));
}

function inputCopyItems(elem) {
  var input = elem.value;
  elem.value = "";
  var items = input.split(/--/g);
  var arr = [];
  for (var i in items) {
    arr.push(items[i]);
  }
  setCopyItems(arr);
}

function appendInputs(txt) {
  var matches = txt.match(/\[[\w\s]+\]/g);
  if (matches) {
    for (var ea in matches) {
      var placeholder = matches[ea].replace(/[\[\]]*/g, "");
      var id = matches[ea].match(/\w/g).toString();
      var html = `<input id="${id}" onblur="inputVar(this)" placeholder="${placeholder}">`;
      txt = txt + html;
    }
  }
  return txt;
}

function inputVar(elem) {
  var txtName = elem.placeholder;
  var divName = elem.parentNode.id.replace("border_", "");
  var div = document.getElementById(divName);
  var text = div.innerHTML;
  var input = elem.value;
  elem.outerHTML = "";
  text = text.replace(`[${txtName}]`, input);
  div.innerHTML = text;
  copies[divName] = text;
}

function setListeners() {
  var elems = document.getElementsByTagName("input");
  var field = document.getElementById("inputCopies");
  var copyFields = document.getElementsByClassName("copy_text");
  for (var ea in elems) {
    if (elems[ea].id) {
      elems[ea].addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          var elem = document.activeElement;
          srch(elem);
        }
      });
    }
  }
  field.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      var elem = document.activeElement;
      inputCopyItems(elem);
    }
  });
  for (var t in copyFields) {
    if (copyFields[t].id) {
      copyFields[t].addEventListener("keyup", (txt) => {
        var elem = document.activeElement;
        copies[elem.id] = elem.innerHTML;
      });
    }
  }
}

setTimeout(setListeners, 3000);

//let items = ["Testing 1", "Testing 2"];
setCopyItems(copies, true);

