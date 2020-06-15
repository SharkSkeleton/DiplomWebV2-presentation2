const express = require("express");
const app = express();
const jsonParser = express.json();

const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');
const url = "mongodb://localhost:27017/";
const fs = require('fs'),
  glob = require("glob"),
  path = 'C:\\Users\\myagk\\Desktop\\DIPLOMA\\Prog\\Project\\',
  changesPath = 'C:\\Users\\myagk\\Desktop\\DIPLOMA\\Prog\\Diploma_Data\\Users\\';
const dirTree = require('directory-tree');
const { dir } = require('console');
// const server = require('http').Server(app);
// const io = require('socket.io')(server);

// server.listen(80);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  next();
});
// authentication
app.post("/entry-form/", jsonParser, function (request, response) {

  if(!request.body) return response.sendStatus(400);

  let login = request.body.login;
  let password = request.body.password;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");
    dbo.collection("Users").findOne({ login: login }, function(err, result) {
      if (err) throw err;
      if (result === null) {
        // console.log(result);
      }
      else {
        // console.log(result);
        if (login === result.login && password === result.password) {
          response.json({"role": result.role, "id": result._id});
          db.close();
        } else {
          response.json({"errMsg": "Wrong login or password!"});
          db.close();
        }
      }
    });
  });
});

// admin add user
app.post("/admin-panel/add-user/", jsonParser, function (request, response) {

  if(!request.body) return response.sendStatus(400);

  // request.body
  let user = {
    login: request.body.login,
    password: request.body.password,
    role: request.body.role,
    currentProject: '',
    name: '',
    surName: '',
    lastName: '',
    birthDate: '',
    city: '',
    about: '',
    picture: ''
  };

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");

    dbo.collection("Users").findOne({login: request.body.login}, function(err, result) {
      if (err) throw err;
      if (result !== null) {
        response.json({errMsg: 'Existing user'});
        db.close();
      } else {
        dbo.collection("Users").insertOne(user, function(err, result) {
          if (err) throw err;
          if (result !== null) {
            response.json({"login": result.login, "password": result.password, "role": result.role});
            db.close();
          }
        });
      }
    });
  });
});

// admin get user by login
app.post("/admin-panel/get-user/", jsonParser, function (request, response) {

  if(!request.body) return response.sendStatus(400);

  let findQuery = { login: request.body.login };
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");
    dbo.collection("Users").findOne(findQuery, function(err, result) {

      if (err) throw err;

      if (result !== null) {
        console.log(result);
        response.json(result);
        db.close();
      }
    });
  });
});

// admin get all users by login
app.post("/admin-panel/get-users/", jsonParser, function (request, response) {

  if(!request.body) return response.sendStatus(400);


  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");
    dbo.collection("Users").find({}, { projection: { _id: 0, login: 1} }).toArray(function(err, result) {

      if (err) throw err;

      if (result !== null) {
        console.log(result);
        response.json(result);
        db.close();
      }
    });
  });
});

// admin remove user //end-point
app.post("/admin-panel/delete-user/", jsonParser, function (request, response) {

  if(!request.body) return response.sendStatus(400);

  let deleteQuery = { login: request.body.login };
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");
    dbo.collection("Users").deleteOne(deleteQuery, function(err, result) {
      if (err) throw err;
      if (result !== null) {
        response.json({login: result.login});
        db.close();
      }
    });
  });
});

// admin update user
app.post("/admin-panel/update-user/", jsonParser, function (request, response) {

  if(!request.body) return response.sendStatus(400);

  let oldData = { login: request.body.currentUserLogin };
  let updateQuery = { $set: {login: request.body.login, password: request.body.password, role: request.body.role} };
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");
    dbo.collection("Users").updateOne(oldData, updateQuery, function(err, result) {
      if (err) throw err;
      if (result !== null) {
        response.json({login: result.login});
        db.close();
      }
    });
  });
});

