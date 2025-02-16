const mongojs = require('mongojs');

const db = mongojs('mongodb+srv://root:1234@pbaf.stbppoo.mongodb.net/website');
// const getDB = () =>{
//   return db;
//}
db.on('error', (error) => {
  console.error('Database connection error:', error);
});

db.on('connect', () => {
  console.log('Connected to MongoDB');
});

const getItems = (callback) => {
  db.latestNews.find().sort({ date: -1 }).limit(4).toArray(callback);
};

const getArticles = (callback) => {
    db.journalistic_articles.find(callback)
};

const getComments = (article_id) => {
  return new Promise((resolve, reject) =>{
    db.journalistic_articles.find({
      _id: mongojs.ObjectId(article_id)
    }).toArray((err, comm)=> {
      if (err) return reject(err);
      resolve(comm);
    })
  })
  // db.comments.find({ article_id: mongojs.ObjectId(article_id) },callback);
}
const getLatestNews = (callback) => {
  db.early_view.find().sort({ date: -1 }).limit(6).toArray(callback);
};

const getRelatedArticles = (tags, excludeHyperlink) => {
  return new Promise((resolve, reject) =>{
    db.research_articles.find({
      link: {$ne: excludeHyperlink},
      $or: [
        {abstract: {regex: tags.join('|'), $options: 'i'}},
        {a_title: {$regex: tags.join('|'), $options: 'i'}}
      ]
    }, {
      a_title: 1,
      link: 1,
      abstract: 1
    }).limit(5).toArray((err, relatedArticles)=> {
      if (err) return reject(err);
      resolve(relatedArticles);
    })
  })
  // Limiting the number of related articles to 5
};

const getEmail = async ({ Email }) => {
  return new Promise((resolve, reject) => {
    db.signup.findOne({ Email }, (err, user) => {
      if (err) return reject(err);
      resolve(user);
    });
  });
};

const postForm = async (newUser) => {
  return new Promise((resolve, reject) => {
    db.signup.insertOne(newUser, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const postComments = async (comment, article_id) => {
  return new Promise((resolve, reject) => {
    db.journalistic_articles.findAndModify({
      query: { _id: mongojs.ObjectId(article_id) },
      update: { $push: { comments: comment } }, 
      new: true 
    }, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}


module.exports = { getItems, getArticles, getEmail, postForm, getLatestNews, getComments, getRelatedArticles, postComments};
