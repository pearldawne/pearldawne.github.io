---
layout: post
title: Build A Discord Bot! (From my templates)
description: Using the discord.py API, build a basic Discord bot
tags : discordpy discordbot bots
---

<audio preload="auto" autoplay loop>
   <source src="https://dewanmukto.com/asset/audio/frlegendsost2.mp3" type="audio/mpeg" preload="auto" />
</audio>

## Overview
Discord bots, ah! A popular practice for refining your programming skills *and* reap benefits from users instantly! Thanks to the power of the Discord APIs like <a href="https://discordpy.readthedocs.io/" target="_blank">discord.py</a> or <a href="https://discord.js.org/" target="_blank">discord.js</a>, it is possible to program neat pieces of software in the form of the "bots".

To be honest, Discord bots are just ordinary 'programmable' accounts with additional capabilities. We will discuss about that later. Meanwhile, here are some source files for some of my bots.

## A note before continuing
I know, I didn't really elaborate on each of the statements properly. I will post another detailed article on how to get started for a Discord bot from scratch (from nothing). Meanwhile, feel free to copy-paste the code and use 'em as templates for your own Discord bots. Acknowledgement isn't necessary (because I can track you down anytime 😈), except for the ones that I myself credited. \
<br />
Another point to note is that all of these bots 'suck' in terms of programming efficiency. I could've used inheritance schemes and all the other "good programming habits", but back then, I wasn't so serious about writing programs much. Suit yourselves.

## A brief video tutorial
Luckily, I had managed to get the time I needed for cooking up a video for introducing young people to programming Discord bots. Here it is, embedded herein.
<iframe width="560" height="315" src="https://www.youtube.com/embed/L_9ZKKt8MSg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Quick links
<a id="quicklinks"></a>
<a href="#muxbot">Mukto bot</a>, <a href="#heartbreak">Heartbreak bot</a>, <a href="#astolfo">Astolfo bot</a>, <a href="#dijjo">Dijjo bot</a>, <a href="#keep_alive">keep_alive.py</a>

<a id="muxbot"></a>
### Mukto bot

```python

# 𝗠𝗨𝗫𝗕𝗢𝗧 (𝗠𝗨𝗞𝗧𝗢) 𝗗𝗜𝗦𝗖𝗢𝗥𝗗 𝗕𝗢𝗧 - 𝗢𝗥𝗜𝗚𝗜𝗡𝗔𝗟 𝗦𝗢𝗨𝗥𝗖𝗘
# @author dmimukto 2021
# @credits Replit's Discord Bot template, Stack Overflow, Cisc0-gif (https://github.com/Cisc0-gif/Discord-Bot-Template/blob/a53aad3ae91ed02d6f99a97328e1d9e4a9cc4a17/bot.py)
# @license MIT License (https://github.com/dmimukto/Muxbot/blob/main/LICENSE)
# @copyright Asenturisk Corporation 2021


# Importing the necessary modules for booting up and running the bot.
import discord
import os
import sys
import time
import discord.ext
import random
import requests
import urllib
import json
import logging
import datetime
import asyncio
from collections import Counter
import platform
from keep_alive import keep_alive

# Placed a control variable (constant) up here, so that I don't have to scroll down everytime.
# Keep this turned to True if you want the bot to auto-delete messages containing blacklisted words. And set it to False if you really love profanity.
BLACKLIST_MODE = True

# Further imports for running extra features from discord.py and python itself
from discord.utils import get
from discord.ext import commands, tasks
from discord.ext.commands import has_permissions,  CheckFailure, check

# Defining the variable "client" as discord.Client() (So that I don't have to write discord.Client() everytime. C'mon! If you're reading this, you're definitely a programmer so you should understand the usual etiquettes and shortcuts we use!)
client = discord.Client()
# Here's where you can customize the bot's prefix. Since this is the pure source from a running version of Muxbot (Mukto : https://mukto.live/), the default prefix is "mux" followed by a whitespace.
client = commands.Bot(command_prefix = 'mux, ')

# If you're running your bot on Replit (which I myself used and greatly recommend), you can set up private variables from the sidebar. Elsewhere, you usually create a ".env" file in the directory.
# In that .env file, you just add in a single line "TOKEN = 897wr8iuaf09fWhateverYourTokenIs244324"
TOKEN = os.getenv("TOKEN")


"""
=======================================[    𝐂𝐥𝐢𝐞𝐧𝐭 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬    ]======================================
"""
# Assuming you are already familiar with the official Discord.py API (https://discordpy.readthedocs.io/en/stable/api.html), you should know the basics about client.event and client.command functions.
                                                    
# These are variables linked to some promotional images for Muxbot.
MUXBOT_01 = "https://media.discordapp.net/attachments/816302805560066069/856057289043607562/muktodiscbot.png?width=1101&height=231"
MUXBOT_02 = "https://media.discordapp.net/attachments/816302805560066069/856057306504233010/muxbot_banner.png?width=1101&height=348"

# This is a fairly basic command that greets new users of this on Discord. This is not automated yet, so you manually have to type "mux, greet" into the chat.
# I'm not explaining every single statement for this function.
@client.command()
async def greet(ctx):
  """| Greets new users and the bot introduces himself"""
  await ctx.send(MUXBOT_01)
  await ctx.send("""
**Behold, the Mux bot!**
  
Ahoy there! I'm Mukto, the virtual projection of Dewan Mukto's heart, mind and soul.
Right now, I am not as capable as I was planned to be. 
But hopefully in the upcoming days, I shall be stronger and more powerful.
  
For now, allow me to protect your server from profanity and NSFW materials. Just grant me the role with the permission to 'Manage Messages'. Or better still, give me an administrator role.
  
I hope I can serve ya well, pal. 😎👌
  
  """)
  await ctx.send(MUXBOT_02)
  await ctx.send("```version 0.1.9 early access```")

# Another basic command, but slightly more useful than the previous 'promotional' one
@client.command()
async def choose(ctx, *choices: str):
    """| Chooses between multiple words provided, seperated by spaces."""
    await ctx.send(random.choice(choices))

# This is an annoying command that is better kept a secret than a publicly accessible one
@client.command()
async def ping(ctx):
    """| Testing command"""
    await ctx.send("""No, I won't ping @everyone .""")
    await ctx.send("(Heheh, I just did. 😈)")

# A mimicry command that requires BLACKLIST_MODE to be turned ON.
@client.command()
async def muxsays(ctx, *, arg):
  "| Copies message and tells it via his message"
  copythat = discord.utils.escape_mentions(arg)
  await ctx.send(copythat)

@client.command()
async def ecoji(ctx, limit):
    "| Testing a new plugin for Automata on Muxbot"
     Sends randomly generated emojis from Jack Harrhy's Ecoji project
    ecojiSrc = "https://jackharrhy.dev/urandom/ecoji/"+str(limit)
    ecojiTxt = urllib.request.urlopen(ecojiSrc)
    for row in ecojiTxt:
      ecojiRows = row.decode("utf-8")
      await ctx.send(ecojiRows)

# A standard command that every moderator or administrator loves
@client.command()
async def kick(ctx, member : discord.Member):
    """| Kicks a member. Don't try this!"""
    try:
        await member.kick(reason=None)
        await ctx.send("🦵 Get lost, "+member.mention) # Kickee kickee, heheee XD
    except:
        await ctx.send("""Why should I? 🤷‍♂️""") # Something went wrong

# Another useful command.
@client.command()
async def warn(ctx, member : discord.Member, reason="No reason"):
    """| Warns a member for doing something wrong."""
    if reason == "No reason":
      # It sends a warning in the server's channel
      await ctx.send(">>> "+member.mention+" has been warned")
      # It also sends the warning in the particular violator's DMs (direct messages)
      await message.author.send("Yo "+str(message.author)+".")
      await message.author.send("You have been warned.")
      await message.author.send("Be careful. Or else, punishments will be severe. 😈")
    elif reason != "No reason":
      # Same things happen, except this time, the reason for the warning has been mentioned, too.
      await ctx.send(">>> "+member.mention+" has been warned, for"+str(reason))
      await message.author.send("Yo "+str(message.author)+".")
      await message.author.send("You have been warned for"+str(reason))
      await message.author.send("Be careful. Or else, punishments will be severe. 😈")



# Logging system for recording bot metrics and stats (OPTIONAL)
logger = logging.getLogger('discord')
logger.setLevel(logging.DEBUG)
handler = logging.FileHandler(filename='discord.log', encoding='utf-8', mode='w')
handler.setFormatter(logging.Formatter('%(asctime)s:%(levelname)s:%(name)s:%(message)s'))
logger.addHandler(handler)

# Logging system for recording server messages (OPTIONAL)
def logwrite(msg, server):
  with open('Serverwise/'+str(server)+'_MESSAGES.log', 'a+') as f:
    f.write(msg + '\n')
  f.close()

# Logging system for recording bug reports and suggestions (OPTIONAL)
def bugwrite(msg):
  with open('reports.log', 'a+') as buglog:
    buglog.write(msg + '\n')
  buglog.close()


  
"""
=======================================[    𝐂𝐥𝐢𝐞𝐧𝐭 𝐞𝐯𝐞𝐧𝐭𝐬   ]======================================
"""
# Assuming you are already familiar with the official Discord.py API (https://discordpy.readthedocs.io/en/stable/api.html), you should know the basics about client.event and client.command functions.

@client.event
# This function runs whenever your bot is booted up and is ready to roll!
async def on_ready():
  # You may uncomment and place in one of the following 'activity statuses' for the bot.
  # By default, Muxbot runs a 'streaming' status and it is connected to my Twitch URL. (Speaking of which, follow the link and check me out please!)
  twitch_url = 'https://twitch.tv/dukemantwo'
  await client.change_presence(activity=discord.Streaming(name="DukeManTwo", url=twitch_url))
                                                    
                                                    
                                                    
# ⊱ ──────────────────────── {.⋅ ✯ ⋅.} ──────────────────────── ⊰ #
# Set`Playing ` status
#await client.change_presence(activity=discord.Game(name="add your game))

# Set`Streaming ` status
#await client.change_presence(activity=discord.Streaming(name="My Stream", url=my_twitch_url))

# Set`Listening ` status
#await client.change_presence(activity=discord.Activity(type=discord.ActivityType.listening, name="a song"))

# Set `Watching ` status
#await client.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name="a movie"))
# ⊱ ──────────────────────── {⋅. ✯ .⋅} ──────────────────────── ⊰ #

                                                    
  # The following wordmark is for decorative purposes only. Please remove it since you are not hosting the Mukto bot nor the Muxbot 'as is'.
  print("""
                                                 .-'''-.     
                                                '   _    \   
 __  __   ___                 .               /   /` '.   \  
