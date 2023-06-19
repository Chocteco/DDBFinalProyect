from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin
import pymysql.cursors 
from flask import jsonify
app = Flask(__name__)

def get_database_connection():
    return pymysql.connect(
            host="localhost", 
            port=3306,
            user="root",
            password="",
            db="punto_de_venta",
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
    )
conexion = MySQL(app)
CORS(app)
@app.route('/')
def index():
    return "Hola mundo"

@app.route('/productos')
def getProductos():
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        cursor.execute("SELECT * FROM productos")
        result = cursor.fetchall()

        # Convertir los valores bytes a cadenas
        for row in result:
            for key, value in row.items():
                if isinstance(value, bytes):
                    row[key] = value.decode('utf-8')

        return jsonify({'intStatus': 200, 'strAnswer': result})

    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': "Error", 'exito': False})
@app.route('/productos/<int:id>',methods = ["GET"])
def getProducto(id):
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        cursor.execute("SELECT * FROM productos WHERE id=%s",(id))
        result = cursor.fetchall()

        # Convertir los valores bytes a cadenas
        for row in result:
            for key, value in row.items():
                if isinstance(value, bytes):
                    row[key] = value.decode('utf-8')

        return jsonify({'intStatus': 200, 'strAnswer': result})

    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': "Error", 'exito': False})
    
@app.route('/clientes')
def getClientes():
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        cursor.execute("SELECT * FROM clientes")
        result = cursor.fetchall()

        # Convertir los valores bytes a cadenas
        for row in result:
            for key, value in row.items():
                if isinstance(value, bytes):
                    row[key] = value.decode('utf-8')

        return jsonify({'intStatus': 200, 'strAnswer': result})

    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': "Error", 'exito': False})

@app.route('/clientes', methods=['POST'])
def insertclientes():
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        producto = request.get_json()
        nombre = producto['nombre']
        direccion = producto['direccion']
        telefono = producto['telefono']
        correo_electronico = producto['correo_electronico'],
        cursor.execute("INSERT INTO clientes (nombre, direccion, telefono,correo_electronico) VALUES (%s, %s, %s,%s)", (nombre,direccion,telefono,correo_electronico))
        MysqlCnx.commit()
        return jsonify({'mensaje': 'Inserción exitosa', 'exito': True})

    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': 'Error al insertar el producto', 'exito': False})

@app.route('/proveedor', methods=['POST'])
def insertproveedor():
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        producto = request.get_json()
        nombre = producto['nombre']
        direccion = producto['direccion']
        telefono = producto['telefono']
        correo_electronico = producto['correo_electronico'],
        cursor.execute("INSERT INTO proveedores (nombre, direccion, telefono,correo_electronico) VALUES (%s, %s, %s,%s)", (nombre,direccion,telefono,correo_electronico))
        MysqlCnx.commit()
        return jsonify({'mensaje': 'Inserción exitosa', 'exito': True})

    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': 'Error al insertar el producto', 'exito': False})


@app.route('/productos', methods=['POST'])
def insertProducto():
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        producto = request.get_json()
        nombre = producto['nombre']
        precio_venta = producto['precio_venta']
        descripcion = producto['descripcion']
        precio_compra = producto['precio_compra'],
        cantidad_stock = producto['cantidad_stock'],
        cantidad_minima = producto['cantidad_minima'],
        categoria_id = producto['categoria_id'],
        imagen = producto['imagen'] 
        cursor.execute("INSERT INTO productos (nombre, precio_venta, descripcion,precio_compra,cantidad_stock,cantidad_minima,categoria_id,imagen) VALUES (%s, %s, %s,%s,%s,%s,%s,%s)", (nombre, precio_venta, descripcion,precio_compra,cantidad_stock,cantidad_minima,categoria_id,imagen))
        MysqlCnx.commit()
        return jsonify({'mensaje': 'Inserción exitosa', 'exito': True})

    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': 'Error al insertar el producto', 'exito': False})

@app.route('/categorias',methods=["GET"])
def getCategorias():
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        cursor.execute("SELECT * FROM categorias")
        result = cursor.fetchall()

        # Convertir los valores bytes a cadenas
        for row in result:
            for key, value in row.items():
                if isinstance(value, bytes):
                    row[key] = value.decode('utf-8')

        return jsonify({'intStatus': 200, 'strAnswer': result})

    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': "Error", 'exito': False})
@app.route('/productos/<int:id>', methods=['PUT'])
def updateProducto(id):
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()

        # Obtener los datos del producto enviados en el cuerpo de la solicitud
        producto = request.get_json()

        # Extraer los valores del producto
        nombre = producto['nombre']
        precio_venta = producto['precio_venta']
        descripcion = producto['descripcion']
        precio_compra = producto['precio_compra']
        cantidad_stock = producto['cantidad_stock']
        cantidad_minima = producto['cantidad_minima']
        categoria_id = producto['categoria_id']
        imagen = producto['imagen']
        cursor.execute("UPDATE productos SET nombre=%s, precio_venta=%s, descripcion=%s,precio_compra=%s,cantidad_stock=%s,cantidad_minima=%s,categoria_id=%s,imagen=%s WHERE id=%s",
                    (nombre, precio_venta, descripcion,precio_compra,cantidad_stock,cantidad_minima,categoria_id,imagen,id))
        MysqlCnx.commit()

        return jsonify({'mensaje': 'Actualización exitosa', 'exito': True})

    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': 'Error al actualizar el producto', 'exito': False})
    
