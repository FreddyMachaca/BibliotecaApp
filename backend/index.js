const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.use('/static', express.static(__dirname+'/public'))

app.use(bodyParser.json())

const PUERTO = 3000
let query = ""
const obj = {}

const conexion = mysql.createConnection(
    {
        host:'localhost',
        database:'biblioteca_app',
        user:'root',
        password:''
    }
)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`)
})

conexion.connect(error => {
    if(error) throw error
    console.log(`Conexión exitosa a la base de datos`);
})

app.get('/', (req, res) => {
    res.send(`BIBLIOTECA APP API`)
})

// LOGIN ADMIN
app.post('/adminlogin', (req, res) => {
    const admin = {
        idUsuario: req.body.id_usuario,
        contrasena: req.body.contrasena
    }

    query = `SELECT * FROM adminusuarios WHERE id_usuario='${admin.idUsuario}' AND contrasena='${admin.contrasena}'`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message);
        
        if(resultado.length == 1) {
            obj.code = "200"
            obj.mensaje = "Login exitoso admin"
            obj.data = resultado
        } else {
            obj.code = "400"
            obj.mensaje = "Error en login admin"
            obj.data = []
        }

        res.json(obj)
    })
})
// END LOGIN ADMIN


// USUARIOS
// LOGIN USUARIO
app.post('/login', (req, res) => {
    const usuario = {
        idUsuario: req.body.idUsuario,
        contrasena: req.body.contrasena
    }

    query = `SELECT * FROM usuarios WHERE id_usuario='${usuario.idUsuario}' AND contrasena='${usuario.contrasena}'`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message);
        
        if(resultado.length == 1) {
            obj.code = "200"
            obj.mensaje = "Login exitoso usuario"
            obj.data = resultado
        } else {
            obj.code = "400"
            obj.mensaje = "Error en login usuario"
            obj.data = []
        }

        res.json(obj)
    })
})

// OBTENER USUARIOS
app.get('/usuarios', (req, res) => {
    query = `SELECT * FROM usuarios`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        if(resultado.length > 0) {
            obj.code = "200"
            obj.mensaje = "Lista de usuarios"
            obj.data = resultado
        } else {
            obj.code = "400"
            obj.mensaje = "No hay usuarios registrados"
            obj.data = []
        }
        res.json(obj)
    })
})

// BUSCAR USUARIO POR NOMBRE O ID
app.post('/usuarios/find', (req, res) => {
    const usuario = {
        idUsuario: req.body.idUsuario,
        nomUsuario: req.body.nomUsuario
    }
    
    if(usuario.idUsuario == "" && usuario.nomUsuario == "") {
        obj.code = "400"
        obj.mensaje = "No hay informacion del usuario a buscar"
        obj.data = []
        res.json(obj)
        return
    }

    if(usuario.idUsuario == "") {
        query = `SELECT * FROM usuarios WHERE nom_usuario LIKE '%${usuario.nomUsuario}%'`
    }

    if(usuario.nomUsuario == "") {
        query = `SELECT * FROM usuarios WHERE id_usuario LIKE '%${usuario.idUsuario}%'`
    }

    conexion.query(query, (error, resultado) => {
        if(error) console.log(error.message);

        if(resultado.length > 0) {
            obj.code = "200"
            obj.mensaje = "Lista de coincidencia de usuario"
            obj.data = resultado
        } else {
            obj.code = "400"
            obj.mensaje = "No existe coincidencia con algun registro"
            obj.data = []
        }
        res.json(obj)
    })
})

// AGREGAR USUARIO
app.post('/usuarios/add', (req, res) => {
    const usuario = {
        idUsuario: req.body.id_usuario,
        nomUsuario: req.body.nom_usuario,
        estadoUsuario: req.body.estado_usuario,
        contrasena: req.body.contrasena
    }

    query = `INSERT INTO usuarios(id_usuario, nom_usuario, contrasena) VALUES('${usuario.idUsuario}', '${usuario.nomUsuario}', '${usuario.contrasena}')`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se inserto correctamente el usuario"
        obj.data = []
        res.json(obj)
    })
})

// ACTUALIZAR USUARIO
app.post('/usuarios/update', (req, res) => {
    const usuario = {
        idUsuario: req.body.id_usuario,
        nomUsuario: req.body.nom_usuario,
        estadoUsuario: req.body.estado_usuario,
        contrasena: req.body.contrasena
    }

    query = `UPDATE usuarios SET nom_usuario='${usuario.nomUsuario}', contrasena='${usuario.contrasena}' WHERE id_usuario='${usuario.idUsuario}'`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se actualizo correctamente el usuario"
        obj.data = []
        res.json(obj)
    })
})

// BORRAR USUARIO
app.post('/usuarios/delete', (req, res) => {
    const usuario = {
        idUsuario: req.body.id_usuario
    }

    query = `DELETE FROM usuarios WHERE id_usuario='${usuario.idUsuario}'`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se elimino correctamente el usuario"
        obj.data = []
        res.json(obj)
    })
})

// OBTENER USUARIO CON ADEUDOS
app.get('/usuarios/adeudos', (req, res) => {
    query = `SELECT * FROM usuarios WHERE estado_usuario='Deudor'`
    
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Usuarios con adeudos"
        obj.data = resultado
    })

    res.json(obj)

})
// END USUARIOS





// AUTORES
// OBTENER AUTORES
app.get('/autores', (req, res) => {
    query = `SELECT * FROM autores`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        if(resultado.length > 0) {
            obj.code = "200"
            obj.mensaje = "Lista de autores"
            obj.data = resultado
            res.json(obj)
        } else {
            obj.code = "400"
            obj.mensaje = "No hay autores registrados"
            obj.data = []
            res.json(obj)
        }
    })
})

// OBTENER AUTOR POR NOMBRE
app.post('/autores/find', (req, res) => {
    const { nomAutor } = req.body
    
    if(nomAutor == "") {
        obj.code = "400"
        obj.mensaje = "No hay informacion del autor a buscar"
        obj.data = []
        res.json(obj)
        return
    }

    query = `SELECT * FROM autores WHERE nom_autor LIKE '%${nomAutor}%'`

    conexion.query(query, (error, resultado) => {
        if(error) console.log(error.message);

        if(resultado.length > 0) {
            obj.code = "200"
            obj.mensaje = "Lista de coincidencia de autor"
            obj.data = resultado
        } else {
            obj.code = "400"
            obj.mensaje = "No existe coincidencia con algun registro de autor"
            obj.data = []
        }
        res.json(obj)
    })
})

// AGREGAR AUTOR
app.post('/autores/add', (req, res) => {
    const autor = {
        idAutor: req.body.id_autor,
        nomAutor: req.body.nom_autor
    }

    query = `INSERT INTO autores VALUES('${autor.idAutor}', '${autor.nomAutor}')`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se inserto correctamente el autor"
        obj.data = []
        res.json(obj)
    })
})

// ACTUALIZAR AUTOR
app.post('/autores/update', (req, res) => {
    const autor = {
        idAutor: req.body.id_autor,
        nomAutor: req.body.nom_autor
    }

    query = `UPDATE autores SET nom_autor='${autor.nomAutor}' WHERE id_autor='${autor.idAutor}'`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se actualizo correctamente el autor"
        obj.data = []
        res.json(obj)
    })
})

// BORRAR AUTOR
app.post('/autores/delete', (req, res) => {
    const autor = {
        idAutor: req.body.id_autor
    }

    query = `DELETE FROM autores WHERE id_autor='${autor.idAutor}'`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se elimino correctamente el autor"
        obj.data = []
        res.json(obj)
    })
})
// END AUTORES





// EDITORIALES
// OBTENER EDITORIALES
app.get('/editoriales', (req, res) => {
    query = `SELECT * FROM editoriales`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        if(resultado.length > 0) {
            obj.code = "200"
            obj.mensaje = "Lista de editoriales"
            obj.data = resultado
        } else {
            obj.code = "400"
            obj.mensaje = "No hay editoriales registradas"
            obj.data = []
        }
        res.json(obj)
    })
})

// BUSCAR EDITORIAL POR NOMBRE
app.post('/editoriales/find', (req, res) => {
    const { nomEditorial } = req.body
    
    if(nomAutor == "") {
        obj.code = "400"
        obj.mensaje = "No hay informacion de la editorial a buscar"
        obj.data = []
        res.json(obj)
        return
    }

    query = `SELECT * FROM editoriales WHERE nom_editorial LIKE '%${nomEditorial}%'`

    conexion.query(query, (error, resultado) => {
        if(error) console.log(error.message);

        if(resultado.length > 0) {
            obj.code = "200"
            obj.mensaje = "Lista de coincidencia de la editorial"
            obj.data = resultado
            res.json(obj)
        } else {
            obj.code = "400"
            obj.mensaje = "No existe coincidencia con algun registro de la editorial"
            obj.data = []
            res.json(obj)
        }
    })
})

// AGREGAR EDITORIAL
app.post('/editoriales/add', (req, res) => {
    const editorial = {
        idEditorial: req.body.id_editorial,
        nomEditorial: req.body.nom_editorial
    }

    query = `INSERT INTO editoriales VALUES('${editorial.idEditorial}', '${editorial.nomEditorial}')`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se inserto correctamente la editorial"
        obj.data = []
        res.json(obj)
    })
})

// ACTUALIZAR EDITORIAL
app.post('/editoriales/update', (req, res) => {
    const editorial = {
        idEditorial: req.body.id_editorial,
        nomEditorial: req.body.nom_editorial
    }

    query = `UPDATE editoriales SET nom_editorial='${editorial.nomEditorial}' WHERE id_editorial='${editorial.idEditorial}'`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se actualizo correctamente la editorial"
        obj.data = []
        res.json(obj)
    })
})

// BORRAR EDITORIAL
app.post('/editoriales/delete', (req, res) => {
    const editorial = {
        idEditorial: req.body.id_editorial
    }

    query = `DELETE FROM editoriales WHERE id_editorial='${editorial.idEditorial}'`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se elimino correctamente la editorial"
        obj.data = []
        res.json(obj)
    })
})
// END EDITORIALES





// CATEGORIAS
// OBTENER CATEGORIAS
app.get('/categorias', (req, res) => {
    query = `SELECT * FROM categorias`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        if(resultado.length > 0) {
            obj.code = "200"
            obj.mensaje = "Lista de categorias"
            obj.data = resultado
        } else {
            obj.code = "400"
            obj.mensaje = "No hay categorias registradas"
            obj.data = []
        }
        res.json(obj)
    })
})

// BUSCAR CATEGORIAS POR NOMBRE
app.post('/categorias/find', (req, res) => {
    const { nomCategoria } = req.body
    
    if(nomAutor == "") {
        obj.code = "400"
        obj.mensaje = "No hay informacion de la categoria a buscar"
        obj.data = []
        res.json(obj)
        return
    }

    query = `SELECT * FROM categorias WHERE nom_categoria LIKE '%${nomCategoria}%'`

    conexion.query(query, (error, resultado) => {
        if(error) console.log(error.message);

        if(resultado.length > 0) {
            obj.code = "200"
            obj.mensaje = "Lista de coincidencia de categorias"
            obj.data = resultado
            res.json(obj)
        } else {
            obj.code = "400"
            obj.mensaje = "No existe coincidencia con algun registro de categoria"
            obj.data = []
            res.json(obj)
        }
    })
})

// AGREGAR CATEGORIA
app.post('/categorias/add', (req, res) => {
    const categoria = {
        idCategoria: req.body.id_categoria,
        nomCategoria: req.body.nom_categoria
    }

    query = `INSERT INTO categorias VALUES('${categoria.idCategoria}', '${categoria.nomCategoria}')`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se inserto correctamente la categoria"
        obj.data = []
        res.json(obj)
    })
})

// ACTUALIZAR CATEGORIA
app.post('/categorias/update', (req, res) => {
    const categoria = {
        idCategoria: req.body.id_categoria,
        nomCategoria: req.body.nom_categoria
    }

    query = `UPDATE categorias SET nom_categoria='${categoria.nomCategoria}' WHERE id_categoria='${categoria.idCategoria}'`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se actualizo correctamente la categoria"
        obj.data = []
        res.json(obj)
    })
})

// BORRAR CATEGORIA
app.post('/categorias/delete', (req, res) => {
    const categoria = {
        idCategoria: req.body.id_categoria
    }

    query = `DELETE FROM categorias WHERE id_categoria='${categoria.idCategoria}'`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se elimino correctamente la categoria"
        obj.data = []
        res.json(obj)
    })
})
// END CATEGORIAS





// LIBROS
// OBTENER LIBROS
app.get('/libros', (req, res) => {
    query = `SELECT * FROM libros`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        if(resultado.length > 0) {
            obj.code = "200"
            obj.mensaje = "Lista de libros"
            obj.data = resultado
        } else {
            obj.code = "400"
            obj.mensaje = "No hay libros registradas"
            obj.data = []
        }
        res.json(obj)
    })
})

// AGREGAR LIBRO
app.post('/libros/add', (req, res) => {
    const libro = {
        isbn: req.body.isbn,
        portada: req.body.portada,
        nomLibro: req.body.nom_libro,
        nomAutor: req.body.autor,
        descripcion: req.body.descripcion,
        editorial: req.body.editorial,
        anioPublicacion: req.body.anio_publicacion,
        edicion: req.body.edicion,
        existencias: req.body.existencias,
        nomCategoria: req.body.categoria
    }

    if(
        libro.isbn == "" ||
        libro.nomLibro == "" ||
        libro.nomAutor == "" ||
        libro.editorial == "" ||
        libro.nomCategoria == "" ||
        libro.anioPublicacion == "" ||
        libro.edicion == "" ||
        libro.existencias == ""
    ) {
        obj.code = "400"
        obj.mensaje = "No se recibieron los datos del libro"
        obj.data = []
        res.json(obj)
        return
    }

    query = `INSERT INTO libros(
            isbn, 
            portada, 
            nom_libro, 
            autor, 
            descripcion,
            editorial, 
            anio_publicacion, 
            edicion, 
            existencias, 
            categoria
        ) VALUES(
        '${libro.isbn}',
        '${libro.portada}',
        '${libro.nomLibro}',
        '${libro.nomAutor}',
        '${libro.descripcion}',
        '${libro.editorial}',
        '${libro.anioPublicacion}',
        '${libro.edicion}',
        '${libro.existencias}',
        '${libro.nomCategoria}'
    )`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se inserto correctamente el libro"
        obj.data = []
        res.json(obj)
    })
})

// ACTUALIZAR LIBRO
app.post('/libros/update', (req, res) => {
    const libro = {
        isbn: req.body.isbn,
        portada: req.body.portada,
        nomLibro: req.body.nom_libro,
        nomAutor: req.body.autor,
        descripcion: req.body.descripcion,
        editorial: req.body.editorial,
        anioPublicacion: req.body.anio_publicacion,
        edicion: req.body.edicion,
        existencias: req.body.existencias,
        nomCategoria: req.body.categoria
    }

    if(
        libro.isbn == "" ||
        libro.nomLibro == "" ||
        libro.nomAutor == "" ||
        libro.editorial == "" ||
        libro.nomCategoria == "" ||
        libro.anioPublicacion == "" ||
        libro.edicion == "" ||
        libro.existencias == ""
    ) {
        obj.code = "400"
        obj.mensaje = "No se recibieron los datos del libro"
        obj.data = []
        res.json(obj)
        return
    }

    query = `UPDATE libros
        SET 
            nom_libro='${libro.nomLibro}',
            autor='${libro.nomAutor}',
            descripcion='${libro.descripcion}',
            editorial='${libro.editorial}',
            anio_publicacion='${libro.anioPublicacion}',
            edicion='${libro.edicion}',
            existencias='${libro.existencias}',
            categoria='${libro.nomCategoria}' 
        WHERE isbn='${libro.isbn}'`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se actualizo correctamente el libro"
        obj.data = []
        res.json(obj)
    })
})

// BORRAR LIBRO
app.post('/libros/delete', (req, res) => {
    const libro = {
        isbn: req.body.isbn
    }

    query = `DELETE FROM libros WHERE isbn='${libro.isbn}'`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se elimino correctamente el libro"
        obj.data = []
        res.json(obj)
    })
})


// OBTENER PRESTAMOS
app.get('/prestamos', (req, res) => {
    query = `SELECT * FROM prestamos`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        if(resultado.length > 0) {
            obj.code = "200"
            obj.mensaje = "Listado de todos los prestamos"
            obj.data = resultado
            res.json(obj)
        } else {
            obj.code = "400"
            obj.mensaje = "No hay prestamos registrados"
            obj.data = []
            res.json(obj)
        }
        
    })
})

// OBTENER PRESTAMOS POR NOMBRE USUARIO
app.post('/prestamos/find', (req, res) => {
    const { idUsuario } = req.body

    if(nomUsuario == "") {
        obj.code = "400"
        obj.mensaje = "No se recibio ningun id de usuario"
        obj.data = []
        res.json(obj)
        return
    }

    query = `
    SELECT 
        libro.id_prestamo,
        libros.isbn, 
        libros.nom_libro, 
        libros.autor, 
        libros.editorial, 
        libros.anio_publicacion, 
        libros.edicion,
        prestamos.fecha_prestamo
    FROM libros, prestamos
    WHERE 
        libros.isbn=prestamos.isbn AND
        prestamos.id_usuario='${idUsuario}'`

    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        if(resultado.length > 0) {
            obj.code = "200"
            obj.mensaje = "Listado de prestamos al usuario"
            obj.data = resultado
        } else {
            obj.code = "400"
            obj.mensaje = "No hay prestamos registrados al usuario"
            obj.data = []
        }
        res.json(obj)
    })
})

// AGREGAR PRESTAMOS
app.post('/prestamos/add', (req, res) => {
    const prestamo = {
        isbn: req.body.isbn,
        idUsuario: req.body.id_usuario
    }

    if(prestamo.isbn == "" || prestamo.idUsuario == "") {
        obj.code = "400"
        obj.mensaje = "No se recibieron los datos para el prestamo"
        obj.data = []
        res.json(obj)
        return
    }

    let hoy = new Date().toLocaleDateString()

    query = `SELECT existencias FROM libros WHERE isbn='${prestamo.isbn}'`
    conexion.query(query, (error, resultado) => {
        const {existencias} = resultado[0]    
        
        if((existencias-1) > 0) {
            const query2 = `
            UPDATE libros SET existencias=${existencias-1} WHERE isbn='${prestamo.isbn}'`
            conexion.query(query2, (error, resultado) => {
                const id = Date.now()
                const query3 = `INSERT INTO prestamos (id_prestamo, isbn, id_usuario, fecha_prestamo) VALUES('${id}', '${prestamo.isbn}','${prestamo.idUsuario}','${hoy}')`
                conexion.query(query3, (error, resultado) => {
                    const query4 = `UPDATE usuarios SET estado_usuario='deudor' WHERE id_usuario='${prestamo.idUsuario}'`
                    conexion.query(query4, (error, resultado) => {
                        obj.code = "200"
                        obj.mensaje = "Se agrego el prestamo"
                        obj.data = []
                        res.json(obj)
                    })
                })
            })
        } else {
            obj.code = "400"
            obj.mensaje = "No se puede prestar el libro"
            obj.data = []
            res.json(obj)
        }

    })
})

// DEVOLVER PRESTAMO
app.post('/prestamos/delete', (req, res) => {
    const prestamo = {
        idPrestamo: req.body.id_prestamo,
        isbn: req.body.isbn,
        idUsuario: req.body.id_usuario
    }
    
    if(prestamo.idPrestamo == "" || prestamo.idUsuario == "" || prestamo.isbn == "") {
        obj.code = "400"
        obj.mensaje = "No se recibieron los datos para devolver el prestamo"
        obj.data = []
        res.json(obj)
        return
    }

    const query = `DELETE FROM prestamos WHERE id_prestamo='${prestamo.idPrestamo}'`
    conexion.query(query, (error, resultado) => {
        const query2 = `UPDATE libros SET existencias=existencias+1 WHERE isbn='${prestamo.isbn}'`
        conexion.query(query2, (error, resultado) => {
            const query3 = `SELECT COUNT(id_usuario) AS totalPrestamo FROM prestamos WHERE id_usuario='${prestamo.idUsuario}'`
            conexion.query(query3, (error, resultado) => {
                const { totalPrestamo } = resultado[0]
                if(totalPrestamo == 0) {
                    const query4 = `UPDATE usuarios SET estado_usuario=NULL WHERE id_usuario='${prestamo.idUsuario}'`
                    conexion.query(query4, (error, resultado) => {
                        obj.code = "200"
                        obj.mensaje = "Se devolvio el libro prestado"
                        obj.data = []
                        res.json(obj)
                    })
                } else {
                    obj.code = "200"
                    obj.mensaje = "Se devolvio el libro prestado"
                    obj.data = []
                    res.json(obj)
                }
            })
        })
    })
})
// END LIBROS