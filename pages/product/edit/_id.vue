<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="black" dark>Edit Product</v-toolbar>
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
            <v-text-field
              name="Description"
              label="Description"
              type="text"
              color="black"
              :rules="rules.description"
              v-model="form.description"
              light
            />
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
export default {
  middleware: ['authenticated'],
  asyncData({ params }) {
    return {
      id: params.id,
    }
  },
  data() {
    return {
      isDisable: false,
      breadCrumbs: [
        {
          text: 'Products',
          disabled: false,
          to: '/products',
          exact: true,
        },
        {
          text: 'Edit Product',
          disabled: true,
        },
      ],
      form: {
        title: '',
        price: '',
        description: '',
      },
      rules: {
        title: [(v) => !!v || this.$t('TITLE_IS_REQUIRED')],
        price: [(v) => !!v || this.$t('PRICE_IS_REQUIRED')],
        description: [(v) => !!v || this.$t('DESCRIPTION_IS_REQUIRED')],
      },
    }
  },
  methods: {
    fetchDataProductById() {
      this.$axios
        .$get(`/products/${this.id}`)
        .then((response) => {
          //   console.log(response)
          this.form.title = response.product.title
          this.form.price = response.product.price
          this.form.description = response.product.description
        })
        .catch((error) => {
          this.$router.push({
            name: 'product___' + this.$i18n.locale,
            params: {
              message: 'ID_NOT_FOUND',
            },
          })
        })
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.isDisable = true
        this.$axios
          .$put(`/products/${this.id}`, this.form)
          .then((response) => {
            this.isDisable = false

            // Redirect To Users Page
            this.$router.push({
              name: 'product___' + this.$i18n.locale,
              params: {
                message: 'UPDATE_SUCCESS',
                title: this.form.title,
              },
            })
          })
          .catch((error) => {
            this.isDisable = false
          })
      }
    },
  },
  mounted() {
    this.fetchDataProductById()
  },
}
</script>
