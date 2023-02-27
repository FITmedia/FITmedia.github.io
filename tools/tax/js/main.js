const db = {
  localSave: true,
  searches: {
	searchIRS: "site:irs.gov ",
	searchIntuit: "site:ttlc.intuit.com ",
	searchUScode: "site:law.cornell.edu/uscode/text/26 "
  }
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
	"cg-us_er_fullservice": "Full Service. Can we get some support to clear the queue? Thanks.",
	"cg-us_er„_fs_amend": "FS Amend. Can we get some support to clear the queue? Thanks.",
	"cg-us_er_fs": "Full Service. Can we get some support to clear the queue? Thanks.",
	"cg-us_er": "AYG. Please be efficient with your calls. Thanks."
};

const copies = {
  ext: {},
  currentSet: "household",
  taxassociate: {
	div1: `This is Jamie with <span class="highlight">TurboTax Live</span>. I'm a <span class="highlight">Credentialed Tax Expert</span> with 6 years experience. How can I help you today?`,
	div2: `The best way for me to help you is to <span class="highlight">share your TurboTax Live Screen</span>. You should see a pop-up that says: See your expert and share your screen. Please click Accept.`,
	div3: `Thank you, we're now connected. I won't see any private information and can only see what's on your TurboTax Live screen. You might see me outlining something on your screen with a red box, but I cannot make any changes.
<br>
If you minimize your TurboTax screen or go to a link, you may lose sight of the chat window. To return, select Live Help on your screen.`,
	div4: `Have I <span class="highlight">resolved all of your issues</span> today?`,
	div5: `You may <span class="highlight">receive a survey</span> based on my performance, and I'd appreciate your honest feedback. Thanks for choosing TurboTax Live!`
  },
  lead: { //
	div1: `Pod15 / [affected] / [responses] / [staffed]`,
	div2: `hasmy::leadpolly: on:today`,
	div3: `Hey [manager]! I'm seeing [agent] in [status|ACW|Break status|Lunch status|ANA|System Issues|Hold status] for [minutes] mins. I did a callout in Support, and DM'd already. Would you reach out to make sure everything is okay?`,
	div4: `in:#[room|nicole15-watercooler|nicole15-nesting|nicole15-support|ttlive-pro-services] from:@[agentID] [keywords]`
  },
  finance: {
	div1: `Hi [name]! I realize that your background is not in finances. I reached out to you because smart people know other smart people.<br><br>I am a financial advisor looking to get a practice started, and my hope in contacting you is that you might know some people who are thinking about planning for retirement or are generally interested in investing.<br><br>In return, I am talking to a lot of different people in numerous fields and I'd be happy to pass along any opportunities or contacts that would be in your field.`,
	div2: `Hi [name]! I saw that you have a professional background[ in finances]. I reached out to you because smart people know other smart people.<br><br>I am a financial advisor looking to get a practice started, and my hope in contacting you is that you might know some people who are thinking about planning for retirement or are generally interested in investing[ as they get more secure in their careers and income].<br><br>In return, I am talking to a lot of different people in numerous fields and I'd be happy to pass along any opportunities or contacts that would be in your field.`,
	div3: `Hello [name]! Thank you for providing the Engagement ID, I can assist you with that! Give me a moment to look into this.`,
	div4: `Hello [name]! Thank you for providing the case number, I can assist you with that! Give me a moment to look into this.`,
	div5: `:happy_oddish: Thank you for letting me answer your question! Can you please put a Green Check Mark next to the eyes underneath your original question :eyes: :white_check_mark: I will then add a :leadpolly: next to your checkmark for a survey! "Your feedback is how I grow and get better. Please take a minute to complete this short survey." You will find the survey at the bottom of your Slack panel. Thank you so much!`
  },
  household: { // personal
	//div1: `https://script.google.com/a/macros/thefitmedia.com/s/AKfycbwaXpoVbWj6DEsQodhuhLcPqDB4Ht0-5fIdJ6zw83c/dev?cmd=chores&kid=[Killien|Miriam]&date=[date]&desc=[Dishes (2 drainers)|Meloncube|Discord Nitro]&amt=[amount]`,
	div2: `<h3>Kids Ledgers</h3><p>kid: [Killien|Miriam]</p><p>date: [date]</p><p>desc: [Dishes (2 drainers)|Dishes (1 drainer)|Meloncube|Discord Nitro|Robux|Toca Life|Other]</p><p>amt: [amount]</p><button onclick="handleURL('https://script.google.com/a/macros/thefitmedia.com/s/AKfycbwaXpoVbWj6DEsQodhuhLcPqDB4Ht0-5fIdJ6zw83c/dev?cmd=chores&kid=[Killien|Miriam]&date=[date]&desc=[Dishes (2 drainers)|Dishes (1 drainer)|Meloncube|Discord Nitro|Robux|Toca Life|Other]&amt=[amount]')">Submit</button>`,
	//div3: `<h3>Create Markdown Link</h3><p>[URL]</p><button onclick="cmds.marklink.func(new Array().push('[URL]'))">Submit</button>`
  },
  qualtek: {
	  div1: `Please correct billing: [total]ft being billed as [PDA (1ft - 25ft)|PDB (26ft - 150ft)|PDC (151ft - 250ft)|PDE (&gt; 250ft)]. Should be billed as PD[A (1ft - 25ft)|B (26ft - 150ft)|C (151ft - 250ft)|D or PDE (&gt; 250ft)].`,
	  div2: `[Verify Pricing. . .Trench footage matches article range (ex: 80ft is 26ft - 150ft). . .Trench depth entered correctly (ex: 0000 vs 0001). . .Bore depth entered correctly (ex: BOB = 6). . .Correct cutover article billed for wire type (CO vs COF). . .All articles entered with correct quantities (ex: 0039PE qty 1 vs 2). . .20-50% higher in ABWS? Add Jump Rate in Vision. . .20-50% lower in ABWS? Remove Jump Rate in Vision]`,
		  div3: `[Manager Assist Request. . .Work Requests Complaint. . .Enter V / MA. . .Enter notes describing what is needed. . .Look up Request ID in Operations main search. . .Enter notes into + QualTek Notification. . .Enter "No" for ECD]`,
	  div4: `New ECD set for work order on [7 days from today].
[ECD New WOs. . .Operations > Work Orders > WOs Added Today. . .Filter out CA. . .Export to XLS. . .<b>FOR EACH</b> in Work Requests Complaint. . .__Change dropdown to "closed". . .__Set Complaint Type to "I" (Informational). . .__Paste the above message into Remarks. . .__(Verify that month is correct)]`,
	  div5: `[ECD Emails. . .Search in Work Requests Complaint Report. . .<b>IF</b> not yet entered, enter New in Work Requests Complaint. . .<b>IF</b> today or past date. . .__<b>IF</b> locate number is present. . .__Set Complaint Type to "8" (Locate Ticket). . .__Enter just locate number text in Remarks. . .<b>ELSE IF</b> future date. . .__Change Complaint Status to "Closed". . .__Set Complaint Type to "I" (Informational). . .__Enter ECD text and locate number text or other note]`,
	  div6: `All cutovers must be completed by the subcontractor, unless ATT indicated Held Order. Please contact Carl for approval.
[Verify before rejecting. . ."Cutover required" marked "Yes" with no CO billing item?. . .Is bid area AS or ST?. . .Comments do not mention Carl's approval. . ."Held order" marked "F"?. . .CO Reason cannot be verified and no clarification in Comments. . .OGComments do not indicate held order or DO specify a reconnect. . .<= 10 days on ground OR > 10 days on ground and 0 rejects for CO approval?]`,
  }
}

