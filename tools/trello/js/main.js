//-------- CONTROLs --------

function reset(elem) {
  if (!elem.show) {
    elem.show = {
      link: "flex",
      convert: "flex",
      command: "flex",
      cmdHide: "none"
    };
  }
  for (var id in elem.show) {
      document.getElementById(id).style.display = elem.show[id];
  } // end i loop
}
   
function clearIt() {
      var fields = document.getElementsByTagName("input");
      for (var each in fields) {
        var field = fields[each];
        if (field.nodeName === "INPUT") {
          field.value = "";
        } else if (field.nodeName !== "BUTTON" || field.contenteditable !== false) {
          field.innerHTML = "";
        }
      } // end each loop
      return "";
    }

function copyText(elem) {
  if (!hiddenInput) {
    console.log("No hiddenInput found. Building...");
    var hidden = document.createElement("span");
    hidden.id = "hiddenInput";
    hidden.style.display = "none";
    document.body.appendChild(hidden);
  }
  if (typeof elem === "string") {
    hiddenInput.value = elem;
    elem = hiddenInput;
  } else if (elem.innerHTML.length) {
    var text = elem.innerText;
    hiddenInput.value = text.replace(/(\<br\>|\s\s+)/g,"\n").toString();
    elem = hiddenInput;
  }
  hiddenInput.style.display = "block";
  elem.select();
  document.execCommand("copy");
  hiddenInput.style.display = "none";
 // alert("\"" + elem.value + "\" copied!\n"+elem.id+" selected!");
}

//-------- LINK --------

function extractor(str,type) {
    if (type.toLowerCase() !== "comment") {
      var patt = /((\w+|\w+[^\s\:\;]\w+)@\w+.\w{2,3}|http(s|)[^\s]+)/g;
     // var url = /http(s|)[^\s]+/g;
    }
    if (type.toLowerCase() === "comment") {
      var patt = /\/\/\s[0-9]{1,2}.[0-9]{1,2}.[0-9]{1,2}[^;]+(?=;)/g;
      var result = str.match(patt);
        if (result !== null) {
          result = "- "+result.join("<br>- "); 
          shortLink.value = result;
          output.innerHTML = result;
          return result;
        } else { 
          alert("No comments found");
          return "No comments found";
        }
    }
    var result = str.match(patt);
    shortLink.value = result;
  }

function markdown(str) {
  var links = [], newStr = str;
  if (str.match(/\[.+\]\(.+\)/g) !==  null) {
    links = str.match(/\[.+\]\(.+\)/g);
    for (var i in links) {
      if (typeof(links[i]) !== "function") {
        var original = links[i];
        var text = links[i].split("](")[0].replace("[","");
        var link = links[i].split("](")[1].replace(")","");
        var html = "<a href='"+link+"' style='cursor: pointer'>"+text+"</a>";
        str = str.replace(original,html);
      }
    } //end i loop
  }
  if (str.match(/\*\*.+\*\*/) !== null) {
    var bold = str.match(/(\*\*.+\*\*\s|\s\*\*.+\*\*)/g);
    for (var i in bold) {
      if (typeof(bold[i]) !== "function") {
        var original = bold[i];
        var text = bold[i].replace(/\*\*/g,"").trim();
        var html = "<strong>"+ text +"</strong>";
        str = str.replace(original,html);
      }
    } // end i loop
  }
  if (str.match(/\*.+\*/g) !== null) {
    var italics = str.match(/(\*.+\*\s|\s\*.+\*)/g);
    for (var i in italics) {
      if (typeof(italics[i]) !== "function") {
        var original = italics[i];
        var text = italics[i].replace(/\*/g,"").trim();
        var html = "<i>"+ text +"</i>";
        str = str.replace(original,html);
      }
    } // end i loop
  }
  try{
    return convertDates(str);
  } catch(err){alert(err.message);}
}

