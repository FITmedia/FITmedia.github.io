/****** UTILITIES ******/
console.log("UTILITIES");

function camelCase(str) {
  // UTILITIES
  var except = "in the and with from of is a an or at";
  str = str.replace(/[^\w\s]/gi, "");
  str = str.toLowerCase().split(/[\s\_]/g);
  for (var i in str) {
    if (i === 0) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    } else {
      if (except.match(str[i]) === null) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
    }
  } // end i loop
  str = str.join("");
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function toMoney(num) {
  if (num === "NA" || num == 0) {
    return "NA";
  } else {
    var fm = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });
    return fm.format(num);
  }
}

function toPercent(num) {
  if (num === "NA" || num == 0) {
    return "NA";
  } else {
    var fm = new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 3
    });
    return fm.format(num / 100);
  }
}

function toTime(num, type) {
  if (!type || type !== "date" || type !== "time" || type !== "datetime") {
    console.log(
      'A \'type\' argument was not provided for \'toTime()\' function. Check the function call and input with "date", "time", or "datetime"'
    );
    return num;
  } else if (type === "date") {
    var fm = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    });
    return fm.format(num);
  } else if (type === "time") {
    var fm = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
    return fm.format(num);
  } else if (type === "datetime") {
    var fm = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
    return fm.format(num);
  }
}

function figure_v2(elem) {
  if (typeof elem === "string") {
    alert(
      "function 'figure_v2()' requires an element as an argument. A string has been provided."
    );
  }
  var num = elem.value.toString();
  if (num.match(/\%/g) !== null) {
    return num;
  }
  if (num.match(/[\/\*\+\-]/) !== null) {
    var opers = num.match(/[\/\*\+\-]/g);
    var nums = num.split(/[\/\*\+\-]/);
    var calc = (num1, num2, oper) => {
      if (oper === "/") {
        num1 = parseInt(num1 * 100) / 100 / (parseInt(num2 * 100) / 100);
      } else if (oper === "*") {
        num1 = (parseInt(num1 * 100) / 100) * (parseInt(num2 * 100) / 100);
      } else if (oper === "-") {
        num1 = parseInt(num1 * 100) / 100 - parseInt(num2 * 100) / 100;
      } else if (oper === "+") {
        num1 = parseInt(num1 * 100) / 100 + parseInt(num2 * 100) / 100;
      }
      return num1;
    };
    for (var i = 1; i < nums.length; i++) {
      nums[0] = calc(nums[0], nums[i], opers[i - 1]);
    } // end i loop
    if (nums[0] < 1) {
      nums[0] = Math.round(nums[0] * 10000) / 100 + "%";
    }
    elem.value = nums[0];
  } else {
    elem.value = Math.round((num * 12) / 1000) * 1000;
  }
  //output.classList.add("numbers");
}

function clearDatabase() {
  var warnReset = window.header.options.warnOnReset;
  if (warnReset) {
    var result = confirm("Warning! You have not copied the data.\n\nDo you wish to proceed?");
    if (!result) {
      console.log("Reset cancelled");
      return;
    }
  }
  var db = window.header.database;
  for (var ln in db) {
    db[ln].ans = "";
    db[ln].edit = "";
    db[ln].trans = "";
  }
  loadData_v2();
  warnReset = false;
  paste.focus();
  return "Database cleared!";
}

function listClasses(inst) {
  var array = [];
  for (var i in inst) {
    if (inst[i][3] && inst[i][3].cssClass) {
      array.push(inst[i][3].cssClass);
    }
  } // end inst loop
  return "." + array.join(" {\n\t\n}\n\n.") + " {\n\t\n}";
}

function generateView(name, outToText) {
  var db = window.header.database;
  var obj = {
    docOrder: [],
    hidden: {
      docs: [],
      lines: []
    }
  };
  var ct = 0;
  for (let ln in db) {
    if (ln.match(/ln\d{1,3}/) !== null) {
      var doc = camelCase(db[ln].doc);

      if (!obj[doc]) {
        obj[doc] = { title: db[ln].doc, lnOrder: [] };
      }
      obj[doc].lnOrder.push(ln);
    }
  }
  if (outToText) {
    var viewString = JSON.stringify(obj)
      .replace(/\,/g, ", ")
      .replace(/\:/g, ": ")
      .replace(/\{/g, "{\n")
      .replace(/\[/g, "[\n")
      .replace(/\}/g, "\n}")
      .replace(/\]\,/g, "\n],\n");
    //	simpleCopy(viewString);
    output.innerText += `"${name}": ` + viewString;
  }
  return obj;
}

function showDatabase() {
  var db = window.header.database;
  var obj = {};
  for (let ln in db) {
    if (ln.match(/ln\d+/) !== null) {
      obj[ln] = db[ln];
    }
  }
  output.innerText = JSON.stringify(obj)
    .replace(/\,/g, ", ")
    .replace(/\:/g, ": ")
    .replace(/\{/g, "{\n")
    .replace(/\[/g, "[\n")
    .replace(/\}/g, "\n}")
    .replace(/\]\,/g, "\n],\n");
}

function checkOption(id) {
  var elem = document.getElementById(id);
  var opt = window.header.options;
  if (elem.checked) {
    alert(id+" is checked.");
    var ifChecked = opt[id][0];
    return ifChecked();
  } else {
    alert(id+" is not checked.");
    var ifUnchecked = opt[id][1];
    return ifUnchecked();
  }
}

function showAll(viewOption) {
  if (!viewOption) {
    viewOption = view.value;
  } else {
    view.value = viewOption;
  }
  var db = window.header.database;
  var vw = window.order[viewOption];
  var docOrder = vw.docOrder;
  var array = [];
  for (var i in docOrder) {
    var doc = docOrder[i];
    var lnOrder = vw[doc].lnOrder;
    for (var l in lnOrder) {
      var ln = lnOrder[l];
      if(db[ln].edit && db[ln].edit !== "") {
        var answer = " = "+ db[ln].edit;
        array.push(ln +": "+ db[ln].question + answer);
      } else {
        if (db[ln].ans && db[ln].ans !== "") {
          var answer = " = "+ db[ln].ans;
        } else {
          var answer = "";
        }
        array.push(ln +": "+ db[ln].question + answer);
      }
    } // end doc loop
  } // end docOrder loop
  alert(array.join("\n"));
  return; // TODO - complete this:
  /*
  var data = array.join("\t");
  loadData_v2(data);
  paste.value = "";
  output.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
  var elems = document.getElementsByClassName("hidden");
  for (var h in elems) {
    elems[h].classList.remove("hidden");
  } // end elems loop
  }, 3000);
  */
}

function moveFocus(ln, previous) {
    var vw = window.order[view.value];
    var hideLines = vw.hidden.lines;
    var docOrder = vw.docOrder;
    var array = [];
    var target;
    for (var doc in docOrder) {
      var docId = docOrder[doc];
      for (var l in vw[docId].lnOrder) {
        var line = vw[docId].lnOrder[l];
        if (!hideLines.includes(line)) {
          array.push(line);
        }
      } // end docOrder[doc] loop
    } // end docOrder loop
    var index = array.indexOf(ln);
    var next = index + 1;
    var prev = index - 1;
    if (!previous) {
      target = document.getElementById(array[next]);
      if (!target) {
        target = document.getElementById(array[next - 1]); // stay on same element
      }
    } else {
      target = document.getElementById(array[prev]);
      if (!target) {
        target = document.getElementById(array[prev + 1]); // stay on same element
      }
    }
    return target;
  }