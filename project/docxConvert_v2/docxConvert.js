/* NOTE ON RESETTING PAGE SIZE TO LETTER

new Document({
    sections: [{

        properties:{page:{size:{height: (279/25.4)*72*20,width:(216/25.4)*72*20,},},},

            children: docx_elements,
        }], ...

Insert 'properties' at: Ln 253, Col 3810 in docshift.min.js
(between "sections:[{" and "children:")
*/
db.snippets = pipeKeys?.snippets;
db.funcs = pipeKeys?.funcs;
/*
let summarize = inputs["Summarize important contacts with IRS/state client or third parties. Include dates and substance (for reference) if applicable."];
let summary = inputs["Summary"];
let law = inputs["Relevant Law/Regulation"];
let docList = inputs["List supporting documents provided explaining relevance to disputed issues (e.g. how the business deduction is ordinary and necessary to operate the business)"];
*/
//When loaded via CDN, the library is available as a global variable window.docshift

async function fileToHTML() {
    // Convert DOCX to HTML
    let output = document.getElementById("output");
    let id = "output"; // for 'fillOutputs' below
    let html = output.innerHTML;
    if (html === "") { // build the template page
        html = db.htmlContent || db.templates["Full Cover Letter"]();
        /*let docxFile = document.getElementById('docpicker').files[0];
        if (docxFile) {
            html = await docshift.toHtml(docxFile);
        }*/
        let ms = html.matchAll(/(<\/(?:p|ol|ul)>)(<(?:p|ol|ul))/g);
        ms = [...ms];
        for (let m in ms) {
            let mtch = ms[m];
            html = html.replace(mtch[0],`${mtch[1]}<br>${mtch[2]}`);
        }
        html = html.replace(/"font-size:/g,"\"font-family:Calibri; font-size:")
            .replace(/"text-align: ?(both|justify)/g,"\"line-height: 1.28; text-align: justify");
        html = fillTemplates(html);
        html = loadOutputFields(html); // converts {{{}}} to <span data-output>{{{}}}</span>
        output.innerHTML = html;
        //return;
    }
    setDefaultValues();
    db.summData = getSummaryData(summ.value);
    /*db.inputValues =*/ getInputValues();
    //updateNoticeType();
    loadInputFields(html); // create additional inputs, based on {{{}}}
    //html = loadOutputFields_old(html);
    //autoFillFields();
    //updateOtherItems();
    setSaveName();
    output.innerHTML = html;
    html = fillOutputs(id).innerHTML;
    html = loadOutputFields(html); // converts {{{}}} to "data-output"
    if (!db.inputKeyupListener) {
        document.addEventListener("keyup", (e) => { 
            if (e.target.tagName !== "TEXTAREA") { updateFromInput(e.target) }
        });
        db.inputKeyupListener = true;
    }
    html = fixDates(html);
    html = fixAmounts(html);
    output.innerHTML = html; //fillValues(html,inputs,templates);
    setUnsureStyles(); // changes style set by template to reflect user changes
    fixAligns();
}

document.addEventListener("focusout", (e) => {
    let name = e.target.getAttribute("data-input");
    if (!name) { return }
    let inValue = e.target.value;
    let outValue = inValue;
    if (inValue === "") {
        outValue = `{{{${name}}}}`;
    } else {
        let value = inValue;
        value = fixDates(value);
        value = fixAmounts(value);
        value = fixPhone(value);
        inValue = value;
        outValue = value;
    }
    if (db.special[name]) {
        outValue = db.special[name](inValue) || `{{{${name}}}}`;
    }
    db.summData[name] = inValue;
    e.target.value = inValue;
    let outs = document.querySelectorAll(`[data-output="${name}"]`);
    if (!outs) { return }
    for (let out of outs) {
        if (isHTML(outValue)) {
            out.innerHTML = outValue;
        } else {
            out.innerText = outValue;
        }
    }
});

function getInput(name) {
    let inpElem = document.querySelector(`[data-input="${name}"]`);
    return inpElem;
}

function getOutput(name) {
    let outElems = document.querySelectorAll(`[data-output="${name}"]`);
    let data = {
        setValue: (value) => outElems.forEach((ea) => { 
            if (isHTML(value)) {
                ea.innerHTML = value;
            } else {
                ea.innerText = value;
            }
        }),
        getElems: () => outElems,
    };
    return data;
}

function fillInText(text) {
    let patt = /\{\{\{([^}]+)\}\}\}/g;
    let outs = text.matchAll(patt);
    outs = [...outs];
    for (let o in outs) { 
        let varText = outs[o][0];
        let name = outs[o][1];
        let fill = getInput(name)?.value;
        if (db.special[name]) {
            fill = db.special[name](fill) || `{{{${name}}}}`;
        }
        if (!fill) { continue } // will leave '{{{field name}}}' in text
        let patt2 = new RegExp(varText.replace(/[{}()\[\]\-.*?!:$/\\|]/g,"\\$&"),"g")
        text = text.replace(patt2,fill);
    }
	return text;
}

function updateNoticeType(num) {
    num = num || noticeNumber?.value; // give input value priority
    let type = noticeType?.value;
    let types = db.noticeTypes;
    //console.log(type)
    let pcw = getInput("Pre-Consult Review");
    let indicates = pcw?.value.match(/^- Notice (indicates .+?)$/m) || "";
    let faxNote = pcw?.value.match(/^- Fax number in notice\?$/m);
    let taAdd = document.querySelector(`[data-input="TA Address"]`);
    let taFaxNum = document.querySelector(`[data-input="TA Fax"]`);
    if (type === "" || type.trim().match(/^n.?a$/im) || type === num) {
        noticeType.value = ""; // clear out 'n/a' or dupe value
    }
    let arr = [];
    for (let i in types) {
        let testName = i;
        let issue = types[i]?.main;
        let hasFax = types[i]?.hasFax;
        let ssnStatus = types[i]?.ssnStatus;
        if (num.toUpperCase() === testName.toUpperCase() && issue) {
            //console.log(types[i])
            if (!arr.includes(issue)) { arr.push(issue) }
            if (indicates === "" && types[i]?.indicates) {
                indicates = types[i].indicates;
                indicates = fillValues(indicates,"inputs");
                //let indText = indicates;
                indicates = loadOutputFields(indicates);
                let noticeIndicates = document?.getElementById("noticeIndicates") || null;
                pcw.value = pcw.value.replace(/^- Notice indicates/m,`- Notice ${indicates}`);
                if (noticeIndicates) {
                    noticeIndicates.innerHTML = indicates;
                }
                //console.log(pcw.value)
            }
            if (taAdd && taAdd.value === "") {
                taAdd.value = types[i]?.taAddress || "";
            }
            if (taFaxNum && taFaxNum.value === "") {
                taFaxNum.value = types[i]?.taFaxNum || "";
            }
            let faxWarn = document.getElementById("faxWarn");
            let fwTxt = hasFax ? " - Look for fax." : " - Don't expect fax.";
            let cls = hasFax ? "green" : "red";
            if (faxNote && hasFax) {
                pcw.value = pcw.value.replace(/^- Fax number in notice\?$/m,"- Fax number in notice.");
            } else {
                pcw.value = pcw.value.replace(/^- Fax number in notice\?$/m,"- No fax number in notice.");
            }
            if (!faxWarn) {
                taFax.previousElementSibling.innerHTML += `<span id="faxWarn" class="${cls}">${fwTxt}</span>`;
            } else {
                //faxWarn.remove();
                faxWarn.innerText = fwTxt;
                if (hasFax) {
                    faxWarn.classList.remove("red")
                    faxWarn.classList.add("green");
                } else {
                    faxWarn.classList.remove("green")
                    faxWarn.classList.add("red");
                }
            }
            if (ssnStatus) {
                handleSSNNotes(ssnStatus);
            }
        }
    }
    if (arr.length > 0) {
        //console.log(noticeType.value.length);
        if (noticeType.value === "") {
            noticeType.value = arr.join(" / "); 
        }
    }
}

