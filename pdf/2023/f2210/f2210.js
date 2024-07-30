const f2210 = {
    currentFile: { name: "2023 Form 2210" },
    lines: {},
    sela: function () { 
        var res = []; 
        for (var i in arguments) { 
            res.push(arguments[i]);
        } 
        return document.querySelectorAll(res.join(",")); 
    },
    sel: (str) => {
      try { return document.querySelector(str) }
      catch (err) { return }
    },
    fld: (str) => {
        try { 
            if (!str.match(/^#/)) {
                // assume 'str' is meant to be an id
                str = "#"+str;
            }
            return document.querySelector(str) 
        } catch (err) { return }
    },
    val: (str) => getValue(str),
    vals: (str) => getValues(str),
    set: (sel,val) => setValue(sel,val),
    sumArray: (arr) => {
        var total = 0;
        for (let i in arr) {
            let num = f2210.val(arr[i]);
            if (!num) { continue }
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
    loadJSON: (text) => {
        var json = JSON.parse(text);
        f2210.lines = json;
        f2210.currentFile.ids = Object.keys(json);
        distribute(f2210);
    },
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
    data: {
        row1a: [
            ["a","b","c","d"],
            ["4/15/2023","6/15/2023","9/15/2023","1/15/2024"],
            ["#ln17a","#ln17b","#ln17c","#ln17d"]
        ],
        periodCalcs: [
            {"a":"4/15/2023","b":"6/15/2023","rate":0.07,"limit":"6/30/2023","cols":["a","b"],"dayFld":"#ln3","calc":"#ln4"},
            {"a":"06/30/23","b":"06/30/23","c":"09/15/23","rate":0.07,"limit":"9/30/2023","cols":["a","b","c"],"dayFld":"#ln6","calc":"#ln7"},
            {"a":"09/30/23","b":"09/30/23","c":"09/30/23","rate":0.08,"limit":"12/31/2023","cols":["a","b","c"],"dayFld":"#ln9","calc":"#ln10"},
            {"a":"12/31/23","b":"12/31/23","c":"12/31/23","d":"01/15/24","rate":0.08,"limit":"4/15/2024","cols":["a","b","c","d"],"dayFld":"#ln12","calc":"#ln13"}
        ]
    },
    instructions: {
        "#ln2": `IF you file 1040, 1040-NR, or 1040-SR
THEN include on line 2 the amounts on...

Schedule 2 (Form 1040):
Line 4,
Line 8 (additional tax on distributions only),
Line 9,*
Line 10,
Line 11,
Line 12,
Line 14,
Line 15,
Line 16,
Line 17a,
Line 17c,
Line 17d,
Line 17e,
Line 17f,
Line 17g,
Line 17h,
Line 17i,
Line 17j,
Line 17l, and
Line 17z.

* If you’re a household employer, include your household employment taxes on line 2. Don’t include household employment taxes if both of the following are true: (1) You didn’t have federal income tax withheld from your income, and (2) You wouldn’t be required to make estimated tax payments even if the household employment taxes weren't included.`,
        "#ln3": `Enter the total amount of the following payments and refundable credits, if any, that you claim on your tax return.

• Earned income credit.
• Additional child tax credit.
• Refundable part of the American opportunity credit (Form 8863, line 8).
• Premium tax credit (Form 8962).
• Credit for federal tax paid on fuels.
• Qualified sick and family leave credits from Schedule(s) H (Schedule 3 (Form 1040), line 13z).
• Credit determined under section 1341(a)(5)(B). To figure the amount of the section 1341 credit, see Repayments in Pub. 525, Taxable and Nontaxable Income.`,
    "#ln6": `Enter the taxes withheld shown on the following lines:

• Form 1040 or 1040-SR, line 25d;
• Form 1040-NR, lines 25d, 25e, 25f, and 25g;
• Also, Schedule 3 (Form 1040), line 11, if you filed the above forms;
• Form 1041, Schedule G, line 14.

Filers of Form 8689, Allocation of Individual Income Tax to the U.S. Virgin Islands. Also enter on this line the amount(s) from Form 8689, lines 41 and 46, that you entered on line 33 of your 2023 Form 1040 or 1040-SR.`,
    "#ln8": `IF you filed for 2022...
THEN add the following amounts shown on your 2022 tax return.

Line 22,

Schedule 2 (Form 1040):
Line 4,
Line 8 (additional tax on distributions only),
Line 9,*
Line 10,
Line 11,
Line 12,
Line 14,
Line 15,
Line 16,
Line 17a,
Line 17c,
Line 17d,
Line 17e,
Line 17f,
Line 17g,
Line 17h,
Line 17i,
Line 17j,
Line 17l, and
Line 17z.

* If you’re a household employer, include your household employment taxes on line 2. Don’t include household employment taxes if both of the following are true: (1) You didn’t have federal income tax withheld from your income, and (2) You wouldn’t be required to make estimated tax payments even if the household employment taxes weren't included.`,
    },
    prefills: {
        // invisible fields, representing numbers that were prefilled into the field
        "#ln2-a": "4/15/23",
        "#ln2-b": "6/15/23",
        "#ln5-a": "6/30/23",
        "#ln5-b": "6/30/23",
        "#ln5-c": "9/15/23",
        "#ln8-a": "9/30/23",
        "#ln8-b": "9/30/23",
        "#ln8-c": "9/30/23",
        "#ln11-a": "12/31/23",
        "#ln11-b": "12/31/23",
        "#ln11-c": "12/31/23",
        "#ln11-d": "1/15/24",
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
        // worksheet page
        "#ln1a-a": () => f2210.val("#ln17a"),
        "#ln1a-b": () => f2210.val("#ln17b"),
        "#ln1a-c": () => f2210.val("#ln17c"),
        "#ln1a-d": () => f2210.val("#ln17d"),
        /*"#ln1b-a": () => f2210.val(" "),
        "#ln1b-b": () => f2210.val(" "),
        "#ln1b-c": () => f2210.val(" "),
        "#ln1b-d": () => f2210.val(" "),
        "#ln3-a": () => f2210.val(" "),
        "#ln3-b": () => f2210.val(" "),*/
        "#ln4-a": () => periodPenalty(1,"a"),
        "#ln4-b": () => periodPenalty(1,"b"),
        /*"#ln6-a": () => f2210.val(" "),
        "#ln6-b": () => f2210.val(" "),
        "#ln6-c": () => f2210.val(" "),*/
        "#ln7-a": () => periodPenalty(2,"a"),
        "#ln7-b": () => periodPenalty(2,"b"),
        "#ln7-c": () => periodPenalty(2,"c"),
        /*"#ln9-a": () => f2210.val(" "),
        "#ln9-b": () => f2210.val(" "),
        "#ln9-c": () => f2210.val(" "),*/
        "#ln10-a": () => periodPenalty(3,"a"),
        "#ln10-b": () => periodPenalty(3,"b"),
        "#ln10-c": () => periodPenalty(3,"c"),
        /*"#ln12-a": () => f2210.val(" "),
        "#ln12-b": () => f2210.val(" "),
        "#ln12-c": () => f2210.val(" "),
        "#ln12-d": () => f2210.val(" "),*/
        "#ln13-a": () => periodPenalty(4,"a"),
        "#ln13-b": () => periodPenalty(4,"b"),
        "#ln13-c": () => periodPenalty(4,"c"),
        "#ln13-d": () => periodPenalty(4,"d"),
        "#ln14": () => totalPenalty(),
        // page 3
        // column a
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
        "#pg3_ln24a": () => f2210.multi("#ln9",0.25),
        "#pg3_ln26a": () => f2210.sum("#pg3_ln24a","#pg3_ln25a"),
        "#pg3_ln27a": () => f2210.min("#pg3_ln23a","#pg3_ln26a"),
        //"#pg3_ln28a": // see instructions 
        //"#pg3_ln30a": // see instructions 
        "#pg3_ln31a": () => f2210.val("#pg3_ln28a") === 0 ? 0 : f2210.subt("#pg3_ln29a","#pg3_ln30a"),
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
        "#pg3_ln24b": () => f2210.multi("#ln9",0.25),
        "#pg3_ln25b": () => f2210.subt("#pg3_ln26a","#pg3_ln27a"),
        "#pg3_ln26b": () => f2210.sum("#pg3_ln24b","#pg3_ln25b"),
        "#pg3_ln27b": () => f2210.min("#pg3_ln23b","#pg3_ln26b"),
        //"#pg3_ln28b": // see instructions 
        //"#pg3_ln30b": // see instructions 
        "#pg3_ln31b": () => f2210.val("#pg3_ln28a") === 0 ? 0 : f2210.subt("#pg3_ln29b","#pg3_ln30b"),
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
        "#pg3_ln24c": () => f2210.multi("#ln9",0.25),
        "#pg3_ln25c": () => f2210.subt("#pg3_ln26b","#pg3_ln27b"),
        "#pg3_ln26c": () => f2210.sum("#pg3_ln24c","#pg3_ln25c"),
        "#pg3_ln27c": () => f2210.min("#pg3_ln23c","#pg3_ln26c"),
        //"#pg3_ln28c": // see instructions 
        //"#pg3_ln30c": // see instructions 
        "#pg3_ln31c": () => f2210.val("#pg3_ln28a") === 0 ? 0 : f2210.subt("#pg3_ln29c","#pg3_ln30c"),
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
        "#pg3_ln24d": () => f2210.multi("#ln9",0.25),
        "#pg3_ln25d": () => f2210.subt("#pg3_ln26c","#pg3_ln27c"),
        "#pg3_ln26d": () => f2210.sum("#pg3_ln24d","#pg3_ln25d"),
        "#pg3_ln27d": () => f2210.min("#pg3_ln23d","#pg3_ln26d"),
        //"#pg3_ln28d": // see instructions 
        //"#pg3_ln30d": // see instructions 
        "#pg3_ln31d": () => f2210.val("#pg3_ln28a") === 0 ? 0 : f2210.subt("#pg3_ln29d","#pg3_ln30d"),
        "#pg3_ln33d": () => f2210.multi("#pg3_ln32d", f2210.min("#pg3_ln28d","#pg3_ln31d")),
        "#pg3_ln35d": () => f2210.multi("#pg3_ln28d","#pg3_ln34d"),
        "#pg3_ln36d": () => f2210.sum("#pg3_ln33d","#pg3_ln35d"),
    },
    worksheets: {
        "Penalty Worksheet": () => {
            // row1b - [[date1,date2...,[payment1,payment2...]]
            var row1a = f2210.data.row1a;
            /*[
                ["a","b","c","d"],
                ["4/15/2023","6/15/2023","9/15/2023","1/15/2024"],
                ["#ln17a","#ln17b","#ln17c","#ln17d"]
                //[4000,3000,3000,3000]
            ];*/
           console.log(`Line 17 (a) value: ${f2210.val("#ln17a")}`)
            var row1b = allocatePmts(row1a);
            displayPmts(row1b);
            var penalty = 0;
            for (var c in row1b) {
                // for each column:
                // apply penalty calculation to each payment
                // (there may not be more than one)
                var col = c; // d
                if (row1b[c].length === 0) { 
                    var pmtDate = null;
                    let sel = row1a[2][row1a[0].indexOf(col)];
                    var amtPaid = f2210.val(sel);
                    penalty += pmtPenaltyTotal(col,pmtDate,amtPaid);
                    continue;
                } else {
                    for (var t in row1b[c]) { // t = 0  row1b["a"][0] = ["4/15/24",2000]
                        var pmtDate = row1b[c][t][0]; // row1b["a"][0][0] = "4/15/24"
                        let sel = row1b[c][t][1]; 
                        var amtPaid = f2210.val(sel); // row1b["a"][0][1] = 2000
                        penalty += pmtPenaltyTotal(col,pmtDate,amtPaid);
                    }
                }
            }
            console.log("Penalty is $"+(Math.round(penalty * 100 ) / 100));
            return Math.round(penalty * 100 ) / 100;
        },
    }
};
/*
28894


6852
48666
1713
5058
24820
130240

04/30/23 2000
06/15/23 3000
09/15/23 4000
01/15/24 4000
*/

/*
Example data from 2210 instructions:
04/30/23 2000
06/15/23 3000
09/15/23 4000
01/15/24 4000
*/

function allocatePmts(row1a) {
    try {
    var report = "";
    var data = {a:[],b:[],c:[],d:[]};
    var row1b = f2210.sel("#ln19wks_row1b")?.value;
    if (!row1b || row1b === "") { return data; }
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
    } catch (err) { alert("ERROR, allocatePmts: "+err.message) }
}

function displayPmts(row1b) {
    for (var c in row1b) { // c = "a"  row1b["a"] = [["4/15/24",2000],["6/15/24",3000]]
        if (row1b[c].length === 0) { // row1b["a"] = [];
            continue;
        } else {
            var arr = [];
            var sel = "#ln1b-"+c; // "#ln1b-a"
            for (var t in row1b[c]) { // t = 0  row1b["a"][0] = ["4/15/24",2000]
                var pmtDate = row1b[c][t][0]; // row1b["a"][0][0] = "4/15/24"
                var amtPaid = row1b[c][t][1]; // row1b["a"][0][1] = 2000
                arr.push(pmtDate+" "+amtPaid); // "4/15/24 2000"
            }
            f2210.sel(sel).innerText = arr.join("\n");
        }
    }
}

function pmtPenaltyTotal(col,pmtDate,amtPaid) {
    var period = f2210.data.periodCalcs;
    /*[
        {"a":"4/15/2023","b":"6/15/2023","rate":0.07,"limit":"6/30/2023","cols":["a","b"]},
        {"a":"06/30/23","b":"06/30/23","c":"09/15/23","rate":0.07,"limit":"9/30/2023","cols":["a","b","c"]},
        {"a":"09/30/23","b":"09/30/23","c":"09/30/23","rate":0.08,"limit":"12/31/2023","cols":["a","b","c"]},
        {"a":"12/31/23","b":"12/31/23","c":"12/31/23","d":"01/15/24","rate":0.08,"limit":"4/15/2024","cols":["a","b","c","d"]}
    ];*/
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

function periodPenalty(n,col) {
    var period = f2210.data.periodCalcs;
    /*[
        {"a":"4/15/2023","b":"6/15/2023","rate":0.07,"limit":"6/30/2023","cols":["a","b"],"dayFld":"#ln3","calc":"#ln4"},
        {"a":"06/30/23","b":"06/30/23","c":"09/15/23","rate":0.07,"limit":"9/30/2023","cols":["a","b","c"],"dayFld":"#ln6","calc":"#ln7"},
        {"a":"09/30/23","b":"09/30/23","c":"09/30/23","rate":0.08,"limit":"12/31/2023","cols":["a","b","c"],"dayFld":"#ln9","calc":"#ln10"},
        {"a":"12/31/23","b":"12/31/23","c":"12/31/23","d":"01/15/24","rate":0.08,"limit":"4/15/2024","cols":["a","b","c","d"],"dayFld":"#ln12","calc":"#ln13"}
    ];*/
    var penalty = 0;
    n = n - 1; // change to [0-9] count
    if (!period[n]) { return "" }
    var startDate = period[n][col];
    if (!startDate) { return "" }
    var rate = period[n].rate;
    var limit = new Date(period[n].limit).getTime();
    var start = new Date(startDate).getTime();
    try{
    var pmts = f2210.sel("#ln1b-"+col).innerText;
    //var pmts = f2210.val("#ln1b-"+col);
    // possible formats of 'pmts':
    // undefined x
    // "" (blank) x
    // string matching '[date] [number]'
    // string matching '[date] [number]\n[date] [number]'+
    // array [] or [[]]
    if (!pmts || pmts === "") { return "" }
    if (typeof pmts === "string") {
        // split into [] by new lines
        pmts = pmts.split(/\n/g); // should make array even if no split
        // then spaces [[]]
        pmts = pmts.map((ea) => ea.split(/ /g));
    } else if (pmts instanceof Array && pmts.length === 0) {
        return "";
    }
    } catch (err) { console.log("ERROR, periodPenalty: "+err.message+"\nvalue of '#ln1b-"+col+"' = "+pmts)}
    var nl = "";
    var res = "";
    var dayFld = "";
    for (var p in pmts) {
        if (parseInt(p) > 0) { nl = "\n" }
        var pmtDate = pmts[p][0];
        var amtPaid = pmts[p][1];
        var paid = pmtDate ? new Date(pmtDate).getTime() : limit;
        var amt = parseFloat(amtPaid);
        paid = f2210.min(paid,limit);
        var days = Math.round((paid - start)/1000/60/60/24);
        if (days < 0) { continue; }
        dayFld += nl + days;
        console.log(days+" days")
        var yrDays = n < 3 ? 365 : 366; 
        var calc = Math.round(amt * (days / yrDays) * rate * 100) / 100;
        console.log(res);
        //f2210.sel("#ln4-"+col).innerText 
        res += nl + calc;
    }
    var field = f2210.sel(period[n].dayFld+"-"+col);
    field.innerText = dayFld;
    field.removeAttribute("contenteditable");
    field.classList.remove("editable");
    field.classList.add("calculated");
    return res || "";
    //penalty += res;
    //return penalty;
}

function totalPenalty() {
    var period = f2210.data.periodCalcs;
    var penalty = 0;
    for (var n in period) {
        var sel = period[n].calc;
        var cols = period[n].cols;
        for (var c in cols) {
            var col = cols[c];
            var amounts = f2210.vals(sel+"-"+col);
            penalty += f2210.sumArray(amounts);
        }
    }
    return toTaxFormat(penalty,2);
}

function columnPaste(elem,text) {
    if (text.match(/^\s*\{[^"]*"[^"]*":[^]+\}\s*$/)) {
        var json = JSON.parse(text);
        f2210.lines = json;
        f2210.currentFile.ids = Object.keys(json);
        distribute(f2210);
        return;
    }
    var values = text.split(/\n/g);
    var fields = document.querySelectorAll(".editable");
    //.querySelectorAll(".editable:not([type='checkbox'])");
    var vals = values.length;
    var ct = 0;
    var start = false;
    for (let field of fields) {
        // console.log((elem === field) +" - "+ elem +" === " + field);
        if (elem === field && !start) {
            start = true;
        }
        if (start) {
            let value = values[ct];
            f2210.set(field.id,value);
            /*if (field.getAttribute("type") === "checkbox") {
                field.checked = (value === "true" || value === true) ? true : false;
            } else {
            }*/
            ct++;
            // console.log(ct+" === "+vals);
            if (ct === vals) { break }
        }
    }
}

function distribute(form) {
    var lines = form.lines;
    var order = form.currentFile.ids || Object.keys(lines);
    console.log(form.currentFile.ids)
    //var fields = document.querySelectorAll(".editable:not([type='checkbox'])");
    for (let ln in order) {
        let sel = order[ln];
        if (!form.fld(sel)) { continue }
        let value = lines[sel];
        form.set(sel,value);
    }
}

function recalculate() {
    var frms = f2210.formulas;
    for (let sel in frms) {
        var elem = document.querySelector(sel);
        if (!elem.classList.contains("calculated")) { 
            continue; 
        }
        var value = frms[sel]();
        if (elem.getAttribute("type") === "checkbox") {
            elem.checked = value;
        } else {
            elem.innerText = value;
        }
    }
}

function recordEdits() {
    var fields = f2210.sela(".editable");
    for (var f in fields) {
        var field = fields[f];
        if (!field.id) { continue }
        var sel = "#"+field.id;
        var value = f2210.val(sel);
        f2210.lines[sel] = value;
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

function toCurrency(num,decimals) {
    var dec = 0;
    if (decimals) { dec = 2 }
    var opt = { style: 'currency', currency: 'USD', maximumFractionDigits: dec };
	var fixed = new Intl.NumberFormat('en-US', opt);
    return fixed.format(num);
}

function toTaxFormat(num,decimals) {
    var dec = 0;
    if (decimals) { dec = 2 }
    var opt = { maximumFractionDigits: dec };
	var fixed = new Intl.NumberFormat('en-US', opt);
    return fixed.format(num);
}

function getValue(str,multiline) {
    var field = f2210.fld(str);
    // if 'str' is a valid query string
    if (typeof str === "string" && field) {
        var val = field.value || field.innerText;
        if (field.getAttribute("type") === "checkbox") {
            val = field.checked;
        }
        if (val.match && val.match(/\n/) /*|| field.classList.contains("multiline")*/) { multiline = true }
        // if 'val' is expected to contain multiple numbers (new line separated)
        if (multiline) {
            var values = [];
            if (val === "") { return values }
            var split = val.split(/\n/g);
            for (var v in split) {
                var value = parseValue(split[v]);
                if (!value) { continue }
                if (value.toString() === "NaN") { continue }
                values.push(value);
            }
            return values;
        } else if (val !== "" && typeof val === "string" && parseFloat(val).toString() !== "NaN") {
            val = parseFloat(val.replace(/[$,]/g,"").trim());
        } else if (val === "") {
            val = 0;
        }
        return parseValue(val);
    } else { return parseValue(str) }
}

function parseValue(val) {
    if (typeof val === "string" 
        && parseFloat(val.replace(/[$,]/g,"")).toString() !== "NaN"
        // is not a multiline or space-separated value
        && !val.match(/[\n\t ]/)
        // is not a date string
        && !val.trim().match(/^\d{1,2}\/\d{1,2}\/*\d{0,4}$/)
        // is not a SSN, EIN, 
        // or US Phone using "()", "-", and/or "."
        // as separators
        && !val.trim()
        .match(/^(\d{3}-\d{2}-\d{4}|\d{2}-\d{6}|\(*\d{3}\)* *\d{3}-\d{4}|\d{3}[-.]\d{3}[-.]\d{4})$/)
    ) {
        return parseFloat(val.replace(/[$,]/g,"").trim());
    } else if (val === "") {
        val = 0;
    } else {
        return val;
    }
}

function getValues(str) {
    return getValue(str,true);
}

function setValue(sel,val) {
    var field = f2210.fld(sel);
    if (field.getAttribute("type") === "checkbox") {
        var bool = (val === "true" || val === true) ? true : false;
        field.checked = bool;
        return;
    }
    //if (val.split("\n").length > 1) {
    //    val = val.replace(/\\n/g,"\n");
    //}
    if (val instanceof Array) {
        val = val.join("\n");
    }
    if (field.tagName === "TEXTAREA" || field.tagName === "INPUT") {
        field.value = val;
    } else {
        field.innerText = val;
    }
}

document.addEventListener("paste",(e) => {
    if (e.target.classList.contains("editable") && e.target.tagName !== "TEXTAREA") {
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
    } else if (e.key === "S" && e.shiftKey && !e.target.classList.contains("editable")) {
        recordEdits();
        saveForm(f2210);
    } else if (e.key === "O" && e.shiftKey && !e.target.classList.contains("editable")) {
        if (f2210.sel("#report")?.classList.contains("hidden")) {
            f2210.sel("#report").classList.remove("hidden");
        } else {
            f2210.sel("#report").classList.add("hidden");
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
        elem.removeAttribute("contenteditable");
        elem.classList.remove("editable");
        elem.classList.add("prefilled");
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
