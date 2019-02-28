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


