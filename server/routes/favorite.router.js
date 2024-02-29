const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

// return all favorite images
router.get("/", (req, res) => {
  const sql = `
  SELECT favorites.id, favorites.name, favorites.url, categories.name as category_name FROM "favorites" 
  LEFT JOIN "categories" ON "favorites"."category" = "categories"."id" 
  ORDER BY "categories"."name" ASC;`;
  pool
    .query(sql)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

// add a new favorite
router.post("/", (req, res) => {
  let newFav = req.body;
  const sql = `
    INSERT INTO favorites ("name", "url", "category")
    VALUES ($1, $2, $3);
  `;
  pool
    .query(sql, [newFav.name, newFav.url, newFav.category])
    .then((_) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

// update a favorite's associated category
router.put("/:id", (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  const category = req.body.category;
  const id = req.params.id;
  const sql = `UPDATE favorites SET "category" = $1 WHERE id = $2;`;
  pool
    .query(sql, [category, id])
    .then((_) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

// delete a favorite
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM favorites WHERE id = $1`;
  pool
    .query(sql, [id])
    .then((_) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

module.exports = router;
