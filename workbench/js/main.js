console.log("workbench 11.18.20");

window.header = {
  codes: {
    iter: "",
    ethnic: {
      1: "Hispanic",
      2: "Not Hispanic",
      3: `Not provided<div><br>
        <a style='color: red' onclick='this.parentNode.outerHTML=\"\"'>
Email/Internet</a><br><br>
        <a style='color: red' onclick='this.parentNode.outerHTML=\"\"'>
Demographics</a></div>`,
      5: "<span style='color:red'>No Co-Applicant</span>",
      11: "Mexican",
      12: "Puerto Rican",
      13: "Cuban",
      14: "Other Hispanic/Latino"
    },
    visual: {
      1: "Provided on Basis",
      2: "Not Provided on Basis",
      4: "<span style='color:red'>No Co-Applicant</span>"
    },
    race: {
      1: "American Indian or Alaska Native",
      2: "Asian",
      3: "Black or African American",
      4: "Native Hawaiian/Pacific islander",
      5: "White",
      6: `Not provided<div><br>
        <a style='color: red' onclick='this.parentNode.outerHTML=\"\"'>
Email/Internet</a><br><br>
        <a style='color: red' onclick='this.parentNode.outerHTML=\"\"'>
Demographics</a></div>`,
      8: "<span style='color:red'>No Co-Applicant</span>",
      21: "Asian Indian",
      22: "Chinese",
      23: "Filipino",
      24: "Japanese",
      25: "Korean",
      26: "Vietnamese",
      27: "Other Asian",
      41: "Native Hawaiian",
      42: "Guamanian or Chamorro",
      43: "Samoan",
      44: "Other Pacific Islander"
    },
    sex: {
      1: "Male",
      2: "Female",
      3: `Not provided<div><br>
        <a style='color: red' onclick='this.parentNode.outerHTML=\"\"'>
Email/Internet</a><br><br>
        <a style='color: red' onclick='this.parentNode.outerHTML=\"\"'>
Demographics</a></div>`,
      6: "Applicant selected male and female",
      5: "<span style='color:red'>No Co-Applicant</span>"
    },
    purpose: {
      // 1: "Purchase, Land Contract Payoff, Construction Loan",
      31: "No/Limited Cash Out",
      32: "Cash/Cash Out"
    },
    occupancy: {
      1: "Primary Residence",
      2: "Secondary Residence",
      3: "<span class='warn click' onmouseover='alert(\"Doc Tracking > Occupancy Afidavit\nLoan Summary > Home Improvements / Cash Out\")'>Investment</span>"
    },
    purchaser: {
      0: "Not applicable/not sold",
      1: "Fannie Mae",
      2: "Ginnie Mae",
      3: "Freddie Mac",
      4: "Farmer Mac",
      5: "Private Securitizer",
      6: "Commercial bank, savings bank or savings association",
      71: "Credit Union, mortgage company or finance company",
      72: "Life insurance company",
      8: "Affiliate institution",
      9: "Other type of purchaser"
    },
    aus: {
      1: "Desktop Underwriter",
      2: "Loan Prospector",
      3: "Technology Open to Approved Lenders",
      4: "Guaranteed Underwriting System",
      6: "Not Applicable" // if no aus, use this
    },
    ausresult: {
      1: "Approve/Eligible",
      2: "Approve/Ineligible",
      3: "Refer/Eligible",
      4: "Refer/Ineligible",
      5: "Refer with Caution",
      6: "Out of Scope",
      7: "Error",
      8: "Accept",
      9: "Caution",
      10: "Ineligible",
      11: "Incomplete",
      12: "Invalid",
      13: "Refer",
      15: "Unable to Determine Code",
      16: "<span style='color: red'>Error: Do not Use</span>",
      17: "Not Applicable", // if no aus, use this
      18: "Accept/Eligible",
      19: "Accept/Ineligible"
    },
    buspurpose: {
      1: "Business/Commercial Purpose",
      2: "Not for Business Purpose"
    },
    actiontaken: {
      1: "Loan Originated"
    },
    bureau: {
      1: "Equifax",
      2: "Experian",
      3: "TransUnion"
    },
    loantype: {
      1: "Conventional",
      2: "Federal Housing Administration",
      3: "Veterans Administration",
      4: "USDA Rural Housing Service/Farm Service Agency"
    },
    amorttype: {
      1: "Fixed Rate",
      2: "Variable Rate"
    },
    lienstatus: {
      1: "First Lien",
      2: "Subordinate Lien *",
      3: "Not Secured by a Lien *",
      4: "Not Applicable *"
    },
    // 8888 for no score & 9 for no score model
    creditscore: {
      8888: "No Score",
      9999: "<span style='color:red'>No Co-Applicant</span>"
    },
    creditmodel: {
      1: "Equifax",
      2: "Experian",
      3: "TransUnion",
      9: "No Score Model",
      10: "<span style='color:red'>No Co-Applicant</span>"
    }
  }, // codes
  formats: {
    money: (num, dec) => toMoney(num, dec),
    percent: (num, dec) => toPercent(num, dec),
    date: (num, style) => toDate(num, style)
  },
  options: { 
    optMarkChange: [() => "#", () => ""],
    optFilterName: [() => true, () => false],
    warnOnReset: false,
    listeningTo: ""
  },

  /**** Example
	ln0: {
		doc: "", // source doc group (maybe just call it "group"?)
		question: "", // name of item (maybe should be "label"?) 
		codecat: "", // [optional] where to look up code meaning
		format: "", // [optional] format for datapoint (e.g.: money)
		ans: "", // original datapoint
    edit: "", // edited datapoint
		trans: "", // [if (codecat)] meaning of code in datapoint
    notice: "", // [optional] special trans to display conditionally?
    hidden: false, // record of whether item is hidden (generated by preset in view or hidden later with a button)
    disabled: false // record of whether item is checked off 
	}, 
	****/
  database: {
    ln0: { doc: "Loan Summary", question: "Status Color" },
    ln1: { doc: "Loan Summary", question: "Branch" },
    ln2: { doc: "Loan Summary", question: "Application Submission" },
    ln3: { doc: "Loan Summary", question: "Initially Payable to Us" },
    ln4: { doc: "Loan Summary", question: "Universal Loan Indentifer" },
    ln5: { doc: "Loan Summary", question: "Loan Number" },
    ln6: { doc: "Loan Summary", question: "Applicant First Name" },
    ln7: { doc: "Loan Summary", question: "Applicant Last Name" },
    ln8: {
      doc: "1003",
      question: "Loan Type",
      codecat: "loantype",
      edittype: "toggle"
    },
    ln9: { doc: "1003", question: "Loan Term", notice: "months" },
    ln10: {
      doc: "1003",
      question: "Amortization Type",
      codecat: "amorttype",
      edittype: "toggle"
    },
    ln11: {
      doc: "1003",
      question: "Loan Purpose",
      codecat: "purpose",
      edittype: "toggle"
    },
    ln12: {
      doc: "1003",
      question: "Occupancy Type",
      codecat: "occupancy",
      edittype: "toggle"
    },
    ln13: { doc: "Loan Summary", question: "Age of Applicant" },
    ln14: { doc: "Loan Summary", question: "Age of Co-Applicant" },
    ln15: {
      doc: "1008",
      question: "Income",
      action: (num) => {
        return toMoney(num);
      }
    },
    ln16: { doc: "Disclosure Delivery Tracking", question: "Application Date" },
    ln17: {
      doc: "1003",
      question: "Mortgage Loan Originator NMLSR Identifier"
    },
    ln18: {
      doc: "Disclosure Delivery Tracking",
      question: "Ethnicity of Applicant 1",
      codecat: "ethnic",
      edittype: "toggle"
    },
    ln19: {
      doc: "Disclosure Delivery Tracking",
      question: "Ethnicity of Applicant 2",
      codecat: "ethnic",
      edittype: "toggle"
    },
    ln20: {
      doc: "Disclosure Delivery Tracking",
      question: "Ethnicity of Applicant 3",
      codecat: "ethnic",
      edittype: "toggle"
    },
    ln21: {
      doc: "Disclosure Delivery Tracking",
      question: "Ethnicity of Applicant 4",
      codecat: "ethnic",
      edittype: "toggle"
    },
    ln22: {
      doc: "Disclosure Delivery Tracking",
      question: "Ethnicity of Applicant 5",
      codecat: "ethnic",
      edittype: "toggle"
    },
    ln23: {
      doc: "Disclosure Delivery Tracking",
      question: "Ethnicity of Applicant (Other)",
      codecat: "ethnic",
      edittype: "toggle"
    },
    ln24: {
      doc: "Disclosure Delivery Tracking",
      question: "Ethnicity of Applicant Visual Basis/Surname",
      codecat: "visual",
      edittype: "toggle"
    },
    ln25: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Applicant 1",
      codecat: "race",
      edittype: "toggle"
    },
    ln26: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Applicant 2",
      codecat: "race",
      edittype: "toggle"
    },
    ln27: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Applicant 3",
      codecat: "race",
      edittype: "toggle"
    },
    ln28: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Applicant 4",
      codecat: "race",
      edittype: "toggle"
    },
    ln29: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Applicant 5",
      codecat: "race",
      edittype: "toggle"
    },
    ln30: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Applicant (American Indian or Alaskan Native)",
      codecat: "race",
      edittype: "toggle"
    },
    ln31: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Applicant (Asian)",
      codecat: "race",
      edittype: "toggle"
    },
    ln32: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Applicant (Native Hawaiian or Other Pacific Islander)",
      codecat: "race",
      edittype: "toggle"
    },
    ln33: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Applicant - Visual Basis or Surname",
      codecat: "visual",
      edittype: "toggle"
    },
    ln34: {
      doc: "Disclosure Delivery Tracking",
      question: "Sex of Applicant",
      codecat: "sex",
      edittype: "toggle"
    },
    ln35: {
      doc: "Disclosure Delivery Tracking",
      question: "Sex of Applicant - Visual Basis or Surname",
      codecat: "visual",
      edittype: "toggle"
    },
    ln36: {
      doc: "Disclosure Delivery Tracking",
      question: "Ethnicity of Co-Applicant 1",
      codecat: "ethnic",
      edittype: "toggle"
    },
    ln37: {
      doc: "Disclosure Delivery Tracking",
      question: "Ethnicity of Co-Applicant 2",
      codecat: "ethnic",
      edittype: "toggle"
    },
    ln38: {
      doc: "Disclosure Delivery Tracking",
      question: "Ethnicity of Co-Applicant 3",
      codecat: "ethnic",
      edittype: "toggle"
    },
    ln39: {
      doc: "Disclosure Delivery Tracking",
      question: "Ethnicity of Co-Applicant 4",
      codecat: "ethnic",
      edittype: "toggle"
    },
    ln40: {
      doc: "Disclosure Delivery Tracking",
      question: "Ethnicity of Co-Applicant 5",
      codecat: "ethnic",
      edittype: "toggle"
    },
    ln41: {
      doc: "Disclosure Delivery Tracking",
      question: "Ethnicity of Co-Applicant (Other)",
      codecat: "ethnic",
      edittype: "toggle"
    },
    ln42: {
      doc: "Disclosure Delivery Tracking",
      question: "Ethnicity of Co-Applicant - Visual Basis or Surname",
      codecat: "visual",
      edittype: "toggle"
    },
    ln43: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Co-Applicant 1",
      codecat: "race",
      edittype: "toggle"
    },
    ln44: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Co-applicant 2",
      codecat: "race",
      edittype: "toggle"
    },
    ln45: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Co-applicant 3",
      codecat: "race",
      edittype: "toggle"
    },
    ln46: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Co-applicant 4",
      codecat: "race",
      edittype: "toggle"
    },
    ln47: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Co-applicant 5",
      codecat: "race",
      edittype: "toggle"
    },
    ln48: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Co-Applicant (Amercian Indian or Alaskan Native)",
      codecat: "race",
      edittype: "toggle"
    },
    ln49: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Co-Applicant (Asian)",
      codecat: "race",
      edittype: "toggle"
    },
    ln50: {
      doc: "Disclosure Delivery Tracking",
      question:
        "Race of Co-Applicant (Native Hawaiian or Other Pacific Islander)",
      codecat: "race",
      edittype: "toggle"
    },
    ln51: {
      doc: "Disclosure Delivery Tracking",
      question: "Race of Co-Applicant - Visual Basis or Surname",
      codecat: "visual",
      edittype: "toggle"
    },
    ln52: {
      doc: "Disclosure Delivery Tracking",
      question: "Sex of Co-Applicant",
      codecat: "sex",
      edittype: "toggle"
    },
    ln53: {
      doc: "Disclosure Delivery Tracking",
      question: "Sex of Co-Applicant - Visual Basis or Surname",
      codecat: "visual",
      edittype: "toggle"
    },
    ln54: {
      doc: "Disclosure Delivery Tracking",
      question: "Street/Property Address"
    },
    ln55: { doc: "Disclosure Delivery Tracking", question: "City" },
    ln56: { doc: "Disclosure Delivery Tracking", question: "State" },
    ln57: { doc: "Disclosure Delivery Tracking", question: "Zip" },
    ln58: { doc: "Purple", question: "Construction Method" },
    ln59: {
      doc: "1008",
      question: "Property Value",
      action: (num) => {
        return toMoney(num);
      }
    },
    ln60: { doc: "Purple", question: "Total Units" },
    ln61: { doc: "Purple", question: "Multifamily Affordable Units" },
    ln62: { doc: "Purple", question: "Manufactured Home Property Type" },
    ln63: { doc: "Purple", question: "Manufactured Home Property Interest" },
    ln64: {
      doc: "Closing Disclosure - TRID",
      question: "Total Loan Costs",
      action: (num) => {
        return toMoney(num);
      }
    },
    ln65: {
      doc: "Closing Disclosure - TRID",
      question: "Total Points and Fees"
    },
    ln66: {
      doc: "Closing Disclosure - TRID",
      question: "Origination Charges",
      action: (num) => {
        return toMoney(num);
      }
    },
    ln67: {
      doc: "Closing Disclosure - TRID",
      question: "Discount Points",
      action: (num) => {
        return toMoney(num);
      }
    },
    ln68: {
      doc: "Closing Disclosure - TRID",
      question: "Lender Credits",
      action: (num) => {
        return toMoney(num);
      }
    },
    ln69: {
      doc: "Closing Disclosure - TRID",
      question: "Final APR",
      action: (num) => {
        return toPercent(num);
      }
    },
    ln70: {
      doc: "1008",
      question: "Debt-to-Income Ratio",
      action: (num) => {
        return toPercent(num);
      }
    },
    ln71: {
      doc: "1008",
      question: "Combined Loan-to-Value",
      action: (num) => {
        return toPercent(num);
      }
    },
    ln72: {
      doc: "Closing Disclosure - TRID",
      question: "Action Taken",
      codecat: "actiontaken"
    },
    ln73: { doc: "Closing Disclosure - TRID", question: "Action Taken Date" },
    ln74: {
      doc: "Closing Disclosure - TRID",
      question: "Loan Amount",
      action: (num) => {
        return toMoney(num);
      }
    },
    ln75: {
      doc: "Closing Disclosure - TRID",
      question: "Interest Rate",
      action: (num) => {
        return toPercent(num);
      }
    },
    ln76: {
      doc: "Closing Disclosure - TRID",
      question: "Prepayment Penalty Term"
    },
    ln77: {
      doc: "Closing Disclosure - TRID",
      question: "Introductory Rate Period"
    },
    ln78: { doc: "Closing Disclosure - TRID", question: "Balloon Payment" },
    ln79: {
      doc: "Closing Disclosure - TRID",
      question: "Interest-Only Payments"
    },
    ln80: {
      doc: "Closing Disclosure - TRID",
      question: "Negative Amortization"
    },
    ln81: {
      doc: "Closing Disclosure - TRID",
      question: "Other Non-Amortizing Features"
    },
    ln82: { doc: "Closing Disclosure - TRID", question: "Reverse Mortgage" },
    ln83: {
      doc: "Closing Disclosure - TRID",
      question: "Open-End Line of Credit"
    },
    ln84: {
      doc: "HMDA Info Screen",
      question: "Type of Purchaser",
      codecat: "purchaser"
      // edittype: "toggle"
    },
    ln85: { doc: "HMDA Info Screen", question: "Preapproval" },
    ln86: { doc: "Automated Underwriting", question: "AUS 1", codecat: "aus" },
    ln87: { doc: "Automated Underwriting", question: "AUS 2", codecat: "aus" },
    ln88: { doc: "Automated Underwriting", question: "AUS 3", codecat: "aus" },
    ln89: { doc: "Automated Underwriting", question: "AUS 4", codecat: "aus" },
    ln90: { doc: "Automated Underwriting", question: "AUS 5", codecat: "aus" },
    ln91: {
      doc: "Automated Underwriting",
      question: "AUS Free Form Text Field"
    },
    ln92: {
      doc: "Automated Underwriting",
      question: "AUS Result 1",
      codecat: "ausresult"
    },
    ln93: {
      doc: "Automated Underwriting",
      question: "AUS Result 2",
      codecat: "ausresult"
    },
    ln94: {
      doc: "Automated Underwriting",
      question: "AUS Result 3",
      codecat: "ausresult"
    },
    ln95: {
      doc: "Automated Underwriting",
      question: "AUS Result 4",
      codecat: "ausresult"
    },
    ln96: {
      doc: "Automated Underwriting",
      question: "AUS Result 5",
      codecat: "ausresult"
    },
    ln97: {
      doc: "Automated Underwriting",
      question: "AUS Result Free Form Text Field"
    },
    ln98: { doc: "Loan Summary", question: "Compliance Lock Date" },
    ln99: {
      doc: "Loan Summary",
      question: "Lien Status",
      codecat: "lienstatus"
    },
    ln100: { doc: "Loan Summary", question: "HOEPA" },
    ln101: { doc: "Loan Summary", question: "Credit Score of Applicant" },
    ln102: {
      doc: "Loan Summary",
      question: "Applicant - Credit Scoring Model",
      codecat: "bureau"
    },
    ln103: { doc: "Loan Summary", question: "Applicant - Free Text Field" },
    ln104: { doc: "Loan Summary", question: "Credit Score of Co-Applicant" },
    ln105: {
      doc: "Loan Summary",
      question: "Co-applicant - Credit Scoring Model"
    },
    ln106: { doc: "Loan Summary", question: "Co-applicant - Free Text Field" },
    ln107: { doc: "White", question: "Reason for Denial 1" },
    ln108: { doc: "White", question: "Reason for Denial 2" },
    ln109: { doc: "White", question: "Reason for Denial 3" },
    ln110: { doc: "White", question: "Reason for Denial 4" },
    ln111: { doc: "White", question: "Reason for Denial Free Text Field" },
    ln112: {
      doc: "1003",
      question: "Business or Commercial Purpose",
      codecat: "buspurpose"
    },
    ln113: { doc: "Notes", question: "Note" }
  },
  bonus: {
    calcLn:
      "<div class='line'><div class='label'>Calculator:</div><input class='calc'></div>"
  }
};

