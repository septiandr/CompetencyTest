const http = require('http');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const session = require('express-session');


const app = express();

const dbConnection = require('./connection/db');
const uploadFile = require('./middlewares/uploadFile');
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

hbs.registerPartials(__dirname + '/views/partials');
var pathFile = 'http://localhost:3000/uploads/';
app.use(
    session({
        cookie: {
            maxAge: 1000 * 60 * 60 * 2,
        },
        store: new session.MemoryStore(),
        resave: false,
        saveUninitialized: true,
        secret: 'SangatRahasia',
    })
);


app.use(function(req, res, next) {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.get('/', function(request, response) {
    const title = 'Data Provinsi';

    const query = 'SELECT * FROM provinsi_tb ORDER BY id DESC';

    dbConnection.getConnection(function(err, conn) {
        if (err) throw err;
        conn.query(query, function(err, results) {
            if (err) throw err;

            let provinsi = [];

            for (var result of results) {
                provinsi.push({
                    id: result.id,
                    nama: result.nama,
                    diresmikan: result.diresmikan,
                    photo: pathFile + result.photo,
                    pulau: result.pulau,
                });


            }


            response.render('index', {
                title,
                provinsi,
            });
        });
    });
});
app.get('/prov', function(request, response) {
    const title = 'Tambah Provinsi';
    response.render('provinsi', {
        title,

    });

});
app.post('/provinsi', uploadFile('photo'), function(request, response) {
    var { namaProv, diresmikanProv, pulau } = request.body;
    var photo = '';

    if (request.file) {
        photo = request.file.filename;
    }

    const query = `INSERT INTO provinsi_tb(nama,diresmikan,photo,pulau) VALUES ("${namaProv}","${diresmikanProv}","${photo}","${pulau}");`;
    console.log(query);
    dbConnection.getConnection(function(err, conn) {

        if (err) throw err;
        conn.query(query, function(err, results) {
            if (err) throw err;
            request.session.message = {
                type: 'success',
                message: 'sukses menambahkan data provinsi',
            };
            response.redirect('/');
        });
    });
});
app.get('/view-prov/:id', function(request, response) {
    const title = 'Data dari Provinsi';
    const { id } = request.params;
    console.log(id)

    const query = `SELECT * FROM kabupaten_tb WHERE provinsi_id = ${id}`;

    dbConnection.getConnection(function(err, conn) {
        if (err) throw err;
        conn.query(query, function(err, results) {
            if (err) throw err;

            let kabupaten = []
            for (var result of results) {
                kabupaten.push({
                    id: result.id,
                    nama: result.nama,
                    diresmikan: result.diresmikan,
                    photo: pathFile + result.photo,

                });
            }
            console.log(kabupaten)
            response.render('view-prov', {
                title,
                kabupaten,
                id

            });
        });
    });
});
app.get('/edit-prov/:id', function(request, response) {
    const title = 'Edit Data Provinsi';
    const { id } = request.params;

    const query = `SELECT * FROM provinsi_tb WHERE id = ${id}`;

    dbConnection.getConnection(function(err, conn) {
        if (err) throw err;
        conn.query(query, function(err, results) {
            if (err) throw err;

            const provinsi = {
                ...results[0],
                photo: pathFile + results[0].photo,

            };
            console.log(provinsi);
            response.render('edit-prov', {
                title,
                provinsi,
            });
        });
    });
});
app.post('/edit-prov', uploadFile('photo'), function(request, response) {
    var { id, namaProv, diresmikanProv, photo, pulau, oldImage } = request.body;
    var photo = oldImage.replace(pathFile, '');

    if (request.file) {
        photo = request.file.filename;
    }

    const query = `UPDATE provinsi_tb SET photo = "${photo}", nama = "${namaProv}", diresmikan = "${diresmikanProv}", pulau = "${pulau}" WHERE id = ${id}`;

    dbConnection.getConnection(function(err, conn) {
        console.log(query);
        if (err) throw err;
        conn.query(query, function(err, results) {
            if (err) throw err;

            response.redirect(`/`);
        });
    });
});
app.get('/delete-prov/:id', function(request, response) {
    const { id } = request.params;
    const query = `DELETE FROM provinsi_tb WHERE id = ${id}`;

    dbConnection.getConnection(function(err, conn) {
        if (err) throw err;
        conn.query(query, function(err, results) {
            if (err) throw err;
            response.redirect('/');
        });
    });
});
app.get('/kab/:id', function(request, response) {
    const { id } = request.params;
    const title = 'Tambah Kabupaten';
    response.render('kabupaten', {
        title,
        id,
    });

});
app.post('/kabupaten', uploadFile('photo'), function(request, response) {
    var { id, nama, diresmikan } = request.body;
    var photo = '';

    if (request.file) {
        photo = request.file.filename;
    }

    const query = `INSERT INTO kabupaten_tb(nama,diresmikan,photo,provinsi_id) VALUES ("${nama}","${diresmikan}","${photo}","${id}");`;
    console.log(query);
    dbConnection.getConnection(function(err, conn) {

        if (err) throw err;
        conn.query(query, function(err, results) {
            if (err) throw err;
            request.session.message = {
                type: 'success',
                message: 'sukses menambahkan data provinsi',
            };
            response.redirect('/');
        });
    });
});
app.get('/view-prov/delete-kab/:id', function(request, response) {
    const { id } = request.params;
    const query = `DELETE FROM kabupaten_tb WHERE id = ${id}`;

    dbConnection.getConnection(function(err, conn) {
        if (err) throw err;
        conn.query(query, function(err, results) {
            if (err) throw err;
            response.redirect('/');
        });
    });
});
app.get('/view-prov/edit-kab/:id', function(request, response) {
    const title = 'Edit Data Kabupaten';
    const { id } = request.params;

    const query = `SELECT * FROM kabupaten_tb WHERE id = ${id}`;

    dbConnection.getConnection(function(err, conn) {
        if (err) throw err;
        conn.query(query, function(err, results) {
            if (err) throw err;

            const kabupaten = {
                ...results[0],
                photo: pathFile + results[0].photo,

            };

            response.render('edit-kab', {
                title,
                kabupaten,
            });
        });
    });
});
app.post('/edit-kab', uploadFile('photo'), function(request, response) {
    var { id, nama, diresmikan, photo, oldImage } = request.body;
    var photo = oldImage.replace(pathFile, '');
    console.log(id);
    if (request.file) {
        photo = request.file.filename;
    }

    const query = `UPDATE kabupaten_tb SET photo = "${photo}", nama = "${nama}", diresmikan = "${diresmikan}" WHERE id = ${id}`;

    dbConnection.getConnection(function(err, conn) {
        console.log(query);
        if (err) throw err;
        conn.query(query, function(err, results) {
            if (err) throw err;

            response.redirect(`/`);
        });
    });
});
const port = 3000;
const server = http.createServer(app);
server.listen(port);
console.debug(`Server listening on port ${port}`);