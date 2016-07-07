var fs = require("fs");
var qs = require("querystring");
var url = require("url");

exports.get = function(req, res) {

    var fdata, getMPath;
    var url_parts = url.parse(req.url, true);
    getMPath = url_parts.pathname;
    // console.log(url_parts.pathname);
    fdata = url_parts.query;
    console.log('fdata');
    console.log(getMPath);

    if (req.url === "/") {
        res.writeHead(200, {
            "content-type": "text/html"
        });

        var html1 = fs.readFileSync(__dirname + '/../views/index.html', 'utf8');

        res.end(html1);
        // httpMsgs.showHome(req, resp);
    } else if (req.url == '/assets/js/script.js') {
        res.writeHead(200, {
            "content-type": "text/javascript"
        });
        var js1 = fs.readFileSync(__dirname + '/../assets/js/script.js', 'utf8');

        res.end(js1);

    } else if (getMPath == '/crud-operation/') {
        // res.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin":"*"});
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        // var fdata = url_parts.query;
        console.log("Hello");
        console.log(Object.keys(fdata).length);

        if (Object.keys(fdata).length != 0) { //Check the fdata object is empty or not
            console.log("Hello");
            console.log(fdata);
            mongo.connect('mongodb://localhost/', function(err, db) {
                if (err) {
                    return console.dir(err);
                }

                var mydb = db.db('studentDetail');
                mydb.collection("userDetail", function(err, collection) {
                    var cursor = collection.find({
                        sname: fdata['sname']
                    });

                    cursor.toArray(function(err, rows) {
                        console.log(rows);
                        obj = {
                            "results": rows,
                        }
                        console.log(JSON.stringify(obj));
                        res.end(JSON.stringify(obj, null, 3));
                    });

                });
                setTimeout(function() {
                    mydb.close();
                }, 3000);
            });
        } else {
            mongo.connect('mongodb://localhost/', function(err, db) {
                if (err) {
                    return console.dir(err);
                }

                var mydb = db.db('studentDetail');
                mydb.collection("userDetail", function(err, collection) {
                    var cursor = collection.find();

                    cursor.toArray(function(err, rows) {
                        obj = {
                            "results": rows,
                        }
                        console.log(JSON.stringify(obj));
                        res.end(JSON.stringify(obj, null, 3));
                    });

                });
                setTimeout(function() {
                    mydb.close();
                }, 3000);
            });
        }
    } else {
        var empnoPatt = "[0-9]+";
        var patt = new RegExp("/employees/" + empnoPatt);
        if (patt.test(req.url)) {
            patt = new RegExp(empnoPatt);
            var empno = patt.exec(req.url);
            emp.get(req, resp, empno);
        } else {
            // httpMsgs.show404(req, resp);
        }
    }
}

exports.post = function(req, res) {
    if (req.url == '/crud-operation/') {
        var qsvalues = '';
        fdata = '';
        req.on('data', function(data) {
            qsvalues += data;
        });
        req.on('end', function() {
            fdata = qs.parse(qsvalues);
            console.log(fdata);
            mongo.connect('mongodb://localhost/', function(err, db) {
                if (err) {
                    return console.dir(err);
                }

                var mydb = db.db('studentDetail');
                mydb.collection("userDetail", function(err, collection) {
                    collection.insert({
                        sname: fdata['sname'],
                        sage: fdata['sage'],
                        mark1: fdata['samrk1'],
                        mark2: fdata['samrk2'],
                        mark3: fdata['samrk3']
                    });
                    res.end('<h1>Submitted</h1>');
                    setTimeout(function() {
                        mydb.close();
                    }, 3000);
                });

            });

        });
    } else {
        httpMsgs.show404(req, resp);
    }
}

exports.put = function(req, res) {
    if (req.url === '/crud-operation/') {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        mongo.connect('mongodb://localhost/', function(err, db) {
            if (err) {
                return console.dir(err);
            }

            var mydb = db.db('studentDetail');
            mydb.collection("userDetail", function(err, collection) {
                var cursor = collection.update({
                    sname: fdata['sname']
                }, {
                    $set: {
                        sage: fdata['sage']
                    }
                });

                cursor.toArray(function(err, rows) {
                    obj = {
                            "results": 'result updated',
                        }
                        // console.log(JSON.stringify( obj));
                    res.end(JSON.stringify(obj, null, 3));
                });

            });
            setTimeout(function() {
                mydb.close();
            }, 3000);
        });
    } else {
        httpMsgs.show404(req, resp);
    }
}

exports.del = function(req, res) {
    if (req.url === '/crud-operation/') {
        var reqBody = '';
        req.on('data', function(data) {
            reqBody += data;
            if (reqBody.length > 1e7) { //10MB
                httpMsgs.show413(req, resp);
            }
        });
        req.on('end', function() {
            emp.delete(req, resp, reqBody);
        });
    } else {
        httpMsgs.show404(req, resp);
    }
}
