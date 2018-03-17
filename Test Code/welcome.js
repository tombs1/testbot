const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const SavageJokesList = require('./jokelist.json');
var jsonfile = require('jsonfile')

var file = '/home/pi/Royal Bot/write.json'


var caps=[];
var min=1;
var max=[];  
var prefix = "`";
var test = '/home/pi/Royal Bot/test.json';

let BT=['n'];
var BU=[];
var DPS=[];
var NC=[];
var PT13=[];
var PT2=[];

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

	if(MessageReaction.emoji.name = ":BT:381996088082825216" && BT.length<1){	
		BT[0] = user.username; 
		client.channels.get('381974948324966403').send("Basetank is : "+BT[0]);
		      }
	else

	if(MessageReaction.emoji.name = ":BU:382036476260515851" && BU.length<1){	
		BU[0] = user.username; 
		client.channels.get('381974948324966403').send("Backup Tank is : "+BU[0]);
		      }	
	else{return};	   
 
});
*/ 
//Prefix, command rejections
   // if(!message.content.startsWith(prefix)) return;
    if(message.author === client.user) return;

    if(message.guild.id === '326018003344818197'){console.log('TEST SCRIPT ALLOWED');} else {console.log('TEST SCRIPT DENIDED: Incorrect channel'); return;}



 


//~~~~~~~~~~~~~~~~~~~~~~Test Functions Below~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    
    if (message.content.toLowerCase().startsWith (prefix + "clr") && message.channel.id === ('381974948324966403'))
        {
	message.channel.send({embed: 
         {
         color: 16724530,  
    	 fields: 
          [
		{name: "__**Welcome to the Royal Rascals Discord Group:**__",value: 'I hope you feel welcomed and comfortable in our discord'},
       		{name: "__**Our Clan:**__",value: 'You can find out what we are all about here: \n <http://services.runescape.com/m%3Dforum/forums.ws?290,291,85,65889129>'},
		{name: "__**Clan Reddit:**__",value: 'Check our reddit out for even more information about us:\n<https://www.reddit.com/r/RoyalRascals/>'},				
		{name: "__**Ranking System:**__",value: 'Our ranking system can be found here:\n<https://imgur.com/Qfnaxrk>'},		
		{name: "__**Rules:**__",value: 'Our clan rules are taken seriously, please ensure you read our rules listed here:\n<https://www.reddit.com/r/RoyalRascals/comments/71qb95/clan_rules_20/>'},
        	{name: "__**Any Questions or Concerns?**__", value: 'Feel free to contact any of the following Clan Owners by clicking their names below and typing a message, we are always happy to help:\n <@264431226188857357> \n <@264155544439226369> \n <@291993211910750209>'}
    	  ],
    	 thumbnail: {url: 'https://i.imgur.com/nyeBNDc.png'},
         }
       })
	message.channel.send({embed: 
         {
         color: 16724530,  
    	 fields: 
          [
		{name: "__**Discord Breakdown:**__",value: 'Below provided is the breakdown of our discord channel'},
       		{name: "__General Category:__",value: '\n    <#289094363659894785>: Talk to fellow clan members or our friendly guests' +
                            '\n<#325719602124292097>: Find out what is new in the clan or important announcements' +
			    '\n<#353259103004524545>: Find out what events or giveaways we will be hosting in the near future'+
                	    '\n<#340892046573305856>: Post any pictures you want, NSFW pictures are not allowed'},

		{name: "__Bossing Category:__",value:'\n<#364422047667060736>: Sign up to be taught the basics of PvM '+
 			    '\n<#374587475319980032>: Beastmaster Sign Ups'+
 			    '\n<#366595433151332353>: Nex: Angel of Death Sign ups'},


        	{name: "__Help and Discord Bot Category:__", value: '\n    <#367735847182663682>: Here you can find important clan links, and important runescape links '+
			    '\n<#359448318486642688>: You can ask us any question and we will respond as fast as we can '+
			    '\n<#366593168369778688>: You can use bots in this channel, it also includes our custom made bot <@353560064465829899> which was created and maintained by <@291993211910750209>'}
    	  ],
    	thumbnail: {url: 'https://i.imgur.com/SHLLDBm.png'}, 
	footer: {text: "We hope you enjoy our clan"}
         }
       })
     
        }
   else
   
   if (message.content.toLowerCase().startsWith (prefix + "bt") && message.channel.id === ('381974948324966403'))
        {
	    var BT;
	    if(BT[0]= 'n'){message.channel.send('BaseTank is: '+ message.author.username);}
	    else {message.channel.send('This role is already filled'); return;}
	
        }
   else

    if (message.content.toLowerCase().startsWith (prefix + "bu") && message.channel.id === ('381974948324966403'))
        {
	   message.channel.send('BackupTank is: '+ message.author.username);
        }
   else

    if (message.content.toLowerCase().startsWith (prefix + "bt") && message.channel.id === ('381974948324966403'))
        {
	   message.channel.send('BaseTank is: '+ message.author.username);
        }
   else

    if (message.content.toLowerCase().startsWith (prefix + "bt") && message.channel.id === ('381974948324966403'))
        {
	   message.channel.send('BaseTank is: '+ message.author.username);
        }

  });

  client.login(settings.token);

 