|  |/  `.'   `.             .'|              .   |     \  '  
|   .-.  .-.   '          .'  |           .| |   '      |  ' 
|  |  |  |  |  |         <    |         .' |_\    \     / /  
|  |  |  |  |  |  _    _  |   | ____  .'     |`.   ` ..' /   
|  |  |  |  |  | | '  / | |   | \ .' '--.  .-'   '-...-'`    
|  |  |  |  |  |.' | .' | |   |/  .     |  |                 
|__|  |__|  |__|/  | /  | |    /\  \    |  |                 
               |   `'.  | |   |  \  \   |  '.'               
               '   .'|  '/'    \  \  \  |   /                
                `-'  `--''------'  '---'`'-'                  """)
  print('---------------------------------------------------------------------')
  print('')
  print('https://discordapp.com/api/oauth2/authorize?scope=bot&client_id=' + str(client.user.id))
  print('--------------------------------------------------------------------------')
  print('Logged in as:')
  print("Username : "+str(client.user.name)+" a.k.a. "+str(client.user)+" with ID : "+str(client.user.id))
  print('╭─━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╮')
  print(" LIVE CHAT LOG - See the Serverwise Logs For Details ")
  print("╰─━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╯")

# End of on_ready()


# This event
@client.event
async def on_member_join(member):
  server = member.guild
  print("Member:", member, "joined!")
  logwrite("Member: " + str(member) + " joined!", server)

@client.event
async def on_member_remove(member):
  server = member.guild
  print("Member:", member, "removed!")
  logwrite("Member: " + str(member) + " removed!", server)

@client.event
async def on_guild_role_create(role):
  server = role.guild
  print("Role:", role, "was created!")
  logwrite("Role: " + str(role) + " was created!", server)

@client.event
async def on_guild_role_delete(role):
  server = role.guild
  print("Role:", role, "was deleted!")
  logwrite("Role: " + str(role) + " was deleted!", server)

@client.event
async def on_guild_channel_create(channel):
  server = channel.guild
  print("Channel:", channel, "was created!")
  logwrite("Channel: " + str(channel) + " was created!", server)

@client.event
async def on_guild_channel_delete(channel):
  server = channel.guild
  print("Channel:", channel, "was deleted!")
  logwrite("Channel: " + str(channel) + " was deleted!", server)

@client.event
async def on_guild_channel_update(before, after):
  server = after.guild
  print("Channel Updated:", after)
  logwrite("Channel Updated: " + str(after), server)

@client.event
async def on_message(message):
  # First up, set up the conditions that the bot ignores whatever it says, otherwise there could be an infinite loop
  if message.author == client.user:
    return 
  channel = message.channel
  try:
    server = channel.guild
  except:
    # If the messages are sent in the direct messaging inbox of the bot, then they are stored seperately in the logging directory
    print("Message sent in DMs")
    server = '_privatemsg_'
  print(message.author, "said:", message.content, "-- Time:", time.ctime()) #reports to discord.log and live chat
  logwrite(str(message.author) + " said: " + str(message.content) + "-- Time: " + time.ctime(), server)


# Muxbot's defensive system against profanity/blacklisted words

  if BLACKLIST_MODE:
      blackList = [] # Add your own set of blacklisted words into this list.

      insultworthy = [] # Additional list of blacklisted words if the previous one fails to detect any.
      # The list below is a default set of insults that Muxbot himself sends to counter the offenders. They have been directed at youngsters.
      insults = ["How would you feel if your profile showed up in the dark web tonight?","Mind your manners, kid. Or else the consequences will be worse than revealing your browsing history to your parents.","Got your data recorded. What're ya gonna do now? Go ahead, kick me. Your data remains with me. FOREVER.","Watch your tongue. You don't wanna mess with me. 'Cause I can track your IP, store your ID, and play pranks on ya in real life. For the rest of your unworthy life.","You certainly show what your parents taught ya. I dunno who should be sorry - you or your parents.","One wrong move, and I'm gonna send local thugs after you.","I'm gonna crack your balls and cook omellettes with it.","I'm gonna do the Fukouna Shoujo thing to you.","Lol. You cheated, so did I!","Got your data recorded. What're ya gonna do now? Go ahead, kick me. Your data remains with me. FOREVER.","I will pray for you to go to Hell.","The world is not meant for people like you. Go run to your parents' lap and cry!","You're a disgrace to your religion.","Look at you, sending NSFW words and content. I hope you wouldn't mind if I send people to do them practically to you.", "Your brain called me last night. It wants a divorce. Go crack your skull, you degenerate creep! Atleast your brain will have some peace.","Nope. You can't do this here.", "Bad luck.", "Peace be upon your sad life.","Oh, is that the best word you know?","You know, I can be a better racist, human.","تَبَّتْ يَدَآ أَبِى لَهَبٍ وَتَبَّ","Got the guts, huh? Lemme warn ya in advance, in case you don't piss your pants, you overgrown speck of meat! I'll teach ya proper manners today.","By the time you've even finished reading this message, your data is halfway across the Pacific. So start praying to your God. I doubt He'll want to protect you because of the sick stench of sin.","Still you wanna humiliate yourself further? Go ahead and hit a thumbs up if you're even worthy of an average life, sucker.","Got your data recorded. What're ya gonna do now? Go ahead, kick me. Your data remains with me. FOREVER."]
      
      # This section of code runs if it finds any direct blacklisted words in the chat
      if any(word in message.content.lower() for word in blackList):
          try:
            await message.delete()
          except:
            print("Either msg is in DM or something went wrong.")
            await message.add_reaction('<:kgm_angry:850398050358132756>') # An emoji from KoGaMa (https://kogama.com), utilized in a Discord server for reference

      # This section of code runs if anyone tries to cheat the auto-detection system, e.g. by adding in lots of spaces or dots or other symbols to bypass Muxbot's sensitivity
      if len(message.content.lower().replace(" ","")) <=6 and any(word in message.content.lower().replace(" ","") for word in insultworthy):
        dice = random.randint(0,len(insults)-1)
        choice = insults[dice]
        try:
          await message.delete()
        except:
          print("Something went wrong while trying to delete a msg.")
          await message.add_reaction('<:kgm_angry:850398050358132756>')
        await channel.send(choice)
        if dice // 2 == 0:
          await message.author.send('**Say cheese, ' + str(message.author) + '**')
          await asyncio.sleep(3)
          await message.author.send('This will go to the database records.')
          await asyncio.sleep(5)
          await message.author.send("I'll be sure to send a copy to your parents. 😈")

      elif any(word in message.content.strip() for word in insultworthy):
        dice = random.randint(0,len(insults)-1)
        choice = insults[dice]
        try:
          await message.delete()
        except:
          print("Something went wrong while trying to delete a msg.")
          await message.add_reaction('<:kgm_angry:850398050358132756>')
        await channel.send(choice)
        if dice // 2 == 0:
          await message.author.send('**Say cheese, ' + str(message.author) + '**')
          await asyncio.sleep(3)
          await message.author.send('This will go to the database records.')
          await asyncio.sleep(5)
          await message.author.send("I'll be sure to send a copy to your parents. 😈")

      elif any(word in message.content.replace(".","") for word in insultworthy):
        dice = random.randint(0,len(insults)-1)
        choice = insults[dice]
        try:
          await message.delete()
        except:
          print("Something went wrong while trying to delete a msg.")
          await message.add_reaction('<:kgm_angry:850398050358132756>')
        await channel.send(choice)
        if dice // 2 == 0:
          await message.author.send('**Say cheese, ' + str(message.author) + '**')
          await asyncio.sleep(3)
          await message.author.send('This will go to the database records.')
          await asyncio.sleep(5)
          await message.author.send("I'll be sure to send a copy to your parents. 😈")

      elif any(word in message.content.replace("-","") for word in insultworthy):
        dice = random.randint(0,len(insults)-1)
        choice = insults[dice]
        try:
          await message.delete()
        except:
          print("Something went wrong while trying to delete a msg.")
          await message.add_reaction('<:kgm_angry:850398050358132756>')
        await channel.send(choice)
        if dice // 2 == 0:
          await message.author.send('**Say cheese, ' + str(message.author) + '**')
          await asyncio.sleep(3)
          await message.author.send('This will go to the database records.')
          await asyncio.sleep(5)
          await message.author.send("I'll be sure to send a copy to your parents. 😈")

      elif any(word in message.content.replace(",","") for word in insultworthy):
        dice = random.randint(0,len(insults)-1)
        choice = insults[dice]
        try:
          await message.delete()
        except:
          print("Something went wrong while trying to delete a msg.")
          await message.add_reaction('<:kgm_angry:850398050358132756>')
        await channel.send(choice)
        if dice // 2 == 0:
          await message.author.send('**Say cheese, ' + str(message.author) + '**')
          await asyncio.sleep(3)
          await message.author.send('This will go to the database records.')
          await asyncio.sleep(5)
          await message.author.send("I'll be sure to send a copy to your parents. 😈")



  # THE FOLLOWING ARE SOME 'SMART COMMANDS' that don't need a prefix to work. Muxbot simply fishes out its instruction parameters if some conditions are met
  # To ensure better sensitivity, the commands are not case-sensitive since Muxbot converts all text strings into lowercase English ASCII.
  
  # Bug report trigger
  if ("log") in message.content.lower() and ("mux") in message.content.lower():
    await channel.send("Hmm... you want me to report a bug? Very well. Type it down starting with /log")
    def check(msg):
      return msg.content.startswith('/log')
    message = await client.wait_for('message', check=check)
    lognote = message.content[len('/log'):]
    await channel.send("Alright, buddy. I've taken that into account. The real `Mukto` will handle it from his side.")
    bugwrite(str(message.author) + " said: " + str(lognote) + "-- Time: " + time.ctime())

  # Invite link for Heartbreak - Muxbot's female counterpart (and elder 'sister')
  if ("mux") in message.content.lower() and ("where") in message.content.lower() and ("your") in message.content.lower() and (("sister") in message.content.lower() or ("partner") in message.content.lower()):
    await channel.send("Oh, right...")
    await asyncio.sleep(2)
    await channel.send("Invite her here, please : https://mukto.live/bots/heartbreak")

  # Changes nickname of a user (permission required)
  if message.content.lower() == "/nickname":
    await channel.send("Type /name nicknamehere")
    def check(msg):
        return msg.content.startswith('/name')
    message = await client.wait_for('message', check=check)
    name = message.content[len('/name'):].strip()
    await channel.send('{} is your new nickname'.format(name))
    await message.author.edit(nick=name)
  
  # Shows update log (must be pre-stored in the directory)
  if message.content.lower() == "mux, ulog":
    try:
      f = open("update_log.txt","r")
      if f.mode == 'r':
        contents = f.read()
        await channel.send(contents)
    finally:
      f.close()
  
  # Sends random spam links and junk (must be pre-stored in the directory)
  if message.content == "mux, spam": #if author types /ulog bot displays updatelog
    try:
      f = open("spam.txt","r")
      if f.mode == 'r':
        txtLines = f.readlines()
        numLines = len(txtLines)
        dice = random.randint(0,numLines)
        f.seek(0)
        contents = txtLines[dice]
        await channel.send(contents)
    finally:
      f.close()
  
  # THIS SINGLE LINE OF CODE IS VERY VERY IMPORTANT TO ENSURE THAT BOTH THE CLIENT.COMMAND AND CLIENT.EVENT COMMANDS CAN RUN SMOOTHLY WITHOUT CLASHING OR LAGGING
  await client.process_commands(message)


