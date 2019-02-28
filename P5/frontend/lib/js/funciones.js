function crearBD(){
  $.ajax({
    url: "../backend/CrearBD.php",
    type: "GET",
    cache: false,
    success: function(response){
        var myJSON = JSON.parse(response);

        if (parseInt(myJSON.codigoError) == 0){
            alert(myJSON.observaciones);
        } else {
            alert(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
        }
    },
    error: function(){
      alert("Error en la consulta BD");
    }
  });
}

// ------------------------------------------------------------------------------ COMPROBAR LOGIN -----------------------------------------------------------------

function comprobarUsuario(usuario, password){
  $.ajax({
    url: "../backend/SelectUsuarios.php",
    data: {sUsuario : usuario, sPassword: password},
    type: "GET",
    cache: false,
    success: function(response){
        var myJSON = JSON.parse(response);

        for (i=0; i<myJSON.length;i++){
            if(myJSON[i].tipo == "A"){                
                window.location.href = '../frontend/principalA.html';                
            } else if(myJSON[i].tipo == "C"){
                window.location.href = '../frontend/principalC.html';               
            } else{
                alert("User or password incorrect!");
            }
        } 
    },
    error: function(){
      alert("Error en la consulta");
    }
  });
}


// --------------------------------------------------------- CLIENTES ( LLENAR PAGINA ADMIN, LLENAR PAGINA EDIT ) -------------------------------------------------------
 

function llenarClientes(){
    var html = "";    
    var sIDClientes = ''; 
    $.ajax({
        url: "../backend/SelectClientes.php",
        type: "GET",
        cache: false,
        success: function(response){
            var myJSON = JSON.parse(response);

            for (i=0; i<myJSON.length;i++){
                html += "<li id= "+ myJSON[i].id +">"+ myJSON[i].nombre + "</li>";      
                sIDClientes += myJSON[i].id +",";          
            } 

            $('#editClientes').html(html);

            //IDENTIFICADOR PARA ENLAZAR LAS ID'S
            var sID2 = sIDClientes.substring(0,sIDClientes.length-1);
            sIDsplit = sID2.split(",");
            console.log(sIDsplit);

            for (var i = 0; i < sIDsplit.length; i++){
                var identificadorBuscar = sIDsplit[i];                    
                $('#'+identificadorBuscar).click(function(){                                      
                    IDBuscar = $(this).attr('id');   
                    window.location.href= '../frontend/clients.html?id='+IDBuscar;                                   
                });  
            }
        },
        error: function(){
          alert("Error en la consulta");
        }
    });
}

function llenarEditCliente(ID){    
    $.ajax({
        url: "../backend/SelectEditClientes.php",
        data: {IDB: ID},
        type: "GET",
        cache: false,
        success: function(response){
            var myJSON = JSON.parse(response); 
            $("#inputNombreCliente").val(myJSON.nombre);  
            $("#inputDireccionCliente").val(myJSON.direccion);  
            $("#inputProvinciaCliente").val(myJSON.provincia);  
            $("#inputCiudadCliente").val(myJSON.ciudad);  
            $("#inputCPCliente").val(myJSON.codigoPostal);  

        },
        error: function(){
          alert("Error en la consulta");
        }
    });
}

//---------------------------------------------------------------------------------- IVA (LLENAR PAGINA ADMIN, LLENAR PAGINA EDITAR) ----------------------------------

function llenarIVA(){
    var html = "";
    var htmlOrder = "";
    var sIDIVA = "";   
    $.ajax({
        url: "../backend/SelectIVA.php",
        type: "GET",
        cache: false,
        success: function(response){
            var myJSON = JSON.parse(response);

            for (i=0; i<myJSON.length;i++){
                html += "<li id= "+ myJSON[i].id +"IVA" + ">"+ myJSON[i].nombre + "</li>";  
                htmlOrder += "<option  id= "+ myJSON[i].id +"IVA" + ">"+ myJSON[i].nombre + "</option>";     
                sIDIVA += myJSON[i].id +"IVA,";                
            } 

            $('#editIVA').html(html);
            $('#orderVAT').html(htmlOrder);
            var sID2 = sIDIVA.substring(0,sIDIVA.length-1);
            sIDsplit = sID2.split(",");
            console.log(sIDsplit);

            for (var i = 0; i < sIDsplit.length; i++){
                var identificadorBuscar = sIDsplit[i];                                
                $('#'+identificadorBuscar).click(function(){                                      
                    IDBuscar = $(this).attr('id');   
                    window.location.href= '../frontend/iva.html?id='+IDBuscar;                                   
                });  
            }
        },
        error: function(){
          alert("Error en la consulta");
        }
    });
}

function llenarEditIVA(ID){    
    $.ajax({
        url: "../backend/SelectEditIVA.php",
        data: {IDB: ID},
        type: "GET",
        cache: false,
        success: function(response){
            var myJSON = JSON.parse(response); 
            $("#inputNombreIVA").val(myJSON.nombre);  
            $("#inputPorIVA").val(myJSON.porcentaje);  
        },
        error: function(){
          alert("Error en la consulta");
        }
    });
}

//-------------------------------------------------------------------------------------- COMPROBACION DE CAMPOS -------------------------------------------------------


function comprobarCamposNoNumericos(valor){                
    if (valor.val() == "" || isNaN(valor.val()) == false){
        alert("Campo erroneo");
        $(valor).css("border", "1px solid red");
        return false;
    } else {
        valor.css("border", "1px solid grey");
        return true;
    }
}

function comprobarCamposNumericos(valor){                
    if (valor.val() == "" || isNaN(valor.val()) == true){
        alert("Campo erroneo");
        $(valor).css("border", "1px solid red");
        return false;
    } else {
        valor.css("border", "1px solid grey");
        return true;
    }
}

// ------------------------------------------------------------------ INSERAR Y EDITAR CLIENTES -----------------------------------------------------------------------


function pdInsertarRegistro(){
  $.ajax({
    url: "../backend/WebService.php",
    data: {iAccion: 1, sNombre : $('#inputNombreCliente').val(), sDireccion : $('#inputDireccionCliente').val(), sProvincia: $("#inputProvinciaCliente").val(), sCiudad: $("#inputCiudadCliente").val(), sCP: $("#inputCPCliente").val()},
    type: "GET",
    cache: false,
    success: function(response){
        var myJSON = JSON.parse(response);

        if (parseInt(myJSON.codigoError) == 0){
            alert(myJSON.observaciones);
            window.location.href = '../frontend/principalA.html';
        } else {
            alert(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
        }
    },
    error: function(){
      alert("Error en la consulta");
    }
  });
}

function editarRegistro(ID){
  $.ajax({
    url: "../backend/WebServiceUpdates.php",
    data: {IDB: ID, iAccion: 1, sNombre : $('#inputNombreCliente').val(), sDireccion : $('#inputDireccionCliente').val(), sProvincia: $("#inputProvinciaCliente").val(), sCiudad: $("#inputCiudadCliente").val(), sCP: $("#inputCPCliente").val()},
    type: "GET",
    cache: false,
    success: function(response){
        var myJSON = JSON.parse(response);

        if (parseInt(myJSON.codigoError) == 0){
            alert(myJSON.observaciones);
            window.location.href = '../frontend/principalA.html';
        } else {
            alert(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
        }
    },
    error: function(){
      alert("Error en la consulta");
    }
  });
}

// -------------------------------------------------------------------------------- INSERTAR Y EDITAR IVA ------------------------------------------------------------

function pdInsertarIVA(){
  $.ajax({
    url: "../backend/WebService.php",
    data: {iAccion: 2, sNombre: $("#inputNombreIVA").val(), sPorcentaje: $("#inputPorcentajeIVA").val()},
    type: "GET",
    cache: false,
    success: function(response){
        var myJSON = JSON.parse(response);

        if (parseInt(myJSON.codigoError) == 0){
            alert(myJSON.observaciones);
        } else {
            alert(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
        }
    },
    error: function(){
      alert("Error en la consulta");
    }
  });
}

function editarRegistroIVA(ID){
  $.ajax({
    url: "../backend/WebServiceUpdates.php",
    data: {IDB: ID, iAccion: 2, sNombre : $('#inputNombreIVA').val(), sPorcentaje : $('#inputPorIVA').val()},
    type: "GET",
    cache: false,
    success: function(response){
        var myJSON = JSON.parse(response);

        if (parseInt(myJSON.codigoError) == 0){
            alert(myJSON.observaciones);
        } else {
            alert(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
        }
    },
    error: function(){
      alert("Error en la consulta");
    }
  });
}


//------------------------------------------------------------------ PRODUCTOS ( LLENAR PAGINA ADMIN Y LLENAR PAGINA EDIT)---------------------------------------------

function llenarProductos(){
    var html = "";    
    var sIDProductos = ''; 
    $.ajax({
        url: "../backend/SelectProductos.php",
        type: "GET",
        cache: false,
        success: function(response){
            var myJSON = JSON.parse(response);

            for (i=0; i<myJSON.length;i++){
                html += "<li id= "+ myJSON[i].id +"PROD >"+ myJSON[i].nombre + "</li>";      
                sIDProductos += myJSON[i].id +"PROD,";          
            } 

            $('#editProducto').html(html);

            //IDENTIFICADOR PARA ENLAZAR LAS ID'S
            var sID2 = sIDProductos.substring(0,sIDProductos.length-1);
            sIDsplit = sID2.split(",");
            console.log(sIDsplit);

            for (var i = 0; i < sIDsplit.length; i++){
                var identificadorBuscar = sIDsplit[i];                    
                $('#'+identificadorBuscar).click(function(){                                      
                    IDBuscar = $(this).attr('id');   
                    window.location.href= '../frontend/productos.html?id='+IDBuscar;                                   
                });  
            }
        },
        error: function(){
          alert("Error en la consulta");
        }
    });
}

function llenarEditProduct(ID){    
    $.ajax({
        url: "../backend/SelectEditProductos.php",
        data: {IDB: ID},
        type: "GET",
        cache: false,
        success: function(response){
            var myJSON = JSON.parse(response); 
            alert(myJSON.nombre);
            $("#editProductName").val(myJSON.nombre);  
            $("#editProductPrice").val(myJSON.precio);
            $("#editProductDescription").val(myJSON.descripcion);  
        },
        error: function(){
          alert("Error en la consulta");
        }
    });
}


//------------------------------------------------------------------------------ INSERTAR Y EDITAR PRODUCTOS -------------------------------------------------------------------------

function pdInsertarProductos(){
  $.ajax({
    url: "../backend/WebService.php",
    data: {iAccion: 3, sNombre: $("#inputProductName").val(), sPrice: $("#inputProductPrice").val(), sDescription: $("#inputProductDescription").val()},
    type: "GET",
    cache: false,
    success: function(response){
        var myJSON = JSON.parse(response);

        if (parseInt(myJSON.codigoError) == 0){
            alert(myJSON.observaciones);
        } else {
            alert(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
        }
    },
    error: function(){
      alert("Error en la consulta");
    }
  });
}


// ---------------------------------------------------------------------------- INSERTAR Y EDITAR COMERCIALES ------------------------------------------------------------------------

function llenarComerciales(){
    var html = "";  
    var htmlOrder = "";  
    var sIDComerciales = ''; 
    $.ajax({
        url: "../backend/SelectComerciales.php",
        type: "GET",
        cache: false,
        success: function(response){
            var myJSON = JSON.parse(response);

            for (i=0; i<myJSON.length;i++){
               
                html += "<li id= "+ myJSON[i].id +"COM >"+ myJSON[i].usuario + "</li>";      
                htmlOrder += "<option id= "+ myJSON[i].id +"COM >"+ myJSON[i].usuario + "</option>";      
                sIDComerciales += myJSON[i].id +"COM,";          
            } 

            $('#editComercial').html(html);
            $('#comercialOrder').html(htmlOrder);

            //IDENTIFICADOR PARA ENLAZAR LAS ID'S
            var sID2 = sIDComerciales.substring(0,sIDComerciales.length-1);
            sIDsplit = sID2.split(",");
            console.log(sIDsplit);

            for (var i = 0; i < sIDsplit.length; i++){
                var identificadorBuscar = sIDsplit[i];                    
                $('#'+identificadorBuscar).click(function(){                                      
                    IDBuscar = $(this).attr('id');   
                    window.location.href= '../frontend/comerciales.html?id='+IDBuscar;                                   
                });  
            }
        },
        error: function(){
          alert("Error en la consulta");
        }
    });
}

function pdInsertarComerciales(){
    $.ajax({
    url: "../backend/WebService.php",
    data: {iAccion: 4, sUser: $("#inputComercialUser").val(), sPass: $("#inputComercialPass").val(), sDireccion: $("#inputComercialAdress").val(), sProvincia: $("#inputComercialProvince").val(), sCiudad: $("#inputComercialCity").val(), sCP: $("#inputComercialCP").val()},
    type: "GET",
    cache: false,
    success: function(response){
        var myJSON = JSON.parse(response);

        if (parseInt(myJSON.codigoError) == 0){
            alert(myJSON.observaciones);
            window.location.href = '../frontend/principalA.html';
        } else {
            alert(myJSON.observaciones + " - " + myJSON.codigoError + " - " + myJSON.descError);
        }
    },
    error: function(){
      alert("Error en la consulta");
    }
  });
}

//---------------------------------------------------------------------ARRAYS-----------------------------------------------------------------------------------------

function llenarArrayClientes(){  
    var array = [];        
    $.ajax({
        url: "../backend/SelectClientes.php",
        type: "GET",
        cache: false,
        success: function(response){
            var myJSON = JSON.parse(response);
            var sNombre = '';
            for (i=0; i<myJSON.length;i++){
                sNombre = myJSON[i].nombre;
                array.push(sNombre);            
            }  

            $( "#orderClient" ).autocomplete({
              source: array
            });
            
        }
   })
}

function llenarArrayProductos(){  
    var array = [];        
    $.ajax({
        url: "../backend/SelectProductos.php",
        type: "GET",
        cache: false,
        success: function(response){
            var myJSON = JSON.parse(response);
            var sNombre = '';
            for (i=0; i<myJSON.length;i++){
                sNombre = myJSON[i].nombre;
                array.push(sNombre);            
            }  

            $( "#orderProduct" ).autocomplete({
              source: array
            });
            
        }
   })
}

//------------------------------------------------------------------------VARIAS-------------------------------------------------------------------------

function buscarPrecio(nombre){
     $.ajax({
        url: "../backend/SelectPrecioProducto.php",
        data: {nombre: nombre},
        type: "GET",
        cache: false,
        success: function(response){
            var myJSON = JSON.parse(response);
            $("#orderPrice").val(myJSON.precio);            
        }
   }) 
}