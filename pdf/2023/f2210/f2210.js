const f2210 = {
    sel: (str) => {
      try { return document.querySelector(str) }
      catch (err) { return }
    },
    fld: (str) => {
      try { return document.querySelector(str) }
      catch (err) { return }
    },
    val: (str) => getValue(str),
    sumArray: (arr) => {
        var total = 0;
        for (let i in arr) {
            let num = f2210.val(arr[i]);
            total += num;
        }
        return total;
    },
    suma: function () { var res = 0; for (var i in arguments) { res += f2210.val(arguments[i]) } return res; },
    sum: (sel1,sel2) => (f2210.val(sel1) || 0) + (f2210.val(sel2) || 0),
    multi: (sel1,sel2) => Math.round((f2210.val(sel1) || 0) * (f2210.val(sel2) || 0)),
    subt: (sel1,sel2,allowNeg) => { 
        var res = (f2210.val(sel1) || 0) - (f2210.val(sel2) || 0);
        if ((!allowNeg && res > 0) || allowNeg) {
            return res;
        } else {
            return 0;
        }
    },
    div: (sel1,sel2) => (f2210.val(sel1) || 0) / (f2210.val(sel2) || 0),
    min: (sel1,sel2) => {return (f2210.val(sel1) || 0) < (f2210.val(sel2) || 0) ? (f2210.val(sel1) || 0) : (f2210.val(sel2) || 0)},
    max: (sel1,sel2) => {return (f2210.val(sel1) || 0) > (f2210.val(sel2) || 0) ? (f2210.val(sel1) || 0) : (f2210.val(sel2) || 0)},
    //chk: (sel1) => { f2210.sel(sel1).checked = true },
    /*chk: (sel1,sel2) => {
        // if first element is unchecked, check it
        if (f2210.sel(sel1).checked === false) { 
            f2210.sel(sel1).checked = true
        // if second parameter is given, and
        // is a valid selector to an element that is checked,
        // then uncheck it
        } else if (sel2 && typeof sel2 === "string" && f2210.sel(sel2).checked === true) { 
            f2210.sel(sel1).checked = false;
        // if second parameter is an array, uncheck each element by selector
        } else if (sel2 && typeof sel2 === "array") {
            for (let i in sel2) {
                f2210.sel(sel2[i]).checked = false;
            }
        }
    },*/
    prefills: {
        // invisible fields, representing numbers that were prefilled into the field
        "#pg3_ln2a": 4,
        "#pg3_ln2b": 2.4,
        "#pg3_ln2c": 1.5,
        "#pg3_ln2d": 1,
        "#pg3_ln5a": 4,
        "#pg3_ln5b": 2.4,
        "#pg3_ln5c": 1.5,
        "#pg3_ln5d": 1,
        "#pg3_ln20a": 0.225,
        "#pg3_ln20b": 0.45,
        "#pg3_ln20c": 0.675,
        "#pg3_ln20d": 0.90,
        "#pg3_ln29a": 40050,
        "#pg3_ln29b": 66750,
        "#pg3_ln29c": 106800,
        "#pg3_ln29d": 160200,
        "#pg3_ln32a": 0.496,
        "#pg3_ln32b": 0.2976,
        "#pg3_ln32c": 0.186,
        "#pg3_ln32d": 0.124,
        "#pg3_ln34a": 0.116,
        "#pg3_ln34b": 0.0696,
        "#pg3_ln34c": 0.0435,
        "#pg3_ln34d": 0.029
    },
    formulas: {
        // page 1
        "#ln4": () => f2210.sumArray(["#ln1","#ln2","#ln3"]),
        "#ln5": () => f2210.multi("#ln4",0.9),
        "#ln7": () => f2210.subt("#ln4","#ln6"),
        "#ln9": () => f2210.min("#ln5","#ln8"),
        "#ln9_no": () => f2210.val("#ln9") > f2210.val("#ln6") ? false : true,
        "#ln9_yes": ()  => f2210.val("#ln9") > f2210.val("#ln6") ? true : false,
        // page 2
        "#ln10a": () => f2210.fld("#box_C").checked ? f2210.val("#pg3_ln27a") : f2210.multi("#ln9",0.25),
        "#ln10b": () => f2210.fld("#box_C").checked ? f2210.val("#pg3_ln27b") : f2210.multi("#ln9",0.25),
        "#ln10c": () => f2210.fld("#box_C").checked ? f2210.val("#pg3_ln27c") : f2210.multi("#ln9",0.25),
        "#ln10d": () => f2210.fld("#box_C").checked ? f2210.val("#pg3_ln27d") : f2210.multi("#ln9",0.25),
        // column a
        "#ln15a": () => f2210.val("#ln11a"),
        "#ln17a": () => f2210.val("#ln10a") >= f2210.val("#ln15a") 
            ? f2210.val("#ln10a") - f2210.val("#ln15a")
            : "",
        "#ln18a": () => f2210.val("#ln15a") > f2210.val("#ln10a") 
            ? f2210.val("#ln15a") - f2210.val("#ln10a")
            : "",
        // column b
        "#ln12b": () => f2210.val("#ln18a"),
        "#ln13b": () => f2210.sum("#ln11b","#ln12b"),
        "#ln14b": () => f2210.sum(0,"#ln17a"),
        "#ln15b": () => f2210.subt("#ln13b","#ln14b") < 0
            ? 0 : f2210.subt("#ln13b","#ln14b"),
        "#ln16b": () => f2210.val("#ln15b") === 0
            ? f2210.subt("#ln14b","#ln13b") : 0,
        "#ln17b": () => f2210.val("#ln10b") >= f2210.val("#ln15b") 
            ? f2210.val("#ln10b") - f2210.val("#ln15b")
            : "",
        "#ln18b": () => f2210.val("#ln15b") > f2210.val("#ln10b") 
            ? f2210.val("#ln15b") - f2210.val("#ln10b")
            : "",
        // column c
        "#ln12c": () => f2210.val("#ln18b"),
        "#ln13c": () => f2210.sum("#ln11c","#ln12c"),
        "#ln14c": () => f2210.sum("#ln16b","#ln17b"),
        "#ln15c": () => f2210.subt("#ln13c","#ln14c"),
        "#ln16c": () => f2210.val("#ln15c") === 0
            ? f2210.subt("#ln14c","#ln13c") : 0,
        "#ln17c": () => f2210.val("#ln10c") >= f2210.val("#ln15c") 
            ? f2210.val("#ln10c") - f2210.val("#ln15c")
            : "",
        "#ln18c": () => f2210.val("#ln15c") > f2210.val("#ln10c") 
            ? f2210.val("#ln15c") - f2210.val("#ln10c")
            : "",
        // column d
        "#ln12d": () => f2210.val("#ln18c"),
        "#ln13d": () => f2210.sum("#ln11d","#ln12d"),
        "#ln14d": () => f2210.sum("#ln16c","#ln17c"),
        "#ln15d": () => f2210.subt("#ln13d","#ln14d"),
        "#ln17d": () => f2210.val("#ln10d") >= f2210.val("#ln15d") 
            ? f2210.val("#ln10d") - f2210.val("#ln15d")
            : "",
        "#ln19": () => f2210.worksheets["Penalty Worksheet"](),
        // page 3
        "#pg3_ln3a": () => f2210.multi("#pg3_ln1a","#pg3_ln2a"),
        "#pg3_ln6a": () => f2210.multi("#pg3_ln4a","#pg3_ln5a"),
        "#pg3_ln8a": () => f2210.max("#pg3_ln6a","#pg3_ln7a"),
        "#pg3_ln10a": () => f2210.sum("#pg3_ln6a","#pg3_ln7a"),
        "#pg3_ln11a": () => f2210.subt("#pg3_ln3a","#pg3_ln10a"),
        "#pg3_ln13a": () => f2210.subt("#pg3_ln11a","#pg3_ln12a"),
        //"#pg3_ln14a": // tax on 13 (see instructions) 
        "#pg3_ln15a": () => f2210.val("#pg3_ln36a"),
        //"#pg3_ln16a": // see instructions 
        "#pg3_ln17a": () => f2210.sum("#pg3_ln14a","#pg3_ln15a"),
        //"#pg3_ln18a": // see instructions 
        "#pg3_ln19a": () => f2210.subt("#pg3_ln17a","#pg3_ln18a"),
        "#pg3_ln21a": () => f2210.multi("#pg3_ln19a","#pg3_ln20a"),
        "#pg3_ln23a": () => f2210.subt("#pg3_ln21a","#pg3_ln22a"),
        //"#pg3_ln24a": () => f2210.multi(pg1_ln9,0.25 ),
        "#pg3_ln26a": () => f2210.sum("#pg3_ln24a","#pg3_ln25a"),
        "#pg3_ln27a": () => f2210.min("#pg3_ln23a","#pg3_ln26a"),
        //"#pg3_ln28a": // see instructions 
        //"#pg3_ln30a": // see instructions 
        "#pg3_ln31a": () => f2210.subt("#pg3_ln29a","#pg3_ln30a"),
        "#pg3_ln33a": () => f2210.multi("#pg3_ln32a", f2210.min("#pg3_ln28a","#pg3_ln31a")),
        "#pg3_ln35a": () => f2210.multi("#pg3_ln28a","#pg3_ln34a"),
        "#pg3_ln36a": () => f2210.sum("#pg3_ln33a","#pg3_ln35a"),
        // column b
        "#pg3_ln3b": () => f2210.multi("#pg3_ln1b","#pg3_ln2b"),
        "#pg3_ln6b": () => f2210.multi("#pg3_ln4b","#pg3_ln5b"),
        "#pg3_ln8b": () => f2210.max("#pg3_ln6b","#pg3_ln7b"),
        "#pg3_ln10b": () => f2210.sum("#pg3_ln6b","#pg3_ln7b"),
        "#pg3_ln11b": () => f2210.subt("#pg3_ln3b","#pg3_ln10b"),
        "#pg3_ln13b": () => f2210.subt("#pg3_ln11b","#pg3_ln12b"),
        //"#pg3_ln14b": // tax on 13 (see instructions) 
        "#pg3_ln15b": () => f2210.val("#pg3_ln36b"),
        //"#pg3_ln16b": // see instructions 
        "#pg3_ln17b": () => f2210.sum("#pg3_ln14b","#pg3_ln15b"),
        //"#pg3_ln18b": // see instructions 
        "#pg3_ln19b": () => f2210.subt("#pg3_ln17b","#pg3_ln18b"),
        "#pg3_ln21b": () => f2210.multi("#pg3_ln19b","#pg3_ln20b"),
        "#pg3_ln22b": () => f2210.val("#pg3_ln27a"),
        "#pg3_ln23b": () => f2210.subt("#pg3_ln21b","#pg3_ln22b"),
        //"#pg3_ln24b": () => f2210.multi(pg1_ln9,0.25 ),
        "#pg3_ln25b": () => f2210.subt("#pg3_ln26a","#pg3_ln27a"),
        "#pg3_ln26b": () => f2210.sum("#pg3_ln24b","#pg3_ln25b"),
        "#pg3_ln27b": () => f2210.min("#pg3_ln23b","#pg3_ln26b"),
        //"#pg3_ln28b": // see instructions 
        //"#pg3_ln30b": // see instructions 
        "#pg3_ln31b": () => f2210.subt("#pg3_ln29b","#pg3_ln30b"),
        "#pg3_ln33b": () => f2210.multi("#pg3_ln32b", f2210.min("#pg3_ln28b","#pg3_ln31b")),
        "#pg3_ln35b": () => f2210.multi("#pg3_ln28b","#pg3_ln34b"),
        "#pg3_ln36b": () => f2210.sum("#pg3_ln33b","#pg3_ln35b"),
        // column c
        "#pg3_ln3c": () => f2210.multi("#pg3_ln1c","#pg3_ln2c"),
        "#pg3_ln6c": () => f2210.multi("#pg3_ln4c","#pg3_ln5c"),
        "#pg3_ln8c": () => f2210.max("#pg3_ln6c","#pg3_ln7c"),
        "#pg3_ln10c": () => f2210.sum("#pg3_ln6c","#pg3_ln7c"),
        "#pg3_ln11c": () => f2210.subt("#pg3_ln3c","#pg3_ln10c"),
        "#pg3_ln13c": () => f2210.subt("#pg3_ln11c","#pg3_ln12c"),
        //"#pg3_ln14c": // tax on 13 (see instructions) 
        "#pg3_ln15c": () => f2210.val("#pg3_ln36c"),
        //"#pg3_ln16c": // see instructions 
        "#pg3_ln17c": () => f2210.sum("#pg3_ln14c","#pg3_ln15c"),
        //"#pg3_ln18c": // see instructions 
        "#pg3_ln19c": () => f2210.subt("#pg3_ln17c","#pg3_ln18c"),
        "#pg3_ln21c": () => f2210.multi("#pg3_ln19c","#pg3_ln20c"),
        "#pg3_ln22c": () => f2210.suma("#pg3_ln27a","#pg3_ln27b"),
        "#pg3_ln23c": () => f2210.subt("#pg3_ln21c","#pg3_ln22c"),
        //"#pg3_ln24c": () => f2210.multi(pg1_ln9,0.25 ),
        "#pg3_ln25c": () => f2210.subt("#pg3_ln26b","#pg3_ln27b"),
        "#pg3_ln26c": () => f2210.sum("#pg3_ln24c","#pg3_ln25c"),
        "#pg3_ln27c": () => f2210.min("#pg3_ln23c","#pg3_ln26c"),
        //"#pg3_ln28c": // see instructions 
        //"#pg3_ln30c": // see instructions 
        "#pg3_ln31c": () => f2210.subt("#pg3_ln29c","#pg3_ln30c"),
        "#pg3_ln33c": () => f2210.multi("#pg3_ln32c", f2210.min("#pg3_ln28c","#pg3_ln31c")),
        "#pg3_ln35c": () => f2210.multi("#pg3_ln28c","#pg3_ln34c"),
        "#pg3_ln36c": () => f2210.sum("#pg3_ln33c","#pg3_ln35c"),
        // column d
        "#pg3_ln3d": () => f2210.multi("#pg3_ln1d","#pg3_ln2d"),
        "#pg3_ln6d": () => f2210.multi("#pg3_ln4d","#pg3_ln5d"),
        "#pg3_ln8d": () => f2210.max("#pg3_ln6d","#pg3_ln7d"),
        "#pg3_ln10d": () => f2210.sum("#pg3_ln6d","#pg3_ln7d"),
        "#pg3_ln11d": () => f2210.subt("#pg3_ln3d","#pg3_ln10d"),
        "#pg3_ln13d": () => f2210.subt("#pg3_ln11d","#pg3_ln12d"),
        //"#pg3_ln14d": // tax on 13 (see instructions) 
        "#pg3_ln15d": () => f2210.val("#pg3_ln36d"),
        //"#pg3_ln16d": // see instructions 
        "#pg3_ln17d": () => f2210.sum("#pg3_ln14d","#pg3_ln15d"),
        //"#pg3_ln18d": // see instructions 
        "#pg3_ln19d": () => f2210.subt("#pg3_ln17d","#pg3_ln18d"),
        "#pg3_ln21d": () => f2210.multi("#pg3_ln19d","#pg3_ln20d"),
        "#pg3_ln22d": () => f2210.suma("#pg3_ln27a","#pg3_ln27b","#pg3_ln27c"),
        "#pg3_ln23d": () => f2210.subt("#pg3_ln21d","#pg3_ln22d"),
        //"#pg3_ln24d": () => f2210.multi(pg1_ln9,0.25 ),
        "#pg3_ln25d": () => f2210.subt("#pg3_ln26c","#pg3_ln27c"),
        "#pg3_ln26d": () => f2210.sum("#pg3_ln24d","#pg3_ln25d"),
        "#pg3_ln27d": () => f2210.min("#pg3_ln23d","#pg3_ln26d"),
        //"#pg3_ln28d": // see instructions 
        //"#pg3_ln30d": // see instructions 
        "#pg3_ln31d": () => f2210.subt("#pg3_ln29d","#pg3_ln30d"),
        "#pg3_ln33d": () => f2210.multi("#pg3_ln32d", f2210.min("#pg3_ln28d","#pg3_ln31d")),
        "#pg3_ln35d": () => f2210.multi("#pg3_ln28d","#pg3_ln34d"),
        "#pg3_ln36d": () => f2210.sum("#pg3_ln33d","#pg3_ln35d"),
    },
    worksheets: {
        "Penalty Worksheet": () => {
            // row1b - [[date1,date2...,[payment1,payment2...]]
            var row1a = [
                ["a","b","c","d"],
                ["4/15/2023","6/15/2023","9/15/2023","1/15/2024"],
                ["#ln17a","#ln17b","#ln17c","#ln17d"]
                //[4000,3000,3000,3000]
            ];
           console.log(`Line 17 (a) value: ${f2210.val("#ln17a")}`)
            var row1b = allocatePmts(row1a);
            var penalty = 0;
            for (var c in row1b) {
                // for each column:
                // apply penalty calculation to each payment
                // (there may not be more than one)
                var col = c; // d
                if (row1b[c].length === 0) { 
                    var pmtDate = null;
                    var amtPaid = row1a[2][row1a[0].indexOf(col)];
                    penalty += pmtPenalty(col,pmtDate,amtPaid);
                } else {
                    for (var t in row1b[c]) {
                        var pmtDate = row1b[c][t][0];
                        var amtPaid = row1b[c][t][1];
                        penalty += pmtPenalty(col,pmtDate,amtPaid);
                    }
                }
            }
            console.log("Penalty is $"+(Math.round(penalty * 100 ) / 100));
            return Math.round(penalty * 100 ) / 100;
        }
    }
};