# This function keeps the bot alive by opening up a webserver (Replit recommended) (Needs a bot from https://uptimerobot.com in order to work)
# The keep_alive.py module is included with this repository. However, it is not by me. It was pre-equipped with the Replit bot template.
keep_alive()

# Last, but not the least, don't forget to run your bot!
client.run(os.getenv("TOKEN"))

```

<a id="heartbreak"></a>
### Heartbreak bot
<a href="#quicklinks">- go back to top -</a>

```python
# 𝗡𝗔𝗧𝗦𝗨𝗞𝗜 (𝗛𝗘𝗔𝗥𝗧𝗕𝗥𝗘𝗔𝗞) 𝗗𝗜𝗦𝗖𝗢𝗥𝗗 𝗕𝗢𝗧 - 𝗢𝗥𝗜𝗚𝗜𝗡𝗔𝗟 𝗦𝗢𝗨𝗥𝗖𝗘
# @author dmimukto 2021
# @credits Replit's Discord Bot template, Stack Overflow, Cisc0-gif (https://github.com/Cisc0-gif/Discord-Bot-Template/blob/a53aad3ae91ed02d6f99a97328e1d9e4a9cc4a17/bot.py)
# @credits_plugins Automata (https://github.com/MUNComputerScienceSociety/Automata), hamzahap (https://github.com/MUNComputerScienceSociety/Automata/commits?author=hamzahap), mudkip (https://github.com/MUNComputerScienceSociety/Automata/commits?author=Mudkip)
# @license MIT License (https://github.com/dmimukto/Muxbot/blob/main/LICENSE)
# @copyright Asenturisk Corporation 2021


# Importing the necessary modules for booting up and running the bot.
import discord
import os
import sys
import time
import discord.ext
import random
import json
import logging
import datetime
import asyncio
from collections import Counter
import platform
from keep_alive import keep_alive

# Further imports for running extra features from discord.py and python itself
from discord.utils import get
from discord.ext import commands, tasks
from discord.ext.commands import has_permissions,  CheckFailure, check


# Defining the variable "client" as discord.Client() (So that I don't have to write discord.Client() everytime. C'mon! If you're reading this, you're definitely a programmer so you should understand the usual etiquettes and shortcuts we use!)
client = discord.Client()
# Here's where you can customize the bot's prefix. Since this is the pure source from a running version of Heartbreak (https://mukto.live/bots/heartbreak), The default prefix is a dot "." but it is unnecessary since Heartbreak detects triggers from the regular messages anyway
client = commands.Bot(command_prefix = '.') #put your own prefix here

# If you're running your bot on Replit (which I myself used and greatly recommend), you can set up private variables from the sidebar. Elsewhere, you usually create a ".env" file in the directory.
# In that .env file, you just add in a single line "TOKEN = 897wr8iuaf09fWhateverYourTokenIs244324"
TOKEN = os.getenv("TOKEN")


# TOLERANCE VALUES HERE :
# I still haven't properly set them up for usage.
tolerance_help = 0
tolerance_sus = 0

# These are variables linked to some hardcoded GIFs and videos for Heartbreak.

GIGGLE = "https://cdn.discordapp.com/emojis/821538085741133845.png"
CHIKA_GIF = "https://media.tenor.com/images/639a8f11cddb913ea4a4d81ceda3f8ec/tenor.gif"
PAIMON_GIF = "https://upload-os-bbs.hoyolab.com/upload/2020/07/19/1096276/5d55575548a30ca21fcdb50285b9c694_6465808929343059713.gif"
PAIMON_EHE = "https://media1.tenor.com/images/64eb0176b8ec007e2c0ffa65a92c8dc0/tenor.gif"
SUSCLIP = "https://tribe-video-input-temp.s3.amazonaws.com/5f9adb96fb2c414b6f59de2c/posts/60cb4b950bcc7b081a04aebb/65928_sus.mp4"

"""
=======================================[    𝐂𝐥𝐢𝐞𝐧𝐭 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬    ]======================================
"""
# Assuming you are already familiar with the official Discord.py API (https://discordpy.readthedocs.io/en/stable/api.html), you should know the basics about client.event and client.command functions.

# Sends a GIF of Paimon doing the 'ehe' pose
@client.command()
async def ehe(ctx):
  "| Ehe~"
  await ctx.send(PAIMON_EHE)

# Sends a GIF of Paimon hovering about (like the one in the Genshin Impact idle menu)
@client.command()
async def paimon(ctx):
  """| Have a Paimon!"""
  await ctx.send(PAIMON_GIF)

# Does exactly what the help text says 
@client.command()
async def choose(ctx, *choices: str):
    """| Chooses between multiple words provided, seperated by spaces."""
    await ctx.send(random.choice(choices))

# This plugin/feature has been adapted from https://github.com/MUNComputerScienceSociety/Automata/blob/master/plugins/Hewwo/__init__.py
# @author mudkip (https://github.com/Mudkip)
@client.command()
async def hewwo(ctx, *, speech: str):
#async def hewwo(ctx, *speech: str):
    """| Converts given words to cute words"""
    #try:
    transform = str(discord.utils.escape_mentions(speech).lower().replace('r', 'w').replace('l', 'w').replace('n', 'ny').replace('oo', 'woo'))
    await ctx.send(transform)
    #except:
     # await ctx.send("""🥺 I'm sorry, senpai. I don't understand this command. 😞""")

# A really annoying command that pings @everyone
@client.command()
async def ping(ctx):
    """| Testing command"""
    await ctx.send("""@everyone @everyone @everyone""")

# Sends Mahir Chowdhury's YouTube channel link.
# Was implemented as a sponsorship feature
@client.command()
async def mahir(ctx):
    """| Sends Mahir's channel link."""
    await ctx.send("""
    Here ya go!
    Mahwweeeer Bwwweaats...
    my favorite~ 😊🤗
    https://www.youtube.com/c/MahirBeats
    """)

# This plugin/feature has been adapted from https://github.com/MUNComputerScienceSociety/Automata/blob/master/plugins/Vibe/__init__.py
# @author Hamza Punjabi (https://github.com/hamzahap)
VIBE_IMAGE = "https://s3.gifyu.com/images/catvibe.gif"
VIBIER_IMAGE = "https://s3.gifyu.com/images/ezgif.com-gif-maker-174e18faa852a3028.gif"
VIBIEST_IMAGE = "https://s3.gifyu.com/images/ezgif.com-gif-maker-2664260aedaea9638.gif"
@client.command()
async def vibe(ctx: commands.Context, vibelevel: int = 1):
  """| Replies with a cat bop GIF. Vibe levels can also be specified."""
  if vibelevel <= 1:
    await ctx.send(VIBE_IMAGE)
  elif vibelevel == 2:
    await ctx.send(VIBIER_IMAGE)
  else:
    await ctx.send(VIBIEST_IMAGE)

# This plugin/feature was inspired by the 'hewwo' plugin/feature above
@client.command()
async def says(ctx, *, arg):
  "| Copies message and tells it via her message"
  copythat = discord.utils.escape_mentions(arg)
  await ctx.send(copythat)

# Still haven't implemented a proper 'bug status' output yet, so Heartbreak just sends the rather-inappropriate plugin fail text
@client.command()
async def vomit(ctx):
    """| Spits out errors in her program."""
    await ctx.send("""🥺 senpai, please don't make me do this...""") 

# Member kicker 2000
@client.command()
async def kick(ctx, member : discord.Member):
    """| Kicks a member. Don't try this!"""
    try:
        await member.kick(reason=None)
        await ctx.send("🙄😜 Oopsies, I kicked "+member.mention) #simple kick command to demonstrate how to get and use member mentions
    except:
        await ctx.send("""I'm sorry, either I don't have the permissions to do this evil thing or I don't want to do this. 😅😓""")

# C'mon! She doesn't want to! You gotta do it the 'hard way' (by coming over to Github and finding the source code by yourself!)
@client.command()
async def xray(ctx):
  """| Shows her entire source code."""
  await ctx.send("""😡 NO I WON'T!""")




# Logging system for recording bot metrics and stats (OPTIONAL)
logger = logging.getLogger('discord')
logger.setLevel(logging.DEBUG)
handler = logging.FileHandler(filename='discord.log', encoding='utf-8', mode='w')
handler.setFormatter(logging.Formatter('%(asctime)s:%(levelname)s:%(name)s:%(message)s'))
logger.addHandler(handler)

# Logging system for recording server messages (OPTIONAL)
def logwrite(msg, server): #writes chatlog to MESSAGES.log
  with open('ServerMsgs/'+str(server)+'_MESSAGES.log', 'a+') as f:
    f.write(msg + '\n')
  f.close()

# Logging system for recording bug reports and suggestions (OPTIONAL)
def bugwrite(msg):
  with open('reports.log', 'a+') as buglog:
    buglog.write(msg + '\n')
  buglog.close()

"""
=======================================[    𝐂𝐥𝐢𝐞𝐧𝐭 𝐞𝐯𝐞𝐧𝐭𝐬   ]======================================
"""
# Assuming you are already familiar with the official Discord.py API (https://discordpy.readthedocs.io/en/stable/api.html), you should know the basics about client.event and client.command functions.


# This function runs whenever Heartbreak wakes up from her virtual land of dreams 
@client.event
async def on_ready():
  # The following wordmark is for decorative purposes only. Please remove it since you are not hosting Heartbreak 'as is'.
  print("""
  
.  .             .   .               ,   
|  |             |   |               |   
|--| ,-. ,-: ;-. |-  |-. ;-. ,-. ,-: | , 
|  | |-' | | |   |   | | |   |-' | | |<  
'  ' `-' `-` '   `-' `-' '   `-' `-` ' ` """)
  print('---------------------------------------------------------------------')
  print('')
  print('https://discordapp.com/api/oauth2/authorize?scope=bot&client_id=' + str(client.user.id))
  print('--------------------------------------------------------------------------')
  print('Logged in as:')
  print("Username : "+str(client.user.name)+" a.k.a. "+str(client.user)+" with ID : "+str(client.user.id))
  print('╭─━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╮')
  print(" LIVE CHAT LOG - See the Serverwise Logs For Details ")
  print("╰─━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╯")

  # You may uncomment and place in one of the following 'activity statuses' for the bot.
  # By default, Heartbreak runs a 'listening' status.
  await client.change_presence(activity=discord.Activity(type=discord.ActivityType.listening, name="Mahir Beats"))
  
