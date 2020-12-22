console.log("LinkedIn Workbench 12.22.20");

var connectionsTable = {
	"firstName": "John",
	"lastName": "Smith",
	"profile": "http://www.example.com/in/john-smith/",
	"script": "connectwf_1",
	"srchTxt": "looking for opportunities",
	"srchTxtQ": "I noticed that you are currently in the medical industry. Are you looking for opportunities in that industry, or are you open to others as well?",
   /* "wait1": "10800000",
	"wait2": "86400000",
	"wait3": "259200000",
	
	"startTime": "",
	"invited": "",
	"connected": "",
	"response": "",*/
	
	"lastAction": "12/10/2020 9:00 AM",
	"actionType": "invited",
	"nextAction": "",
	/*[
		"invited", // look for acceptance [and their reply]
	  "accepted", // you can now send msg2
	  "noresponse", // after wait2, no reply to msg2; send msg3
	  "tabled", // after wait3, no reply to msg3; send msg4 (ball's in their court)
	  "connected", // means they replied to msg2/3/4
	  "scheduled"
	],*/
	
	"srchUrl": "https://www.linkedin.com/search/results/people/?facetGeoUrn=%5B%22100061294%22%5D&facetNetwork=%5B%22S%22%2C%22O%22%5D&keywords=looking%20for%20opportunities&origin=FACETED_SEARCH%3Fpage&page=2"
  };
  var scriptTable = [{
	  "iden": "connectwf_1", 
	  "msg1": "Hey {{firstName}}, looking to connect and grow my network. I noticed you were {{srchTxt}} on your profile. I might have something for you.", // note to be included with invite
	  "wait1": "10800000", // [time limit for user response to "accepted"] or ASAP
	  "msg2": "Thanks for the connection. {{srchTxtQ}}<br>We provide financial services and our office is looking for people to work from home anywhere in the U.S. It's 100% online and full training is provided, but you must be able to pass a background check. Would you be interested?", // respond to "accepted" with msg2
	  "wait2": "86400000", // time limit for prospect reply before sending msg3
	  "msg3": "I have a short 7 minute video that gives a quick overview of an opportunity you might be interested in. Would love to hear what your thoughts are!<br>https://bit.ly/3gzEejJ", // sent if no reply to msg2 before wait2
	  "wait3": "259200000", // second try waiting period
	  "msg4": "Hey {{firstName}} wanted to follow up. I know times have been a little challenging for some, but I just wanted to reach out again to let you know I'm here to help if you need anything.", // send if no reply to msg3 before wait3
	  "setAppt": "Hi {{firstName}}! Thanks for getting back to me!<br>When would be a good time for a zoom call? I've got some time available at 1:30 and 3:00 today. Should only take about 30 minutes. What works best for you?", // sent in response to any reply after msg2
	  "moreInfo": "Hi {{firstName}}. No problem!<br>I have a short 7 minute video that gives a quick overview of what we're doing. Would love to hear what your thoughts are!<br>https://bit.ly/3gzEejJ" // if setAppt fails, send more info (might need to add 'waitInfo' or use 'wait3')
  }];