function allocatePmts(row1a) {
    try {
    var report = "";
    var data = {a:[],b:[],c:[],d:[]};
    var row1b = f2210.sel("#ln19wks_row1b")?.value;
    if (!row1b) { return data; }
    row1b = row1b.split(/\n/g).map((ea) => ea.split(/[ \t]/g));
    //var row1b = document.querySelector("#ln19wks_row1b").value.split(/\n/g).map((ea) => ea.split(/[ \t,]/g));
    // TODO: sort by date
    for (var kv in row1b) {
        let date1b = new Date(row1b[kv][0]).getTime();
        let pmt = parseFloat(row1b[kv][1].replace(/[$,]/g,""));
        report += "\n\nPayment "+(parseInt(kv)+1)+": paid "+pmt+" on "+row1b[kv][0];
        // for each row1a date ('date1a')
        for (var d in row1a[0]) {
          let col = row1a[0][d];
          let date1a = new Date(row1a[1][d]).getTime();
          let underpmt = f2210.val(row1a[2][d]);
          //let underpmt = row1a[2][d];
          if (underpmt <= 0) { continue }
          report += "\nPeriod "+(parseInt(d)+1)+": "+underpmt+" balance, due "+row1a[1][d];
          // if 'date1b' > 'date1a'
          if (date1b > date1a) {
            report += "\n- The payment date of "+toDate(date1b)+" is past the due date of "+toDate(date1a)+" for the balance due.";
            // if 'pmt' <= 'underpmt'
            if (pmt <= underpmt) {
                report += "\n- Since the payment of "+pmt+" is less than or equal to the balance due of "+underpmt+", the amount applied is "+pmt+", leaving "+(underpmt - pmt)+" due.";
              // allocate to 'date1a'
              var amount = pmt;
              row1a[2][d] = underpmt - pmt;
            } else {
              report += "\n- Since the payment of "+pmt+" is more than the balance due of "+underpmt+", that is the amount applied.\n- The remaining "+(pmt - underpmt)+" was already used to reduce the underpayment.";
              // the difference was already subtracted
              var amount = underpmt;
              row1a[2][d] = 0;
            }
            report += "\n- Enter \""+new Date(date1b).toLocaleDateString()+" "+amount+"\" on line 1b, column ("+col+").\n";
            data[col].push([new Date(date1b).toLocaleDateString(),amount]);
            break;
          } else {
            report += "\n"+toDate(date1b)+" <= "+toDate(date1a)+" (thus, not included)";
          }
        }
    }
    report += "\n\n"+(JSON.stringify(data));
    console.log(report);
    return data;
    } catch (err) { alert(err.message) }
}