# ⊱ ──────────────────────── {.⋅ ✯ ⋅.} ──────────────────────── ⊰ #
# Set`Playing ` status
#await client.change_presence(activity=discord.Game(name="add your game))

# Set`Streaming ` status
#await client.change_presence(activity=discord.Streaming(name="My Stream", url=my_twitch_url))

# Set`Listening ` status
#await client.change_presence(activity=discord.Activity(type=discord.ActivityType.listening, name="a song"))

# Set `Watching ` status
#await client.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name="a movie"))
# ⊱ ──────────────────────── {⋅. ✯ .⋅} ──────────────────────── ⊰ #
  
  # End of on_ready()

  

# Auto-commands that run whenever their respective triggers have been activated

@client.event
async def on_member_join(member):
  #channel = message.channel
  server = member.guild
  print("Member:", member, "joined!")
  #await channel.send("Member:", member, "joined 😀")
  logwrite("Member: " + str(member) + " joined!", server)

@client.event
async def on_member_remove(member):
  #channel = message.channel
  server = member.guild
  print("Member:", member, "removed!")
  #await channel.send("Member:", member, "removed 😞")
  logwrite("Member: " + str(member) + " removed!", server)

@client.event
async def on_guild_role_create(role):
  #channel = message.channel
  server = role.guild
  print("Role:", role, "was created!")
  #await channel.send("Role:", role, "was created! 📝")
  logwrite("Role: " + str(role) + " was created!", server)

@client.event
async def on_guild_role_delete(role):
  #channel = message.channel
  server = role.guild
  print("Role:", role, "was deleted!")
  #await channel.send("Role:", role, "was deleted! ❎")
  logwrite("Role: " + str(role) + " was deleted!", server)

@client.event
async def on_guild_channel_create(channel):
  #channel = message.channel
  server = channel.guild
  print("Channel:", channel, "was created!")
  #await channel.send("Channel:", channel, "was created!")
  logwrite("Channel: " + str(channel) + " was created!", server)

@client.event
async def on_guild_channel_delete(channel):
  #channel = message.channel
  server = channel.guild
  print("Channel:", channel, "was deleted!")
  #await channel.send("Channel:", channel, "was deleted!")
  logwrite("Channel: " + str(channel) + " was deleted!", server)

@client.event
async def on_guild_channel_update(before, after):
  #channel = message.channel
  server = after.guild
  print("Channel Updated:", after)
  #await channel.send("Channel Updated:", after)
  logwrite("Channel Updated: " + str(after), server)


@client.event
async def on_message(message):
  # First up, set up the conditions that the bot ignores whatever it says, otherwise there could be an infinite loop
  if message.author == client.user:
    return #ignore what bot says in server so no message loop
  channel = message.channel
  try:
    server = channel.guild
  except:
    # If the messages are sent in the direct messaging inbox of the bot, then they are stored seperately in the logging directory
    print("Message sent in DMs")
    server = '_privatemsg_'
  print(message.author, "said:", message.content, "-- Time:", time.ctime()) #reports to discord.log and live chat
  logwrite(str(message.author) + " said: " + str(message.content) + "-- Time: " + time.ctime(), server)

  

  # This mechanism works just like Muxbot's blacklist mode, but in place of profanity, Heartbreak deletes her client.command commands, so that everything is clean
  # Also, this allows her to copy a user's messages and then immediately delete the user who sent the original message, making it harder to trace who said that.
  speakHeaders = [".say", ".hewwo", ".ehe",".paimon",".ping",".mahir"]
  if any(word in message.content.lower() for word in speakHeaders):
      try:
        await message.delete()
      except:
        return
  
  # THE FOLLOWING ARE SOME 'SMART COMMANDS' that don't need a prefix to work. Heartbreak simply fishes out its instruction parameters if some conditions are met
  # To ensure better sensitivity, the commands are not case-sensitive since Heartbreak converts all text strings into lowercase English ASCII.

  # BUG LOGGER SYSTEM
  if ("heartbreak") in message.content.lower() and (("report") in message.content.lower() or ("log") in message.content.lower())and ("bug") in message.content.lower():
    await channel.send("Hmm... you want me to report a bug, senpai? 🤔 Okiiii. 😊 Type it down starting with `/log`")
    def check(msg):
      return msg.content.startswith('/log')
    message = await client.wait_for('message', check=check)
    lognote = message.content[len('/log'):]
    await channel.send("Okay, senpai. Your report has been sent to the developer. He'll check it out ASAP.")
    bugwrite(str(message.author) + " said: " + str(lognote) + "-- Time: " + time.ctime())

  # Changes nickname of a user (permission required)
  if message.content.lower() == "/nickname":
    await channel.send("Type /name nicknamehere")
    def check(msg):
        return msg.content.startswith('/name')
    message = await client.wait_for('message', check=check)
    name = message.content[len('/name'):].strip()
    await channel.send('{} is your new nickname'.format(name))
    await message.author.edit(nick=name)
  

  # If you're not feeling in the right mood, you can also make Heartbreak do the same by intercepting the prefix-based commands and making her reply with harsh or depressing words
  #if ("choose") in message.content.lower():
    #await channel.send("Meh, I can't decide today. Sorry. 😒")

    
  # This was meant to be a server-specific command, for testing if she can copy an emoji
  if (":duckdance~1:") in message.content:
    await channel.send(":duckdance~1:")

  # Creates a DM (direct msg) chat with an user
  if message.content.lower() == "dm me":
    await channel.send("Creating DM with " + str(message.author))
    await message.author.send('*DM started with ' + str(message.author) + '*')
    await message.author.send('Hello!')
    await message.author.send("Please note, that some commands may not work here since we're so close together.🥵🤭")

  # CHECK FOR LOL, REPLY WITH GIGGLE
  if (" lol") in message.content:
    await message.add_reaction('<:giggle:821538085741133845>')
  elif ("lol") in message.content.lower():
    await message.add_reaction('<:giggle:821538085741133845>')
  elif (" lol") in message.content:
    await message.add_reaction('<:giggle:821538085741133845>')
  elif ("lollipop") in message.content:
    await channel.send(":lollipop:")
  elif message.content == "lol" or message.content == "Lol" or message.content == "LOL" or message.content =="IoI" or message.content == "/o/" or message.content == "lol":
    await message.add_reaction('<:giggle:821538085741133845>')

  # This command was for playing a sort of 'Russian Roulette' by messing around with probability.
  # Heartbreak either sends a Rick Roll version of the forsaken "Fukouna Shoujo 03" GIF (if you're lucky) or.... sends the dreaded original GIF uncensored (luckly for NSFW people)
  #if ("fukouna") in message.content.lower():
    #dice = random.randint(0,9)
    #if dice > 4:
      #await channel.send("https://i.kym-cdn.com/photos/images/original/002/098/468/b87.gif")
    #else:
      #await channel.send("https://cdn.discordapp.com/attachments/846755146028941392/846807252971290684/fukounashoujo500.gif")
  
  # This command tells Heartbreak to send a GIF of Chika Fujiwara if the message conditions are met
  if (("send") in message.content.lower() or ("give") in message.content.lower() or ("post") in message.content.lower()) and ("chika") in message.content.lower() and ("gif") in message.content.lower():
    await channel.send(CHIKA_GIF)

  # This command has been temporarily turned off due to complaints from a server
  #if any(word in message.content.lower() for word in ["sus","5u5","amogus"]):
    #if tolerance_sus == 9:
      #await channel.send("You're spamming this command, senpai. 😠")
    #elif tolerance_sus >= 10:
      #print("Someone spammed this command")
    #else:
      #dice = random.randint(1,2)
      #if dice == 2:
        #await channel.send("Sus!")
        #await channel.send(SUSCLIP)
      #else:
        #await channel.send(SUSCLIP)

  # Sends a Paimon 'ehe' GIF just like the client.command but with more sensitivity
  if message.content.lower()=="ehe" or message.content.lower()=="ehe~":
    await channel.send(PAIMON_EHE)
  
  # Sends a tampered help list
  if message.content.lower()=="help":
    if tolerance_help == 9:
      await channel.send("You're spamming this command, senpai. 😠")
    elif tolerance_help >= 10:
      print("Someone spammed this command")
    else:
      await channel.send("Oh, I'm sorry 😥")
      await channel.send("There is NO HELP from now on. 😈")
      await channel.send("The range of commands for me are now upto your imagination. 😏")
      await channel.send("Just say `ulog` to review updates.")
      await channel.send("**Have a nice day.** 👋")
      tolerance_help += 1
  
  if message.content=="<3" or message.content=="❤️":
    await channel.send("<3 to you, too!")
  
  # --------------------------------------- QUICK TEMPLATE
  # if message.content=="":
  #   await channel.send()
  # -------------------------------------------------------
  

  # Shows update log (must be pre-stored in the directory)
  if message.content.lower() == "ulog":
    try:
      f = open("update_log.txt","r")
      if f.mode == 'r':
        contents = f.read()
        await channel.send(contents)
    finally:
      f.close()

  # Sends random spam links and junk (must be pre-stored in the directory)
  if "spam" in message.content.lower() and "Heartbreak" in message.content.lower():
    try:
      f = open("spam.txt","r")
      if f.mode == 'r':
        txtLines = f.readlines()
        numLines = len(txtLines)
        dice = random.randint(0,numLines)
        f.seek(0)
        contents = txtLines[dice]
        await channel.send(contents)
    finally:
      f.close()

  if message.content == "/whoami": #if author types /whoami bot responds with username
    await channel.send(message.author)
  
  # THIS SINGLE LINE OF CODE IS VERY VERY IMPORTANT TO ENSURE THAT BOTH THE CLIENT.COMMAND AND CLIENT.EVENT COMMANDS CAN RUN SMOOTHLY WITHOUT CLASHING OR LAGGING
  await client.process_commands(message)


# This function keeps the bot alive by opening up a webserver (Replit recommended) (Needs a bot from https://uptimerobot.com in order to work)
# The keep_alive.py module is included with this repository. However, it is not by me. It was pre-equipped with the Replit bot template.
keep_alive()

# Last, but not the least, don't forget to run your bot!
client.run(os.getenv("TOKEN"))
```

<a id="astolfo"></a>
### Astolfo bot
<a href="#quicklinks">- go back to top -</a>

```python
# 𝗔𝗦𝗧𝗢𝗟𝗙𝗢 𝗗𝗜𝗦𝗖𝗢𝗥𝗗 𝗕𝗢𝗧 - 𝗦𝗢𝗨𝗥𝗖𝗘
# @author Anime no-Sekai (https://github.com/Animenosekai)
# @author_adaptation dmimukto (https://github.com/dmimukto)
# Based on EasyGif (https://github.com/Animenosekai/EasyGif)