// user get own data
app.post("/account/", jsonParser, function (request, response) {

  if(!request.body) return response.sendStatus(400);
  let o_id = new mongo.ObjectID(request.body.id);
  let findQuery = { '_id': o_id };
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");
    dbo.collection("Users").findOne(findQuery, function(err, result) {

      if (err) throw err;

      if (result !== null) {
        console.log(result);
        response.json(result);
        db.close();
      }
    });
  });
});

// user update info
app.post("/account/update/", jsonParser, function (request, response) {

  console.log(request.body);
  if(!request.body) return response.sendStatus(400);
  let o_id = new mongo.ObjectID(request.body.id);
  let oldData = { '_id': o_id };
  let updateQuery = { $set: {name: request.body.name, lastName: request.body.lastName, surName: request.body.surName, birthDate: request.body.birthDate, city: request.body.city, about: request.body.about} };
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");
    dbo.collection("Users").updateOne(oldData, updateQuery, function(err, result) {
      if (err) throw err;
      if (result !== null) {
        db.close();
      }
    });
  });
});

// user add task
app.post("/settings/add-task/", jsonParser, function (request, response) {

  if(!request.body) return response.sendStatus(400);

  // request.body
  let task = {
    title: request.body.userTask.title,
    description: request.body.userTask.description,
    status: request.body.userTask.status,
    author: request.body.userTask.author,
    authorRole: request.body.userTask.authorRole,
    executor: '',
    mark: ''
  };

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");
    dbo.collection("Tasks").insertOne(task, function(err, result) {

      if (err) throw err;

      if (result !== null) {
        db.close();
      }
    });
  });
});


function getTree(treePart) {
  let childrens = treePart['children'];
  var o={}
  var arr={}
  if(typeof childrens !== 'undefined' && childrens.length > 0) {
    childrens.forEach(function(item, i, childrens) {
      arr[item['name']]=getTree(item)
    });
  } else {
    if(treePart['type']!=='directory'){
      arr=null
    }
  }
  o[treePart['name']]=arr
  return arr;
}

function getTreeObj(response, pId) {

  // const MongoClient = require('mongodb').MongoClient;
  // const url = "mongodb://localhost:27017/";
  // const mongo = require('mongodb');
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("DiplomaDB");
    let dir;

    let o_id = new mongo.ObjectID(pId);
    let oldData = { '_id': o_id };

    dbo.collection("Projects").findOne(oldData, function(err, result) {
      if (err) throw err;
      dir = result.path;
      const tree = dirTree(dir);
      let my_directory_tree = {}
      my_directory_tree[tree['name']] = getTree(tree);

      // console.log(my_directory_tree);
      response.json(my_directory_tree);
      db.close();
    });
  });
}

// user get his current project
app.post("/work-space/", jsonParser, function (request, response) {

  console.log(request.body);
  if(!request.body) return response.sendStatus(400);
  let o_id = new mongo.ObjectID(request.body.id);
  let treeObj = {};

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");
    dbo.collection("Users").findOne({'_id': o_id}, function(err, result) {
      if (err) throw err;
      if (result !== null) {
        getTreeObj(response, result.currentProject);
      }
    });
  });
});

function getDataFromFile(response, pId, fName) {

	let o_id = new mongo.ObjectID(pId);
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  const dbo = db.db("DiplomaDB");
	  let oldData = { '_id': o_id };

	  dbo.collection("Projects").findOne(oldData, function(err, result) {
		if (err) throw err;
		// dir = result.path;
		let getDirectories = function (src, callback) {
			glob(src + '/**/*', callback);
		  };
		  getDirectories(result.path, function (err, res) {
			if (err) {
			  console.log('Error', err);
			} else {
			  console.log(res);
			//   res.forEach()console.log(res);
				for(let i = 0; i < res.length; i++) {
					if(res[i].includes(fName)) {
						// console.log(res[i])
						fs.readFile(res[i], 'utf8', function(err, contents) {
							console.log(contents);
							response.json(contents);
						});
					}
				}
			}
		  });
		// console.log(my_directory_tree);

		// db.close();
	  });
	});
}

