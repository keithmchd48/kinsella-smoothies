<template>
  <div>
    <div v-if="!smoothie" class="edit-smoothie container z-depth-1 loader-class">
      <div class="loader"></div>
    </div>
    <div v-if="smoothie" class="edit-smoothie container z-depth-1">
      <h2>Edit {{ smoothie.title }} Smoothie</h2>
      <form @submit.prevent="editSmoothie" @keydown.enter.prevent>
        <div class="field title">
          <label for="title">Smoothie title:</label>
          <input id="title" type="text" name="title" v-model="smoothie.title">
        </div>
        <div v-for="(ing, index) in smoothie.ingredients" class="field ingredient" :key="index">
          <label>Ingredient:</label>
          <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
          <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
        </div>
        <div class="field add-ingredient">
          <label for="add-ingredient">Add an ingredient:</label>
          <input id="add-ingredient" type="text" name="add-ingredient"
                 @keydown.enter.prevent="addIng"
                 v-model="another">
        </div>
        <div class="field center-align">
          <p class="red-text" v-if="feedback">{{feedback}}</p>
          <button class="btn pink">Update Smoothie</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import db from '@/firebase/init'
  import slugify from "slugify";

  export default {
    name: 'EditSmoothie',
    data(){
      return{
        smoothie: null,
        another: null,
        feedback: null
      }
    },
    created () {
      let ref = db.collection('smoothies').doc(this.$route.params.id)
      ref.get().then (doc => {
          this.smoothie = doc.data()
          this.smoothie.id = doc.id
      })
    },
    methods: {
      addIng () {
        if (this.another) {
          this.smoothie.ingredients.push(this.another)
          this.another = null
          this.feedback = null
        } else {
          this.feedback = 'You must enter a value to add an ingredient!'
        }
      },
      editSmoothie () {
        if (this.smoothie.title && this.smoothie.ingredients.length > 0) {
          this.feedback = null
          this.smoothie.slug = slugify(this.smoothie.title, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
          db.collection('smoothies').doc(this.smoothie.id).update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
          }).then(() => {
              this.$router.push({name: 'Index'})
            }).catch(err => {
            console.log(err)
          })
        } else {
          this.feedback = 'You must have a title and atleast one ingredient!'
        }
      },
      deleteIng (ing) {
        this.smoothie.ingredients = this.smoothie.ingredients.filter(ingridient => {
          return ingridient != ing
        })
      }
    }
  }
</script>

<style>
  .edit-smoothie{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
  }
  .edit-smoothie h2{
    font-size: 2em;
    margin: 20px auto;
  }
  .edit-smoothie .field{
    margin: 20px auto;
    position: relative;
  }
  .edit-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }
</style>
