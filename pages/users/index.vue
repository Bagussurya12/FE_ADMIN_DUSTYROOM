<template>
  <v-row>
    <v-col cols="10" offset="1">
      <v-card class="my-3">
        <v-toolbar color="black" dark>
          Users Management
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="search"
            single-line
            hide-details
          >
          </v-text-field>
        </v-toolbar>
        <v-card-text>
          <v-alert v-if="alert.show" :type="alert.type">
            {{ alert.message }}
          </v-alert>
          <div class="mb-4 d-flex">
            <v-breadcrumbs :items="breadCrumbs" class="pa-0" />
            <v-spacer></v-spacer>
            <v-btn to="/users/create" color="black" dark elevation="3" small>
              Add User <v-icon right>mdi-plus-circle</v-icon></v-btn
            >
          </div>
          <v-data-table
            :headers="headers"
            :items-per-page="10"
            :server-items-length="totalData"
            :items="users"
            :loading="loading"
            :search.sync="search"
            :options.sync="options"
            :footer-props="{
              itemsPerPageOptions: [10, 20, 30],
            }"
          >
            <template v-slot:top>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title
                    >Delete This Data {{ itemDelete.fullname }}?</v-card-title
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
              <v-btn :to="`users/edit/${item._id}`" icon color="black" dark>
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
    title: 'USERS MANAGEMENT',
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
      users: [],
      headers: [
        { text: '#', value: 'row', sortable: false },
        { text: 'Full Name', value: 'fullname', sortable: false },
        { text: 'Email', value: 'email', sortable: false },
        { text: 'Phone Number ', value: 'phoneNumber', sortable: false },
        { text: 'Role ', value: 'role', sortable: false },
        { text: '', value: 'actions', sortable: false },
      ],
      breadCrumbs: [
        {
          text: 'Users',
          disabled: true,
          to: '/users',
        },
      ],
    }
  },
  methods: {
    fetchUsers() {
      const { page, itemsPerPage } = this.options
      this.loading = true

      this.$axios
        .$get(`/users?page=${page}&limit=${itemsPerPage}&search=${this.search}`)
        .then((response) => {
          this.loading = false
          this.users = response.Users.docs
          this.totalData = response.Users.totalDocs

          // let startItem = (page - 1) * itemsPerPage + 1
          let startItem = response.Users.pagingCounter
          this.users.map((user) => (user.row = startItem++))
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
        .$delete(`/users/${id}`)
        .then((response) => {
          // Process Delete data table

          this.users = this.users.filter((user) => user._id != id)
          let params = {
            message: 'DELETE_SUCCESS',
            fullname: this.itemDelete.fullname,
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
            title: params.fullname,
          }))
      } else if (params.message == 'DELETE_SUCCESS') {
        ;(this.alert.show = true),
          (this.alert.type = 'success'),
          (this.alert.message = this.$t(params.message, {
            title: params.fullname,
          }))
      } else if (params.message == 'CREATE_SUCCESS') {
        ;(this.alert.show = true),
          (this.alert.type = 'success'),
          (this.alert.message = this.$t(params.message, {
            title: params.fullname,
          }))
      } else if (params.message == 'ID_NOT_FOUND') {
        ;(this.alert.show = true),
          (this.alert.type = 'error'),
          (this.alert.message = this.$t(params.message, {
            title: params.fullname,
          }))
      }
    },
  },
  watch: {
    options: {
      handler() {
        this.fetchUsers()
      },
      deep: true,
    },
    search: {
      handler() {
        this.fetchUsers()
      },
      // deep: true,
    },
  },
  mounted() {
    this.showAlert(this.$route.params)
  },
}
</script>