window.order = {
  /*
  [viewName]: {
    docOrder: ["hmdaInformationScreen", "1008", "closingDisclosureTRID"],
    hidden: { docs: [], lines: ["ln65", "ln72"], unless: {
      ln65: (a) => {
        return a.match("NA") === null;
      }
    }
    },
    [docName]: {
      title: "Closing Disclosure - TRID",
      lnOrder: [
        "ln73", // Action Taken Date
        "ln74" // Loan Amount
      ]
    }
  }
  */
  originatedFix: {
    docOrder: ["hmdaInformationScreen", "1008", "closingDisclosureTRID"],
    hidden: { docs: [], lines: ["ln72", "ln112"], unless: {
      ln72: (a) => {
        return parseInt(a) !== 1;
      },
      ln112: (a) => {
        return parseInt(a) !== 1;
      }
    }
    },
    "1008": {
      title: "1008",
      lnOrder: ["ln70", "ln71"]
    },
    closingDisclosureTRID: {
      title: "Closing Disclosure - TRID",
      lnOrder: [
        "ln73", // Action Taken Date
        "ln74", // Loan Amount
        "ln75", // Interest Rate
        "ln72", // Action Taken
        "ln69" // Final APR
      ]
    },
    hmdaInformationScreen: {
      title: "HMDA Information Screen",
      lnOrder: ["ln112", "ln84", "ln99"]
    }
  },
  investFix: {
    docOrder: ["fundingDocumentation", "hmdaInformationScreen"],
    hidden: { docs: [], lines: [], unless: {} },
    fundingDocumentation: {
      title: "Funding Documentation",
      lnOrder: ["ln73", "ln74", "ln75"]
    },
    hmdaInformationScreen: {
      title: "HMDA Information Screen",
      lnOrder: ["ln84", "ln99"]
    }
  },
  refi: {
    docOrder: [
      "loanSummary",
      "automatedUnderwriting",
      "disclosureDeliveryTracking",
      "1003",
      "1008",
      "closingDisclosureTRID",
      "hmdaInfoScreen",
      "notes"
    ],
    hidden: {
      docs: ["white", "purple"],
      lines: [
        "ln1",
        "ln2",
        "ln3",
        "ln4",
        "ln13",
        "ln14",
        "ln24",
        "ln35",
        "ln33",
        "ln42",
        "ln51",
        "ln53",
        "ln54",
        "ln55",
        "ln56",
        "ln57",
        "ln58",
        "ln60",
        "ln61",
        "ln62",
        "ln63",
        "ln65",
        "ln72",
        "ln80",
        "ln81",
        "ln82",
        "ln83",
        "ln98",
        "ln99",
        "ln100",
        "ln107",
        "ln108",
        "ln109",
        "ln110",
        "ln111"
      ],
      unless: {}
    },
    /*
    getLength: () => {
      alert(JSON.stringify(this));
      var total = 0;
      var docOrder = window.order.refi.docOrder;
      for (var doc in docOrder) {
        total += window.order.refi[docOrder[doc]].length;
      } // end docOrder loop
      return total;
    },*/
    // window.order[view.value][docId].title, .lnOrder
    loanSummary: {
      title: "Loan Summary",
      lnOrder: [
        // "pre1",
        "ln0", // Status
        "ln5", // Loan Number
        "ln6", // Applicant First Name
        "ln7", // Applicant Last Name
        "ln101",
        "ln102",
        "ln103",
        "ln104",
        "ln105",
        "ln106"
      ]
    },
    disclosureDeliveryTracking: {
      title: "Disclosure Delivery Tracking",
      lnOrder: [
        "ln16", // Application Date
        "ln18", // Ethnicity of Applicant 1
        "ln19", // Ethnicity of Applicant 2
        "ln20", // Ethnicity of Applicant 3
        "ln21", // Ethnicity of Applicant 4
        "ln22", // Ethnicity of Applicant 5
        "ln23", // Ethnicity of Applicant (Other)
        "ln34", // Sex of Applicant
        "ln25", // Race of Applicant 1
        "ln26", // Race of Applicant 2
        "ln27", // Race of Applicant 3
        "ln28", // Race of Applicant 4
        "ln29", // Race of Applicant 5
        "ln30", // Race of Applicant (American Indian or Alaskan Native)
        "ln31", // Race of Applicant (Asian)
        "ln32", // Race of Applicant (Native Hawaiian or Other Pacific Islander)
        "ln24", // Ethnicity of Applicant Visual Basis/Surname
        "ln35", // Sex of Applicant - Visual Basis or Surname
        "ln33", // Race of Applicant - Visual Basis or Surname
        "ln36", // Ethnicity of Co-Applicant 1
        "ln37", // Ethnicity of Co-Applicant 2
        "ln38", // Ethnicity of Co-Applicant 3
        "ln39", // Ethnicity of Co-Applicant 4
        "ln40", // Ethnicity of Co-Applicant 5
        "ln41", // Ethnicity of Co-Applicant (Other)
        "ln52", // Sex of Co-Applicant
        "ln43", // Race of Co-Applicant 1
        "ln44", // Race of Co-applicant 2
        "ln45", // Race of Co-applicant 3
        "ln46", // Race of Co-applicant 4
        "ln47", // Race of Co-applicant 5
        "ln48", // Race of Co-Applicant (Amercian Indian or Alaskan Native)
        "ln49", // Race of Co-Applicant (Asian)
        "ln50", // Race of Co-Applicant (Native Hawaiian or Other Pacific Islander)
        "ln42", // Ethnicity of Co-Applicant - Visual Basis or Surname
        "ln53", // Sex of Co-Applicant - Visual Basis or Surname
        "ln51" // Race of Co-Applicant - Visual Basis or Surname
      ]
    },
    "1003": {
      title: "1003",
      lnOrder: [
        "ln11", // Loan Purpose
        "ln12", // Occupancy Type
        "ln112", // Business or Commercial Purpose
        "ln17" // Mortgage Loan Originator NMLSR Identifier
      ]
    },
    "1008": {
      title: "1008",
      lnOrder: [
        "ln59", // Property Value
        "calcLn",
        "ln15", // Income
        "ln70", // Debt-to-Income Ratio
        "ln71" // Combined Loan-to-Value
      ]
    },
    closingDisclosureTRID: {
      title: "Closing Disclosure - TRID",
      lnOrder: [
        "ln73", // Action Taken Date
        "ln74", // Loan Amount
        "ln66", // Origination Charges
        "ln67", // Discount Points
        "ln64", // Total Loan Costs
        "ln68", // Lender Credits
        "ln69" // Final APR
      ]
    },
    hmdaInfoScreen: {
      title: "HMDA Information Screen",
      lnOrder: ["ln84", "ln85"]
    },
    automatedUnderwriting: {
      title: "Automated Underwriting",
      lnOrder: [
        "ln86", // AUS 1
        "ln87", // AUS 2
        "ln88", // AUS 3
        "ln89", // AUS 4
        "ln90", // AUS 5
        "ln91", // AUS Free Form Text Field
        "ln92", // AUS Result 1
        "ln93", // AUS Result 2
        "ln94", // AUS Result 3
        "ln95", // AUS Result 4
        "ln96", // AUS Result 5
        "ln97" // AUS Result Free Form Text Field
      ]
    },
    notes: {
      title: "Notes",
      lnOrder: ["ln113"]
    }
  },
  refiDocs: {
    docOrder: ["1003", "closingDisclosureTRID", "1008"],
    hidden: {
      docs: [],
      lines: [],
      unless: {}
    },
    // window.order[view.value][docId].title, .lnOrder
    "1003": {
      title: "1003",
      lnOrder: [
        "ln8", // Loan Type
        "ln9", // Loan Term
        "ln10", // Amortization type
        "ln11", // Loan Purpose
        "ln12", // Occupancy Type
        "ln17" // Mortgage Loan Originator NMLSR Identifier
      ]
    },
    "1008": {
      title: "1008",
      lnOrder: [
        "ln59", // Property Value
        "calcLn",
        "ln15", // Income
        "ln70", // Debt-to-Income Ratio
        "ln71" // Combined Loan-to-Value
      ]
    },
    closingDisclosureTRID: {
      title: "Closing Disclosure - TRID",
      lnOrder: [
        "ln73", // Action Taken Date
        "ln74", // Loan Amount
        "ln75", // Interest Rate
        "ln77", // Introductory Rate Period
        "ln79", // Interest-Only Payments
        "ln68", // Lender Credits
        "ln66", // Origination Charges
        "ln67", // Discount Points
        "ln64", // Total Loan Costs
        "ln69" // Final APR
      ]
    }
  },
  aus: {
    docOrder: ["automatedUnderwriting"],
    hidden: {
      docs: [],
      lines: []
    },
    automatedUnderwriting: {
      title: "Automated Underwriting",
      lnOrder: [
        "ln86", // AUS 1
        "ln87", // AUS 2
        "ln88", // AUS 3
        "ln89", // AUS 4
        "ln90", // AUS 5
        "ln91", // AUS Free Form Text Field
        "ln92", // AUS Result 1
        "ln93", // AUS Result 2
        "ln94", // AUS Result 3
        "ln95", // AUS Result 4
        "ln96", // AUS Result 5
        "ln97" // AUS Result Free Form Text Field
      ]
    }
  },
  full: {
    docOrder: [
      "1003",
      "1008",
      "loanSummary",
      "disclosureDeliveryTracking",
      "purple",
      "closingDisclosureTrid",
      "hmdaInfoScreen",
      "automatedUnderwriting",
      "white",
      "notes"
    ],
    hidden: {
      docs: [],
      lines: []
    },
    "1003": {
      title: "1003",
      lnOrder: ["ln8", "ln9", "ln10", "ln11", "ln12", "ln17", "ln112"]
    },
    "1008": {
      title: "1008",
      lnOrder: ["ln15", "ln59", "ln70", "ln71"]
    },
    loanSummary: {
      title: "Loan Summary",
      lnOrder: [
        "ln0",
        "ln1",
        "ln2",
        "ln3",
        "ln4",
        "ln5",
        "ln6",
        "ln7",
        "ln13",
        "ln14",
        "ln98",
        "ln99",
        "ln100",
        "ln101",
        "ln102",
        "ln103",
        "ln104",
        "ln105",
        "ln106"
      ]
    },
    disclosureDeliveryTracking: {
      title: "Disclosure Delivery Tracking",
      lnOrder: [
        "ln16",
        "ln18",
        "ln19",
        "ln20",
        "ln21",
        "ln22",
        "ln23",
        "ln24",
        "ln25",
        "ln26",
        "ln27",
        "ln28",
        "ln29",
        "ln30",
        "ln31",
        "ln32",
        "ln33",
        "ln34",
        "ln35",
        "ln36",
        "ln37",
        "ln38",
        "ln39",
        "ln40",
        "ln41",
        "ln42",
        "ln43",
        "ln44",
        "ln45",
        "ln46",
        "ln47",
        "ln48",
        "ln49",
        "ln50",
        "ln51",
        "ln52",
        "ln53",
        "ln54",
        "ln55",
        "ln56",
        "ln57"
      ]
    },
    purple: {
      title: "Purple",
      lnOrder: ["ln58", "ln60", "ln61", "ln62", "ln63"]
    },
    closingDisclosureTrid: {
      title: "Closing Disclosure - TRID",
      lnOrder: [
        "ln64",
        "ln65",
        "ln66",
        "ln67",
        "ln68",
        "ln69",
        "ln72",
        "ln73",
        "ln74",
        "ln75",
        "ln76",
        "ln77",
        "ln78",
        "ln79",
        "ln80",
        "ln81",
        "ln82",
        "ln83"
      ]
    },
    hmdaInfoScreen: {
      title: "HMDA Info Screen",
      lnOrder: ["ln84", "ln85"]
    },
    automatedUnderwriting: {
      title: "Automated Underwriting",
      lnOrder: [
        "ln86",
        "ln87",
        "ln88",
        "ln89",
        "ln90",
        "ln91",
        "ln92",
        "ln93",
        "ln94",
        "ln95",
        "ln96",
        "ln97"
      ]
    },
    white: {
      title: "White",
      lnOrder: ["ln107", "ln108", "ln109", "ln110", "ln111"]
    },
    notes: {
      title: "Notes",
      lnOrder: ["ln113"]
    }
  },
  gmi: {
    docOrder: ["disclosureDeliveryTracking"],
    hidden: {
      docs: [],
      lines: ["ln24", "ln35", "ln33", "ln42", "ln51", "ln53"],
      unless: {
        ln24: (a) => {
          return parseInt(a) !== 2;
        },
        ln35: (a) => {
          return parseInt(a) !== 2;
        },
        ln33: (a) => {
          return parseInt(a) !== 2;
        },
        ln42: (a) => {
          return parseInt(a) !== 2 && parseInt(a) !== 4;
        },
        ln51: (a) => {
          return parseInt(a) !== 2 && parseInt(a) !== 4;
        },
        ln53: (a) => {
          return parseInt(a) !== 2 && parseInt(a) !== 4;
        }
      }
    },
    /*
    loanSummary: {
      title: "Loan Summary",
      lnOrder: ["ln0", "ln5", "ln6", "ln7"]
    },*/
    disclosureDeliveryTracking: {
      title: "Disclosure Delivery Tracking",
      lnOrder: [
        // "ln16",
        "ln18",
        "ln19",
        "ln20",
        "ln21",
        "ln22",
        "ln23",
        "ln34",
        "ln25",
        "ln26",
        "ln27",
        "ln28",
        "ln29",
        "ln30",
        "ln31",
        "ln32",
        "ln24",
        "ln35",
        "ln33",
        "ln36",
        "ln37",
        "ln38",
        "ln39",
        "ln40",
        "ln41",
        "ln52",
        "ln43",
        "ln44",
        "ln45",
        "ln46",
        "ln47",
        "ln48",
        "ln49",
        "ln50",
        "ln42",
        "ln51",
        "ln53"
      ]
    }
  }
};

