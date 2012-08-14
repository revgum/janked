janked
======

A git-powered janky blog engine written in node, and ready to push to Heroku. Express 3.x using Jade for the view engine and Compass for styles. Heavily -inspired by- leveraging ideas from [toto](https://github.com/cloudhead/toto), but with several changes specific to my needs. 

How's it work?
--------------
- An article is composed of a header section of YAML, and a body section of Markdown.
- You commit a new article using git, and then push it to Heroku to publish it to the world!
- The janked routes inspect the articles directory and render views of the articles published.
- You hack on it to make it do things you want it to do.

Git started
-----------
    $ git clone git://github.com/revgum/janked.git my-jank
    $ cd my-jank
    $ heroku create my-jank
    $ git push heroku master

Publish a new article
---------------------
I put together a simple script to aid in starting a new article, that way you don't have to recall the proper format.. 

    $ node new_article.js
    $ ... fill out the following questions
    $ vim articles/2012-08-14-my-new-article.txt
    $ git commit -a -m 'publishing my new article'
    $ git push heroku master

Thanks
------
Heroku, you're awesome.

Toto, you're inspirational.