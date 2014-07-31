# Node and Mongoose - a primer

Welcome. Using Node, Express, and Mongoose, let's create an interactive form.

> Before you start, make sure you have [Node](http://nodejs.org/download/) installed for your specific operating system. This tutorial also uses Expression version 4.2.0.

## Setup

1. Start by installing the Express generator, which we'll be used to create a basic project for us:

    ```
    $ npm install -g express-generator@4
    ```

    > The `-g` flag means that we're installing this on our entire system.

1. Navigate to a convenient directory, like your "Desktop" or "Documents*, then create your app:

    ```
    $ express node-mongoose-form
    ```

1. Enter the new directory (`cd node-mongoose-form`) and check out the project structure. Don't worry about the files and folders for now. Just know that we have created a boilerplate that could be used for a number of Node applications. This took care of the heavy lifting, adding common files and functions associated with all apps.

1. Notice the *package.json* file. This stores your project's dependencies, which we still need to install with the following command:

    ```
    $ npm install
    ```

1. Now let's install one last dependency:

    ```
    $ npm install mongoose --save
    ```

    > The `--save` flag adds the dependencies and their versions to the *package.json* file. Take a look.

## Sanity check

1. Let's test our setup by running the app:

    ```
    $ npm start
    ```

    Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser and you should see the "Welcome to Express" text.

1. It's highly recommend to setup [Supervisor](https://github.com/isaacs/node-supervisor). Check out that link to learn more about it.

    ```
    $ npm install supervisor -g
    ```

    Kill the server by pressing CTRL-C.

1. Once installed, let's update the *package.json* file to utilize Supervisor to run our program.

    Simple change this-

    ```
    "scripts": {
        "start": "node ./bin/www"
    },
    ```

    To this:

    "scripts": {
        "start": "supervisor ./bin/www"
    },

1. Let's test again:

    ```
    $ npm start
    ```

    In your terminal you should see:

    ```
    DEBUG: Watching directory
    ```

    If you see that, you know it's working right. Essentially, Supervisor is watching that directory for code changes, and if they do occur, then it will refresh your app for you so you don't have to constantly kill the server then start it back up. It saves a lot of time and keystrokes.

Awesome. With the setup out of the way, let's get out hands dirty and actually build something!

## Routes

Grab your favorite text editor and open the entire project. Then open our main file, *app.js*, which houses all of the business logic. Take a look at the routes:

```
app.use('/', routes);
app.use('/users', users);
```

Understanding how routes work as well as how to trace all the files associated with an individual routes is an important skill to learn. By doing so, you'll be able to approach most applications and understand how they work just by starting with the routes.

Let's look at this route:

```
app.use('/users', users)
```

Here, we know that this route is associated with the `/users` endpoint. What's an endpoint? Simply navigate to [http://localhost:3000/users](http://localhost:3000/users). That's all it is.

So the end user navigates to that endpoint and expects *something* to happen. That could mean some HTML is rendered or perhaps JSON is returned. That's not important at this point. For now, let's look at how Node handles that logic for "handling routes".

Also, within that route, you can see the variable `users`. Where is that in this file? It's at the top, and it loads in another file within our app:

```
var users = require('./routes/users');
```

Open that file:

```javascript
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
```

What's happening here? We won't touch everything but essentially when that endpoint is hit it responds by sending text in the form of a response to the end user - "respond with a resource".

Now, of course you don't always have to send text. You could respond with a template or view like a Jade file that gets rendered into HTML. We'll look at how this works in just a minute when we add our own route.

**Make sure you understand everything in this section before moving on. This is very important**.

### Add a new route

Let's now add a new route that renders an HTML form to the end user.

1. Start by adding the route handler in the *app.js* file:

    ```javascript
    app.use('/form', form);
    ```

    > Remember this means: `app.use('/ENDPOINT', VARIABLE_NAME);`,

1. Use the `form` variable to require a JS file within our routes folder.

    ```javascript
    var form = require('./routes/form');
    ```

    > If you're using Supervisor, take a look in the terminal. You should see an error, indicating Node can't find that './routes/form' module. We need to create it!

1. Create that JS file/module by saving an empty file called *form.js* to the "routes" directory.

1. Add the following code:

    ```javascript
    var express = require('express');
    var router = express.Router();

    /* GET form. */
    router.get('/', function(req, res) {
      res.send('My funky form');
    });

    module.exports = router;
    ```

    > Remember what this code `res.send('My funky form');` should do? If not, review the previous section.

1. Do you think this worked? Find out. Navigate to [http://localhost:3000/form](http://localhost:3000/form). You should see the text "'My funky form" on the page. Sweet.

## Jade

Jade is a templating language, which compiles down to HTML. It makes it easy to separate logic from markup.

Take a quick look at the *layout.jade* and *index.jade* files. There's a relationship between those two files. It's called inheritance. We define the base structure in the *layout* file, which contains common structure that can be reused in multiple places.

Do you see the `block` keyword?

What really happens when the *index* file is rendered is that it first inherits the base template because of the `extends` keywords. So, the *layout* template then gets rendered, which eventually pulls in the child template, overwriting the `block` keyword with:

```html
h1= title
  p Welcome to #{title}
```

Hope that makes sense. If not, check out [this](http://www.learnjade.com/tour/template-inheritance/) resource for more info.

### Setup *form.jade*

1. Create a new file called "form.jade" in the "views" directory, and then add the following code:

    ```html
    extends layout

    block content
      h1= title
      p Welcome to #{title}
    ```

    Same thing is happening here with inheritance. If you're unfamiliar with Jade syntax, `title` is essentially a variable, which we can pass in from `./routes/form.js`.

1. Update `./routes/form.js` by changing-

    ```javascript
    res.send('My funky form');
    ```

    To:

    ```
    res.render('form', { title: 'My funky form' });
    ```

    This just says, "When a user hits the `/form` endpoint, render the *form.jade* file and pass in `My funky form` as the title."

    > Keep in mind that all Jade files are converted to HTML. Browsers can't read the Jade syntax, so it must be in HTML by the time the end user sees it.

1. Ready to test? Simple refresh [http://localhost:3000/form](http://localhost:3000/form).

1. Did it work? If yes, move on. If not, go back through this section and review. Look in you terminal as well to see the error(s). If you're having problems, don't beat yourself up. It's all part of learning!

### Update *form.jade*

So, let's update the Jade syntax to load a form.

```html
extends layout

block content
  //- passed into layout.jade when form.jade is rendered
  block content
    h1= title
    form(method="post" action="/create")
      label(for="comment") Got something to say:
      input(type="text", name="comment", value=comment)
      input(type="submit", value="Save")
```

I'm not going to touch on all the Jade syntax, but essential, we have just a basic HTML form to submit comments.

Refresh your browser. Do you see the form? Try clicking save. What happens? Well, you just tried to send a POST request to the `/create` endpoint, which does not exist.

Let's set it up.

## Add route handler for `/create`

1. Open *app.js* and add a new route:

    ```javascript
    app.use('/create', form);
    ```

    > Notice how we're using the same `form` variable. What does this mean?

1. Open *form.js* to add the logic for this new route:

    ```javascript
    var express = require('express');
    var router = express.Router();

    /* GET form. */
    router.get('/', function(req, res) {
      res.render('form', { title: 'My funky form' });
    });

    /* POST form. */
    router.post('/', function(req, res) {
      console.log(req.body.comment);
      res.redirect('form');
    });

    module.exports = router;
    ```

1. Test this out again. Now, when you submit the form, we have the `/create` endpoint setup, which then grabs the text from the input box via `req.body.comment`. Make sure the text is consoled to your terminal.

Okay. So, we are handling the routes, rendering the right template, let's now setup Mongoose to save the data from our form.

## Setup Mongoose

Mongoose is awesome. Start with defining the Schema, which the maps to a collection in Mongo. It utilizes an OOP paradigm.

1. Create a file called *database.js* in your apps route directory, then add the following code:

    ```javascript
    var mongoose = require('mongoose');
    var Schema   = mongoose.Schema;

    var Comment = new Schema({
        title : String,
    });

    mongoose.model('Comment', Comment);

    mongoose.connect('mongodb://localhost/node-comment');
    ```

    Here, we required/included the Mongoose library along with the a reference to the `Schema` method. As said, you always start with the defining the schema, then we linked it to collection called "Comment". Finally, we opened a connection to an instance of our local MongoDB.

    > If you don't have the MongoDB server running. Do so now. Open a new terminal window, and run the command `sudo mongod`.

1. Next, open *app.js* and require the Mongoose config at the very top of the file:

    ```javascript
    // mongoose config
    require('./database');
    ```

With Mongoose setup, open the *form.js*. We need to update it, to create (via POST) and read (via GET) data from the Mongo collection.

## Handling form GET requests

1. Open *form.js*. Require Mongoose as well as the `Comment` model, which we already created:

    ```javascript
    var mongoose = require( 'mongoose' );
    var Comment = mongoose.model('Comment');
    ```

1. Now, update the function handling GET requests:

    ```javascript
    /* GET form. */
    router.get('/', function(req, res) {
      Comment.find(function(err, comments){
        res.render(
          'form',
          {title : 'My funky form', comments : comments}
        );
      });
    });
    ```

    `Comment.find()` grabs all comments from the Mongo collection, which we assign to the variable `comments`. We can now use that variable in our Jade file.

## Update *form.jade* to display comments

Let's add a loop to iterate through the comments and then display the `title` key from the collection.

```html
extends layout

block content
  //- passed into layout.jade when form.jade is rendered
  block content
    h1= title
    form(method="post" action="/create")
      label(for="comment") Got something to say:
      input(type="text", name="comment", value=comment)
      input(type="submit", value="Save")
    br
    - for comment in comments
      p= comment.title
```

> Do you remember where we set the `title` key? Check out the database schema in *database.js*.

Before this will actually work - e.g., display comments - we first need to add the logic to insert data into the Mongo collection.

## Handling form POST requests

Back in *form.js*, update the function handling POST requests:

```javascript
/* POST form. */
router.post('/', function(req, res) {
  new Comment({title : req.body.comment})
  .save(function(err, comment) {
    console.log(comment);
    res.redirect('form');
  });
});
```

The simply saves a new comment, which again is grabbed from the form via `req.body.comment`.

## Sanity Check

1. Refresh you app. Add some comments. If you've done everything correctly, the comments should be displayed beneath the form.

## Conclusion

Cheers!