const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const SavageJokesList = require('./jokelist.json');
var jsonfile = require('jsonfile')

var file = '/home/pi/Royal Bot/write.json'


var caps=[];
var min=1;
var max=[];  
var prefix = ";";
var test = '/home/pi/Royal Bot/test.json';

BU='kek';
BT='lol';
var BTcount=0;
var BUcount=0;
var NCcount=0;
var PT13count=0;
var PT2count=0;
DPScount=0;

//Lets You know when the bot is online in the command window
client.on('ready',() => {
    console.log('SCRIPT TESTING BOT NOW ONLINE!');

});

//Time stamps for console window
client.on('message', message => {
   require( "console-stamp" )( console, 
   {
     metadata: function () 
     {return ("TEST SCRIPT!: ");},
     pattern:"HH:MM:ss",
     label: false,
     colors: {stamp: "yellow",label: "white",metadata: "green"}
   });
    console.log(message.content);



 

/*client.on('messageReactionAdd', (MessageReaction, user) => {
var BU=[];
var DPS =[];
var BT=[];
//DPScount;

	if(MessageReaction.emoji.id === "381996088082825216" && BTcount<1){	
		
		BT.push(user.username);
		message.channel.send('BaseTank is: '+ BT[0]);
		BTcount=BTcount+1;
		      }
	else
	if(MessageReaction.emoji.id === "382036476260515851" && BUcount<1){	 
		BU.push(user.username);
                message.channel.send('Backup is: '+ BU[0]);
		BUcount=BUcount+1;
		      }		   
 	else
	if(MessageReaction.emoji.id === "382974540579340288" && DPScount<5)
		{
		DPS.push(message.author.username);
		message.channel.send('DPS '+(DPScount+1)+'  is: '+ DPS[DPScount]);
		DPScount=DPScount +1;
		}
	else
	if(DPScount=5)
	       {
	       message.channel.send('DPS Role is Full');
	       DPScount=DPScount +1;

	       }
	else
	if(DPScount>6)
	       {
	       return;
	       }
else{return};

})
 
*/




//Prefix, command rejections
    if(!message.content.startsWith(prefix)) return;
    if(message.author === client.user) return;
    if(message.guild.id === '326018003344818197'){console.log('TEST SCRIPT ALLOWED');} else {console.log('TEST SCRIPT DENIDED: Incorrect channel'); return;}



//~~~~~~~~~~~~~~~~~~~~~~Test Functions Below~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   
BT="kek";
BU="lel";
 
    if (message.content.toLowerCase().startsWith (prefix + "bm") && message.channel.id === ('381974948324966403'))
        {
	var BT,BU,NC, PT13, PT2;
	var DPS=[];	
	BTcount=0;
	BUcount=0;
	NCcount=0;
	PT13count=0;
	PT2count=0;
	DPScount=0;

	
         }
 
   else
   
   if (message.content.toLowerCase().startsWith (prefix + "bt") && message.channel.id === ('381974948324966403'))
        {
	    message.delete();	    
	    if(BTcount<1)
		{
		
		BT = message.author.username;
		message.channel.send('BaseTank is: '+ BT);
		BTcount=BTcount +1;
		}
	    else {message.author.send('Base Tank role is already filled'); return;}
	
        }
   else

   if (message.content.toLowerCase().startsWith (prefix + "bu") && message.channel.id === ('381974948324966403'))
        {
	    message.delete();	    
	    if(BUcount<1)
		{
		
		BU = message.author.username;
		message.channel.send('Backup Tank is: '+ BU);
		BUcount=BUcount +1;
		}
	    else {message.author.send('Backup Tank role is already filled'); return;}
	        
        }
   else

   if (message.content.toLowerCase().startsWith (prefix + "nc") && message.channel.id === ('381974948324966403'))
        {
	    message.delete();	    
	    if(NCcount<1)
		{
		NC = message.author.username;
		message.channel.send('North Chargers is: '+ NC);
		NCcount=NCcount +1;
		}
	    else {message.author.send('North Charger role is already filled'); return;}
	
        }
   else

   if (message.content.toLowerCase().startsWith (prefix + "pt13") && message.channel.id === ('381974948324966403'))
        {
	    message.delete();	    
	    if(PT13count<1)
		{
		PT13 = message.author.username;
		message.channel.send('Pet Tank 13 is: '+ PT13);
		PT13count=PT13count +1;
		}
	    else {message.author.send('Pet Tank 13 role is already filled'); return;}
	
        }
   else

   if (message.content.toLowerCase().startsWith (prefix + "pt2") && message.channel.id === ('381974948324966403'))
        {
	    message.delete();	    
	    if(PT2count<1)
		{
		PT2 = message.author.username;
		message.channel.send('Pet Tank 2 is: '+ PT2);
		PT2count=PT2count +1;
		}
	    else {message.author.send('Pet Tank 13 role is already filled'); return;}
	
        }
   else

   if (message.content.toLowerCase().startsWith (prefix + "dps") && message.channel.id === ('381974948324966403'))
        {
	    message.delete();
	    if(DPScount<5)
		{
		DPS.push(message.author.username);
		message.channel.send('DPS '+(DPScount+1)+'  is: '+ DPS[DPScount]);
		DPScount=DPScount +1;
		}
	else
	    if(DPScount=5)
		{
		message.author.send('DPS Role is Full');
		}
        }


   else
    
    if (message.content.toLowerCase().startsWith (prefix + "list") && message.channel.id === ('381974948324966403'))
        {
	   message.channel.send('BT BU: '+BT+'  '+BU);
        }

  });

  client.login(settings.token);

 