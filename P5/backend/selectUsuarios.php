<?php

  include ("inc/usarBD.php");

  $usuario = $_GET["sUsuario"];
  $password = $_GET["sPassword"];

  $consulta="SELECT tipo FROM login WHERE usuario = '".$usuario."' AND password = '".$password."'";

  $sJSON = "";
  $sJSON .= "[";

  if ($result=mysqli_query($conexion,$consulta)){
    while($row = $result->fetch_assoc()) {
        $sJSON .= "{";          
          $sJSON .= '"tipo": "'.$row['tipo'].'"';
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