<template>
  <div class="container">
    <nav class="navbar">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Usuario: {{ username }}</a>
      </div>
    </nav>

    <div>
        <h3>CRUD</h3>
    </div>
    <div class="d-flex" v-if="admin">
        <button class='btn btn-success btn-sm m-1' @click="showForm = !showForm">Nuevo registro</button>
    </div>
    <div class="rounded">
    <table class="table table-hover">
      <thead class="bg-primary bg-gradient  text-white">
        <tr class="p-3">
          <th >id</th>
          <th>descripcion</th>
          <th>fecha</th>
          <th>hora</th>
          <th>seleccion</th>
          <th>multi seleccion</th>
          <th>ubicacion</th>
          <th>numero</th>
          <th>precio</th>
          <th v-if="admin">opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dato, index) in datos" :key="index">
          <td>{{ dato.id }}</td>
          <td>{{ dato.descripcion }}</td>
          <td>{{ dato.fechaFormat }}</td>
          <td>{{ dato.hora }}</td>
          <td>{{ dato.seleccion_multiple }}</td>
          <td>{{ dato.multiseleccion }}</td>
          <td>{{ dato.ubicacion }}</td>
          <td>{{ dato.numero }}</td>
          <td>{{ dato.precio }}</td>
          <td v-if="admin"><button class='btn btn-danger btn-sm m-1' @click="del(dato.id)">Eliminar</button>
          <button class='btn btn-warning btn-sm m-1' @click="openEditor(dato)">Modificar</button></td>
        </tr>
      </tbody>
    </table>
    </div>

    <Transition>
    <New-Form @closeModal="showForm = !showForm" @createRegister="addRegister" v-if="showForm"></New-Form>
    </Transition>

    <Transition>
    <div class="back" v-show="showModForm">
    <div class="form bg-white">
    <div class="mb-4">
          <h4>Modificar registro</h4> 
      </div>
    <form>
      <div class="form-group">
        <label for="texto">Descripcion</label>
        <input type="text" class="form-control" id="texto" v-model="modFormulario.descripcion">
      </div>
      <div class="d-flex justify-content-between mt-2">
        <div class="form-group">
          <label for="fecha">Fecha</label>
          <input type="date" class="form-control" id="fecha" v-model="modFormulario.fecha">
        </div>
        <div class="form-group">
          <label for="hora">Hora</label>
          <input type="time" class="form-control" id="hora" v-model="modFormulario.hora">
        </div>
      </div>
      
      <div class="form-group mt-2">
        <label for="seleccion_multiple">Selección</label>
        <select multiple class="form-control" id="seleccion_multiple" v-model="modFormulario.seleccion_multiple">
          <option>opcion1</option>
          <option>opcion2</option>
          <option>opcion3</option>
        </select>
      </div>
      <div class="form-group mt-2">
        <label for="seleccion_multiple">Selección múltiple</label>
        <select multiple class="form-control" id="seleccion_multiple" v-model="modFormulario.multiseleccion">
          <option>opcion1</option>
          <option>opcion2</option>
          <option>opcion3</option>
        </select>
      </div>
      <div class="form-group mt-2">
        <label for="columna4">Ubicacion</label>
        <input type="text" class="form-control" id="columna4" v-model="modFormulario.ubicacion">
      </div>
      <div class="form-group mt-2">
        <label for="columna5">Numero</label>
        <input type="number" class="form-control" id="columna5" v-model="modFormulario.numero">
      </div>
      <div class="form-group mt-2">
        <label for="columna6">Precio</label>
        <input type="number" class="form-control" id="columna6" step="0.01" v-model="modFormulario.precio">
      </div>
      <button type="submit" class="btn btn-danger btn-sm mt-4" @click.prevent="showModForm = !showModForm">Cancelar</button>
      <button type="submit" class="btn btn-primary btn-sm mt-4" @click.prevent="editDatos">Enviar</button>
    </form>
    </div>
    </div>
    </Transition>
  </div>
</template>

<script>
import cookies from 'js-cookie';
import NewForm from './NewForm.vue';

