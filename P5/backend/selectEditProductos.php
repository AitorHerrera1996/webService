<?php

  include ("inc/usarBD.php");

  $id = $_GET["IDB"];
  $consulta="SELECT nombre, precio, descripcion FROM productos WHERE id = '".$id."'";

  $sJSON = "";
  $sJSON .= "{";

  if ($result=mysqli_query($conexion,$consulta)){
    while($row = $result->fetch_assoc()) {               
        $sJSON .= '"nombre": "'.$row['nombre'].'",';    
        $sJSON .= '"precio": "'.$row['precio'].'",';
        $sJSON .= '"descripcion": "'.$row['descripcion'].'"';       
      }
    mysqli_free_result($result);  }
  
  $sJSON .= "}";

  echo $sJSON;

  @mysqli_free_result ($hacerConsulta);
  mysqli_close ($conexion);
?>