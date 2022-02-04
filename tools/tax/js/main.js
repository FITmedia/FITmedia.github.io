var db = {
  searchIRS: "site:irs.gov ",
  searchIntuit: "site:ttlc.intuit.com ",
  searchUScode: "site:law.cornell.edu/uscode/text/26 "
};

var states = {
  AL:"site:revenue.alabama.gov",
  AZ:"site:azdor.gov",
  CA:"site:cdtfa.ca.gov",
  IL:"site:www2.illinois.gov/rev",
  MD:"site:marylandtaxes.gov",
  MI:"site:michigan.gov/taxes",
  NY:"site:tax.ny.gov",
  PA:"site:revenue.pa.gov"
}

var copiesTA = {
  div1: `This is Jamie with <span class="highlight">TurboTax Live</span>. I'm a <span class="highlight">Credentialed Tax Expert</span> with 6 years experience. How can I help you today?`,
  div2: `The best way for me to help you is to <span class="highlight">share your TurboTax Live Screen</span>. You should see a pop-up that says: See your expert and share your screen. Please click Accept.`,
  div3: `Thank you, we're now connected. I won't see any private information and can only see what's on your TurboTax Live screen. You might see me outlining something on your screen with a red box, but I cannot make any changes.
<br>
If you minimize your TurboTax screen or go to a link, you may lose sight of the chat window. To return, select Live Help on your screen.`,
  div4: `Have I <span class="highlight">resolved all of your issues</span> today?`,
  div5: `You may <span class="highlight">receive a survey</span> based on my performance, and I'd appreciate your honest feedback. Thanks for choosing TurboTax Live!`
};

var copies = { //Lead
  div1: `:happy_oddish: Thank you for letting me answer your question! Can you please put a Green Check Mark next to the eyes underneath your original question :eyes: :white_check_mark: I will then add a :leadpolly: next to your checkmark for a survey! "Your feedback is how I grow and get better. Please take a minute to complete this short survey." You will find the survey at the bottom of your Slack panel. Thank you so much!`,
  div2: `Hello [name]! Thank you for providing the Engagement ID, I can assist you with that! Give me a moment to get this pulled up. Are you out of the engagement?`,
  div3: `Hello [name]! Thank you for providing the case number, I can assist you with that! Give me a moment to look into this.`,
  div4: `Hello [name]! Thank you for your question, I can assist you with that! Give me a moment to review this.`,
  div5: `Hi [agent]! Please check your phone tool. You are showing in After Call Work for [minutes] mins! Please switch back to Available ASAP. :sweat_smile:`,
  div6: `Hey [manager]! I'm seeing [agent] in [status] for [minutes] mins. I did a callout in Support, and DM'd already. No response.`,
  div7: `in:#nicole15-watercooler from:@[agentID]`
};

var copiesPM = {
  div1: `Hi [name]! I realize that your background is not in finances. I reached out to you because smart people know other smart people.<br><br>I am a financial advisor looking to get a practice started, and my hope in contacting you is that you might know some people who are thinking about planning for retirement or are generally interested in investing.<br><br>In return, I am talking to a lot of different people in numerous fields and I'd be happy to pass along any opportunities or contacts that would be in your field.`,
  div2: `Hi [name]! I saw that you have a professional background[ in finances]. I reached out to you because smart people know other smart people.<br><br>I am a financial advisor looking to get a practice started, and my hope in contacting you is that you might know some people who are thinking about planning for retirement or are generally interested in investing[ as they get more secure in their careers and income].<br><br>In return, I am talking to a lot of different people in numerous fields and I'd be happy to pass along any opportunities or contacts that would be in your field.`,
  div3: `Hello [name]! Thank you for providing the Engagement ID, I can assist you with that! Give me a moment to look into this.`,
  div4: `Hello [name]! Thank you for providing the case number, I can assist you with that! Give me a moment to look into this.`,
  div5: `:happy_oddish: Thank you for letting me answer your question! Can you please put a Green Check Mark next to the eyes underneath your original question :eyes: :white_check_mark: I will then add a :leadpolly: next to your checkmark for a survey! "Your feedback is how I grow and get better. Please take a minute to complete this short survey." You will find the survey at the bottom of your Slack panel. Thank you so much!`
};

