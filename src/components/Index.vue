<template>
  <div>
    <div v-if="loading" class="container loader-class">
      <div class="loader"></div>
    </div>
    <div v-else class="index container">
      <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
        <div class="card-content">
          <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
          <h2 class="indigo-text">{{ smoothie.title }}</h2>
          <ul class="ingredients">
            <li v-for="(ing, index) in smoothie.ingredients" :key="index">
              <span class="chip">{{ ing }}</span>
            </li>
          </ul>
        </div>
        <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
export default {
  name: 'Index',
  data () {
    return {
      smoothies: [],
      loading: false
    }
  },
  created() {
    this.loading = true
    // fetch data from firestore
    db.collection('smoothies').get()
    .then(snapshot => {
      this.loading = false
      // snapshot contains array of docs
      snapshot.forEach(doc => {
        this.smoothies.push({
          id: doc.id,
          title: doc.data().title,
          slug: doc.data().slug,
          ingredients: doc.data().ingredients
        })
      })
    })
  },
  methods: {
    deleteSmoothie (id) {
      // delete doc from firestore
      db.collection('smoothies').doc(id).delete()
      .then (() => {
        this.smoothies = this.smoothies.filter(sm => {
          return sm.id !== id
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    height: 100vh;
  }
  .index{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
  }
  .index h2{
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }
  .index .ingredients{
    margin: 30px auto;
  }
  .index .ingredients li{
    display: inline-block;
  }
  .index .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
    transition: color 0.5s ease;
  }
  .delete:hover {
    color: #e91e63;
  }
</style>
