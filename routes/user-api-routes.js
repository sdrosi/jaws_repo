var db = require("../models");

module.exports = function (app) {
  // Find all Authors and return them to the user with res.json
  app.get("/", function (req, res) {
    db.User.findAll({}).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/", function (req, res) {
    // Find one Author with the id in req.params.id and return them to the user with res.json
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.post("/", function (req, res) {
    // Create an Author with the data available to us in req.body
    console.log(req.body);
    db.User.create(req.body).then(function (dbUser) {
      res.json(dbAuthor);
    });
  });

  app.delete("/", function (req, res) {
    // Delete the Author with the id available to us in req.params.id
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbAuthor) {
      res.json(dbAuthor);
    });
  });
};