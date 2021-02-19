const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = gql`
  scalar Date
  # Declare the types
 
  type User {
    id: Int!,
    username: String!,
    createdAt: Date,
  }

  type Comment{ 
    body: String, 
    user: User, 
    article:Article, 
    createdAt: Date 
  }


  type Article {
    id:Int!,
    title: String, 
    body: String, 
    articleComments: [Comment], 
    user: User, 
    createdAt: Date 
  }
  

  # Declare the mutations

  type Query {
    users: [User],
    user(id:Int!):User,
    articles: [Article],
    article(id:Int!):Article,
    comments: [Comment],
    commentsByID(id:Int!): [Comment],
  }
   

  # Declare the mutations

   # Declare the inputs
`;
const user1 = { id:1,
username: 'amine',
createdAt:Date.now()
};
const user2 = { id:2,
 username: 'Paul Auster',
createdAt:Date.now()
};

const comment1 = { 
  body:"cette article c'est de la grosse arnaque",
  user:user1,
  createdAt:Date.now(),
  article:article1
  }
  const comment2 = { 
    body:"je confirme cette article c'est de la grosse arnaque",
    user:user2,
    createdAt:Date.now(),
    article:article2
  }
  const comment3 = { 
    body:"cette article est super",
    user:user1,
    createdAt:Date.now(),
    article:article3
    } 
    const comment4 = { 
      body:"je confirme cette article est super",
      user:user2,
      createdAt:Date.now(),
      article:article4
    }

var article1 = { 
  id:1,
  title: "chargeur bad game", 
  body: "blablablablablablablbalbalbalbla", 
  articleComments: [comment1,comment2], 
  user: user1, 
  createdAt:Date.now()

};
var article2 = {
  id:2,
  title: "chargeur bad game", 
  body: "blablablablablablablbalbalbalbla", 
  articleComments: [comment1,comment2], 
  user: user2, 
  createdAt:Date.now()

};
var article3 = { 
  id:3,
  title: "chargeur haute game", 
  body: "blablablablablablablbalbalbalbla", 
  articleComments: [comment3,comment4], 
  user: user1, 
  createdAt:Date.now()

};
var article4 = {
  id:4,
  title: "chargeur haute game", 
  body: "blablablablablablablbalbalbalbla", 
  articleComments: [comment3,comment4], 
  user: user2, 
  createdAt:Date.now()

};


const users = [user1,user2];
const articles = [article1,article2,article3,article4];
const comments = [comment1,comment2,comment3,comment4];

// Resolvers define the technique for fetching the types defined in the
// schema.
var findUserById = function(id){
  return users.find(user=>{if(user.id===id){return user;}});
};
var findArticleById = function(id){
  return articles.find(article=>{if(article.id===id){return article;}});
};
var findAllCommentsByUserId = function(id){
  var coms= [];
   comments.forEach(comm=>{if(comm.user.id===id){coms.push(comm);}});
    return coms
};
const resolvers = {
  Query: {
    users: () => users,
    articles:()=>articles,
    comments:()=>comments,
    user:(_,{id})=> {var u =findUserById(id);if(u!=null){return u;}else{throw new Error("user not found with id :"+id);}},
    article:(_,{id})=> {var a =findArticleById(id);if(a!=null){return a;}else{throw new Error("user not found with id :"+id);}},
    commentsByID:(_,{id})=>{var a =findAllCommentsByUserId(id);if(a!=null){return a;}else{throw new Error("user not found with id :"+id);}},
  }
  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
