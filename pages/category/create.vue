<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="black" dark>Add Category</v-toolbar>
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
          text: 'Create',
          disabled: true,
        },
      ],
      form: {
        title: '',
      },
      rules: {
        title: [(v) => !!v || this.$t('TITLE_IS_REQUIRED')],
      },
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.isDisable = true
        this.$axios
          .$post('/categories', this.form)
          .then((response) => {
            this.isDisable = false

            // Redirect To Users Page
            this.$router.push({
              name: 'category___' + this.$i18n.locale,
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
      }
    },
    // ...mapActions({
    //   fetchCategories: 'categories/fetchCategories',
    //   updateCategoryId: 'categories/updateCategoryId',
    // }),
  },
}
</script>