function pmtPenalty(col,pmtDate,amtPaid) {
    var period = [
        {"a":"4/15/2023","b":"6/15/2023","rate":0.07,"limit":"6/30/2023","cols":["a","b"]},
        {"a":"06/30/23","b":"06/30/23","c":"09/15/23","rate":0.07,"limit":"9/30/2023","cols":["a","b","c"]},
        {"a":"09/30/23","b":"09/30/23","c":"09/30/23","rate":0.08,"limit":"12/31/2023","cols":["a","b","c"]},
        {"a":"12/31/23","b":"12/31/23","c":"12/31/23","d":"01/15/24","rate":0.08,"limit":"4/15/2024","cols":["a","b","c","d"]}
    ];
    var penalty = 0;
    console.log(`column (${col})\npmtDate: ${pmtDate}\namtPaid: ${amtPaid}`)
    for (var n in period) {
        var startDate = period[n][col];
        if (!startDate) { continue }
        var rate = period[n].rate;
        var limit = new Date(period[n].limit).getTime();
        var start = new Date(startDate).getTime();
        var paid = pmtDate ? new Date(pmtDate).getTime() : limit;
        var amt = amtPaid;
        paid = f2210.min(paid,limit);
        var days = Math.round((paid - start)/1000/60/60/24);
        if (days < 0) { break }
        var yrDays = n < 3 ? 365 : 366; 
        var res = Math.round(amt * (days / yrDays) * rate * 100) / 100;
        penalty += res;
        console.log(`Period ${parseInt(n)+1}:\ndays: ${days}\nrate: ${rate}\nperiod penalty: ${res}`);
        //console.log(`Period ${parseInt(n)+1}: penalty = `+penalty);
    }
    console.log(`total penalty = `+penalty);
    return penalty;
}