// user get his current project
app.post("/work-space/data", jsonParser, function (request, response) {

  console.log(request.body);
  if(!request.body) return response.sendStatus(400);
  let o_id = new mongo.ObjectID(request.body.id);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");
    dbo.collection("Users").findOne({'_id': o_id}, function(err, result) {
      if (err) throw err;
      if (result !== null) {
        getDataFromFile(response, result.currentProject, request.body.fName);
      }
    });
  });
});

// user get his current project
app.post("/work-space/user-get", jsonParser, function (request, response) {

  console.log(request.body);
  if(!request.body) return response.sendStatus(400);
  let o_id = new mongo.ObjectID(request.body.id);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");
    dbo.collection("Users").findOne({'_id': o_id}, function(err, result) {
      if (err) throw err;
      if (result !== null) {
        response.json({id: result.currentProject, login: result.login});
      }
    });
  });
});

// user get Changes for OnChecking
let obj = {
  oldData: [],
  newData: [],
  files: []
};

function getOnlyFileNamesFromChanges(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes('[+ ') || arr[i].includes('[- ')) {
      mySubStr = arr[i].substr(3, arr[i].length-5);
      //(str.substr(0, str.length - 8)
      if(!obj.files.includes(mySubStr)) {
        obj.files.push(mySubStr);
      }
    }
  }
}

function getOnlyDataFromChanges(arr, marker) {
  let start;
  let end;
  if (marker === 'old') {
    start = '[- ';
    end = '[+ ';
  } else {
    start = '[+ ';
    end = '[- ';
  }
  let oldObj = {}
  let str = '';
  let subArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes(start)) {
      str = arr[i].substr(3, arr[i].length-5);
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j].includes(end) || j === arr.length - 1) {
          break;
        } else {
          subArr.push(arr[j].substr(0, arr[j].length-2));
        }
      }

    }
  }
  oldObj = {
    [str]: subArr.join('\n')
  }
  if (marker === 'old') {
    obj.oldData.push(oldObj);
  } else {
    obj.newData.push(oldObj);
  }

}

function filterContent(response, content) {

  let arr = [];
  arr = content.split('\n');
  getOnlyFileNamesFromChanges(arr);
  getOnlyDataFromChanges(arr, 'old');
  getOnlyDataFromChanges(arr, 'new');
  console.log('SSSSSSSS');
  console.log(obj);
  response.json(obj);
}

app.post("/on-checking/get", jsonParser, function (request, response) {

  obj = {
    oldData: [],
    newData: [],
    files: []
  }
  console.log(request.body);
  if(!request.body) return response.sendStatus(400);
  let o_id = new mongo.ObjectID(request.body.id);
  let myObjToSend = {
    oldData: [],
    newData: [],
    files: []
  }

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");
    dbo.collection("Projects").findOne({'_id': o_id}, function(err, result) {
      if (err) throw err;
      if (result !== null) {
        // response.json({id: result.currentProject, login: result.login});

        let getDirectories = function (src, callback) {
          glob(src + '/**/*', callback);
        };
        getDirectories(`${changesPath}${request.body.myTask.executor}\\`, function (err, res) {
          if (err) {
            console.log('Error', err);
          } else {
            //   res.forEach()console.log(res);
            for(let i = 0; i < res.length; i++) {
              if(res[i].includes('Changes.txt')) {
                // console.log(res[i])
                fs.readFile(res[i], 'utf8', function(err, contents) {
                  // console.log(contents);
                  // response.json(contents);
                  filterContent(response, contents);
                  db.close();
                });
              }
            }
          }
        });

      }
    });
  });
});

