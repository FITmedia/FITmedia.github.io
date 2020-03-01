var checklist = [
  "Customized Letter (Checklist)",
  "Bill (office copy)",
  "Signed Clipboard (Engagement Letter)",
  "Insert Summary Organizer",
  "Sign 8879",
  "Sign 8821",
  "Sign Account Summary",
  "Include 8867",
  "Sign Due Diligence Notes (TP & Sp)",
  "--and Tax Advisor",
  "Pull out Refer-a-Friend",
  "Include Bill (client copy)",
  "Pull out return vouchers"
];

function build(elem){
  for (var i = 0; i < checklist.length; i++) {
    var p = document.createElement("label");
    var item = document.createElement("input");
    var span = document.createElement("span");
    item.type = "checkbox";
    span.innerHTML = checklist[i];
    elem.appendChild(p);
    p.appendChild(item);
    p.appendChild(span);
  }
}

function reset(elem) {
  var items = elem.getElementsByTagName("INPUT");
  var array = [];
  for (var i = 0; i < items.length; i++) {
    array.push(items[i].checked);
    items[i].checked = false;
  } // end for loop
}

build(list);
