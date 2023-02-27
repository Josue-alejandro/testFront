<template>
    <div class="back">
    <div class="form bg-white">
      <div class="mb-4">
          <h4>Nuevo registro</h4> 
      </div>
    <form>
      <div class="form-group">
        <label for="texto">Descripcion</label>
        <input type="text" class="form-control" id="texto" v-model="formulario.descripcion">
      </div>
      <div class="d-flex justify-content-between mt-2">
        <div class="form-group">
          <label for="fecha">Fecha</label>
          <input type="date" class="form-control" id="fecha" v-model="formulario.fecha">
        </div>
        <div class="form-group">
          <label for="hora">Hora</label>
          <input type="time" class="form-control" id="hora" v-model="formulario.hora">
        </div>
      </div>
      
      <div class="form-group mt-2">
        <label for="seleccion_multiple">Selección</label>
        <select multiple class="form-control" id="seleccion_multiple" v-model="formulario.seleccion_multiple">
          <option>opcion1</option>
          <option>opcion2</option>
          <option>opcion3</option>
        </select>
      </div>
      <div class="form-group mt-2">
        <label for="seleccion_multiple">Selección múltiple</label>
        <select multiple class="form-control" id="seleccion_multiple" v-model="formulario.multiseleccion">
          <option>opcion1</option>
          <option>opcion2</option>
          <option>opcion3</option>
        </select>
      </div>
      <div class="form-group mt-2">
        <label for="columna4">Ubicacion</label>
        <input type="text" class="form-control" id="columna4" v-model="formulario.ubicacion">
      </div>
      <div class="form-group mt-2">
        <label for="columna5">Numero</label>
        <input type="number" class="form-control" id="columna5" v-model="formulario.numero">
      </div>
      <div class="form-group mt-2">
        <label for="columna6">Precio</label>
        <input type="number" class="form-control" id="columna6" step="0.01" v-model="formulario.precio">
      </div>
      <button type="submit" class="btn btn-danger btn-sm mt-4" @click.prevent="this.$emit('closeModal')">Cancelar</button>
      <button type="submit" class="btn btn-primary btn-sm mt-4" @click.prevent="this.$emit('createRegister', this.formulario)">Enviar</button>
    </form>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
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
        }
      }
    },
}
</script>

<style>
.back{
    width:100%;
    height:100%;
    position: absolute;
    top: 0%;
    left: 0%;
    display: flex;
    justify-content: center;
}
</style>