@app.route('/productos/<int:id>', methods=['DELETE'])
def deleteProducto(id):
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        cursor.execute("DELETE FROM productos WHERE id=%s", (id))
        MysqlCnx.commit()

        return jsonify({'mensaje': "Producto eliminado correctamente", 'exito': True})

    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': "Error al eliminar el producto", 'exito': False})

@app.route('/proveedores')
def getProveedores():
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        cursor.execute("SELECT * FROM proveedores")
        result = cursor.fetchall()

        # Convertir los valores bytes a cadenas
        for row in result:
            for key, value in row.items():
                if isinstance(value, bytes):
                    row[key] = value.decode('utf-8')

        return jsonify({'intStatus': 200, 'strAnswer': result})

    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': "Error", 'exito': False}) 
    
@app.route('/venta', methods=['POST'])
def insertventa():
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        producto = request.get_json()
        cliente_id = producto['cliente_id']
        total_venta = producto['total_venta']
        departamento = producto['departamento']
        notas = producto['notas'],
        cursor.execute("INSERT INTO ventas (cliente_id, total_venta, departamento,notas) VALUES (%s, %s, %s,%s)", (cliente_id, total_venta, departamento,notas))
        MysqlCnx.commit()
        return jsonify({'mensaje': 'Inserción exitosa', 'exito': True})

    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': 'Error al insertar el producto', 'exito': False})
@app.route('/venta')
def getVenta():
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        cursor.execute("SELECT * FROM ventas")
        result = cursor.fetchall()

        # Convertir los valores bytes a cadenas
        for row in result:
            for key, value in row.items():
                if isinstance(value, bytes):
                    row[key] = value.decode('utf-8')

        return jsonify({'intStatus': 200, 'strAnswer': result})
    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': "Error", 'exito': False})
@app.route('/compra', methods=['POST'])
def insertcompra():
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        producto = request.get_json()
        proveedor_id = producto['proveedor_id']
        total_compra = producto['total_compra']
        departamento = producto['departamento']
        notas = producto['notas'],
        cursor.execute("INSERT INTO compras (proveedor_id, total_compra, departamento,notas) VALUES (%s, %s, %s,%s)", (proveedor_id, total_compra, departamento,notas))
        MysqlCnx.commit()
        return jsonify({'mensaje': 'Inserción exitosa', 'exito': True})

    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': 'Error al insertar el producto', 'exito': False})
@app.route('/compra')
def getCompra():
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        cursor.execute("SELECT * FROM compras")
        result = cursor.fetchall()

        # Convertir los valores bytes a cadenas
        for row in result:
            for key, value in row.items():
                if isinstance(value, bytes):
                    row[key] = value.decode('utf-8')

        return jsonify({'intStatus': 200, 'strAnswer': result})
    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': "Error", 'exito': False})
@app.route('/detallecompra', methods=['POST'])
def insertdetallecompra():
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        producto = request.get_json()
        compra_id = producto['compra_id']
        producto_id = producto['producto_id']
        cantidad = producto['cantidad']
        precio_unitario = producto['precio_unitario']
        metodo_pago = producto['metodo_pago']
        cursor.execute("INSERT INTO detalles_compra (compra_id, producto_id, cantidad,precio_unitario,metodo_pago) VALUES (%s, %s, %s,%s,%s)", (compra_id, producto_id, cantidad,precio_unitario,metodo_pago))
        MysqlCnx.commit()
        return jsonify({'mensaje': 'Inserción exitosa', 'exito': True})

    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': 'Error al insertar el producto', 'exito': False})
@app.route('/detallecompra/<int:id>',methods=["GET"])
def getdetallecompra(id):
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        cursor.execute("SELECT * FROM detalles_compra WHERE id=%s",(id))
        result = cursor.fetchall()

        # Convertir los valores bytes a cadenas
        for row in result:
            for key, value in row.items():
                if isinstance(value, bytes):
                    row[key] = value.decode('utf-8')

        return jsonify({'intStatus': 200, 'strAnswer': result})
    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': "Error", 'exito': False})
@app.route('/detalleventa', methods=['POST'])
def insertdetalleventa():
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        producto = request.get_json()
        venta_id = producto['venta_id']
        producto_id = producto['producto_id']
        cantidad = producto['cantidad']
        precio_unitario = producto['precio_unitario']
        metodo_pago = producto['metodo_pago']
        cursor.execute("INSERT INTO detalles_venta (venta_id, producto_id, cantidad,precio_unitario,metodo_pago) VALUES (%s, %s, %s,%s,%s)", (venta_id, producto_id, cantidad,precio_unitario,metodo_pago))
        MysqlCnx.commit()
        return jsonify({'mensaje': 'Inserción exitosa', 'exito': True})

    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': 'Error al insertar el producto', 'exito': False})
@app.route('/detalleventa/<int:id>',methods=["GET"])
def getdetalleventa(id):
    try:
        MysqlCnx = get_database_connection()
        cursor = MysqlCnx.cursor()
        cursor.execute("SELECT * FROM detalles_venta WHERE id=%s",(id))
        result = cursor.fetchall()

        # Convertir los valores bytes a cadenas
        for row in result:
            for key, value in row.items():
                if isinstance(value, bytes):
                    row[key] = value.decode('utf-8')

        return jsonify({'intStatus': 200, 'strAnswer': result})
    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': "Error", 'exito': False})        
def pagina_no_encontrada(error):
        return "<h1>Página no encontrada</h1>", 404
if __name__ == '__main__':
    app.run(debug=True)