function loadInputFields(html) {
    if (!html) { return }
    let vars = html.matchAll(/\{\{\{(?!\!)([^}]+)\}\}\}/g);
    vars = [...vars];
    for (let v in vars) { // [[{{{A}}},"A"],[{{{B}}},"B"],[...]]
        let vr = vars[v]; // [{{{A}}},"A"]
        let vn = vr[1]; // "A"
        if (document.querySelector(`[data-input="${vn}"]`)) { continue }
        if (db.summTitles.includes(vn)) { continue }
        if (db.summData[vn] && db.summData[vn] !== "") { continue }
        let tr = document.createElement("tr");
        let label = document.createElement("td");
        label.innerText = vn;
        let fieldData = document.createElement("td");
        let input = document.createElement("input");
        if (vn.match(/List/)) { input = document.createElement("textarea") }
        let arr = vn.toLowerCase().split(/[\/_\- ]/g);
        let id = arr[0];
        arr.map((str,i) => {
            if (i === 0) { return }
            str = str.charAt(0).toUpperCase() + str.slice(1);
            id += str;
        });
        input.id = id;
        input.placeholder = vn;
        input.setAttribute("data-input",vn);
        fieldData.appendChild(input);
        tr.appendChild(label);
        tr.appendChild(fieldData);
        document.getElementById("fields").appendChild(tr);
    }
    return html;
}

function loadOutputField(html,name,value) {
    if (!name) { return }
    let varText = `{{{${name}}}}`;
    let outElem = document.querySelector(`[data-output="${name}"]`);
    let inpElem = document.querySelector(`[data-input="${name}"]`);
    inpElem.value = value;
    value = value || varText;
    if (outElem && inpElem) {
        updateFromInput(inpElem);
        return outElem;
    } else if (!outElem) {
        let fill = `<span data-output="${name}">${value}</span>`;
        let patt = new RegExp(varText.replace(/[{}()\[\]\-.*?!:$/\\|]/g,"\\$&"),"g");
        html = html.replace(patt,fill);
    }
    return html;
}

function loadOutputFields(html) {
    let vars = html.matchAll(/\{\{\{(?!\!)([^}]+)\}\}\}/g);
    vars = [...vars];
    for (let v in vars) { // [[{{{A}}},"A"],[{{{B}}},"B"],[...]]
        let vr = vars[v]; // [{{{A}}},"A"]
        let name = vr[1]; // "A"
        let varText = vr[0];
        let tag = "span";
        if (document.querySelector(`[data-output="${name}"]`)) { continue }
        if (db.summTitles.includes(name)) { continue }
        if (getInput(name)?.tagName === "TEXTAREA") { tag = "div" }
        let fill = `<${tag} data-output="${name}">${varText}</${tag}>`;
        let patt = new RegExp(varText.replace(/[{}()\[\]\-.*?!:$/\\|]/g,"\\$&"),"g");
        html = html.replace(patt,fill);
    }
    //document.addEventListener("keyup", (e) => {
        //updateFromInput(e.target);
        /*let name = e.target.getAttribute("data-input");
        if (!name) { return }
        let outs = document.querySelectorAll(`[data-output="${name}"]`);
        if (!outs) { return }
        for (let out of outs) {
            let value = e.target.value || `{{{${name}}}}`;
            value = db.special[name](value);
            out.innerText = value;
            db.summData[name] = value;
        }*/
    //});
    return html;
}

function updateFromInput(elem) {
    let name = elem?.getAttribute("data-input");
    if (!name) { return }
    let tag = elem?.tagName;
    let outs = document.querySelectorAll(`[data-output="${name}"]`);
    if (!outs) { return }
    let value = elem.value.trim() || "";
    //let specVal = (db.special[name] && value) ? db.special[name](value) : (value || `{{{${name}}}}`);
    let specVal = db.special[name] ? (db.special[name](value) || `{{{${name}}}}`) : (value || `{{{${name}}}}`);
    // (may need to allow db.special to process !value to allow 
    // for corrections due to deleting the value from the input)
    db.summData[name] = value.trim();
    for (let out of outs) {
        out.innerHTML = specVal;
    }
}

function autoFillFields() {
    // consider creating a db object to loop through
    if (document.getElementById("taxAuth")?.value !== "") {
        if (document.querySelector("[data-input='Tax Form']")?.value.match(/(^$|n.?a)/i)) {
            let taValue = document.getElementById("taxAuth").value;
            if (isBusiness()) { return } // TODO: add .ptrForm, .scorpForm, .corpForm
            let tfValue = db.stateInfo[taValue]?.form || "";
            let elem = document.querySelector("[data-input='Tax Form']");
            elem.value = tfValue;
        }
    }
}

function updateOtherItems() {
    let taField = document.querySelector("[data-input='Tax Authority']");
    let taName = taField?.value;
    let tfField = document.querySelector("[data-input='Tax Form']");
    let form = tfField?.value;
    let poaField = document.querySelector("[data-input='2848']");
    if (taName !== "IRS" && taName !== "") {
        let poaForm = db.stateInfo[taName]?.poa || "";
        poaField.value = poaForm;
    }
    if (form?.match(/1120-?S/)) {
        //"Tax Form Title" = "US Income Tax Return for an S Corporation"
        //"Tax Year List" = "Tax Year" (with mods if multiple)
        //"Entity Type" = "S-Corporation"
        //"Failure to File Penalty and/or Failure to Pay" = "Penalty List" (with mods)
    }
}

function isBusiness() {
    let tpTIN = document.querySelector("[data-input='Case Name and Number']")?.value.trim().replace(/^[^*]+ \*([X\d\-]{4,10})[^]+$/,"$1");
    let isBusiness = tpTIN?.length === 10 ? true : false;
    return isBusiness;
}

function isHTML(value) {
    // returns boolean
    return !!value?.match(/(<br>|<[^>]+?>[^]*?<\/[^>]+?>)/);
}

