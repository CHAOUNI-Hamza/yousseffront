<template lang="">
  <div>
    <h1>projet</h1>
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
      <h1>Add project</h1>
      <div class="relative w-full mb-3">
        <label
          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password">
          title
        </label>
        <input
          type="text"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="text"
          v-model="project.title" />
      </div>
      <div class="relative w-full mb-3">
        <label
          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password">
          deadline
        </label>
        <input
          type="date"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="text"
          v-model="project.deadline" />
      </div>
      <div class="relative w-full mb-3">
        <label
          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password">
          description
        </label>
        <input
          type="text"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="text"
          v-model="project.description" />
      </div>

      <div class="text-center mt-6">
        <button
          class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="submit">
          Add
        </button>
      </div>
    </form>

    <form v-if="updatee" @submit.prevent="update(project.id)">
      <h2>Update Projet</h2>
      <div class="relative w-full mb-3">
        <label
          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password">
          title
        </label>
        <input
          type="text"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="text"
          v-model="project.title" />
      </div>
      <div class="relative w-full mb-3">
        <label
          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password">
          deadline
        </label>
        <input
          type="date"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="text"
          v-model="project.deadline" />
      </div>
      <div class="relative w-full mb-3">
        <label
          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password">
          description
        </label>
        <input
          type="text"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="text"
          v-model="project.description" />
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
        <th>Manager</th>
        <th>title</th>
        <th>deadline</th>
        <th>description</th>
        <th>action</th>
      </tr>
      <tr v-for="project in projects" :key="project.id">
        <td>{{ project.manager_id }}</td>
        <td>{{ project.title }}</td>
        <td>{{ project.deadline }}</td>
        <td>{{ project.description }}</td>
        <td>
          <button @click="edit(project.id)">Edit</button>
          <button @click="deletee(project.id)">Delete</button>
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
      project: {
        manager_id: "",
        title: "",
        deadline: "",
        description: "",
      },
      projects: [],
    };
  },
  validations() {
    return {};
  },
  methods: {
    returnAdd() {
      this.addArt = true;
      this.updatee = false;
      this.project = {
        title: "",
        deadline: "",
        description: "",
      };
    },
    add() {
      axios.post("projet/store", this.project).then((response) => {
        this.project = {
          title: "",
          deadline: "",
          description: "",
        };
        this.get();
      });
    },
    get() {
      axios.get("projet/index").then((response) => {
        this.projects = response.data;
        console.log(response.data);
      });
    },
    deletee(id) {
      axios.delete("projet/destroy/" + id).then((response) => {
        this.get();
      });
    },
    update(id) {
      axios.post("projet/update/" + id, this.project).then((response) => {
        this.get();
        this.project = {
          title: "",
          deadline: "",
          description: "",
        };
        this.addArt = true;
        this.updatee = false;
      });
    },
    edit(id) {
      axios.get("projet/edit/" + id).then((response) => {
        this.addArt = false;
        this.updatee = true;
        this.project = {
          id: response.data.id,
          manager_id: response.data.manager_id,
          title: response.data.title,
          deadline: response.data.deadline,
          description: response.data.description,
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
