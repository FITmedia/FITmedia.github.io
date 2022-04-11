var db = {
  searchIRS: "site:irs.gov ",
  searchIntuit: "site:ttlc.intuit.com ",
  searchUScode: "site:law.cornell.edu/uscode/text/26 "
};

var states = {
  AL:"site:revenue.alabama.gov/",
  AK:"site:revenue.state.ak.us/",
  AZ:"site:azdor.gov/",
  AR:"site:dfa.arkansas.gov/",
  CA:"site:ftb.ca.gov/",
  CO:"site:colorado.gov/revenue",
  CT:"site:ct.gov/drs/site/",
  DE:"site:revenue.delaware.gov/",
  FL:"site:dor.myflorida.com/",
  GA:"site:dor.georgia.gov/",
  HI:"site:tax.hawaii.gov/",
  ID:"site:tax.idaho.gov/",
  IL:"site:.illinois.gov/rev/",
  IN:"site:in.gov/dor/",
  IA:"site:tax.iowa.gov/",
  KS:"site:ksrevenue.org/",
  KY:"site:revenue.ky.gov/",
  LA:"site:revenue.louisiana.gov/",
  ME:"site:maine.gov/revenue/",
  MD:"site:marylandtaxes.com/",
  MA:"site:mass.gov/dor/",
  MI:"site:michigan.gov/treasury",
  MN:"site:revenue.state.mn.us/",
  MS:"site:dor.ms.gov/",
  MO:"site:dor.mo.gov/",
  MT:"site:revenue.mt.gov/",
  NE:"site:revenue.nebraska.gov/",
  NV:"site:tax.nv.gov/",
  NH:"site:revenue.nh.gov/",
  NJ:"site:state.nj.us/treasury/taxation/",
  NM:"site:tax.newmexico.gov/",
  NY:"site:tax.ny.gov/",
  NC:"site:dor.state.nc.us/",
  ND:"site:nd.gov/tax/",
  OH:"site:tax.ohio.gov/",
  OK:"site:oklahoma.gov/tax.html",
  OR:"site:oregon.gov/DOR/",
  PA:"site:revenue.pa.gov/",
  RI:"site:tax.ri.gov/",
  SC:"site:dor.sc.gov/",
  SD:"site:dor.sd.gov/",
  TN:"site:tn.gov/revenue",
  TX:"site:cpa.state.tx.us/",
  UT:"site:incometax.utah.gov/",
  VT:"site:tax.vermont.gov/",
  VA:"site:tax.virginia.gov/",
  WA:"site:dor.wa.gov/",
  DC:"site:otr.cfo.dc.gov/",
  WV:"site:tax.wv.gov/",
  WI:"site:revenue.wi.gov/",
  WY:"site:revenue.wyo.gov/"
}

var queueFixes = {
	"cg-us_ta_extendfs": "New FS Extensions. Please be efficient with your calls. Thanks.",
	"cg-us_t": "AYG. Please be efficient with your calls. Thanks.",
	"cg-us_er_fs_amend": "FS Amend. Can we get some support to clear the queue? Thanks.",
	"cg-us_er_fs": "Full Service. Can we get some support to clear the queue? Thanks.",
	"cg-us_er": "AYG. Please be efficient with your calls. Thanks."
};

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
  div1: `Pod15 / [affected] / [responses] / [staffed]`,
  div2: `hasmy::leadpolly: on:today`,
  div3: `Hey [manager]! I'm seeing [agent] in [status|ACW|Break status|Lunch status|ANA|System Issues|Hold status] for [minutes] mins. I did a callout in Support, and DM'd already. No response.`,
  div4: `in:#[room|nicole15-watercooler|nicole15-nesting|nicole15-support|ttlive-pro-services] from:@[agentID] [keywords]`
};

var copiesPM = {
  div1: `Hi [name]! I realize that your background is not in finances. I reached out to you because smart people know other smart people.<br><br>I am a financial advisor looking to get a practice started, and my hope in contacting you is that you might know some people who are thinking about planning for retirement or are generally interested in investing.<br><br>In return, I am talking to a lot of different people in numerous fields and I'd be happy to pass along any opportunities or contacts that would be in your field.`,
  div2: `Hi [name]! I saw that you have a professional background[ in finances]. I reached out to you because smart people know other smart people.<br><br>I am a financial advisor looking to get a practice started, and my hope in contacting you is that you might know some people who are thinking about planning for retirement or are generally interested in investing[ as they get more secure in their careers and income].<br><br>In return, I am talking to a lot of different people in numerous fields and I'd be happy to pass along any opportunities or contacts that would be in your field.`,
  div3: `Hello [name]! Thank you for providing the Engagement ID, I can assist you with that! Give me a moment to look into this.`,
  div4: `Hello [name]! Thank you for providing the case number, I can assist you with that! Give me a moment to look into this.`,
  div5: `:happy_oddish: Thank you for letting me answer your question! Can you please put a Green Check Mark next to the eyes underneath your original question :eyes: :white_check_mark: I will then add a :leadpolly: next to your checkmark for a survey! "Your feedback is how I grow and get better. Please take a minute to complete this short survey." You will find the survey at the bottom of your Slack panel. Thank you so much!`
};

var temps = {}; // to store altered copy text

