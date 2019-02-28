<?php

  include ("inc/usarBD.php");

  if ($_GET["iAccion"] == 1){
    
    $id = $_GET["IDB"];
    $sNombre = $_GET["sNombre"];
    $sDireccion = $_GET["sDireccion"];
    $sProvincia = $_GET["sProvincia"];
    $sCiudad = $_GET["sCiudad"];
    $sCP = $_GET["sCP"];
    
    $consulta="UPDATE clientes SET nombre = '".$sNombre."' , direccion = '".$sDireccion."' , provincia = '".$sProvincia."' , ciudad = '".$sCiudad."' , codigoPostal = '".$sCP."' WHERE id = '".$id."' ";
    $hacerConsulta=mysqli_query($conexion, $consulta);
  }

  if ($_GET["iAccion"] == 2){
    $id = $_GET["IDB"];
    $nombre = $_GET["sNombre"];
    $porcentaje = $_GET["sPorcentaje"];

    $consulta = "UPDATE tipoiva SET nombre = '".$nombre."' , porcentaje = '".$porcentaje."' WHERE id = '".$id."'";
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