function nav() {
  var vw = window.order[view.value];
  var docOrder = vw.docOrder;
  var hideLines = vw.hidden.lines;
  var array = [];
  var obj = {};
  for (var i in docOrder) {
    var doc = docOrder[i];
    for (var l in vw[doc].lnOrder) {
      var ln = vw[doc].lnOrder[l];
      if (!hideLines.includes(ln)) {
        array.push(ln);
      }
    } // end vw[doc].lnOrder loop
  } // end docOrder loop
  for (var index in array) {
    if (index === 0) {
      var up = array.length;
    } else {
      var up = index - 1;
    }
    if (index === array.length) {
      var dn = 0;
    } else {
      var dn = index + 1;
    }
    obj[ln] = {
      prev: document.getElementById(array[up]),
      next: document.getElementById(array[dn])
    };
  } // end array loop
  return obj;
}

function moveFocus(ln, previous) {
  var vw = window.order[view.value];
  var hideLines = vw.hidden.lines;
  var docOrder = vw.docOrder;
  var array = [];
  var target;
  for (var doc in docOrder) {
    var docId = docOrder[doc];
    for (var l in vw[docId].lnOrder) {
      var line = vw[docId].lnOrder[l];
      if (!hideLines.includes(line)) {
        array.push(line);
      }
    } // end docOrder[doc] loop
  } // end docOrder loop
  var index = array.indexOf(ln);
  var next = index + 1;
  var prev = index - 1;
  if (!previous) {
    target = document.getElementById(array[next]);
    if (!target) {
      target = document.getElementById(array[next - 1]); // stay on same element
    }
  } else {
    target = document.getElementById(array[prev]);
    if (!target) {
      target = document.getElementById(array[prev + 1]); // stay on same element
    }
  }
  return target;
}

