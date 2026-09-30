db = { 
    htmlContent: "",
    summData: {},
    sureStatus: {},
    summTitles: [
        "Portfolio Approval:",
        "Writing Perspective:",
        "Representative for Deceased Taxpayer:",
        "Documentation:", //?
        "Summary:",
        "Relevant Law/Regulation:",
        "Case Strength:",
        "Explain rationale for strength:",
        "Summarize important contacts", //trunc
        "Tax Year(s) Involved:",
        "Authority:",
        "Notice Date:",
        "Notice Type:",
        "Notice Number:",
        "Reference #/AUR:",
        "Notice Deadline:",
        "Expected Outcome:",
        "Payments Made:",
        "Items Accepted:",
        "Reason:",
        "Items Contested:",
        "Reason for Dispute:",
        "Missing Documents:",
        "Reason for Omission:",
        "Date you communicated", //trunc
        "List supporting documents", //trunc
        "=== CASE NOTES ===",
        "Portfolio Number:",
        "Case Name and Number:",
        "Name Merge:",
        "Primary TIN:",
    ],
    summSections: [
        "Case Description - Case Summary",
        "Taxing Authority Details:",
        "Notice Details:",
        "Agreed Items",
        "Disputed Items",
        "Substantiation Status",
        "Partial Substantiation Details:",
        " with IRS\\/state, client, or third parties\\. Include dates and substance \\(for reference\\), if applicable\\.",
        " to the taxpayer that, without proper substantiation, the deduction and\\/or credits will likely be disallowed, resulting in a possible balance due\\.",
        " provided explaining relevance to disputed issues \\(e\\.g\\., how the business deduction is ordinary and necessary to operate the business\\)",
        "=== CASE DETAILS ===", // unlike 'CASE NOTES' -- only used as a section header
    ],
    stateCode: {
        "AL": "Alabama",
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "AS": "American Samoa",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "DC": "District of Columbia",
        "FL": "Florida",
        "GA": "Georgia",
        "GU": "Guam",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "MP": "Northern Mariana Islands",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "PR": "Puerto Rico",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "TT": "Trust Territories",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "VI": "Virgin Islands",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    },
    formNames: {
        // Note: function sets all letters to uppercase before searching.
        // Example: match of "Federal Tax Return" searches "FEDERAL TAX RETURN"
    	"1099": "Form 1099, Consolidated Tax Statement",
        "1099-B": "Form 1099-B, Proceeds from Broker and Barter Exchange",
        "1099-NEC": "Form 1099-NEC, Nonemployee Compensation",
        "1099-DIV": "Form 1099-DIV, Dividends and Distributions",
        "1099-INT": "Form 1099-INT, Interest Income",
    	"1099-R": "Form 1099-R, Retirement Distributions",
        "1099-Q": "Form 1099-Q, Payments from Qualified Education Programs",
        "1099-K": "Form 1099-K, Payment Card and Third Party Network Transactions",
        "1099-DA": "1099-DA, Digital Asset Proceeds From Broker Transactions",
        "1099-G": "Form 1099-G, Certain Government Payments",
        "1099-MISC": "Form 1099-MISC, Miscellaneous Information",
        "1099-SA": "Form 1099-SA, Distributions from HSA",
        "1099-S": "Form 1099-S, Proceeds from Real Estate Transactions",
        "SSA-1099": "Form SSA-1099, Social Security Benefit Statement",
        "1099-SSA": "Form SSA-1099, Social Security Benefit Statement",
        "1095-A": "Form 1095-A, Health Insurance Marketplace Statement",
        "1095-B": "Form 1095-B, Health Coverage",
        "1095-C": "Form 1095-C, Employer-Provided Health Insurance",
        "1098": "Form 1098, Mortgage Interest Statement",
        "1098-T": "Form 1098-T, Tuition Statement",
        "5498": "Form 5498, IRA Contribution Information",
        "5498-SA": "Form 5498-SA, HSA Information",
        "K-1": "Partner's Share of Income, etc.",
        "W-2": "Form W-2, Wage and Tax Statement",
        "W-2G": "Form W-2G, Certain Gambling Winnings",
        "A": "Schedule A, Itemized Deductions",
        "B": "Schedule B, Interest and Ordinary Dividends",
        //"C": "Schedule C, Profit or Loss From Business",
        // "Sch C" is used too often for related docs
        "D": "Schedule D, Capital Gains and Losses",
        "E": "Schedule E, Supplemental Income and Loss",
        "F": "Schedule F, Profit or Loss From Farming",
        "H": "Schedule H, Household Employment Taxes",
        "SE": "Schedule SE, Self-Employment Tax",
        "2106": "Form 2106, Employee Business Expenses",
        "8889": "Form 8889, Heath Savings Accounts",
        "8936": "Form 8936, Clean Vehicle Credit",
        "8962": "Form 8962, Premium Tax Credit",
        "8995": "Form 8995, Qualified Business Income Deduction",
        "15400": "Form 15400, Clean Vehicle Seller Report",
        "8949": "Form 8949, Sales and Other Dispositions of Capital Assets",
        "5695": "Form 5695, Residential Energy Credits",
        "4562": "Form 4652, Depreciation and Amortization",
        "2848": "Form 2848, Power of Attorney",
        "8821": "Form 8821, Tax Information Authorization",
        "8": "Schedule 8812, Credits for Qualifying Children and Other Dependents",
        "940": "Form 940, Employer's Annual Federal Unemployment Tax Return",
        // Note: there is no 940-X -- 940 has an "Amended" checkbox
        "941": "Form 941, Employer's Quarterly Federal Tax Return",
        "941-X": "Form 941-X, Adjusted Employer's Quarterly Federal Tax Return",
        "1040": "Form 1040, US Individual Income Tax Return",
        "FEDERAL TAX RETURN": "Form 1040, US Individual Income Tax Return",
        "1040-X": "Form 1040-X, Amended U.S. Individual Income Tax Return",
        "AMENDED TAX RETURN": "Form 1040-X, Amended U.S. Individual Income Tax Return",
        "1065": "Form 1065, U.S. Return of Partnership Income",
        "1120": "Form 1120, US Corporation Income Tax Return",
        "1120-S": "Form 1120-S, US Income Tax Return for an S-Corporation",
        "1120S": "Form 1120-S, US Income Tax Return for an S-Corporation",
        "1065": "Form 1065, US Return of Partnership Income",
        "4868": "Form 4868, Extension of Time to File",
        "7004": "Form 7004, Extension of Time to File for Business",
        "2553": "Form 2553, Election by a Small Business Corporation",
        "8832": "Form 8832, Entity Classification Election",
        "843": "Form 843, Claim for Refund and Request for Abatement",
        "SS CARD": "Social Security Card",
        "3911": "Form 3911, Taxpayer Statement Regarding Refund",
        "14039": "Form 14039, Identity Theft Affidavit",
    },
    formPatterns: [
      	[/(?:Forms?|) *(SSA)[\- ]*(1099)[ ,.\-]([^]+?)$/i],
      	[/(?:Forms? *|)(1099|1095|1098|5498)[\- ]*(NEC|R|INT|DIV|MISC|Q|K|DA|S|SA|SSA|A|B|C|G|T|)[ ,.\-_]?(.*?)$/i],
        [/(?:Forms?|) *(W)[\- ]*(2|2G)[ ,.\-]([^]+?)$/i],
        [/(?:Federal|IRS|) *(?:Forms?|F|) *(1040-?X|1040(?![a-z]{2})|1041|940|941|1065|1120-?S|1120(?!-?S))()[ ,.\-]*([^]*?)$/i],
        [/(Federal Tax Return|Amended Tax Return)()[ ,.\-]*([^]*?)$/i],
        [/(?:Federal|IRS|) *(?:Schedule|Sch |f1040sc?) *([A-H1-3]|SE|8|K-?1)()[ ,.\-]?([^]*?)$/i, /(lead sheet|worksheet|wks|summary)/i],
        [/(?:Federal|IRS|) *(?:Schedule|Sch|Form|F|) *(\d{3,5})()[ ,.\-]?([^]*?)$/i],
        [/(SS Card)()([^]*?)$/],
    ],
    defaults: { // value to put in data-input if blank
        "Tax Form": () => {
            let ta = getInput("Tax Authority")?.value || "IRS";
            let form = (ta !== "IRS") ? (db.stateInfo[ta]?.poa || "") : "1040";
            return form;
        },
        "2848": () => {
            let ta = getInput("Tax Authority")?.value || "IRS";
            let poa = (ta !== "IRS") ? (db.stateInfo[ta]?.poa || "") : "2848";
            return poa;
        },
        "Representative": () => "Mary Keller",
        "Designation": () => "EA",
        "Pre-Consult Review": () => "- SSN digits? For which TP?\n- Fax number in notice?\n- Notice indicates ",
        /* does not work as a default for fields generated later
        "Tax Form": () => {
            let ta = taxAuth?.value || "IRS";
            let form = (ta !== "IRS") ? (db.stateInfo[ta]?.form || "") : "1040";
            return form;
        },*/
    },
    special: {
        // Special functions for handling/generating a value
        // for the given template variable
        "Case Name and Number": (val) => {
            let primTIN = getInput("Primary TIN");
            let taxAuth = getInput("Tax Authority");
            let taxYear = getInput("Tax Year");
            let ms = val.match(/\*([\d\-]{4,10})(?: \- \d{8}|) \- ([A-Z]+)\/(\d{2})/);
            console.log(ms)
            let tinTxt = ms ? ms[1] : null;
            tinTxt = tinTxt.length === 10 ? tinTxt : `XXX-XX-${tinTxt}`;
            let authTxt = ms ? ms[2] : null;
            authTxt = authTxt === "IRS" ? authTxt : (db.stateCode[authTxt] || authTxt);
            let yearTxt = ms ? ms[3] : null;
            yearTxt = yearTxt ? `20${yearTxt}` : null;
            primTIN.value = tinTxt || "";
            taxAuth.value = authTxt || "";
            taxYear.value = yearTxt || "";
            return val;
        },
        "Notice Date": (val) => {
            if (!val) { return }
            let d = new Date(val);
            let options = { year: 'numeric', month: 'long', day: 'numeric' };
            let txt = d.toLocaleDateString('en-US', options);
            if (txt.match(/Invalid Date/)) { return }
            noticeDate.value = txt;
            return txt;
        },
        "Case/Portfolio": (val) => {
            if (val && !val.match(/\{\{\{.+?\}\}\}/)) { return val }
            let pfNum = db.summData["Portfolio Number"]?.replace(/^[^]*?(\d{8})[^]*$/,"$1");
            let caseNN = db.summData["Case Name and Number"];
            if (!caseNN) { caseNN =  document.querySelector(`[data-input="Case Name and Number"]`)?.value }
            let caseNum = caseNN?.replace(/^(?:\[[^\]]+\]|) *[^\*]+\*[X\d\-]* - (\d{8})[^]*?$/,"$1");
            let name = caseNN?.replace(/^(?:\[[^\]]+\]|) *([^\*]+) \*[X\d\-]* - \d{8}[^]*?$/,"$1").trim();
            let txt = `${name} (${caseNum}), Portfolio - ${pfNum}`;
            if (txt.match(/undefined/)) { txt = null } // leave '{{{field name}}}'
            let parentElem = getInput("Case/Portfolio")?.parentElement?.parentElement;
            if (parentElem) {
                parentElem.remove();
            }
            return txt;
        },
        /*"Pre-Consult Review": (val) => {
            let indicates = val.match(/^- Notice (indicates .+?)$/m) || "";
            if (indicates !== "") {
                indicates = indicates[1];
                //indicates = fillValues(indicates,"inputs"); // changes {{{}}} before data-output
                let indHTML = loadOutputFields(indicates);
                let noticeIndicates = document?.getElementById("noticeIndicates") || null;
                //pcw.value = pcw.value.replace(/^- Notice indicates/m,`- Notice ${indicates}`);
                if (noticeIndicates) {
                    noticeIndicates.innerHTML = indHTML;
                }
                //console.log(pcw.value)
            }
            let notes = textToHTML(val, {isTemporary: false, doubleSpace: false});
            //let notes = val?.replace(/(\n)+/g, `</span></p><p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">`);
            return notes //`<p style="text-align: both;"><span style="font-family:Calibri; font-size: 12pt;">${notes}</span></p>`
            + `<p style="text-align: both;"><span style="font-family:Calibri; font-size: 12pt;">${signDate("jklueck")}</span></p>`;
        },*/
        "Pre-Consult Review": (val) => { //9.24.26
            let indicates = val.match(/^- Notice (indicates .+?)$/m) || "";
            let pcw = getInput("Pre-Consult Review");
            if (indicates !== "") {
                indicates = indicates[1];
                //indicates = fillValues(indicates,"inputs"); // changes {{{}}} before data-output
                let indHTML = loadOutputFields(indicates);
                //console.log(indicates)
                indicates = fillInText(indicates);
                let noticeIndicates = document?.getElementById("noticeIndicates") || null;
                pcw.value = val.replace(/^- Notice indicates.*/m,`- Notice ${indicates}`);
                if (noticeIndicates) {
                    noticeIndicates.innerHTML = indHTML;
                    fillOutputs("noticeIndicates");
                }
                //loadOutputField(html,name,value)
                //console.log(pcw.value)
            }
            let notes = textToHTML(val, {isTemporary: false, doubleSpace: false});
            //let notes = val?.replace(/(\n)+/g, `</span></p><p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">`);
            return notes //`<p style="text-align: both;"><span style="font-family:Calibri; font-size: 12pt;">${notes}</span></p>`
            + `<p style="text-align: both;"><span style="font-family:Calibri; font-size: 12pt;">${signDate("jklueck")}</span></p>`;
        },
        "Balance Due" : (val) => {
            if (!val) { return `{{{Balance Due}}}` }
            if (!val.match(/^\$/)) {
                val = "$"+val;
            }
            return fixAmounts(val);
        },
        /*"Tax Authority": (val) => {
            let inputs = db.summData;
            let taxAuths = {
                // if inputs get saved to db
                // their values can determine
                // what form is appropriate
                "IRS": () => {
                    if (document.getElementById("taxForm")) {
                        getInput("Tax Form").value = "1040";
                        return "1040";
                    }
                },
            };
            val = taxAuths[val] ? taxAuths[val]() : val;
            return val;
        },*/
        "Tax Form": (val) => {
            if (val === "") {
                val = (db.summData["Tax Authority"]?.match(/IRS/) && !isBusiness()) ? "1040" : `{{{Tax Form}}}`;
            }
            return val;
        },
        "TA Address": (val) => {
            //return textToHTML(val, {isTemporary: false, doubleSpace: false});
            let lines = val.split(/\n+/g);
            let arr = [];
            for (let l in lines) {
                let line = lines[l];
                line = `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">${line}</span></p>`;
                arr.push(line);
            }
            return arr.join("");
        },
        "Docs List": (val) => {
            //console.warn(val)
            //let test = textToHTML(val, {isTemporary: true, doubleSpace: false, testAlign: false});
            val = getTextLines(val) || val;
            let lines = val.split(/\n+/g);
            let arr = [];
            for (let l in lines) {
                let line = lines[l];
                let num = parseInt(l) + 1;
                line = `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;"><span id="docsListText${num}" class="unsure" style="font-style: italic; color: blue;">${line}</span></span></p>`;
                arr.push(line);
            }
            return arr.join("");
        },
        "Primary TIN": (tpTIN) => {
            //let newREline = "";
            let auth = db.summData["Tax Authority"] || "IRS";
            let elem = getInput("Primary TIN");
            let caseNN = getInput("Case Name and Number")?.value.trim().replace(/^[^*]+ \*([X\d\-]{4,10})[^]+$/,"$1");
            if (tpTIN === "") { tpTIN = caseNN || "" }
            let isBus = isBusiness();
            if (tpTIN?.length === 4 || tpTIN.match(/(?:^| )[X\d]{3}\-[X\d]{2}\-[X\d]{4}(?!\d)/)) {
                if (tpTIN.match(/[X\d]{3}\-[X\d]{2}\-[X\d]{4}/)) {
                    tpTIN = `SSN: ${tpTIN}`;
                } else {
                    tpTIN = `SSN: XXX-XX-${tpTIN}`;
                }
                if (elem) { elem.placeHolder = "ex. XXX-XX-1234" }
            } else if (isBus) {
                tpTIN = `EIN: ${tpTIN}`;
                if (elem) { elem.placeHolder = "ex. 98-7654321" }
            } else {
                tpTIN = `SSN: XXX-XX-XXXX`;
                if (elem) { elem.placeHolder = "ex. XXX-XX-XXXX" }
            }
            if (auth.match(/(California|Pennsylvania)/) && !isBus) {
                //if (secName?.value !== "") {
                tpTIN = `ACCOUNT: {{{Primary Account Number}}}`;
                if (preConsRvw?.value.match(/^- ACCOUNT: ([^]+?)$/m)) {
                    let acctId = preConsRvw.value.match(/^- ACCOUNT: ([^]+?)$/m);
                    tpTIN = acctId[1] ? `ACCOUNT: ${acctId[1]}` : tpTIN;
                }
                // and the same for Secondary, if present
                // but currently handled elsewhere (TODO: move here)
            } /*else if (!isBusiness) {
                // for any case where ACCOUNT: is in pcw, add ACCOUNT: to end of RE
                // (other than CA or PA individual)
                let value = "{{{Primary Account Number}}}";
                if (preConsRvw?.value.match(/^- ACCOUNT: ([^]+?)$/m)) {
                    let acctId = preConsRvw.value.match(/^- ACCOUNT: ([^]+?)$/m);
                    value = acctId[1];
                    newREline = addREline("Account",value).getHTML();
                }
            }*/
            /*let patt = db.patterns["Require full SSN"];
            let noteNum = db.summData["Notice Number"]?.match(patt); // (/(?:Letter|LTR|)[\- ]?(12C|3219|CP11|566|525)/i);
            noteNum = noteNum ? noteNum[1].trim().toUpperCase() : null;
            if (noteNum) {
                if (!isBusiness) {
                    tpTIN = "SSN: {{{Full SSN}}}";
                }
            }*/
            return tpTIN;
        },
        "Secondary Name": (val) => {
            if (!val) {
                document.getElementById("secondary_name_line")?.classList.add("hidden");
            }
            return val;
        },
        "Secondary TIN": (spTIN) => {
            //let newREline = "";
            let auth = getInput("Tax Authority")?.value || "IRS";
            let elem = document.querySelector(`[data-input="Secondary TIN"]`);
            //let spTIN = db.summData["Case Name and Number"]?.trim().replace(/^[^*]+ \*([X\d\-]{4,10})[^]+$/,"$1");
            if (spTIN?.length === 4 || spTIN.match(/XXX\-XX\-\d{4}/)) {
                if (spTIN.match(/XXX\-XX\-\d{4}/)) {
                    spTIN = `SSN: ${spTIN}`;
                } else {
                    spTIN = `SSN: XXX-XX-${spTIN}`;
                }
                if (elem) { elem.placeHolder = "ex. XXX-XX-1234" }
            } else {
                spTIN = `SSN: XXX-XX-XXXX`;
            }
            return spTIN;
        },
        "Notice Number": (val) => {
            updateNoticeType(val);
            fixAligns();
            return val;
        },
        "Name Merge": (val) => {
            val = nameMergeHandler(val);
            fixAligns();
            return val;
        },
        "Control Number": (val) => {
            if (!val) {
                let aur = db.summData["Reference #/AUR"]?.trim();
                if (!aur?.match(/n.a/)) {
                    val = aur;
                }
            }
            fixAligns();
            return val;
        },
       /* "Notice Type": (val) => {
            let type = db.summData["Notice Type"];
            let num = db.summData["Notice Number"];
            let typeField = noticeType;
            let numField = noticeNumber;
            if (type.match(/n.?a/i) && num.match(/n.?a/i)) {
                val = "{{{Notice Type}}}";
            } else if (!type.match(/n.?a/i) && num.match(/n.?a/i)) {
                val = type;
            } else if (type.match(/n.?a/i) && !num.match(/n.?a/i)) {
                val = num;
            } else if (!type.match(/n.?a/i) && !num.match(/n.?a/i)) {
                val = type + `</span></p><p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">NOTICE NUMBER:\t\t${num}`;
            }
            return val;
        },*/
        /*"Case Name and Number": (val) => {
            let parts = val.replace(/^([^*]+)\*([X\d\-]{4-10}) - (\d{8})$/);
            data["Case Name"] = parts[1];
            let tin = parts[2];
            data["Case Number"] = parts[3];
            if (tin.toString().length > 4) {
                data["EIN"] = tin;
            } else {
                data["SSN"] = tin;
            }
            return val;
        },*/
    },
    patterns: {
        "Require full SSN": /(?:^|[^\dL])(12C|3219(?![AN])|CP11|CP12|CP22A|CP23|CP24|CP71C|566|525|915)(?:[^\d]|$)/i,
        "Have Tax Examiner number": /(?:^|[^\dL])(566|525|729|915|3176C|3219(?![AN]))(?:[^\d]|$)/,
        "Have Tax Examiner name": /(3164-E|566-B|729|915)/,
        "Have reference number": /(?:^|[^\dL])(12C|96C|916C|915|3176C|3219(?![AN])|105C|324C|474C|387C)(?:[^\d]|$)/i,
        "Have control number": /(?:^|[^\dL])(12C|CP2501)(?:[^\d]|$)/i,
        //"Have fax number": /(566|525|12C|DTF-?(?:948|973|960-E|915))/i, // (not implemented)
        //"No fax number": /(CP23|CP162A|324C)/i, // (not implemented)
        //Sometimes fax: CP2000 (rarely fax?)
    },
    noticeTypes: {
        // any letters must be uppercase
        // when using 'body' property:
        // text marked as "unsure" must be wrapped in formatting <span>
        // which must include 'class="unsure"' and a unique id
        // so double-click can clear the format
        // ssnStatus codes:
            // F - full number
            // L - last 4
            // N - no number
            // A - notice asks for number (whole)
        // then:
            // P - Primary
            // S - Secondary
            // B - Both
        "CP05": { main: "Holding Return", ssnStatus: "N", indicates: "indicates that the IRS is reviewing the {{{Tax Year}}} Federal Tax Return to verify accuracy." },
        "CP05A": { main: "Information Request", hasFax: true, sub: "Holding Refund", indicates: "indicates that the IRS is holding the {{{Tax Year}}} refund and requesting supporting documentation to verify the income and Federal tax withholding reported." },
        "CP11": { main: "Error Correction", ssnStatus: "A", taAddress: "Department of the Treasury\nInternal Revenue Service\nKansas City, MO 64999-0010", indicates: "indicates that the IRS made changes to correct a purported error on the {{{Tax Year}}} Federal Tax Return, resulting in a balance due of {{{Balance Due}}}." },
        "CP12": { main: "Error Correction", ssnStatus: "A", taAddress: "Department of the Treasury\nInternal Revenue Service\nKansas City, MO 64999-0010", indicates: "indicates that the IRS made changes to correct a purported error on the {{{Tax Year}}} Federal Tax Return, resulting in a reduced refund of ${{{Refund Amount}}}." },
        "CP13": { main: "Tax Return Change", sub: "$0 Balance" },
        "CP14": { main: "Balance Due", sub: "Unpaid Taxes", indicates: "indicates that the IRS is assessing a balance due of {{{Balance Due}}} for tax year {{{Tax Year}}}." },
        "CP21A": { main: "Tax Return Change", sub: "Balance Due" },
        "CP21B": { 
            main: "Tax Return Change", 
            sub: "Refund",  
            hasFax: false,
            ssnStatus: "A",
            taAddress: "Department of the Treasury\nInternal Revenue Service\nKansas City, MO 64999-0010", 
            indicates: "indicates the IRS has made changes to the {{{Tax Year}}} Federal Tax Return based on information the taxpayer(s) provided." 
        },
        "CP22A": { 
            main: "Account Adjustment", 
            hasFax: false,
            ssnStatus: "A",
            taAddress: "Department of the Treasury\nInternal Revenue Service\nMail Stop C1 6525\nKansas City, MO 64999-0025", 
            indicates: "indicates the IRS has made changes to the {{{Tax Year}}} Federal Tax Return based on information the taxpayer(s) provided." 
         },
        "CP23": { 
            main: "Tax Return Change", 
            hasFax: false,
            taAddress: "Department of the Treasury\nInternal Revenue Service\nMail Stop C1 6525\nKansas City, MO 64999-0025", 
            sub: "Payments Made (Balance Due)", 
            indicates: "indicates that the IRS has made changes to the {{{Tax Year}}} Federal Tax Return to match the record of payments made." 
        },
        "CP24": { main: "Tax Return Change", sub: "Payments Made (may have a credit)", indicates: "indicates the IRS has made changes to the {{{Tax Year}}} Federal Tax Return to match the record of payments that were made." },
        "CP30": {
            main: "Penalty Assessed",
            sub: "Estimated Tax Penalty",
            ssnStatus: "A",
            indicates: "indicates that the IRS has increased the estimated tax penalty for {{{Tax Year}}} to ${{{Amount Due}}}.",
        },
        "CP59": { main: "Failure to File", hasFax: true, indicates: "indicates that the IRS did not receive the 2024 Federal Tax Return." },
        "CP60": { main: "Payments Removed", hasFax: false, ssnStatus: "AP", indicates: "indicates that the IRS has removed payments that they believe were incorrectly applied to the balance due for tax year {{{Tax Year}}}." },
        "CP71C": { main: "Balance Due Reminder", hasFax: false, indicates: "indicates that the IRS has issued a reminder of a balance due of {{{Balance Due}}} for tax year {{{Tax Year}}}." },
        "CP75": { 
            main: "Information Request", 
            hasFax: true, 
            indicates: "indicates the IRS is requesting documentation to verify the Earned Income Credit (EIC) claimed on the {{{Tax Year}}} Federal Tax Return.", 
            body: `<p style="text-align: justify;"><span id="cp75-1" class="unsure" style="font-family:Calibri; font-size: 12pt; font-style: italic; color: blue;">I claimed Head of Household status and have {{{Number of Dependents (word)}}} dependents: {{{Written List of Dep Names}}}. {{{General Statement About Dependents}}}To support these claims, I have enclosed birth certificates to identify the dependents and support the relationship requirement, as outlined in IRS Publication 596 (Earned Income Credit). In addition, Social Security cards are enclosed.</span></p><br><p style="text-align: justify;"><span id="cp75-2" class="unsure" style="font-family:Calibri; font-size: 12pt; font-style: italic; color: blue;">To further address the relationship test, I have included {{{List of Relationship Docs}}}. For the residency test, I have provided {{{List of Residency Docs}}}.</span></p><br><p style="text-align: justify;"><span id="cp75-3" class="unsure" style="font-family:Calibri; font-size: 12pt; font-style: italic; color: blue;">I respectfully request that the IRS review all provided documentation and allow the claims for the {{{List Credits}}}.</span></p>` 
        },
        "CP132": { main: "Information Request", hasFax: false, indicates: "indicates that the IRS corrected a purported miscalculation on the 2025 Form {{{Tax Form}}} for the {{{Name Merge}}}, resulting in a balance due of {{{Balance Due}}}." },
        "CP162A": { main: "Balance Due", hasFax: false, ssnStatus: "F", taAddress: "Department of the Treasury\nInternal Revenue Service\nOgden, UT 84201-0039", indicates: "indicates that the IRS is assessing a balance due of {{{Balance Due}}}." },
        "CP501": { main: "Balance Due", hasFax: false, indicates: "states that the IRS is sending a reminder about a balance due of {{{Balance Due}}} for the {{{Tax Year}}} tax year." },
        "CP503": { main: "Balance Due", sub: "Second Notice", ssnStatus: "N", indicates: "indicates that the IRS is assessing a balance due of {{{Balance Due}}} for tax year {{{Tax Year}}}." },
        "CP504": { main: "Balance Due", sub: "Final Notice", ssnStatus: "N", indicates: "indicates that the IRS is assessing a balance due of {{{Balance Due}}} for tax year {{{Tax Year}}}." },
        "CP2000": { 
            main: "Unreported Income", 
            variation: "Proposed Changes", 
            ssnStatus: "LB", 
            hasControlNum: true, 
            indicates: "indicates that the IRS has identified items that were not reported on the {{{Tax Year}}} Federal Tax Return." 
        },
        "CP2501": { main: "Tax Return Mismatch" },
        "CP5071": { main: "ID and Return Verification" },
        "CP5071F": { main: "ID and Return Verification" },
        "CP3219A": { main: "Notice of Deficiency", hasFax: false, ssnStatus: "L", indicates: "indicates that the IRS is proposing changes to the {{{Tax Year}}} Federal Tax Return based on information received from third parties." },
        "CP3219N": { main: "Notice of Deficiency", indicates: "indicates that the IRS did not receive a {{{Tax Year}}} Federal Tax Return so they have calculated the tax based on information from third parties." },
        "LT11": { main: "Notice of Intent to Levy", indicates: "indicates that the IRS is trying to collect unpaid balances on your {{{Tax Year}}} account." },
        "LT19": { main: "Balance Due", indicates: "indicates that the IRS is trying to collect unpaid balances on your {{{Tax Year}}} account." },
        "LT39": { main: "Overdue Balance", sub: "Missing Returns", indicates: "indicates that the IRS has issued an overdue balance reminder for tax year {{{Tax Year}}}." },
        "LTR 12C": { 
            main: "Information Request", 
            hasFax: true,
            hasReferNum: true,
            hasControlNum: true,
            ssnStatus: "AP",
            indicates: "indicates that the IRS is requesting more information to process the {{{Tax Year}}} Federal Tax Return.\n- Copy of Form 1040.\n- Amounts and dates of estimated payments.\n- Support for income and expenses.", 
            body: `<p style="text-align:center"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold;">Attn: ICO Rejects Team {{{Rejects Team}}} | Control #: {{{Reference #/AUR}}} | Batch: {{{Batch Number}}}</span></p>`
            + `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">Enclosed is a copy of the {{{Tax Year}}} Form 1095-A, Health Insurance Marketplace Statement. <span id="ltr12c-noEstPmts" class="unsure" style="font-family:Calibri; font-size: 12pt; font-style: italic; color: blue;">No estimated tax payments were made for {{{Tax Year}}}.</span> All documents reporting income and withholding are enclosed.</span></p><br><p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-style: italic; color: blue;">OR</span></p><br><p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">The notice states that the amounts reported on Form 8962 do not match information received from the Health Insurance Marketplace. Enclosed is the {{{Tax Year}}} Form 1095-A, Health Insurance Marketplace Statement, issued by {{{Policy Issuer}}}. Also enclosed is Form 8962, which was completed using the amounts reported on Form 1095-A.</span></p><br><p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">Please accept these as proof, process the {{{Tax Year}}} tax return, and <span id="ltr12c-refund" class="unsure" style="font-family:Calibri; font-size: 12pt; font-style: italic; color: blue;">issue the refund, as shown on the return</span>, without further delay.</span></p>`,
        },
        "LTR 105C": { main: "Claim Disallowed", hasFax: false, hasReferNum: true, ssnStatus: "L", indicates: "indicates that the IRS disallowed a claim for credit for the {{{Tax Year}}} tax year.", },
        "LTR 118C": {
            main: "Information Request", 
            hasFax: true,
            hasReferNum: true,
            hasControlNum: true,
            ssnStatus: "F",
            indicates: "indicates that the IRS is requesting more information to process the {{{Tax Year}}} Federal Tax Return.\n- Copy of Form 1040.\n- Amounts and dates of estimated payments.\n- Support for income and expenses.", 
            body: `<p style="text-align:center"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold;">Attn: ICO Rejects Team {{{Rejects Team}}} | Control #: {{{Reference #/AUR}}} | Batch: {{{Batch Number}}}</span></p>`,
        },
        "LTR 474C": { main: "Error Correction", hasReferNum: true, ssnStatus: "L", indicates: "indicates that the IRS made changes to correct purported errors on the {{{Tax Year}}} Federal Tax Return." },
        "LTR 3852C": { 
            main: "Entity Misclassification", 
            hasFax: true,
            hasReferNum: true,
            hasControlNum: true,
            ssnStatus: "F",
            taAddress: "Department of the Treasury\nInternal Revenue Service\nOgden, UT 84201-0034",
            taFaxNum: "(855) 214-7521",
            indicates: "indicates that the IRS has received Form 1120-S for tax year {{{Tax Year}}}, but that their records do not show that the business is an S-Corporation.",
        },
        "96C": { main: "Inquiry Response", hasFax: false, indicates: "indicates that the IRS has reviewed the account and determined {{{Determined What?}}}" },
        "324C": { main: "Information Request", hasFax: false },
        "474C": { main: "Tax Return Change", hasFax: false },
        "916C": { main: "Claim Incomplete for Processing" },
        "3164": { main: "Information Document Request" },
        "3176C": { 
            main: "Frivolous Return", 
            hasFax: true, 
            hasExaminerName: false, 
            hasExaminerNum: true, 
            hasReferNum: true,
            ssnStatus: "LP", 
            indicates: "indicates that the IRS reviewed the {{{Tax Year}}} Federal Tax Return and found one or more frivolous positions or that the Tax Return reflected a desire to delay or impede administration of the tax laws." 
        },
        "3219": { main: "Notice of Deficiency", indicates: "indicates that the IRS has issued a Notice of Deficiency for Tax Year {{{Tax Year}}}." },
        "5071C": { main: "ID and Return Verification" },
        "Letter 525": { 
            main: "Proposed Changes", 
            hasFax: true, 
            indicates: "indicates the IRS is auditing the {{{Tax Year}}} Federal Tax Return and is proposing changes that would result in a balance due of {{{Balance Due}}}." 
        },
        "Letter 525-T": { 
            main: "Proposed Changes", 
            hasFax: true,
            hasExaminerName: false,
            hasExaminerNum: true,
            ssnStatus: "F",
            indicates: "indicates the IRS is auditing the {{{Tax Year}}} Federal Tax Return and is proposing changes that would result in a balance due of {{{Balance Due}}}." 
        },
        "Letter 555": {
            main: "Notification of Findings",
            sub: "Tax Liability",
            hasFax: true,
            hasExaminerNum: true,
            ssnStatus: "F",
            indicates: "indicates that the IRS didn't change the previously proposed tax increase because the information sent doesn't justify a change.",
        },
        "Letter 566-B": { main: "Audit Notice", hasFax: true, indicates: "indicates that the IRS is auditing the {{{Tax Year}}} Federal Income Tax Return." },
        "Letter 566-S": { main: "Audit Notice", hasFax: true }, // often Schedule C (always?)
        "Letter 566-T": { main: "Audit Notice", hasFax: true, indicates: "indicates that the IRS is auditing the {{{Tax Year}}} Federal Income Tax Return." }, // (always?)
        "Letter 566-J": { main: "Audit Notice", hasFax: true, indicates: "indicates that the IRS is auditing the {{{Tax Year}}} Federal Income Tax Return." },
        "Letter 729": { 
            main: "Delinquent Return", 
            hasFax: true, 
            hasExaminerName: true, 
            hasExaminerNum: true,
            ssnStatus: "LP", 
            indicates: "indicates that the IRS has not received a tax return for the {{{Tax Year}}} tax year.", 
        },
        "Letter 915": { 
            main: "Examination Report Transmittal", 
            hasFax: true, 
            hasExaminerName: true, 
            hasExaminerNum: true, 
            indicates: "indicates that the IRS is providing an Examination Report for tax year {{{Tax Year}}}, which is proposing changes to the Federal Tax Return." 
        },
        // --- NY ---
        "DTF-948": { main: "Request for Information", hasFax: true, ssnStatus: "N", indicates: "indicates that the New York State Department of Taxation and Finance is requesting more information about the {{{Tax Year}}} NYS income tax return.", taAddress: "New York State\nDepartment of Taxation and Finance\nAudit Division-Personal Income Tax Desk\nP.O. Box 15270\nAlbany, NY 12212-5270", }, // NYS
        "DTF-960-E": { main: "Proposed Change", hasFax: true, ssnStatus: "LP", indicates: "indicates that the New York State Department of Taxation and Finance has identified a discrepancy between their records and the amount of Pass-Through Entity Tax (PTET) credit reported on the {{{Tax Year}}} New York State Income Tax Return.", },
        // --- CA ---
        "FTB 4734D": { main: "Tax Information and Document Request", indicates: "indicates that the State of California Franchise Tax Board has selected the {{{Tax Year}}} California income tax return for review." },
        "FTB 4502": { main: "Request for Information", hasFax: true, indicates: "indicates that the State of California Franchise Tax Board is requesting additional documentation to validate credits claimed on the {{{Tax Year}}} Form {{{Tax Form}}}." },
        "FTB 4963": { main: "Balance Due", ssnStatus: "N", hasFax: false, indicates: "indicates that the California Franchise Tax Board is assessing a balance due of {{{Balance Due}}} for tax year {{{Tax Year}}}." },
        "FTB 5818B": { main: "Withholding Adjustment", hasFax: true, indicates: "indicates that the California Franchise Tax Board made changes to the {{{Tax Year}}} CA Tax Return, resulting in a balance due of {{{Balance Due}}}.", },
        "FTB 5947B": { main: "Return Information", hasFax: false, indicates: "indicates that the State of California Franchise Tax Board has found an error on the {{{Tax Year}}} Form {{{Tax Form}}}, resulting in a balance due of {{{Balance Due}}}." },
        // --- IN ---
        "SF 56824": { main: "Proposed Assessment", hasFax: false, indicates: "states that the Indiana Department of Revenue is assessing a late payment penalty because the amount due for the {{{Tax Year}}} tax year was not paid by the extension due date." }, // IN
        // --- Misc ---
        "14039": { 
            main: "Identity Theft Affidavit", 
            hasFax: true,
            ssnStatus: "N",
            taAddress: "Department of the Treasury\nInternal Revenue Service\nFresno, CA 93725",
            taFaxNum: "(855) 807-5720", 
            indicates: "indicates that this correspondence reports a potential case of identity theft for the {{{Tax Year}}} tax year.", 
            body: `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">Attached is Form 14039, Identity Theft Affidavit, to report the incident to the IRS, as it appears that the taxpayer's personal information was used to fraudulently file Form {{{Tax Form}}}.</span></p><br><p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">We respectfully request that the IRS review the information provided, process Form 14039, and expedite the investigation so that this matter may be resolved.</span></p>`,
        },
        "RESUB": {
            main: "Resubmit Porfolio",
            body: `<p style="text-align: justify;"><span id="resub-1" class="unsure" style="font-family:Calibri; font-size: 12pt; font-style: italic; color: blue;">We submitted a response to the {{{Tax Authority}}} on {{{Portfolio Date}}}, requesting audit reconsideration, but never received a reply.</span></p><br><p style="text-align: justify;"><span id="resub-2" class="unsure" style="font-family:Calibri; font-size: 12pt; font-style: italic; color: blue;">My office recently followed up and was advised to resubmit a copy of the aforementioned {{{Portfolio Date}}} response.</span></p><p style="text-align: justify;"><span id="resub-3" class="unsure" style="font-family:Calibri; font-size: 12pt; font-style: italic; color: blue;">==OR==</span></p><p style="text-align: justify;"><span id="resub-4" class="unsure" style="font-family:Calibri; font-size: 12pt; font-style: italic; color: blue;">On {{{TRL Call Date}}}, I learned that the {{{Tax Authority}}} had not received the submission, so I am resubmitting a copy of the {{{Portfolio Date}}}, response referenced above.</span></p><br><p style="text-align: justify;"><span id="resub-5" class="unsure" style="font-family:Calibri; font-size: 12pt; font-style: italic; color: blue;">Please immediately review the enclosed information, {{{List of Demands}}}.</span></p>`,
        },
        "Maryland": { 
            "Tax Computation": { 
                ssnStatus: "LB", 
                taAddress: "Comptroller of Maryland\nRevenue Administration Division\n110 Carroll Street\nAnnapolis, MD 21411-0001", 
                indicates: "indicates that the State of Maryland made changes to the {{{Tax Year}}} Maryland Income Tax Return, resulting in a balance due of {{{Balance Due}}}.", 
            }
        },
    }, 
    stateInfo: {
        "IRS": { form: "1040", poa: "2848", ptrForm: "1065", scorpForm: "1120-S", corpForm: "1120" },
        "Alabama": { form: "Form 40" },
        "Arizona": { form: "Form 140" },
        "California": { form: "CA-540", poa:"3520-PIT", agency: "California Franchise Tax Board" },
        "Colorado": { form: "DR 0104", agency: "Colorado Department of Revenue" },
        "Connecticut": { form: "CT-1040" },
        "Delaware": { form: "PIT-RES", agency: "Division of Revenue" },
        "Georgia": { form: "Form 500", poa: "RD-1061", agency: "Georgia Department of Revenue" },
        "Hawaii": { form: "N-15" },
        "Idaho": { form: "Form 40" },
        "Illinois": { form: "IL-1040" },
        "Indiana": { form: "IT-40", poa: "POA-1" },
        "Kentucky": { form: "Form 740" },
        "Maryland": { form: "502", poa: "548", agency: "Comptroller of Maryland" },
        "Michigan": { form: "MI-1040", agency: "Michigan Department of Treasury" },
        "Minnesota": { form: "M1"},
        "Missouri": { form: "MO-1040" },
        "New Jersey": { form: "NJ-1040" },
        "New Mexico": { form: "PIT-1" },
        "New York": { form: "IT-201", poa: "POA-1", agency: "New York State Department of Taxation and Finance" },
        "North Carolina": { form: "D-400" },
        "Ohio": { form: "IT 1040" },
        "Oklahoma": { form: "Form 511" },
        "Oregon": { form: "OR-40" },
        "Pennsylvania": { form: "PA-40", poa: "REV-677" },
        "South Carolina": { form: "SC-1040" },
        "Utah": { form: "TC-40" },
        "Vermont": { form: "IN-111", agency: "Vermont Department of Taxes" },
        "Virginia": { form: "IT-140", agency: "Virginia Department of Taxation" },
        "West Virginia": { form: "IT-140", agency: "West Virginia Tax Division" },
        "Wisconsin": { form: "Form 1" },
    },
    templates: {
        "Pre-Consult Review": () => {
            // last name or business name with no spaces (to verify case when saving)
            // Word picks the first string of letters and numbers as the default name for the file
            let lastName = db.summData["Case Name and Number"]?.replace(/^([^*]+) (?:\*([X\d\-]+)|)[^]*$/,"$1") || null;
            lastName = lastName ? lastName.replace(/[ \-_,']/g,"") : null;
            let lnHTML = lastName ? `<p style="text-align: both;"><span style="font-family:Calibri; font-size: 12pt;">${lastName}</span></p>` : "";
            /*let notes = `- `;
            if (getInput("Pre-Consult Review")?.value) {
                notes = getInput("Pre-Consult Review").value.replace(/(\n)+/g, `</span></p><p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">`);
            }*/
            return `<section data-template="Pre-Consult Review">${lnHTML}<p style="text-align: both;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">Pre-Consult Review</span></p>`
            + `{{{Pre-Consult Review}}}<br><br>`
            + `<p style="text-align: both;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">Consult with Case Owner</span></p>`
            + `<p style="text-align: both;"><span style="font-family:Calibri; font-size: 12pt;"><span id="consultText" class="unsure" style="font-style: italic; color: blue;">{{{Case/Portfolio}}}: Thank you for the information. You provided everything I need. I have no questions. I will consider this our consult.</span></span></p>`
            + `<p style="text-align: both;"><span style="font-family:Calibri; font-size: 12pt;">${signDate("jklueck")}</span></p></section>`;
        },
        "Date": () => {
            let d = new Date();
            let options = { year: 'numeric', month: 'long', day: 'numeric' };
            return `<section data-template="Date">${d.toLocaleDateString('en-US', options)}</section>`;
        },
        "Secondary TP": (fta) => /*getInput("Secondary Name").value ? */`<p id="secondary_name_line" style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">${fta ? "" : "	"}{{{Secondary Name}}}		<span id="spTINText" class="unsure tp-align" style="font-style: italic; color: blue;">{{{Secondary TIN}}}</span></span></p>`,// : "",
        "Header": () => signed_POA?.checked ? `<section data-template="Header"><p style="text-align:center"><span style="font-family:Calibri; font-size: 18pt">[Use TPP letterhead]</span></p></section>` 
            : `<section data-template="Header"><p style="text-align:center"><span style="font-family:Calibri; font-size: 18pt">TAXPAYER NAME (S)</span></p>`
            + `<p style="text-align:center"><span style="font-family:Calibri; font-size: 12pt">ADDRESS</span></p>`
            + `<p style="text-align:center"><span style="font-family:Calibri; font-size: 12pt">PHONE			 EMAIL</span></p></section>`,
        "Date and TA Address": () => `<section data-template="Date and TA Address"><p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt">${today()}</span></p><br>`
            + `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;"><span id="taAddressText" class="unsure" style="font-style: italic; color: blue;">{{{TA Address}}}</span></span></p><br>`
            + `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;"><span id="taFaxText" class="unsure" style="font-style: italic; color: blue;">Fax: {{{TA Fax}}}</span></span></p></section>`,
        "RE Section": () => {
            let html = "";
            let newREline = "";
            let aur = db.summData["Reference #/AUR"];
            aur = aur?.match(/(n.?a|Not Applicable)/i) ? null : aur;
            let auth = db.summData["Tax Authority"] || "IRS";
            let isBusiness = false;
            let temps = {
                "IRS": `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">RE:	${isBusiness ? `{{{Name Merge}}}` : `{{{Primary Name}}}`}		<span id="tpTINText" class="unsure tp-align" style="font-style: italic; color: blue;">{{{Primary TIN}}}</span></span></p>
                    ${/*secName?.value === "" ? "" : */db.templates["Secondary TP"]()}<br>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">TAX FORM:			<span class="re-align">{{{Tax Form}}}</span></span></p>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">TAX YEAR:			<span class="re-align">{{{Tax Year}}}</span></span></p>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">NOTICE TYPE:			<span class="re-align">{{{Notice Type}}}</span></span></p>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">NOTICE NUMBER:		<span class="re-align">{{{Notice Number}}}</span></span></p>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">NOTICE DATE:			<span id="noticeDateText" class="re-align unsure" style="font-style: italic; color: blue;">{{{Notice Date}}}</span></span></p>${newREline}`,
                "New York": `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">RE:	${isBusiness ? `{{{Name Merge}}}` : `{{{Primary Name}}}`}		<span id="tpTINText" class="unsure tp-align" style="font-style: italic; color: blue;">{{{Primary TIN}}}</span></span></p>
                    ${secName?.value === "" ? "" : db.templates["Secondary TP"]()}<br>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">TAX FORM:			<span class="re-align">{{{Tax Form}}}</span></span></p>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">TAX YEAR:			<span class="re-align">{{{Tax Year}}}</span></span></p>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">NOTICE TYPE:			<span class="re-align">{{{Notice Type}}}</span></span></p>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">NOTICE NUMBER:		<span class="re-align">{{{Notice Number}}}</span></span></p>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">NOTICE DATE:			<span id="noticeDateText" class="re-align unsure" style="font-style: italic; color: blue;">{{{Notice Date}}}</span></span></p>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">CASE ID:			<span class="re-align">{{{Case ID}}}</span></span></p>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">DLN:				<span class="re-align">{{{DLN}}}</span></span></p>${newREline}`,
                "California": `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">RE:	${isBusiness ? `{{{Name Merge}}}` : `{{{Primary Name}}}`}		<span id="tpTINText" class="unsure tp-align" style="font-style: italic; color: blue;">{{{Primary TIN}}}</span></span></p>
                    ${secName?.value === "" ? "" : db.templates["Secondary TP"]()}<br>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">TAX FORM:			<span class="re-align">{{{Tax Form}}}</span></span></p>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">TAX YEAR:			<span class="re-align">{{{Tax Year}}}</span></span></p>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">NOTICE TYPE:			<span class="re-align">{{{Notice Type}}}</span></span></p>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">NOTICE NUMBER:		<span class="re-align">{{{Notice Number}}}</span></span></p>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">NOTICE DATE:			<span id="noticeDateText" class="re-align unsure" style="font-style: italic; color: blue;">{{{Notice Date}}}</span></span></p>
                    <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">DLN:				<span class="re-align">{{{DLN}}}</span></span></p>${newREline}
                    ${isBusiness ? `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">ENTITY CORP ID:		<span class="re-align">{{{Corp ID}}}</span></span></p>` : "" }`,
            };
            if (temps[auth]) {
                html = temps[auth];
            } else {
                html = temps["IRS"];
            }
            let noticeNum = getInput("Notice Number")?.value;
            let hasCtrlNum = noticeNum ? db.noticeTypes[noticeNum]?.hasControlNum : false;
            if (aur || hasCtrlNum /*|| noticeNum?.match(patt2)*/) {
                html += `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold"><span id="ctrlNumText" class="unsure" style="font-style: italic; color: blue;">CONTROL NO.</span>:			<span class="re-align">{{{Control Number}}}</span></span></p>`;
            }
            if (preConsRvw?.value.match(/^- [^:]{2,16}: [^]+?$/gmi)) {
                let pcwMatches = preConsRvw?.value.matchAll(/^- ([^:]{2,16}): ([^]+?)$/gmi);
                let arr = [...pcwMatches];
                // for each: `<p><span>($1).toUpperCase()</span>        <span>$2</span></p>`
                // add after last RE line
                // the challenge is telling it where RE ends
            }
            return `<section data-template="RE Section">${html}</section>`;
        },
        "RE Section FTA": () => {
            let tpTIN = db.summData["Case Name and Number"]?.trim().replace(/^[^*]+ \*([X\d\-]{4,10})[^]+$/,"$1");
            let isBusiness = false;
            if (tpTIN?.length === 4) {
                tpTIN = `SSN: XXX-XX-${tpTIN}`;
            } else if (tpTIN?.length === 10) {
                tpTIN = `EIN: ${tpTIN}`;
                isBusiness = true;
            } else {
                tpTIN = `SSN: XXX-XX-XXXX`;
            }
            return `<section data-template="RE Section"><p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">RE: Request For Abatement of Penalties</span></p><br>
                <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">${isBusiness ? `{{{Name Merge}}}` : `{{{Primary Name}}}`} 		<span id="tpTINtext" class="unsure tp-align" style="font-style: italic; color: blue;">${tpTIN}</span></span></p>
                ${secName?.value === "" ? "" : db.templates["Secondary TP"](true)}<br>
                <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">Type of Tax:			<span class="tp-align">${isBusiness ? "Form {{{Tax Form}}}, {{{Tax Form Title}}}" : "Form 1040, US Individual Income Tax Return"}</span></span></p><br>
                <p style="text-align: justify;">`
                    +`<span style="font-family:Calibri; font-size: 12pt; text-decoration: underline; font-weight: bold">Tax Period(s):</span>		<span class="fta-align" style="font-family:Calibri; font-size: 12pt; text-decoration: underline; font-weight: bold">Applicable Penalties:</span>`
                +`</p><p style="text-align: justify;">`
                    +`<span style="font-family:Calibri; font-size: 12pt; font-weight: bold">{{{Tax Year List}}}</span>			<span class="fta-align" style="font-family:Calibri; font-size: 12pt; font-weight: bold">{{{Penalty List}}}</span></p></section>`
        },
        "Opening": () => {
            let tpTIN = db.summData["Case Name and Number"]?.trim().replace(/^[^*]+ \*([X\d\-]{4,10})[^]+$/,"$1");
            let isPOA = () => { 
                let cls = document.getElementById("signed_POA").checked ? "" : ` class="hidden"`;
                return `<span id="poaText"${cls}>I am writing on behalf of {{{Name Merge}}}, as an authorized representative pursuant to the Power of Attorney (Form {{{2848}}}) on file. </span>`;
            };
            /*document.getElementById("signed_POA").addEventListener("change", (e) => {
                let poaText = document.getElementById("poaText");
                if (poaText) {
                    poaText.outerHTML = isPOA();
                }
            })*/
            let isBusiness = (tpTIN?.length === 10)? `My name is {{{Primary Name}}}, and I am writing on behalf of {{{Name Merge}}}` : null;
            let intro = isPOA() + "This letter is";
            if (isBusiness) {
                intro = isPOA() + isBusiness;
            }
            //console.log(inputs["Notice Number"])
            let noticeNum = db.summData["Notice Number"];
            let numPatt = db.patterns["Have Tax Examiner number"];
            let hasNumber = db.noticeTypes[noticeNum]?.hasExaminerNum;
            let namePatt = db.patterns["Have Tax Examiner name"];
            let hasName = db.noticeTypes[noticeNum]?.hasExaminerName;
            let reference = db.noticeTypes[noticeNum]?.hasReferNum ? ` (reference #: {{{Refer Number}}})` : "";
            let pcw = getInput("Pre-Consult Review")?.value;
            let toLine = "To Whom It May Concern:";
            if (noticeNum?.match(numPatt) || hasNumber) {
                toLine = "To Tax Examiner ({{{Examiner ID}}}):";
            }
            if (noticeNum?.match(namePatt) || hasName /*|| reference !== ""*/) {
                toLine = "To {{{Examiner Name}}} ({{{Examiner ID}}}):";
            }
            if (pcw?.match(/^- ([Pp]erson to [Cc]ontact|[Aa]uditor|[Tt]ax [Ee]xaminer|[Rr]evenue [Aa]gent|TA|RA):/m)) {
                let name = preConsRvw.value.match(/^- (?:[Pp]erson to [Cc]ontact|[Aa]uditor|[Tt]ax [Ee]xaminer|[Rr]evenue [Aa]gent|TA|RA): ([^]+?)\.? *$/m);
                toLine = name[1] ? `To ${name[1]} (#{{{Examiner ID}}}):` : toLine;
            }
            let indicates = pcw?.match(/^- Notice (indicates [^]+?)$/m) || "";
            if (indicates !== "") {
                indicates = indicates[1];
            }
            return `<section data-template="Opening"><p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">${toLine}</span></p><br>
            <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">${intro} in response to the {{{Tax Authority}}} Notice dated <span id="noticeDateText" class="unsure" style="font-style: italic; color: blue;">{{{Notice Date}}}</span>${reference}, which <span id="noticeIndicates">${indicates}</span></span></p></section>`;
        },
        "Letter Body": (inputs) => {
            let noticeNum = db.summData["Notice Number"];
            let extraBody = db.noticeTypes[noticeNum]?.body || "";
            extraBody = extraBody !== "" ? extraBody + "<br>" : "";
            let expedite = (db.summData["expedited"] || db.summData["Special Portfolio Needs"] === "Expedite") ? `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-style: italic; color: red; font-weight: bold;">EXPEDITED PORTFOLIO</span></p><br>` : "";
            let body = extraBody + expedite + db.templates["Case Summary"]();
            return `${db.templates["Opening"](inputs)}<br>`
            + `<section data-template="Letter Body">${body}`
            + `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">We respectfully request that you review the information provided and process the return as filed.</span></p></section>`;
        },
        "Case Summary": () => {
            let caseStrong = db.summData["Case Strength"]?.trim() || "";
            let strongExplain = db.summData["Explain rationale for strength"]?.trim() || db.summData["Case Strength Explanation"];
            if (strongExplain && !strongExplain.match(/^\s*(n\/*a|not applicable|unknown)\s*$/i)) {
                caseStrong = `${caseStrong}: ${strongExplain}`;
            }
            caseStrong = addTags(caseStrong);
            let summarize = db.summData["Summarize important contacts"] || db.summData["Important Communication"];// ? addTags(inputs["Summarize important contacts"]) : "";
            let summary = db.summData["Summary"] || db.summData["Case Summary"];// ? addTags(inputs["Summary"]) : "";
            let law = db.summData["Relevant Law/Regulation"];// ? addTags(inputs["Relevant Law/Regulation"]) : "";
            let caseNotes = db.summData["=== CASE NOTES ==="] || db.summData["Case Notes"];// ? addTags(inputs["=== CASE NOTES ==="]) : "";
            let bodyItems = [
                doPrint("CASE STRENGTH",caseStrong),
                doPrint("SUMMARIZE IMPORTANT CONTACTS",summarize),
                doPrint("SUMMARY",summary),
                doPrint("RELEVANT LAW/REGULATION",law),
                doPrint("CASE NOTES",caseNotes),
            ];
            let cs = bodyItems.join("");
            return cs;
        },
        "Enclosed and Closing": () => {
            return `${db.templates["Enclosed"]()}<br>${db.templates["Closing"]()}`;
        },
        "Enclosed": () => {
            return `<section data-template="Enclosed"><p style="text-align: both;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold; text-decoration: underline;">Enclosed are the following documents for your review:</span></p><br>
            {{{Docs List}}}</section>`
        },
        "Closing": () => {
            let tpTIN = db.summData["Case Name and Number"]?.trim().replace(/^[^*]+ \*([X\d\-]{4,10})[^]+$/,"$1");
            let closing = db.templates["Closing Taxpayer"]();
            if (signed_POA.checked) {
                closing = db.templates["Closing POA"]();
            } else if (tpTIN?.length === 10) {
                closing = db.templates["Closing Business"]();
            }
            return `<section data-template="Closing"><p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">If you are aware of any additional information needed to complete this matter, please reach out as soon as possible. Thank you for your help in resolving this matter.</span></p><br>
            <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">Sincerely,</span></p><br>
            ${closing}</section>`;
        },
        "Closing Taxpayer": () => `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">{{{Name Merge}}}</span></p>`,
        "Closing POA": () => `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">{{{Representative}}}, {{{Designation}}}</span></p>
            <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">Power of Attorney</span></p>
            <p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">Tax Protection Plus</span></p>`,
        "Closing Business": () => `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt;">{{{Primary Name}}}, {{{Primary Title}}} - {{{Name Merge}}}</span></p>`,
        "Full Cover Letter": () => `{{{!Pre-Consult Review}}}<br>{{{!Header}}}<br>{{{!Date and TA Address}}}<br>{{{!RE Section}}}<br>{{{!Letter Body}}}<br>{{{!Enclosed and Closing}}}`,
    },
};

db.noticeTypes["12C"] = db.noticeTypes["LTR 12C"]; // alias
db.noticeTypes["105C"] = db.noticeTypes["LTR 105C"]; // alias
db.noticeTypes["118C"] = db.noticeTypes["LTR 118C"]; // alias
db.noticeTypes["474C"] = db.noticeTypes["LTR 474C"]; // alias
db.noticeTypes["916C"] = db.noticeTypes["LTR 916C"]; // alias
db.noticeTypes["3852C"] = db.noticeTypes["LTR 3852C"]; // alias
db.noticeTypes["525"] = db.noticeTypes["Letter 525"]; // alias
db.noticeTypes["525-T"] = db.noticeTypes["Letter 525-T"]; // alias
db.noticeTypes["531"] = db.noticeTypes["Letter 531"]; // alias
db.noticeTypes["555"] = db.noticeTypes["Letter 555"]; // alias
db.noticeTypes["566-B"] = db.noticeTypes["Letter 566-B"]; // alias
db.noticeTypes["566-S"] = db.noticeTypes["Letter 566-S"]; // alias
db.noticeTypes["566-T"] = db.noticeTypes["Letter 566-T"]; // alias
db.noticeTypes["566-J"] = db.noticeTypes["Letter 566-J"]; // alias
db.noticeTypes["729"] = db.noticeTypes["Letter 729"]; // alias
db.noticeTypes["915"] = db.noticeTypes["Letter 915"]; // alias
db.noticeTypes["3219"] = db.noticeTypes["Letter 3219"]; // alias
