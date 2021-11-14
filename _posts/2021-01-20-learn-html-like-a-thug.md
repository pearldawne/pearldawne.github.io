---
layout: post
title: 'Learn HTML like a THUG'
tags:
  - HTML5
  - casual
  - learning
  - articles
hero: https://fullsync.co.uk/wp-content/uploads/2020/06/HTML5.png
overlay: purple
published: true
---

"Vadim blyat! You wanna learn web development? It's not for you. Go home and cry to your mama. Bwahahahaaa."

Don't listen to that bully. Seek shelter here and begin where everyone else begins.

![html5 icon](https://fullsync.co.uk/wp-content/uploads/2020/06/HTML5.png)

## What the Fcck is HTML?
HyperText Markup Language was invented by the homie Sir Tim Berners Lee, a member of CERN. He wanted to find a universal way to display information or something. (I forgot, but the internet didn't. Search up all the trivia you want.)

To think of it on a simpler scale, a website is just a collection of webpages and a webpage is a freaking document. Just like various types of documents (such as .docx, .xlsx, .pptx), HTML is a document format like that. Put down your cigar while you read this.


## How to write HTML?
First up, all HTML documents end in the extension ".html" or ".htm". So you can open up any text editor you want and save the HTML code as a ".html" file.

In the world of HTML, there are certain 'tags' which represent parts of the whole document (such as `<html>`,`<body>`,`<img>`, `<header>`, etc.) Some tags exist like opposite twins. One is normal, the other is anti-normal. One opens a feature in a webpage, another closes it. Like yin and yang. The closing one always appears at the end of each tag and is represented with a slash in front of its name, like a scar of dishonor.

To begin with, there is a tag called "html". And you place all tags with their names within angular brackets. For some visual confusion and inspiration, right-click on THIS CURRENT website itself and click on "Inspect" or "View Page Source". You'll be able to see the whole architecture of how a typical HTML document looks like.



## The HTML tag
This tag opens and closes a HTML document. Basically it tells the computer that when the `<html>` tag is read, the computer would begin producing the HTML output and when the `</html>` tag is read, the computer would know that it is the end of the document. This MUST exist otherwise the computer is too dumb to figure out what sort of gibberish code you wrote.

Think of this as your first HTML document. As time passes, notice how it progresses :
```html
<html>
</html>
```
Okay, so till now all you know is that these gangsters are supposed to point out from where your turf begins and till where your local turf ends. Now to get busy.



## The body tag
Yeah, you just wrote 2 lines, nigger. How about two more lines? Add them in.

```html
<html>
<body>
</body>
</html>
```
This juicy arrangement is your basic structure for a webpage/HTML document. These are the burger buns at the top and bottom. If you miss these, you don't have a burger anymore. Nothing too complex to understand yet. Keep these facts drilled into your cerebrum, you vodka-seeking bastard!



## The paragraph tag
The "paragraph" word is so damn long, that the tag name is shortened to "p" only. Fair enough, you lazy asshole?

Now do the following with your progressive HTML document :
```html
<html>
<body>
<p>Yo, I love niggas. Let's play cops and robbers.</p> 
</body>
</html>
```
See how that paragraph tag ends with a `</p>` ? You can add more penises like that.

Add two more p-tags till it looks like a dump.

```html
<html>
<body>
<p>Yo, I love niggas. Let's play cops and robbers.</p>
<p>I'm learnin' fuckin' HTML from a mudafucka.</p>
<p>Get your brains dozed on this shit, too! https://www.mukto.live/</p>
</body>
</html>
```

Damn! You suck at HTML, you rascal! Maybe that bully was right.

Or maybe not, 'cause you've got 3 paragraphs of text displayed on your HTML document that proves you are a fast learner indeed.



## The anchor tag
You know what's an anchor, hotshot? Huh? An anchor is used to pin down, connect, or link something with another. Just the way a real anchor keeps a ship connected to the sea bed, we use HTML anchor tags to link up stuff, such as a website link.

Remember the code from above? It ain't looking dope yet. Let's place in an anchor tag and make things look groovy.
```html
<html>
<body>
<p>Yo, I love niggas. Let's play cops and robbers.</p>
<p>I'm learnin' fuckin' HTML from a mudafucka.</p>
<p>Get your brains dozed on this shit, too! <a href="https://www.mukto.live/">Click here</a></p>
</body>
</html>
```
So now, you see, the anchor tag begins with `<a>`. And to add some customizations to it, we sometimes use extra words and syntaxes within the angular brackets. Here, we left a space after the tag name "a" because otherwise it will change the whole meaning if it was "ahref". The computer will be like "WTF? When did HTML have a tag named 'ahref' ??!"

Remember to close the anchor tag with a good old </> with the tag name coming after the slash.

What happened above is, you declared a hyperlink reference (a fancy name for a web link) to THIS website. You placed it within quotation marks because that's how the developers designed it to be. And then, you placed in the "click here" text, which would show up as a typical link - that blue underlined and untrustworthy classical link - on your HTML document.



## The image tag
The HTML gods shortened the image tag's name to "img". Praise them for saving your precious time. Now where the hell do you put it?

So I think this is what you did :

```html
<html>
<body>
<p>Yo, I love niggas. Let's play cops and robbers.</p>
<img></img>
<p>I'm learnin' fuckin' HTML from a mudafucka.</p>
<p>Get your brains dozed on this shit, too! <a href="https://www.mukto.live/">Click here</a></p>
</body>
</html>
```

And now I'd shake my head and punch your face. You advanced too early. You should know that the image tag needs a source, bitch.

```html
<html>
<body>
<p>Yo, I love niggas. Let's play cops and robbers.</p>
<img src="INSERT SOURCE HERE"></img>
<p>I'm learnin' fuckin' HTML from a mudafucka.</p>
<p>Get your brains dozed on this shit, too! <a href="https://www.mukto.live/">Click here</a></p>
</body>
</html>
```

Now go and search up your favorite CSGO picture from Google. Right-click and hit COPY IMAGE ADDRESS. Go back to your HTML doc, and insert the link within `src="INSERT SOURCE HERE"` by replacing the INSERT SOURCE HERE placeholder text with your link.

For an example, I have chosen an image and I placed the source link.

```html
<html>
<body>
<p>Yo, I love niggas. Let's play cops and robbers.</p>
<img src="https://www.talkesport.com/wp-content/uploads/csgo-visibility-update-appears-to-reveal-opponents-through-walls-1.jpg"></img>
<p>I'm learnin' fuckin' HTML from a mudafucka.</p>
<p>Get your brains dozed on this shit, too! <a href="https://www.mukto.live/">Click here</a></p>
</body>
</html>
```

Now you think that you wanna be more creative. So you wanna adjust the image proportions to fit your document more properly, yeah?

So place in more attributes like "width" and "height". Express them as pixels or percentages. Your wish.

Focusing only on the image tag portion of the code above, you can play around with the proportions by placing in these height and width attributes and using numbers to express them in terms of pixels or percentages of the whole page size (of the HTML document).

```html
<img src="https://www.talkesport.com/wp-content/uploads/csgo-visibility-update-appears-to-reveal-opponents-through-walls-1.jpg" height="640px" width="320px"></img>
```

Or

```html
<img src="https://www.talkesport.com/wp-content/uploads/csgo-visibility-update-appears-to-reveal-opponents-through-walls-1.jpg" height="80%" width="120%"></img>
```

Now make sure you save your HTML document as a ".html" file. If it is saved as ".txt" by mistake (or any other format), DON'T PANIC! Obviously, you can't call up 911 and ask for technical advice on how to recover a HTML document. Lol. Just take a deep breath and rename the file so that ".html" is sticking out at the end. Examples : "sushibandit.html", "practisedoc.html", "haramjada.html".

## Getting boring
Ugh, you are the worst HTML developer.... in terms of traditional approach. However, you have a great potential as a modern-day developer. So it's time to learn some tricks and skills to be more flexible with current trends.


## Spice up your HTML documents/webpages
For now, explore how different social platforms and other websites allow certain posts and content to be "embedded" within HTML webpages. Whenever you see the word "embed" shown in the SHARE option... or you see a symbol or icon like </>... it means that the content can be displayed on another site.

To play around with random HTML features and tags, it's best to see them in action. So you can adjust the numbers, coordinates, etc. and learn through experimentation.

Here's an example embed code from YouTube, that shows a video wherever you place the embed code.

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/ncKb0zSKqWc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

That's right! That whole line is a single web element. You can copy-paste it in whichever position (beginning/middle/ending of the webpage) you want to place it.

Learn more about HTML and its various tags, I recommend [W3Schools](https://www.w3schools.com/html/default.asp). You can also use it as a reference site if you forget about a certain tag or HTML attribute.

## A Final Trick
This trick was introduced to me by my ICT teacher. A rather crazy technique it is!
Simply type, draw, edit, and customize a Microsoft Word document, and save it as ".html" or ".htm". You'll see that it auto-generates the whole document as a webpage itself!

Simple, effortless, and sneaky.

<br>
<br>

See you later, sucker. You got rick-rolled badly! Bwahaha... Because I was the bully all along!
<br>
<iframe width="100%" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