function addListeners() {
  var lines = document.getElementsByClassName("line");
  for (var i in lines) {
    if (lines[i].id && !lines[i].classList.contains("hidden")) {
      lines[i].setAttribute("tabindex", "0");
      lines[i].classList.add("click");
      lines[i].addEventListener("click", toggleDisable);
      lines[i].addEventListener("contextmenu", editLine);
      lines[i].addEventListener("keypress", (event) => {
        var active = document.activeElement;
        event = event || window.event;
        var key = event.which || event.keyCode;
        if (!event.shiftKey && key === 13) {
          // enter
          console.log("Disabling " + active.id);
          toggleDisable();
        } else if (event.shiftKey && key === 13) {
          // shift - enter
          active.scrollIntoView({ behavior: "smooth", block: "center" });
          editLine(event);
        } else if (
          !event.shiftKey 
          && !event.altKey 
          && !event.ctrlKey 
          && !event.metaKey 
          && key !== 13 
          && key !== 9 
          && key !== 27
          && active.id.match("ans") === null) {
          editLine(event);
        }
      });
      lines[i].addEventListener("keydown", (event) => {
        var active = document.activeElement;
        var key = event.which || event.keyCode;
        if (key === 32) {
          // space
          event.preventDefault();
          // active.scrollIntoView({ behavior: "smooth", block: "center" });
          toggleDisable();
        } else if (key === 40) {
          // down arrow
          // arrow keys need "keydown"
          // event.preventDefault();
          // active.dispatchEvent(new KeyboardEvent('keydown',{keyCode: 8, which: 8}));
          // window.nav[active.id].prev.focus()
        } else if (key === 38) {
          // up arrow
          // arrow keys need "keydown"
          // window.nav[active.id].next.focus()
        }
      });
    }
  } // end lines loop
  var docs = document.getElementsByClassName("doc-banner");
  for (var ea in docs) {
    if (docs[ea].id) {
      docs[ea].classList.add("click");
      docs[ea].addEventListener("click", toggleHidden);
    }
  } // end docs loop
}

