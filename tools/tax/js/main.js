var db = {
	searchIRS: "site:irs.gov ",
	searchIntuit: "site:ttlc.intuit.com "
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
