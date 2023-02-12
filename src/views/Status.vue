<template lang="">
  <div>
    <h1>Status</h1>
    <button>
      <router-link :to="{ name: 'Status' }">Status</router-link>
    </button>
    <button>
      <router-link :to="{ name: 'Task' }">Task</router-link>
    </button>
    <button>
      <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
    </button>

    <form v-if="addArt" @submit.prevent="add()">
      <h1>Add Statu</h1>
      <div class="relative w-full mb-3">
        <label
          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password">
          Name
        </label>
        <input
          type="text"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="text"
          v-model="statu.name" />
      </div>

      <div class="text-center mt-6">
        <button
          class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="submit">
          Add
        </button>
      </div>
    </form>

    <form v-if="updatee" @submit.prevent="update(statu.id)">
      <h1>Update Statu</h1>
      <div class="relative w-full mb-3">
        <label
          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password">
          Name
        </label>
        <input
          type="text"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="text"
          v-model="statu.name" />
      </div>

      <div class="text-center mt-6">
        <button
          class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="submit">
          Update
        </button>
        <button type="button" @click="returnAdd()">return Add</button>
      </div>
    </form>

    <h1>list :</h1>
    <table style="width: 100%">
      <tr>
        <th>Name</th>
      </tr>
      <tr v-for="statu in status" :key="statu.id">
        <td>{{ statu.name }}</td>
        <td>
          <button @click="edit(statu.id)">Edit</button>
          <button @click="deletee(statu.id)">Delete</button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      addArt: true,
      updatee: false,
      statu: {
        name: "",
      },
      status: [],
    };
  },
  validations() {
    return {};
  },
  methods: {
    returnAdd() {
      this.addArt = true;
      this.updatee = false;
      this.statu = {
        name: "",
      };
    },
    add() {
      axios.post("statu/store", this.statu).then((response) => {
        this.statu = {
          name: "",
        };
        this.get();
      });
    },
    get() {
      axios.get("statu/index").then((response) => {
        this.status = response.data;
        console.log(response.data);
      });
    },
    deletee(id) {
      axios.delete("statu/destroy/" + id).then((response) => {
        this.get();
      });
    },
    update(id) {
      axios.post("statu/update/" + id, this.statu).then((response) => {
        this.get();
        this.statu = {
          name: "",
        };
        this.addArt = true;
        this.updatee = false;
      });
    },
    edit(id) {
      axios.get("statu/edit/" + id).then((response) => {
        this.addArt = false;
        this.updatee = true;
        this.statu = {
          id: response.data.id,
          name: response.data.name,
        };
      });
    },
  },
  computed: {},
  mounted() {
    this.get();
  },
};
</script>
<style lang=""></style>