function fillValues(html,type) {
    //templates = {"paragraph": (inputs) => `whole paragraph, filled with {{{button}}}s.`,}
	//inputs = {"button": "grey rectangle"};
    let types = {
        "templates": [db.templates,/\{\{\{\!([^}]+)\}\}\}/g],
        "inputs": [db.summData,/\{\{\{([^}]+)\}\}\}/g], //db.inputValues
    }; // types[type]
    let fills = types[type][0]; // db.templates / db.inputValues
    let patt = types[type][1]; // '!' pattern / no '!' pattern
    //console.log(patt)
    let temps = html.matchAll(patt);
    temps = [...temps];
    //console.log(temps)
    for (let t in temps) { // vars =[[{{{A}}},"A"],[{{{B}}},"B"],[...]]
        let tr = temps[t]; // vars[0] = [{{{A}}},"A"]
        let tn = tr[1]; // vars[0][1] = "A"
        let fill = typeof fills[tn] === "function" ? fills[tn](db.summData) : fills[tn];
        if (db.special[tn] && type !== "templates") {
            fill = db.special[tn](fill) || `{{{${tn}}}}`;
        }
        if (!fill) { continue } // will leave '{{{field name}}}' in text
        let patt2 = new RegExp(tr[0].replace(/[{}()\[\]\-.*?!:$/\\|]/g,"\\$&"),"g")
        html = html.replace(patt2,fill);
    }
	return html;
}

function fillOutputs(id) { // 9.22.26
    let context = document.getElementById(id) || document.getElementById("output");
    let outs = context.querySelectorAll(`[data-output]`);
    for (let out of outs) {
        let name = out.getAttribute("data-output");
        let inp =  getInput(name);
        if (!inp) {
            getOutput(name).setValue(db.summData[name] || `{{{${name}}}}`)
        } else {
            updateFromInput(inp);
        }
    }
    return context;
}

function fillTemplates(html) { // 9.18.26
    let fills = db.templates;
    let patt = /\{\{\{\!([^}]+)\}\}\}/g;
    let temps = html.matchAll(patt);
    temps = [...temps];
    for (let t in temps) { 
        let tr = temps[t];
        let tn = tr[1];
        //console.log(tn)
        let inValues = db.summData || {};
        let fill = fills[tn](inValues);
        if (!fill) { continue } // will leave '{{{!Template Name}}}' in text
        let patt2 = new RegExp(tr[0].replace(/[{}()\[\]\-.*?!:$/\\|]/g,"\\$&"),"g")
        html = html.replace(patt2,fill);
    }
	return html;
}

function fixAligns() {
    let aligns = {"tp-align": 0, "re-align": 0, "fta-align": 0 };
    for (let c in aligns) {
        let elems = document.querySelectorAll(`.${c}`);
        if (elems.length < 2) { continue }
        let ct = 0;
        for (let elem of elems) {
            //let elem = elems[el];
            if (!elem instanceof Element) { continue }
            //console.log(elem)
            let tabNode = elem.previousSibling;
            let indent = elem.getBoundingClientRect().left;
            //console.log("id = "+elem.id+"\nclassList = "+elem.classList+"\nindent = " +indent)
            //console.log(indent+" < "+aligns[c]+" = "+(indent < aligns[c]))
            if (ct === 0) {
                // log rect.left value
                aligns[c] = indent;
                //console.log("First Element")
            } else if (indent < aligns[c]) {
                // if current elem is left of first elem
                // add a tab before elem
                tabNode.nodeValue += "\t";
                let newIn = elem.getBoundingClientRect().left;
                let tabWidth = newIn - indent;
                if (newIn < aligns[c]) {
                    // if still not aligned
                    let numTabs = (aligns[c] - newIn) / tabWidth;
                    numTabs = Math.min(Math.max(0, numTabs), 2); // limit 2 tabs to the right
                    //console.log(numTabs)
                    tabNode.nodeValue += "\t".repeat(numTabs);
                    //console.log(`Added ${numTabs+1} tab(s). indent = ${elem.getBoundingClientRect().left}`)
                }
            } else if (aligns[c] !== 0 && indent > aligns[c]) {
                // else if further right
                // remove a tab from before elem
                tabNode.nodeValue = tabNode.nodeValue.replace(/\t$/,"");
                let newIn = elem.getBoundingClientRect().left;
                let tabWidth = indent - newIn;
                if (newIn > aligns[c]) {
                    // if still not aligned
                    let numTabs = (newIn - aligns[c]) / tabWidth;
                    numTabs = Math.min(Math.max(0, numTabs), 1); // limit 1 tab to the left
                    //console.log(numTabs)
                    let patt = new RegExp("\\t".repeat(numTabs)+"$");
                    tabNode.nodeValue = tabNode.nodeValue.replace(patt,"");
                }
            }
            ct++;
        }
    }
}

function addREline(title,value) {
    title = title.toUpperCase();
    let html = `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-weight: bold">${title}:		<span class="re-align">${value}</span></span></p>`;
    let newREline = parseHTML(html);
    return { 
        getHTML: () => html, 
        getElement: () => newREline, 
        append: () => {
            let reElems = document.querySelectorAll(".re-align");
            if (reElems.length === 0) { return }
            let lastRE = reElems[reElems.length - 1];
            lastRE.parentElement.parentElement.after(newREline);
        }
    };
}

async function htmlToFile(id) {
    // Convert HTML to DOCX
    let htmlBackup = output.innerHTML;
    let hides = document.querySelectorAll(`#output .hidden`);
    hides.forEach((ea) => {
        ea.remove();
    });
    let tmps = document.querySelectorAll(`#output section[data-template]`);
    for (let tmp of tmps) {
        // unwrap section[data-template] elements before export
        tmp.outerHTML = tmp.innerHTML;
    }
    let outs = document.querySelectorAll(`#output [data-output]`);
    for (let out of outs) {
        // unwrap section[data-template] elements before export
        out.outerHTML = out.innerHTML;
    }
    let htmlContent = output.innerHTML;
    // removes 'p' tags with up to two nested 'span' tags as long as otherwise empty
    htmlContent = htmlContent.replace(/<p[^>]*?>(<span[^>]*?>(<span[^>]*?><\/span>|)<\/span>|)<\/p>/g,"");
    output.innerHTML = htmlBackup; // return to #output to original state
    let docxBlob = await docshift.toDocx(htmlContent);
    
    downloadDocx(document.getElementById("saveName").innerText, docxBlob);
    var pageCover = document.querySelector("div.page-cover");
    if (!pageCover) { return }
    let pcw = preConsRvw ? fillValues(preConsRvw.value,"inputs") : "";
    pageCover.querySelector("div.message").innerText = pcw.replace(/<[^>]+>/g,"") + "\n" + signDate("jklueck");
    pageCover.classList.remove("hidden");
    pageCover.querySelector(".btn-close").addEventListener("click", (e) => { pageCover.classList.add("hidden") });
    document.addEventListener("keydown", (e) => { 
        if (e.key === "Escape" && pageCover) {
            e.preventDefault();
            pageCover.classList.add("hidden");
        } 
    });
}

