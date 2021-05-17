<template>
  <div class="crud">
    Caja de Incorporación de Datos

    <form>
      <div class="form-group row">
        <label for="identifier" class="col-sm-2 col-form-label">
          Identifier
        </label>
        <div class="col-sm-10">
          <input class="form-control" id="identifier" v-model="identifier" />
        </div>
      </div>

      <div class="form-group row">
        <label for="mac" class="col-sm-2 col-form-label"> Mac </label>
        <div class="col-sm-10">
          <input class="form-control" id="mac" v-model="mac" />
        </div>
      </div>

      <div class="form-group row">
        <label for="deviceTypes" class="col-sm-2 col-form-label">
          Device Type
        </label>
        <div class="col-sm-10">
          <select class="form-control" id="deviceTypes" v-model="deviceType">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </div>

      <div class="form-group row">
        <label for="technologyType" class="col-sm-2 col-form-label">
          Technology Type
        </label>
        <div class="col-sm-10">
          <select
            class="form-control"
            id="technologyTypes"
            v-model="technologyType"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
        </div>
      </div>

      <div class="form-group row">
        <label for="alias" class="col-sm-2 col-form-label"> Alias </label>
        <div class="col-sm-10">
          <input class="form-control" id="alias" v-model="alias" />
        </div>
      </div>

      <div class="form-group row">
        <label for="scope" class="col-sm-2 col-form-label"> Scope </label>
        <div class="col-sm-10">
          <input class="form-control" id="scope" v-model="scope" />
        </div>
      </div>

      <div class="form-group row">
        <label for="hasGps" class="col-sm-2 col-form-label"> Has GPS </label>
        <div class="col-sm-10">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="TRUE"
              v-model="hasGps"
            />
            <label class="form-check-label" for="inlineRadio1">TRUE</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="FALSE"
              v-model="hasGps"
            />
            <label class="form-check-label" for="inlineRadio2">FALSE</label>
          </div>
        </div>
      </div>
    </form>

    <b-button variant="info" @click="clicIngresar">Ingresar</b-button>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Identifier</th>
          <th scope="col">Mac</th>
          <th scope="col">Device Type</th>
          <th scope="col">Technology Type</th>
          <th scope="col">Alias</th>
          <th scope="col">Scope</th>
          <th scope="col">Has Gps</th>
          <th scope="col">Botones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in devicesList" :key="item.id">
          <th>{{ item.identifier }}</th>
          <th>{{ item.mac }}</th>
          <th>{{ item.device_type }}</th>
          <th>{{ item.technology_type }}</th>
          <th>{{ item.alias }}</th>
          <th>{{ item.scope }}</th>
          <th>{{ item.has_gps }}</th>

          <td>
            <b-button
              variant="warning"
              v-b-modal.modal-2
              type="button"
              @click="clicEditar(item.id)"
              >Editar</b-button
            >
            <b-button variant="danger" @click="clicEliminar(item.id)"
              >Borrar</b-button
            >
            <b-button
              v-b-modal.modal-1
              type="button"
              class="btn btn-light"
              @click="clicDetalle(item.id)"
            >
              Ver más
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <b-modal id="modal-1" title="¡Hola!">
      <!-- Loader -->
      <div v-if="!deviceDetails">
        <h2>Cargando . . .</h2>
      </div>

      <!-- Información -->
      <div v-else>
        <p class="my-4">Información</p>
        <p>ID: {{ deviceDetails.id }}</p>
        <p>Identifier: {{ deviceDetails.identifier }}</p>
        <p>Device: {{ deviceDetails.device_type_id }}</p>
        <p>Technology Type: {{ deviceDetails.technology_type_id }}</p>
        <p>Alias: {{ deviceDetails.alias }}</p>
        <p>Mac: {{ deviceDetails.mac }}</p>
        <p>Scope: {{ deviceDetails.scope }}</p>
        <p>Has GPS: {{ deviceDetails.has_gps }}</p>
        <p>Active: {{ deviceDetails.active }}</p>
        <p>Icon id: {{ deviceDetails.icon_id }}</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Crud",
  data() {
    return {
      identifier: "",
      mac: "",
      deviceType: "",
      technologyType: "",
      alias: "",
      scope: "",
      hasGps: "",
      deviceDetails: [],
    };
  },
  methods: {
    ...mapActions([
      "login",
      "getDevices",
      "verDetalles",
      "addNewDevice",
      "killData",
      "dataChange",
    ]),
    async clicIngresar() {
      let newDevice = {
        identifier: this.identifier,
        mac: this.mac,
        device_type_id: parseInt(this.deviceType),
        technology_type_id: parseInt(this.technologyType),
        alias: this.alias,
        scope: parseInt(this.scope),
        has_gps: Boolean(this.hasGps),
      };
      console.log(newDevice);
      this.addNewDevice(newDevice);
    },
    async clicDetalle(itemId) {
      let deviceDetails = await this.verDetalles(itemId);
      this.deviceDetails = deviceDetails;

      // Otras cosas local en componente
    },
    async clicEliminar(itemId) {
      //alert("Eliminaste el dato");
      let killingData = await this.killData(itemId);
    },
    async clicEditar(itemId) {
      let dataModificated = await this.dataChange(itemId);
    },
  },
  async mounted() {
    let loginData = {
      email: "demo@thegrouplab.com",
      password: "demo",
    };
    // await this.login(loginData);
    await this.getDevices();
  },
  computed: {
    ...mapGetters(["devicesList"]),
  },
};
</script>
