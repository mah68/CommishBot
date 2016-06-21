var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      //botRegex = /notarapper.gif/;
	botRegexI = /^I!$/;
	botRegexThat = /^I BELIEVE THAT!$/;
	botRegexWill = /^I BELIEVE THAT WE WILL!$/;
	botRegexWin = /^I BELIEVE THAT WE WILL WIN!$/;
	botRegexUSA = /USA/;

  if(request.text && botRegexI.test(request.text)) {
	console.log("I BELIEVE")
    this.res.writeHead(200);
    postMessage("I");
    this.res.end();
  } 
  else if(request.text && botRegexThat.test(request.text)) {
    this.res.writeHead(200);
    postMessage("THAT");
    this.res.end();
  }
  else if(request.text && botRegexWill.test(request.text)) {
    this.res.writeHead(200);
    postMessage("WILL");
    this.res.end();
  }
   else if(request.text && botRegexWill.test(request.text)) {
    this.res.writeHead(200);
    postMessage("WIN");
    this.res.end();
  }
  else if(request.text && botRegexUSA.test(request.text)){
	this.res.writeHead(200);
    postMessage("USA");
    this.res.end();
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(key) {
  var botResponse, options, body, botReq;

  //botResponse = ' '
  
  if(key == 'I')
  {
	botResponse = 'I BELIEVE';
  }
  else if (key == 'THAT')
  {
	botResponse = 'I BELIEVE THAT WE';
  }
  else if (key == 'WILL')
  {
	botResponse = 'I BELIEVE THAT WE WILL WIN';
  }
  else if (key == 'WIN')
  {
	botResponse = 'I BELIEVE THAT WE WILL WIN';
  }
  else if (key == 'USA')
  {
	botResponse = 'U-S-A! U-S-A!';
  }

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

/*

  body = {
    "bot_id" : botID,
    "text" : botResponse,
	"attachments" : [    {      "type"  : "image",      "url"   : "https://i.groupme.com/320x240.gif.bf49bb9422e94f9b9548d70b5e5eef11.large"    }  ]
  };
*/

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;