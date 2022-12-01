const trelloDB = { 
    //generate key & token: https://trello.com/app-key
    url: "https://api.trello.com",
    key: "0b877c1aedbb0d48de9640ab4eef390d",
    token: "c587ea719822e90c47660d69094aaddc4acabb2bed2995649f36070caadc8dab",
    idUser: "jamieklueck",
    board: {name: "JK-Master TODO List"},
    filter: {
      incomplete: (card) => {
        for (var i in card.labels) {
          var test = card.labels[i].name === "Incomplete" && card.labels[i].color === "yellow";
          if (test) { return true; }
        }
      },
      active: (card) => {
        for (var i in card.labels) {
          var test = card.labels[i].name === "Active" && card.labels[i].color === "green";
          if (test) { return true; }
        }
      },
      information: (card) => {
        for (var i in card.labels) {
          var test = card.labels[i].name === "Information" && card.labels[i].color === "purple";
          if (test) { return true; }
        }
      },
      must: (card) => {
        var patt = new RegExp(`^${prefix}`,"g");
        return card.name.match(patt);
      },
    },
    format: {
      format1: (card) => {
        var due = new Date(card.due).toLocaleDateString();
        var labels = card.labels.map((ea) => `<div class="label ${ea.color}">${ea.name}</div>`);
        return `<div class="card">
        <p onclick="window.open('${card.shortUrl}')" class="clickable">${card.name}</p>
        <p>${due}</p>
        <div class="labels">${labels.join("")}</div>
        </div>`;
      },
    }
  };

function fetchByPrefix(prefix) {
    let request = boardRequest();
    fetch(request[0],request[1]).then((boards) => {
        if (trelloDB.board.id) { trelloDB.board.id = "" }
        for (var b in boards) {
            var board = boards[b];
            if (board.name === trelloDB.board.name) {
                trelloDB.board.id = board.id;
                break;
            }
        }
        if (trelloDB.board.id) {
            let request = cardsRequest(board.id);
            fetch(request[0],request[1]).then((cards) => {
                prefix = new RegExp(`^${prefix}`,"g")
                var content = [];
                for (var c in cards) {
                    var card = cards[c];
                    if (card.name.match(prefix)) {
                        content.push(`[${card.name}]`);
                    }
                }
                inputCopies.value = content.join("--");
                inputCopyItems(inputCopies);
            })
        } else {
            inputCopies.value = "";
        }
    })
}

function boardRequest() {
    var key = trelloDB.key;
    var token = trelloDB.token;
    var idUser = trelloDB.idUser;
    var request = [
        `https://api.trello.com/1/members/${idUser}/boards?key=${key}&token=${token}`, 
        {method: 'GET'}
    ];
    return request;
}

function cardsRequest(boardID) {
    //var fetch = UrlFetchApp.fetch;
    var key = trelloDB.key;
    var token = trelloDB.token;
    let request = [
      `https://api.trello.com/1/boards/${boardID}/cards?key=${key}&token=${token}`, 
      {method: "GET" }
    ];
    return request;
}

async function fetchBoardID(boardName) {
    //var fetch = UrlFetchApp.fetch;
    var key = trelloDB.key;
    var token = trelloDB.token;
    var idUser = trelloDB.idUser;
    var result = await fetch(
      `https://api.trello.com/1/members/${idUser}/boards?key=${key}&token=${token}`, 
      {method: 'GET'}
    );
    console.log("fetchBoardID, result = "+result);
    var boards = result; // removed - JSON.parse(result);
    for (var bd in boards) {
      var board = boards[bd];
      if (board.name === boardName) {
        trelloDB.boardData = board;
        return board.id;
      }
    }
  }

  async function fetchCards(boardID) {
    //var fetch = UrlFetchApp.fetch;
    var key = trelloDB.key;
    var token = trelloDB.token;
    let result = await fetch(
      `https://api.trello.com/1/boards/${boardID}/cards?key=${key}&token=${token}`, 
      {method: "GET" });
    var cards = result; // removed - JSON.parse(result);
    return cards;
  }

async function getCardsByBoard(boardName) { //getCardsByBoard(boardName).filterCards((card) => card.name.match(/^MUST DO/gi))
    if (!boardName) { boardName = "JK-Master TODO List"}
    var boardID = await fetchBoardID(boardName);
    console.log("getCardsByBoard, boardID = "+boardID);
    var cards = await fetchCards(boardID);
    console.log("getCardsByBoard, cards[0].name = "+cards[0].name);
    var board = {cards: cards};
    board.getNames = (filter) => {
      var cards = board.cards;
      var names = [];
      for (var c in cards) {
        var card = cards[c];
        if (filter(card)) {
          names.push(card.name);
        }
      }
      return names;
    };
    board.filterCards = (filterName) => {
      var cards = board.cards;
      if (typeof filterName !== "function") {
        var filter = (card) => {
          return trelloDB.filter[filterName](card);
        };
      } else {
        var filter = filterName;
      }
      board.cards = cards.filter(filter);
      return board;
    };
    board.getFormatted = (format) => {
      var cards = board.cards;
      var items = [];
      //var ct = [0,5]; // test
      for (var c in cards) {
       // if (ct[0] >= ct[1]) {break} //test
        var card = cards[c];
        if (typeof card === "function") { continue; }
        if (typeof format === "function") {
          items.push(format(card));
        } else if (typeof format === "string") {
          items.push(trelloDB.format[format](card));
        } else {
          return ["Error: 'format' must be a custom function or string name of preset formatter."];
        }
      //  ct[0]++; // test
      }
      return items.join("");
    };
    return board;
}