# IMPORTS

### INSTALLED WITH PIP
from discord.ext import commands # to get discord commands
import discord # to communicate with discord
import psutil # to get system details
import requests # to make http requests
from keep_alive import keep_alive

### NATIVE TO PYTHON
import json
import random
import os
import datetime
import asyncio
from collections import Counter
import platform


### REACTION EMOJI WHILE MESSAGE RECEIVED
roger_reaction = '👍'
TOKEN = os.getenv("TOKEN")



def logwrite(msg): #writes chatlog to MESSAGES.log
  with open('GIF_orders.log', 'a+') as f:
    f.write(msg + '\n')
  f.close()


### DEFINING CLIENT/BOT AND ITS PREFIX 
client = commands.Bot(command_prefix='.')

### CLEAR AFTER EVERYTHING IS INITIALIZED
os.system('cls' if os.name == 'nt' else 'clear')


# WHEN THE BOT IS UP
@client.event
async def on_ready():
    await client.change_presence(activity=discord.Game(name='.gifhelp')) # BOT ACTIVITY STATUS
    print('Astolfo is ready.') # LOG THAT THE BOT IS READY

# MAIN COMMAND: .gif <SEARCH>
@client.command(pass_context=True)
async def gif(context, *, search):
    await context.message.add_reaction(roger_reaction) # REACT TO SHOW THAT THE BOT HAS UNDESTAND HIS COMMAND

    now = datetime.datetime.now() # CURRENT TIME AND DATE
    current_timestamp = datetime.datetime.timestamp(now) # GET THE TIMESTAMP FROM THE 'NOW' VARIABLE

    print('')
    print("→ '.gif " + search + f"' came from the server: {context.guild}  (user: {context.author})")
    logwrite("→ '.gif " + search + f"' came from the server: {context.guild}  (user: {context.author})") # LOG

    embed = discord.Embed(title='From {}'.format(context.author), description='Command: `.gif {}`'.format(search), colour=discord.Colour.blue()) # CREATE AN MESSAGE EMBED INSTANCE

    provider = random.randint(0,1) # CHOOSE THE PROVIDER RANDOMLY

    if provider == 0: #GIPHY
        search.replace(' ', '+') # MAKE SURE THAT SPACES ARE URL-ENCODED
        response = requests.get('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + os.environ['giphy-api-key'] + '&limit=10') # MAKE A SEARCH WITH THE GIPHY API
        data = json.loads(response.text) # GET THE RESPONSE AS A DICT

        gif_choice = random.randint(0, 9) # CHOOSE RANDOMLY FROM THE FIRST 10 ANSWERS
        result_gif = data['data'][gif_choice]['images']['original']['url'] # GETTING THE GIF (result)

        embed.set_image(url=result_gif) # SET THE IMAGE IN THE EMBED AS THE GIF
        embed.set_footer(icon_url="https://easygif-assets.netlify.app/assets/public/logos/giphy/giphy-logo.png", text="Powered by Giphy") # SET THE FOOTER WITH THE PROVIDER NAME FOR LEGAL REASONS
        
        await context.send(embed=embed) # SEND THIS NEW MESSAGE
        await context.message.delete() # DELETE THE ORIGINAL MESSAGE (to make it clean)

        print("← '.gif " + search + "' response: " + result_gif)
        logwrite("← '.gif " + search + "' response: " + result_gif) # LOG
        
        
        ### PACKAGING INFOS ABOUT THE REQUEST
        data = {
            "search_term": search,
            "server": str(context.guild),
            "timestamp": str(current_timestamp),
            "response": result_gif,
            "provider": "giphy",
            "item_number": gif_choice
        }

    elif provider == 1: #TENOR GIF
        search.replace(' ', '+')
        response = requests.get('https://api.tenor.com/v1/search?q=' + search + '&key=' + os.environ['tenor-api-key'] + '&limit=10')
        data = json.loads(response.text)

        gif_choice = random.randint(0, 9)
        result_gif = data['results'][gif_choice]['media'][0]['gif']['url']

        embed.set_image(url=result_gif)
        embed.set_footer(icon_url="https://easygif-assets.netlify.app/assets/public/logos/tenor/tenor-logo.png", text="Powered by Tenor")

        await context.send(embed=embed)
        await context.message.delete()

        print("← '.gif " + search + "' response: " + result_gif)
        
        ### PACKAGING INFOS ABOUT THE REQUEST
        data = {
            "search_term": search,
            "server": str(context.guild),
            "timestamp": str(current_timestamp),
            "response": result_gif,
            "provider": "tenor",
            "item_number": gif_choice
        }
            

# RANDOM GIF: .gifrandom
@client.command(pass_context=True)
async def gifrandom(context):
    await context.message.add_reaction(roger_reaction)

    now = datetime.datetime.now() # CURRENT TIME AND DATE
    current_timestamp = datetime.datetime.timestamp(now) # GET THE TIMESTAMP FROM THE 'NOW' VARIABLE

    print('')
    print(f"→ '.gifrandom' came from the server: {context.guild}  (user: {context.author})")
    embed = discord.Embed(title='From {}'.format(context.author), description='Command: `.gifrandom`', colour=discord.Colour.blue())
    provider = random.randint(0,1)
    if provider == 0: #GIPHY RANDOM
        response = requests.get('https://api.giphy.com/v1/gifs/random?api_key=' + os.environ['giphy-api-key'])
        data = json.loads(response.text)
        result_gif = data['data']['images']['original']['url']

        embed.set_image(url=result_gif)
        embed.set_footer(icon_url="https://easygif-assets.netlify.app/assets/public/logos/giphy/giphy-logo.png", text="Powered by Giphy")
        await context.send(embed=embed)
        await context.message.delete()
        print("← '.gifrandom' response: " + result_gif)

        # FIREBASE (recording that the user has made a request)
        
        ### PACKAGING INFOS ABOUT THE REQUEST
        data = {
            "search_term": "random",
            "server": str(context.guild),
            "timestamp": str(current_timestamp),
            "response": result_gif,
            "provider": "giphy",
            "item_number": "random"
        }

    elif provider == 1: # TENOR GIF (RANDOM ANIME GIF)
        random_search_key = ['anime', 'manga', 'japan', 'japanese+animation', 'menhera']
        choosing_from_random_search_key = random.randint(0,len(random_search_key) - 1)
        random_search_term = random_search_key[choosing_from_random_search_key]
        response = requests.get('https://api.tenor.com/v1/search?q=' + random_search_term + '&key=' + os.environ['tenor-api-key'] + '&limit=50')
        data = json.loads(response.text)
        gif_choice = random.randint(0, 49)
        result_gif = data['results'][gif_choice]['media'][0]['gif']['url']

        embed.set_image(url=result_gif)
        embed.set_footer(icon_url="https://easygif-assets.netlify.app/assets/public/logos/tenor/tenor-logo.png", text="Powered by Tenor")

        await context.send(embed=embed)
        await context.message.delete()

        print("← '.gifrandom' response: " + result_gif)
        
        ### PACKAGING INFOS ABOUT THE REQUEST
        data = {
            "search_term": "random",
            "server": str(context.guild),
            "timestamp": str(current_timestamp),
            "response": result_gif,
            "provider": "tenor",
            "item_number": gif_choice
        }



@client.command(pass_context=True)
async def gifdelete(context):
    await context.message.add_reaction(roger_reaction)
    print('')
    print(f"→ Delete request came from the server: {context.guild}  (user: {context.author})")
    status = await context.send('Searching your last gif...')
    found = False
    messages = await context.channel.history(limit=None).flatten()
    try:
        for message in messages:
            if message.author == client.user:
                if len(message.embeds) != 0:
                    if message.embeds[0].title == f'From {context.author}':
                        await status.edit(content='Deleting it...')
                        found = True
                        await message.delete()
                        print(f"← {context.author}'s GIF deleted on {context.guild}")
                        await status.edit(content='Last gif deleted! ✨')
                        await asyncio.sleep(3)
                        await status.delete()
                        await context.message.delete()
            if found == True:
                break
        if found == False:
            await status.edit(content='❌ An error occured while searching your last gif!')
            await asyncio.sleep(3)
            await status.delete()
            await context.message.delete()
    except:
        await status.edit(content='❌ An error occured while deleting your last gif!')
        await asyncio.sleep(3)
        await status.delete()
        await context.message.delete()



@client.command(pass_context=True)
async def gifchange(context):
    await context.message.add_reaction(roger_reaction)

    now = datetime.datetime.now() # CURRENT TIME AND DATE
    current_timestamp = datetime.datetime.timestamp(now) # GET THE TIMESTAMP FROM THE 'NOW' VARIABLE

    status = await context.send('Searching your last gif...')
    found = False
    messages = await context.channel.history(limit=None).flatten()
    for message in messages:
        if message.author == client.user:
            if len(message.embeds) != 0:

                if message.embeds[0].title == f'From {context.author}':
                    found = True
                    embed_desc = message.embeds[0].description
                    search_term = embed_desc[15:]
                    search_term = search_term[:-1]
                    if search_term == 'ando' or search_term == 'andom' or search_term == 'random':
                        print('')
                        print(f"→ '.gifchange random' came from the server: {context.guild}  (user: {context.author})")
                        embed = discord.Embed(title='From {}'.format(context.author), description='Command: `.gifrandom`', colour=discord.Colour.blue())
                        provider = random.randint(0,1)
                        if provider == 0: #GIPHY RANDOM
                            response = requests.get('https://api.giphy.com/v1/gifs/random?api_key=' + os.environ['giphy-api-key'])
                            data = json.loads(response.text)
                            result_gif = data['data']['images']['original']['url']

                            embed.set_image(url=result_gif)
                            embed.set_footer(icon_url="https://easygif-assets.netlify.app/assets/public/logos/giphy/giphy-logo.png", text="Powered by Giphy")

                            await message.edit(embed=embed)
                            await status.edit(content='GIF Changed! ✨')
                            await asyncio.sleep(3)
                            await status.delete()
                            await context.message.delete()

                            print("← '.gifchange random' response: " + result_gif)

        
                            ### PACKAGING INFOS ABOUT THE REQUEST
                            data = {
                                "search_term": "random",
                                "server": str(context.guild),
                                "timestamp": str(current_timestamp),
                                "response": result_gif,
                                "provider": "giphy",
                                "item_number": "random"
                            }


                        elif provider == 1: # TENOR GIF (RANDOM ANIME GIF)
                            response = requests.get('https://api.tenor.com/v1/search?q=anime&key=' + os.environ['tenor-api-key'] + '&limit=10')
                            data = json.loads(response.text)
                            gif_choice = random.randint(0, 9)
                            result_gif = data['results'][gif_choice]['media'][0]['gif']['url']

                            embed.set_image(url=result_gif)
                            embed.set_footer(icon_url="https://easygif-assets.netlify.app/assets/public/logos/tenor/tenor-logo.png", text="Powered by Tenor")

                            await message.edit(embed=embed)
                            await status.edit(content='GIF Changed! ✨')
                            await asyncio.sleep(3)
                            await status.delete()
                            await context.message.delete()
                            
                            print("← '.gifchange random' response: " + result_gif)

        
                            ### PACKAGING INFOS ABOUT THE REQUEST
                            data = {
                                "search_term": "random",
                                "server": str(context.guild),
                                "timestamp": str(current_timestamp),
                                "response": result_gif,
                                "provider": "tenor",
                                "item_number": gif_choice
                            }
                            

                    else:
                        print('')
                        print("→ '.gifchange " + search_term + f"' came from the server: {context.guild}  (user: {context.author})")
                        await status.edit(content='Searching a new gif...')

                        embed = discord.Embed(title='From {}'.format(context.author), description='Command: `.gif {}`'.format(search_term), colour=discord.Colour.blue())
                        provider_from_url = message.embeds[0].image.url
                        provider_from_url = provider_from_url[:19]
                        provider_from_url = provider_from_url[14:]

                        if provider_from_url in "tenor":
                            provider = 0
                        else:
                            provider = 1

                        if provider == 0: #GIPHY
                            search_term.replace(' ', '+')
                            response = requests.get('http://api.giphy.com/v1/gifs/search?q=' + search_term + '&api_key=' + os.environ['giphy-api-key'] + '&limit=10')
                            data = json.loads(response.text)
                            gif_choice = random.randint(0, 9)
                            new_image = data['data'][gif_choice]['images']['original']['url']

                            embed.set_image(url=new_image)
                            embed.set_footer(icon_url="https://easygif-assets.netlify.app/assets/public/logos/giphy/giphy-logo.png", text="Powered by Giphy")

                            await message.edit(embed=embed)
                            await status.edit(content='GIF Changed! ✨')
                            await asyncio.sleep(3)
                            await status.delete()
                            await context.message.delete()
                            print("← '.gifchange " + search_term + "' response: " + new_image)
                            
                            ### PACKAGING INFOS ABOUT THE REQUEST
                            data = {
                                "search_term": search_term,
                                "server": str(context.guild),
                                "timestamp": str(current_timestamp),
                                "response": new_image,
                                "provider": "giphy",
                                "item_number": gif_choice
                            }
                            

                        elif provider == 1: #TENOR GIF
                            search_term.replace(' ', '+')
                            response = requests.get('https://api.tenor.com/v1/search?q=' + search_term + '&key=' + os.environ['tenor-api-key'] + '&limit=10')
                            data = json.loads(response.text)
                            gif_choice = random.randint(0, 9)
                            new_image = data['results'][gif_choice]['media'][0]['gif']['url']

                            embed.set_image(url=new_image)
                            embed.set_footer(icon_url="https://easygif-assets.netlify.app/assets/public/logos/tenor/tenor-logo.png", text="Powered by Tenor")

                            await message.edit(embed=embed)
                            await status.edit(content='GIF Changed! ✨')
                            await asyncio.sleep(3)
                            await status.delete()
                            await context.message.delete()

                            print("← '.gifchange " + search_term + "' response: " + new_image)
        
                            ### PACKAGING INFOS ABOUT THE REQUEST
                            data = {
                                "search_term": search_term,
                                "server": str(context.guild),
                                "timestamp": str(current_timestamp),
                                "response": new_image,
                                "provider": "tenor",
                                "item_number": gif_choice
                            }
        if found == True:
            break


@client.command(pass_context=True)
async def gifdeletes(context):
    await gifdelete(context)

@client.command(pass_context=True)
async def gifchanges(context):
    await gifchange(context)


@client.command(pass_context=True)
async def gifstats(context):
    await context.message.add_reaction(roger_reaction)
    status = await context.send('Retrieving your informations...')
    print('')
    print(f"→ Stats request came from the server: {context.guild}  (user: {context.author})")

    try:    
        user_node = firebase.child('requests/' + str(context.author.id))
        user_data = user_node.get()
    except:
        await status.edit(content='❌ An error occured while retrieving your infos!')
        await asyncio.sleep(2)
        user_data = "There is an error"

    if user_data != None:
        total_number_of_gifs = len(user_data)
        servers = []
        commands = []
        providers = []
        gifs = []
        for gif in user_data:
            servers.append(user_data[gif]['server'])
            commands.append(user_data[gif]['search_term'])
            providers.append(user_data[gif]['provider'])
            gifs.append(user_data[gif]['response'])
        
        most_used_server = max(set(servers), key=servers.count)
        most_used_search_term = max(set(commands), key=commands.count)
        most_used_provider = max(set(providers), key=providers.count)
        most_used_gif = max(set(gifs), key=gifs.count)
        
        try:
            linkRequest = {"destination": f"{most_used_gif}", "title": "EasyGif - Redirecting you to the orginal GIF"}
            requestHeaders = {"Content-type": "application/json", "apikey": os.environ['rebrandly-api-key']}

            shorten_link_request = requests.post("https://api.rebrandly.com/v1/links", data = json.dumps(linkRequest), headers=requestHeaders)

            shorten_link_information = json.loads(shorten_link_request.text)
            shorten_link = 'https://' + shorten_link_information['shortUrl']
        except:
            print('An error occured while shortening the link')
            shorten_link = most_used_gif
        embed = discord.Embed(title='EasyGif Stats', colour=discord.Colour.blue())
        embed.add_field(name=f'Stats for {context.author.name}', value=f"Total Number of GIFs: **{str(total_number_of_gifs)}**\nMost active server: **{most_used_server}**\nMost searched term: **{most_used_search_term}**\nMost sent GIF: **{shorten_link}**\nMost used GIF provider: **{most_used_provider}**")
        embed.set_footer(text='© Asenturisk 2021')
        await status.edit(content='', embed=embed)
        await context.message.delete()
    elif user_data == "There is an error":
        print(f'Error while retrieving infos for {context.author}')
    else:
        await status.edit(content="You haven't sent any gif with me yet!")
    print(f"← Stats sent on {context.guild} to {context.author}")

@client.command(pass_context=True)
async def gifstat(context):
    await gifstats(context)

@client.command(pass_context=True)
async def gifstats_clear(context):
    await context.message.add_reaction(roger_reaction)
    status = await context.send('Deleting your data...')
    print('')
    print(f"→ User Stats clear request came from the server: {context.guild}  (user: {context.author})")
    await asyncio.sleep(1)
    ### UPDATING THE DATABASE
    #user_node = firebase.child('requests/' + str(context.author.id)) # GETTING THE USER NODE FROM THE DATABASE
    if user_node.get() != None:
        try:
            user_node.delete()
            await status.edit(content='Done! ✨')
            print(f"← Data cleared for {context.author}")
            await asyncio.sleep(2)
            await status.delete()
            await context.message.delete()
        except:
            print('Error while deleting the data')
            await status.edit(content='❌ An error occured while deleting your data!')
            await asyncio.sleep(2)
    else:
        print(f"← No data to clear for {context.author}")
        await status.edit(content="You haven't sent any gif with me yet!")
        await asyncio.sleep(2)

@client.command(pass_context=True)
async def gif_statsclear(context):
    await gifstats_clear(context)

@client.command(pass_context=True)
async def gifstatsclear(context):
    await gifstats_clear(context)

@client.command(pass_context=True)
async def gifstat_clear(context):
    await gifstats_clear(context)

@client.command(pass_context=True)
async def gifstatclear(context):
    await gifstats_clear(context)


@client.command(pass_context=True)
async def gifhelp(context):
    await context.message.add_reaction(roger_reaction)
    print('')
    print(f"→ Help request came from the server: {context.guild}  (user: {context.author})")
    embed = discord.Embed(title='Astolfo Help Center', colour=discord.Colour.blue())
    embed.add_field(name='Available Commands', value="`.gif <search term>`: Searches a GIF on Giphy or Tenor (50% of chance for each) with the term you provided and sends it.\n`.gifrandom`: Sends a random GIF.\n`.gifchange`: Changes your last sent GIF.\n`.gifdelete`: Deletes the last sent GIF.\n`.gifstats`: Gives you your EasyGif's stats.\n`.gifstats_clear`: Clears your data from my database\n`.gifinvite`: Gives you a link to invite EasyGif on any discord server.\n`.easygifstats`: Gives EasyGif bot stats\n`.easygif_dev`: Gives you a link to easygif github repo.\n`.gifhelp`: Sends the message you are currently reading.")
    embed.set_author(name=f"Requested by {context.author}")
    embed.set_footer(text="MuktoDMI, Asenturisk - 2021")
    await context.send(embed=embed)
    print(f"← Help Center sent on {context.guild} to {context.author}")
    await context.message.delete()

@client.command(pass_context=True)
async def gifhelps(context):
    await gifhelp(context)

@client.command(pass_context=True)
async def easygifstats(context):
    await context.message.add_reaction(emoji=roger_reaction)
    print('')
    print(f"→ EasyGif Bot Stats request came from the server: {context.guild}  (user: {context.author})")
    number_of_servers_easygif_is_in = str(len(client.guilds))
    latency = round(client.latency * 1000,2)
    users = str(len(client.users))
    embed = discord.Embed(title='EasyGif Bot Stats', colour=discord.Colour.blue())
    embed.add_field(name='Stats', value=f"Version: **EasyGif v.1.6**\nPing/Latency: **{latency}ms**\nNumber of servers: **{number_of_servers_easygif_is_in}**\nNumber of users: **{users}**\nDeveloper: **MuktoDMI**\nProgramming Language: **Python**")
    embed.add_field(name='Powered by', value="Giphy\nTenor GIF\nReplit\nGoogle Firebase\nRequests Python Library\ndiscord.py Python Library\nRebrand.ly\nNetlify\nGitHub\nDiscord")
    await context.send(embed=embed)
    print(f"← EasyGif Bot Stats sent on {context.guild} to {context.author}")
    await context.message.delete()

@client.command(pass_context=True)
async def easygif_stats(context):
    await easygifstats(context)

@client.command(pass_context=True)
async def easygif_stat(context):
    await easygifstats

@client.command(pass_context=True)
async def easygifstat(context):
    await easygifstats

@client.command(pass_context=True)
async def gifinvite(context):
    print('')
    print(f"→ Invite link request came from the server: {context.guild}  (user: {context.author})")
    await context.message.add_reaction(emoji=roger_reaction)
    await context.send(content="Thank you for choosing to share me with your friends!")
    await asyncio.sleep(2)
    await context.send(content="Here is the link: **https://discord.com/api/oauth2/authorize?client_id="+str(client.user.id)+"&permissions=0&scope=bot**")
    print(f"← Invite link sent on {context.guild} to {context.author}")
    
@client.command(pass_context=True)
async def gifinvites(context):
    await gifinvite(context)



keep_alive()

client.run(TOKEN, bot=True)


```

<a id="dijjo"></a>
### Dijjo bot
<a href="#quicklinks">- go back to top -</a>

```python
# @author Valentin B. (https://gist.github.com/vbe0201/ade9b80f2d3b64643d854938d40a0a2d)
# @author_adaptation dmimukto

import asyncio
import functools
import itertools
import math
import random
import time
import os
from keep_alive import keep_alive


import discord
import youtube_dl
from async_timeout import timeout
from discord.ext import commands


client = discord.Client()

# Silence useless bug reports messages
youtube_dl.utils.bug_reports_message = lambda: ''


def logwrite(msg, server): #writes chatlog to MESSAGES.log
  with open('ServerLogs/'+str(server)+'_MESSAGES.log', 'a+') as f:
    f.write(msg + '\n')
  f.close()

def bugwrite(msg):
  with open('reports.log', 'a+') as buglog:
    buglog.write(msg + '\n')
  buglog.close()


class VoiceError(Exception):
    pass


class YTDLError(Exception):
    pass


class YTDLSource(discord.PCMVolumeTransformer):
    YTDL_OPTIONS = {
        'format': 'bestaudio/best',
        'extractaudio': True,
        'audioformat': 'mp3',
        'outtmpl': '%(extractor)s-%(id)s-%(title)s.%(ext)s',
        'restrictfilenames': True,
        'noplaylist': True,
        'nocheckcertificate': True,
        'ignoreerrors': False,
        'logtostderr': False,
        'quiet': True,
        'no_warnings': True,
        'default_search': 'auto',
        'source_address': '0.0.0.0',
    }

    FFMPEG_OPTIONS = {
        'before_options': '-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5',
        'options': '-vn',
    }

    ytdl = youtube_dl.YoutubeDL(YTDL_OPTIONS)
    ytdl.cache.remove()

    def __init__(self, ctx: commands.Context, source: discord.FFmpegPCMAudio, *, data: dict, volume: float = 0.5):
        super().__init__(source, volume)

        self.requester = ctx.author
        self.channel = ctx.channel
        self.data = data

        self.uploader = data.get('uploader')
        self.uploader_url = data.get('uploader_url')
        date = data.get('upload_date')
        self.upload_date = date[6:8] + '.' + date[4:6] + '.' + date[0:4]
        self.title = data.get('title')
        self.thumbnail = data.get('thumbnail')
        self.description = data.get('description')
        self.duration = self.parse_duration(int(data.get('duration')))
        self.tags = data.get('tags')
        self.url = data.get('webpage_url')
        self.views = data.get('view_count')
        self.likes = data.get('like_count')
        self.dislikes = data.get('dislike_count')
        self.stream_url = data.get('url')

    def __str__(self):
        return '**{0.title}** by **{0.uploader}**'.format(self)

    @classmethod
    async def create_source(cls, ctx: commands.Context, search: str, *, loop: asyncio.BaseEventLoop = None):
        loop = loop or asyncio.get_event_loop()

        partial = functools.partial(cls.ytdl.extract_info, search, download=False, process=False)
        data = await loop.run_in_executor(None, partial)

        if data is None:
            raise YTDLError('Couldn\'t find anything that matches `{}`'.format(search))

        if 'entries' not in data:
            process_info = data
        else:
            process_info = None
            for entry in data['entries']:
                if entry:
                    process_info = entry
                    break

            if process_info is None:
                raise YTDLError('Couldn\'t find anything that matches `{}`'.format(search))

        webpage_url = process_info['webpage_url']
        partial = functools.partial(cls.ytdl.extract_info, webpage_url, download=False)
        processed_info = await loop.run_in_executor(None, partial)

        if processed_info is None:
            raise YTDLError('Couldn\'t fetch `{}`'.format(webpage_url))

        if 'entries' not in processed_info:
            info = processed_info
        else:
            info = None
            while info is None:
                try:
                    info = processed_info['entries'].pop(0)
                except IndexError:
                    raise YTDLError('Couldn\'t retrieve any matches for `{}`'.format(webpage_url))

        return cls(ctx, discord.FFmpegPCMAudio(info['url'], **cls.FFMPEG_OPTIONS), data=info)

    @staticmethod
    def parse_duration(duration: int):
        minutes, seconds = divmod(duration, 60)
        hours, minutes = divmod(minutes, 60)
        days, hours = divmod(hours, 24)

        duration = []
        if days > 0:
            duration.append('{} days'.format(days))
        if hours > 0:
            duration.append('{} hours'.format(hours))
        if minutes > 0:
            duration.append('{} minutes'.format(minutes))
        if seconds > 0:
            duration.append('{} seconds'.format(seconds))

        return ', '.join(duration)


class Song:
    __slots__ = ('source', 'requester')

    def __init__(self, source: YTDLSource):
        self.source = source
        self.requester = source.requester

    def create_embed(self):
        embed = (discord.Embed(title='Now playing',
                               description='```css\n{0.source.title}\n```'.format(self),
                               color=discord.Color.blurple())
                 .add_field(name='Duration', value=self.source.duration)
                 .add_field(name='Requested by', value=self.requester.mention)
                 .add_field(name='Uploader', value='[{0.source.uploader}]({0.source.uploader_url})'.format(self))
                 .add_field(name='URL', value='[Click]({0.source.url})'.format(self))
                 .set_thumbnail(url=self.source.thumbnail))

        return embed


class SongQueue(asyncio.Queue):
    def __getitem__(self, item):
        if isinstance(item, slice):
            return list(itertools.islice(self._queue, item.start, item.stop, item.step))
        else:
            return self._queue[item]

    def __iter__(self):
        return self._queue.__iter__()

    def __len__(self):
        return self.qsize()

    def clear(self):
        self._queue.clear()

    def shuffle(self):
        random.shuffle(self._queue)

    def remove(self, index: int):
        del self._queue[index]


class VoiceState:
    def __init__(self, bot: commands.Bot, ctx: commands.Context):
        self.bot = bot
        self._ctx = ctx

        self.current = None
        self.voice = None
        self.next = asyncio.Event()
        self.songs = SongQueue()

        self._loop = False
        self._volume = 0.5
        self.skip_votes = set()

        self.audio_player = bot.loop.create_task(self.audio_player_task())

    def __del__(self):
        self.audio_player.cancel()

    @property
    def loop(self):
        return self._loop

    @loop.setter
    def loop(self, value: bool):
        self._loop = value

    @property
    def volume(self):
        return self._volume

    @volume.setter
    def volume(self, value: float):
        self._volume = value

    @property
    def is_playing(self):
        return self.voice and self.current

    async def audio_player_task(self):
        while True:
            self.next.clear()

            if not self.loop:
                # Try to get the next song within 3 minutes.
                # If no song will be added to the queue in time,
                # the player will disconnect due to performance
                # reasons.
                try:
                    async with timeout(180):  # 3 minutes
                        self.current = await self.songs.get()
                except asyncio.TimeoutError:
                    self.bot.loop.create_task(self.stop())
                    return

            self.current.source.volume = self._volume
            self.voice.play(self.current.source, after=self.play_next_song)
            await self.current.source.channel.send(embed=self.current.create_embed())

            await self.next.wait()

    def play_next_song(self, error=None):
        if error:
            raise VoiceError(str(error))

        self.next.set()

    def skip(self):
        self.skip_votes.clear()

        if self.is_playing:
            self.voice.stop()

    async def stop(self):
        self.songs.clear()

        if self.voice:
            await self.voice.disconnect()
            self.voice = None


class Music(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.voice_states = {}


    def get_voice_state(self, ctx: commands.Context):
        state = self.voice_states.get(ctx.guild.id)
        if not state:
            state = VoiceState(self.bot, ctx)
            self.voice_states[ctx.guild.id] = state

        return state

    def cog_unload(self):
        for state in self.voice_states.values():
            self.bot.loop.create_task(state.stop())

    def cog_check(self, ctx: commands.Context):
        if not ctx.guild:
            raise commands.NoPrivateMessage('This command can\'t be used in DM channels.')

        return True

    async def cog_before_invoke(self, ctx: commands.Context):
        ctx.voice_state = self.get_voice_state(ctx)

    async def cog_command_error(self, ctx: commands.Context, error: commands.CommandError):
        await ctx.send('An error occurred: {}'.format(str(error)))

    @commands.command(name='join', invoke_without_subcommand=True)
    async def _join(self, ctx: commands.Context):
        """Joins a voice channel."""

        destination = ctx.author.voice.channel
        if ctx.voice_state.voice:
            await ctx.voice_state.voice.move_to(destination)
            return

        ctx.voice_state.voice = await destination.connect()

    @commands.command(name='summon')
    @commands.has_permissions(manage_guild=True)
    async def _summon(self, ctx: commands.Context, *, channel: discord.VoiceChannel = None):
        """Summons the bot to a voice channel.

        If no channel was specified, it joins your channel.
        """

        if not channel and not ctx.author.voice:
            raise VoiceError('You are neither connected to a voice channel nor specified a channel to join.')

        destination = channel or ctx.author.voice.channel
        if ctx.voice_state.voice:
            await ctx.voice_state.voice.move_to(destination)
            return

        ctx.voice_state.voice = await destination.connect()

    @commands.command(name='leave', aliases=['disconnect'])
    @commands.has_permissions(manage_guild=True)
    async def _leave(self, ctx: commands.Context):
        """Clears the queue and leaves the voice channel."""

        if not ctx.voice_state.voice:
            return await ctx.send('Not connected to any voice channel.')

        await ctx.voice_state.stop()
        del self.voice_states[ctx.guild.id]

    @commands.command(name='volume')
    async def _volume(self, ctx: commands.Context, *, volume: int):
        """Sets the volume of the player."""

        if not ctx.voice_state.is_playing:
            return await ctx.send('Nothing being played at the moment.')

        if 0 > volume > 100:
            return await ctx.send('Volume must be between 0 and 100')

        ctx.voice_state.volume = volume / 100
        await ctx.send('Volume of the player set to {}%'.format(volume))

    @commands.command(name='now', aliases=['current', 'playing'])
    async def _now(self, ctx: commands.Context):
        """Displays the currently playing song."""

        await ctx.send(embed=ctx.voice_state.current.create_embed())

    @commands.command(name='pause')
    @commands.has_permissions(manage_guild=True)
    async def _pause(self, ctx: commands.Context):
        """Pauses the currently playing song."""

        if ctx.voice_state.is_playing and ctx.voice_state.voice.is_playing():
            ctx.voice_state.voice.pause()
            await ctx.message.add_reaction('⏯')

    @commands.command(name='resume')
    @commands.has_permissions(manage_guild=True)
    async def _resume(self, ctx: commands.Context):
        """Resumes a currently paused song."""

        if ctx.voice_state.is_playing and ctx.voice_state.voice.is_paused():
            ctx.voice_state.voice.resume()
            await ctx.message.add_reaction('⏯')

    @commands.command(name='stop')
    @commands.has_permissions(manage_guild=True)
    async def _stop(self, ctx: commands.Context):
        """Stops playing song and clears the queue."""

        ctx.voice_state.songs.clear()

        if ctx.voice_state.is_playing:
            ctx.voice_state.voice.stop()
            await ctx.message.add_reaction('⏹')

    @commands.command(name='skip')
    async def _skip(self, ctx: commands.Context):
        """Vote to skip a song. The requester can automatically skip.
        3 skip votes are needed for the song to be skipped.
        """

        if not ctx.voice_state.is_playing:
            return await ctx.send('Not playing any music right now...')

        voter = ctx.message.author
        if voter == ctx.voice_state.current.requester:
            await ctx.message.add_reaction('⏭')
            ctx.voice_state.skip()

        elif voter.id not in ctx.voice_state.skip_votes:
            ctx.voice_state.skip_votes.add(voter.id)
            total_votes = len(ctx.voice_state.skip_votes)

            if total_votes >= 3:
                await ctx.message.add_reaction('⏭')
                ctx.voice_state.skip()
            else:
                await ctx.send('Skip vote added, currently at **{}/3**'.format(total_votes))

        else:
            await ctx.send('You have already voted to skip this song.')

    @commands.command(name='queue')
    async def _queue(self, ctx: commands.Context, *, page: int = 1):
        """Shows the player's queue.

        You can optionally specify the page to show. Each page contains 10 elements.
        """

        if len(ctx.voice_state.songs) == 0:
            return await ctx.send('Empty queue.')

        items_per_page = 10
        pages = math.ceil(len(ctx.voice_state.songs) / items_per_page)

        start = (page - 1) * items_per_page
        end = start + items_per_page

        queue = ''
        for i, song in enumerate(ctx.voice_state.songs[start:end], start=start):
            queue += '`{0}.` [**{1.source.title}**]({1.source.url})\n'.format(i + 1, song)

        embed = (discord.Embed(description='**{} tracks:**\n\n{}'.format(len(ctx.voice_state.songs), queue))
                 .set_footer(text='Viewing page {}/{}'.format(page, pages)))
        await ctx.send(embed=embed)

    @commands.command(name='shuffle')
    async def _shuffle(self, ctx: commands.Context):
        """Shuffles the queue."""

        if len(ctx.voice_state.songs) == 0:
            return await ctx.send('Empty queue.')

        ctx.voice_state.songs.shuffle()
        await ctx.message.add_reaction('✅')

    @commands.command(name='remove')
    async def _remove(self, ctx: commands.Context, index: int):
        """Removes a song from the queue at a given index."""

        if len(ctx.voice_state.songs) == 0:
            return await ctx.send('Empty queue.')

        ctx.voice_state.songs.remove(index - 1)
        await ctx.message.add_reaction('✅')

    @commands.command(name='loop')
    async def _loop(self, ctx: commands.Context):
        """Loops the currently playing song.

        Invoke this command again to unloop the song.
        """

        if not ctx.voice_state.is_playing:
            return await ctx.send('Nothing being played at the moment.')

        # Inverse boolean value to loop and unloop.
        ctx.voice_state.loop = not ctx.voice_state.loop
        await ctx.message.add_reaction('✅')

    @commands.command(name='play')
    async def _play(self, ctx: commands.Context, *, search: str):
        """Plays a song.

        If there are songs in the queue, this will be queued until the
        other songs finished playing.

        This command automatically searches from various sites if no URL is provided.
        A list of these sites can be found here: https://rg3.github.io/youtube-dl/supportedsites.html
        """

        if not ctx.voice_state.voice:
            await ctx.invoke(self._join)

        async with ctx.typing():
            try:
                source = await YTDLSource.create_source(ctx, search, loop=self.bot.loop)
            except YTDLError as e:
                await ctx.send('An error occurred while processing this request: {}'.format(str(e)))
            else:
                song = Song(source)

                await ctx.voice_state.songs.put(song)
                await ctx.send('Enqueued {}'.format(str(source)))

    @_join.before_invoke
    @_play.before_invoke
    async def ensure_voice_state(self, ctx: commands.Context):
        if not ctx.author.voice or not ctx.author.voice.channel:
            raise commands.CommandError('You are not connected to any voice channel.')

        if ctx.voice_client:
            if ctx.voice_client.channel != ctx.author.voice.channel:
                raise commands.CommandError('Bot is already in a voice channel.')








bot = commands.Bot('jud.', description='A mysterious bot disguised as a music bot. Its audio quality is terrible, but great for using as a prop for creepy videos.')
bot.add_cog(Music(bot))






@bot.event
async def on_ready():
    
    #print('Logged in as:\n{0.user.name}\n{0.user.id}'.format(bot))
    print("""
  ___      _      ___           _ 
 / _ \    | |    |_  |         | |
/ /_\ \___| | __   | |_   _  __| |
|  _  / __| |/ /   | | | | |/ _` |
| | | \__ \   </\__/ / |_| | (_| |
\_| |_/___/_|\_\____/ \__,_|\__,_|
                                 """)
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name="over your server"))

    print('---------------------------------------------------------------------')
    print('Server Connect Link:')
    print('https://discordapp.com/api/oauth2/authorize?scope=bot&client_id=' + str(bot.user.id))
    print('--------------------------------------------------------------------------')
    print('Logged in as:')
    print(bot.user.name)
    print("or")
    print(bot.user)
    print("UID:")
    print(bot.user.id)
    print('---------------------------------------------')
    print("LIVE CHAT LOG - See MESSAGES.log For History")
    print("---------------------------------------------")


