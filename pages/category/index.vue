<template>
  <v-row>
    <v-col cols="10" offset="1">
      <v-card class="my-3">
        <v-toolbar color="black" dark>
          Category Management
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="search"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
        <v-card-text>
          <v-alert v-if="alert.show" :type="alert.type">
            {{ alert.message }}
          </v-alert>
          <div class="mb-4 d-flex">
            <v-breadcrumbs :items="breadCrumbs" class="pa-0" />
            <v-spacer></v-spacer>
            <v-btn to="/category/create" color="black" dark elevation="3" small>
              Add Category <v-icon right>mdi-plus-circle</v-icon></v-btn
            >
          </div>
          <v-data-table
            :headers="headers"
            :items-per-page="10"
            :server-items-length="totalData"
            :items="categories"
            :loading="loading"
            :search.sync="search"
            :options.sync="options"
            :footer-props="{
              itemsPerPageOptions: [5, 10, 15],
            }"
          >
            <template v-slot:top>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title
                    >Hapus Data {{ itemDelete.title }}?</v-card-title
                  >
                  <v-card-actions>
                    <v-btn color="black " dark text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                      color="black"
                      dark
                      text
                      @click="deleteConfirm(itemDelete._id)"
                      >Delete</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn :to="`category/edit/${item._id}`" icon color="black" dark>
                <v-icon class="small">mdi-pencil</v-icon>
              </v-btn>
              <v-btn color="black" dark small @click="deleteItem(item)" icon>
                <v-icon class="small">mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ['authenticated'],
  head: {
    title: 'CATEGORIES MANAGEMENT',
  },
  data() {
    return {
      itemDelete: '',
      dialogDelete: false,
      search: '',
      loading: false,
      options: {},
      totalData: 0,
      alert: {
        show: false,
        type: '',
        message: '',
      },
      categories: [],
      headers: [
        { text: '#', value: 'row', sortable: false },
        { text: 'ID', value: '_id', sortable: false },
        { text: 'Name', value: 'title', sortable: false },
        { text: '', value: 'actions', sortable: false },
      ],
      breadCrumbs: [
        {
          text: 'Category',
          disabled: true,
          to: '/categories',
        },
      ],
    }
  },
  methods: {
    fetchCategory() {
      const { page, itemsPerPage } = this.options
      this.loading = true

      this.$axios
        .$get(
          `/categories/category?page=${page}&limit=${itemsPerPage}&search=${this.search}`
        )
        .then((response) => {
          this.loading = false
          this.categories = response.categories.docs
          this.totalData = response.categories.totalDocs

          // let startItem = (page - 1) * itemsPerPage + 1
          let startItem = response.categories.pagingCounter
          this.categories.map((category) => (category.row = startItem++))
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    deleteItem(item) {
      this.itemDelete = item
      this.dialogDelete = true
    },
    closeDelete() {
      this.dialogDelete = false
    },
    deleteConfirm(id) {
      this.$axios
        .$delete(`/categories/${id}`)
        .then((response) => {
          this.categories = this.categories.filter(
            (category) => category._id != id
          )
          let params = {
            message: 'DELETE_SUCCESS',
            categoryId: this.itemDelete.categoryId,
          }
          this.showAlert(params)
          this.closeDelete()
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.closeDelete()
        })
    },
    showAlert(params) {
      if (params.message == 'UPDATE_SUCCESS') {
        ;(this.alert.show = true),
          (this.alert.type = 'success'),
          (this.alert.message = this.$t(params.message, {
            title: params.title,
          }))
      } else if (params.message == 'DELETE_SUCCESS') {
        ;(this.alert.show = true),
          (this.alert.type = 'success'),
          (this.alert.message = this.$t(params.message, {
            title: params.title,
          }))
      } else if (params.message == 'CREATE_SUCCESS') {
        ;(this.alert.show = true),
          (this.alert.type = 'success'),
          (this.alert.message = this.$t(params.message, {
            title: params.title,
          }))
      } else if (params.message == 'ID_NOT_FOUND') {
        ;(this.alert.show = true),
          (this.alert.type = 'error'),
          (this.alert.message = this.$t(params.message, {
            title: params.title,
          }))
      }
    },
  },
  watch: {
    options: {
      handler() {
        this.fetchCategory()
      },
      deep: true,
    },
    search: {
      handler() {
        this.fetchCategory()
      },
    },
  },
  mounted() {
    this.showAlert(this.$route.params)
  },
}
</script>
