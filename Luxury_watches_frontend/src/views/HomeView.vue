<script setup>
import dataservice from "../services/dataservice.js";
import { ref } from "vue";

const watches = ref([]);
const actPage = ref(1);
const lastPage = ref();
const searchString = ref("");
const limit = ref(8); // Új változó a limit tárolására

dataservice
  .getAllWatches(1, searchString.value, limit.value) // Hozzáadtuk a limit paramétert
  .then((resp) => {
    watches.value = resp.data;
    lastPage.value = Math.ceil(resp.headers["x-total-count"]/limit.value) // Módosítottuk a limit használatát
    console.log(lastPage.value);
  })
  .catch((err) => {
    console.log(err);
  });

const lep = (hova) => {
  actPage.value = hova;
  dataservice
    .getAllWatches(hova, searchString.value, limit.value) // Hozzáadtuk a limit paramétert
    .then((resp) => {
      watches.value = resp.data;
      console.log(watches.value);
    })
    .catch((err) => {
      console.log(err);
    });
};

const search = () => {
  actPage.value = 1
  dataservice
  .getAllWatches(1, searchString.value, limit.value) // Hozzáadtuk a limit paramétert
  .then((resp) => {
    watches.value = resp.data;
    lastPage.value = Math.ceil(resp.headers["x-total-count"]/limit.value) // Módosítottuk a limit használatát
    console.log(lastPage.value);
  })
  .catch((err) => {
    console.log(err);
  });
}

const setLimit = (newLimit) => { // Új függvény a limit beállítására
  limit.value = newLimit;
  search();
}
</script>

<template>
  <div class="container">
    <h1 class="text-center">Lapozás</h1>

    <div class="d-flex justify-content-center">
      <input type="text" class="form-control" name="" v-model="searchString" @keyup="search" id="">
      <button class="btn btn-primary" @click="search">Keresés</button>
      <!-- Új legördülő lista a limit beállítására -->
      <select v-model="limit" @change="setLimit($event.target.value)">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
      </select>
    </div>

    <nav
      class="d-flex justify-content-center"
      aria-label="Page navigation example"
    >
      <ul class="pagination">
        <li class="page-item">
          <a @click="lep(1)" class="page-link" href="#">Első</a> <!-- Új gomb az első oldalra ugrásra -->
        </li>
        <li class="page-item" v-if="actPage > 1">
          <a @click="lep(actPage - 1)" class="page-link" href="#">Previous</a>
        </li>
        <li class="page-item" v-if="actPage > 1">
          <a @click="lep(actPage - 1)" class="page-link" href="#">{{
            actPage - 1
          }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">{{ actPage }}</a>
        </li>
        <li class="page-item" v-if="actPage < lastPage">
          <a @click="lep(actPage + 1)" class="page-link" href="#">{{
            actPage + 1
          }}</a>
        </li>
        <li class="page-item" v-if="actPage < lastPage">
          <a @click="lep(actPage + 1)" class="page-link" href="#">Next</a>
        </li>
        <li class="page-item">
          <a @click="lep(lastPage)" class="page-link" href="#">Utolsó</a> <!-- Új gomb az utolsó oldalra ugrásra -->
        </li>
      </ul>
    </nav>

    <div class="row">
      <div v-for="watch in watches" class="col-12 col-md-6 col-xl-4">
        <div class="card w-100">
          <div class="card-body">
            <h5 class="card-title">{{ watch.Model }}</h5>
            <p class="card-text">{{ watch.Price_USD }}</p>
            <p class="text-center mb-0">
              <a href="vote.html" class="btn btn-primary">Vote</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
