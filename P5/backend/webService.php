<?php

  include ("inc/usarBD.php");
  if ($_GET["iAccion"] == 1){
    $sNombre = $_GET["sNombre"];
    $sDireccion = $_GET["sDireccion"];
    $sProvincia = $_GET["sProvincia"];
    $sCiudad = $_GET["sCiudad"];
    $sCP = $_GET["sCP"];
    $consulta="INSERT INTO clientes (nombre, direccion, provincia, ciudad, codigoPostal) VALUES ('".$sNombre."', '".$sDireccion."', '".$sProvincia."' , '".$sCiudad."', '".$sCP."')";
    $hacerConsulta=mysqli_query($conexion, $consulta);
  }

  if ($_GET["iAccion"] == 2) {
    $sNombre = $_GET["sNombre"];
    $sPorcentaje = $_GET["sPorcentaje"];
    $consulta="INSERT INTO tipoIVA (nombre, porcentaje) VALUES ('".$sNombre."','".$sPorcentaje."')";
    $hacerConsulta=mysqli_query($conexion, $consulta);
  }

  if($_GET["iAccion"] == 3) {
    $sNombre = $_GET['sNombre'];
    $sPrice = $_GET['sPrice'];
    $sDescription = $_GET['sDescription'];
    $consulta="INSERT INTO productos (nombre, precio, descripcion) VALUES ('".$sNombre."','".$sPrice."','".$sDescription."')";
    $hacerConsulta=mysqli_query($conexion, $consulta);
  } 

  if($_GET["iAccion"] == 4) {
    $user = $_GET['sUser'];
    $pass = $_GET['sPass'];
    $direccion = $_GET['sDireccion'];
    $provincia = $_GET['sProvincia'];
    $ciudad = $_GET['sCiudad'];
    $cp = $_GET['sCP'];
    $consulta="INSERT INTO comerciales (usuario, contrasena, direccion, provincia, ciudad, codigoPostal) VALUES ('".$user."', '".$pass."', '".$direccion."', '".$provincia."', '".$ciudad."', '".$cp."')";
    $hacerConsulta=mysqli_query($conexion, $consulta);
    $consulta = "INSERT INTO login (usuario, password, tipo) VALUES ('".$user."' , '".$pass."', 'C')";
    $hacerConsulta=mysqli_query($conexion, $consulta);
 
  } 


  $sJSON = "";
  $sJSON .= "{";

  if ($hacerConsulta){
	  $sJSON .= '"codigoError": 0,';
	  $sJSON .= '"descError": "",';
	  $sJSON .= '"observaciones": "Todo OK"';
  } else {
	  $sJSON .= '"codigoError": -1,';
	  $sJSON .= '"descError": "Error en la consulta",';
	  $sJSON .= '"observaciones": "KO!"';
  }

  $sJSON .= "}";

  echo $sJSON;

  @mysqli_free_result ($hacerConsulta);
  mysqli_close ($conexion);
?>