/****** CORE ******/
console.log("CORE");

function viewCount() {
  // move to Utilities
  var order = window.order;
  var count = {};
  for (var vw in order) {
    var lines = [];
    for (var doc in order[vw]) {
      if (doc !== "docOrder" && doc !== "hidden") {
        console.log(vw + ": " + JSON.stringify(order[vw]));
        lines.concat(order[vw][doc].lnOrder);
      }
    } // end order[vw] loop
    count[vw] = lines.length;
  } // end order loop
  return count;
}

//console.log(JSON.stringify(viewCount()));

function loadData_v2(str) {
  if (!str) {
    str = "\t\t\t\t";
  }
  var data = str.split(/\t/g);
  data = fixData(data);
  var db = window.header.database;
  var vw = window.order[view.value];
  var docOrder = vw.docOrder;
  var lines = [];
  var i = 0;
  for (let doc of docOrder) {
    lines = lines.concat(vw[doc].lnOrder);
  } // end docOrder Loop
  console.log("lines = " + lines);
  for (var ln in db) {
    if (ln.match(/ln\d+/) !== null) {
      // if the specified line appears in the current view:
      if (lines.includes(ln)) {
        db[ln].ans = data[i];
        console.log("db[" + ln + "].ans = " + data[i]);
        db[ln].trans = translate(db[ln].codecat, data[i]);
        i++;
        if (data[i] === undefined) {
          break;
        }
      }
    }
  } // end db loop
  return build();
}

