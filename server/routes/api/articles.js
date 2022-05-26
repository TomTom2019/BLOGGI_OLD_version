const { sortArgsHelper } = require("../../config/helpers");
const { checkLoggedIn } = require("../../middleware/auth");
const { grantAcces } = require("../../middleware/roles");

// MODEL
const { Article } = require("../../models/article_model");
const { Category } = require("../../models/category_model");
const express = require("express");

let router = express.Router();

// UPLOADING IMAGES

// ADD SINGLE ARTICLE
router
  .route("/admin/add_articles")
  .post(checkLoggedIn, grantAcces("createAny", "article"), async (req, res) => {
    try {
      const article = new Article({
        ...req.body,
      });
      const result = await article.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        message: "Error adding article",
        error: error,
      });
    }
  });

// ADMIN GET PATCH DELETE SINGLE ARTICLE (DRAFT OR PUBLIC)
router
  .route("/admin/:id")
  .get(checkLoggedIn, grantAcces("readAny", "article"), async (req, res) => {
    try {
      const _id = req.params.id;
      const article = await Article.findById(_id);
      if (!article || article.length === 0) {
        return res.status(400).json({
          message: "Article not found",
        });
      }
      res.status(200).json(article);
    } catch (error) {
      res.status(400).json({
        message: "Cant find article",
        error,
      });
    }
  })

  .patch(
    checkLoggedIn,
    grantAcces("updateAny", "article"),
    async (req, res) => {
      try {
        const _id = req.params.id;
        const article = await Article.findOneAndUpdate(
          {
            _id,
          },
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        if (!article) {
          return res.status(400).json({
            message: "Cant find article",
          });
        }
        res.status(200).json(article);
      } catch (error) {
        res.status(400).json({
          message: "Error updating article",
          error,
        });
      }
    }
  )

  // ASYNC =>  AWAIT
  .delete(
    checkLoggedIn,
    grantAcces("deleteAny", "article"),
    async (req, res) => {
      try {
        const _id = req.params.id;
        const article = await Article.findByIdAndRemove(_id);
        if (!article) {
          return res.status(400).json({
            message: "Article not found",
          });
        }
        res.status(200).json({
          _id: article._id,
        });
      } catch (error) {
        res.status(400).json({
          message: "Error deleting",
          error,
        });
      }
    }
  );

// GET ARTICLE NO AUTH
router.route("/get_byid/:id").get(async (req, res) => {
  try {
    const _id = req.params.id;
    const article = await Article.find({
      _id: _id,
      status: "public",
    }).populate("category");
    if (!article || article.length === 0) {
      return res.status(400).json({
        message: "Article not found",
      });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching article",
      error,
    });
  }
});

//
router.route("/loadmore").post(async (req, res) => {
  try {
    let sortArgs = sortArgsHelper(req.body);

    const articles = await Article.find({
      status: "public",
    })
      .populate("category")
      .sort([[sortArgs.sortBy, sortArgs.order]])
      .skip(sortArgs.skip)
      .limit(sortArgs.limit);

    res.status(200).json(articles);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error fetching articles",
      error,
    });
  }
});

// FETCH ARTICLES WITH PAGINATION
router
  .route("/admin/paginate")
  .post(checkLoggedIn, grantAcces("readAny", "articles"), async (req, res) => {
    try {
      // let aggQuery = Article.aggregate([
      //     { $match: { status:"public" }},
      //     { $match: { title:{ $regex:/Lorem/ }}}
      // ])

      const limit = req.body.limit ? req.body.limit : 5;
      const aggQuery = Article.aggregate();
      const options = {
        page: req.body.page,
        limit,
        sort: {
          _id: "asc",
        },
      };

      const articles = await Article.aggregatePaginate(aggQuery, options);
      res.status(200).json(articles);
    } catch (error) {
      res.status(400).json({
        message: "Error",
        error,
      });
    }
  });

// // SEARCH
router.route("/user/search").post(async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error,
    });
  }
});

// / CATEGORY
router
  .route("/categories")
  .get(async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({
        message: "Error gettting categories",
        error,
      });
    }
  })
  .post(
    checkLoggedIn,
    grantAcces("createAny", "categories"),
    async (req, res) => {
      try {
        const category = new Category(req.body);
        await category.save();

        res.status(200).json(categories);
      } catch (error) {
        res.status(400).json({
          message: "Error adding categories",
          error,
        });
      }
    }
  );

module.exports = router;
