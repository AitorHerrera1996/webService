<?php

  include ("inc/usarBD.php");

  $id = $_GET["IDB"];
  $consulta="SELECT nombre, direccion, provincia, ciudad, codigoPostal FROM clientes WHERE id = '".$id."'";

  $sJSON = "";
  $sJSON .= "{";

  if ($result=mysqli_query($conexion,$consulta)){
    while($row = $result->fetch_assoc()) {               
        $sJSON .= '"nombre": "'.$row['nombre'].'",';    
        $sJSON .= '"direccion": "'.$row['direccion'].'",'; 
        $sJSON .= '"provincia": "'.$row['provincia'].'",'; 
        $sJSON .= '"ciudad": "'.$row['ciudad'].'",'; 
        $sJSON .= '"codigoPostal": "'.$row['codigoPostal'].'"';         
      }
    mysqli_free_result($result);  }
  
  $sJSON .= "}";

  echo $sJSON;

  @mysqli_free_result ($hacerConsulta);
  mysqli_close ($conexion);
?>