// user get his current project
app.post("/on-checking/set-mark", jsonParser, function (request, response) {

  console.log(request.body);
  if(!request.body) return response.sendStatus(400);
  let myTitle = request.body.myTask.title;
  console.log(myTitle);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");
    let userCount;
    let currentMark;
    dbo.collection("Users").find({}).toArray(function(err, result) {
      if (err) throw err;
      userCount = result.length;
      dbo.collection("Tasks").findOne({title: myTitle}, function(err, res) {
        if (err) throw err;
        if (res !== null) {
          if (res.mark !== '') {
            currentMark = parseInt(res.mark);
          } else {
            currentMark = 0;
          }
        }
        if(Math.round(currentMark / Math.round(userCount / 2)) >= Math.round(userCount / 2) * 10) {
          dbo.collection("Tasks").updateOne({title: myTitle}, {$set:{mark: currentMark + parseInt(request.body.myMark), status: 'Done'}}, function (e, r) {
            if(e) throw (e);
          })
        } else if (Math.round(currentMark + parseInt(request.body.myMark) / Math.round(userCount / 2)) >= Math.round(userCount / 2) * 10) {
          dbo.collection("Tasks").updateOne({title: myTitle}, {$set:{mark: currentMark + parseInt(request.body.myMark), status: 'Done'}}, function (e, r) {
            if(e) throw (e);
          })
        } else {
          dbo.collection("Tasks").updateOne({title: myTitle}, {$set:{mark: currentMark + parseInt(request.body.myMark)}}, function (e, r) {
            if(e) throw (e);
          })
        }

      });
    });
  });
});

// user get his current project
app.post("/settings/get-all-task-names", jsonParser, function (request, response) {

  console.log(request.body);
  if(!request.body) return response.sendStatus(400);
  let sendData = [];
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");
    dbo.collection("Tasks").find({}).toArray(function(err, result) {
      if (err) throw err;
      for (let i = 0; i < result.length; i++) {
        sendData.push(result[i].title);
      }
      response.json(sendData);
      db.close();
    });
  });
});

function WriteUserChangesFile(fileName, data) {
  var mkdirp = require('mkdirp');
  var getDirName = require('path').dirname;
  mkdirp(getDirName(fileName), function (err) {
    if (err) return err;
    fs.writeFile(fileName, data, function (err) {
      if (err) throw err;
    });
  });
}

// admin get all users by login
app.post("/work-space/changes", jsonParser, function (request, response) {

  if (!request.body) return response.sendStatus(400);
  let user_id = new mongo.ObjectID(request.body.userId);
  let findQuery = {'_id': user_id};
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");
    dbo.collection("Users").findOne(findQuery, function (err, user_result) {

      if (err) throw err;
      if (user_result !== null) {
        let project_id = new mongo.ObjectID(user_result.currentProject);
        dbo.collection("Projects").findOne({'_id': project_id}, function (err, project_result) {
          if (err) throw err
          if (project_result !== null) {
            console.log(project_result);
            WriteUserChangesFile(changesPath.concat("/").concat(user_result.login).concat("/").concat(project_result.name).concat("/Changes.txt"), request.body.content);
            response.json(project_result);
            db.close();
          }
        });
      }
    });
  });
});

// admin get all users by login
app.post("/work-space/console/get-project-name", jsonParser, function (request, response) {

  if (!request.body) return response.sendStatus(400);
  let project_id = new mongo.ObjectID(request.body.pId);
  let findQuery = {'_id': project_id};
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("DiplomaDB");
    dbo.collection("Projects").findOne(findQuery, function (err, result) {
      if (err) throw err;
      if (result !== null) {
        response.json(result.name);
      }
    });
  });
});
// app.post("/settings/", jsonParser, function (request, response) {
//
//   if(!request.body) return response.sendStatus(400);
//
//   let getDirectories = function (src, callback) {
//     glob(src + '/**/*', callback);
//   };
//   getDirectories(data.projectPath, function (err, res) {
//     if (err) {
//       console.log('Error', err);
//     } else {
//       let arr = [];
//       res.forEach(el => {
//         let str = el.replace(data.projectPath, '');
//         if (str.indexOf(".") !== -1) {
//           arr.push(str);
//         }
//       });
//       response.json(arr);
//     }
//   });
// });