function downloadDocx(filename, blob) {
  // 1. Create a Blob with the text content
  //const blob = new Blob([text], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

  // 2. Create a temporary URL for the Blob
  let url = window.URL.createObjectURL(blob);

  // 3. Create a hidden <a> element
  let link = document.createElement('a');
  link.href = url;
  link.download = filename; // Sets the suggested filename

  // 4. Trigger the download and clean up
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url); // Free up memory
}

function getTextLines(html,sels) {
    if (!sels) { sels = "p,li" }
    let elem = parseHTML(html);
    if (!elem instanceof Element) { return }
    let arr = [];
    let elems = elem.querySelectorAll(sels);
    if (elems.length === 0) { return }
    for (let el of elems) {
        arr.push(el.innerText);
    }
    return arr.join("\n");
}

function parseHTML(html) {
    let tempWrap = document.createElement("div");
    let tempContain = document.createElement("div");
    tempContain.innerHTML = html;
    tempWrap.appendChild(tempContain);
    tempWrap.classList.add("hidden");
    document.body.appendChild(tempWrap);
    let elem = tempWrap.firstElementChild; // get tempContain
    tempWrap.remove();
    return elem;
}

function fixMidInitial(text) {
    //console.log(text)
    return text.trim()
        .split(/\s+/)
        .map(name => name.match(/^[A-Z]$/) ? name.toUpperCase() + "." : name)
        .join(" ");
}

