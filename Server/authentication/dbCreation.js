const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

function createCollection(dbo, db, collectionName) {
  dbo.createCollection(collectionName, function(err, res) {
    if (err) throw err;
    console.log(`${collectionName} collection created!`);
    db.close();
  });
}

function insertDocInToCollection(dbo, db, collectionName, objToInsert) {
  dbo.collection(collectionName).insertOne(objToInsert, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
}

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  const dbo = db.db("DiplomaDB");
  const myobj = {
    login: 'admin',
    password: 'admin',
    role: 'admin',
    currentProject: '',
    name: '',
    surName: '',
    lastName: '',
    birthDate: '',
    city: '',
    about: '',
    picture: ''
  };

  createCollection(dbo, db, 'Changes');
  createCollection(dbo, db, 'Messages');
  createCollection(dbo, db, 'Projects');
  createCollection(dbo, db, 'Tasks');
  insertDocInToCollection(dbo, db, 'Users', myobj);

});