// // user get all tasks
// app.post("/dashboard/todo/", jsonParser, function (request, response) {
//
//   if(!request.body) return response.sendStatus(400);
//
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     let dbo = db.db("DiplomaDB");
//     dbo.collection("Tasks").find({executor: ""}, { projection: { _id: 0, title: 1, description: 2, status: 3, author: 4, authorRole: 5} }).toArray(function(err, result) {
//
//       if (err) throw err;
//
//       if (result !== null) {
//         console.log(result);
//         response.json(result);
//         db.close();
//       }
//     });
//   });
// });
//
// // user get all tasks
// app.post("/dashboard/inProgress/", jsonParser, function (request, response) {
//
//   if(!request.body) return response.sendStatus(400);
//
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     let dbo = db.db("DiplomaDB");
//     dbo.collection("Tasks").find({executor: request.body.executor}, { projection: { _id: 0, title: 1, description: 2, status: 3, author: 4, authorRole: 5} }).toArray(function(err, result) {
//
//       if (err) throw err;
//
//       if (result !== null) {
//         console.log(result);
//         response.json(result);
//         db.close();
//       }
//     });
//   });
// });
//
// // user update task
// app.post("/dashboard/in-progress/", jsonParser, function (request, response) {
//
//   if(!request.body) return response.sendStatus(400);
//
//   let oldData = { title: request.body.userTask.title };
//   let updateQuery = { $set: { executor: request.body.userTask.executor, status: request.body.userTask.status } };
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     let dbo = db.db("DiplomaDB");
//     dbo.collection("Tasks").updateOne(oldData, updateQuery, function(err, result) {
//       if (err) throw err;
//       if (result !== null) {
//         db.close();
//       }
//     });
//   });
// });
// ;

// let dbo;
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   dbo = db.db("DiplomaDB");
//   console.log('DB connection successful');
// });
//
// io.on('connection', function (socket) {
//   console.log('Backend has successfully connected!');
//
//   socket.on('ready', function (data) {
//     console.log('in ready');
//     dbo.collection("Tasks").find({executor: ""}, { projection: { _id: 0, title: 1, description: 2, status: 3, author: 4, authorRole: 5} }).toArray(function(err, result) {
//       console.log('Inside collection find');
//
//       if (err) throw err;
//
//       if (result !== null) {
//         console.log('Collection find result is not null', result);
//         // response.json(result);
//         socket.emit('news', result);
//         socket.broadcast.emit('news', result);
//         db.close();
//       }
//     });
//   });
//
//   socket.on('news', function (data) {
//     // this.msg1 = Object.values(data)[0];
//     // console.log(this.msg);
//     // if (this.msg1 !== null && this.msg1 === 'as') {
//
//     console.log(data);
//
//     // socket.emit('news', { ku: 'pup' });
//     // socket.broadcast.emit('news', { ku: 'pup' });
//     // } else {
//     //   socket.emit('news', { hello: 'world' });
//       // socket.broadcast.emit('news', { hello: 'world' });
//     // }
//   });
// });

// app.post("/dashboard/todo/", jsonParser, function (request, response) {
//
//   if(!request.body) return response.sendStatus(400);
//
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     let dbo = db.db("DiplomaDB");
//     dbo.collection("Tasks").find({executor: ""}, { projection: { _id: 0, title: 1, description: 2, status: 3, author: 4, authorRole: 5} }).toArray(function(err, result) {
//
//       if (err) throw err;
//
//       if (result !== null) {
//         console.log(result);
//         response.json(result);
//         db.close();
//       }
//     });
//   });
// });

app.listen(3000);