function fixLastNames(text) {
    // [[/include patt/,(m0,m1,m2,m3) => {}, /exclude patt/]]
    let patts = [
        [/(Mc|O')([A-Za-z]+)/gi,
            (m0,m1,m2) => `${titleCase(m1)}${titleCase(m2)}`,],
    ];
    for (let p in patts) {
        let patt = patts[p][0];
        let repl = patts[p][1];
        let excl = patts[p][2];
        if (excl && text.match(excl)) { continue }
        if (text.match(patt)) {
            text = text.replace(patt,repl);
        }
    }
    return text;
}

function fixFormNames(text) {
    //IRS Sch D TY2023
    //IRS F8949 TY2023
	let arr = db.formPatterns;
    let lines = text.split(/\n+/g);
    //console.log(lines)
    let list = [];
    let run = (match, formNum, formLtr, txt) => {
        let form = `${formNum.trim()}${formLtr ? "-"+formLtr.trim() : ""}`;
        form = form.toUpperCase();
        //console.log(form);
        if (!txt || typeof txt !== "string") {
        	txt = match.trim();
        }
        //console.log(`db.formNames["${form}"]`);
        let formName = db.formNames[form];
        if (match.match(formName)) { return match; }
        let year = txt?.match(/(?:^|[^\d.\/\-])(20\d{2})(?:[^\d.\/\-]|$)/);
        year = year ? year[1]+" " : "";
        return ` ${year}${formName} (${txt})`;
	};
    for (let ln in lines) {
        let txt = lines[ln];
        for (let i in arr) {
            let patt = arr[i][0];
            if (txt.match(patt)) {
                let exclude = arr[i][1] ? txt.match(arr[i][1]) : false;
                if (exclude) { continue }
                //console.log(arr[i][0]);
                txt = txt.replace(patt,run);
                //console.log("final: "+txt)
                break;
            }
        }
        list.push(txt);
    }
    list = expandStateNames(list);
    return list.join("\n");
}

function expandStateNames(list) {
    list = list.map((ea) => {
        //console.log(ea)
        let m = ea?.match(/(?:^|_| )([A-Z]{2})(?: |$)/);
        //console.log(m)
        let code = m ? m[1] : null;
        if (!code) { return ea }
        let stateName = db.stateCode[code];
        if (!stateName) { return ea }
        let txt = ea.replace(code,stateName)
        //console.log("code = "+code+"\nstateName = "+stateName+"\n"+`"${ea}".replace("${code}","${stateName}") = ${txt}`)
        return txt;
    });
    return list;
}

function fixTaxYears() {
    // potentially pass string to indicate final format
    // default: 2022, 2023, 2024
    let tyElem = document.querySelector("[data-input='Tax Year']");
    let tyText = tyElem?.value;
    if (!tyText) { return "" }
    if (!tyText.match(/(19|20)\d{2}[^\d]+(19|20)\d{2}/)) { return tyText }
    let ms = tyText.match(/(19|20)\d{2}/g);
    // sort years
    // join with ", "
}

function getInputValues() {
    let fields = document.querySelectorAll("input[data-input],textarea[data-input]:not(#summ)");
    let data = db.summData;
    for (let field of fields) {
        if (field.value === "") { continue }
        let name = field.getAttribute("data-input");
        let value = field.value;
        if (name === "Docs List") {
            value = textToHTML(value, {isTemporary: true, doubleSpace: false, testAlign: false});
            //console.log("Converted with textToHTML...")
        } else if (name === "TA Address") {
            value = textToHTML(value, {isTemporary: false, doubleSpace: false});
            //console.log("Converted with textToHTML...")
        }
        if (field.type === "date") {
            let options = { year: 'numeric', month: 'long', day: 'numeric' };
            value = new Date(new Date(value).getTime()+(24*60*60*1000))
                .toLocaleDateString('en-US', options);
        } else if (field.type === "data-date" 
        || field.getAttribute("data-input")?.match(/Date/)) {
            let options = { year: 'numeric', month: 'long', day: 'numeric' };
            value = new Date(value).toLocaleDateString('en-US', options);
        } else if (name === "Case Name and Number") {
            let parts = value.match(/^([^*]+?) +\*([X\d\-]{4,10}) - (\d{8})(?:.*)$/);
            data["Case Name"] = parts[1];
            let tin = parts[2];
            data["Case Number"] = parts[3];
            if (tin.toString().length > 4) {
                data["EIN"] = tin;
            } else {
                data["SSN"] = tin;
            }
        }
        data[name] = value;
    }
    return data;
}

function today() {
    let today = new Date();
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    today = today.toLocaleDateString('en-US', options);
    return today;
}

function fixDates(html) {
    //let dates = html.match(/\d{1,2}[/-]\d{1,2}[/-]\d{2,4}/g);
    let dates = html.matchAll(/(^|jklueck | )([0-1]?\d[/\-.][0-3]?\d[/\-.](?:20|19|)\d{2})(?![^\s])/gm);
    dates = [...dates];
    for (let m in dates) {
        let all = dates[m][0];
        let m1 = dates[m][1];
        let m2 = dates[m][2];
        if (m1.match(/jklueck/)) { continue }
        let d = new Date(m2);
        if (d === "Invalid Date") { continue }
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        d = d.toLocaleDateString('en-US', options);
        let patt = new RegExp(all.replace(/[{}()\[\]\-.*?!:$/\\|]/g,"\\$&"),"g")
        html = html.replace(patt," "+d);
    }
    return html;
}

function fixAmounts(html) {
  let formattedText = html.replace(/\$+([\d,]+(?:\.\d+)?)/g, (match, amount) => {
    let numericAmount = parseFloat(amount.replace(/,/g,""));
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(numericAmount);
  });
  return formattedText;
}

function signDate(txt) {
    let today = new Date();
    let mo = today.getMonth() + 1;
    let day = today.getDate();
    let year = today.getFullYear() - 2000;
    let date = `${mo}.${day}.${year}`;
    return `-- ${txt} ${date}`;
}

function titleCase(str) {
    let uppers = ["ICO","OSPC","KCPC","AUSPC","AUSC","IRS","AUR","CORR","PO","US","NYS","NYC","DTF","FTB","AL","AK","AZ","AR","AS","CA","CO","CT","DE","DC","FL","GA","GU","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","MP","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","TT","UT","VT","VA","VI","WA","WV","WI","WY"];
    let lowers = ["OF","of","THE","the","TO","to","FROM","from","AND","and"];
    let fixedText = str.replace(/[^\W\d]+/g, (word) => {
        //console.log(word)
        if (!uppers.includes(word) && !lowers.includes(word)) {
            word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        } else if (lowers.includes(word)) {
            word = word.toLowerCase();
        }
        return word;
    });
    return fixedText;
}

function fixPhone(txt) {
    let patt = /(?:^|[^\d])(\d{3})[-.](\d{3})[-.](\d{4})(?!\d)/g;
    let func = (ms,area,exch,num) => {
        return `(${area}) ${exch}-${num}`;
    }
    return txt.replace(patt,func);
}

function addTags(text) {
    let arr = text.split(/(\n|<br>)+/g);
    let arr2 = [];
    for (let i in arr) {
        let txt = arr[i].trim();
        if (txt === "") { continue }
        let html = `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-style: italic; color: blue;">${txt}</span></p>`;
        arr2.push(html);
    }
    return arr2.join("<br>");
}

function doPrint(heading,text) {
    if (text) {
        text = getTextLines(text) || text;
        if (text.match(/^\s*(n\/*a|not applicable|unknown)\s*$/i)) { return "" }
        let html = addTags(text);
        return `<p style="text-align: justify;"><span style="font-family:Calibri; font-size: 12pt; font-style: italic; color: blue; font-weight: bold;">${heading.toUpperCase()}</span></p>`
        +`<br>${html}<br>`;
    } else {
        return "";
    }
}

function textToHTML(text,options) {
    // { isTemporary: [boolean], doubleSpace: [boolean] }
    let paragraphs = text.split(/\n+/g);
    let tempStyle = ` font-style: italic; color: blue;`;
    let textAlign = options?.textAlign ? options.textAlign : "justify";
    let temp = "";
    let arr = [];
    if (options?.isTemporary) {
        temp = tempStyle;
    }
    for (let p in paragraphs) {
        let para = paragraphs[p];
        para = `<p style="text-align: ${textAlign};"><span style="font-family:Calibri; font-size: 12pt;${temp}">${para}</span></p>`;
        arr.push(para);
    }
    if (options?.doubleSpace) {
        return arr.join("<br>");
    } else {
        return arr.join("");
    }
}

function getCaseName() {
    let caseNameNum = getInput("Case Name and Number");
    if (caseNameNum?.value !== "") {
        return caseNameNum.value.replace(/^(?:\[[^\]]+\]|) *([^\*]+) \*[X\d\-]* - \d{8}[^]*?$/,"$1") || "Last_Name"; 
    }
}

function setSaveName() {
    if (caseNameNum?.value !== "" && pfNumFld?.value !== "") {
        let lastName = caseNameNum.value.replace(/^(?:\[[^\]]+\]|) *([^\*]+) \*[X\d\-]* - \d{8}[^]*?$/,"$1") || "Last_Name";
        lastName = lastName.replace(/&amp;/g, "&");
        let pfNum = pfNumFld?.value.replace(/^[^]*?(\d{8})[^]*$/,"$1") || "PF_Number";
        let docs = db.summData["List supporting documents"] || db.summData["Supporting Documents"];
        let pfCt = docs?.match(/^[^]*(P\d{1,2})[_\-]/i)
        pfCt = pfCt ? pfCt[1] : "P01";
        saveName.innerText = `${pfCt}_00_Portfolio Cover Letter (${pfNum}) ${lastName}.docx`;
    }
}

function setUnsureStyles() {
    let unsures = document.querySelectorAll("span.unsure");
    for (let elem of unsures) {
        if (!elem instanceof Element) { continue }
        let id = elem.id;
        if (sureStatus[id]) {
            elem.style = "";
        } else if (!sureStatus[id]) {
            //console.log(`${id} is "${sureStatus[id]}"`)
            elem.style = "font-style: italic; color: blue;";
        }
        if (!elem.listenersAdded) {
            elem.addEventListener("dblclick", (e) => {
                e.preventDefault();
                let isMarked = e.currentTarget.style.fontStyle === "italic" && e.currentTarget.style.color === "blue";
                //let parent = e.target.parentElement;
                //let parentMarked = parent.style.fontStyle === "italic" && parent.style.color === "blue";
                if (isMarked) {
                    e.currentTarget.style = "";
                    /*if (parent.classList.contains("unsure") && parentMarked) {
                        parent.style = "";
                    }*/
                    let id = e.currentTarget?.id;
                    if (!id) { return }
                    sureStatus[id] = true;
                } else if (!isMarked) {
                    e.currentTarget.style = "font-style: italic; color: blue;";
                    /*if (parent.classList.contains("unsure") && !parentMarked) {
                        parent.style = "font-style: italic; color: blue;";
                    }*/
                    let id = e.currentTarget.id;
                    if (!id) { return }
                    sureStatus[id] = false;
                }
            });
            elem.addEventListener("mouseenter", (e) => {
                let isMarked = e.currentTarget.style.fontStyle === "italic" && e.currentTarget.style.color === "blue";
                if (isMarked) { // as 'unsure'
                    //e.target.style = "background-color: lightblue;";
                    e.currentTarget.style.backgroundColor = "lightblue";
                } else if (!isMarked) {
                    //e.target.style = "font-style: italic; color: blue; background-color: lightgrey";
                    e.currentTarget.style.backgroundColor = "lightgrey";
                }
                e.target.classList.add("no-select");
            });
            elem.addEventListener("mouseleave", (e) => {
                let isMarked = e.currentTarget.style.fontStyle === "italic" && e.currentTarget.style.color === "blue";
                if (isMarked) { // as 'unsure'
                    //e.target.style = "";
                    e.currentTarget.style.backgroundColor = "";
                } else if (!isMarked) {
                    //e.target.style = "font-style: italic; color: blue;";
                    e.currentTarget.style.backgroundColor = "";
                }
                e.target.classList.remove("no-select");
            });
            elem.listenersAdded = true;
        }
    }
}