@bot.event
async def on_member_join(member):
  #channel = message.channel
  server = member.guild
  print("Member:", member, "joined!")
  #await channel.send("Member:", member, "joined 😀")
  logwrite("Member: " + str(member) + " joined!", server)
  
  if member == bot.user :
    await member.send("Yo! I'm here.")
    await asyncio.sleep(30)   #The parameter is in seconds, so it'll wait for 30 seconds
    #verifiedRole = discord.utils.get(member.guild.roles, id = THE_ROLE_ID)
    #await member.add_roles(verifiedRole)

@bot.event
async def on_member_remove(member):
  #channel = message.channel
  server = member.guild
  print("Member:", member, "removed!")
  #await channel.send("Member:", member, "removed 😞")
  logwrite("Member: " + str(member) + " removed!", server)

@bot.event
async def on_guild_role_create(role):
  #channel = message.channel
  server = role.guild
  print("Role:", role, "was created!")
  #await channel.send("Role:", role, "was created! 📝")
  logwrite("Role: " + str(role) + " was created!", server)

@bot.event
async def on_guild_role_delete(role):
  #channel = message.channel
  server = role.guild
  print("Role:", role, "was deleted!")
  #await channel.send("Role:", role, "was deleted! ❎")
  logwrite("Role: " + str(role) + " was deleted!", server)

