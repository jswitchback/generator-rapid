# generator-rapid [![Build Status](https://secure.travis-ci.org/jswitchback/generator-rapid.png?branch=master)](https://travis-ci.org/jswitchback/generator-rapid)

> [Yeoman](http://yeoman.io) generator



######################## YEOMAN README ########################



## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install GENERATOR-NAME-HERE from npm, run:

```bash
npm install -g GENERATOR-NAME-HERE
```

Finally, initiate the generator:

```bash
yo GENERATOR-NAME-HERE
```

<a href="http://yeoman.io/generators/">Search for more generators</a>

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT



######################## RAPID GENERATOR README ########################



To run this generator locally: clone the repository, change directory and install the generators dependencies with the following command:

```bash
git clone https://github.com/jswitchback/generator-rapid.git && cd generator-rapid && npm link && npm install
```

After npm is done, you'll be able to generate a new theme or module from templates in any directory:

```bash
yo rapid
yo rapid:module
```