function getSummaryData(text) {
    let data = {};
    if (text.match(/^\{[^]+\}/)) { data = JSON.parse(text); }
    if (data["Case Summary"]) { 
        for (let name in data) {
            let value = data[name];
            if (isHTML(text)) {
                data[name] = getTextLines(value)?.trim() || value;
            } else {
                data[name] = value;
            }
        }
        return data; 
    }
	let titles = db.summTitles;
    let sects = db.summSections;
    let sectsPatt = new RegExp(`(${sects.join("|")})`,"g");
    data.expedited = text.match(/\*\*EXPEDITE\*\*/) ? true : false;
    text = text.replace(sectsPatt,"");
    //console.log(text)
    //.replace(/Summary:\n\n/,"")
    for (let t in titles) {
    	let title = titles[t];
        //if (title?.match(/\(section\)/)) { continue } // not used?
        let currPatt = title.replace(/[()[\]{}\-.*$+/]/g,"\\$&");
        let nextPatt = titles[parseInt(t)+1];
        nextPatt = nextPatt?.replace(/[()[\]{}\\\-.*$+/]/g,"\\$&") || "(Date Submitted|$)";
        let patt = new RegExp(`${currPatt}:*\\s*([^]+?)\\s*${nextPatt}`);
        //console.log(patt)
        let value = text.match(patt);
        //console.log(value)
        if (value) {
            title = title.replace(/:$/,"");
            data[title] = value[1]?.trim();
            if (title === "Summary") {
                data[title] = data[title]?.replace(/Summary:\n\n/,"")
            } else if (title === "Relevant Law/Regulation") {
                data[title] = data[title]?.replace(/\n\nCase Strength:\n\n[^]*$/,"");
            } else if (title === "Representative for Deceased Taxpayer") {
                data[title] = data[title]?.replace(/(\n\n)+ *- Case Summary[^]*$/,"");
            } else if (title === "Explain rationale for strength") {
                data[title] = data[title]?.replace(/ *\n*Summarize important contacts[^]*$/,"");
            }
        } else {
            data[title] = "";
        }
    }
    //console.log("Summary Data:");
    //console.log(data)
    return data;
}

function setDefaultValues(names) {
    // Set default field values
    let defaults = db.defaults;
    if (typeof names === "string") { names = [names] }
    for (let fn in defaults) {
        if (names && !names.includes(fn)) { continue; }
        let field = document.querySelector(`[data-input="${fn}"]`);
        let defVal = db.defaults[fn](); // runs even if data-input has a value
        if (field?.value === "") { 
            field.value = defVal;
        }
    }
}

function updateFromSummary() {
    if (db.summData.expedited || db.summData["Special Portfolio Needs"] === "Expedite") { expediteHandler() }
    if (taxAuth.value === "" || taxAuth.value.trim().match(/^n.?a$/i)) {
        let name = db.summData["Authority"]?.trim() || db.summData["Tax Authority"]?.trim() || "";
        taxAuth.value = name;
        let taxFormInput = getInput("Tax Form");
        if (taxFormInput) {
            taxForm.value = db.stateInfo[name]?.form || "";
        }
    }
    // TODO: Add form to a "Tax Form" field, based on Taxing Authority
    if (taxYear.value === "" || taxYear.value.trim().match(/^n.?a$/i)) {
        taxYear.value = db.summData["Tax Year(s) Involved"]?.trim() || "";
    }
    if (noticeType.value === "" || noticeType.value.trim().match(/^n.?a$/i)) {
        noticeType.value = db.summData["Notice Type"]?.trim() || "";
    }
    if (noticeNumber.value === "" || noticeNumber.value.trim().match(/^n.?a$/i)) {
        noticeNumber.value = db.summData["Notice Number"]?.trim() || "";
    }
    if (noticeDate.value === "" || noticeDate.value.trim().match(/^n.?a$/i)) {
        noticeDate.value = db.summData["Notice Date"]?.trim() || "";
    }
    if (docsList.value === "" || docsList.value.trim().match(/^n.?a$/i)) {
        let value = db.summData["List supporting documents"]?.trim()
        || db.summData["Supporting Documents"];
        value = getTextLines(value) || value;
        docsList.value = value;
    }
    if (db.summData["Writing Perspective"]?.trim() === "First Person") {
        first.checked = "yes";
    } else if (db.summData["Writing Perspective"]?.trim() === "Third Person") {
        third.checked = "yes";
    }
    if (db.summData["Representative for Deceased Taxpayer"]?.trim() 
    && document.querySelector(`[data-input="Primary Title"]`)) {
        let titleField = getInput("Primary Title");
        if (titleField.value === "") {
            titleField.value = db.summData["Representative for Deceased Taxpayer"]?.trim();
        }
    }
    if (db.summData["Portfolio Number"]) {
        pfNumFld.value = db.summData["Portfolio Number"]?.trim();
        setSaveName();
    }
    if (db.summData["Case Name and Number"]) {
        caseNameNum.value = db.summData["Case Name and Number"]?.trim();
        setSaveName();
    }
    if (db.summData["Name Merge"]) {
        nameMergeHandler(db.summData["Name Merge"]);
        /*let nm = db.summData["Name Merge"].replace(/\&(amp;|)/,"and");
        if (!nm.match(/ and /)) {
            let isBus = isBusiness();
            let txt = fixMidInitial(nm);
            txt = fixLastNames(txt);
            if (isBus) {
                nameMerge.value = isBus[0];
                primName.value = nm;
            } else {
                primName.value = txt;
                nameMerge.value = txt;
            }
        } else {
            nameMerge.value = nm;
            nameMergeHandler(nm);
        }*/
    }
}

function expediteHandler() {
    if (!db.summData.expedited && db.summData["Special Portfolio Needs"] !== "Expedite") { return }
    btnBanner.classList.add("expedite");
}

function nameMergeHandler(txt) {
    console.log(JSON.stringify(db.summData)) // if business => summData["Name Merge"] is originally the bus rep
    console.log(txt) // Jane Doe
    let nmText = txt;
    let nameMerge = getInput("Name Merge"); 
    let primName = getInput("Primary Name");
    let secName = getInput("Secondary Name");
    let isBus = isBusiness(); // true
    let busName = getCaseName(); // John & Jane's Store LLC // if not business => last name
    console.log(`Business? ${isBus}\nBusiness Name: ${busName}`)
    //txt = txt || nameMerge?.value;
    if (isBus) { 
        db.summData["Primary Name"] = primName?.value || txt;
        txt = busName;
    }
    console.log(txt)
    if (!txt) { return }
    if (isBus) {
        console.log("Is a business case.")
        txt = txt.replace(/\&(amp;|)/,"&");
        console.log(txt)
        nameMerge.value = txt;
        if (primName.value === "" && db.summData["Primary Name"] !== "") {
            primName.value = db.summData["Primary Name"];
        }
    } else if (txt.match(/(\&(amp;|)| and )/) && !isBus) {
        console.log("Two taxpayers.")
        txt = txt.replace(/\&(amp;|)/,"and");
        txt = fixMidInitial(txt);
        txt = fixLastNames(txt);
        console.log(txt);
        nameMerge.value = txt;
        let splits = txt.split(/ and /);
        primName.value = splits[0];
        secName.value = splits[1];
        let noLast = splits[0].match(/^[^ ]+ ?[A-Z]?\.?$/);
        if (noLast) {
            let last = splits[1].split(/ /g).pop();
            primName.value = `${splits[0]} ${last}`;
            nameMerge.value = `${splits[0]} ${last} and ${splits[1]}`;
        }
    } else {
        // if Single/HOH/MFS case
        console.log("Single individual taxpayer.")
        txt = fixMidInitial(txt);
        txt = fixLastNames(txt);
        console.log(txt)
        primName.value = txt;
    }
    return nameMerge.value;
}

