/* SANITIZED 9.26.26 for Demo */

const pipeKeys = {
    /*"snippets": [ 
        "Snippets",
        1738591317406,
        {
            "name":"iax",
            "body":"Installment Agreement"
        },
        {
            "name":"jk",
            "body":"-- jklueck [[%d(MM.D.YY)]]"
        },
        {
            "name":"jka",
            "body":"Approved [[%s(jk)]]"
        },
        {
            "name":"timex",
            "body":"[[%d(h:m a)]]"
        },
        {
            "name":"testx",
            "body":"[[%p]]"
        }
    ],*/
  "snippets": [
    "Snippets",
    1775762677653,
    {
      "name": "irs-fres",
      "body": "Department of the Treasury\nInternal Revenue Service\nFresno, CA 93888-0025",
      "timestamp": 0
    },
    {
      "name": "1065",
      "body": "Form 1065, U.S. Return of Partnership Income",
      "timestamp": 0
    },
    {
      "name": "1120",
      "body": "Form 1120, US Corporation Income Tax Return",
      "timestamp": 0
    },
    {
      "name": "1120-S",
      "body": "Form 1120-S, US Income Tax Return for an S-Corporation",
      "timestamp": 0
    },
    {
      "name": "Lssn",
      "body": "Last 4 SSN digits in notice.",
      "timestamp": 1784748361158
    },
    {
      "name": "fein",
      "body": "Full EIN in notice.",
      "timestamp": 1784556895355
    },
    {
      "name": "irs-og",
      "body": "Department of the Treasury\nInternal Revenue Service\nOgden Service Center\nOgden, UT 84201-0046",
      "timestamp": 1784033901309
    },
    {
      "name": "DOR",
      "body": "Department of Revenue",
      "timestamp": 1782507747469
    },
    {
      "name": "fssn",
      "body": "Full SSN shown in notice.",
      "timestamp": 1781813643584
    },
    {
      "name": "DTF",
      "body": "Department of Taxation and Finance",
      "timestamp": 1781789353754
    },
    {
      "name": "NYS",
      "body": "New York State",
      "timestamp": 1781789346678
    },
  ],
    "funcs": {
        "d": (str) => {
            let dt = new Date();
            let weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            let obj = {
                "s": dt.getSeconds(),
                "m": dt.getMinutes(),
                "hh": dt.getHours()+1,
                "h": dt.getHours()+1 > 12 ? dt.getHours()+1 - 12 : dt.getHours()+1,
                "a": dt.getHours()+1 > 11 ? "pm" : "am",
                "D": dt.getDate(),
                "dddd": weekdays[dt.getDay()],
                "ddd": weekdays[dt.getDay()].slice(0,3),
                "MMMM": months[dt.getMonth()],
                "MMM": months[dt.getMonth()].slice(0,3),
                "MM": dt.getMonth()+1,
                "YYYY": dt.getFullYear(),
                "YY": dt.getFullYear().toString().slice(2,4),
                "date": dt.toLocaleDateString(),
                "time": dt.toLocaleTimeString(),
            };
            for (let o in obj) {
                str = str.replace(o,obj[o]);
            }
            return str;
        },
        "s": async (str) => await getSnippet(str),
        "p": async () => {
            //alert("Will replace '[[%p]]' with clipboard contents.")
            let txt = await navigator.clipboard.readText();
            return txt;
        },
    }
};

setTimeout(() => {
    document.addEventListener("keydown", async (e) => {
        if (e.target.getAttribute("data-prokeyscachednode")) { return }
        if (e.shiftKey && e.code === "Space") {
            e.preventDefault()
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
                // get text immediately before cursor, back to a whitespace char or beginning of string
                let short = getTextBeforeCursor(e.target);
                let text = "";
                if (short) {
                    text = await getSnippet(short);
                    /*for (let ea in db.snippets) {
                        let snip = db.snippets[ea];
                        if (typeof snip !== "object") { continue }
                        if (short === snip.name) {
                            text = snip.body;
                            break;
                        }
                    }*/
                    //text = db.snippets[short.toLowerCase()] || "";
                    // { "iax": "Installment Agreement", ... }
                    if (text === "") { return }
                    text = await processVariables(text);
                    setExpandedText(e.target,short,text);
                }
            }
        }
    });
}, 500);

async function getSnippet(short) {
    let snippet = "";
    for (let ea in db.snippets) {
        let snip = db.snippets[ea];
        if (typeof snip !== "object") { continue }
        if (short.toLowerCase() === snip.name.toLowerCase()) {
            snippet = snip.body;
            snippet = await processVariables(snippet);
            break;
        }
    }
    return snippet;
}

function getTextBeforeCursor(inputElem) {
    if (inputElem) {
        // Get the cursor position
        const caretPos = inputElem.selectionStart;
        // Get the text before the cursor
        // The slice() method returns a portion of the string from the start index (0) up to (but not including) the end index (caretPos)
        const textBeforeCursor = inputElem.value.slice(0, caretPos);
        let short = textBeforeCursor.match(/[^\s]+$/)[0];
        console.log(`Short = ${short}`)
        return short;
    }
    return "";
}

function setExpandedText(elem,text1,text2) {
    let end = elem.selectionStart;
    let len = text1.length;
    let beg = end - len;
    elem.setSelectionRange(beg,end);
    elem.setRangeText(text2, beg, end, "end")
    //alert(`Will expand "${text1}" to "${text2}"!\nFrom ${beg} to ${end}.`);
}

async function processVariables(text) {
    // [[%d(!MM/D+1)]] 
    // [[%p]]
    // [[%s(iax)]]
    // [[%d(MM.D.YY)]]
    let vars = text.match(/\[\[%[^\]]+\]\]/g);
    for (let v in vars) {
        let vrbl = vars[v];
        let fvar = vrbl.match(/\[\[%([a-z]+)([^\]]+|)\]\]/);
        let func = fvar[1];
        let str = fvar[2] !== "" ? fvar[2].replace(/[\(\)]/g,"") : "";
        console.log(`func = "${func}"\nstr = "${str}"`)
        let funcs = db.funcs;
        let repl = await funcs[func](str);
        text = text.replace(vrbl,repl);
    }
    return text;
}
