const db = {
    layoutFinal: true, // mark as 'false' to allow layout mode
    layoutMode: false,
    coords: {
        offsetX: 0,
        offsetY: 0,
        x: 0,
        y: 0
    },
    fields: {
    }
};

function getStyles(elem) {
    let rect = elem.getBoundingClientRect();
    let prect = elem.parentNode.getBoundingClientRect();
    report.innerHTML = "";
    var arr = ["position: absolute;"];
    var cls = ".info_section ."+elem.classList.toString().replace(/ ?(editable|active)/g,""); //"."+elem.classList.replace(/( ?editable|) ?active/g,"");
    var exclude = ["x","y","right","bottom"]; 
    var adjust = ["top","right","bottom","left"];
    for (const key in rect) {
      if (typeof rect[key] !== "function" && !exclude.includes(key)) {
        if (adjust.includes(key)) {
            arr.push(`${key}: <span class="setting" data-name="${key}" contenteditable>${Math.round(rect[key] - prect[key])}</span>px;`);
        } else {
            arr.push(`${key}: <span class="setting" data-name="${key}" contenteditable>${Math.round(rect[key])}</span>px;`);
        }
      }
    }
    report.classList.remove("hidden");
    report.innerHTML = `${cls} { ${arr.join(" ")} }`;
    document.addEventListener("keyup", (e) => {
        if (e.key.match(/[^0-9]/i)) { return }
        if (e.target.classList.contains("setting")) {
            resize(e);
        }
    });
}
  
  function beginSliding(e) {
    db.offsetX = e.offsetX;
    db.offsetY = e.offsetY;
    e.target.onpointermove = slide;
    e.target.setPointerCapture(e.pointerId);
  }
  
  function stopSliding(e) {
    e.target.onpointermove = null;
    e.target.releasePointerCapture(e.pointerId);
    getStyles(e.target);
  }

  function resize(e) {
    var clsItem = e.target.parentNode.innerText;
    var selector = clsItem.split(/ \{ ?/)[0];
    var propName = e.target.getAttribute("data-name");
    var itemStyles = clsItem.match(/(?:\{ ?)([^\}]+)(?: ?\})/);
    var patt = new RegExp(selector+" ?\\{ ?[^\}]+ ?\\}","");
    var styleCSS = document.querySelector("style").innerText.match(patt);
    // .info_section .primary_first_name { position: absolute; top: 36px; left: 0px; width: 270px; text-align: left; }
    //alert(styleCSS);
    var repl = styleCSS[0].match(new RegExp(propName+": *([^;]+);"));
    if (!repl || !repl[1]) { 
        return 
    } else {
        repl = repl[1];
    }
    var value = e.target.innerText+"px";
    //console.log(repl+" - "+value);
    var update = styleCSS[0].replace(repl,value);
    //console.log(`Will replace:\n${styleCSS[0]}\nwith:\n${update}`);
    document.querySelector("style").innerText = document.querySelector("style").innerText.replace(styleCSS[0],update);
    var newStyleCSS = document.querySelector("style").innerText.match(patt);
    //alert(newStyleCSS);
  }
  
  function slide(e) {
    // get pointer position within 'slider'
    var cx = Math.round(e.clientX);
    var cy = Math.round(e.clientY);
    var rect = e.target.getBoundingClientRect();
    var wd = rect.width;
    var ht = rect.height;
    var ox = db.x + db.offsetX;
    var oy = db.y + db.offsetY;
    e.target.style.transform = `translate(${e.clientX - ox}px,${e.clientY - oy}px)`;
    getStyles(e.target);
  }

  function enterLayoutMode() {
    if (db.layoutFinal) { return; }
    db.layoutMode = true;
    var fields = document.querySelectorAll(".editable");
    fields.forEach((ea) => {
        ea.setAttribute("contenteditable","false");
    })
  }

  function exitLayoutMode() {
    db.layoutMode = false;
    var fields = document.querySelectorAll(".editable");
    fields.forEach((ea) => {
        ea.setAttribute("contenteditable","true");
    })
  }

  document.addEventListener("click", (e) => { 
    if (!db.layoutMode) { return }
    if (e.target.classList.contains("editable") && !e.target.classList.contains("active")) {
      let rect = e.target.getBoundingClientRect();
      db.x = rect.x;
      db.y = rect.y;
      e.target.classList.add("active");
      getStyles(e.target);
      e.target.addEventListener("pointerdown", beginSliding);
      e.target.addEventListener("pointerup", stopSliding);
    }
  });
  
  document.addEventListener("keydown", (e) => {
    if ((e.key === "|" && e.shiftKey) || (e.key === "~" && e.shiftKey)) {
        if (!db.layoutMode) { enterLayoutMode(); }
        else { exitLayoutMode(); }
    } else if (e.key === "Escape") {
      if (!db.layoutMode) { return }
      e.preventDefault;
      if (!report.classList.contains("hidden")) {
        report.classList.add("hidden");
      }
      var elems = document.querySelectorAll(".active");
      for (var elem of elems) {
        elem.classList.remove("active");
        elem.removeEventListener("pointerdown", beginSliding);
        elem.removeEventListener("pointerup", stopSliding);
      }
    }
  });

