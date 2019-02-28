<?php

  include ("inc/usarBD.php");

  $consulta="SELECT id, nombre FROM tipoIVA";

  $sJSON = "";
  $sJSON .= "[";

  if ($result=mysqli_query($conexion,$consulta)){
    while($row = $result->fetch_assoc()) {
        $sJSON .= "{";
        $sJSON .= '"id": "'.$row['id'].'",';    
        $sJSON .= '"nombre": "'.$row['nombre'].'"';          
        $sJSON .= "},";
      }
    mysqli_free_result($result);
  }
  $sJSON = substr($sJSON, 0, -1);
  $sJSON .= "]";

  echo $sJSON;

  @mysqli_free_result ($hacerConsulta);
  mysqli_close ($conexion);
?>