<?php

  include ("inc/usarBD.php");

  $nombre = $_GET['nombre'];

  $consulta="SELECT id, precio FROM productos  WHERE nombre = '".$nombre."'";

  $sJSON = "";
  $sJSON .= "{";

  if ($result=mysqli_query($conexion,$consulta)){
    while($row = $result->fetch_assoc()) {
        
        $sJSON .= '"id": "'.$row['id'].'",';    
        $sJSON .= '"precio": "'.$row['precio'].'"';          
        
      }
    mysqli_free_result($result);
  }
  
  $sJSON .= "}";

  echo $sJSON;

  @mysqli_free_result ($hacerConsulta);
  mysqli_close ($conexion);
?>