function createRegExpList(array) {
    array = array.map((ea) => ea.replace(/([\^$?()[\]\|\\\/*+])/g,"\\$1"));
    return new RegExp(`(${array.join("|")})`);
}

function handleSSNNotes(ssnStatus) {
    let ssnStatus1 = ssnStatus[0];
    let ssnStatus2 = ssnStatus[1];
    let pcwField = document.querySelector("[data-input='Pre-Consult Review']");
    let pcwText = pcwField?.value || "";
    let caseField = document.querySelector("[data-input='Case Name and Number']");
    let caseText = caseField?.value || "";
    let patt = /SSN digits\? For which TP\?/;
    let replace = (m1, m2) => {
        let repl = "";
        let skip = false;
        switch (m1) {
            case "L":
                repl = `Last 4 SSN digits in notice.`;
                break;
            case "F":
                repl = `Full SSN shown in notice.`;
                break;
            case "N":
                repl = `No SSN shown in notice.`;
                skip = true;
                break;
            case "A":
                repl = `Notice asks for TP's ID number.`;
                break;
            default:
            	repl = `SSN digits? For which TP?`;
                skip = true;
        }
        if (skip) { return repl }
        switch (m2) {
            case "P":
                break;
            case "S":
                repl = repl.replace(/\.$/," (secondary TP only).");
                break;
            case "B":
                repl = repl.replace(/\.$/," (both TPs).");
                break;
            default:
        }
        return repl;
    }
    let repl = replace(ssnStatus1,ssnStatus2);
    pcwField.value = pcwText.replace(patt,repl);
    if (ssnStatus1 === "N") {
        caseField.value = caseText.replace(/\*\d{4}(?!\d)/,"*XXXX");
    }
}

function waitFor(selector, options) { // vers 12.16.24
    var q;
    if (!selector) { 
        console.log("ERROR, waitFor: selector cannot be undefined.")
        //return false;
        selector = "undefined";
    }
    if (!options?.timeOut) {
        var timeOut = 20000;
    } else {
        var timeOut = options.timeOut;
    }
    var isLoaded = () => {
        var elem, value;
        if (selector !== "undefined") {
            if (typeof selector === "string") {
                //try {
                    elem = document.querySelector(selector);
                /*} catch (err) { 
                    console.log("ERROR, waitFor [string]: "+err.message)
                    return false; 
                }*/
            } else if (typeof selector === "function") {
                elem = selector();
            } else if (selector?.constructor.name.match(/element/gi)) {
                elem = selector;
            } else {
                return false;
            }
            if (elem?.constructor.name.match(/element/gi)) {
                value = elem.value || elem.innerText;
            }
            if (options) { // removed 6.15.23 - && value
                // removed so that an undefined value can be tested
                if (options.eval && options.eval(value)) {
                    return elem;
                } else if (!options.eval) {
                    return elem;
                } else {
                    return false;
                }
            } else {
                return elem;
            }
        } else {
            return "undefined";
        }
    };
    var delay = 250;
    const myPromise = new Promise((resolve, reject) => {
        var int = setInterval(() => {
            timeOut = timeOut - delay;
            var loaded = isLoaded();
            if (loaded) {
                clearInterval(int)
                //db.queue.splice(q, 1);
                resolve(loaded);
            } else if (timeOut <= 0 || selector === "undefined") {
                clearInterval(int);
                //db.queue.splice(q, 1);
                if (selector === "undefined") {
                    reject("Cannot resolve an undefined or null value.");
                } else if (!options || !options.rejectMsg) {
                    resolve("timed out"); // changed from reject - 10.30.24
                } else {
                    reject(options.rejectMsg);
                }
            }
        }, delay);
    });
    return myPromise;
}

function loadDemoData() {
    //let data = {"2848":{"value":"2848","id":"poaForm","placeholder":"2848"},"Portfolio Number":{"value":"Portfolio - 00012345 - Smith","id":"pfNumFld","placeholder":"Portfolio Number"},"Case Name and Number":{"value":"Smith *1234 - 00054321 - IRS/25","id":"caseNameNum","placeholder":"Case Name and Number"},"Formatted Summary":{"value":"Date Submitted: 7/15/2026, 5:00 PM\n\n\n\nPortfolio Approval: Main and Secondary\n\n\n\nWriting Perspective: Third Person\n\n\n\nRepresentative for Deceased Taxpayer: Not Applicable\n\n\n\nCase Description - Case Summary\n\nSummary:\n\nTP got a notice and provided proof of payment.\n\nRelevant Law/Regulation:\n\nN/A\n\nCase Strength:\n\nStrong\n\nExplain rationale for strength:\n\nTP provided docs.\n\n\n\nSummarize important contacts with IRS/state, client, or third parties. Include dates and substance (for reference), if applicable. \n\nN/A\n\n\n\nTax Year(s) Involved: 2025\n\nTaxing Authority Details:\n\nAuthority: IRS\n\nNotice Details:\n\nNotice Date: April 15, 2026\n\nNotice Type: N/A\n\nNotice Number: CP2000\n\nReference #/AUR: N/A\n\nNotice Deadline: May 15, 2026\n\n\n\nExpected Outcome: Unknown\n\n\n\nPayments Made: No\n\n\n\nAgreed Items\n\nItems Accepted:\n\nN/A\n\nReason:\n\nN/A\n\n\n\nDisputed Items\n\nItems Contested:\n\nN/A\n\nReason for Dispute:\n\nN/A\n\n\n\nSubstantiation Status\n\nPartial Substantiation Details:\n\nMissing Documents:\n\nN/A\n\nReason for Omission:\n\nN/A\n\n\n\nDate you communicated to the taxpayer that, without proper substantiation, the deduction and/or credits will likely be disallowed, resulting in a possible balance due.\n\nJuly 15, 2026\n\n\n\nList supporting documents provided explaining relevance to disputed issues (e.g., how the business deduction is ordinary and necessary to operate the business)\n\nP1_01_IRS Notice dated 4.15.2026\n\nP1_02_Payment Confirmation","id":"summ","placeholder":""},"Tax Authority":{"value":"IRS","id":"taxAuth","placeholder":"Tax Authority"},"Tax Year":{"value":"2025","id":"taxYear","placeholder":"Tax Year"},"Notice Type":{"value":"Unreported Income","id":"noticeType","placeholder":"Notice Type"},"Notice Number":{"value":"CP2000","id":"noticeNumber","placeholder":"Notice Number"},"Notice Date":{"value":"April 15, 2026","id":"noticeDate","placeholder":"Notice Date"},"Primary Name":{"value":"John Smith","id":"primName","placeholder":"Primary Name"},"Secondary Name":{"value":"Jane Smith","id":"secName","placeholder":"Secondary Name"},"Name Merge":{"value":"John Smith and Jane Smith","id":"nameMerge","placeholder":"Name Merge"},"Representative":{"value":"Jamie Klueck","id":"repName","placeholder":"Representative"},"Docs List":{"value":"P1_01_IRS Notice dated 4.15.2026\n\nP1_02_Payment Confirmation","id":"docsList","placeholder":"Docs List"},"TA Address":{"value":"Department of the Treasury\nInternal Revenue Service\nOgden Service Center\nOgden, UT 84201-0046","id":"taAddress","placeholder":"TA Address"},"TA Fax":{"value":"(800) 555-1212","id":"taFax","placeholder":"TA Fax"},"Pre-Consult Review":{"value":"- SSN digits? For which TP?\n- Fax number in notice?\n- Notice indicates that the IRS has identified items that were not reported on the 2025 Federal Tax Return. ","id":"preConsRvw","placeholder":"Pre-Consult Review"}};
    let data = {
        "2848": {
            "value": "2848",
            "id": "poaForm",
            "placeholder": "2848"
        },
        "Portfolio Number": {
            "value": "Portfolio - 00012345 - Smith",
            "id": "pfNumFld",
            "placeholder": "Portfolio Number"
        },
        "Case Name and Number": {
            "value": "Smith *1234 - 00054321 - IRS/25",
            "id": "caseNameNum",
            "placeholder": "Case Name and Number"
        },
        "Formatted Summary": {
            //"value": "Date Submitted: 7/15/2026, 5:00 PM\n\n\n\nPortfolio Approval: Main and Secondary\n\n\n\nWriting Perspective: Third Person\n\n\n\nRepresentative for Deceased Taxpayer: Not Applicable\n\n\n\nCase Description - Case Summary\n\nSummary:\n\nTP got a notice and provided proof of payment.\n\nRelevant Law/Regulation:\n\nN/A\n\nCase Strength:\n\nStrong\n\nExplain rationale for strength:\n\nTP provided docs.\n\n\n\nSummarize important contacts with IRS/state, client, or third parties. Include dates and substance (for reference), if applicable. \n\nN/A\n\n\n\nTax Year(s) Involved: 2025\n\nTaxing Authority Details:\n\nAuthority: IRS\n\nNotice Details:\n\nNotice Date: April 15, 2026\n\nNotice Type: N/A\n\nNotice Number: CP2000\n\nReference #/AUR: N/A\n\nNotice Deadline: May 15, 2026\n\n\n\nExpected Outcome: Unknown\n\n\n\nPayments Made: No\n\n\n\nAgreed Items\n\nItems Accepted:\n\nN/A\n\nReason:\n\nN/A\n\n\n\nDisputed Items\n\nItems Contested:\n\nN/A\n\nReason for Dispute:\n\nN/A\n\n\n\nSubstantiation Status\n\nPartial Substantiation Details:\n\nMissing Documents:\n\nN/A\n\nReason for Omission:\n\nN/A\n\n\n\nDate you communicated to the taxpayer that, without proper substantiation, the deduction and/or credits will likely be disallowed, resulting in a possible balance due.\n\nJuly 15, 2026\n\n\n\nList supporting documents provided explaining relevance to disputed issues (e.g., how the business deduction is ordinary and necessary to operate the business)\n\nP1_01_IRS Notice dated 4.15.2026\n\nP1_02_Payment Confirmation",
            "value": `{"Special Portfolio Needs": "Expedite","Writing Perspective": "Third Person","Representative for Deceased Taxpayer": "Not Applicable","Case Summary": "TP got a notice and provided proof of payment.","Relevant Law/Regulation": "N/A","Case Strength": "Strong","Explain rationale for strength": "TP provided docs.","Important Communication": "N/A","Case Notes": "","Tax Year(s) Involved": "2025","Tax Authority": "IRS","Notice Date": "April 15, 2026","Notice Type": "N/A","Notice Number": "CP2000","Reference #/AUR": "N/A","Items Accepted": "N/A","Reason Accepted": "N/A","Items Disputed": "N/A","Reason Disputed": "N/A","Missing Documents": "N/A","Reason for Omission": "N/A","Supporting Documents": "P1_01_IRS Notice dated April 15, 2026\\nP1_02_Payment Confirmation","Portfolio Number": "Portfolio - 00012345 - Smith","Case Name and Number": "Smith *1234 - 00076543 - IRS/24","Primary Taxpayer": "John Smith","Secondary Taxpayer": "Jane Smith"}`,
            "id": "summ",
            "placeholder": ""
        },
        "Tax Authority": {
            "value": "IRS",
            "id": "taxAuth",
            "placeholder": "Tax Authority"
        },
        "Tax Year": {
            "value": "2025",
            "id": "taxYear",
            "placeholder": "Tax Year"
        },
        "Notice Type": {
            "value": "Unreported Income",
            "id": "noticeType",
            "placeholder": "Notice Type"
        },
        "Notice Number": {
            "value": "CP2000",
            "id": "noticeNumber",
            "placeholder": "Notice Number"
        },
        "Notice Date": {
            "value": "April 15, 2026",
            "id": "noticeDate",
            "placeholder": "Notice Date"
        },
        "Primary Name": {
            "value": "John Smith",
            "id": "primName",
            "placeholder": "Primary Name"
        },
        "Secondary Name": {
            "value": "Jane Smith",
            "id": "secName",
            "placeholder": "Secondary Name"
        },
        "Name Merge": {
            "value": "John Smith and Jane Smith",
            "id": "nameMerge",
            "placeholder": "Name Merge"
        },
        "Representative": {
            "value": "Jamie Klueck",
            "id": "repName",
            "placeholder": "Representative"
        },
        "Docs List": {
            "value": "P1_01_IRS Notice dated 4.15.2026\n\nP1_02_Payment Confirmation",
            "id": "docsList",
            "placeholder": "Docs List"
        },
        "TA Address": {
            "value": "Department of the Treasury\nInternal Revenue Service\nOgden Service Center\nOgden, UT 84201-0046",
            "id": "taAddress",
            "placeholder": "TA Address"
        },
        "TA Fax": {
            "value": "(800) 555-1212",
            "id": "taFax",
            "placeholder": "TA Fax"
        },
        "Pre-Consult Review": {
            "value": "- SSN digits? For which TP?\n- Fax number in notice?\n- Notice indicates that the IRS has identified items that were not reported on the 2025 Federal Tax Return. ",
            "id": "preConsRvw",
            "placeholder": "Pre-Consult Review"
        }
    };
    let fields = document.querySelectorAll("[data-input]");
    for (let field of fields) {
        if (!field instanceof Element) { continue }
        let name = field.getAttribute("data-input") || field.id;
        if (!name || !data[name]) { continue } 
        field.value = data[name].value;
        //updateFromInput(field);
    }
}

function updateVers() {
    let versElem = document.getElementById("vers");
    let lastMod = document.lastModified;
    let vers = lastMod.toString().replace(/(\d{2})\/(\d{2})\/\d{2}(\d{2}) (\d{2}):(\d{2}):\d{2}/,"1.2.3t4$5");
    versElem.innerText = vers;
}

