const
  http = require("http"),
  express = require("express"),
  socketio = require("socket.io"),
  jsonParser = express.json(),
  MongoClient = require('mongodb').MongoClient,
  mongo = require('mongodb'),
  url = "mongodb://localhost:27017/",
  fs = require('fs'),
  glob = require("glob"),
  path = 'C:\\Users\\myagk\\Desktop\\DIPLOMA\\Prog\\Diploma_Data\\Project';

const SERVER_PORT = 3001;

let nextVisitorNumber = 1;
let onlineClients = new Set();

let dbo;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  dbo = db.db("DiplomaDB");
  console.log('DB connection successful');
});

function getAllTasks(socket, query, whereTo) {
  dbo.collection("Tasks").find(query, { projection: { _id: 0, title: 1, description: 2, status: 3, author: 4, authorRole: 5} }).toArray(function(err, result) {
    if (result !== null) {
      // console.log('Collection find result is not null', result);
      // response.json(result);
      socket.emit(whereTo, result);
      socket.broadcast.emit(whereTo, result);
      // db.close();
    }
  });
}

function createFolder(folderName) {
  if (!fs.existsSync(folderName)){
    fs.mkdirSync(folderName);
  }
}

function createFolders(folderNames) {
  for (let i = 0; i < folderNames.length; i++) {
    if (!fs.existsSync(folderNames[i])) {
      fs.mkdirSync(folderNames[i]);
    }
  }
}

function createEmptyFile(fileName) {
  fs.appendFile(fileName, '', function (err) {
    if (err) throw err;
  });
}

function createEmptyFiles(fileNames) {
  for (let i = 0; i < fileNames.length; i++) {
    fs.appendFile(fileNames[i], '', function (err) {
      if (err) throw err;
    });
  }
}

let getDirectories = function (src, callback) {
  glob(src + '/**/*', callback);
};