setTimeout(() => {
  var selectors = [
    () => document.querySelectorAll("#taxpayer_info .name_on_return"),
    () => document.querySelectorAll("#taxpayer_info .primary_ssn")
  ];
  for (let fs in selectors) {
    let fieldSet = selectors[fs]();
    for (let elem of fieldSet) {
      elem.addEventListener("blur",(e) => {
        let val = e.target.innerText;
        console.log(val);
        fieldSet.forEach((el) => {
          el.innerText = val;
        })
      })
    }
  }
    /*for (var id in db.fields) {
        document.getElementById(id).style.top = db.fields[id].top + "px";
        if (db.fields[id].right) {
            document.getElementById(id).style.right = db.fields[id].right + "px";
        }
    }*/
}, 250)
/*
<style>
body {
  padding: 0;
  box-sizing: border-box;
}

.section {
  position: relative;
  width: 945px;
  height: 450px;
  margin: 0;
  padding: 0;
}

div#slider1 {
  position: absolute;
  width: 120px;
  height: 16px;
  padding: 0;
  margin: 0;
  background: #fffccf;
}

div#slider2 {
  position: absolute;
  width: 120px;
  height: 16px;
  padding: 0;
  margin: 0;
  top: 16px;
  background: lightgreen;
}

.active {
  border: 1px solid blue; 
}

div#report {
  position: fixed;
  z-index: 100;
  height: 50px;
  bottom: 0px;
}
</style>
<script>
const db = {
    coords: {
        offsetX: 0,
        offsetY: 0,
        x: 0,
        y: 0
    }
};

function getStyles(elem) {
  let rect = elem.getBoundingClientRect();
  report.innerHTML = "";
  var arr = [];
  var exclude = ["right","bottom"]; // "x","y",
  for (const key in rect) {
    if (typeof rect[key] !== "function" && !exclude.includes(key)) {
      arr.push(`${key}: ${Math.round(rect[key])}px;`);
    }
  }
  report.innerText = arr.join(" ");
}

function beginSliding(e) {
  db.offsetX = e.offsetX;
  db.offsetY = e.offsetY;
  e.target.onpointermove = slide;
  e.target.setPointerCapture(e.pointerId);
}

function stopSliding(e) {
  e.target.onpointermove = null;
  e.target.releasePointerCapture(e.pointerId);
  getStyles(e.target);
}

function slide(e) {
  // get pointer position within 'slider'
  var cx = Math.round(e.clientX);
  var cy = Math.round(e.clientY);
  var rect = e.target.getBoundingClientRect();
  var wd = rect.width;
  var ht = rect.height;
  var ox = db.x + db.offsetX;
  var oy = db.y + db.offsetY;
  e.target.style.transform = `translate(${e.clientX - ox}px,${e.clientY - oy}px)`;
  getStyles(e.target);
}

//offsetX: 54px offsetY: 7px clientX: 112px clientY: 114px

</script>
</head>
<body>
<div class="section">
<div id="slider1" class="slider"></div>
<div id="slider2" class="slider"></div>
<div id="report"></div>
</div>

<script>
document.addEventListener("click", (e) => { 
  if (e.target.classList.contains("slider") && !e.target.classList.contains("active")) {
    let rect = e.target.getBoundingClientRect();
    db.x = rect.x;
    db.y = rect.y;
  	e.target.classList.add("active");
    getStyles(e.target);
    e.target.addEventListener("pointerdown", beginSliding);
    e.target.addEventListener("pointerup", stopSliding);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
  	e.preventDefault;
    var elems = document.querySelectorAll(".active");
    for (var elem of elems) {
      elem.classList.remove("active");
      elem.removeEventListener("pointerdown", beginSliding);
      elem.removeEventListener("pointerup", stopSliding);
    }
  }
});

</script>

</body>
*/