/****** HELPERS ******/
console.log("HELPERS");

function simpleCopy(text) {
  var active = document.activeElement;
  hiddenInput.style.display = "block";
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
  hiddenInput.style.display = "none";
  console.log("Copy successful?: " + success);
  if (success) {
    return "successful";
  } else {
    return "failed";
  }
}

function copyItems(docOnly) {
  var array = [];
  var db = window.header.database;
  for (var i in db) {
    var ans = db[i].edit || db[i].ans;
    if (ans && ans !== "") {
      array.push(ans.trim());
    }
  } // end elems loop
  simpleCopy(array.join("\t"));
}

function translate(codecat, num) {
  var codes = window.header.codes;
  if (codes[codecat] && num) {
    var text = codes[codecat][num];
    return text;
  } else {
    return "";
  }
}

function addClasses() {
  var hiddenDocs = window.order[view.value].hidden.docs;
  var hiddenLines = window.order[view.value].hidden.lines;
  var docElems = document.getElementsByClassName("doc-wrapper");
  var lineElems = document.getElementsByClassName("line");
  var docClass = "";
  var lineClass = "";
  for (let d in docElems) {
    let elem = docElems[d];
    if (hiddenDocs.includes(elem.id)) {
      elem.classList.add("hidden");
    }
  }
  for (let l in lineElems) {
    let db = window.header.database;
    let elem = lineElems[l];
    let ln = elem.id;
    let ans = db[ln].ans;
    if (hiddenLines.includes(ln)) {
      elem.classList.add("hidden");
    } else if (ans !== "") {
      elem.classList.add("hidden");
      hiddenLines.push(ln);
    } else if (!hiddenLines.includes(ln) && ans) {
      elem.classList.remove("hidden");
    }
  }
}

function toggleStyle(elem, cssClass) {
  var id = elem.id;
  var x = false;
  var set = [];
  if (id.match("doc") !== null) {
    id = "itmdoc" + id.split("doc")[1];
    var items = document.getElementById(id);
    set = [items];
  } else if (id.match("ln") !== null) {
    var ln = "ln" + id.split("ln")[1];
    var ans = document.getElementById("ans" + ln);
    var trans = document.getElementById("trans" + ln);
    set = [ans, trans];
  }
  for (var i in set) {
    if (set[i].classList.contains(cssClass)) {
      set[i].classList.remove(cssClass);
      x = false;
    } else {
      set[i].classList.add(cssClass);
      x = true;
    }
  } // end set loop
  return x;
}

function toggleDisable() {
  if (!this.id && document.activeElement.id) {
    var elem = document.activeElement;
  } else {
    var elem = this;
  }
  if (!elem.delay) {
    if (elem.id.match("ln") !== null) {
      var ln = "ln" + elem.id.split("ln")[1]; // get line ID
      var ans = document.getElementById("ans" + ln);
      if (ans.contentEditable !== "true") {
        window.header.database[ln].x = toggleStyle(elem, "disabled");
      }
    } else {
      console.log(
        "'" + elem.id + "' is not a line. 'toggleDisable' not added."
      );
    }
    elem.delay = true;
    setTimeout(() => {
      elem.delay = false;
    }, 250);
  } else {
    console.log("toggleDisable blocked by delay.");
  }
}

function toggleHidden() {
  if (!this.id && document.activeElement.id) {
    var elem = document.activeElement;
  } else {
    var elem = this;
  }
  toggleStyle(elem, "hidden");
  //	console.log("window.header.database["+elem.id+"].x = " + window.header.database[elem.id].x);
}

function toggleText(elem, text) {
  if (!elem.innerHTML.match(text)) {
    elem.prev = elem.innerHTML;
    elem.innerHTML = text;
  } else if (elem.prev) {
    elem.innerHTML = elem.prev;
  }
}

function toggleCodes(ln) {
  var ans = document.getElementById("ans" + ln);
  var trans = document.getElementById("trans" + ln);
  var code = ans.innerHTML;
  var db = window.header.database;
  var codes = window.header.codes;
  var vw = window.order[view.value];
  var codecat = db[ln].codecat;
  var codeDB = codes[codecat];
  var save = db[ln].edit;
  /* TODO: make iterator, so function toggleCodes() can be used with any codecat
  for (var ea in codeDB) {
    if (ea == code) {
      save = ()+"#";
      ans.innerHTML = 31;
      trans.innerHTML = codeDB[31];
      simpleCopy(save);
    } */
  if (ln === "ln11") {
    if (code === "32") {
      save = 31 + checkOption("optMarkChange");
      ans.innerHTML = 31;
      trans.innerHTML = codeDB[31];
      simpleCopy(save);
    } else if (code === "31") {
      save = 1 + checkOption("optMarkChange");
      ans.innerHTML = 1;
      trans.innerHTML = codeDB[1];
      simpleCopy(save);
    } else if (code === "1") {
      save = 32 + checkOption("optMarkChange");
      ans.innerHTML = 32;
      trans.innerHTML = codeDB[32];
      simpleCopy(save);
    }
  } else {
    var g = codes.gen(codecat).next().value;
    save = g + checkOption("optMarkChange");
    ans.innerHTML = JSON.stringify(g);
    trans.innerHTML = codeDB[g];
    // simpleCopy(save);
  }
}