function columnPaste(elem,text) {
    var values = text.split(/\n/g);
    var fields = document.querySelectorAll(".editable:not([type='checkbox'])");
    var vals = values.length;
    var ct = 0;
    var start = false;
    for (let field of fields) {
        console.log((elem === field) +" - "+ elem +" === " + field);
        if (elem === field && !start) {
            start = true;
        }
        if (start) {
            let value = values[ct];
            field.innerText = value;
            ct++;
            console.log(ct+" === "+vals);
            if (ct === vals) { break }
        }
    }
}

function recalculate() {
    var frms = f2210.formulas;
    for (let sel in frms) {
        var elem = document.querySelector(sel);
        if (!elem.classList.contains("calculated")) { continue; }
        var value = frms[sel]();
        if (elem.getAttribute("type") === "checkbox") {
            elem.checked = value;
        } else {
            elem.innerText = value;
        }
    }
}

function bool(str) {
    // if 'str' matches '[selector or value][=,<,>,<=,>=][selector or value]'
    var ms = [...val.matchAll(/([^=<>|&]+)([=<>]|>=|<=)([^=<>|&]+)/g)];
    if (ms.length > 1) {
        var re = [];
        for (let i in ms) {
            let m = ms[i][0];
            re.push(m);
        }
        re = new RegExp(`(?:${re.join(")(\|\||&&)(?:")})`);
        var opers = str.match(re);
    }
}

