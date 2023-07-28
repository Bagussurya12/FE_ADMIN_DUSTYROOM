<template>
  <v-row>
    <v-col cols="10" offset="1">
      <v-card class="my-3">
        <v-toolbar color="black" dark>
          Orders Management
          <v-spacer> </v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="search order"
            single-line
            hide-details
          >
          </v-text-field>
        </v-toolbar>
        <v-card-text>
          <v-alert v-if="alert.show" :type="alert.type">{{
            alert.message
          }}</v-alert>

          <div class="mb-4 d-flex">
            <v-breadcrumbs :items="breadCrumbs" class="pa-0" />
            <v-spacer></v-spacer>
            <v-btn to="/order/create" color="black" dark elevation="3" small
              >Add order
              <v-icon right> mdi-plus-circle</v-icon>
            </v-btn>
          </div>
          <v-data-table
            :headers="headers"
            :items-per-page="10"
            :server-items-length="totalData"
            :items="orders"
            :loading="loading"
            :searc.sync="search"
            :options.sync="options"
            :footer-props="{
              itemsPerPageOptions: [10, 20, 30],
            }"
          >
            <template v-slot:top>
              <v-dialog v-model="dialogDelete" max-width="400px">
                <v-card>
                  <v-card-title>
                    Hapus Data ini {{ itemDelete.customerName }}
                  </v-card-title>
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
              <v-btn :to="`order/detail/${item._id}`" icon color="black" dark>
                <v-icon class="small">mdi-loupe</v-icon>
              </v-btn>
              <v-btn :to="`order/edit/${item._id}`" icon color="black" dark>
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
  middlewar: ['authenticated'],
  head: {
    title: 'ORDER MANAGEMENT',
  },
  data() {
    return {
      itemDelete: '',
      dialogDelete: '',
      search: '',
      loading: false,
      options: {},
      totalData: 0,
      alert: {
        show: false,
        type: '',
        message: '',
      },
      orders: [],
      headers: [
        { text: '#', value: 'row', sortable: false },
        { text: 'ID Pesanan', value: '_id', sortable: false },
        { text: 'Nama Produk', value: 'product', sortable: false },
        { text: 'Nama Pemasan', value: 'customerName', sortable: false },
        {
          text: 'Nomor Handphone',
          value: 'phoneNumberCustomer',
          sortable: false,
        },
        { text: 'Email', value: 'emailCustomer', sortable: false },
        // { text: 'Barang Pesanan', value: '', sortable: false },
        { text: 'Warna', value: 'shirtColor', sortable: false },
        { text: 'Jumlah Barang', value: 'amountOrder', sortable: false },
        { text: 'Jumlah Total', value: 'amountPayment', sortable: false },
        { text: 'Jenis Sablon', value: 'printingType', sortable: false },
        { text: 'Status Pembayaran', value: 'paymentStatus', sortable: false },
        { text: 'Proses', value: 'orderProcess', sortable: false },
        { text: 'Di pesan', value: 'createdAt', sortable: false },
        { text: 'status', value: 'status', sortable: false },
        { text: '', value: 'actions', sortable: false },
      ],
      breadCrumbs: [
        {
          text: 'Order',
          disabled: true,
          to: '/order',
        },
      ],
    }
  },
  methods: {
    fetchOrders() {
      const { page, itemsPerPage } = this.options
      this.loading = true

      this.$axios
        .$get(
          `/orders/order?page=${page}&limit=${itemsPerPage}&search=${this.search}`
        )
        .then((response) => {
          this.loading = false
          this.orders = response.orders.docs
          this.totalData = response.orders.totalDocs

          // let startItem = (page - 1) * itemsPerPage + 1
          let startItem = response.orders.pagingCounter
          this.orders.map((orders) => (orders.row = startItem++))
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
        .$delete(`/orders/${id}`)
        .then((response) => {
          // Process Delete data table
          console.log(response)

          this.orders = this.orders.filter((order) => order._id != id)
          let params = {
            message: 'DELETE_SUCCESS',
            customerName: this.itemDelete.customerName,
          }
          this.showAlert(params)
          this.closeDelete()
        })
        .catch((error) => {
          this.loading = false
          console.log(error)
          this.closeDelete()
        })
    },
    currency(value) {
      return Intl.NumberFormat('en-US').format(value)
    },
    showAlert(params) {
      if (params.message == 'UPDATE_SUCCESS') {
        ;(this.alert.show = true),
          (this.alert.type = 'success'),
          (this.alert.message = this.$t(params.message, {
            customerName: params.customerName,
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
        this.fetchOrders()
      },
      deep: true,
    },
    search: {
      handler() {
        this.fetchOrders()
      },
    },
  },
  mounted() {
    this.showAlert(this.$route.params)
  },
}
</script>