function copyNotice(elem, text, ms, all) {
  if (!ms) {
    ms = 3000;
  }
  if (all) {
    copyItems();
  } else {
    simpleCopy(elem.innerHTML);
  }
  window.header.options.warnOnReset = false;
  toggleText(elem, text);
  setTimeout(() => {
    toggleText(elem, text);
  }, ms);
}

function fixData(data) {
  // scrub account # and name from array (if provided)
  if (checkOption("optFilterAcct")) {
    if (data[1].match(/\d{10}/) !== null) {
      data.shift(); // remove [0]
      var acctNum = data.shift();
      simpleCopy(acctNum); // copy & remove [1]
    }
  }
  if (checkOption("optFilterName")) {
    if (data[0].match(/[a-z]+/i) !== null && data[1].match(/[a-z]+/i) !== null) {
      data.shift();
      data.shift(); // ...shift again
    } else if (data[0].match(/[a-z]+/i) !== null) {
      data.shift();
    }
    // && data[i].match(/\d{1,2}\/\d{1,2}\/\d{2,4}/) === null
  }
  return data;
}

function testForData() {
  // Future Project
  var db = window.header.database;
  var array = [];
  for (var ln in db) {
    if (db[ln].ans) {
      array.push(db[ln].ans);
    }
  } // end db loop
  console.log(array.join(",") + " " + array.length);
}

function* iterate(array) {
  for (var i in array) {
    yield array[i];
  }
}

function looper(code, codecat) {
  var list = window.header.codes[codecat];
  var array = [];
  var arr1 = [];
  var arr2 = [];
  var use = false;
  if (code.match(/\n/) !== null) {
    code = code.trim();
  } // code = 31
  for (var ea in list) {
    if (ea === code) {
      // 1 === 31 FALSE // 31 === 31 TRUE // 32 === 31 FALSE
      use = true; // // use = TRUE //
      arr1.push(ea); // // arr2 = [1,31] //
    } else if (use === true) {
      // use === FALSE // // use === TRUE
      arr1.push(ea); // // // arr1 = [32]
    } else {
      arr2.push(ea); // arr2 = [1] //  //
    }
  } // end list loop
  array = arr1.concat(arr2);
  return iterate(array);
}

function cycleCodes(code, ln) {
  var codes = window.header.codes;
  var db = window.header.database;
  var codecat = db[ln].codecat;
  if (!db[ln].iter) {
    db[ln].iter = looper(code, codecat);
  }
  var n = db[ln].iter.next();
  if (!n.done) {
    return n.value;
  } else {
    db[ln].iter = looper(code, codecat);
    return db[ln].iter.next().value;
  }
}

function cancelEdit() {
  var active = document.activeElement;
  var db = window.header.database;
  var ln = active.id.match(/ln\d+/);
  if (db[ln].edit && db[ln].edit !== "") {
    active.innerHTML = db[ln].edit;
  } else {
    active.innerHTML = db[ln].ans;
    active.style = "color: blue";
  }
  active.contentEditable = "false";
}

function nav() {
    var vw = window.order[view.value];
    var docOrder = vw.docOrder;
    var hideLines = vw.hidden.lines;
    var array = [];
    var obj = {};
    for (var i in docOrder) {
      var doc = docOrder[i];
      for (var l in vw[doc].lnOrder) {
        var ln = vw[doc].lnOrder[l];
        if (!hideLines.includes(ln)) {
          array.push(ln);
        }
      } // end vw[doc].lnOrder loop
    } // end docOrder loop
    for (var index in array) {
      if (index === 0) {
        var up = array.length;
      } else {
        var up = index - 1;
      }
      if (index === array.length) {
        var dn = 0;
      } else {
        var dn = index + 1;
      }
      obj[ln] = {
        prev: document.getElementById(array[up]),
        next: document.getElementById(array[dn])
      };
    } // end array loop
    return obj;
  }