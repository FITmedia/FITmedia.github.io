/****** CORE ******/
console.log("CORE");

function viewCount() {
  // move to Utilities
  var order = window.order;
  var count = {};
  for (var vw in order) {
    var lines = [];
    for (var doc in order[vw]) {
      if (doc !== "docOrder" && doc !== "hidden") {
        console.log(vw + ": " + JSON.stringify(order[vw]));
        lines.concat(order[vw][doc].lnOrder);
      }
    } // end order[vw] loop
    count[vw] = lines.length;
  } // end order loop
  return count;
}

//console.log(JSON.stringify(viewCount()));
window.testCount = 0;

function loadData_v2(str) {
  if (!str) {
    str = "\t\t\t\t";
  }
  var data = str.split(/\t/g);
 // data = fixData(data); - removed 12.3.20 due to problems with filter options
  var db = window.header.database;
  var vw = window.order[view.value];
  var docOrder = vw.docOrder;
  var lines = [];
  var i = 0;
  for (let doc of docOrder) {
    lines = lines.concat(vw[doc].lnOrder);
  } // end docOrder Loop
  console.log("lines = " + lines);
  for (var ln in db) {
    if (ln.match(/ln\d+/) !== null) {
      // if the specified line appears in the current view:
      if (lines.includes(ln)) {
        db[ln].ans = data[i];
        console.log("db[" + ln + "].ans = " + data[i]);
        db[ln].trans = translate(db[ln].codecat, data[i]);
        i++;
        if (data[i] === undefined) {
          break;
        }
      }
    }
  } // end db loop
  return build();
}

function build() {
  var docOrder = window.order[view.value].docOrder;
  var array = [];
  for (let i in docOrder) {
    let docId = docOrder[i];
    array.push(buildDoc(docId));
  }
  output.innerHTML = array.join("");

  //showDatabase();

  setTimeout(() => {
    //addClasses();
    addListeners();
  }, 1000);
}

function buildDoc(docId) {
  var vw = window.order[view.value];
  var docName = vw[docId].title;
  var lineOrder = vw[docId].lnOrder;
  var preTemplate = "";
  /*  `<div id="pre${docId}" class="line">
		</div> <!-- pre bonus -->`; */
  var lines = [];
  var postTemplate = "";
  /* `<div id="post${docId}" class="line">
		</div> <!-- post bonus -->`;*/
  for (let i in lineOrder) {
    let ln = lineOrder[i];
    // if (i < 2) { alert(ln)}
    if (ln.match(/ln\d+/) === null) {
      var line = window.header.bonus[ln];
    } else {
      var line = buildLine(ln);
    }
    lines.push(line);
    /* // TODO - return object with HTML and array of elem references
    var newElem = document.createElement("div");
    newElem.outerHTML = line; */
  } // end lineOrder loop
  return `<div id="${docId}" class="doc-wrapper">
		<div id="bnr${docId}" class="doc-banner">
		  <span id="ttl${docId}" class="doc-title" onclick="document.getElementById('ttl${docId}').scrollIntoView({ behavior: 'smooth' })">${docName}</span>
		</div>
		<div id="itm${docId}" class="items">
		${preTemplate}
		${lines.join("")}
		${postTemplate}
		</div> <!-- items -->
		<div class="doc-buttons">
			<button onclick="copyNotice(this,'copied all!', 3000, true)">copy items</button>
		<button onclick="document.getElementById('itm${docId}').style.display = 'none'; document.getElementById('itm${docId}').innerHTML = 'collapsed'">collapse</button>
		</div>
		</div> <!-- doc-wrapper -->`;
  // removed 10.12.20 - `<span id="ctrl${docId}" class="doc-control">control</span>`;`
}

function buildLine(ln) {
  var db = window.header.database;
  var vw = window.order[view.value];
  var hideLines = vw.hidden.lines;
  var unless = false;
  var q = db[ln].question;
  var a = db[ln].ans;
  var e = db[ln].edit;
  var t = db[ln].trans;
  var n = db[ln].notice;
  var action = db[ln].action;
  if (vw.hidden.unless && typeof vw.hidden.unless[ln] === "function") {
    // check to see if exception is met
    unless = vw.hidden.unless[ln](a);
  }
  if (e) {
    if (action) {
      a = action(e);
    } else {
      a = e;
    }
  } else if (a) {
    if (action) {
      a = action(a);
    }
  } else {
    a = "";
  }
  if (a === "") {
    return ""; // see function addClasses() for ans.classList.add("hidden")
  }
  if (!t) {
    t = "";
  }
  if (n) {
    t = `<span>${n}</span><span id="hdn_trans${ln}" class="hidden">${t}</span>`;
  }
  if (hideLines.includes(ln) && !unless) {
    var add = " hidden";
  } else {
    var add = "";
  }
  var lineTemplate = `<div id="${ln}" class="line${add}">
	  <div id="lbl${ln}" class="label">
		${q}:
	  </div>
		<div id="ans${ln}" class="ans edit">
		  ${a}
		</div>
		<div id="trans${ln}" class="trans">
		  ${t}
		</div>
	</div> <!-- line -->`;
  return lineTemplate;
}

function editLine(event) {
  event.preventDefault();
  var active = document.activeElement;
  var key = event.keyCode;
  var ln = active.id;
  var db = window.header.database;
  var codes = window.header.codes;
  console.log("Edit line: " + ln);
  var ans = document.getElementById("ans" + ln);
  var selectAll = true;
  if (ans.classList.contains("disabled")) {
    toggleDisable();
  }
  if (db[ln].edittype === "toggle") {
    var trans = document.getElementById("trans" + ln);
    var code = ans.innerHTML;
    var codecat = db[ln].codecat;
    code = cycleCodes(code, ln);
    console.log("codes[" + codecat + "][" + code + "]");
    ans.innerHTML = code;
    trans.innerHTML = codes[codecat][code];
    return;
  } else {
    ans.contentEditable = "true";
    var char = String.fromCharCode(key);
    if (char.match(/(\w|\d)/i)) {
      console.log("editLine: char = "+char);
      ans.innerHTML = String.fromCharCode(key);
      //selectAll = false;
    }
    ans.focus();
    if (selectAll) {
      document.execCommand("selectAll", false, null);
    }
    ans.style.color = "black"; // TODO - create CSS class

    ans.addEventListener("keydown", (event) => {
      var key = event.which || event.keyCode;
      if (key === 13 || key === 9) {
        event.preventDefault();
        // Enter or Tab
        var text = ans.innerHTML + checkOption("optMarkChange");
        moveFocus(ln).focus();
        db[ln].edit = text;
        if (db[ln].codecat) {
          var trans = document.getElementById("trans" + ln);
          var codecat = db[ln].codecat;
          trans.innerHTML = codes[codecat][ans.innerHTML.trim()];
        }
        toggleDisable();
        ans.contentEditable = "false";
        simpleCopy(text);
      } else if (key === 27) {
        cancelEdit();
      }
    });
  }
}