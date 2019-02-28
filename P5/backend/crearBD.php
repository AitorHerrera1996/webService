<?php
  $conectado=mysqli_connect ("localhost", "root", "");

  $comprobacion = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'P5'";

  $result = mysqli_query($conectado, $comprobacion);

  $sJSON = "";
  $sJSON .= "{";

  if ($result->num_rows < 1){

    $consulta="CREATE DATABASE P5;";
    $hacerConsulta=mysqli_query ($conectado, $consulta);  
    mysqli_select_db ($conectado, "P5");

    $createTableLogin = "CREATE TABLE login (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(255),
    password VARCHAR(255),
    tipo VARCHAR (10)
    );";

    $createTableClientes = "CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(255),
    direccion varchar(255),
    provincia varchar(255),
    ciudad varchar(255),
    codigoPostal varchar(10)
    );";

    $createTableTipoiva ="CREATE TABLE tipoiva (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(255),
    porcentaje INT
    );";

    $createTableProductos = "CREATE TABLE productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(30),
    precio DECIMAL(7,2),
    descripcion VARCHAR(255)
    );";

    $createTableComerciales = "CREATE TABLE comerciales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario varchar(255),
    contrasena varchar(255),
    direccion varchar(255),
    provincia varchar(255),
    ciudad varchar(255),
    codigoPostal varchar(255)
    );";

    $createTableOrders = "CREATE TABLE orders(
    id INT PRIMARY KEY AUTO_INCREMENT,
    comercial INT,
    cliente INT,
    tipoIVA INT,
    producto INT,
    precio DECIMAL(7,2),
    observaciones VARCHAR(255)
    -- FOREIGN KEY (comercial) REFERENCES id(comerciales),
    -- FOREIGN KEY (cliente) REFERENCES id(clientes),
    -- FOREIGN KEY (tipoIVA) REFERENCES id(tipoIVA),
    -- FOREIGN KEY (producto) REFERENCES id(productos)
    );";

    $insertarAdmin = "INSERT INTO login (usuario, password, tipo) VALUES ('admin', 'admin', 'A')";   
    $insertarCliente1 = "INSERT INTO clientes (nombre, direccion, provincia, ciudad, codigoPostal) VALUES ('Joel', 'CasaJoel', 'Barcelona', 'Barcelona', '08024')";
    $insertarCliente2 = "INSERT INTO clientes (nombre, direccion, provincia, ciudad, codigoPostal) VALUES ('Javi', 'CasaJavi', 'Barcelona', 'Barcelona', '08010')";
    $insertarIVA1 = "INSERT INTO tipoiva (nombre, porcentaje) VALUES ('IVA General', 21)";
    $insertarIVA2 = "INSERT INTO tipoiva (nombre, porcentaje) VALUES ('IVA Reducido', 10)";  
    $insertarIVA3 = "INSERT INTO tipoiva (nombre, porcentaje) VALUES ('IVA Superreducido', 4)";
    $insertarProducto = "INSERT INTO productos (nombre, precio, descripcion) VALUES ('ASPIRADOR FUJITSU', 175.5, 'FUJITSU TSU TSU')";

    $tablas = [$createTableLogin, $createTableClientes, $createTableTipoiva, $createTableProductos, $insertarAdmin, $insertarCliente1, $insertarCliente2, $insertarIVA1, $insertarIVA2, $insertarIVA3, $insertarProducto, $createTableComerciales, $createTableOrders];
   

    foreach($tablas as $tabla){
      if (mysqli_query($conectado, $tabla)){
        $sJSON .= '"codigoError": 0,';
        $sJSON .= '"descError": "",';
        $sJSON .= '"observaciones": "Todo OK",';
      } else {
        $sJSON .= '"codigoError": -1,';
        $sJSON .= '"descError": "Error en la consulta",';
        $sJSON .= '"observaciones": "KO!",';
      }
    }

  } 

  else {  
        $sJSON .= '"codigoError": -1,';
        $sJSON .= '"descError": "Error en la consulta",';
        $sJSON .= '"observaciones": "Base de datos ya creada TOY",';
  }    
    
    $sJSON = substr($sJSON, 0, -1);
    $sJSON .= "}";
    echo $sJSON;
  

    @mysqli_free_result ($hacerConsulta);
    @mysqli_free_result ($hacerInsert);
    mysqli_close ($conectado);
?>