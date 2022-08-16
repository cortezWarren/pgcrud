const { Pool } = require("pg");
const pool = new Pool();

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