function onNewWebsocketConnection(socket) {
  console.info(`Socket ${socket.id} has connected.`);
  onlineClients.add(socket.id);

  let toDoQuery = {executor: ""};
  getAllTasks(socket, toDoQuery, 'news');

  socket.on("disconnect", () => {
    onlineClients.delete(socket.id);
    console.info(`Socket ${socket.id} has disconnected.`);
  });

  socket.on("news",  data => {
    if (data === 'TODO') {
      getAllTasks(socket, toDoQuery, 'news')
    }
  });

  socket.on("onGetClick",  data => {
    let o_id = new mongo.ObjectID(data.userId);
    dbo.collection("Users").find({'_id': o_id}, {projection: { _id: 0, login: 1}}).toArray(function (err, result) {
      if (result !== null) {
        executor = result[0].login;
        // console.log(result[0].login);
        dbo.collection("Tasks").updateOne({title: data.selectedTask.title}, { $set: {status: data.changedStatus, executor: result[0].login } }, function (err, res) {
          if (err) {
            throw err;
          } else {
            console.log('document updated!');
            getAllTasks(socket, toDoQuery, 'news');
          }
        } )
      }
    })
  });

  socket.on("InProgressPage", data => {
    let o_id = new mongo.ObjectID(data.userId);
    // let executorInProgress;
    dbo.collection("Users").find({'_id': o_id}, {projection: { _id: 0, login: 1}}).toArray(function (err, result) {
      if (result !== null) {
        console.log(result);
        // executorInProgress = result[0].login;
        let inProgressQuery = {executor: result[0].login, status: 'inProgress'};
        getAllTasks(socket, inProgressQuery, 'InProgressPage');
      }
    });
  });

  socket.on("OnCheckingPageBtn", data => {
    let o_id = new mongo.ObjectID(data.userId);
    // let executorInProgress;
    dbo.collection("Users").find({'_id': o_id}, {projection: { _id: 0, login: 1}}).toArray(function (err, result) {
      if (result !== null) {
        dbo.collection("Tasks").updateOne({title: data.uTask.title, description: data.uTask.description, executor: result[0].login}, {$set: {status: data.changedStatus}}, function (err, res) {
          if (err) {
            throw(err);
            // executorInProgress = result[0].login;
          } else {
            let onCheckingQuery = {executor: result[0].login, status: 'inProgress'};
            getAllTasks(socket, onCheckingQuery, 'OnCheckingPageBtn');
          }
        });
      }
    });
  });

  socket.on("OnCheckingPage", data => {
    let o_id = new mongo.ObjectID(data.userId);
    // let executorInProgress;
    dbo.collection("Users").find({'_id': o_id}, {projection: { _id: 0, login: 1}}).toArray(function (err, result) {
      if (result !== null) {
        let onCheckingQuery = {executor: result[0].login, status: data.changedStatus};
        getAllTasks(socket, onCheckingQuery, 'OnCheckingPage');
      }
    });
  });

  socket.on("DonePage", data => {
    let o_id = new mongo.ObjectID(data.userId);
    // let executorInProgress;
    dbo.collection("Users").find({'_id': o_id}, {projection: { _id: 0, login: 1}}).toArray(function (err, result) {
      if (result !== null) {
        dbo.collection("Tasks").find({executor: result[0].login, mark: '100'}).toArray(function (err, res) {
          if (res !== null) {
            dbo.collection("Tasks").updateOne({executor: result[0].login, mark: '100'}, {$set: {status: 'done'}}, function (e, r) {
              if (e) {
                throw(e);
              } else {
                let onDoneQuery = {executor: result[0].login, mark: data.userMark, status: 'done'};
                getAllTasks(socket, onDoneQuery, 'DonePage');
              }
            })
          }
        });
      }
    });
  });

  socket.on("ProjectCreation",  data => {
    // Project Folder Creation
    let dir = path + data.name + '/';
    let src = dir + 'src/';
    let target = dir + 'target/';
    let launchFileP = '';
    let p = {
      firstLevel: [dir + 'src/', dir + 'target/'],
      secondLevel: [dir + 'src/main/', dir + 'src/test/', dir + 'target/classes/', dir + 'target/generated-sources/'],
      thirdLevel: [dir + 'src/main/java/', dir + 'src/main/java/org/', dir + 'src/main/java/org/' + data.name.toLowerCase() + '/', dir + 'src/main/resources/', dir + 'src/test/java/',
        dir + 'target/classes/', dir + 'target/classes/META-INF/', dir + 'target/classes/org/', dir + 'target/classes/org/' + data.name.toLowerCase() + '/',
        dir + 'target/generated-sources/', dir + 'target/generated-sources/annotations/'],
      files: [dir + 'pom.xml', dir + 'test.iml', dir + 'src/main/java/org/' + data.name.toLowerCase() + '/' + data.launchFile, dir + 'src/main/java/org/' + data.name.toLowerCase() + '/MainController.java',
        dir + 'target/classes/META-INF/' + data.name.toLowerCase() + '.kotlin_module']
    };
    let cppP = {
      folders: [dir + 'apps/', dir + 'include/', dir + 'include/libname', dir + 'src/', dir + 'tests/'],
      files: [dir + 'CMakeLists.txt',
        dir + 'apps/CMakeLists.txt', dir + 'apps/' + data.launchFile,
        dir + 'include/libname/myFile.h',
        dir + 'src/CMakeLists.txt', dir + 'src/myFile.cpp',
        dir + 'tests/CMakeLists.txt', dir + 'tests/example_test.cpp', dir + 'tests/' + data.launchFile,]
    };

    createFolder(dir);

    switch (data.template) {
      case 'JavaApplication': {
        createEmptyFile(dir + data.launchFile);
        launchFileP = data.launchFile;
        break;
      }
      case 'PythonApplication': {
        createEmptyFile(dir + data.launchFile);
        launchFileP = data.launchFile;
        break;
      }
      case 'mavenApplication': {
        createFolders(p.firstLevel);
        createFolders(p.secondLevel);
        createFolders(p.thirdLevel);
        createEmptyFiles(p.files);
        launchFileP = 'src/main/java/org/' + data.name.toLowerCase() + '/' + data.launchFile;
        break;
      }
      case 'CppApplication': {
        createFolders(cppP.folders);
        createEmptyFiles(cppP.files);
        launchFileP = 'apps/' + data.launchFile;
        break;
      }
    }

    dbo.collection("buildTemplate").findOne({templateName: data.template}, function(err, result) {
      if (err) throw err;
      let myObj = {name: data.name, language: data.language, template: data.template, launchFile: data.launchFile, path: dir, launchFilePath: launchFileP,
        ports: data.ports, stages: result.stages, _class: 'org.diplom.diplom_backend.entity.Project'};
      dbo.collection("Projects").insertOne(myObj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
      });
    });

  });

  socket.on("GetAllProjects", data => {
    dbo.collection("Projects").find({}).toArray(function(err, result) {
      if (err) throw err;
      socket.emit("GetAllProjects", result);
      socket.broadcast.emit("GetAllProjects", result);
    });
  });

  socket.on("GetAllProjectsFiles", data => {

    getDirectories(data.projectPath, function (err, res) {
      if (err) {
        console.log('Error', err);
      } else {
        let arr = [];
        res.forEach(el => {
          let str = el.replace(data.projectPath, '');
          if (str.indexOf(".") !== -1) {
            arr.push(str);
          }
        });
        // console.log(arr);
        socket.emit("GetAllProjectsFiles", arr);
      }
    });
  });

  socket.on("onDeleteTaskClick", data => {
    dbo.collection("Tasks").deleteOne(data.selectedTask.task, function (err, obj) {
      if (err) throw err;
      getAllTasks(socket, {status: 'TODO'}, 'news')
      window
    })
  })

  socket.on("GetAllChats", data => {
    obj = []
    dbo.collection("Messages").find({author: '', text:''}).toArray(function(err, result) {
      if (err) throw err;
      result.forEach(e => {obj.push({groupName: e.groupName, date: e.data});})
      socket.emit("GetAllChats", obj);
      socket.broadcast.emit("GetAllChats", obj);
      console.log(obj);
      // console.log(obj.dates);
    });
  })

  socket.on("GetAllMessages", data => {
    obj = []
    dbo.collection("Messages").find({groupName: data.chat + 'M'}).toArray(function(err, result) {
      if (err) throw err;
      result.forEach(e => {obj.push({author: e.author, msg: e.text});})
      socket.emit("GetAllMessages", obj);
      socket.broadcast.emit("GetAllMessages", obj);
      console.log(obj);
      // console.log(obj.dates);
    });
  })

  socket.on("userSendMessage", data => {
    obj = []
    let o_id = new mongo.ObjectID(data.userId);
    dbo.collection("Users").findOne({'_id': o_id}, function(err, result) {
      if (err) throw err;
      dbo.collection("Messages").insertOne({groupName: data.chat + 'M', author: result.login, text: data.message, 'data': Date.now()}, function (e, r) {
        if(e) throw e;
        dbo.collection("Messages").find({groupName: data.chat + 'M'}).toArray(function(er, result2) {
          if (er) throw er;
          result2.forEach(e => {obj.push({author: e.author, msg: e.text});})
          socket.emit("userSendMessage", obj);
          socket.broadcast.emit("userSendMessage", obj);
          console.log(obj);
          // console.log(obj.dates);
        });
      })
    });
  })

  socket.on("userSetCurrentProject", data => {
    let o_id = new mongo.ObjectID(data.userId);
    dbo.collection("Users").findOne({'_id': o_id}, function(err, result) {
      if (err) throw err;
      let myquery = { '_id': o_id };
      let newvalues = { $set: {currentProject: data.projectId } };
      dbo.collection("Users").updateOne(myquery, newvalues, function (e, r) {
        if (e) throw(e);
        console.log("1 doc inserted!");
      })
    });
  })
}

function startServer() {
  // create a new express app
  const app = express();
  // create http server and wrap the express app
  const server = http.createServer(app);
  // bind socket.io to that server
  const io = socketio(server);

  // will fire for every new websocket connection
  io.on("connection", onNewWebsocketConnection);

  // important! must listen from `server`, not `app`, otherwise socket.io won't function correctly
  server.listen(SERVER_PORT, () => console.info(`Listening on port ${SERVER_PORT}.`));

  // will send one message per second to all its clients
  let secondsSinceServerStarted = 0;
  setInterval(() => {
    secondsSinceServerStarted++;
    io.emit("seconds", secondsSinceServerStarted);
    io.emit("online", onlineClients.size);
  }, 1000);
}

startServer();
