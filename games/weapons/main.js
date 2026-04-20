

function calc() {
	var dmg = parseInt(damage.value);
	if (compDamage.value.match(/^[+-]/g)) {
	var currDmg = dmg - parseInt(compDamage.value);
} else {
	var currDmg = parseInt(compDamage.value);
}
	var rof = parseInt(rate.value);
	if (compRate.value.match(/^[+-]/g)) {
	  var currRate = rof - parseInt(compRate.value);
} else {
	var currRate = parseInt(compRate.value);
}
	var val = dmg * rof;
	var compVal = currDmg * currRate;
	if (val > compVal) {
		var res = "New weapon is better.";
	} else if (val < compVal) {
		var res = "Current weapon is better.";
	} else if (val === compVal) {
		var res = "Weapons are equal.";
	}
	return "Damage: "+dmg+" vs "+currDmg+"<br>Rate of Fire: "+rof+" vs "+currRate+"<br>" + val + " vs "+ compVal+"<br>"+res;
}

function doMath(e) {
	var oper = e.target.value.match(/[+*-/]/g);
	var value = e.target.value;
	if (oper && value.match(/^\d/g)) {
		var vals = value.split(oper[0]);
		var a = parseInt(vals[0]);
		var b = parseInt(vals[1]);
	} else if ((oper && value.match(new RegExp("^\\"+oper,"g"))) || !oper) {
		return;
}
	switch (oper[0]) {
	  case "+": 
		var func = (a,b) => a+b;
		break;
	  case "-":
		var func = (a,b) => a-b;
		break;
	  case "*":
		var func = (a,b) => a*b;
		break;
	  case "/":
		var func = (a,b) => a/b;
		break;
	}
	e.target.value = func(a,b);
}

function clearInputs() {
	var inputs = document.getElementsByTagName("input");
	for (var i in inputs) {
		inputs[i].value = "";
	}
}

setTimeout(
  () => {
	  var elems = document
		.getElementsByTagName("input");
	  for (var ea in elems) {
		if (typeof elems[ea] !== "object") {continue}
		elems[ea].addEventListener("change",
		   doMath);
	  }
}, 2000);