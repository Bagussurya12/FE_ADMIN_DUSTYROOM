<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="black" dark>Edit Category</v-toolbar>
        <v-card-text color="black" dark>
          <v-breadcrumbs :items="breadCrumbs" class="pa-0"></v-breadcrumbs>
          <v-form ref="form">
            <v-text-field
              name="Title"
              label="Title"
              type="text"
              color="black"
              :rules="rules.title"
              v-model="form.title"
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
          text: 'Categories',
          disabled: false,
          to: '/category',
          exact: true,
        },
        {
          text: 'Edit User',
          disabled: true,
        },
      ],
      form: {
        title: '',
      },
      rules: {
        fullname: [(v) => !!v || this.$t('Full_Name_Is_Required')],
      },
    }
  },
  methods: {
    fetchDataCategoryById() {
      this.$axios
        .$get(`/categories/${this.id}`)
        .then((response) => {
          //   console.log(response)
          this.form.title = response.category.title
        })
        .catch((error) => {
          this.$router.push({
            name: 'category___' + this.$i18n.locale,
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
          .$put(`/categories/${this.id}`, this.form)
          .then((response) => {
            this.isDisable = false

            // Redirect To Users Page
            this.$router.push({
              name: 'category___' + this.$i18n.locale,
              params: {
                message: 'UPDATE_SUCCESS',
                title: this.form.title,
              },
            })
          })
          .catch((error) => {})
      }
    },
  },
  mounted() {
    this.fetchDataCategoryById()
  },
}
</script>
