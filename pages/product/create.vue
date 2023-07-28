<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="black" dark>Add Product</v-toolbar>
        <v-card-text color="black" dark>
          <v-breadcrumbs :items="breadCrumbs" class="pa-0"></v-breadcrumbs>
          <v-form ref="form">
            <v-text-field
              name="title"
              label="title"
              type="text"
              color="black"
              :rules="rules.title"
              v-model="form.title"
              light
            />
            <v-text-field
              name="Price"
              label="price"
              type="text"
              color="black"
              :rules="rules.price"
              v-model="form.price"
              light
            />
            <v-file-input
              name="image"
              label="Image"
              variant="solo-inverted"
              color="black"
              :rules="rules.image"
              light
              v-model="form.image"
            ></v-file-input>
            <v-text-field
              name="Description"
              label="Description"
              type="text"
              color="black"
              :rules="rules.description"
              v-model="form.description"
              light
            />

            <v-text-field
              label="Category ID"
              color="black"
              light
              v-model="form.categoryId"
            >
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" dark @click="onSubmit" :disabled="isDisable">
            <span v-if="!isDisable">Save</span>
            <v-progress-circular
              v-else
              color="black"
              indeterminate
            ></v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
export default {
  middleware: ['authenticated'],
  data() {
    return {
      isDisable: false,
      breadCrumbs: [
        {
          text: 'Products',
          disabled: false,
          to: '/product',
          exact: true,
        },
        {
          text: 'Create',
          disabled: true,
        },
      ],
      form: {
        title: '',
        price: '',
        description: '',
        image: null,
        categoryId: '',
      },
      rules: {
        title: [(v) => !!v || this.$t('TITLE_IS_REQUIRED')],
        price: [(v) => !!v || this.$t('PRICE_IS_REQUIRED')],
        description: [(v) => !!v || this.$t('DESCRIPTION_IS_REQUIRED')],
        image: [(v) => !!v || this.$t('IMAGE_IS_REQUIRED')],
      },
    }
  },
  // computed: {
  //   ...mapState('categories', {
  //     categories: 'categories',
  //     categoryId: 'categoryId',
  //   }),
  // },
  methods: {
    onSubmit() {
      const formData = new FormData()
      formData.append('image', this.form.image[0])
      formData.append('title', this.form.title)
      formData.append('price', this.form.price)
      formData.append('description', this.form.description)
      formData.append('categoryId', this.form.categoryId)

      this.$axios
        .$post('/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.isDisable = false
          console.log(response.data)
          // Redirect To Products Page
          this.$router.push({
            name: 'product___' + this.$i18n.locale,
            params: {
              message: 'CREATE_SUCCESS',
              title: this.form.title,
            },
          })
        })
        .catch((error) => {
          console.log(error)
          this.isDisable = false
        })
    },
    // ...mapActions({
    //   fetchCategories: 'categories/fetchCategories',
    //   updateCategoryId: 'categories/updateCategoryId',
    // }),
  },
  // mounted() {
  //   this.fetchCategories()
  // },
}
</script>
