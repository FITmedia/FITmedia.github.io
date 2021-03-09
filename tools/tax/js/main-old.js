var db = {
	searchIRS: "site:irs.gov ",
	searchIntuit: "site:ttlc.intuit.com ",
        searchUScode: "site:law.cornell.edu/uscode/text/26 ",
        searchUScode: "site:law.cornell.edu/uscode/text/26 "
};

function srch(elem) {
	var id = elem.id;
	var text = db[id];
	var search = text + elem.value;
	var encode = encodeURI(search);
        elem.value = "";
	var url = "https://www.google.com/search?q="+encode;
	window.open(url);
    //location = url;
}

function decorCopy(elem) {
	var border = elem.parentNode;
	var btn = border.getElementsByClassName("copy_btn")[0];
    btn.innerHTML = "copied!";
	btn.classList.add("lite");
    border.classList.add("lite");
    simpleCopy(elem);
    setTimeout(() => {
        btn.innerHTML = "copy";
        btn.classList.remove("lite");
        border.classList.remove("lite");
    }, 2000);
}

function simpleCopy(elem) {
  var active = document.activeElement;
  var text = elem.innerHTML.replace(/<br>/gi,"\n").replace(/<[^>]+>/gi,"");
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

function setListeners() {
    var elems = document.getElementsByTagName("input");
    for (var ea in elems) {
        if (elems[ea].id) {
            elems[ea].addEventListener("keypress",
                (e) => {
                    if (e.key === "Enter") {
                        var elem = document.activeElement;
                        srch(elem);
                    }
                }
            )
        }
    }
}

setTimeout(setListeners, 3000);
