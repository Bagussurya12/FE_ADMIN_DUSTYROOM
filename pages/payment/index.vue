<template>
  <v-row>
    <v-col cols="10" offset="1">
      <v-card class="my-3">
        <v-toolbar color="black" dark>
          Payment Management
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
            <v-btn to="/payment/create" color="black" dark elevation="3" small>
              Add Payment <v-icon right>mdi-plus-circle</v-icon>
            </v-btn>
          </div>
          <v-data-table
            :headers="headers"
            :items-per-page="10"
            :server-items-length="totalData"
            :items="payments"
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
                    >Delete This Data {{ itemDelete.orderId }}?</v-card-title
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
                    >
                      Delete
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn :to="`payment/detail/${item._id}`" icon color="black" dark>
                <v-icon class="small">mdi-loupe</v-icon>
              </v-btn>
              <v-btn :to="`payment/edit/${item._id}`" icon color="black" dark>
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
import { mapState } from 'vuex'
export default {
  middleware: ['authenticated'],
  head: {
    title: 'PAYMENTS MANAGEMENT',
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
      payments: [],
      headers: [
        { text: '#', value: 'row', sortable: false },
        { text: 'ID', value: '_id', sortable: false },
        { text: 'USER ID', value: 'userId', sortable: false },
        { text: 'ORDER ID', value: 'orderId', sortable: false },
        { text: 'SENDER', value: 'senderName', sortable: false },
        { text: 'BANK NAME', value: 'bank', sortable: false },
        { text: 'BANK ACCOUNT', value: 'bankAccount', sortable: false },
        { text: 'AMOUNT', value: 'amount', sortable: false },
        { text: 'IMAGE', value: 'image', sortable: false },
        { text: 'STATUS', value: 'status', sortable: false },
        { text: '', value: 'actions', sortable: false },
      ],
      breadCrumbs: [
        {
          text: 'PAYMENTS',
          disabled: true,
          to: '/payment',
        },
      ],
    }
  },
  methods: {
    fetchPayments() {
      const { page, itemsPerPage } = this.options
      this.loading = true

      this.$axios
        .$get(
          `/payments/payments?page=${page}&limit=${itemsPerPage}&search=${this.search}`
        )
        .then((response) => {
          this.loading = false
          this.payments = response.payment.docs
          this.totalData = response.payment.totalDocs
          console.log(response)
          let startItem = response.payment.pagingCounter
          this.payments.map((payment) => (payment.row = startItem++))
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
        .$delete(`/payments/${id}`)
        .then((response) => {
          this.payments = this.payments.filter((payment) => payment._id != id)
          let params = {
            message: 'DELETE_SUCCESS',
            orderId: this.itemDelete.orderId,
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
        this.fetchPayments()
      },
      deep: true,
    },
    search: {
      handler() {
        this.fetchPayments()
      },
    },
  },
  mounted() {
    this.showAlert(this.$route.params)
  },
}
</script>