function build() {
  var docOrder = window.order[view.value].docOrder;
  var array = [];
  for (let i in docOrder) {
    let docId = docOrder[i];
    array.push(buildDoc(docId));
  }
  output.innerHTML = array.join("");

  //showDatabase();

  setTimeout(() => {
    //addClasses();
    addListeners();
  }, 1000);
}

function buildDoc(docId) {
  var vw = window.order[view.value];
  var docName = vw[docId].title;
  var lineOrder = vw[docId].lnOrder;
  var preTemplate = "";
  /*  `<div id="pre${docId}" class="line">
		</div> <!-- pre bonus -->`; */
  var lines = [];
  var postTemplate = "";
  /* `<div id="post${docId}" class="line">
		</div> <!-- post bonus -->`;*/
  for (let i in lineOrder) {
    let ln = lineOrder[i];
    // if (i < 2) { alert(ln)}
    if (ln.match(/ln\d+/) === null) {
      var line = window.header.bonus[ln];
    } else {
      var line = buildLine(ln);
    }
    lines.push(line);
    /* // TODO - return object with HTML and array of elem references
    var newElem = document.createElement("div");
    newElem.outerHTML = line; */
  } // end lineOrder loop
  return `<div id="${docId}" class="doc-wrapper">
		<div id="bnr${docId}" class="doc-banner">
		  <span id="ttl${docId}" class="doc-title" onclick="document.getElementById('ttl${docId}').scrollIntoView({ behavior: 'smooth' })">${docName}</span>
		</div>
		<div id="itm${docId}" class="items">
		${preTemplate}
		${lines.join("")}
		${postTemplate}
		</div> <!-- items -->
		<div class="doc-buttons">
			<button onclick="copyNotice(this,'copied all!', 3000, true)">copy items</button>
		<button onclick="document.getElementById('itm${docId}').style.display = 'none'; document.getElementById('itm${docId}').innerHTML = 'collapsed'">collapse</button>
		</div>
		</div> <!-- doc-wrapper -->`;
  // removed 10.12.20 - `<span id="ctrl${docId}" class="doc-control">control</span>`;`
}

function buildLine(ln) {
  var db = window.header.database;
  var vw = window.order[view.value];
  var hideLines = vw.hidden.lines;
  var unless = false;
  var q = db[ln].question;
  var a = db[ln].ans;
  var e = db[ln].edit;
  var t = db[ln].trans;
  var n = db[ln].notice;
  var action = db[ln].action;
  if (vw.hidden.unless && typeof vw.hidden.unless[ln] === "function") {
    // check to see if exception is met
    unless = vw.hidden.unless[ln](a);
  }
  if (e) {
    if (action) {
      a = action(e);
    } else {
      a = e;
    }
  } else if (a) {
    if (action) {
      a = action(a);
    }
  } else {
    a = "";
  }
  if (a === "") {
    return ""; // see function addClasses() for ans.classList.add("hidden")
  }
  if (!t) {
    t = "";
  }
  if (n) {
    t = `<span>${n}</span><span id="hdn_trans${ln}" class="hidden">${t}</span>`;
  }
  if (hideLines.includes(ln) && !unless) {
    var add = " hidden";
  } else {
    var add = "";
  }
  var lineTemplate = `<div id="${ln}" class="line${add}">
	  <div id="lbl${ln}" class="label">
		${q}:
	  </div>
		<div id="ans${ln}" class="ans edit">
		  ${a}
		</div>
		<div id="trans${ln}" class="trans">
		  ${t}
		</div>
	</div> <!-- line -->`;
  return lineTemplate;
}

function editLine(event) {
  event.preventDefault();
  var active = document.activeElement;
  var key = event.keyCode;
  var ln = active.id;
  var db = window.header.database;
  var codes = window.header.codes;
  console.log("Edit line: " + ln);
  var ans = document.getElementById("ans" + ln);
  var selectAll = true;
  if (ans.classList.contains("disabled")) {
    toggleDisable();
  }
  if (db[ln].edittype === "toggle") {
    var trans = document.getElementById("trans" + ln);
    var code = ans.innerHTML;
    var codecat = db[ln].codecat;
    code = cycleCodes(code, ln);
    console.log("codes[" + codecat + "][" + code + "]");
    ans.innerHTML = code;
    trans.innerHTML = codes[codecat][code];
    return;
  } else {
    ans.contentEditable = "true";
    var char = String.fromCharCode(key);
    if (char.match(/(\w|\d)/i)) {
      console.log("editLine: char = "+char);
      ans.innerHTML = String.fromCharCode(key);
      //selectAll = false;
    }
    ans.focus();
    if (selectAll) {
      document.execCommand("selectAll", false, null);
    }
    ans.style.color = "black"; // TODO - create CSS class

    ans.addEventListener("keydown", (event) => {
      var key = event.which || event.keyCode;
      if (key === 13 || key === 9) {
        event.preventDefault();
        // Enter or Tab
        var text = ans.innerHTML + checkOption("optMarkChange");
        moveFocus(ln).focus();
        db[ln].edit = text;
        if (db[ln].codecat) {
          var trans = document.getElementById("trans" + ln);
          var codecat = db[ln].codecat;
          trans.innerHTML = codes[codecat][ans.innerHTML.trim()];
        }
        toggleDisable();
        ans.contentEditable = "false";
        simpleCopy(text);
      } else if (key === 27) {
        cancelEdit();
      }
    });
  }
}

/****** HELPERS ******/
console.log("HELPERS");

function simpleCopy(text) {
  var active = document.activeElement;
  hiddenInput.style.display = "block";
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
  hiddenInput.style.display = "none";
  console.log("Copy successful?: " + success);
  if (success) {
    return "successful";
  } else {
    return "failed";
  }
}

function copyItems(docOnly) {
  var array = [];
  var db = window.header.database;
  for (var i in db) {
    var ans = db[i].edit || db[i].ans;
    if (ans && ans !== "") {
      array.push(ans.trim());
    }
  } // end elems loop
  simpleCopy(array.join("\t"));
}

function translate(codecat, num) {
  var codes = window.header.codes;
  if (codes[codecat] && num) {
    var text = codes[codecat][num];
    return text;
  } else {
    return "";
  }
}

function addClasses() {
  var hiddenDocs = window.order[view.value].hidden.docs;
  var hiddenLines = window.order[view.value].hidden.lines;
  var docElems = document.getElementsByClassName("doc-wrapper");
  var lineElems = document.getElementsByClassName("line");
  var docClass = "";
  var lineClass = "";
  for (let d in docElems) {
    let elem = docElems[d];
    if (hiddenDocs.includes(elem.id)) {
      elem.classList.add("hidden");
    }
  }
  for (let l in lineElems) {
    let db = window.header.database;
    let elem = lineElems[l];
    let ln = elem.id;
    let ans = db[ln].ans;
    if (hiddenLines.includes(ln)) {
      elem.classList.add("hidden");
    } else if (ans !== "") {
      elem.classList.add("hidden");
      hiddenLines.push(ln);
    } else if (!hiddenLines.includes(ln) && ans) {
      elem.classList.remove("hidden");
    }
  }
}