var temp = {}; // to store altered copy text

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
    text = "+";
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
  var src = elem.innerHTML || elem.value;
  var text = src.replace(/<br>/gi, "\n").replace(/<[^>]+>/gi, "");
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
        <p id="text_${id}">${text}</p>
      </div>`;
    //var refElem = document.getElementById("copy-items").children[0];
    //document.getElementById("copy-items").insertBefore(div,refElem);
    var currText = document.getElementById("copy-items").innerHTML;
    document.getElementById("copy-items").innerHTML = div + currText;
    copies[id] = div;
   // buildObject(text,`text_${id}`);
    console.log(copies[id]);
    ct++;
  }
  //console.log(JSON.stringify(copies));
}

function inputCopyItems(elem) {
  var input = elem.value;
  elem.value = "";
  var items = input.replace(/\n/g, "<br>").split(/--/g);
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
      var id = matches[ea].match(/\w/g).join("");
      //var txtId = `text_${id}`;
      var html = `<input id="${id}" placeholder="${placeholder}">`; // removed 1.9.22 - onkeyup="try{window.database.update(${id})} catch(err){alert(err.message)}"
      txt = txt + html;
    }
  }
  return txt;
}

function altSearch(input) {
  var text = input.value;
  var search = matcher(obj,text);
  if (search) {
    return search;
  } else {
    return text;
  }
}

function matcher(obj,text) {
  for (var i in obj) {
    var code = i;
    var search = obj[i];
    var patt = new RegExp(`(\\s|^)${code}\\s`,"");
    var result = text.match(patt);
    if (result) {
       result = result[0].replace(/\s/g,"");
       text = text.replace(result+" ","");
       result = obj[result];
       return search + " " + text;
    } else {
      return text;    
    }
  }
}

function buildObject(text,id) {
  // create template object to use whenever text is changed
  // text: string template text
  // id: string id of display element
  window.database = {};
  window.database[id] = {};
  var obj = window.database[id];
  obj.temp = "";
  obj.filled = "";
  obj.vars = {};
  obj.temp = text;
 /* window.database.update = (input,output) => {
    // input: element were input is located
    // output: display element
    var db = window.database;
    var id = input.id;
    var outId = output.id;
    var value = input.value;
    var vars = db[outId].vars;
    vars[id] = value;
    for (var ea in vars) {
      var k = ea;
      var v = vars[ea];
      var txt = obj.temp.replace(`[${k}]`,`${v}`);
      document.getElementById(outId).innerHTML = txt;
    }
  };
  var matches = text.match(/\[[\w\s]+\]/g);
  for (var m in matches) {*/
  //  obj[m.replace(/[\[\]]*/g,"")] = "";
  //}
  return obj;
}

function fillTemplate(inputs,parag) {
  if (!parag.temp) {
  	var text = parag.innerHTML;
    parag.temp = text;
    parag.contentEditable = false;
  } else {
    var text = parag.temp;
  }
  for (var i in inputs) {
    var input = inputs[i];
    if (typeof input === "object") {
      var key = input.id;
      var value = input.value;
      text = text.replace(`[${key}]`,value);
    }
  }
  //alert("text at close: "+text);
  parag.innerHTML = text;
}

function fillTemplateListener() {
  document.addEventListener("keyup", (e) => {
    if (e.target.tagName === "INPUT") {
      var parent = e.target.parentElement;
      while (!parent.classList.contains("copy_border")) {
        parent = parent.parentElement;
      }
      var parag = parent.getElementsByClassName("copy_text")[0];
      fillTemplate(parent.getElementsByTagName('input'),parag);
    }
  });
}

function fixVTO(elem) {
  var str = elem.value.split(/\s/);
  var corpID = str.shift().toLowerCase().replace("@","").trim();
  str = str.join(" ");
  var timeExp = str.match(/[\d:]{1,5}(\s|)(a|p|)(m|)/gi);
  if (timeExp.length > 1) {
    timeExp = timeExp[timeExp.length - 1];
  } else {
      timeExp = timeExp[0];
  }
  var timeDigits = timeExp.match(/\d/g);
  var time = parseInt(timeDigits.join(""));
  //var timeLetters = timeExp.match(/[a-z]{1,3}/gi);
  var timezone = str.match(/(PT|PST|PDT|MT|MST|MDT|CT|CST|CDT|ET|EST|EDT|ES)/i);
  var timeOfDay = timeExp.toString().match(/[amp]{1,2}/i);
  var zones = "PMCE";
  var z = "P";
  var diff = 0;
  if (timezone) {
  	z = timezone[0][0].toUpperCase();
	diff = zones.indexOf(z) * 100;
  }
  if (time < 100) {
  	// ...then it must be hour only (ex: "1pm")
  	time = time * 100;
  }
  var hourChk = Math.floor(time / 100); //3
  if (timeOfDay && timeOfDay[0].match(/a/i)) {
	if (hourChk === 12) {
	  time += 1200;
	}
  	time = time - diff; 
  } else if (timeOfDay && timeOfDay[0].match(/p/i)) { //pm
  	if (hourChk === 12) { //3
      time = time - diff;
    } else {
  	  time = time + 1200 - diff; //300 + 1200 - 300
    }
  } else {
	time -= diff;
  }
  if (time < 100) {
	time += 2400;
  }
  var digits = time.toString().match(/\d/g);
  var dl2 = digits.pop();
  var dl1 = digits.pop();
  var eos = digits.join("")+":"+dl1+dl2;
  elem.value = corpID + " " + eos;
  return corpID + " " + eos;
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
      var elem = e.target;
      if (elem.value.match(/^@/)) {
        fixVTO(elem);
        simpleCopy(elem);
      } else {
        inputCopyItems(elem);
      }
    }
  });
  for (var t in copyFields) {
    if (copyFields[t].id) {
      copyFields[t].addEventListener("keyup", (e) => {
        var elem = e.target;
        copies[elem.id] = elem.innerHTML;
      });
    }
  }
}

setTimeout(setListeners, 3000);

setTimeout(() => { 
  setCopyItems(copies, true);
  fillTemplateListener(); 
}, 2000);