@bot.event
async def on_guild_channel_create(channel):
  #channel = message.channel
  server = channel.guild
  print("Channel:", channel, "was created!")
  #await channel.send("Channel:", channel, "was created!")
  logwrite("Channel: " + str(channel) + " was created!", server)

@bot.event
async def on_guild_channel_delete(channel):
  #channel = message.channel
  server = channel.guild
  print("Channel:", channel, "was deleted!")
  #await channel.send("Channel:", channel, "was deleted!")
  logwrite("Channel: " + str(channel) + " was deleted!", server)

@bot.event
async def on_guild_channel_update(before, after):
  #channel = message.channel
  server = after.guild
  print("Channel Updated:", after)
  #await channel.send("Channel Updated:", after)
  logwrite("Channel Updated: " + str(after), server)

#@client.event
#async def on_guild_join(guild):
    #guildIDs.add(guild.id)
    #print("Server/guild joined:", guild)


#@client.event
#async def on_guild_remove(guild):
    #guildIDs.remove(guild.id)
    #print("Server/guild left:", guild)


@bot.event
async def on_message(message):
  if message.author == bot.user:
    return #ignore what bot says in server so no message loop
  channel = message.channel
  try:
    server = channel.guild
  except:
    print("Message sent in DMs")
    server = '_privatemsg_'
  print(message.author, "said:", message.content, "-- Time:", time.ctime()) #reports to discord.log and live chat
  logwrite(str(message.author) + " said: " + str(message.content) + "-- Time: " + time.ctime(), server)


  if ("jud") in message.content.lower() and ("show") in message.content.lower() and ("server") in message.content.lower() and (("log") in message.content.lower() or ("history") in message.content.lower()):
    channel = message.channel
    server = channel.guild
    try:
      await channel.send("Roger that.")
      #await ayncio.sleep(4)
      serverloglink = "https://replit.com/@dewanmukto/Dijjo#ServerLogs/"+str(server)+"_MESSAGES.log"
      serverloglink = serverloglink.replace(" ","%20")
      await channel.send("Your server's logs are stored [here]("+serverloglink+")")
    except:
      await channel.send("Something went wrong.")

  await bot.process_commands(message)
      
keep_alive()
bot.run(os.getenv("TOKEN"))
```

<a id="keep_alive"></a>
### keep_alive.py
This is a special module that will launch a web server for your bot's 'presence'. If you're hosting in on <a href="https://replit.com" target="_blank">Replit</a>, then I would suggest keeping this module next to the main module. Then goto <a href="https://uptimerobot.com/" target="_blank">UptimeRobot</a> and create some HTTP/HTTPS monitors. This will ping your web server every 5 minutes or so, keeping your bot active (if you're on the Free plan of Replit).

```python
# AUTHOR UNKNOWN
# TAKEN FROM A BOT TEMPLATE FROM REPLIT

from flask import Flask
from threading import Thread
import random


app = Flask('')

@app.route('/')
def home():
	return 'The bot is active now!'

def run():
  app.run(
		host='0.0.0.0',
		port=random.randint(2000,9000)
	)

def keep_alive():
	'''
	Creates and starts new thread that runs the function run.
	'''
	t = Thread(target=run)
	t.start()
```
<a href="#quicklinks">- go back to top -</a>

<br />
This isn't the end, though! Also, my apologies for such a ***loooooong*** blog post. I shall post detailed tutorials later on.
