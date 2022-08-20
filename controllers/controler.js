const { Pool } = require("pg");
const pool = new Pool();
const Joi = require('joi');

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.redirect("/home");
  });

  app.get("/home", (req, res) => {
    res.render("home");
  });

  app.get("/all", (req, res) => {
    try {
      pool.connect(async (error, client, release) => {
        let resp = await client.query(`SELECT * FROM test`);
        res.send(resp.rows);
      });
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/add", (req, res) => {

    const {error} = validateName(req.body);

    if (error) {
      res.status(404).send(error.details[0].message);
      return;
    }

     try {
        pool.connect(async (error, client, release) => {
          let resp = await client.query(
            `INSERT INTO test (firstname,lastname) VALUES ('${req.body.fname}','${req.body.lname}') `
          );
          res.redirect("/all");
        });
      } catch (error) {
        console.log(error);
      }
  });

  const validateName = (name) => {
    const schema = Joi.object({
      fname: Joi.string().min(1).required(),
      lname: Joi.string().min(1).required()
    });

   return schema.validate(name);
  }

  app.post("/delete", (req, res) => {
    try {
      pool.connect(async (error, client, release) => {
        let resp = await client.query(
          `DELETE FROM test WHERE firstname = '${req.body.delfname}' AND lastname = '${req.body.dellname}' `
        );
        res.redirect("/all");
      });
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/update", (req, res) => {
    try {
      pool.connect(async (error, client, release) => {
        let resp = await client.query(
          `UPDATE test SET firstname = '${req.body.newVal}', lastname = '${req.body.newVal2}' WHERE firstname = '${req.body.oldVal}' AND lastname = '${req.body.oldVal2}' `
        );
        res.redirect("/all");
      });
    } catch (error) {
      console.log(error);
    }
  });
};
