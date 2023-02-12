<template lang="">
  <div>
    <h1>Task</h1>
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
      <h1>Add Task</h1>
      <label for="project">Choose a project:</label>
      <select v-model="task.project_id" name="project">
        <option v-for="item in projects" :key="item.id" :value="item.title">
          {{ item.title }}
        </option>
      </select>
      <br />
      <label for="statu">Choose a statu:</label>
      <select v-model="task.statu_id" name="statu">
        <option v-for="item in status" :key="item.id" :value="item.name">
          {{ item.name }}
        </option>
      </select>

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
          v-model="task.title" />
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
          v-model="task.deadline" />
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
          v-model="task.description" />
      </div>
      <div class="text-center mt-6">
        <button
          class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="submit">
          Add
        </button>
      </div>
    </form>

    <h1>list :</h1>
    <table style="width: 100%">
      <tr>
        <th>Manager</th>
        <th>project</th>
        <th>statu</th>
        <th>title</th>
        <th>deadline</th>
        <th>description</th>
        <th>action</th>
      </tr>
      <tr v-for="task in tasks" :key="task.id">
        <td>{{ task.manager_id }}</td>
        <td>{{ task.project_id }}</td>
        <td>{{ task.statu_id }}</td>
        <td>{{ task.title }}</td>
        <td>{{ task.deadline }}</td>
        <td>{{ task.description }}</td>
        <td>
          <button @click="edit(task.id)">Edit</button>
          <button @click="deletee(task.id)">Delete</button>
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
      task: {
        manager_id: "",
        project_id: "",
        statu_id: "",
        title: "",
        deadline: "",
        description: "",
      },
      tasks: [],
      projects: [],
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
      this.task = {
        manager_id: "",
        project_id: "",
        statu_id: "",
        title: "",
        deadline: "",
        description: "",
      };
    },
    getProjects() {
      axios.get("projet/index").then((response) => {
        this.projects = response.data;
        console.log(response.data);
      });
    },
    getStatus() {
      axios.get("statu/index").then((response) => {
        this.status = response.data;
        console.log(response.data);
      });
    },
    add() {
      axios.post("task/store", this.task).then((response) => {
        this.task = {
          manager_id: "",
          project_id: "",
          statu_id: "",
          title: "",
          deadline: "",
          description: "",
        };
        this.get();
      });
    },
    get() {
      axios.get("task/index").then((response) => {
        this.tasks = response.data;
        console.log(response.data);
      });
    },
    deletee(id) {
      axios.delete("task/destroy/" + id).then((response) => {
        this.get();
      });
    },
    update(id) {
      axios.post("task/update/" + id, this.project).then((response) => {
        this.get();
        this.task = {
          manager_id: "",
          project_id: "",
          statu_id: "",
          title: "",
          deadline: "",
          description: "",
        };
        this.addArt = true;
        this.updatee = false;
      });
    },
    edit(id) {
      axios.get("task/edit/" + id).then((response) => {
        this.addArt = false;
        this.updatee = true;
        this.task = {
          manager_id: response.data.manager_id,
          project_id: response.data.project_id,
          statu_id: response.data.statu_id,
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
    this.getProjects();
    this.getStatus();
  },
};
</script>
<style lang=""></style>