export default {
  data() {
    return {
      username: '',
      admin: null,
      showModForm: false,
      showForm: false,
        datos: null,
        formulario: {
            descripcion: '',
            fecha: '',
            fechaFormat: '',
            binario: null,
            hora: '',
            seleccion_multiple: [],
            multiseleccion: [],
            ubicacion: '',
            numero: null,
            precio: null
        },
        modFormulario: {
            id: null,
            descripcion: '',
            fecha: '',
            binario: null,
            hora: '',
            seleccion_multiple: [],
            multiseleccion: [],
            ubicacion: '',
            numero: null,
            precio: null
        }
      }
    },
    components:{
      NewForm
    },
    beforeMount(){
        const token = cookies.get("userToken");
        const domain = 'http://localhost:3000';

        fetch(`${domain}/getuserdata`,{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({
            token:token
          })
        })
        .then((response) => {
          return response.json()
        }).then((data) => {
          this.username = data.username;
          if (data.rol == 'administrativo'){
            this.admin = true;
          } else {
            this.admin = false;
          }
        })
    },
    mounted() {
        this.getUsuarios();
    },
    methods: {
        async addRegister(formulario){
           const datos = {
                descripcion: formulario.descripcion,
                fecha: formulario.fecha,
                hora: formulario.hora,
                seleccion_multiple: formulario.seleccion_multiple,
                multiseleccion: formulario.multiseleccion,
                ubicacion: formulario.ubicacion,
                numero: formulario.numero,
                precio: formulario.precio
            };

            console.log(datos)
            
            try {
                const response = await this.enviarDatos(datos);
                console.log(response);
                await this.getUsuarios();
            } catch (error) {
                console.error(error);
            }
        },
        async getUsuarios() {
            try {
                const response = await fetch('http://localhost:3000/datos');
                let data = await response.json();

                // Formateando las fechas de la tabla
                data.forEach((val, i) => {
                    const fecha = new Date(val.fecha);
                    
                    // Obtenemos el día, el mes y el año de la fecha
                    const day = fecha.getDate();
                    const month = fecha.getMonth() + 1;
                    const year = fecha.getFullYear();
                    
                    // Creamos una cadena con el formato 'DD/MM/YYYY'
                    const fechaFormateada = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
                    
                    data[i].fechaFormat = fechaFormateada;
                });
                this.datos = data
            } catch (error) {
                    console.log(error);
            }
        },
        async enviarDatos(datos){
            fetch('http://localhost:3000/datos', {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response)
            })
        },
        async del(id) {
            const confirmacion = confirm('¿Estás seguro de que quieres eliminar este dato?');
            if (confirmacion) {
              await fetch(`http://localhost:3000/datos/${id}`, {
                method: 'DELETE',
              });
              this.getUsuarios();
            }
        },
        openEditor(datos){
          this.modFormulario.id = datos.id;
          this.modFormulario.descripcion = datos.descripcion;
          this.modFormulario.fecha = datos.fecha;
          this.modFormulario.hora = datos.hora;
          this.modFormulario.seleccion_multiple = datos.seleccion_multiple;
          this.modFormulario.ubicacion = datos.ubicacion;
          this.modFormulario.numero = datos.numero;
          this.modFormulario.precio = datos.precio;
          this.showModForm = true
        },
        async editDatos(){
          const datos = {
            id: this.modFormulario.id,
            descripcion: this.modFormulario.descripcion,
            fecha: this.modFormulario.fecha,
            hora: this.modFormulario.hora,
            seleccion_multiple: this.modFormulario.seleccion_multiple,
            multiseleccion: this.modFormulario.multiseleccion,
            ubicacion: this.modFormulario.ubicacion,
            numero: this.modFormulario.numero,
            precio: this.modFormulario.precio
          };

          await fetch('http://localhost:3000/datos', {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response)
                this.getUsuarios();
            })
        }
      }
}

</script>

<style>
.form{
  margin-top:2em;
  margin-bottom: 2em;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.2);
  width: 400px;
  position: absolute;
  box-shadow: 0px 10px 33px 0px rgba(0,0,0,0.75);
  -webkit-box-shadow: 0px 10px 33px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 10px 33px 0px rgba(0,0,0,0.75);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>