function process() {
  if (inputStr.value === '') {
    var input = " Data Analyst https://www.cia.gov/jobs Look"; 
  } else { 
    var input = inputStr.value; 
  }
  var splits = input.split(" ");
  var lurl = input.match(/http(s|)[^\s]+/g);
/*  for (var each in splits) {
    console.log(splits[each]+" "+(splits[each].match(/http.+/g) !== null));
    lurl = splits[each].match(/http.+/g);
  } */
  var surl = shortLink.value;
  if (surl.length < 3) {
    var url = lurl;
  } else {
    var url = surl;
  }
  var title = input.replace(url,"").split("  ")[0].trim();
  var output = "["+title+"]("+url+")";
  output.innerHTML = output;
  shortLink.value = url;
  return url;
}
   
//-------- CONVERT --------

function getTextFromCode(code) {
  // match p, span, header, h1, etc.
  // or parse as HTML and use node selectors?
  hiddenCode.innerHTML = code; //.replace(/\<\/*(html|body|head|style)\>/gi,"");
//  var html = hiddenCode.innerHTML;
  var c = document.getElementById("hiddenCode").children;
  var log = {urls: [], emails: [], elems: []};
  for (var i in c) {
    if (typeof c[i] === "object") {
      log.elems.push(c[i].innerHTML);
    }
  } // end i loop
    output.innerHTML = log.elems.join("<br>");
  output.contentEditable = true;
}

function getTextByPattern(text,patt) {
  if (text.match(/regexp/i) !== null ) { 
    let split = text.replace(/\s--\>\s/, " ").split(" ");
    patt = split[1]
      .toString()
      .slice(1)
      .replace("\\\\","\\")
      .split("/");
    // TODO: add additional input field for text
  } else if (text.match("-->") === null && patt === undefined) {
    patt =  /[A-Z][^\.]+?=([A-Z][^\s]+\s[a-z][^\s]+\s[a-z][^\s]+\s[a-z][^\s]+)/g;
    // var patt = new RegExp(/([A-Z]{2}|[A-Z]\s)([A-Z]|\s|\'|\")*(?=\s[A-Z][a-z])/g); // /([A-Z]|\s\'\"){2,50}[\:\!\?]*(?=\s[A-Z][a-z])/g);
  } else if (text.match("-->") !== null) {
    // (this) not this (that also) --> /\([^\)]+\)/g
    let split = text
      .split(" --> ")[1]
      .toString()
      .slice(1)
      .replace("\\\\","\\")
      .split("/");
    patt = new RegExp(split[0],split[1]);
    text = text.split(" --> ")[0].toString();
  }
 try{
  var array = text.match(patt);
  document.getElementById('output').innerHTML = array.join("<br>");
 } catch(err){alert("getTextByPattern, "+text+".match("+patt+"): "+err.message)}
}
    