function generateMessage() {
  var object = {nextAction: "", status: "", message: ""};
  var now = new Date().getTime();
  var lastAction = new Date(connectionsTable.lastAction).getTime();
  var actionType = connectionsTable.actionType;
  var status = "";
  var due = now;
  var script = scriptTable[0];
  /*.filter(
	(row) => {
	  if (row[0] === connectionsTable.script) {
		return row;
	  }
	});*/
  var message = "";
  if (!script) { 
	demo.innerText = "Script not found: \""+connectionsTable.script+"\" is not a valid iden.";
	return;
  }
  switch (actionType) {
	case "invited":
	  message = script.msg1;
	  break;
  	case "accepted":
	  due = lastAction + new Date(parseInt(script.wait1)).getTime();
	  if (due <= now) {
		status = "overdue";
	  } 
	  message = script.msg2;
	  break;
	case "noresponse":
	  due = lastAction + new Date(parseInt(script.wait2)).getTime();
	  if (due <= now) {
		status = "overdue";
	  } 
	  message = script.msg3;
	  break;
	case "tabled":
	  due = lastAction + new Date(parseInt(script.wait3)).getTime();
	  if (due <= now) {
		status = "overdue";
	  } 
	  message = script.msg4;
	  break;
  	case "connected":
	  due = lastAction + new Date(parseInt(script.wait2)).getTime();
	  if (due <= now) {
		status = "overdue";
	  } 
	  message = script.setAppt;
	  break;
	case "scheduled":
	  due = lastAction + new Date(parseInt(script.wait2)).getTime();
	  if (due <= now) {
		status = "overdue";
	  } 
	  message = "Good luck!";
	  break;
  	default:
	  message = "Something went wrong.";
	  break;
  }
  var vars = message.match(/\{\{[a-z]+\}\}/gi);
  for (var v in vars) {
	var key = vars[v].replace(/[\{\}]/g, "");
	message = message.replace(vars[v], connectionsTable[key]);
  }
  object.message = message;
  object.nextAction = new Date(due).toLocaleString().replace(",", "");
  object.status = status;
  return object;
}


updateMessage();

/****** */

function makeEdit(parent) {
	var children = parent.children;
	var elems = [children[0],children[1]];
	for (var ea in elems) {
		if (elems[ea].classList.contains("hidden")) {
			elems[ea].classList.remove("hidden");
		} else {
			elems[ea].classList.add("hidden");
		}
	}
}

function updateMessage(field,value) {
  if (!field && !value) {
	field = "actionType";
	value = document.getElementById(field + "_input").value;
  }
  var connTbl = connectionsTable;
  connTbl[field] = value;
  var data = generateMessage();
  document.getElementById("name").innerHTML = connTbl.firstName + " " + connTbl.lastName;
  if (data.status === "overdue") {
	var showAction = "<span style='color: red'><strong>"+data.nextAction+"</strong></span>";
  } else {
	var showAction = data.nextAction;
  }
  profile.innerHTML = connTbl.profile;
  timing.innerHTML = "Next Action: "+showAction;
  updateProfile("nextAction", data.nextAction);
  srchTxtQ.innerHTML = connTbl.srchTxtQ;
  demo.value = data.message.replace(/\<br\>/gi,"\n\n");
}

function updateProfile(key, value) {
	var conn = connectionsTable;
	if (key.match("name")) {
		var names = value.split(" ");
		conn.firstName = names[0];
		conn.lastName = names[1];
	} else {
		conn[key] = value;
	}
	return value;
}

function extractNameUrl(url) {
	if (url.length !== 0) {
	url = url.match(/[a-z]+\-[a-z]+/);
	let nm = url.join("").trim().replace("-"," ");

	// titleCase()
	var except = "in the and with from of is a an or at";
	var str = nm.toLowerCase().split(" ");
	for (var i in str) {
		if (i === 0) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
		} else {
		if (except.match(str[i]) == null) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
		}
		}
	} // end i loop
	let name = str.join(" ");
	//  addName.setValue(name);
	}
    
  name.innerHTML = nm;
  updateProfile("name", nm);
}

function showRawData() {
	if (!raw) {
		var raw = document.createElement("input");
		raw.id = "raw";
		document.body.appendChild(raw);
	}
	var headings = ["profile", "firstName", "lastName", "script", "srchTxt", "srchTxtQ", "lastAction", "nextAction", "actionType", "srchUrl"];
	var data = connectionsTable;
	var output = "";
	for (var ea in headings) {
		var each = headings[ea];
		if (!data[each]) {
			output += "\t";
		} else {
			output += data[each] +"\t";
		}
	}
	raw.value = output;
}