const cmds = {
  marklink: { 
	func: (arr) => {
	  var url = arr[0];
	  var title = arr[1];
	  var markdown = markdownLink(url,"markdown",title);
	  copyNotify(markdown,inputCopies,3000);
	  return markdown;
	},
	properties: {
	  url: {
		desc: "URL to encode"
	  },
	  title: {
		desc: "Title"
	  }
	}
  },
  mdl: {
	func: (arr) => { cmds.marklink.func(arr) }, // alias
	properties: {
	  url: {
		desc: "URL to encode"
	  },
	  title: {
		desc: "Title"
	  }
	}
  },
  copies: { 
	func: (arr) => {
	  copies.currentSet = arr[0];
	  /*var cset = copies.currentSet;
	  var save = JSON.stringify({[cset]:copies[cset]});
	  localStorage.setItem("wb_copies_currentSet",save);*/
	  setCopyItems(copies[arr[0]],true);
	  copyNotify(`Switched to ${arr[0]} set`,inputCopies,3000);
	},
	properties: {
	  copyId: {
		desc: "ID of copy set"
	  }
	}
  },
  chores: {
	  func: (arr) => {
	  // test: !chores killien|7/18/2022|2 drainers|10
		  var kid = arr[0];
		  var date = encodeURIComponent(arr[1]);
		  var desc = encodeURIComponent(arr[2]);
		  var amt = arr[3];
		  var url = `https://script.google.com/a/macros/thefitmedia.com/s/AKfycbwaXpoVbWj6DEsQodhuhLcPqDB4Ht0-5fIdJ6zw83c/dev?cmd=chores\&kid=${kid}\&date=${date}\&desc=${desc}\&amt=${amt}`;
		  inputCopies.value = url; //createButton(kid+" Chores",url);
		  inputCopyItems(inputCopies);
		  return url;
	  },
	  properties: {
		  kid: {
			  desc: "Killien|Miriam"
		  },
		  date: {
			  desc: "date"
		  },
		  desc: {
			  desc: "Dishes (2 drainers)|Dishes (1 drainer)|Meloncube|Discord Nitro|Robux|Toca Life|Other"
		  },
		  amt: {
			  desc: "amount"
		  }
	  }
  },
  extract: {
	  func: (arr) => {
		  var pattSet = arr[0];
		  var text = arr[1];
          console.log("pattSet = "+arr[0]+"\ntext = "+arr[1])
		  inputCopies.value = extractor(pattSet,text);
		  inputCopyItems(inputCopies);
	  },
	  properties: {
		  pattset: {
			  desc: "pattset"
		  },
		  text: {
			  desc: "text"
		  }
	  }
  },
  todo: {
	func: (arr) => {
		var prefix = "(MUST DO)\\. \\. \\."; // i.e.: card name begins with...
		if (arr) {
			prefix = `(${arr.join("|")})\\. \\. \\.`;
		}
		fetchByPrefix(prefix);
	},
	properties: {}
  },
  log: {
	func: (arr) => {
		inputCopies.value = JSON.stringify(copies);
	},
	properties: {}
  }
};