function toDate(num) {
    return new Date(num).toLocaleDateString();
  }

function getValue(str) {
    // if 'str' is a valid query string
    if (typeof str === "string" && f2210.fld(str)) {
        var val = f2210.fld(str).value || f2210.fld(str).innerText;
        if (val !== "" && typeof val === "string" && typeof parseFloat(val) === "number") {
            val = parseFloat(val.replace(/[$,]/g,"").trim());
        } else if (val === "") {
            val = 0;
        }
        return val;
    } else if (typeof str === "string" && typeof parseFloat(str) === "number") {
        return parseFloat(str);
    } else {
        return str;
    }
}

document.addEventListener("paste",(e) => {
    if (e.target.classList.contains("editable") && e.target.tagName !== "TEXTAREA") {
        alert(e.target.tagName);
        e.preventDefault();
        navigator.clipboard.readText().then((txt) => {
            columnPaste(e.target,txt);
            recalculate();
        })
    }   
})

document.addEventListener("keydown",(e) => {
    if (e.key === "Tab" || (e.key === "Enter" && e.target.tagName !== "TEXTAREA")) {
        if (e.key === "Enter") {
            e.preventDefault();
        }
        recalculate();
    } else if (e.key === "|" && e.shiftKey) {
        e.preventDefault();
        recalculate();
    } else if (e.key === "Delete" && e.shiftKey) {
        var fields = document.querySelectorAll(".editable:not([type='checkbox'])");
        for (let field of fields) {
            field.innerText = "";
            recalculate();
        }
    }
});

