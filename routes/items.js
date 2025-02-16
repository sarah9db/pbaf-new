const express = require('express');
const { getItems, getRelatedArticles, postComments } = require('../db/db');
const { getArticles } = require('../db/db');
const User = require('../models/signup')
const Comment = require('../models/comments')
const bcrypt = require('bcrypt');
const {postForm}  = require('../db/db')
const {getEmail} = require('../db/db')
const {getLatestNews} = require('../db/db')
const jwt = require('jsonwebtoken');
const { getComments } = require('../db/db')

const router = express.Router();

router.get('/items', (req, res) => {
  getItems((err, docs) => {
    if (err) return res.status(500).send(err);
        const doc = docs.map(docItem => ({
            title: docItem.Latest_News,
            author: docItem.authors,
            link: docItem.link,
            date: docItem.date,
            id: docItem._id

        }))
            
               
      res.json(doc);
  });
});

router.get('/latest-news', (req, res) => {
    getLatestNews((err, news) => {
        if (err) return res.status(500).json(err);
        
        const newsArray = news.map(newsItem => ({
            latest_news: newsItem.Latest_News,
            authors: newsItem.authors,
            link: newsItem.link,
            date: newsItem.date,
            id: newsItem._id
        }));

        res.json(newsArray);
    });
});


router.get('/articles', async(req, res) => {
    
    getArticles((err, articles) => {
        if (err) {
            return res.status(500).send(err);
        }

        let articleArray = [];
        let articlesProcessed = 0;

        // Function to process an article and fetch its comments
        const processArticle = (article) => {
            Promise.all([
                getRelatedArticles(article.tags, article.Hyperlinks)
            ])
            .then(( relatedArticles) =>{
                
                
                const articleObj = {
                    _id: article._id,
                    title: article.Title,
                    content: article.Content,
                    image: article.Images,
                    hyperlink: article.Hyperlinks,
                    unique_id: article.unique_id,
                    comments: article.comments,
                    author: article.author,
                    relatedArticles: relatedArticles
            };
            articleArray.push(articleObj);
            articlesProcessed++;

            if (articlesProcessed === articles.length) {
                res.json(articleArray);
            }
            })
            .catch(err => {
                console.error("error fetching comments or related articles", err);
                res.status(500).send(err);
            });
        };
        articles.forEach(article => {
            processArticle(article);
        });
    });
});

                

router.post('/signup',  async (req, res) => {
  const { FirstName, LastName, ResearchAreas, Email, Password} = req.body;


  // Validate input fields
  if (!FirstName || !LastName || !ResearchAreas || !Email || !Password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await getEmail({Email})

    if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
    }
    else {
    // Hash the password
    const hashedPassword =await bcrypt.hash(Password, 10);

    // Create a new user
    const newUser = {
        FirstName: FirstName,
        LastName: LastName,
        ResearchAreas: ResearchAreas,
        Email: Email,
        Password: hashedPassword,
    };

    // Save the user to the database
    const result = await postForm(newUser);



    res.status(201).json(result);}
} catch (error) {
    res.status(500).json({ message: 'Server error' });
}

});


router.post('/comments', async (req, res) => {
    const { article_id, name, email, content} = req.body;
  
    if (!article_id ||!name || !email|| !content) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
        
        const comment = {
            name: name,
            email: email,
            content: content,
            timestamp: Date.now()
        }
        const result = await postComments(comment, article_id)
        res.status(201).json(result);
      } catch (err) {
        res.status(500).json({ message: 'Failed to post comment' });
      }
  });

module.exports = router;