function toggleStyle(elem, cssClass) {
  var id = elem.id;
  var x = false;
  var set = [];
  if (id.match("doc") !== null) {
    id = "itmdoc" + id.split("doc")[1];
    var items = document.getElementById(id);
    set = [items];
  } else if (id.match("ln") !== null) {
    var ln = "ln" + id.split("ln")[1];
    var ans = document.getElementById("ans" + ln);
    var trans = document.getElementById("trans" + ln);
    set = [ans, trans];
  }
  for (var i in set) {
    if (set[i].classList.contains(cssClass)) {
      set[i].classList.remove(cssClass);
      x = false;
    } else {
      set[i].classList.add(cssClass);
      x = true;
    }
  } // end set loop
  return x;
}

function toggleDisable() {
  if (!this.id && document.activeElement.id) {
    var elem = document.activeElement;
  } else {
    var elem = this;
  }
  if (!elem.delay) {
    if (elem.id.match("ln") !== null) {
      var ln = "ln" + elem.id.split("ln")[1]; // get line ID
      var ans = document.getElementById("ans" + ln);
      if (ans.contentEditable !== "true") {
        window.header.database[ln].x = toggleStyle(elem, "disabled");
      }
    } else {
      console.log(
        "'" + elem.id + "' is not a line. 'toggleDisable' not added."
      );
    }
    elem.delay = true;
    setTimeout(() => {
      elem.delay = false;
    }, 250);
  } else {
    console.log("toggleDisable blocked by delay.");
  }
}

function toggleHidden() {
  if (!this.id && document.activeElement.id) {
    var elem = document.activeElement;
  } else {
    var elem = this;
  }
  toggleStyle(elem, "hidden");
  //	console.log("window.header.database["+elem.id+"].x = " + window.header.database[elem.id].x);
}

function toggleText(elem, text) {
  if (!elem.innerHTML.match(text)) {
    elem.prev = elem.innerHTML;
    elem.innerHTML = text;
  } else if (elem.prev) {
    elem.innerHTML = elem.prev;
  }
}

function toggleCodes(ln) {
  var ans = document.getElementById("ans" + ln);
  var trans = document.getElementById("trans" + ln);
  var code = ans.innerHTML;
  var db = window.header.database;
  var codes = window.header.codes;
  var vw = window.order[view.value];
  var codecat = db[ln].codecat;
  var codeDB = codes[codecat];
  var save = db[ln].edit;
  /* TODO: make iterator, so function toggleCodes() can be used with any codecat
  for (var ea in codeDB) {
    if (ea == code) {
      save = ()+"#";
      ans.innerHTML = 31;
      trans.innerHTML = codeDB[31];
      simpleCopy(save);
    } */
  if (ln === "ln11") {
    if (code === "32") {
      save = 31 + checkOption("optMarkChange");
      ans.innerHTML = 31;
      trans.innerHTML = codeDB[31];
      simpleCopy(save);
    } else if (code === "31") {
      save = 1 + checkOption("optMarkChange");
      ans.innerHTML = 1;
      trans.innerHTML = codeDB[1];
      simpleCopy(save);
    } else if (code === "1") {
      save = 32 + checkOption("optMarkChange");
      ans.innerHTML = 32;
      trans.innerHTML = codeDB[32];
      simpleCopy(save);
    }
  } else {
    var g = codes.gen(codecat).next().value;
    save = g + checkOption("optMarkChange");
    ans.innerHTML = JSON.stringify(g);
    trans.innerHTML = codeDB[g];
    // simpleCopy(save);
  }
}

function copyNotice(elem, text, ms, all) {
  if (!ms) {
    ms = 3000;
  }
  if (all) {
    copyItems();
  } else {
    simpleCopy(elem.innerHTML);
  }
  window.header.options.warnOnReset = false;
  toggleText(elem, text);
  setTimeout(() => {
    toggleText(elem, text);
  }, ms);
}

function fixData(data) {
  // scrub account # and name from array (if provided)
  if (checkOption("optFilterAcct")) {
    if (data[1].match(/\d{10}/) !== null) {
      data.shift(); // remove [0]
      var acctNum = data.shift();
      simpleCopy(acctNum); // copy & remove [1]
    }
  }
  if (checkOption("optFilterName")) {
    if (data[0].match(/[a-z]+/i) !== null && data[1].match(/[a-z]+/i) !== null) {
      data.shift();
      data.shift(); // ...shift again
    } else if (data[0].match(/[a-z]+/i) !== null) {
      data.shift();
    }
    // && data[i].match(/\d{1,2}\/\d{1,2}\/\d{2,4}/) === null
  }
  return data;
}

function testForData() {
  // Future Project
  var db = window.header.database;
  var array = [];
  for (var ln in db) {
    if (db[ln].ans) {
      array.push(db[ln].ans);
    }
  } // end db loop
  console.log(array.join(",") + " " + array.length);
}

function* iterate(array) {
  for (var i in array) {
    yield array[i];
  }
}

function looper(code, codecat) {
  var list = window.header.codes[codecat];
  var array = [];
  var arr1 = [];
  var arr2 = [];
  var use = false;
  if (code.match(/\n/) !== null) {
    code = code.trim();
  } // code = 31
  for (var ea in list) {
    if (ea === code) {
      // 1 === 31 FALSE // 31 === 31 TRUE // 32 === 31 FALSE
      use = true; // // use = TRUE //
      arr1.push(ea); // // arr2 = [1,31] //
    } else if (use === true) {
      // use === FALSE // // use === TRUE
      arr1.push(ea); // // // arr1 = [32]
    } else {
      arr2.push(ea); // arr2 = [1] //  //
    }
  } // end list loop
  array = arr1.concat(arr2);
  return iterate(array);
}

function cycleCodes(code, ln) {
  var codes = window.header.codes;
  var db = window.header.database;
  var codecat = db[ln].codecat;
  if (!db[ln].iter) {
    db[ln].iter = looper(code, codecat);
  }
  var n = db[ln].iter.next();
  if (!n.done) {
    return n.value;
  } else {
    db[ln].iter = looper(code, codecat);
    return db[ln].iter.next().value;
  }
}

function cancelEdit() {
  var active = document.activeElement;
  var db = window.header.database;
  var ln = active.id.match(/ln\d+/);
  if (db[ln].edit && db[ln].edit !== "") {
    active.innerHTML = db[ln].edit;
  } else {
    active.innerHTML = db[ln].ans;
    active.style = "color: blue";
  }
  active.contentEditable = "false";
}

/****** UTILITIES ******/
console.log("UTILITIES");

function camelCase(str) {
  // UTILITIES
  var except = "in the and with from of is a an or at";
  str = str.replace(/[^\w\s]/gi, "");
  str = str.toLowerCase().split(/[\s\_]/g);
  for (var i in str) {
    if (i === 0) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    } else {
      if (except.match(str[i]) === null) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
    }
  } // end i loop
  str = str.join("");
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function toMoney(num) {
  if (num === "NA" || num == 0) {
    return "NA";
  } else {
    var fm = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });
    return fm.format(num);
  }
}

function toPercent(num) {
  if (num === "NA" || num == 0) {
    return "NA";
  } else {
    var fm = new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 3
    });
    return fm.format(num / 100);
  }
}

