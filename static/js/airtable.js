function show(item){
  document.getElementById('main').innerHTML = item;
}

var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyJ17zT7aV8fDDxF'
});
var base = Airtable.base('appffxjnfZPJUmCxX');

base('Table 1').find('recOQw31ZQNWIJbRp', function(err, record) {
    if (err) { console.error(err); return; }
    console.log('Retrieved', record.id);
});

//https://api.airtable.com/v0/appffxjnfZPJUmCxX/Table%201?fields%5B%5D=Name&fields%5B%5D=Notes&fields%5B%5D=Date