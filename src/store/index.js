import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    urlBase: "https://demo.thegrouplab.com/api",
    currentUser: null,
    devices: null,
    ingresos: [],
    nuevoIngreso: "",
    detallesId: {},
  },
  mutations: {
    SET_CURRENTUSER(state, currentUser) {
      state.currentUser = currentUser;
    },
    SET_DEVICES(state, devices) {
      state.devices = devices;
    },
    SET_NUEVO(state, nuevoIngreso) {
      state.nuevoIngreso.push(ingresos);
    },
    SET_DETAILS(state, detallesId) {
      state.detallesId = detallesId;
    },
    DELETE_DEVICE(state, itemId) {
      let indexFiltrado = state.devices.findIndex((item) => {
        return (item.id = itemId);
      });
      Vue.delete(state.devices, indexFiltrado);
    },
  },
  actions: {
    async login({ commit, state }, currentLogin) {
      try {
        let res = await axios.post(state.urlBase + "/login", currentLogin);
        let { access_token, user } = res.data;
        //console.log(res.data);
        commit("SET_CURRENTUSER", user);
        localStorage.setItem("access_token", access_token);
        return;
      } catch (error) {
        console.log(error);
        return;
      }
    },
    async getDevices({ commit, state }) {
      let access_token = localStorage.getItem("access_token");

      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      axios
        .get(state.urlBase + "/devices", config)
        .then((res) => {
          let { data } = res.data;
          commit("SET_DEVICES", data);
          return;
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    },
    async verDetalles({ state }, id) {
      let access_token = localStorage.getItem("access_token");
      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      try {
        let res = await axios.get(state.urlBase + "/device/" + id, config);
        let data = res.data;
        //console.log(res.data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async addNewDevice({ state }, newDevice) {
      let access_token = localStorage.getItem("access_token");
      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      try {
        let res = await axios.post(
          state.urlBase + "/device",
          newDevice,
          config
        );
        let data = res.data;
        //console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    async killData({ state, commit }, id) {
      let access_token = localStorage.getItem("access_token");
      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      try {
        let res = await axios.delete(state.urlBase + "/device/" + id, config);
        let data = res.data;
        console.log(data);
        commit("DELETE_DEVICE", id);
      } catch (error) {
        console.log(error);
      }
    },
    async dataChange({ state }, dataModificated) {
      let access_token = localStorage.getItem("access_token");
      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      try {
        let res = await axios.put(
          state.urlBase + "/device",
          config,
          dataModificated
        );
        let data = res.data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    devicesList(state) {
      return state.devices;
    },
  },
  modules: {},
});