function toTime(num, type) {
  if (!type || type !== "date" || type !== "time" || type !== "datetime") {
    console.log(
      'A \'type\' argument was not provided for \'toTime()\' function. Check the function call and input with "date", "time", or "datetime"'
    );
    return num;
  } else if (type === "date") {
    var fm = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    });
    return fm.format(num);
  } else if (type === "time") {
    var fm = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
    return fm.format(num);
  } else if (type === "datetime") {
    var fm = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
    return fm.format(num);
  }
}

function figure_v2(elem) {
  if (typeof elem === "string") {
    alert(
      "function 'figure_v2()' requires an element as an argument. A string has been provided."
    );
  }
  var num = elem.value.toString();
  if (num.match(/\%/g) !== null) {
    return num;
  }
  if (num.match(/[\/\*\+\-]/) !== null) {
    var opers = num.match(/[\/\*\+\-]/g);
    var nums = num.split(/[\/\*\+\-]/);
    var calc = (num1, num2, oper) => {
      if (oper === "/") {
        num1 = parseInt(num1 * 100) / 100 / (parseInt(num2 * 100) / 100);
      } else if (oper === "*") {
        num1 = (parseInt(num1 * 100) / 100) * (parseInt(num2 * 100) / 100);
      } else if (oper === "-") {
        num1 = parseInt(num1 * 100) / 100 - parseInt(num2 * 100) / 100;
      } else if (oper === "+") {
        num1 = parseInt(num1 * 100) / 100 + parseInt(num2 * 100) / 100;
      }
      return num1;
    };
    for (var i = 1; i < nums.length; i++) {
      nums[0] = calc(nums[0], nums[i], opers[i - 1]);
    } // end i loop
    if (nums[0] < 1) {
      nums[0] = Math.round(nums[0] * 10000) / 100 + "%";
    }
    elem.value = nums[0];
  } else {
    elem.value = Math.round((num * 12) / 1000) * 1000;
  }
  //output.classList.add("numbers");
}

function clearDatabase() {
  var warnReset = window.header.options.warnOnReset;
  if (warnReset) {
    var result = confirm("Warning! You have not copied the data.\n\nDo you wish to proceed?");
    if (!result) {
      console.log("Reset cancelled");
      return;
    }
  }
  var db = window.header.database;
  for (var ln in db) {
    db[ln].ans = "";
    db[ln].edit = "";
    db[ln].trans = "";
  }
  loadData_v2();
  warnReset = false;
  paste.focus();
  return "Database cleared!";
}

function listClasses(inst) {
  var array = [];
  for (var i in inst) {
    if (inst[i][3] && inst[i][3].cssClass) {
      array.push(inst[i][3].cssClass);
    }
  } // end inst loop
  return "." + array.join(" {\n\t\n}\n\n.") + " {\n\t\n}";
}

function generateView(name, outToText) {
  var db = window.header.database;
  var obj = {
    docOrder: [],
    hidden: {
      docs: [],
      lines: []
    }
  };
  var ct = 0;
  for (let ln in db) {
    if (ln.match(/ln\d{1,3}/) !== null) {
      var doc = camelCase(db[ln].doc);

      if (!obj[doc]) {
        obj[doc] = { title: db[ln].doc, lnOrder: [] };
      }
      obj[doc].lnOrder.push(ln);
    }
  }
  if (outToText) {
    var viewString = JSON.stringify(obj)
      .replace(/\,/g, ", ")
      .replace(/\:/g, ": ")
      .replace(/\{/g, "{\n")
      .replace(/\[/g, "[\n")
      .replace(/\}/g, "\n}")
      .replace(/\]\,/g, "\n],\n");
    //	simpleCopy(viewString);
    output.innerText += `"${name}": ` + viewString;
  }
  return obj;
}

function showDatabase() {
  var db = window.header.database;
  var obj = {};
  for (let ln in db) {
    if (ln.match(/ln\d+/) !== null) {
      obj[ln] = db[ln];
    }
  }
  output.innerText = JSON.stringify(obj)
    .replace(/\,/g, ", ")
    .replace(/\:/g, ": ")
    .replace(/\{/g, "{\n")
    .replace(/\[/g, "[\n")
    .replace(/\}/g, "\n}")
    .replace(/\]\,/g, "\n],\n");
}

function checkOption(id) {
  var elem = document.getElementById(id);
  var opt = window.header.options;
  if (elem.checked) {
    return opt[id][0]();
  } else {
    return opt[id][1]();
  }
}

function showAll(viewOption) {
  if (!viewOption) {
    viewOption = view.value;
  } else {
    view.value = viewOption;
  }
  var db = window.header.database;
  var vw = window.order[viewOption];
  var docOrder = vw.docOrder;
  var array = [];
  for (var i in docOrder) {
    var doc = docOrder[i];
    var lnOrder = vw[doc].lnOrder;
    for (var l in lnOrder) {
      var ln = lnOrder[l];
      if(db[ln].edit && db[ln].edit !== "") {
        var answer = " = "+ db[ln].edit;
        array.push(ln +": "+ db[ln].question + answer);
      } else {
        if (db[ln].ans && db[ln].ans !== "") {
          var answer = " = "+ db[ln].ans;
        } else {
          var answer = "";
        }
        array.push(ln +": "+ db[ln].question + answer);
      }
    } // end doc loop
  } // end docOrder loop
  alert(array.join("\n"));
  return; // TODO - complete this:
  /*
  var data = array.join("\t");
  loadData_v2(data);
  paste.value = "";
  output.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
  var elems = document.getElementsByClassName("hidden");
  for (var h in elems) {
    elems[h].classList.remove("hidden");
  } // end elems loop
  }, 3000);
  */
}

/****** LISTENERS ******/
console.log("LISTENERS");

paste.onblur = (event) => {
  if (paste.value.trim() !== "") {
    var key = event.which || event.keyCode;
    var elem = document.activeElement;
    if (key !== 13) {
      loadData_v2(paste.value);
      paste.value = "";
      //output.scrollIntoView({ behavior: "smooth" });
    }
  }
};

paste.onchange = (event) => {
  window.header.options.warnOnReset = true;
};

paste.onkeyup = (event) => {
  var split = paste.value.split("\t");
  if (split[0] === "" && split[1] !== "" && paste.value !== "") {
    paste.value = "\t" + paste.value.trim();
  } else {
    paste.value = paste.value.trim();
  }
};

document.addEventListener("keypress", (event) => {
  var key = event.which || event.keyCode;
  var elem = document.activeElement;
  if (key === 13) {
    // Enter
    if (elem.classList.contains("calc")) {
      figure_v2(elem);
    } else if (elem.id === "paste") {
      loadData_v2(paste.value);
      paste.value = "";
      output.scrollIntoView({ behavior: "smooth" });
    }
  }
});

document.addEventListener("keydown", (e) => {
  if (!document.key) {
    document.key = [];
  } else if (document.key.length === 2) {
    document.key.shift();
  }
  var elems = {
    86: document.getElementById("paste"), // alt - f
    8: clearDatabase // alt - backspace
  };
  document.key.push(e.which || e.keyCode);
  console.log(document.key);
  var key = document.key[1];
  if (document.key[0] === 18 && key && key !== 18) {
    if (typeof elems[key] === "function") {
      warn.innerHTML = elems[key]();
      return;
    } else if (elems[key]) {
      // e.preventDefault();
      console.log(document.key + " - " + elems[key].id + " field");
      elems[key].scrollIntoView({ behavior: "smooth" });
      if (elems[key].tagName === "INPUT") {
        elems[key].select();
        elems[key].focus();
      }
    }
  }
});

document.addEventListener("change", (event) => {
  var active = document.activeElement;
  if ((active.type = "checkbox")) {
    var text = active.parentNode.innerText.split(/[\[\:]/)[0];
    simpleCopy(text);
  }
});
