var db = {
    stmts: {
      idHeader: "dateOccur",
      ids: [],
      order: ["owner","dateOccur","from","to","amount","type","dueDate","payDate","link"]
    },
    "export": {
      idHeader: "TicketNumber",
      ids: [],
      order: [
          "TicketNumber", 
          "WorkStartDate", 
          "Search_EnteredStreetAddress", 
          "Search_PlaceName", 
          "TicketNumberStats_AllResponsesReceived", 
          "IsWorkComplete", 
          "Status"
      ],
      show: (rec) => {
          if (rec["IsWorkComplete"] === "No") {
              if (rec["TicketNumberStats_AllResponsesReceived"] === "Yes"
                || rec["TicketNumberStats_AllResponsesReceived"] === "No" && new Date(rec["WorkStartDate"]) < new Date()) {
                  return true;
              }
          }
          return false;
      }
    },
    invoice: {
      idHeader: "RequestID",
      ids: [],
      order: [
        "RequestID",
        "ATT Invoice Amount",
        "Address",
        "Held Order",
        "Bid Area"
      ],
      exclude: {"RequestID": []}
    },
    view: {
      idHeader: "WORK_REQUEST_NBR",
      ids: [],
      order: [
        "WORK_REQUEST_NBR",
        "STREET_ADDR",
        "CITY_NM",
        "STATE_CD",
        "DOG",
        "BID_AREA_ID",
        "LOT_NBR"
      ],
      exclude: {"WORK_REQUEST_NBR": []}
    },
    tracked: {}
  };
  
  const patterns = {
      csv: [
          [/".*?"/g,(m) => m.replace(/,/g,"%2C")],
          [/,,+/g,(m) => ",\"\"".repeat(m.length-1)+","],
          [/,(\n|$)/g,`,""$1`]
      ]
  };
  
  const temps = {}; // to keep original template text
  
  function mergeRecChanges() {
      var fields = document.querySelectorAll(".field");
      var recId = db.currentRecId || document.getElementById(db[db.currentFile].idHeader).value;
      var record = db.records[recId];
      for (var fd of fields) { 
          var v = fd.innerText || fd.value;
          if (v !== "") {
             record[fd.id] = v; 
          }
      };
      return record;
  }
  
  function replacer(elem,match) {
    var parent = elem.parentNode;
    if (!parent.original) {
      parent.original = parent.firstChild.innerHTML;
    }
    var text = parent.original;
    parent.firstChild.innerHTML = text.replace(`[${match}]`," "+elem.value.toUpperCase());
  }
  
  function initiateImport(elem) {
      elem.click();
  }
  
  async function importFile(form){
    //var x = document.getElementById("myFile");
    try{
   /* var txt = "";
    if (document.getElementById("results")) {
        results.innerHTML = "";
    }
    if ('files' in x) {
      if (x.files.length == 0) {
        txt = "Select one or more files.";
      } else {
        for (var i = 0; i < x.files.length; i++) {
          txt += "<br><strong>" + (i+1) + ". file</strong><br>";
          db.stmts["stmt"+(i+1)] = {};
          var file = x.files[i];
          var fileName = file.name.split(".")[0];
          if (fileName.match(/^[A-Z]{2}[_-\s]/)) {
              fileName = fileName.split(/[_-\s]/g)[1];
          }
          db.currentFile = fileName;
          if ('name' in file) {
            txt += "name: " + file.name + "<br>";
          }
          if ('size' in file) {
            if (file.size > 500000) {
                load.loading.stop();
                alert("Warning: File is too large. Aborting operation.");
                return;
            }
            txt += "size: " + file.size + " bytes <br>";
          }*/
          var file = document.getElementById("myFile").files[0];
          var text = await file.text();
          if (file.type.match("csv")) {
            var splits = text.split(/\n/g); //parseCSV(text,true);
            var obj = {};
            form.currentFile.ids = [];
            splits.forEach((ea) => {
              var sp = ea.split(/,/g);
              var k = sp[0];
              var v = sp[1];
              obj[k] = v;
              form.currentFile.ids.push(k);
              form.lines = obj;
            });
          } else if (file.type.match("json")) {
            f2210.loadJSON(text);
          }
          if (form.currentFile.name !== file.name) {
              form.currentFile.name = file.name;
          }
          f2210.sel("#report").classList.add("hidden");
       // }
     // }
   // } else {
     /* if (x.value == "") {
        txt += "Select one or more files.";
      } else {
        txt += "The files property is not supported by your browser!";
        txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
      }
    } */
    distribute(form);
    recalculate();
    //loadFile.loading.stop();
    } catch (err) {console.log("ERROR! importFiles: "+err.message)}
  }
  
  function miniLoading(elem) {
    try {
    var div = document.createElement("div");
    div.classList.add("mini-load-container");
    elem.loading = {oldContent: elem.innerHTML};
    elem.innerHTML = "";
    elem.appendChild(div);
    elem.loading.started = new Date();
    elem.loading.start = setInterval(() => {
      if (!elem.ct) { elem.ct = 0; }
      var ct = elem.ct;
      if (ct > 2 || ct === 0) {
        elem.ct = 0;
        div.innerHTML = "<lite>•</lite><med>•</med><dark>•</dark>";
      } else if (ct === 1) {
        div.innerHTML = "<dark>•</dark><lite>•</lite><med>•</med>";
      } else if (ct === 2) {
        div.innerHTML = "<med>•</med><dark>•</dark><lite>•</lite>";
      }
      elem.ct++;
      if (new Date() - elem.loading.started >= 30000) {
        elem.loading.stop();
      }
    },
    200);
    elem.loading.stop = () => {
      clearInterval(elem.loading.start);
      elem.innerHTML = elem.loading.oldContent;
      delete elem.loading;
      //div.outerHTML = "";
    }
    } catch(err) {console.log("ERROR, miniLoading: "+err.message)}
    return elem;
  }

  function saveForm(form) {
    /*if (confirm("Copy to clipboard instead of exporting?")) {
      var data = form.fields;
      var rows = [];
      for (var sel in data) {
        var value = data[sel];
        rows.push([sel,value])
      }
      navigator.clipboard.writeText(rows.join("\n"));
    } else {*/
      //exportToCsv(rows);
      exportJSON(form);
    //}
  }
  
  function exportToCsv(form) {
  // https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
      var fileName = form.currentFile.name;
      var rows = form.lines;
      var processRow = function (row) {
          var finalVal = '';
          for (var j = 0; j < row.length; j++) {
              var innerValue = row[j] === null ? '' : row[j].toString();
              if (row[j] instanceof Date) {
                  innerValue = row[j].toLocaleString();
              };
              var result = innerValue.replace(/"/g, '""');
              if (result.search(/("|,|\n)/g) >= 0)
                  result = '"' + result + '"';
              if (j > 0)
                  finalVal += ',';
              finalVal += result;
          }
          return finalVal + '\n';
      };
      var csvFile = '';
      if (Array.isArray(rows)) {
          for (var i = 0; i < rows.length; i++) {
              csvFile += processRow(rows[i]);
          }
      } else {
          csvFile = stringifyCSV(rows,true);
      }
      var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
      // var blob = new Blob([JSON.stringify(obj, null, 2)], {type: "application/json"});
      if (navigator.msSaveBlob) { // IE 10+
          navigator.msSaveBlob(blob, fileName);
      } else {
          var link = document.createElement("a");
          if (link.download !== undefined) { // feature detection
              // Browsers that support HTML5 download attribute
              var url = URL.createObjectURL(blob);
              link.setAttribute("href", url);
              link.setAttribute("download", fileName);
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          }
      }
  }

  function exportJSON(form) {
    // https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
        var fileName = form.currentFile.name;
        var rows = form.lines;
        var blob = new Blob([JSON.stringify(rows, null, 2)], {type: "application/json"});
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, fileName);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
  
  // parseCSV is in HTML pane due to "infinite loop" error
  
  
  function stringifyCSV(obj,hasHeaders) { // to save as CSV
      var str = "";
      var csv = [];
      if (hasHeaders) {
        var headers = obj.headers;
        delete obj.headers;
      } else {
        var fileName = form.currentFile.name;
        var headers = form.currentFile.ids;
      }
      csv.push(headers.join(","));
      for (var r in obj) {
          var record = obj[r];
          var row = [];
          for (var h in headers) {
            var hdr = headers[h];
            var text = record[hdr];
            if (text.match(/,/g)) {
                text = "\""+text+"\"";
            }
            row.push(text);
          }
          csv.push(row.join(","));
      }
      str = csv.join("\n");
      return str;
  }
  
  function extractor(pattSet,text) {
    //var text = inputCopies.value;
    //var lines = text.split(/\n/g);
    var patts = patterns[pattSet];
    var run = (text,patts) => {
      for (var p in patts) {
          let patt = patts[p];
          if (typeof patt[1] === "function") {
            var ms = text.match(patt[0]);
            for (var i in ms) {
              text = text.replace(ms[i],patt[1](ms[i]));
            }
          } else {
            text = text.replace(patt[0],patt[1]);
          }
      }
      return text;
    };
    return run(text,patts);
  }
  
  function searchRecId(e) {
    if (typeof e === "string") {
      var recId = e;
    } else {
      var recId = e.target.value.trim();
    }
    db.currentRecId = recId;
    let fileName = db.currentFile;
    if (!fileName || recId === "") { return }
    if ((document.getElementById(db[fileName].idHeader)
      && document.getElementById(db[fileName].idHeader).value === recId)) {
          return;
      }
    if (document.getElementById("results")) {
        document.getElementById("results").remove();
    }
    //console.log("db.records = "+JSON.stringify(db.records))
    if (!db.records[recId]) {
        var alrt = document.createElement("span");
        alrt.innerHTML = "Not found!";
        e.target.parentNode.appendChild(alrt);
        setTimeout(() => {alrt.outerHTML = ""},5000);
        return;
    }
    var show = db[fileName].order;
    var numItems = Math.ceil(show.length/2);
    var idHeader = db[fileName].idHeader;
   // console.log("Showing '"+fileName+"' headers.");
    var record = db.records[recId];
    //console.log("Searching db.records["+recId+"]");
    var div = document.createElement("div");
    div.id = "results";
    var container1 = document.createElement("div");
    var container2 = document.createElement("div");
    //container.classList.add(".grid-container");
    container1.id = "grid-container1";
    container2.id = "grid-container2";
    if (db.currentFile.match(/locates/i)) { // TODO: move file-specific code into db object
      if (db[fileName].exclude[idHeader].includes(record["WORK_REQUEST_NBR"])) {
        //var alrt = document.createElement("span");
        let addr = record["STREET_ADDR"];
        //alrt.innerHTML = `WO for ${addr} does not need locating at this time!`;
        var resp = confirm(`WO for ${addr} does not need locating at this time!\nProceed anyway?`);
        if (!resp) {
          return;
        }
        //e.target.parentNode.appendChild(alrt);
        //setTimeout(() => {alrt.outerHTML = ""},10000);
      }
      var btnLabel = document.createElement("span");
      btnLabel.innerHTML = "Look up:";
      var mapLink = document.createElement("button");
      mapLink.innerHTML = "Address >";
      mapLink.classList.add("clickable");
      var coord = document.createElement("button");
      coord.innerHTML = "Coordinates >";
      coord.classList.add("clickable");
      var fixText = document.createElement("input");
      fixText.placeholder = "Shorten coordinates...";
      fixText.addEventListener("blur", (e) => {
          let text = e.target.value.replace(/(-*[0-9]+\.[0-9]{5})[0-9]+/g,"$1");
          e.target.value = text;
          if (div0) {
              div0.innerText = div0.innerText
              .replace(/(, ADDRESS.*MAPS: *|)\n*-*[0-9]{2}\.[0-9]{5}, *-*[0-9]{2}\.[0-9]{5}$/g,"")
              +", ADDRESS NOT FOUND IN SYSTEM, NEW SUBDIVISION, COORDINATES OF ADDRESS GIVEN BY GOOGLE MAPS: "+text
          }
          try {navigator.clipboard.writeText(text);} catch(err) {alert(err.message)} 
      });
      fixText.addEventListener("keydown",(e) => {
          if (e.key === "Enter") {
              e.preventDefault();
              e.target.blur();
          }
      })
      var desc = document.createElement("div");
     // desc.classList.add("copy-item");
      desc.id = "copy-items";
    }
    var submit = document.createElement("button");
    submit.innerHTML = "submit";
    if (db.currentFile === "locates") { // TODO: should be loaded in from '-db' file
      var gmUrl = "https://www.google.com/maps/place/";
      mapLink.addEventListener("click",(e) => {
          let mapUrl = gmUrl
          + document.getElementById("STREET_ADDR").value.replace(/\s/g,"+")
          + "+" + document.getElementById("CITY_NM").value
          + "+" + document.getElementById("STATE_CD").value
          + "+" + document.getElementById("ZIP_CD").value;
          //mapLink.href = mapUrl;
          window.open(mapUrl,"wb_maps") 
      }); 
          if (record["LATITUDE"] !== "" && record["LONGITUDE"] !== "") {
              let coordUrl = gmUrl 
              + record["LATITUDE"] 
              + "+" + record["LONGITUDE"];
              coord.classList.remove("disabled");
              coord.addEventListener("click",(e) => { window.open(coordUrl,"wb_maps") });
          } else {
              coord.classList.add("disabled");
          }
    }
    for (var h in show) {
        let hdr = show[h];
        //let tr = document.createElement("div");
        let lbl = document.createElement("div");
        lbl.innerHTML = hdr;
        lbl.classList.add("label");
        let data = document.createElement("div");
        let info = document.createElement("textarea");
        info.id = hdr;
        info.classList.add("field");
        info.innerHTML = record[hdr];
        let tool = document.createElement("div");
        let box = document.createElement("input");
        box.type = "checkbox";
        box.id = hdr+"_box";
        if (db.tracked[hdr] && db.tracked[hdr] === info.innerHTML) {
            box.checked = true;
            info.classList.add("highlight");
        } else {
            box.checked = false;
            info.classList.remove("highlight");
        }
        box.addEventListener("change",(e) => {
          if (e.target.checked) {
              let elem = document.getElementById(hdr);
              db.tracked[hdr] = elem.value;
              info.classList.add("highlight");
          } else if (!e.target.checked) {
              let elem = document.getElementById(hdr);
              delete db.tracked[hdr];
              elem.classList.remove("highlight");
          }
        });
        data.appendChild(info);
        tool.appendChild(box);
        if ((parseInt(h)+1) <= parseInt(numItems)) {
          //console.log((parseInt(h)+1)+" <= "+numItems+": "+show[h]);
          container1.appendChild(lbl);
          container1.appendChild(data);
          container1.appendChild(tool);
        } else  {
          //console.log((parseInt(h)+1)+" > "+numItems+": "+show[h]);
          container2.appendChild(lbl);
          container2.appendChild(data);
          container2.appendChild(tool);
        }
        //table.appendChild(tr);
    }
    if (db.currentFile === "locates") {
      div.appendChild(btnLabel);
      div.appendChild(mapLink);
      div.appendChild(coord);
      div.appendChild(desc);
      div.appendChild(fixText);
    }
    var wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    wrapper.appendChild(container1);
    wrapper.appendChild(container2);
    div.appendChild(wrapper);
    if (typeof e !== "string") {
      e.target.parentNode.appendChild(div);
      e.target.value = "";
    } else {
      document.body.appendChild(div);
    }
    if (db.currentFile === "locates") { // TODO: move file-specific code into db object
      var state = record["STATE_CD"];
      //desc.innerHTML = db.locates.byState[state](record);
      if (!db.locates.byState[state]) {
          state = "ANY";
      }
      var items = [db.locates.byState[state](record)];
      setCopyItems(items, true);
      //setCopyItems([db.locates.byState[db.records[recId]["STATE_CD"]](db.records[recId])], true)
    }
  }
  
  function addLine(id) {
      var id1 = id.split("_")[0];
      var id2 = id.split("_")[1];
      var data = db.stmts[id1][id2];
      var order = db.stmts.order;
      if (!document.getElementById("overlay")) {
          var o = document.createElement("DIV");
          o.id = "overlay";
          o.onclick = (e) => {
              if (e.target.id === "overlay") {
                overlay.style.display = "none";
                dialog.innerHTML = "";
              }
          }
          var d = document.createElement("DIV");
          d.id = "dialog";
          document.body.appendChild(o);
          o.appendChild(d);
      } 
      var wrapper = document.createElement("DIV");
      var fields = document.createElement("DIV");
      var btns = document.createElement("DIV");
      wrapper.classList.add("block-wrapper");
      fields.classList.add("fields");
      btns.classList.add("buttons");
      d.appendChild(wrapper);
      wrapper.appendChild(fields);
      wrapper.appendChild(btns);
      for (var dt in order) {
          var fld = order[dt];
          var elem = document.createElement("INPUT");
          elem.value = data[fld];
          elem.placeholder = fld;
          elem.id = "field"+(dt+1);
          fields.appendChild(elem);
      }
      var submit = document.createElement("button");
      submit.innerHTML = "submit";
      submit.onclick = (e) => {submitForm(id)};
      d.onkeyup = (e) => {
        if (e.key === "Enter") {
            submitForm(id);
        }
      }
      btns.appendChild(submit);
      overlay.style.display = "flex";
  }
  
  function showAll() {
      if (document.getElementById("grid-container")) {
          var grid = document.getElementById("grid-container");
          grid.outerHTML = "";
          return;
      }	else { 
          var grid = document.createElement("div");
          grid.id = "grid-container";
      }
      var records = db.records;
      var currFile = db.currentFile;
      var idHeader = db[currFile].idHeader;
      var headers = db[currFile].order;
      var truth = () => true; // to return true if 'show' is undefined
      let show = db[currFile].show || truth;
      grid.classList.add("col"+headers.length);
      for (var h in headers) { 
          var cell = document.createElement("div");
          cell.innerHTML = headers[h];
          grid.appendChild(cell);
      }
      for (var r in records) {
          var rec = records[r];
          if (show(rec)) { 
              for (var c in rec) {
                  var cell = document.createElement("div");
                  cell.innerHTML = rec[c];
                  if (r !== "headers") {
                      grid.appendChild(cell);
                  }
              } 
          } 
      }
      document.body.appendChild(grid);
  }
  
  function showDB() {
      var text = JSON.stringify(db);
      text = text.replace(/\[(?=[^\n])/g,"[\n")
          .replace(/\](?=[^\n,])/g,"\n]\n")
          .replace(/\{(?=[^\n])/g,"{\n")
          .replace(/\}(?=[^\n])/g,"\n}\n")
          .replace(/\n(?=,)/g,"")
          .replace(/,(?=[^\n])/g,",\n")
          .replace(/:(?=[^\s])/g,": ");
      var lines = text.split(/\n/g);
      var ct = 0;
      var result = [];
      for (var ln in lines) {
          var line = lines[ln];
          var add = "<s></s>";
          //var add = "--";
          for (var num = ct; num > 0; num--) {
              line = add + line;
          }
          result.push(line);
          if (line.match(/[\[\{]$/g)) {
              ct++;
          } else if (line.match(/(\],*|\},*)/g)) {
              ct--;	
          }
      }
      text = result.join("<br>");
      var overlay = document.createElement("div");
      overlay.id = "overlay";
      var dialog = document.createElement("div");
      dialog.id = "dialog";
      var wrapper = document.createElement("DIV");
      wrapper.classList.add("text-wrapper");
      wrapper.classList.add("code"); 
      wrapper.innerHTML = text;
      dialog.appendChild(wrapper);
      overlay.appendChild(dialog);
      document.addEventListener("click", (e) => { if (e.target === overlay) { overlay.remove()}})
      document.body.appendChild(overlay);
  }
  
  /***** COPY ITEMS *****/
  
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
      var id = elem.id;
    }
    elem.outerHTML = "";
    //delete copies[copies.currentSet][id];
    //saveCopies();
  }
  
  function setCopyItems(items, clear) {
    //var cset = copies.currentSet;
    if (clear) {
      document.getElementById("copy-items").innerHTML = "";
      //copies[cset] = {};
    }
   /* if (Object.keys(copies[cset]).length === 0) {
      var ct = 1;
    } else {
      var ct = Object.keys(copies[cset]).length + 1;
    }*/
    for (var i in items) {
      var text = items[i];
      var id = `div${i}`;
      //console.log(id);
      text = appendInputs(id,text);
      var div = `<div id="border_${id}" class="copy_border" onclick="decorCopy('${id}')">
          <div id="warn_${id}" class="copy_control"><span id="btn_copy_${id}" class="copy_btn warn" onclick="decorCopy('${id}')">copy</span><span id="btn_close_${id}" class="copy_btn" onclick="decorClose('${id}')">&#10005;</span></div>
          <p id="text_${id}">${text}</p>
        </div>`;
      var currText = document.getElementById("copy-items").innerHTML;
      document.getElementById("copy-items").innerHTML = div + currText; // add new items to top
  //	copies[cset][id] = items[i];
      //ct++;
    }
    //saveCopies();
  }
  
  function inputCopyItem(elem) {
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
  
  function appendInputs(txtId,text) {
    /*  if (!document.getElementById("copy-items")) {
        document.getElementById("copy-items").temps = {};
        var temps = document.getElementById("copy-items").temps;
      }*/
    temps[txtId] = {text: text};
    var txt = `<div id="${txtId}" class="copy_text" contenteditable="true">${text}</div>`;
    var matches = txt.match(/\[[^\n\r\v\]]+\]/g); //.match(/\[[\w\s\d\|-]+\]/g); 
    if (matches) {
      for (var ea in matches) {
        var match = matches[ea];
        var placeholder = match.replace(/[\[\]]*/g, ""); // remove [ ]
        let id = txtId+"_input"+ea; //match.replace(/\|/g,"_").replace(/[\[\]]*/g,""); // .match(/\w/g).join("");
        temps[txtId][id] = match;
        if (match.match(/\|/g)) {
            var splits = match.replace(/[\[\]]/g,"").split("|");
            var label = splits[0];
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
        } else if (match.match(/\.\s\.\s\./g)) {
            var splits = match.replace(/[\[\]]/g,"").split(". . .");
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
          //var input = document.createElement("input");
          //input.id = id;
          //input.placeholder = placeholder;
          //input.addEventListener("keyup", 
          temps[txtId][id].func = function () {
              var value = temps[txtId].text.replace(temps[txtId][id],this.value);
              document.getElementById(txtId).innerHTML = value;
          };
          var html = `<input id="${id}" placeholder="${placeholder}">`; // 8.1.22 can't get anything to work!
          //onkeyup="temps['${txtId}']['${id}'].func()">`; // removed 1.9.22 - onkeyup="try{window.database.update(${id})} catch(err){alert(err.message)}"
          // onkeyup="document.getElementById('${txtId}').innerHTML='${temps[txtId].text}'.replace('${temps[txtId][id]}',this.value)"
        }
        txt = txt + html;
      }
    }
    return txt;
  }
  
  /****** FILL TEMPLATE ******/
  
  function fillTemplate(inputs,parag) {
    var txtId = parag.id;
    var text = temps[txtId].text;
    for (var i in inputs) {
      var input = inputs[i];
      if (typeof input === "object") {
        var key = input.id;
        var value = input.value;
        var tag = input.tagName;
        var repl = temps[txtId][key];
        if (tag === "INPUT") {
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
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") {
        var parent = e.target.parentElement;
        while (parent && !parent.classList.contains("copy_border")) {
          parent = parent.parentElement;
        }
        if (!parent) { return }
        else if (e.target.tagName === "DIV") { decorCopy(e.target.id.split(/_/g)[1]) }
        var parag = parent.getElementsByClassName("copy_text")[0];
        var ins = parent.getElementsByTagName('input');
        var dds = parent.getElementsByTagName('select');
        parag.contentEditable = false;
        var inputs = [];
        for (var n in ins) {
          var elem = ins[n];
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
    }
    target.addEventListener(type,(e) => {
      // run anything here when click is inside target
      if (e.target === target) {
        // only run this if target received the click
        func(e);
      }
    });
  }
  
  /***********/
  
  function shortCuts(e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
      if (e.key === "ArrowRight") {
        //navRecords("next"); // 7.29.22
        navRecords("next",db[db.currentFile].ids,searchRecId,db.currentRecId);
      } else if (e.key === "ArrowLeft") {
        //navRecords("previous"); // 7.29.22
        navRecords("previous",db[db.currentFile].ids,searchRecId,db.currentRecId);
      }
    }
    if (e.ctrlKey && e.key === "/") {
        showAll();
    }
    if (e.ctrlKey && e.key === "`") {
        if (!document.getElementById("overlay")) {
          showDB();
        } else {
          document.getElementById("overlay").remove();
        }
      }
  }
  
  function navRecords(dir,recIds,showFunc,currentRecId) {
      alert("Going to "+dir+" record.")
    if (recIds && recIds.length > 0) {
      var len = recIds.length;
      var i = recIds.indexOf(currentRecId);
      i = parseInt(i);
      if (dir === "next") {
        if (i === 0) {
          i = len;
        }
        var recId = recIds[--i];
        if (typeof recId !== "string") { alert("Warning: typeof recId = "+typeof recId)}
        //console.log("recIds["+i+"] = "+recId);
        showFunc(recId);
      } else if (dir === "previous") {
        if (i === len) {
          i = -1;
        }
        var recId = recIds[++i];
        //console.log("recIds["+i+"] = "+recId);
        showFunc(recId);
      }
    }
  }
  
  function submitForm(id) {
      var id1 = id.split("_")[0];
      var id2 = id.split("_")[1];
      var data = db.stmts[id1][id2];
      var order = db.stmts.order;
      var values = [];
      for (var o in order) {
          var nm = order[o];
          console.log(nm+": "+data[nm]);
          if (data[nm]) {
              values.push(data[nm]);
          }
      }
     // console.log("TEST SUBMISSION: \n"+values.toString());
  
      google.script.run.postToSheet(values,"DailyTracker")
        //  data
          /*{
        owner: bill[headers.indexOf("who")], 
        dateOccur: data.dateOccur, 
        "from": "Chase Bank",
        to: data.name,
        amount: data.amt,
        type: data.type, 
        dueDate: bill[headers.indexOf("dueDate")],
        payDate: getterA1('global!B2'),
        link: values[0][10]
      }*/
    overlay.style.display = "none";
    dialog.innerHTML = "";
  }
  
  window.addEventListener("keydown", shortCuts);
  window.addEventListener("change", (e) => { 
      if (e.target.classList.contains("field")) { db[db.currentFile].load() }
  });
  /*search.addEventListener("blur", searchRecId);
  search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        search.dispatchEvent(new Event("blur"));
    }
  })*/var db = {
    stmts: {
      idHeader: "dateOccur",
      ids: [],
      order: ["owner","dateOccur","from","to","amount","type","dueDate","payDate","link"]
    },
    "export": {
      idHeader: "TicketNumber",
      ids: [],
      order: [
          "TicketNumber", 
          "WorkStartDate", 
          "Search_EnteredStreetAddress", 
          "Search_PlaceName", 
          "TicketNumberStats_AllResponsesReceived", 
          "IsWorkComplete", 
          "Status"
      ],
      show: (rec) => {
          if (rec["IsWorkComplete"] === "No") {
              if (rec["TicketNumberStats_AllResponsesReceived"] === "Yes"
                || rec["TicketNumberStats_AllResponsesReceived"] === "No" && new Date(rec["WorkStartDate"]) < new Date()) {
                  return true;
              }
          }
          return false;
      }
    },
    invoice: {
      idHeader: "RequestID",
      ids: [],
      order: [
        "RequestID",
        "ATT Invoice Amount",
        "Address",
        "Held Order",
        "Bid Area"
      ],
      exclude: {"RequestID": []}
    },
    view: {
      idHeader: "WORK_REQUEST_NBR",
      ids: [],
      order: [
        "WORK_REQUEST_NBR",
        "STREET_ADDR",
        "CITY_NM",
        "STATE_CD",
        "DOG",
        "BID_AREA_ID",
        "LOT_NBR"
      ],
      exclude: {"WORK_REQUEST_NBR": []}
    },
    tracked: {}
  };
  
  const patterns = {
      csv: [
          [/".*?"/g,(m) => m.replace(/,/g,"%2C")],
          [/,,+/g,(m) => ",\"\"".repeat(m.length-1)+","],
          [/,(\n|$)/g,`,""$1`]
      ]
  };
  
  const temps = {}; // to keep original template text
  
  function mergeRecChanges() {
      var fields = document.querySelectorAll(".field");
      var recId = db.currentRecId || document.getElementById(db[db.currentFile].idHeader).value;
      var record = db.records[recId];
      for (var fd of fields) { 
          var v = fd.innerText || fd.value;
          if (v !== "") {
             record[fd.id] = v; 
          }
      };
      return record;
  }
  
  function replacer(elem,match) {
    var parent = elem.parentNode;
    if (!parent.original) {
      parent.original = parent.firstChild.innerHTML;
    }
    var text = parent.original;
    parent.firstChild.innerHTML = text.replace(`[${match}]`," "+elem.value.toUpperCase());
  }
  
  function initiateImport(elem) {
      elem.click();
  }
  
  async function importFile(form){
    //var x = document.getElementById("myFile");
    try{
   /* var txt = "";
    if (document.getElementById("results")) {
        results.innerHTML = "";
    }
    if ('files' in x) {
      if (x.files.length == 0) {
        txt = "Select one or more files.";
      } else {
        for (var i = 0; i < x.files.length; i++) {
          txt += "<br><strong>" + (i+1) + ". file</strong><br>";
          db.stmts["stmt"+(i+1)] = {};
          var file = x.files[i];
          var fileName = file.name.split(".")[0];
          if (fileName.match(/^[A-Z]{2}[_-\s]/)) {
              fileName = fileName.split(/[_-\s]/g)[1];
          }
          db.currentFile = fileName;
          if ('name' in file) {
            txt += "name: " + file.name + "<br>";
          }
          if ('size' in file) {
            if (file.size > 500000) {
                load.loading.stop();
                alert("Warning: File is too large. Aborting operation.");
                return;
            }
            txt += "size: " + file.size + " bytes <br>";
          }*/
          var file = document.getElementById("myFile").files[0];
          var text = await file.text();
          if (file.type.match("csv")) {
            var splits = text.split(/\n/g); //parseCSV(text,true);
            var obj = {};
            form.currentFile.ids = [];
            splits.forEach((ea) => {
              var sp = ea.split(/,/g);
              var k = sp[0];
              var v = sp[1];
              obj[k] = v;
              form.currentFile.ids.push(k);
              form.lines = obj;
            });
          } else if (file.type.match("json")) {
            f2210.loadJSON(text);
          }
          if (form.currentFile.name !== file.name) {
              form.currentFile.name = file.name;
          }
          f2210.sel("#report").classList.add("hidden");
       // }
     // }
   // } else {
     /* if (x.value == "") {
        txt += "Select one or more files.";
      } else {
        txt += "The files property is not supported by your browser!";
        txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
      }
    } */
    distribute(form);
    recalculate();
    //loadFile.loading.stop();
    } catch (err) {console.log("ERROR! importFiles: "+err.message)}
  }
  
  function miniLoading(elem) {
    try {
    var div = document.createElement("div");
    div.classList.add("mini-load-container");
    elem.loading = {oldContent: elem.innerHTML};
    elem.innerHTML = "";
    elem.appendChild(div);
    elem.loading.started = new Date();
    elem.loading.start = setInterval(() => {
      if (!elem.ct) { elem.ct = 0; }
      var ct = elem.ct;
      if (ct > 2 || ct === 0) {
        elem.ct = 0;
        div.innerHTML = "<lite>•</lite><med>•</med><dark>•</dark>";
      } else if (ct === 1) {
        div.innerHTML = "<dark>•</dark><lite>•</lite><med>•</med>";
      } else if (ct === 2) {
        div.innerHTML = "<med>•</med><dark>•</dark><lite>•</lite>";
      }
      elem.ct++;
      if (new Date() - elem.loading.started >= 30000) {
        elem.loading.stop();
      }
    },
    200);
    elem.loading.stop = () => {
      clearInterval(elem.loading.start);
      elem.innerHTML = elem.loading.oldContent;
      delete elem.loading;
      //div.outerHTML = "";
    }
    } catch(err) {console.log("ERROR, miniLoading: "+err.message)}
    return elem;
  }

  function saveForm(form) {
    /*if (confirm("Copy to clipboard instead of exporting?")) {
      var data = form.fields;
      var rows = [];
      for (var sel in data) {
        var value = data[sel];
        rows.push([sel,value])
      }
      navigator.clipboard.writeText(rows.join("\n"));
    } else {*/
      //exportToCsv(rows);
      exportJSON(form);
    //}
  }
  
  function exportToCsv(form) {
  // https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
      var fileName = form.currentFile.name;
      var rows = form.lines;
      var processRow = function (row) {
          var finalVal = '';
          for (var j = 0; j < row.length; j++) {
              var innerValue = row[j] === null ? '' : row[j].toString();
              if (row[j] instanceof Date) {
                  innerValue = row[j].toLocaleString();
              };
              var result = innerValue.replace(/"/g, '""');
              if (result.search(/("|,|\n)/g) >= 0)
                  result = '"' + result + '"';
              if (j > 0)
                  finalVal += ',';
              finalVal += result;
          }
          return finalVal + '\n';
      };
      var csvFile = '';
      if (Array.isArray(rows)) {
          for (var i = 0; i < rows.length; i++) {
              csvFile += processRow(rows[i]);
          }
      } else {
          csvFile = stringifyCSV(rows,true);
      }
      var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
      // var blob = new Blob([JSON.stringify(obj, null, 2)], {type: "application/json"});
      if (navigator.msSaveBlob) { // IE 10+
          navigator.msSaveBlob(blob, fileName);
      } else {
          var link = document.createElement("a");
          if (link.download !== undefined) { // feature detection
              // Browsers that support HTML5 download attribute
              var url = URL.createObjectURL(blob);
              link.setAttribute("href", url);
              link.setAttribute("download", fileName);
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          }
      }
  }

  function exportJSON(form) {
    // https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
        var fileName = form.currentFile.name;
        var rows = form.lines;
        var blob = new Blob([JSON.stringify(rows, null, 2)], {type: "application/json"});
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, fileName);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
  
  // parseCSV is in HTML pane due to "infinite loop" error
  
  
  function stringifyCSV(obj,hasHeaders) { // to save as CSV
      var str = "";
      var csv = [];
      if (hasHeaders) {
        var headers = obj.headers;
        delete obj.headers;
      } else {
        var fileName = form.currentFile.name;
        var headers = form.currentFile.ids;
      }
      csv.push(headers.join(","));
      for (var r in obj) {
          var record = obj[r];
          var row = [];
          for (var h in headers) {
            var hdr = headers[h];
            var text = record[hdr];
            if (text.match(/,/g)) {
                text = "\""+text+"\"";
            }
            row.push(text);
          }
          csv.push(row.join(","));
      }
      str = csv.join("\n");
      return str;
  }
  
  function extractor(pattSet,text) {
    //var text = inputCopies.value;
    //var lines = text.split(/\n/g);
    var patts = patterns[pattSet];
    var run = (text,patts) => {
      for (var p in patts) {
          let patt = patts[p];
          if (typeof patt[1] === "function") {
            var ms = text.match(patt[0]);
            for (var i in ms) {
              text = text.replace(ms[i],patt[1](ms[i]));
            }
          } else {
            text = text.replace(patt[0],patt[1]);
          }
      }
      return text;
    };
    return run(text,patts);
  }
  
  function searchRecId(e) {
    if (typeof e === "string") {
      var recId = e;
    } else {
      var recId = e.target.value.trim();
    }
    db.currentRecId = recId;
    let fileName = db.currentFile;
    if (!fileName || recId === "") { return }
    if ((document.getElementById(db[fileName].idHeader)
      && document.getElementById(db[fileName].idHeader).value === recId)) {
          return;
      }
    if (document.getElementById("results")) {
        document.getElementById("results").remove();
    }
    //console.log("db.records = "+JSON.stringify(db.records))
    if (!db.records[recId]) {
        var alrt = document.createElement("span");
        alrt.innerHTML = "Not found!";
        e.target.parentNode.appendChild(alrt);
        setTimeout(() => {alrt.outerHTML = ""},5000);
        return;
    }
    var show = db[fileName].order;
    var numItems = Math.ceil(show.length/2);
    var idHeader = db[fileName].idHeader;
   // console.log("Showing '"+fileName+"' headers.");
    var record = db.records[recId];
    //console.log("Searching db.records["+recId+"]");
    var div = document.createElement("div");
    div.id = "results";
    var container1 = document.createElement("div");
    var container2 = document.createElement("div");
    //container.classList.add(".grid-container");
    container1.id = "grid-container1";
    container2.id = "grid-container2";
    if (db.currentFile.match(/locates/i)) { // TODO: move file-specific code into db object
      if (db[fileName].exclude[idHeader].includes(record["WORK_REQUEST_NBR"])) {
        //var alrt = document.createElement("span");
        let addr = record["STREET_ADDR"];
        //alrt.innerHTML = `WO for ${addr} does not need locating at this time!`;
        var resp = confirm(`WO for ${addr} does not need locating at this time!\nProceed anyway?`);
        if (!resp) {
          return;
        }
        //e.target.parentNode.appendChild(alrt);
        //setTimeout(() => {alrt.outerHTML = ""},10000);
      }
      var btnLabel = document.createElement("span");
      btnLabel.innerHTML = "Look up:";
      var mapLink = document.createElement("button");
      mapLink.innerHTML = "Address >";
      mapLink.classList.add("clickable");
      var coord = document.createElement("button");
      coord.innerHTML = "Coordinates >";
      coord.classList.add("clickable");
      var fixText = document.createElement("input");
      fixText.placeholder = "Shorten coordinates...";
      fixText.addEventListener("blur", (e) => {
          let text = e.target.value.replace(/(-*[0-9]+\.[0-9]{5})[0-9]+/g,"$1");
          e.target.value = text;
          if (div0) {
              div0.innerText = div0.innerText
              .replace(/(, ADDRESS.*MAPS: *|)\n*-*[0-9]{2}\.[0-9]{5}, *-*[0-9]{2}\.[0-9]{5}$/g,"")
              +", ADDRESS NOT FOUND IN SYSTEM, NEW SUBDIVISION, COORDINATES OF ADDRESS GIVEN BY GOOGLE MAPS: "+text
          }
          try {navigator.clipboard.writeText(text);} catch(err) {alert(err.message)} 
      });
      fixText.addEventListener("keydown",(e) => {
          if (e.key === "Enter") {
              e.preventDefault();
              e.target.blur();
          }
      })
      var desc = document.createElement("div");
     // desc.classList.add("copy-item");
      desc.id = "copy-items";
    }
    var submit = document.createElement("button");
    submit.innerHTML = "submit";
    if (db.currentFile === "locates") { // TODO: should be loaded in from '-db' file
      var gmUrl = "https://www.google.com/maps/place/";
      mapLink.addEventListener("click",(e) => {
          let mapUrl = gmUrl
          + document.getElementById("STREET_ADDR").value.replace(/\s/g,"+")
          + "+" + document.getElementById("CITY_NM").value
          + "+" + document.getElementById("STATE_CD").value
          + "+" + document.getElementById("ZIP_CD").value;
          //mapLink.href = mapUrl;
          window.open(mapUrl,"wb_maps") 
      }); 
          if (record["LATITUDE"] !== "" && record["LONGITUDE"] !== "") {
              let coordUrl = gmUrl 
              + record["LATITUDE"] 
              + "+" + record["LONGITUDE"];
              coord.classList.remove("disabled");
              coord.addEventListener("click",(e) => { window.open(coordUrl,"wb_maps") });
          } else {
              coord.classList.add("disabled");
          }
    }
    for (var h in show) {
        let hdr = show[h];
        //let tr = document.createElement("div");
        let lbl = document.createElement("div");
        lbl.innerHTML = hdr;
        lbl.classList.add("label");
        let data = document.createElement("div");
        let info = document.createElement("textarea");
        info.id = hdr;
        info.classList.add("field");
        info.innerHTML = record[hdr];
        let tool = document.createElement("div");
        let box = document.createElement("input");
        box.type = "checkbox";
        box.id = hdr+"_box";
        if (db.tracked[hdr] && db.tracked[hdr] === info.innerHTML) {
            box.checked = true;
            info.classList.add("highlight");
        } else {
            box.checked = false;
            info.classList.remove("highlight");
        }
        box.addEventListener("change",(e) => {
          if (e.target.checked) {
              let elem = document.getElementById(hdr);
              db.tracked[hdr] = elem.value;
              info.classList.add("highlight");
          } else if (!e.target.checked) {
              let elem = document.getElementById(hdr);
              delete db.tracked[hdr];
              elem.classList.remove("highlight");
          }
        });
        data.appendChild(info);
        tool.appendChild(box);
        if ((parseInt(h)+1) <= parseInt(numItems)) {
          //console.log((parseInt(h)+1)+" <= "+numItems+": "+show[h]);
          container1.appendChild(lbl);
          container1.appendChild(data);
          container1.appendChild(tool);
        } else  {
          //console.log((parseInt(h)+1)+" > "+numItems+": "+show[h]);
          container2.appendChild(lbl);
          container2.appendChild(data);
          container2.appendChild(tool);
        }
        //table.appendChild(tr);
    }
    if (db.currentFile === "locates") {
      div.appendChild(btnLabel);
      div.appendChild(mapLink);
      div.appendChild(coord);
      div.appendChild(desc);
      div.appendChild(fixText);
    }
    var wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    wrapper.appendChild(container1);
    wrapper.appendChild(container2);
    div.appendChild(wrapper);
    if (typeof e !== "string") {
      e.target.parentNode.appendChild(div);
      e.target.value = "";
    } else {
      document.body.appendChild(div);
    }
    if (db.currentFile === "locates") { // TODO: move file-specific code into db object
      var state = record["STATE_CD"];
      //desc.innerHTML = db.locates.byState[state](record);
      if (!db.locates.byState[state]) {
          state = "ANY";
      }
      var items = [db.locates.byState[state](record)];
      setCopyItems(items, true);
      //setCopyItems([db.locates.byState[db.records[recId]["STATE_CD"]](db.records[recId])], true)
    }
  }
  
  function addLine(id) {
      var id1 = id.split("_")[0];
      var id2 = id.split("_")[1];
      var data = db.stmts[id1][id2];
      var order = db.stmts.order;
      if (!document.getElementById("overlay")) {
          var o = document.createElement("DIV");
          o.id = "overlay";
          o.onclick = (e) => {
              if (e.target.id === "overlay") {
                overlay.style.display = "none";
                dialog.innerHTML = "";
              }
          }
          var d = document.createElement("DIV");
          d.id = "dialog";
          document.body.appendChild(o);
          o.appendChild(d);
      } 
      var wrapper = document.createElement("DIV");
      var fields = document.createElement("DIV");
      var btns = document.createElement("DIV");
      wrapper.classList.add("block-wrapper");
      fields.classList.add("fields");
      btns.classList.add("buttons");
      d.appendChild(wrapper);
      wrapper.appendChild(fields);
      wrapper.appendChild(btns);
      for (var dt in order) {
          var fld = order[dt];
          var elem = document.createElement("INPUT");
          elem.value = data[fld];
          elem.placeholder = fld;
          elem.id = "field"+(dt+1);
          fields.appendChild(elem);
      }
      var submit = document.createElement("button");
      submit.innerHTML = "submit";
      submit.onclick = (e) => {submitForm(id)};
      d.onkeyup = (e) => {
        if (e.key === "Enter") {
            submitForm(id);
        }
      }
      btns.appendChild(submit);
      overlay.style.display = "flex";
  }
  
  function showAll() {
      if (document.getElementById("grid-container")) {
          var grid = document.getElementById("grid-container");
          grid.outerHTML = "";
          return;
      }	else { 
          var grid = document.createElement("div");
          grid.id = "grid-container";
      }
      var records = db.records;
      var currFile = db.currentFile;
      var idHeader = db[currFile].idHeader;
      var headers = db[currFile].order;
      var truth = () => true; // to return true if 'show' is undefined
      let show = db[currFile].show || truth;
      grid.classList.add("col"+headers.length);
      for (var h in headers) { 
          var cell = document.createElement("div");
          cell.innerHTML = headers[h];
          grid.appendChild(cell);
      }
      for (var r in records) {
          var rec = records[r];
          if (show(rec)) { 
              for (var c in rec) {
                  var cell = document.createElement("div");
                  cell.innerHTML = rec[c];
                  if (r !== "headers") {
                      grid.appendChild(cell);
                  }
              } 
          } 
      }
      document.body.appendChild(grid);
  }
  
  function showDB() {
      var text = JSON.stringify(db);
      text = text.replace(/\[(?=[^\n])/g,"[\n")
          .replace(/\](?=[^\n,])/g,"\n]\n")
          .replace(/\{(?=[^\n])/g,"{\n")
          .replace(/\}(?=[^\n])/g,"\n}\n")
          .replace(/\n(?=,)/g,"")
          .replace(/,(?=[^\n])/g,",\n")
          .replace(/:(?=[^\s])/g,": ");
      var lines = text.split(/\n/g);
      var ct = 0;
      var result = [];
      for (var ln in lines) {
          var line = lines[ln];
          var add = "<s></s>";
          //var add = "--";
          for (var num = ct; num > 0; num--) {
              line = add + line;
          }
          result.push(line);
          if (line.match(/[\[\{]$/g)) {
              ct++;
          } else if (line.match(/(\],*|\},*)/g)) {
              ct--;	
          }
      }
      text = result.join("<br>");
      var overlay = document.createElement("div");
      overlay.id = "overlay";
      var dialog = document.createElement("div");
      dialog.id = "dialog";
      var wrapper = document.createElement("DIV");
      wrapper.classList.add("text-wrapper");
      wrapper.classList.add("code"); 
      wrapper.innerHTML = text;
      dialog.appendChild(wrapper);
      overlay.appendChild(dialog);
      document.addEventListener("click", (e) => { if (e.target === overlay) { overlay.remove()}})
      document.body.appendChild(overlay);
  }
  
  /***** COPY ITEMS *****/
  
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
      var id = elem.id;
    }
    elem.outerHTML = "";
    //delete copies[copies.currentSet][id];
    //saveCopies();
  }
  
  function setCopyItems(items, clear) {
    //var cset = copies.currentSet;
    if (clear) {
      document.getElementById("copy-items").innerHTML = "";
      //copies[cset] = {};
    }
   /* if (Object.keys(copies[cset]).length === 0) {
      var ct = 1;
    } else {
      var ct = Object.keys(copies[cset]).length + 1;
    }*/
    for (var i in items) {
      var text = items[i];
      var id = `div${i}`;
      //console.log(id);
      text = appendInputs(id,text);
      var div = `<div id="border_${id}" class="copy_border" onclick="decorCopy('${id}')">
          <div id="warn_${id}" class="copy_control"><span id="btn_copy_${id}" class="copy_btn warn" onclick="decorCopy('${id}')">copy</span><span id="btn_close_${id}" class="copy_btn" onclick="decorClose('${id}')">&#10005;</span></div>
          <p id="text_${id}">${text}</p>
        </div>`;
      var currText = document.getElementById("copy-items").innerHTML;
      document.getElementById("copy-items").innerHTML = div + currText; // add new items to top
  //	copies[cset][id] = items[i];
      //ct++;
    }
    //saveCopies();
  }
  
  function inputCopyItem(elem) {
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
  
  function appendInputs(txtId,text) {
    /*  if (!document.getElementById("copy-items")) {
        document.getElementById("copy-items").temps = {};
        var temps = document.getElementById("copy-items").temps;
      }*/
    temps[txtId] = {text: text};
    var txt = `<div id="${txtId}" class="copy_text" contenteditable="true">${text}</div>`;
    var matches = txt.match(/\[[^\n\r\v\]]+\]/g); //.match(/\[[\w\s\d\|-]+\]/g); 
    if (matches) {
      for (var ea in matches) {
        var match = matches[ea];
        var placeholder = match.replace(/[\[\]]*/g, ""); // remove [ ]
        let id = txtId+"_input"+ea; //match.replace(/\|/g,"_").replace(/[\[\]]*/g,""); // .match(/\w/g).join("");
        temps[txtId][id] = match;
        if (match.match(/\|/g)) {
            var splits = match.replace(/[\[\]]/g,"").split("|");
            var label = splits[0];
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
        } else if (match.match(/\.\s\.\s\./g)) {
            var splits = match.replace(/[\[\]]/g,"").split(". . .");
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
          //var input = document.createElement("input");
          //input.id = id;
          //input.placeholder = placeholder;
          //input.addEventListener("keyup", 
          temps[txtId][id].func = function () {
              var value = temps[txtId].text.replace(temps[txtId][id],this.value);
              document.getElementById(txtId).innerHTML = value;
          };
          var html = `<input id="${id}" placeholder="${placeholder}">`; // 8.1.22 can't get anything to work!
          //onkeyup="temps['${txtId}']['${id}'].func()">`; // removed 1.9.22 - onkeyup="try{window.database.update(${id})} catch(err){alert(err.message)}"
          // onkeyup="document.getElementById('${txtId}').innerHTML='${temps[txtId].text}'.replace('${temps[txtId][id]}',this.value)"
        }
        txt = txt + html;
      }
    }
    return txt;
  }
  
  /****** FILL TEMPLATE ******/
  
  function fillTemplate(inputs,parag) {
    var txtId = parag.id;
    var text = temps[txtId].text;
    for (var i in inputs) {
      var input = inputs[i];
      if (typeof input === "object") {
        var key = input.id;
        var value = input.value;
        var tag = input.tagName;
        var repl = temps[txtId][key];
        if (tag === "INPUT") {
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
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") {
        var parent = e.target.parentElement;
        while (parent && !parent.classList.contains("copy_border")) {
          parent = parent.parentElement;
        }
        if (!parent) { return }
        else if (e.target.tagName === "DIV") { decorCopy(e.target.id.split(/_/g)[1]) }
        var parag = parent.getElementsByClassName("copy_text")[0];
        var ins = parent.getElementsByTagName('input');
        var dds = parent.getElementsByTagName('select');
        parag.contentEditable = false;
        var inputs = [];
        for (var n in ins) {
          var elem = ins[n];
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
    }
    target.addEventListener(type,(e) => {
      // run anything here when click is inside target
      if (e.target === target) {
        // only run this if target received the click
        func(e);
      }
    });
  }
  
  /***********/
  
  function shortCuts(e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
      if (e.key === "ArrowRight") {
        //navRecords("next"); // 7.29.22
        navRecords("next",db[db.currentFile].ids,searchRecId,db.currentRecId);
      } else if (e.key === "ArrowLeft") {
        //navRecords("previous"); // 7.29.22
        navRecords("previous",db[db.currentFile].ids,searchRecId,db.currentRecId);
      }
    }
    if (e.ctrlKey && e.key === "/") {
        showAll();
    }
    if (e.ctrlKey && e.key === "`") {
        if (!document.getElementById("overlay")) {
          showDB();
        } else {
          document.getElementById("overlay").remove();
        }
      }
  }
  
  function navRecords(dir,recIds,showFunc,currentRecId) {
      alert("Going to "+dir+" record.")
    if (recIds && recIds.length > 0) {
      var len = recIds.length;
      var i = recIds.indexOf(currentRecId);
      i = parseInt(i);
      if (dir === "next") {
        if (i === 0) {
          i = len;
        }
        var recId = recIds[--i];
        if (typeof recId !== "string") { alert("Warning: typeof recId = "+typeof recId)}
        //console.log("recIds["+i+"] = "+recId);
        showFunc(recId);
      } else if (dir === "previous") {
        if (i === len) {
          i = -1;
        }
        var recId = recIds[++i];
        //console.log("recIds["+i+"] = "+recId);
        showFunc(recId);
      }
    }
  }
  
  function submitForm(id) {
      var id1 = id.split("_")[0];
      var id2 = id.split("_")[1];
      var data = db.stmts[id1][id2];
      var order = db.stmts.order;
      var values = [];
      for (var o in order) {
          var nm = order[o];
          console.log(nm+": "+data[nm]);
          if (data[nm]) {
              values.push(data[nm]);
          }
      }
     // console.log("TEST SUBMISSION: \n"+values.toString());
  
      google.script.run.postToSheet(values,"DailyTracker")
        //  data
          /*{
        owner: bill[headers.indexOf("who")], 
        dateOccur: data.dateOccur, 
        "from": "Chase Bank",
        to: data.name,
        amount: data.amt,
        type: data.type, 
        dueDate: bill[headers.indexOf("dueDate")],
        payDate: getterA1('global!B2'),
        link: values[0][10]
      }*/
    overlay.style.display = "none";
    dialog.innerHTML = "";
  }
  
  window.addEventListener("keydown", shortCuts);
  window.addEventListener("change", (e) => { 
      if (e.target.classList.contains("field")) { db[db.currentFile].load() }
  });
  /*search.addEventListener("blur", searchRecId);
  search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        search.dispatchEvent(new Event("blur"));
    }
  })*/