const cmdMods = {
  h: (cmdId,props,elem) => {
	var text = `!${cmdId} `;
	var arr = [];
	var props = cmds[cmdId].properties;
	for (var p in props) {
	  var prop = props[p].desc || p;
	  arr.push(`[${prop}]`);
	}
	text += arr.join("|");
	elem.value = text;
	inputCopyItems(elem);
  }
}

const patterns = {
	bookmarks: [
		[/((?!https*:\/\/[^\s]+)[^\n]*)(?:\n)(https*:\/\/[^\s\n]+)/,"$1\n$2"]
	],
	specChars: [
		[/(ATT |)[0-9]*[-+][0-9]+=[0-9]+( *ft,*|)/g,""],
		[/([0-9])-([0-9])/g, "$1 to $2"],
		//[/([0-9]+) *- *([0-9]+)/g,"$1 to $2"],
		[/([0-9]+)(['\u2018\u2019\u201B]|-FOOT)/gi, "$1 ft"],
		[/([0-9]+)["\u201C\u201D\u201F]/g, "$1 inches"],
		[/['\u2018\u2019\u201B"\u201C\u201D\u201F\u0026]/g,""],
		[/(,)(?=[^\s])/g,"$1 "]
	],
	fixList: [
		[/[A-Z0-9 &]+\n/g,""],
		[/• /g,""],
		[/\n\n+/g,"\n"]
	],
	filePath: [
		[/^[^]+$/,"S:\\$&"],
		[/\n/g,"\\"]
	],
	fixSF: [
		[/_/g,"*"],
		[/(\n\n|^)([^\n]+)\n\n/g,"$1*$2*\\n\\n"],
		[/\[[^\]]+\]\((http[^\s]*)[^\)]*\) ?(?= )/g, "$1"],
		[/\n(?!(- |\*|--|\n))/g,"\\n- "],
		[/\n[\t ]*\-\-/g,"\\n--"]
	]
};

var temps = {}; // to store altered copy text

function srch(elem) {
  var id = elem.id;
  var text = db.searches[id];
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

/***** COPY ITEMS *****/

function submitChanges(id) {
	// submit changes in checkbox back to source
    var elem = document.getElementById(`border_${id}`);
	var h3 = elem.querySelector("h3");
	var cardId = elem.querySelector(".chkbx-form").getAttribute("cardId");
	var checks = elem.querySelectorAll("div.chkbx-unit");
	var prefix = camelCase(h3.innerText);
	var items = [h3.innerText];
	for (var box of checks) {
		var input = box.querySelector("input");
		var label = box.querySelector("label");
		if (input.checked) {
			// how to send checkmark to trello?
			// submitChange(input.getAttribute("checkItemId ?"))
		} else {
			items.push(label.innerText);
		}
	}
	var text = items.join(". . .");
	inputCopies.value = text;
	if (copies.ext[prefix]) {
		copies.ext[prefix].name = text;
		copies.ext[prefix].id = cardId;
		// TODO functionToPostUpdate() {
			// change name of card - 
			// forEach checkItem
		// }
		var request = updateCardRequest(cardId);
		fetch(request[0],request[1]).then((res) => { console.log("submitChanges, response = "+JSON.stringify(res.json())) });
	}
}

function submitChange(checkItemId) {
	// TODO - to send checkbox updates individually
}

function decorCopy(id, text) {
  text = text || "copied!";
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

function decorClear(id, text) {
  if (!text) {
	text = "cleared!";
  }
  var elem = document.getElementById(id);
  var border = document.getElementById("border_" + id);
  var btn = document.getElementById("btn_clear_" + id);
  var oldTxt = btn.innerHTML;
  btn.innerHTML = text;
  btn.classList.add("lite");
  border.classList.add("lite");
  if (text !== "cleared!") {
	deleteCopyItem(border);
  } else {
	elem.innerHTML = temps[id].text;
	var ins = border.getElementsByTagName("input");
	var dds = border.getElementsByTagName("select");
	for (var i in ins) {
		if (ins[i].tagName === "INPUT") {
			if (ins[i].getAttribute("type") === "checkbox") {
				ins[i].checked = false;
			} else {
				ins[i].value = "";
			}
		}
	}
	for (var d in dds) {
		if (dds[d].tagName === "SELECT") {
			var opt = dds[d].getElementsByTagName("option")[0];
			dds[d].value = opt.value || "";
		}
	}
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
  try {
  var active = document.activeElement;
  if (typeof elem === "string") {
	var src = elem;
  } else {
	var src = elem.innerHTML || elem.value;
  }
  var text = src.replace(/<br>/gi, "\n").replace(/<[^>]+>/gi, "");
  //hiddenInput.style.display = "block";
  hiddenInput.value = text.trim(); // removed 8.24.20 - .trim();
  hiddenInput.select();
  var success = document.execCommand("copy");
  active.focus();
  if (success) {
	return "successful";
  } else {
	return "failed";
  }
  } catch (err){console.log("ERROR, simpleCopy: "+err.message)}
}

function copyNotify(copyText,notifyElem,timeOut) {
	simpleCopy(copyText);
	var notice = `copied "${copyText.slice(0,25)}..."!`;
	notifyElem.value = notice;
	if (timeOut) {
		setTimeout(() => {
			if (notifyElem.value === notice) {
				notifyElem.value = "";
			}
		}, timeOut);
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
	var id = elem.id.match(/[a-z-A-Z0-9\-]+_(.+)$/)[1];
  }
  elem.outerHTML = "";
  console.log(`Deleted copies["${copies.currentSet}"]["${id}"]`);
  //console.log(copies[copies.currentSet]);
  delete copies[copies.currentSet][id];
  saveCopies();
}

function setCopyItems(items, clear) {
  var cset = copies.currentSet;
  var ct = 0;
  if (clear) {
	document.getElementById("copy-items").innerHTML = "";
	copies[cset] = {};
  }
  if (Object.keys(copies[cset]).length === 0) {
	ct = 1;
  } else {
	ct = Object.keys(copies[cset]).length + 1;
  }
  for (var i in items) {
	var text = items[i];
	if (text.match(/^!/)) { 
		hiddenInput.value = text;
		commands(hiddenInput);
		//inputCopies.value = "";
		continue;
	}
	var id = `div${ct}`;
	//console.log(id);
	text = appendInputs(id,text);
	if (copies.options?.control) {
		// [["submit", "submitFunc"],["email","emailFunc"]]
		var controls = [];
		for (var b in copies.options.control) {
			var ctrl = copies.options.control[b];
			var span = `<span id="btn_${ctrl[0]}_${id}" class="copy_btn warn" onclick="${ctrl[1]}('${id}')">${ctrl[0]}</span>`;
			controls.push(span);
		}
		controls = controls.join("");
	} else { var controls = ""; }
	var div = `<div id="border_${id}" class="copy_border">
		<div id="warn_${id}" class="copy_control">
		  ${controls}
		  <span id="btn_clear_${id}" class="copy_btn warn" onclick="decorClear('${id}')">clear</span>
		  <span id="btn_copy_${id}" class="copy_btn warn" onclick="decorCopy('${id}')">copy</span>
		  <span id="btn_close_${id}" class="copy_btn" onclick="decorClose('${id}')">&#10005;</span>
		</div>
		<p id="text_${id}">${text}</p>
	  </div>`;
	var currText = document.getElementById("copy-items").innerHTML;
	document.getElementById("copy-items").innerHTML = div + currText; // add new items to top
	copies[cset][id] = items[i];
	ct++;
	setTimeout(
		() => {
		var items = document.getElementsByClassName("copy_border");
		var chks = document.getElementsByClassName("chkbx-unit");
		for (let i in items) {
			let border = items[i];
			// var btnId = `btn_copy_${id}`;
			addTargetedListener(border.id,"click",(e) => {
				let btnId = e.target.id.replace(/^[^]+_([^]+)/g,"btn_copy_$1");
				document.getElementById(btnId).dispatchEvent(new Event("click"));
			})
		}}, 
		500
	);
  }
  saveCopies();
}

function inputCopyItems(elem) {
  var input = elem.value;
  elem.value = "";
  var items = input.replace(/\n/g, "<br>").split(/~~/g);
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

function appendInputs(txtId,text) {
  temps[txtId] = {text: text};
  var txt = `<div id="${txtId}" class="copy_text" contenteditable="true">${text}</div>`;
  // var matches = txt.match(/\[[^\n\r\v\]]+\]/g);
  var matches = txt.match(/\[+[^\n\r\v\]]+\]+/g);
  var used = [];
  if (matches) {
	for (var ea in matches) {
	  var match = matches[ea];
	  if (used.includes(match)) { continue; } else { used.push(match); }
	  var placeholder = match.replace(/[\[\]]*/g, ""); // remove [ ]
	  let id = txtId+"_input"+ea; //match.replace(/\|/g,"_").replace(/[\[\]]*/g,""); // .match(/\w/g).join("");
	  temps[txtId][id] = match;
	  if (match.match(/\|/g)) {
		  var splits = match.replace(/[\[\]]/g,"").split("|");
		  var label = splits[0];
		  txt = txt.replace(match, label);
		  var html = `<select id="${id}" onchange="chkValue(this)">`;
		  for (var s in splits) {
			  var split = splits[s];
			  var opVal = split;
			  var opPh = split;
			  var opt = `<option value="${opVal}">${opPh}</option>`;
			  html += opt;
		  }
		  html += "</select>";
	  } else if (match.match(/\.\s\.\s\./g)) {
		  copies.options = {control: [["submit","submitChanges"]]};
		  var splits = match.replace(/[\[\]]/g,"").split(". . .");
		  var title = splits.shift();
		  var label = ""; // `[${title}]`; --7.28.22 removed so checklists won't affect text
		  temps[txtId].text = temps[txtId].text.replace(match, label); // remove from original
		  txt = txt.replace(match, label);
		  console.log(`copies.ext[${camelCase(title)}].id = ${copies.ext[camelCase(title)]?.id}`)
		  var cardId = copies.ext[camelCase(title)]?.id;
		  var html = `<div id="${id}"><h3>${title}</h3><div class="chkbx-form" cardId="${cardId}">`;
		  for (var s in splits) {
			  var split = splits[s];
			  var opVal = split;
			  var opPh = split;
			  var opt = `<div class="chkbx-unit"><input id="${txtId}_chbx${s}" type="checkbox"><label for=""${txtId}_chbx${s}" onclick="toggleChkBox(this)">${opPh}</label></div>`;
			  //var opt = `<label class="checkbox"><input type="checkbox">${opPh}</label>`;
			  html += opt;
		  }
		  html += "</div></div>";
	  } else if (match.match(/\[\[[^\n\r\v\]]+\]\]/g)) { // matches [[text here]]
		var html = `<textarea id="${id}" placeholder="${placeholder}"></textarea>`;
	  } else {
		//var txtId = `text_${id}`;
		var html = `<input id="${id}" placeholder="${placeholder}">`; // removed 1.9.22 - onkeyup="try{window.database.update(${id})} catch(err){alert(err.message)}"
	  }
	  txt = txt + html;
	}
  }
  return txt;
}

/*----- UTILITIES -----*/

function handleURL(url) {
	inputCopies.value = encodeURI(url);
	simpleCopy(inputCopies);
	inputCopies.value = "Copied link successfully!";
	setTimeout(() => {
		inputCopies.value = "";
	}, 3000)
	try {
		window.open(encodeURI(url),"jk_link");
	} catch (err) {
		console.log("ERROR, handleURL: "+err.message);
	}
}

function toggleChkBox(elem) {
  var sib = elem.parentNode.firstChild;
  if (!sib.checked) {
	sib.checked = true;
  } else {
	sib.checked = false;
  }
}

function chkValue(elem) {
	if (elem?.value.match(/Other/gi) && elem?.tagName.match(/(select|option)/gi)) {
		var id = elem.id;
		let inp = document.createElement("input");
		inp.id = id;
		inp.placeholder = "other";
		elem.outerHTML = inp.outerHTML;
	}
}

function camelCase(str) {
	// https://trello.com/c/efweW65e/380-function-camelcasestr-js-4620
	if (!str.match(/\s/)) { return str; }
	var except = "in the and with from of is a an or at";
	str = str.replace(/[^\w\s]/gi,"");
	str = str.toLowerCase().split(/[\s\_]/g);
	for (var i in str) {
	  if (typeof str[i] !== "function") {
	  if (i === 0) {
		  str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
		} else {
		  if (except.match(str[i]) == null) {
			str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
		  }
		}
	  }
	} // end i loop
	str = str.join("");
	return str.charAt(0).toLowerCase() + str.slice(1);
  }

/****** FILL TEMPLATE ******/

function fillTemplate(inputs,parag) {
  var txtId = parag.id;
  var text = temps[txtId].text;
  for (var i in inputs) {
	var input = inputs[i];
	if (typeof input === "object") {
	  var key = input.id;
	  var value = input.value.replace(/\\n/g,"<br>");
	  var tag = input.tagName;
	  var repl = temps[txtId][key].replace(/[\.\+\*\?\^\$\(\)\[\]\{\}\|\\]/g,"\\$&");
	  repl = new RegExp(repl,"g");
	  if (tag === "INPUT" || tag === "TEXTAREA") {
		text = text.replace(repl,value);// changed 7.22.22 - `[${key}]`
	  } else if (tag === "SELECT") {
		text = text.replace(repl,value);// changed 7.22.22 - `[${key}]`
	  }
	}
  }
  parag.innerHTML = text;
}

function fillTemplateListener() {
  var test = (e) => {
	var tagName = e.target.tagName;
	if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") {
	  var parent = e.target.parentElement;
	  while (parent && !parent.classList.contains("copy_border")) {
		parent = parent.parentElement;
	  }
	  if (!parent) { return }
	  if (tagName === "INPUT") { 
		keySwitcher(e,"Enter","\\n");
	  } else if (tagName === "TEXTAREA") {
		e.target.value = e.target.value.replace(/\n/g,"\\n");
	  }
	  var parag = parent.getElementsByClassName("copy_text")[0];
	  // var ins = parent.getElementsByTagName('input');
	  var ins = parent.querySelectorAll('input, textarea');
	  var dds = parent.getElementsByTagName('select');
	  parag.contentEditable = false;
	  var inputs = [];
	  for (var n in ins) {
		var elem = ins[n];
		if (elem.type === "checkbox") { continue; }
		if (elem && elem.id) {
		  inputs.push(elem);
		  //console.log(elem.id);
		}
	  }
	  for (var d in dds) {
		var elem = dds[d];
		if (elem && elem.id) {
		  inputs.push(elem);
		  //console.log(elem.id);
		}
	  }
	  //console.log("inputs = "+JSON.stringify(inputs));
	  fillTemplate(inputs,parag);
	}
  }
  document.addEventListener("keyup",test);
  document.addEventListener("change",test);
}

function addTargetedListener(target,type,func) {
  if (typeof target === "string") {
	target = document.getElementById(target);
  } else if (!target) {
	  return;
  }
  try {
  target.addEventListener(type,(e) => {
	// run anything here when click is inside target
	if (e.target === target) {
	  // only run this if target received the click
	  func(e);
	}
  });
  } catch (err) {console.log("ERROR, addTargetedListener: target.id = "+target.id+"\n"+err.message)}
}

function keySwitcher(e,keyName,repl) {
  if (e.key === keyName) {
	e.preventDefault();
	var pos1 = e.target.selectionStart;
	var pos2 = e.target.selectionEnd;
	var text = e.target.value;
	var t1 = text.slice(0,pos1);
	var t2 = text.slice(pos2);
	e.target.value = t1+repl+t2;
	var pos3 = parseInt(pos1) + parseInt(repl.length);
	e.target.setSelectionRange(pos3,pos3);
  }
}

/***********/

function saveCopies() {
  if (db.localSave) {
	try { var localStorage = window.localStorage } catch (err) {
	  console.log("ERROR, saveCopies: "+err.message);
	  db.localSave = false;
	  return;
	}
	//if (!window.localStorage) {
	//	return;
	//}
	var cset = copies.currentSet;
	var save = copies;
	//save[cset] = copies[cset];
	var len = Object.keys(save[cset]).length;
	save = JSON.stringify(save);
	localStorage.setItem("wb_copies_currentSet",save);
	console.log(`Saving \"${cset}\"...\n${len} items`);
	return save;
  }
}

async function loadCopies() {
  if (db.localSave) {
	try { var localStorage = window.localStorage } catch (err) {
	  console.log("ERROR, loadCopies: "+err.message);
	  db.localSave = false;
	  return;
	}
	//if (!window.localStorage) {
	//	return;
	//}
	var load = await localStorage.getItem("wb_copies_currentSet");
	if (!load) {
		return copies[copies.currentSet];
		/* console.log("\"wb_copies_currentSet\" was not found...\nCreating...");
		var save = await saveCopies();
		load = await localStorage.getItem("wb_copies_currentSet"); */
	}
	load = JSON.parse(load);
	var cset = load.currentSet;
	copies.currentSet = cset;
	copies[cset] = load[cset];
	copies.ext = load.ext;
	var len = Object.keys(load[cset]).length;
	console.log(`Loading \"${cset}\"...\n${len} items`);
  }
  return load[cset];
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
  try {
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
  } catch(err) {console.log("ERROR, fixQueues:"+err.message)}
}

function fixQueues_old(elem) {
  try {
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
  } catch(err) {console.log("ERROR, fixQueues_old:"+err.message)}
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

function titleCase(str) {
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

/***** COMMANDS *****/

function commands(elem) {
  // text format:
  // ![commandID] remaining string are properties|divided by vertical pipes|true
  // commandID([prop0,prop1,prop2])
  var text = elem.value;
  var props = "";
  var cmdId = text.match(/^(![^\s]+?)(\s|$)/);
  cmdId = cmdId ? cmdId[1].replace("!","").trim() : "";
  if (!cmds[cmdId]) {
	  inputCopies.prev = inputCopies.value;
	  inputCopies.value = "Entry \"!"+cmdId+"\" is not a command.";
	  setTimeout(() => {
		inputCopies.value = inputCopies.prev;
		delete inputCopies.prev;
	  },3000);
	  console.log("Entry \"!"+cmdId+"\" is not a command.");
	  return;
  } 
  props = text.replace("!"+cmdId,"").trim();
  if (props !== "") {
    var propLen = Object.keys(cmds[cmdId].properties)?.length || 0;
    if (propLen > 1 && !props.match(/\|/g)) {
        // shift to new array at each space
        var arr = [];
        var propArr = props.split(/ /);
        for (var i = propLen; i > 1; i--) {
            let prop = propArr.shift();
            arr.push(prop);
        }
        arr.push(propArr.join(" "));
        props = arr;
    } else {
        props = props.split(/\|/g);
    }
  }
  if (text.match(/\s-[a-z]{1,3}(\s|$)/g)) { // modified handling
	var modCode = text.match(/\s-[a-z]{1,3}(\s|$)/g)[0].trim().replace(/-/g,"");
	if (!cmds[cmdId][modCode]) { 
		console.log("ERROR, cmdMods['"+modCode+"'] is not a function.");
		return;
	}
	cmdMods[modCode](cmdId,props,elem);
  } else { // standard handling
	try {
		text = cmds[cmdId].func(props);
		//copyNotify(text,inputCopies);
	} catch(err){console.log("ERROR, commands, standard: "+err.message)}	  
  } 
}

function markdownLink(url,type,title) {
	  if (url.match(/http(s|):\/\//) !== null) {
		if (url.slice(-1) === "/") {
		  // 
		  var factor = 2;
		} else {
		  var factor = 1;
		}
		var array = url.split("/");
		var exclude = /Amazonaws/gi;
		var ttlEx = /[\=\?\$\#]/gi;
		var domain = "";
		if (array[2].match(exclude)) {
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
		if (!title) {
			var title = array[a].replace(/[-_]/g, " ");
			title = title.replace("+", " ");
			if (title.match(ttlEx)) {
				title = "";
			}
			if (title.slice(-5) !== null) {
				var a = title.slice(0,-5);
				var b = title.slice(-5).replace(/\.[a-z]{2,4}/g,"");
				title = a + b;
			}
			title = titleCase(title);
		} else if (title.match(/\[domain\]/gi)) {
			// TODO: incomplete
		}
		url = url.replace("+","");
		var temps = {
		  markdown: (dm,ttl) => {
			return ttl ? `[${dm} | ${ttl}](${url})` : `[${dm}](${url})`;
		  },
		  button: (dm,ttl) => {
			var sub = ` | ${ttl} ` || "";
		  	return `<div>${dm}${sub}<button onclick='${url}'>go</button></div>`;
		  }
		};
		return temps[type](domain,title);
	  }
	  return url;
	}

function createButton(title,url) {
	title = titleCase(title);
	var btn = `<button onclick="window.open('${url}','jk_link')">${title}</button>`;
	return btn;
}

function extractor(pattSet,text) {
  //var text = inputCopies.value;
  //var lines = text.split(/\n/g);
  var patts = patterns[pattSet];
  var run = (text,patts) => {
	for (var p in patts) {
		let patt = patts[p];
		text = text.replace(patt[0],patt[1]);
	}
	return text;
  };
  return run(text,patts);
}
  
/***** LISTENERS *****/

function setListeners() {
  //var elems = document.getElementsByTagName("input");
  var elems = document.getElementsByClassName("search");
  var field = document.getElementById("inputCopies");
  var copyFields = document.getElementsByClassName("copy_text");
  for (var ea in elems) {
   // if (Object.prototype.toString.call(elems[ea]) === "[object HTMLInputElement]") {
	  if (elems[ea].id) {
		var elem = elems[ea];
		//console.log(elem.id);
		elem.addEventListener("keypress", (e) => {
		  if (e.key === "Enter") {
			var elem = document.activeElement;
			srch(elem);
		  }
		});
	  }
	//}
  }
  field.addEventListener("keyup", (e) => {
	var len = e.target.value.length;
	if (len === 0) {
	  len = "";
	}
	counter.innerText = len;
  });
  field.addEventListener("keypress", (e) => {
	counter.innerText = e.target.value.length;
	if (e.key === "Enter" && e.shiftKey) {
	  e.preventDefault();
	  var elem = e.target;
	  if (elem.value.match(/^@/)) {
		fixQueues(elem);
	   // try{fixVTO(elem);}catch(err){alert(err.message)}
		simpleCopy(elem);
		elem.value = "copied!";
		setTimeout(() => {elem.value = ""},3000);
	  } else if (elem.value.match(/^!/)) { // commands
		commands(elem);
	  } else {
		inputCopyItems(elem);
	  }
	}
  });
  document.addEventListener("click", (e) => {
	if (e.ctrlKey || e.metaKey) { 
		var p = e.target.parentNode;
		while (!p.classList.contains("chkbx-unit")) {
			p = p.parentNode;
		}
		p.remove();
	}
  });
  document.addEventListener("change", (e) => {
		//if (e.target.id === "date") {
			if (e.target.value === "%today") {
			  e.target.value = new Date().toLocaleDateString();
			} else if (e.target.value === "%now") {
			  e.target.value = new Date().toLocaleString();
			}
		//}
  });
 /* document.addEventListener("focus", (e) => {
	  alert("focus: "+e.target.id);
	  db.currentElem = e.target;
  });*/
  for (var t in copyFields) {
	if (copyFields[t].id) {
	  copyFields[t].addEventListener("keyup", (e) => {
		var elem = e.target;
		copies[copies.currentSet][elem.id] = elem.innerHTML;
	  });
	}
  }
}

setTimeout(setListeners, 3000);

setTimeout(() => { 
    loadCopies().then((copySet) => { 
		setCopyItems(copies[copies.currentSet], true);
		fillTemplateListener();
	});
}, 2000);
