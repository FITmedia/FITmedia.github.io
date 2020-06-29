class HTMLelement {
    constructor(tag, id, options) {
      var object = {};
      var fields = ["INPUT", "TEXTAREA", "OPTION"]; // tag names that use .value and not .innerHTML
      object.tag = tag;
      object.id = id;
      object.options = {
        cssClass: "",
        style: "", // added 4.20.20
        listen: [
          false,
          "click",
          function () {
            if (this.value && this.value.length >= 3) {
              warn(this.value);
            }
          }
        ],
        htmlFor: "", // assign label to input element
        innerHTML: "",
        placeholder: "",
        value: "",
        edit: false,
        showStatus: false,
        noAppend: false
      };
      object.setOptions = function (options) {
        if (options) {
          for (var each in object.options) {
            if (options[each]) {
              // implicitly sets to default
              object.options[each] = options[each];
              if (object.options[each].toString().match("function") !== null) {
                // prevents console from logging full event listener functions
                var fix = object.options[each]
                  .toString()
                  .split(/,\s*function/i)[0];
                console.log("'" + each + "' set to '" + fix + ",[function]'");
              } else {
                console.log(
                  "'" + each + "' set to '" + object.options[each] + "'"
                );
              }
            }
          } // end each loop
        }
      };
      object.setOptions(options);
      object.build = function () {
        this.elem = document.createElement(object.tag);
        let elem = this.elem;
        elem.id = this.id;
        if (this.options.cssClass !== "") {
          // added 4.20.20
          if (this.options.cssClass.match(/\s/) !== null) {
            let classes = this.options.cssClass.split(/\s/g);
            for (let ea in classes) {
              elem.classList.add(classes[ea]);
            }
          } else {
            elem.classList.add(this.options.cssClass);
          }
        }
        //-----
        if (this.options.style !== "") {
          if (this.options.style.match(/\;/) !== null) {
            var styles = this.options.style.split(/\;/g);
            for (let ea in styles) {
              var key = styles[ea].trim().split(/\:/)[0].trim();
              var val = styles[ea].trim().split(/\:/)[1].trim();
              elem.style[key] = val;
            }
          } else {
            var styles = this.options.style.split(/\;/g);
            for (let ea in styles) {
              var key = this.options.style.split(/\:/)[0].trim();
              var val = this.options.style.split(/\:/)[1].trim();
              elem.style[key] = val;
            }
          }
          // ---- maybe I can only add it after it's been appended?
          console.log("this.options.style = " + this.options.style);
        }
        //------- // added 4.20.20
        if (this.options.listen[0] === true) {
          elem.addEventListener(this.options.listen[1], this.options.listen[2]);
        }
        if (fields.includes(object.tag)) {
          elem.value = this.options.value;
          elem.placeholder = this.options.placeholder;
          elem.innerHTML = this.options.innerHTML || this.options.value;
        } else {
          elem.innerHTML =
            this.options.innerHTML ||
            this.options.value ||
            this.options.placeholder;
        }
        if (this.options.edit === true) {
          // 6.28.20 - should prevent contenteditable="false" from appearing - not working?
          elem.contentEditable = this.options.edit;
        }
        elem.noAppend = this.options.noAppend;
        console.log("'" + this.id + "' created by HTMLelement!");
        return elem;
      };
      let elem = object.build();
      return elem;
    }
  }
  
  class HTMLform {
    constructor(inst) {
      var HTMLobject = this;
      var forms = {
        card: {
          head: [
            // forms[type][head][0][2]
            ["DIV", "card", "overlay"], //{style: "display: overlay"}
            ["DIV", "controlBar", "card", { cssClass: "controlBar" }],
            [
              "DIV",
              "title",
              "controlBar",
              {
                cssClass: "header",
                value: "Title" // forms.overlay[1][3].value
              }
            ],
            [
              "SPAN",
              "control",
              "controlBar",
              {
                cssClass: "control",
                listen: [
                  true,
                  "click",
                  function () {
                    let overlay = document.getElementById("overlay");
                    overlay.innerHTML = "";
                    overlay.style.display = "none";
                  }
                ],
                value: "close"
              }
            ],
            ["DIV", "form", "card", { cssClass: "form" }]
          ], // end head
          //--------
          fields: [
            [
              "DIV",
              "noFields",
              "form",
              {
                cssClass: "noForm a nu",
                innerHTML: "No Form",
                listen: [
                  true,
                  "click",
                  function () {
                    let elem = document.getElementById("form");
                    addField(elem, "INPUT");
                  }
                ]
              }
            ]
            // INSERT FORM FIELDS HERE
          ],
          //--------
          submit: [
            [
              // forms.card.submit[0]
              "BUTTON",
              "submit",
              "form",
              {
                value: "submit",
                listen: [
                  true,
                  "click",
                  (this.response = function () {
                    // forms.card.submit[0][3].listen[2]
                    var elems = document.getElementById("form").children;
                    var contents = {};
                    for (var ea = 0; ea < elems.length; ea++) {
                      var key = elems[ea].id || "formField" + ea;
                      var value = elems[ea].value || elems[ea].innerHTML;
                      if (elems[ea].tagName !== "BUTTON") {
                        contents[key] = value;
                      }
                    } // end ea loop
                    warn("this.response() = " + JSON.stringify(contents));
                    let over = document.getElementById("overlay");
                    over.innerHTML = "";
                    over.style.display = "none";
                    return contents;
                  })
                ]
              }
            ]
          ] // end default submit button
        }, // end forms.card
        module: {
          head: [
            ["DIV", "module", "main", { cssClass: "module" }], //{style: "display: overlay"}
            [
              "DIV",
              "title",
              "module",
              {
                cssClass: "header",
                value: "Title" // forms.module.head[1][3].value
              }
            ],
            ["DIV", "controlBar", "module"],
            /*    [
              "SPAN",
              "control",
              "controlBar",
              {
                cssClass: "control",
                listen: [
                  true,
                  "click",
                  function () {
                    let overlay = document.getElementById("overlay");
                    overlay.innerHTML = "";
                    overlay.style.display = "none";
                  }
                ],
                value: "close"
              }
            ], */
            ["DIV", "form", "module", { cssClass: "form" }]
          ], // end head
          //--------
          fields: [
            [
              "DIV",
              "noFields",
              "form",
              {
                cssClass: "noForm a nu",
                innerHTML: "No Form",
                listen: [
                  true,
                  "click",
                  function () {
                    let elem = document.getElementById("form");
                    addField(elem, "INPUT");
                  }
                ]
              }
            ]
            // INSERT FORM FIELDS HERE
          ]
          //--------
        }, // end forms.module
        bit: {
          head: [
            ["DIV", "bit1", "bitBoard"],
            ["DIV", "title1", "bit1", { cssClass: "controlBar" }],
            [
              "DIV",
              "title",
              "controlBar",
              {
                cssClass: "header",
                value: "Title"
              }
            ],
            ["DIV", "form", "bit", { cssClass: "form" }]
          ], // end head
          //--------
          fields: [
            [
              "DIV",
              "noFields",
              "form",
              {
                cssClass: "noForm a nu",
                innerHTML: "No Form",
                listen: [
                  true,
                  "click",
                  function () {
                    let elem = document.getElementById("form");
                    addField(elem, "INPUT");
                  }
                ]
              }
            ]
            // INSERT FORM FIELDS HERE
          ]
        }
        //--------
      };
      window.drags = 0; // added 5.4.20
      var types = [];
      for (var ea in forms) {
        types.push(ea);
      }
      // ---- Header array success and error handlers
      if (inst === "help") {
        alert("var inst = [\n    [\"HEADER\", title, type],\n    [tag, id, parent, options]\n];");
      } else if (inst[0][0] === "HEADER") {
        warn("build() inst: " + inst);
        let header = inst.shift();
        var type = (this.type = header[2]);
        forms[type].fields = inst;
        if (types.includes(type) === false) {
          warn(
            'Error: \'HEADER\' array of format ["HEADER", "Title", {' +
              types.join("/") +
              "}] is not provided. Type provided (" +
              type +
              ") is not valid."
          );
          return;
        }
        var title = (this.title = header[1]);
      } else {
        var err2 = "";
        if (Array.isArray(inst[0])) {
          err2 = ' "' + inst[0][0] + '" is not a valid indicator.';
        } else if (types.includes(inst)) {
          err2 =
            ' Type "' +
            inst +
            "\" is a valid type, but must be provided in the 'HEADER' array, not passed as an argument.";
        } else {
          err2 =
            " Any valid type must be provided in the 'HEADER' array, not passed as an argument.";
        }
        warn(
          'Error: \'HEADER\' array of format ["HEADER", "Title", {' +
            types.join("/") +
            "}] is not provided." +
            err2
        );
        return;
      }
  
      /* let build = function () {
        // ---- Concat 'forms' arrays
        inst = forms[type].head.concat(forms[type].fields);
        if (forms[type].submit) {
          inst = inst.concat(forms[type].submit);
        }
        warn("build() inst: \n" + inst);
        // ---- Locate parent of form
        var formParent = document.getElementById(inst[0][2]);
        if (formParent === null) {
          formParent = new HTMLelement("DIV", inst[0][2]);
        }
        document.querySelector("BODY").append(formParent);
        if (formParent.id === "overlay") {
          document.getElementById(formParent.id).style.display = "block";
        }
        // ---- Build individual elements using 'HTMLelement' class
        for (var ea in inst) {
          let tag = inst[ea][0],
            id = type + window.drags; // replaced 5.4.20 - inst[ea][1];
          if (typeof inst[ea][2] === "string") {
            // added 4.28.20
            var parent = inst[ea][2];
            var options = inst[ea][3];
          } else {
            warn(
              "No parent element indicated: Typeof 'inst[" +
                ea +
                "][2]' is '" +
                typeof inst[ea][2] +
                "'."
            );
            var parent = "form";
            var options = inst[ea][2];
          }
          let newElement = new HTMLelement(tag, id, options);
          var elemParent = document.getElementById(parent);
          if (elemParent === null) {
            elemParent = new HTMLelement("DIV", parent);
          }
          elemParent.append(newElement);
          HTMLobject[newElement.id] = document.getElementById(newElement.id);
        } // end ea loop
        //   this.setTitle(ttl); - removed 5.2.20 (errors)
        if (type === "card" || type === "bit") {
          let card = document.getElementById(type + window.drags);
          dragElements(card);
          window.drags++;
        }
      }; // end build()
      */
      let buildElement = function (type) {
        if (!window.drags) {
          window.drags = 0;
        }
        var type = HTMLobject.type;
        var parentName = forms[type].head[0][2]; // "overlay";
        if (document.getElementById(parentName)) {
          var parent = document.getElementById(parentName);
        } else {
          var parent = new HTMLelement("DIV", parentName, {
            cssClass: parentName
          });
          document.body.appendChild(parent);
        }
        let num = window.drags + 1; // set to 1-9 numbering
        let boxId = "box" + num;
        let ctrlBarId = boxId + "controlBar";
        let titleId = boxId + "header";
        let controlId = boxId + "control";
        let textId = boxId + "text";
        var formId = boxId + "form";
        let subBarId = boxId + "subBar";
        let submitId = boxId + "submit";
        let adderId = boxId + "adder";
  
        //----BOX AND HEAD----
        var box = new HTMLelement("DIV", boxId, {
          cssClass: type,
          style: "top: " + (50 + num * 20) + "px; left: " + (50 + num * 10) + "px"
        });
        var ctrlBar = new HTMLelement("DIV", ctrlBarId, {
          cssClass: "controlBar"
        });
        var title = new HTMLelement("DIV", titleId, {
          cssClass: "header",
          innerHTML: HTMLobject.title
        });
        var control = new HTMLelement("SPAN", titleId, {
          cssClass: "a nu control",
          innerHTML: "close",
          listen: [
            true,
            "click",
            function () {
              box.outerHTML = "";
              window.drags = window.drags - 1;
              if (document.getElementById(parentName).innerHTML === "") {
                document.getElementById(parentName).style.display = "none";
              }
            }
          ]
        });
        var form = new HTMLelement("DIV", formId, {
          cssClass: "form"
        });
  
        //----FORM CONTENTS----
        /*  var noForm = new HTMLelement("DIV", boxId + "noForm", {
          cssClass: "noForm a nu",
          innerHTML: "No Form",
          listen: [
            true,
            "click",
            function () {
              let elem = document.getElementById(formId);
              addField(elem, "INPUT");
            }
          ]
        }); */
        // insert
        var fieldObj = {};
        for (let i in forms[type].fields) {
          let f = forms[type].fields;
          let tag = f[i][0];
          let id = f[i][1];
          let parent = f[i][2];
          let opt = f[i][3];
          fieldObj[id] = new HTMLelement(tag, id, opt);
          if (parent !== "form" && fieldObj[parent]) {
            fieldObj[parent].appendChild(fieldObj[id]);
          } else {
            form.appendChild(fieldObj[id]);
          }
        }
  
        //----FOOTER----
        var subBar = new HTMLelement("DIV", subBarId, {
          cssClass: "controlBar"
        });
        var submit = new HTMLelement("BUTTON", submitId, {
          innerHTML: "submit",
          listen: [
            true,
            "click",
            function () {
              var elem = document.getElementById(formId);
              var children = elem.children;
              var array = [];
              for (let ea = 0; ea < children.length; ea++) {
                if (children[ea].value !== "") {
                  array.push(children[ea].value);
                }
              } // end ea loop
              elem.innerText = array.join("\n");
            }
          ]
        });
        var adder = new HTMLelement("SPAN", boxId + "adder", {
          cssClass: "control a",
          innerHTML: "add field",
          listen: [
            true,
            "click",
            function () {
              let elem = document.getElementById(formId);
              addField(elem, "INPUT");
            }
          ]
        });
  
        //----APPENDS----
        box.appendChild(ctrlBar);
        ctrlBar.appendChild(title);
        ctrlBar.appendChild(control);
        box.appendChild(form);
        // form.appendChild(fields[ea]);
        box.appendChild(subBar);
        subBar.appendChild(submit);
        subBar.appendChild(adder);
        parent.appendChild(box);
        if (parent.style.display === "none") {
          parent.style.display = "block";
        }
        document.addEventListener("keydown", function (e) {
          var key = e.key;
          var x = e.which;
          if (key === "Escape" || x === 27) {
            if (document.getElementById("overlay")) {
              alert("escape pressed");
              document.getElementById("overlay").style.display = "none";
            } else {
              alert("'overlay' not found");
            }
          }
        });
        if (type !== "module") {
          window.drags++;
          dragElements(box);
        }
        return box;
      }; // end buildElement()
  
      function addField(parent, tag) {
        let n = parent.id.match(/\d+/);
        if (!parent.fields) {
          parent.fields = 0;
        }
        let f = ++parent.fields;
        let fieldId = "box" + n + "field" + f;
        var field = new HTMLelement(tag, fieldId, {
          placeholder: fieldId
        });
        if (parent.querySelector(".noForm") !== null) {
          parent.querySelector(".noForm").remove();
        }
        parent.appendChild(field);
      } // end addField()
  
      this.setTitle = function (title) {
        this.title.innerHTML = title;
      };
  
      this.setSubmit = function (newFunc) {
        // added 4.26.20
        if (HTMLobject.submit) {
          if (newFunc === "hide") {
            HTMLobject.submit.style.display = "none";
          } else if (newFunc === "show") {
            HTMLobject.submit.style.display = "block";
          } else {
            let elem = HTMLobject.submit;
            elem.style.display = "block";
            var listenType = forms.card.submit[0][3].listen[1];
            var defFunc = forms.card.submit[0][3].listen[2];
            elem.removeEventListener("click", defFunc);
            elem.addEventListener("click", function () {
              newFunc(defFunc);
            });
          }
        } else {
          warn("Warning: No submit button available for provided type.");
        }
      };
  
      this.setType = function (type) {
        let instance = document.getElementById("form").parentNode;
        let setting = instance.parentNode;
        if (types.includes(type)) {
          instance.id = type;
          setting.id = forms[type].head[0][2];
        } else {
          warn("setType() Error: '" + type + "' is not a valid type.");
        }
      };
  
      this.setWideLoc = function (w, x, y) {
        // locate [type] parent
        // set location via style.top & style.left?
      };
  
      this.showStatus = function (bool) {
        this.card.showStatus = bool;
      };
  
      this.test = function (str) {
        warn(str);
      }; // end .test()
  
      this.new = function () {
        // WIP 4.18.20
        // [tag, id, parent, options]
        let inst = [
          ["DIV", "tools", "overlay", { cssClass: "card" }],
          ["DIV", ""]
        ];
        let tools = {};
      }; // end .new()
      console.log("New HTMLform created!");
  
      // Build it ------
      try {
        return buildElement("card");
      } catch (err) {
        warn("'build()' error: " + err.message);
      }
    } // close constructor
  }
  
  //--------UTILITIES--------
  
  function leadZero(n) {
    // returns '9' as '09' and '10' as '10'
    return (n < 10 ? "0" : "") + n;
  }
  
  function amPM(d) {
    // returns time in '7:08 am' format
    var hr = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
    var min = leadZero(d.getMinutes());
    var amPM = d.getHours() < 12 ? "am" : "pm";
    return hr + ":" + min + " " + amPM;
  }
  
  function fullDate(d, div) {
    if (div === undefined) {
      div = "/";
    }
    var Month = d.getMonth() + 1;
    var Date = d.getDate();
    var Year = d.getFullYear();
    var fullDate = Month + div + Date + div + Year;
    return fullDate;
  }
  
  function warn(msg) {
    //alert(msg);
    console.log(msg);
  }