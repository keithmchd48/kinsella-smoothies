<template>
  <div>
    <div v-if="loading" class="add-smoothie container z-depth-1 loader-class">
      <div class="loader"></div>
    </div>
    <div v-else class="add-smoothie container z-depth-1">
      <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
      <form @submit.prevent="addSmoothie">
        <div class="field title">
          <label for="title">Smoothie title:</label>
          <input id="title" type="text" name="title" v-model="title">
        </div>
        <div v-for="(ing, index) in ingredients" class="field ingredient" :key="index">
          <label>Ingredient:</label>
          <input type="text" name="ingredient" v-model="ingredients[index]">
          <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
        </div>
        <div class="field add-ingredient">
          <label for="add-ingredient">Add an ingredient (Press 'Enter' to add ingredient after typing the name) :</label>
          <input id="add-ingredient" type="text" name="add-ingredient"
                 @keydown.enter.prevent="addIng"
                 v-model="another">
        </div>
        <div class="field center-align">
          <p class="red-text" v-if="feedback">{{feedback}}</p>
          <button class="btn pink">Add Smoothie</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

  export default {
    name: 'AddSmoothie',
    data(){
      return{
        title: null,
        ingredients: [],
        another: null,
        feedback: null,
        slug: null,
        loading: false
      }
    },
    methods: {
      addSmoothie(){
        if (this.title && this.ingredients.length > 0) {
          this.feedback = null
          this.slug = slugify(this.title, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
          this.loading = true
          db.collection('smoothies').add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({name: 'Index'})
            this.loading = false
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.feedback = 'You must have a title and atleast one ingredient!'
        }
      },
      addIng () {
        if (this.another) {
          this.ingredients.push(this.another)
          this.another = null
          this.feedback = null
        } else {
          this.feedback = 'You must enter a value to add an ingredient!'
        }
      },
      deleteIng (ing) {
        this.ingredients = this.ingredients.filter(ingridient => {
          return ingridient != ing
        })
      }
    }
  }
</script>

<style>
  .add-smoothie{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
  }
  .add-smoothie h2{
    font-size: 2em;
    margin: 20px auto;
  }
  .add-smoothie .field{
    margin: 20px auto;
    position: relative;
  }
  .add-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }
</style>
