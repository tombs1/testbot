//Files Required
const Discord = require('/home/pi/node_modules/discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const SavageJokesList = require('./savagejokelist.json');
const JokeList = require('./jokelist.json');
const jsonfile = require('jsonfile');
const fs = require('fs');

//Modifiable Rates and Values
const prefix = "!";
const prefix2 = "!!";
const rateLimitVal = 5000;
const rateLimitValMassRole = 15000;
const staffArray=["Staff","Owner", "Deputy Owner", "Overseer", "Coordinator"];
const pvmteacherArray=["PvM Host","Owner", "Deputy Owner", "Overseer", "Coordinator"];
const mentionBypass = ["Staff","Owner", "Deputy Owner", "Overseer", "Clan Event Planner", "Royal-Bot","Community Manager", "PvM Host"];
const mentions=["<@&398416848846192640>","<@&392024915282362389>","@everyone","<@&359325014073278466>","@here","<@&393154215402536962>"];
//REMINDER of mentions=["\@Staff","\@Owner","\@PvM Teacher","\@everyone","\@Rascal!","@here","\@KEK"];
const citPrize = "Citadel Booster for Next Reset";

//Roles with aliases
const gwd2Boss = {name: ['Gwd2'],alias: ['gwd2','god wars dungeon 2']};
const gwd1Boss = {name: ['Gwd1'],alias: ['gwd1','god wars dungeon 1']};
const raxBoss = {name: ['Araxxi'],alias: ['rax','araxxor','araxxi']};
const eleBoss = {name: ['Chaos Elemental'],alias: ['chaos','chaosele','chaoselemental','chaos elemental', 'ele']};
const corpBoss = {name: ['Corporeal Beast'],alias: ['corporeal beast','corporeal','corp','corporealbeast']};
const dagBoss = {name: ['Dagannoth Kings'],alias: ['dag','dks','dagonnoth kings']};
const moleBoss = {name: ['Giant Mole'],alias: ['mole','giant mole']};
const kbdBoss = {name: ['King Black Dragon'],alias: ['kbd','king black dragon']};
const rotsBoss = {name: ['Barrows: Rise of the Six'],alias: ['rots','rot','']};
const bmBoss = {name: ['Beastmaster'],alias: ['beastmaster','bm']};
const aodBoss = {name: ['AoD'],alias: ['aod','nex aod','nexaod']};
const kkBoss = {name: ['Kalphite King'],alias: ['kk','kalphiteking','kalphite king']};
const nexBoss = {name: ['Nex'],alias: ['nex']};
const ragoBoss = {name: ['Vorago'],alias: ['rago','ragu','vorago']};
const yakaBoss = {name: ['Yakamaru'],alias: ['yaka','yakamaru']};
const dung = {name: ['Dungeoneering'],alias: ['dung','dungeoneering','dg']};
const minigames = {name: ['Minigames'],alias: ['minigames','mini','mini game','minigame']};
const pvmTag = {name: ['PvM'],alias: ['pvm','pvmer','pvming']};
const pvpTag = {name: ['PvP'],alias: ['pvp','pvper','pvping']};

//Lets You know when the bot is online in the command window and records bootup time in UNIX
client.on('ready',() => {
    console.log('Royal Bot Online!');
    fs.writeFile('/home/pi/Royal Bot/limiter.txt', Date.now(), function(err)
	 {if(err){return console.log(err);}});
});

//Leave message - Message sent to channel to show who left the server!
client.on("guildMemberRemove",function(member) {
    try{
let nameLeave = member;
member.guild.channels.find("name","server-activity").send(nameLeave+ " has left the clan server");}
    catch (err){console.error(err)}
});

//Welcome message - Message sent and displayed when a new user joins! Autoassigns Assign rank Role
client.on("guildMemberAdd",function(member) 
    {
    try{
	member.guild.channels.find("name","general").send(member.toString()+ "\n***Welcome to the Royal Rascals clan discord server!***\n You can learn more about our clan and discord in the <#402992864566706186> channel.");
        member.guild.channels.find("name","server-activity").send(member.toString()+ " has joined the clan server");
	let joinRole = member.guild.roles.find('name', 'Assign Rank');
        member.addRole(joinRole); 
	console.log('New member joined!');   
    }
    catch (err){console.error(err)}      
});

//Time stamps for console window, and records chat
client.on('message', message => {
   require( "console-stamp" )( console, 
   {
     metadata: function () 
     {return (message.author.tag+":");},
     pattern:"HH:MM:ss",
     label: false,
     colors: {stamp: "yellow",label: "white",metadata: "green"}
   });
    console.log(message.content);
    jsonfile.writeFileSync('/home/pi/Royal Bot/chatlog.json', message.author.tag+": "+message.content, {flag: 'a'});

//Warns people in a PM if they use mentions like @everyone, @rascal etc
    if(mentions.some(m=>message.content.includes(m)) && !message.member.roles.some(r=>mentionBypass.includes(r.name)) && message.guild.id === ('289094363659894785'))
     {
      var msgstr = message.content;
      message.delete();
      client.channels.get('356654828488884224').send(message.author.username+" has used a **__mention__** tag that is not allowed!");
      message.author.send("__**🚫 Unfortunately your post has been deleted!🚫**__\n__Reason:__\n In order to stop spam we have locked the everyone, Rascal!, Pvmer, and PVMTEACH mention tags behind clan staff ranks, please try to avoid using these tags in the future. \n\n__Warning:__\n If you intentionally continue to use these tags you will be given a temporary mute in our server.\n\n__Any Questions?__\n If you have any question about this please feel free to contact any of the clan owners below.\n 👑<@!264431226188857357>\n 👑<@!264155544439226369>\n 👑<@!291993211910750209>\n\n*Thanks for your understanding.*");
     }

//Complaint and feedback channel
    if(message.channel.id === ('413471466219241483'))
     {
     var feedback = message.content;
     message.delete();
     client.channels.get('413478167588896768').send("__**Clan feedback\/complaint has been submitted:**__ \n*"+feedback+"*"); 
     message.author.send("Your feedback has been submitted to the Clan Owners and Community Managers");
     }

//Prefix and command rejections
    if(!message.content.startsWith(prefix)) return;
    if(message.author === client.user) return;
    if(message.guild.id === ('289094363659894785')){console.log('Command entered in correct channel');} else {console.log('incorrect channel'); return;}
    if(message.member.roles.some(r=>["Banned from using commands"].includes(r.name))) {message.author.sendMessage('You have been banned from using commands, contact RIP to restore your permissions'); message.delete(); return};

//functions to reload
    let currentCaps = require('/home/pi/Royal Bot/weekcap.json');   

//~~~~~~~~~~~~~~~~~~~~~~Commands start here, Newest ones are at the top~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
//!split  <dropvalue> <people> <hammer>
    if(message.content.toLowerCase().startsWith (prefix + "split"))
     {

       let messageArray=  message.content.slice(7).split([" "]);
       if(!messageArray[0]) return(message.reply("You forgot to specify certain values. \nExample: **__!split 550 10 y__** will split 550m with 10 people and give hammer a split"));
       if(!messageArray[1]) return(message.reply("You forgot to specify certain values. \nExample: **__!split 550 10 y__** will split 550m with 10 people and give hammer a split"));
       if(!messageArray[2]) return(message.reply("You forgot to specify certain values. \nExample: **__!split 550 10 y__** will split 550m with 10 people and give hammer a split"));

       if(messageArray[2].toLowerCase() === 'y') 
	{
	 let tipAmount = (messageArray[0]*0.02).toFixed(2);
	 let splitAmount = ((messageArray[0]-tipAmount)/messageArray[1]).toFixed(2);
	 let hammerTotal = ((messageArray[0]*0.02)+((messageArray[0]-tipAmount)/messageArray[1])).toFixed(2);
         client.channels.get('366593168369778688').send("<:GP:367490170754170880> **__Drop Split Calculation__** <:GP:367490170754170880> \nSplitting a "+messageArray[0]+"M valued drop with "+messageArray[1]+ " people including 2% hammer tip!\n\n__**Resulting Splits:**__\n    __Hammer:__ ***"+hammerTotal+"M*** which includes a tip of ***"+tipAmount+"M***\n    __Everyone Else:__ ***"+splitAmount+"M***");
	 return;
 	}
       if(messageArray[2].toLowerCase() === 'n') 
	{
	 let splitAmount = ((messageArray[0]/messageArray[1])).toFixed(2);
         client.channels.get('366593168369778688').send("<:GP:367490170754170880> **__Drop Split Calculation__** <:GP:367490170754170880> \nSplitting a "+messageArray[0]+"M valued drop with "+messageArray[1]+ " with no hammer tip!\n\n__**Resulting Splits:**__\n    __Everyone Gets:__ ***"+splitAmount+"M***");
	 return;
	}
    
       else
	{
         client.channels.get('366593168369778688').send(":no_entry: I don\'t know whether or not a hammer was used. Use values y or n. :no_entry: ");
	 return;
	}   
     }
    else 

//!clearcaps v2.0: Resets citadel and rolls a winner
    if(message.content.toLowerCase().startsWith (prefix + "clearcaps"))
     {
      if(!message.member.roles.some(r=>staffArray.includes(r.name)))
       {
        client.channels.get('356654828488884224').send(message.author.username+" has used the !clearcaps command and is not allowed to!");
        return message.reply("Only clan staff can use this command!");
       }

      message.guild.roles.find('name', 'Capper').delete();
      console.log('Capper Role has been deleted');

      let guild = message.member.guild;
      guild.createRole({name: 'Capper',permissions: []});
      console.log('Capper Role has been recreated');

      let rolled = Math.random() * currentCaps.length;
      let result = Math.floor(rolled);
      let rollnum = Math.floor(rolled)+Math.floor(1);

      client.channels.get('353259103004524545').send(":european_castle:__** Citadel Raffle Winner **__ :european_castle: \nThere are a total of ***"+currentCaps.length+"***  clanmates entered in this raffle! Rolling for winner :game_die:\nRoyalBot rolled a ***"+rollnum+ "***  and the winner is <@" +currentCaps[result]+"> the prize was ***"+citPrize+"***");      
      client.channels.get('289094363659894785').send(":european_castle: **__The citadel has reset!__** :european_castle: \n <@&359325014073278466> Please help us reach Tier 7 Citadel by capping, and don't forget to use the !capped command");

      jsonfile.writeFileSync('/home/pi/Royal Bot/caplistBackup.json', "++++++++++++++  NEW WEEK  ++++++++++++++", {flag: 'a'}); 
      client.channels.get('353887197541302272').send("++++++++++++++  NEW WEEK  ++++++++++++++"); 

      fs.writeFile('/home/pi/Royal Bot/weekcap.json', "[]");   
      delete require.cache[require.resolve('/home/pi/Royal Bot/weekcap.json')];

      client.channels.get('356654828488884224').send("__**Citadel has been Reset**__, and winner has been rolled. Thanks to **__"+message.author.username+"__**");   
     }
    else 

//!capped v2.0: Marks a user as capping in our citadel and stores name in an array. 
    if (message.content.toLowerCase().startsWith (prefix + "capped"))
     {
      if(message.member.roles.some(r=>["Guest"].includes(r.name)))
      return message.reply("Sorry, you are a guest and cannot be marked as capped:(");

      if(message.member.roles.some(r=>["Capper"].includes(r.name)))
      return message.reply("Sorry, you have already been marked as capped.");
    
      if(message.channel.id != 366593168369778688)
       {
        message.delete();
        client.channels.get('356654828488884224').send(message.author.username+" has used the !capped in the wrong channel.");
	message.author.send("You have been marked as capped in our citadel, however in order in order to minimize spam in specific channels your post was deleted. Next time please use the !capped command in the <#366593168369778688> channel. Thanks");
       };
      
      var storename = message.member.nickname;

      if (!storename)
       {
        client.channels.get('356654828488884224').send("<@291993211910750209> No nickname set for "+message.author.tag)
       };

      var nametowrite = (storename+"/"+message.author.tag);
      var mentionPerson = message.author.id;
      jsonfile.writeFileSync('/home/pi/Royal Bot/caplistBackup.json', nametowrite, {flag: 'a'});
      
      currentCaps.push(mentionPerson);
      personCap = JSON.stringify(currentCaps);

      fs.writeFile('/home/pi/Royal Bot/weekcap.json',personCap);
	  
      client.channels.get('353887197541302272').send(storename+"/"+message.author.tag);
      client.channels.get('362646662948061184').send(storename+"/"+message.author.tag+" <@291993211910750209>");
      client.channels.get('366593168369778688').send(message.author.username+' has capped in our citadel, and has been entered into the  weekly citadel raffle. [Current Prize: ***'+citPrize+'***]'); 	  

      let guild = message.member.guild;
      let capRole = guild.roles.find('name', 'Capper');
      message.member.addRole(capRole);  
 
     }
    else 

//!removeallroles 
    if (message.content.toLowerCase().startsWith (prefix + "removeallroles"))
     {
      if(message.member.roles.some(r=>["Guest"].includes(r.name)))
       {
        return message.reply("Sorry, you are a guest and cannot assign yourself roles.");
       }

      if(message.channel.id != 366593168369778688)
       {
	message.delete();
	message.author.send("Command was processed, however in order in order to minimize spam in specific channels your post was deleted. \nNext time please use the command in the <#366593168369778688> channel. \nThanks");
	client.channels.get('356654828488884224').send(message.author.username+" has assigned all roles in the wrong channel!");
       };

      var timecheck = fs.readFileSync('/home/pi/Royal Bot/limiter.txt');	
      var timeDiff = Math.floor(Math.floor(Date.now()) - Math.floor(timecheck));
 
      if(Math.floor(timeDiff) > Math.floor(rateLimitValMassRole))
       {
        fs.writeFile('/home/pi/Royal Bot/limiter.txt', Date.now(), function(err)
        {
         if(err) 
          {
           return console.log(err);
          }
         }
        );
            
        let guild = message.member.guild;       
        let roleChange1 = guild.roles.find('name', gwd2Boss.name[0]); message.member.removeRole(roleChange1);
        let roleChange2 = guild.roles.find('name', gwd1Boss.name[0]); message.member.removeRole(roleChange2); 
        let roleChange3 = guild.roles.find('name', raxBoss.name[0]); message.member.removeRole(roleChange3); 
        let roleChange4 = guild.roles.find('name', eleBoss.name[0]); message.member.removeRole(roleChange4);   
        let roleChange5 = guild.roles.find('name', corpBoss.name[0]); message.member.removeRole(roleChange5); 
        let roleChange6 = guild.roles.find('name', dagBoss.name[0]); message.member.removeRole(roleChange6); 
        let roleChange7 = guild.roles.find('name', moleBoss.name[0]); message.member.removeRole(roleChange7); 
        let roleChange8 = guild.roles.find('name', kbdBoss.name[0]); message.member.removeRole(roleChange8); 
        let roleChange9 = guild.roles.find('name', rotsBoss.name[0]); message.member.removeRole(roleChange9);    
        let roleChange10 = guild.roles.find('name', bmBoss.name[0]); message.member.removeRole(roleChange10);
        let roleChange11 = guild.roles.find('name', aodBoss.name[0]); message.member.removeRole(roleChange11); 
        let roleChange12 = guild.roles.find('name', kkBoss.name[0]); message.member.removeRole(roleChange12); 
        let roleChange13 = guild.roles.find('name', nexBoss.name[0]); message.member.removeRole(roleChange13);     
        let roleChange14 = guild.roles.find('name', ragoBoss.name[0]); message.member.removeRole(roleChange14);
        let roleChange15 = guild.roles.find('name', yakaBoss.name[0]); message.member.removeRole(roleChange15); 
        let roleChange16 = guild.roles.find('name', dung.name[0]); message.member.removeRole(roleChange16);
        let roleChange17 = guild.roles.find('name', minigames.name[0]); message.member.removeRole(roleChange17);
        let roleChange18 = guild.roles.find('name', pvmTag.name[0]); message.member.removeRole(roleChange18);
        let roleChange19 = guild.roles.find('name', pvpTag.name[0]); message.member.removeRole(roleChange19);
        message.reply('All Discord Roles Removed');
       }
      else
       {
        var timeRemain = Math.ceil(Math.floor(Math.floor(rateLimitValMassRole)-Math.floor(timeDiff))/Math.floor(1000));
        message.channel.send('You must wait 15 seconds between using this command, ***'+timeRemain+' seconds remain.***');}  
       }
      else
  
//!addallroles
    if (message.content.toLowerCase().startsWith (prefix + "addallroles"))
     {
      if(message.member.roles.some(r=>["Guest"].includes(r.name)))
       {
        return message.reply("Sorry, you are a guest and cannot assign yourself roles.");
       }

      if(message.channel.id != 366593168369778688)
       {
	message.delete();
	message.author.send("Command was processed, however in order in order to minimize spam in specific channels your post was deleted. \nNext time please use the command in the <#366593168369778688> channel. \nThanks");
	client.channels.get('356654828488884224').send(message.author.username+" has assigned all roles in the wrong channel!");
       };

      var timecheck = fs.readFileSync('/home/pi/Royal Bot/limiter.txt');	
      var timeDiff = Math.floor(Math.floor(Date.now()) - Math.floor(timecheck));
 
      if(Math.floor(timeDiff) > Math.floor(rateLimitValMassRole))
       {
        fs.writeFile('/home/pi/Royal Bot/limiter.txt', Date.now(), function(err)
        {
         if(err) 
          {
           return console.log(err);
          }
         }
        );
            
        let guild = message.member.guild;       
        let roleChange1 = guild.roles.find('name', gwd2Boss.name[0]); message.member.addRole(roleChange1);
        let roleChange2 = guild.roles.find('name', gwd1Boss.name[0]); message.member.addRole(roleChange2); 
        let roleChange3 = guild.roles.find('name', raxBoss.name[0]); message.member.addRole(roleChange3); 
        let roleChange4 = guild.roles.find('name', eleBoss.name[0]); message.member.addRole(roleChange4);   
        let roleChange5 = guild.roles.find('name', corpBoss.name[0]); message.member.addRole(roleChange5); 
        let roleChange6 = guild.roles.find('name', dagBoss.name[0]); message.member.addRole(roleChange6); 
        let roleChange7 = guild.roles.find('name', moleBoss.name[0]); message.member.addRole(roleChange7); 
        let roleChange8 = guild.roles.find('name', kbdBoss.name[0]); message.member.addRole(roleChange8); 
        let roleChange9 = guild.roles.find('name', rotsBoss.name[0]); message.member.addRole(roleChange9);    
        let roleChange10 = guild.roles.find('name', bmBoss.name[0]); message.member.addRole(roleChange10);
        let roleChange11 = guild.roles.find('name', aodBoss.name[0]); message.member.addRole(roleChange11); 
        let roleChange12 = guild.roles.find('name', kkBoss.name[0]); message.member.addRole(roleChange12); 
        let roleChange13 = guild.roles.find('name', nexBoss.name[0]); message.member.addRole(roleChange13);     
        let roleChange14 = guild.roles.find('name', ragoBoss.name[0]); message.member.addRole(roleChange14);
        let roleChange15 = guild.roles.find('name', yakaBoss.name[0]); message.member.addRole(roleChange15); 
        let roleChange16 = guild.roles.find('name', dung.name[0]); message.member.addRole(roleChange16);
        let roleChange17 = guild.roles.find('name', minigames.name[0]); message.member.addRole(roleChange17);
        let roleChange18 = guild.roles.find('name', pvmTag.name[0]); message.member.addRole(roleChange18);
        let roleChange19 = guild.roles.find('name', pvpTag.name[0]); message.member.addRole(roleChange19);
        message.reply('All Discord Roles added');
       }
      else
       {
        var timeRemain = Math.ceil(Math.floor(Math.floor(rateLimitValMassRole)-Math.floor(timeDiff))/Math.floor(1000));
        message.channel.send('You must wait 15 seconds between using this command, ***'+timeRemain+' seconds remain.***');}  
       }
      else

//!role assigner
    if (message.content.toLowerCase().startsWith (prefix + "role"))
     {
      if(message.member.roles.some(r=>["Guest"].includes(r.name)))
       {
        return message.reply("Sorry, you are a guest and cannot assign yourself roles.");
       }
      if(message.channel.id != 366593168369778688)
       {
	message.delete();
	message.author.send("Command was processed, however in order in order to minimize spam in specific channels your post was deleted. \nNext time please use the command in the <#366593168369778688> channel. \nThanks");
	client.channels.get('356654828488884224').send(message.author.username+" has assigned a role in the wrong channel!");
       };

      var timecheck = fs.readFileSync('/home/pi/Royal Bot/limiter.txt');	
      var timeDiff = Math.floor(Math.floor(Date.now()) - Math.floor(timecheck)); 

      if(Math.floor(timeDiff) > Math.floor(rateLimitVal))
       {
        fs.writeFile('/home/pi/Royal Bot/limiter.txt', Date.now(), function(err)
	 {
          if(err) 
           {
            return console.log(err);}
	   }
	  );   

	let guild = message.member.guild;       
	let roleReq =  message.content.toLowerCase().slice(6).toString();

	if(!roleReq)
	 {
	  message.channel.send(":no_entry: **You forgot to provide the a role you wanted to be assigned** :no_entry: ");
	  return;
	 }

	if(gwd2Boss.alias.indexOf(roleReq) > -1){if(message.member.roles.some(r=>gwd2Boss.name[0].includes(r.name))){message.member.removeRole(guild.roles.find('name', gwd2Boss.name[0])); message.channel.send("Role removed");return;}else{message.member.addRole(guild.roles.find('name', gwd2Boss.name[0]));message.channel.send("Role added"); return;}}
	if(gwd1Boss.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', gwd1Boss.name[0]); if(message.member.roles.some(r=>gwd1Boss.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed");return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}
	if(raxBoss.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', raxBoss.name[0]); if(message.member.roles.some(r=>raxBoss.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed");return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}
	if(eleBoss.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', eleBoss.name[0]); if(message.member.roles.some(r=>eleBoss.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed");return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}   
	if(corpBoss.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', corpBoss.name[0]); if(message.member.roles.some(r=>corpBoss.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed");return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}
	if(dagBoss.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', dagBoss.name[0]); if(message.member.roles.some(r=>dagBoss.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed");return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}
	if(moleBoss.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', moleBoss.name[0]); if(message.member.roles.some(r=>moleBoss.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed");return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}
	if(kbdBoss.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', kbdBoss.name[0]); if(message.member.roles.some(r=>kbdBoss.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed");return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}
	if(rotsBoss.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', rotsBoss.name[0]); if(message.member.roles.some(r=>rotsBoss.name[0].includes(r.name))) {message.member.removeRole(roleChange);message.channel.send("Role removed");return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}     
	if(bmBoss.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', bmBoss.name[0]); if(message.member.roles.some(r=>bmBoss.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed");return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}
	if(aodBoss.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', aodBoss.name[0]); if(message.member.roles.some(r=>aodBoss.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed");return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}
	if(kkBoss.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', kkBoss.name[0]); if(message.member.roles.some(r=>kkBoss.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed"); return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}
	if(nexBoss.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', nexBoss.name[0]); if(message.member.roles.some(r=>nexBoss.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed");return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}    
	if(ragoBoss.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', ragoBoss.name[0]); if(message.member.roles.some(r=>ragoBoss.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed"); return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}
	if(yakaBoss.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', yakaBoss.name[0]); if(message.member.roles.some(r=>yakaBoss.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed"); return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}
	if(dung.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', dung.name[0]); if(message.member.roles.some(r=>dung.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed"); return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}
	if(minigames.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', minigames.name[0]); if(message.member.roles.some(r=>minigames.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed"); return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}
	if(pvmTag.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', pvmTag.name[0]); if(message.member.roles.some(r=>pvmTag.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed"); return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}
	if(pvpTag.alias.indexOf(roleReq) > -1){let roleChange = guild.roles.find('name', pvpTag.name[0]); if(message.member.roles.some(r=>pvpTag.name[0].includes(r.name))) {message.member.removeRole(roleChange); message.channel.send("Role removed"); return;} else{message.member.addRole(roleChange); message.channel.send("Role added"); return;}}
	else{message.author.send('This Role ***'+roleReq+'*** doesn\'t exist or is misspelled.'); return;}
       }
      else
       {
	var timeRemain = Math.ceil(Math.floor(Math.floor(rateLimitVal)-Math.floor(timeDiff))/Math.floor(1000));
	message.channel.send('You must wait 5 seconds between using this command, ***'+timeRemain+' seconds remain.***');
	client.channels.get('356654828488884224').send(message.author.username+" has spammed the role command!");}  
       }
      else

//!events
    if (message.content.toLowerCase().startsWith(prefix + "events"))
        {
	 var eventurl = fs.readFileSync('/home/pi/Royal Bot/eventlist.txt');	

	 if(message.channel.id != 366593168369778688 && !message.member.roles.some(r=>mentionBypass.includes(r.name)))
	  {
	  message.delete();
	  client.channels.get('356654828488884224').send(message.author.username+" used the **__!events__** command in the wrong channel.");
	  message.author.send(":no_entry: ***You should enter bot commands in the bot channel your message has been deleted but I am feeling nice and will post the info requested here:*** :no_entry:\n Clan events listed below: "+eventurl);
	  }
	 else
	 {
	  message.reply("Clan events listed below: "+eventurl);
	 }
        }
 	else

//!uploadevents
    if (message.content.toLowerCase().startsWith(prefix + "uploadevents"))
        {
	 if(!message.member.roles.some(r=>mentionBypass.includes(r.name)))
	  {
	  message.author.send("Only Coordinators+ can use these commands, please avoid using this command");
	  client.channels.get('356654828488884224').send(message.author.username+" has used the !uploadevents command and does not have permission for this.");
          return;
	  }

	 let eventLink =  message.content.slice(14).split([" "]);
	 if(!eventLink[0])
	  {
	  message.channel.send(":no_entry: __For forgot to provide the URL, Example: !uploadevents__ http://eightball.ie/wp-content/uploads/sites/377/2016/05/FAIL.png :no_entry: ");
	  return;
	  }
	 message.channel.send("***The events image has been updated to the one listed above***");
	
	 fs.writeFile('/home/pi/Royal Bot/eventlist.txt', eventLink, function(err) 
	 {if(err) {return console.log(err);}
        });        
        }
 	else

//!!KK Autoposter
    if (message.content.toLowerCase().startsWith(prefix2 + "kk"))
      {
      if(!message.member.roles.some(r=>pvmteacherArray.includes(r.name)))
	{
	 message.author.send("Only PvM Teachers and Staff can use this command, please avoid using this command");
	 client.channels.get('356654828488884224').send(message.author.username+" has used the !!kk command and does not have permission for this.");
         return;
	}

      var post = fs.readFileSync('/home/pi/Royal Bot/Autoposts/kk.txt');	        
      let timeArray=  message.content.slice(5).split([" "]);
      if(!timeArray[0])
	{ 
	 message.delete(); 
	 message.author.send("You didn't specify a time to host Kalphite King!");
	 return;				
	};
      message.delete();
      client.channels.get('356654828488884224').send("**__"+message.author.username+"__** has hosted **__KK!__**");
      client.channels.get('393150875255832577').send("__**"+message.author.username+" will be hosting Kalphite King @ ["+timeArray[0]+"]**__ <@&399339362539536384>"+post);             
      }
     else 

//!!Rots Autoposter
    if (message.content.toLowerCase().startsWith(prefix2 + "rots"))
      {
      if(!message.member.roles.some(r=>pvmteacherArray.includes(r.name)))
	{
         message.author.send("Only PvM Teachers and Staff can use this command, please avoid using this command");
	 client.channels.get('356654828488884224').send(message.author.username+" has used the !!rots command and does not have permission for this.");
         return;
	}

      var post = fs.readFileSync('/home/pi/Royal Bot/Autoposts/rots.txt');	        
      let timeArray=  message.content.slice(7).split([" "]);
      if(!timeArray[0])
	{ 
	message.delete(); 
	message.author.send("You didn't specify a time to host rots!");
	return;				
	};
      message.delete();
      client.channels.get('356654828488884224').send("**__"+message.author.username+"__** has hosted **__RoTs!__**");
      client.channels.get('393150767243984906').send("__**"+message.author.username+" will be hosting Barrows: Rise of the Six @ ["+timeArray[0]+"]**__ <@&399338952567291905>"+post);             
      }
    else  

//!!rago/!!vorago Autoposter
    if (message.content.toLowerCase().startsWith(prefix2 + "rago"))
      {
	if(!message.member.roles.some(r=>pvmteacherArray.includes(r.name))){
	message.author.send("Only PvM Teachers and Staff can use this command, please avoid using this command");
	client.channels.get('356654828488884224').send(message.author.username+" has used the !!vorago command and does not have permission for this.");
        return;
      }

      var post = fs.readFileSync('/home/pi/Royal Bot/Autoposts/rago.txt');	        
      let timeArray=  message.content.slice(7).split([" "]);
      if(!timeArray[0])
       { 
        message.delete(); 
        message.author.send("You didn't specify a time to host Vorago!");
        return;				
       };
      message.delete();
      client.channels.get('356654828488884224').send("**__"+message.author.username+"__** has hosted **__Vorago!__**"); 
      client.channels.get('387983448515805185').send("__**"+message.author.username+" will be hosting Vorago @ ["+timeArray[0]+"]**__ <@&399339762936446977>"+post);             
      }
    else  

//!!yaka Autoposter
    if (message.content.toLowerCase().startsWith(prefix2 + "yaka"))
     {
      if(!message.member.roles.some(r=>pvmteacherArray.includes(r.name))){
      message.author.send("Only PvM Teachers and Staff can use this command, please avoid using this command");
      client.channels.get('356654828488884224').send(message.author.username+" has used the !!yaka command and does not have permission for this.");
      return;
     }

     var post = fs.readFileSync('/home/pi/Royal Bot/Autoposts/yaka.txt');	    
     let timeArray=  message.content.slice(7).split([" "]);

     if(!timeArray[0])
     { 
      message.delete(); 
      message.author.send("You didn't specify a time to host Yakamaru!");
      return;				
     };

     message.delete();
     client.channels.get('356654828488884224').send("**__"+message.author.username+"__** has hosted **__Yakamaru!__**");  
     client.channels.get('374587475319980032').send("__**"+message.author.username+" will be hosting Yakamaru @ ["+timeArray[0]+"]**__ <@&399340085440544779>"+post);      
     }
    else  

//!!aod7 Autoposter
    if (message.content.toLowerCase().startsWith(prefix2 + "aod7"))
     {
      if(!message.member.roles.some(r=>pvmteacherArray.includes(r.name)))
       {
        message.author.send("Only PvM Teachers and Staff can use this command, please avoid using this command");
	client.channels.get('356654828488884224').send(message.author.username+" has used the !!aod7 command and does not have permission for this.");
        return;
       }

      var post = fs.readFileSync('/home/pi/Royal Bot/Autoposts/aod7.txt');	
      let timeArray=  message.content.slice(7).split([" "]);
       
      if(!timeArray[0])
       { 
        message.delete(); 
	message.author.send("You didn't specify a time to host Nex: Angel of Death!");
	return;				
	};

      message.delete();
      client.channels.get('356654828488884224').send("**__"+message.author.username+"__** has hosted **__AoD 7 Man!__**");
      client.channels.get('403236463363489802').send("__**"+message.author.username+" will be hosting 7 Man AoD @ ["+timeArray[0]+"]**__ <@&403225305764069387>"+post);           
     }
    else  

//!!aod9 learner Autoposter
    if (message.content.toLowerCase().startsWith(prefix2 + "aod9"))
     {
      if(!message.member.roles.some(r=>pvmteacherArray.includes(r.name)))
       {
        message.author.send("Only PvM Teachers and Staff can use this command, please avoid using this command");
	client.channels.get('356654828488884224').send(message.author.username+" has used the !!aod command and does not have permission for this.");
        return;
       }

      var post = fs.readFileSync('/home/pi/Royal Bot/Autoposts/aod9.txt');	
      let timeArray=  message.content.slice(7).split([" "]);
       
      if(!timeArray[0])
       { 
        message.delete(); 
	message.author.send("You didn't specify a time to host Nex: Angel of Death!");
	return;				
	};

      message.delete();
      client.channels.get('356654828488884224').send("**__"+message.author.username+"__** has hosted **__AoD!__**");
      client.channels.get('366595433151332353').send("__**"+message.author.username+" will be hosting 9 Man AoD @ ["+timeArray[0]+"]**__ <@&407698131766083593>"+post);           
     }
    else  

//!!aod learner Autoposter
    if (message.content.toLowerCase().startsWith(prefix2 + "aod"))
     {
      if(!message.member.roles.some(r=>pvmteacherArray.includes(r.name)))
       {
        message.author.send("Only PvM Teachers and Staff can use this command, please avoid using this command");
	client.channels.get('356654828488884224').send(message.author.username+" has used the !!aod command and does not have permission for this.");
        return;
       }

      var post = fs.readFileSync('/home/pi/Royal Bot/Autoposts/aod.txt');	
      let timeArray=  message.content.slice(6).split([" "]);
       
      if(!timeArray[0])
       { 
        message.delete(); 
	message.author.send("You didn't specify a time to host Nex: Angel of Death!");
	return;				
	};

      message.delete();
      client.channels.get('356654828488884224').send("**__"+message.author.username+"__** has hosted **__AoD!__**");
      client.channels.get('407697905093312512').send("__**"+message.author.username+" will be hosting Nex: Angel of Death Learner Event @ ["+timeArray[0]+"]**__ <@&399339212559745045>"+post);           
     }
    else  

//!!bm Autoposter for hosting BM
    if (message.content.toLowerCase().startsWith(prefix2 + "bm"))
     {
      if(!message.member.roles.some(r=>pvmteacherArray.includes(r.name)))
       {
        message.author.send("Only PvM Teachers and Staff can use this command, please avoid using this command");
        client.channels.get('356654828488884224').send(message.author.username+" has used the !!bm command and does not have permission for this.");
        return;
       }

      var post = fs.readFileSync('/home/pi/Royal Bot/Autoposts/bm.txt');	
      let timeArray =  message.content.slice(5).split([" "]);
      if(!timeArray[0])
       { 
        message.delete(); 
        message.author.send("You didn't specify a time to host Beastmaster Durzag!");
        return;
       };

      message.delete();
      client.channels.get('356654828488884224').send("**__"+message.author.username+"__** has hosted **__BM!__**");      
      client.channels.get('374587475319980032').send("__**"+message.author.username+" will be hosting Beastmaster Durzag @ ["+timeArray[0]+"]**__ <@&399339115348492309>"+post);     
     }
    else  

//Savage Jokes!
   if(message.content.toLowerCase().startsWith (prefix + "savagejoke"))
    {
     var HowManySavageJokes = 40;
     let rolled = Math.random() * HowManySavageJokes;
     let result = Math.floor(rolled);
     client.channels.get('366593168369778688').send("Savage Joke incoming: " + SavageJokesList[result]);
     }
    else

 //Regular Jokes!
   if(message.content.toLowerCase().startsWith (prefix + "joke"))
    {
     var HowManyJokes = 14;
     let rolled = Math.random() * HowManyJokes;
     let result = Math.floor(rolled);
     message.reply(JokeList[result]);    
    }
   else

//Multiple rolls !multiroll <MaxNumber> <Rolls (max=5)>
    if(message.content.toLowerCase().startsWith (prefix + "multiroll"))
     {          
      var max = message.content.slice(11).split([" "]);
      if(max[1]>5) 
       {
        message.channel.send("Max rolls is 5, SOZ"); return;
       }
      
      message.reply("is rolling upto "+max[0]+" for a total of "+max[1]+" times!"); 
      for(i=0; i<max[1];i++)
       {
        let rolled = Math.random() * max[0]+1;
        let result = Math.floor(rolled);
        message.channel.send("\n"+message.author.tag+" has rolled a **"+result+"**");
       }    
      }
     else  
   
 //Single roll, use !roll <MaxNumber(5)> 
    if(message.content.toLowerCase().startsWith (prefix + "roll"))
     {
      let max = message.content.slice(5).split([","]);
      let rolled = Math.random() * max+1;
      let result = Math.floor(rolled);
      message.channel.send(message.author.tag+" has rolled a **"+result+"**"); 
     }
    else
               
//Lets user request a rank !requestrank <Reason/rank you want>        
    if(message.content.toLowerCase().startsWith(prefix + "requestrank") || message.content.toLowerCase().startsWith(prefix + "rankrequest"))
     { 
      let messageArray =  message.content.slice(13).split(" ");

      if(!messageArray[0])
       {
	message.delete(); 
	return(message.author.send("You forgot to specify which rank you want to receive. !requestrank **RANK**"));
       }

     try
      {
       message.delete();
       client.channels.get('367546747133624320').send("**__"+message.author.username+"__**/"+message.author.tag+" requests to be ranked up to **__"+messageArray[0]+"!__**");          
       message.author.sendMessage('Your request to be ranked up to **'+messageArray[0]+'** has been sent to the ranks in the clan.');
       }
     catch (err)
      {
       console.error(err);
       message.author.sendMessage('The this bot cannot find the request channel and is broken, RIP has been notified to fix this!');
      }
     }
    else

//Shuts the bot down if it goes crazy!
    if (message.content.toLowerCase().startsWith(prefix + "shutdown"))
        {
	if(!message.member.roles.some(r=>staffArray.includes(r.name)))
         {
          client.channels.get('356654828488884224').send(message.author.username+" has tried to shut royalbot down by using the !shutdown command.");
          return message.reply("You cannot shutdown Royal-Bot, as you don\'t have the permission to do so. Please contact a clan staff member.");
         }
        
	console.log("Royal-Bot was shutdown by: "+message.author.tag);
	process.exit();  
        }
        else

//Bot Replies to user.
    if (message.content.toLowerCase().startsWith(prefix + "hi"))
        {message.channel.send('hellur');}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~THROW USELESS SHET BELOW~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  });

//Token for RoyalBot [KEK this is hidden]
  client.login(settings.token);