function srch(elem) {
  var id = elem.id;
  var text = db[id];
  var search = text + elem.value;
  if (elem.id === "searchIRS" && elem.value.slice(0,3).match(/^[A-Z]{2}\s/)) {
    search = stateSearch(elem);
  }
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
    document.getElementById("copy-items").innerHTML = div + currText; // add new items to top
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

function appendInputs_ok(txt) {
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

function appendInputs(txt) {
  var matches = txt.match(/\[[\w\s\|-]+\]/g); // .match(/\[[^\n\r\v]+\]/g);
  if (matches) {
	for (var ea in matches) {
	  var match = matches[ea];
	  var placeholder = match.replace(/[\[\]]*/g, "");
	  var id = match.replace(/\|/g,"_").replace(/[\[\]]*/g,""); // .match(/\w/g).join("");
	  if (match.match(/\|/g)) {
		  var splits = match.replace(/[\[\]]/g,"").split("|");
      var label = `[${splits[0]}]`;
      txt = txt.replace(match, label);
		  var html = `<select id="${id}">`;
		  for (var s in splits) {
			  var split = splits[s];
			  var opVal = split;
			  var opPh = split;
			  var opt = `<option value="${opVal}">${opPh}</option>`;
			  html += opt;
		  }
		  html += "</select>";
	  } else {
	  
	  //var txtId = `text_${id}`;
	  var html = `<input id="${id}" placeholder="${placeholder}">`; // removed 1.9.22 - onkeyup="try{window.database.update(${id})} catch(err){alert(err.message)}"
}
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
  if (!temps[parag.id]) {
  	var text = parag.innerHTML;
    temps[parag.id] = text;
    parag.contentEditable = false;
  } else {
    var text = temps[parag.id];
  }
  for (var i in inputs) {
    var input = inputs[i];
  //  if (typeof input === "object") {
      var key = input.id;
      var value = input.value;
      var tag = input.tagName;
      if (tag === "INPUT") {
        text = text.replace(`[${key}]`,value);
      } else if (tag === "SELECT") {
        key = key.split("_")[0]; //.replace(/_/g,"|");
        text = text.replace(`[${key}]`,value);
      }
  //  } 
    /* var key = i;
    var value = input;
    text = text.replace(`[${key}]`,value);*/
  }
  //alert("text at close: "+text);
  parag.innerHTML = text;
}

function fillTemplateListener() {
  var test = (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") {
      var parent = e.target.parentElement;
      while (!parent.classList.contains("copy_border")) {
        parent = parent.parentElement;
      }
      var parag = parent.getElementsByClassName("copy_text")[0];
      var ins = parent.getElementsByTagName('input');
      var dds = parent.getElementsByTagName('select');
      var inputs = [];
      for (var n in ins) {
        var elem = ins[n];
        if (elem && elem.id) {
          inputs.push(elem);
          console.log(elem.id);
        }
      }
      for (var d in dds) {
        var elem = dds[d];
        if (elem && elem.id) {
          inputs.push(elem);
          console.log(elem.id);
        }
      }
      console.log("inputs = "+JSON.stringify(inputs));
      fillTemplate(inputs,parag);
    }
  }
  document.addEventListener("keyup",test);
  document.addEventListener("change",test);
}

function fixVTO(elem) {
  var str = elem.value.split(/\s/);
  var corpID = str.shift().toLowerCase().replace("@","").trim();
  str = str.join(" ");
  var timeExp = str.match(/[\d:]{1,5}(\s|)(a|p|)(m|)/gi);
  if (timeExp && timeExp.length > 1) {
    timeExp = timeExp[timeExp.length - 1];
  } else if (timeExp && timeExp.length <= 1) {
    timeExp = timeExp[0];
  } else {
    return elem.value;
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

function fixQueues(elem) {
  var fixes = queueFixes;
  var text = elem.value;
  var msgs = text.match(/@[^@]+/g);
  if (!msgs) { return text; }
  var newTxt = ["@here "];
  var n = "";
  if (msgs.length > 1) { n = "\n" }
  for (var m in msgs) {
  	var msg = msgs[m];
    if (msg && msg.match(/cg-us_[^\s]+/i)) {
      var nums = msg.match(/\d+/g); 
      var match = msg.match(/cg-us_[^\s]+/i).toString();
      for (var f in fixes) {
        var find = f;
        var fix = fixes[f];
        if (match.match(find)) {
          var num = nums[0];
          var dur = nums[1];
          var ending = fix;
          var s = "s";
          if (num == 1) { s = "" }
          msg = "We have "+num+" call"+s+" in queue for over "+dur+" minutes in "+ending;
          break;
        }
      }
    }
	newTxt.push(msg);
  }
  elem.value = newTxt.join(n);
  //demo.innerText = newTxt.join("");
  return text;
}

function fixQueues_old(elem) {
  var fixes = {
    "cg-us_ta": "AYG",
    "cg-us_fs": "Full Service"
  }
  var text = elem.value;
  if (text && text.match(/cg-us_[^\s\.]+/i)) {
    var match = text.match(/cg-us_[^\s\.]+/i);
    for (var f in fixes) {
      var find = f;
      var fix = fixes[f];
      if (match.match(find)) {
        text = text.replace(match,fix);
      }
    }
  }
  elem.value = text;
  return text;
}

function stateSearch(elem) {
  var text = elem.value;
  var txt = elem.value.slice(0,2);
  for (var s in states) {
    var srch = states[s];
    if (txt == s) {
      text = text.replace(txt,srch);
      return text;
    }
  }
  return text;
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
        try{fixQueues(elem);}catch(err){alert(err.message)}
       // try{fixVTO(elem);}catch(err){alert(err.message)}
        simpleCopy(elem);
        elem.value = "copied!";
        setTimeout(() => {elem.value = ""},3000);
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
