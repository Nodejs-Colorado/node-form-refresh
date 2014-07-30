exports.helloWorld = function(req, res){
  res.render('hello', { title: 'Hello, World!' }); // renders hello.jade, passes in the `title`
};