document.addEventListener("blur",(e) => {
    // can't do 'blur' from a contenteditable
    if (e.target.classList.contains("editable")) {
        recalculate();
    }
});

document.addEventListener("click",(e) => {
    recalculate();
});

document.addEventListener("dblclick",(e) => {
    if (e.target.classList.contains("calculated")) {
        e.target.classList.remove("calculated");
        e.target.classList.add("override");
        e.target.setAttribute("contenteditable",true);
        e.target.focus();
        if (!e.shiftKey) {
            e.target.innerText = "";
        }
        // TODO: move cursor to end (of a contenteditable)
    } else if (e.target.classList.contains("override")) {
        e.target.classList.remove("override");
        e.target.classList.add("calculated");
        e.target.removeAttribute("contenteditable");
        // remove selection and recalculate
        e.target.parentNode.click();
    }
});

setTimeout(() => { 
    var pfs = f2210.prefills;
    for (let sel in pfs) {
        var value = pfs[sel];
        var elem = document.querySelector(sel);
        elem.innerText = value;
    }
    var fmls = f2210.formulas;
    for (let sel in fmls) {
        var elem = document.querySelector(sel);
        elem.removeAttribute("contenteditable");
        elem.classList.remove("editable");
        elem.classList.add("calculated");
    }
 }, 200)