function markdownLink(url,type) {
      if (url.match(/http(s|)\:\/\//) !== null) {
        if (url.slice(-1) === "/") {
          // 
          var factor = 2;
        } else {
          var factor = 1;
        }
        var array = url.split("/");
        var exclude = new RegExp("Amazonaws","i");
        var domain = "";
        if (array[2].match(exclude) !== null) {
          domain = array[3]
            .split(".")
            .slice(-2,-1)
            .toString();
        } else {
          domain = array[2]
            .split(".")
            .slice(-2,-1)
            .toString();
        }
        domain = titleCase(domain);
        var a = array.length - factor;
        var title = array[a].replace(/[-_]/g, " ");//.split(/[-_]/g).join(" ");
        title = title.replace("+", " ");
        url = url.replace("+","");
        if (title.slice(-5) !== null) {
          var a = title.slice(0,-5);
          var b = title.slice(-5).replace(/\.[a-z]{2,4}/g,"");
          title = a + b;
        }
        title = titleCase(title);
        var temps = {
          markdown: "["+domain + " | " 
            + title + "](" + url + ")",
          button: `<div>${domain} | ${title} <button onclick='${url}'>go</button></div>`
        };
        output.innerHTML = temps[type];
      }
    }

//alert(titleCase("- JAVASCRIPT- JQUERY- RESPONSIVE WEB DEVELOPMENT" ));

function stopShouting(str) {
  var cased = titleCase(str);
  var array = cased.split(/[\-\,\n\;]/g);
  var result = "(" + array.join(", ") +")";
  if (output) {
    output.innerHTML = result;
  }
  return result;
}

function scrapeTrelloLinks(content,random) { // 6.25.20 - added support for relative links; cleaned up organization
  var patts = {
    full: /\<a\shref\=[\'\"\`](http\:\/|https\:\/|)\/[^\s\'\"\`]+[^\>\<]+\>[^\<\>]+\<\/a\>/gi,
    url: /[\'\"\`](http\:\/|https\:\/|)\/[^\s\'\"\`]+/gi,
    inner: /\>[^\<\>]+\<\//gi,
    junk: /(\>|\<\/)/g,
    quotes: /[\'\"\`]/g,
  };
  var temps = {
    addLink: () => `**[ADD LINK TO DESCRIPTION](${url})**`,
    trelloLink: () => `[${label}](${link})`,
  };
 // if (content.match(patts.url) !== null) {
    fetch("/api/foo")//, {method: "GET", mode: "cors"})
    .then( response => {
      alert(response);
      if (!response.ok) { throw response }
      return response.json();  //we only get here if there is no error
    })
    .then( json => {
      alert("THEN: "+json);
    })
    .catch( err => {
      err.text().then( errorMessage => {
        alert("CATCH: "+errorMessage);
      })
    });
    alert("duh");
 // }
  var as = content.match(patts.full);
  var result =[];
  for (var i in as) {
    var junk = as[i].match(patts.inner);
    var label = junk.toString().replace(patts.junk,"").trim();
    var link = as[i]
      .match(patts.url)[0]
      .replace(patts.quotes,"");
    result.push(temps.trelloLink());
  }
  if (random) {
    var ran = Math.random();
    var len = result.length;
    var i = Math.round(len * ran);
    output.innerHTML = result[i];
  } else {
    output.innerHTML = result.join("<br>- ");
  }
//  ui.alert("ARRAY:\n"+array.join("\n- "));
}

// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  alert("postData initiated");
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  alert("What does it mean if this shows up?");
  return response.json(); // parses JSON response into native JavaScript objects
}

//-------- COMMAND --------

function writeCommand(cmdName,options) {
  if (!options) {
    options = {};
  }
  if (!cmdName) {
    cmdName = inputHTML.value;
  }
  var split = cmdName.split(" ");
  cmdName = split.shift();
  options.dir = split.join(" ");
 // alert("\""+cmdName+"\" | \"" + options.dir + "\"");
  var escSpecChar = (text) => {
    text = text
          .replace(/\s/g,"\\ ")
          .replace(/\(/g,"\\(")
          .replace(/\)/g,"\\)");
    return text;
  };
  var commands = {
    help: () => {
      var array = [];
      for (var c in commands) {
        array.push(c);
      }
      return "- " + array.join("\n- ");
    },
    pdfPy: (dirName) => { 
      return `"/System/Library/Automator/Combine PDF Pages.action/Contents/Resources/join.py" -o /${dirName}/${dirName}.pdf /${dirName}/*.pdf`;
    },
    
    cpdf: (text) => {
      var pdfList = [];
      var fileName = "";
      if (text.match(/\s[^\s]/) === null && !cmdWrap.shown) {        
        cmdWrap.style.display = "flex";
        cmdWrap.shown = true;
        addInput.style.display = "flex";
        cmdOutput.style.display = "flex";
        var elems = document.getElementsByClassName("tool");
        for (var i in elems) {
          if (elems[i].id !== "command" 
             && typeof elems[i] !== "function"
             && typeof elems[i] !== "number") {
            try{
            elems[i].style.display = "none";
            }catch(err){alert(err.message+": "+typeof elems[i])}
          }
        } // end i loop
        addInput.onclick = () => {
          let elem = document.createElement("input");
          elem.placeholder = "Another PDF...";
          elem.classList.add("cmdInput");
          cmdWrap.appendChild(elem);
        };
      } else if (text.match(/\s[^\s]/) === null && cmdWrap.shown) {      
        let array = [];
        let elems = panel.getElementsByClassName("cmdInput");
        // then get all [.cmdInput].value 
        for (var i in elems) {
          array.push(elems[i].value);
        } // end i loop
        pdfList = array.join(" ");
        fileName = cmdOutput.value;
      } else {        
        pdfList = text.split(" -o ")[0];
        fileName = text.split(" -o ")[1];
      }
      if (pdfList && fileName) {
        pdfList = pdfList
          .replace(/\s/g,"\\ ")
          .replace(/\.pdf\\\s/g,".pdf ")
          .replace(/\(/g,"\\(")
          .replace(/\)/g,"\\)")
          .replace(/\\\s\\\s/g,"");
        fileName = fileName
          .replace(/\s/g,"\\ ")
          .replace(/\(/g,"\\(")
          .replace(/\)/g,"\\)"); // TODO: replace with escSpecChar(filename)
      }
      var temp = `cpdf ${pdfList} -o ${fileName}`;
      return temp;
    },
    
    commit: (text) => {
      return `git add -A
        git commit -m \"${text}\"
        git push -u origin master`
    },
    
    mkopen: (text) => {
      let project = text.split(" ")[0];
      let type = text.split(" ")[1];
      let folder = `/Users/Jamie/Desktop/Job\\ Search/Skillcrush\\ \\(Training\\)/206-coding-responsive-websites/${project}`;
      let files = `/Users/Jamie/Desktop/Job\\ Search/Skillcrush\\ \\(Training\\)/206-coding-responsive-websites/SRC-unplugged-retreat/${type}/*`;
      if (type) {
        var preview = `open -a "Preview" ${files}`;
      } else {
        var preview = "";
      }
      let temp = `cd ${folder}
open -a "Visual Studio Code" index.html
open index.html
${preview}`;
      return temp;
    },
    
    repo: (dirName) => {
      var func = function () {
    /*    if (window.confirm("Remember to create new repository on GitHub before running these commands.\n\nOpen website now?")) */
          window.open("https://github.com/jklueck?tab=repositories", "tab");
          dirName = dirName.replace(/\s/g, "-");
          copyText(dirName);
          return `git init
          git add -A
          git commit -m "initial commit"
          git remote add origin git@github.com:jklueck/${dirName}.git
          git push -u origin master`;
        };
      return alertTerminal(
        "Remember to create new repository on GitHub before running these commands.<br><br>Open website now?", 
        func
      );
    },
    
    vscOpen: (dirName) => `open -a "Visual Studio Code" ${dirName}`
  };
  var dir = options.dir;
  output.innerText = commands[cmdName](dir);
}

//-------- UTILITIES --------

function alertTerminal(text,funcY,funcN) {
  if (funcY) {
    text += "<br><br>Y \/ N";
    document.body.onkeyup = (e) => {
      var key = e.which || e.keyCode;
      if (key === 89) { // Y
        output.innerText += " - Y";
        alert(funcY());
        output.innerHTML = funcY();
      } else if (key === 78) { // N
        output.innerText += " - N";
        if (funcN) {
          output.innerHTML = funcN();
        } else {
          output.innerHTML = "Done";
        }
      }
    } // end keyup
  }
  return text;
}

String.prototype.indexArray = function (item) {
  var n = [], ct = -1, str = this;
  for (var i=0; str.indexOf(item, ct+1) !== -1; i++) {
    var ct = str.indexOf(item, ct+1);
      n.push(ct);
  } //end i loop
  return n;
}

var titleCase = function (str) {
  var except = "in the and with from of is a an or at";
  str = str.toLowerCase().split(" ");
  for (var i in str) {
    if (i === 0) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    } else {
      var patt = new RegExp(`(\\s${str[i]}|${str[i]}\\s)`,"g");
      // http://www.fitmedia.com/2000/20/05/why-i-like-this/
      if (except.match(patt) == null) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
    }
  } // end i loop
  return str.join(" ");
}

function convertDates(str) {
  var patt = /[0-9]{2}-[A-z]{3}-[0-9]{4}/g;
  if (str.match(patt) !== null) {
    var dates = str.match(patt);
    for (var i in dates) {
      var parts = dates[i].split("-");
      var day = parts[0];
      var mo = parts[1];
      var year = parts[2];
      var moNum, newDate;
      switch (mo) {
        case "Jan":
          moNum = 1;
          break;
        case "Feb":
          moNum = 2;
          break;
        case "Mar":
          moNum = 3;
          break;
        case "Apr":
          moNum = 4;
          break;
        case "May":
          moNum = 5;
          break;
        case "Jun":
          moNum = 6;
          break;
        case "Jul":
          moNum = 7;
          break;
        case "Aug":
          moNum = 8;
          break;
        case "Sep":
          moNum = 9;
          break;
        case "Oct":
          moNum = 10;
          break;
        case "Nov":
          moNum = 11;
          break;
        case "Dec":
          moNum = 12;
          break;
      }
      newDate = moNum+"."+day+"."+year.slice(-2);
      str = str.replace(dates[i],newDate)
    } // end i loop
    return str;
  }
}

function formCode(text) {
  var lines = text.match(/\s\s/g);
  var tabs = [];
  for (var tl = 0; tl < lines.length; tl++) {
    var tab = lines[tl].match(/\s\s/g);
    if (tab !== null) {
      tabs.push(tab.length);
    } else {
      tabs.push(0);
    }
    lines[tl] = lines[tl].trim();
  } // end i loop
  alert(tabs);
//  for (var i = 0; i < tabs.length; i++) {
    
//  }
  output.innerHTML = lines.join("\n");
}

function popup() {
  var btns = document.getElementsByTagName("BUTTON");
  for (var i = 0; i < btns.length; i++) {
    var e = document.getElementById(btns[i].id);
    if (e !== null) {
      var id = btns[i].id.replace("Btn","Desc");
      var d = document.getElementById(id);
      e.onmouseover = function() {
        d.style.display = 'block';
      }
      e.onmouseout = function() {
        d.style.display = 'none';
      }
    } // if e !== null
  } // end i loop 
}

popup();

function funcFile(elem) {
  var text = elem.innerText;
  download(text, "myfunction.sh", "text/plain");
}

// from: https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
function download(data, filename, type) {
  var file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

function statusText(elem,text,dur) {
  if (!dur) {
    dur = 3000;
  }
  var prev = elem.innerHTML;
  elem.innerHTML = text;
  setTimeout(() => {
    elem.innerHTML = prev;
  }, dur);
}

//--------- EVENT HANDLERS --------

setTimeout(() => {
  document.getElementById("getPattBtn")
    .addEventListener("contextmenu", 
    function (e) {
      e.preventDefault();
      var types = ["get pattern","format code"];
      var ct = types.indexOf(this.innerHTML);
    //  alert("index is "+ct);
      if (ct+1 >= types.length) {
        ct = -1;
      }
      this.innerHTML = types[ct+1];
      var type = types[ct+1];
      this.removeEventListener("click", getTextByPattern);
      this.addEventListener("click", function (e) {
        formCode(inputHTML.value);
      });
      this.innerHTML = type;
    }
  );

  document.getElementById("mkDnBtn")
    .addEventListener("contextmenu", 
    function (e) {
      e.preventDefault();
      var types = ["markdown","button"];
      var ct = types.indexOf(this.innerHTML);
    //  alert("index is "+ct);
      if (ct+1 >= types.length) {
        ct = -1;
      }
      this.innerHTML = types[ct+1];
      var type = types[ct+1];
      this.addEventListener("click", function (e) {
        markdownLink(inputHTML.value,type);
      });
      this.innerHTML = type;
    }
  );

  inputCmd.onkeyup = (e) => {
    var key = e.which || e.keyCode;
    if (key === 13) { // enter
      
    }
  }

  inputCmd.addEventListener("keydown", (e) => {
    var key = e.which || e.keyCode;
    if (key === 13) { // Enter
      writeCommand(inputCmd.value);
    }
  });
}, 2000); // delay to add event listeners

function myfunc(text) {
  var text = `    
     Code 1 - Desktop Underwriter (DU)
     Code 2 - Loan Prospetor (LP)
     Code 3 - Technology Open to Approved Lenders
                       (Total Scorecard)
     Code 4 - Guaranteed Underwriting System
                      (GUS)
     Code 6 - Not Applicable
   "
"`;
  var res1 = text.match(/\d{1,2}\s\-\s[\w\s]+/gi).join(", ").replace(/\s\-\s/g,": ");
  var res2 = res1.replace(/\s+\,/g,"\", ").replace(/:\s+/g,": \"").trim();
  output.innerHTML = res2+"\"";
}
