<?php

  include ("inc/usarBD.php");

  $id = $_GET["IDB"];
  $consulta="SELECT nombre, porcentaje FROM tipoIVA WHERE id = '".$id."'";

  $sJSON = "";
  $sJSON .= "{";

  if ($result=mysqli_query($conexion,$consulta)){
    while($row = $result->fetch_assoc()) {               
        $sJSON .= '"nombre": "'.$row['nombre'].'",';    
        $sJSON .= '"porcentaje": "'.$row['porcentaje'].'"';             
      }
    mysqli_free_result($result);  }
  
  $sJSON .= "}";

  echo $sJSON;

  @mysqli_free_result ($hacerConsulta);
  mysqli_close ($conexion);
?>