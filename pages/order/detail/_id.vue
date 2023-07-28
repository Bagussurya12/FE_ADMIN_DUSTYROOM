<template>
  <v-row>
    <v-col cols="10" md="8" offset="1" offset-md="2">
      <v-card>
        <v-toolbar color="black" dark class="no-print">Detail Order</v-toolbar>
        <v-list lines="three">
          <v-list-item-subtitle class="d-flex justify-center my-6"
            ><h3>Detail Order</h3></v-list-item-subtitle
          >
          <v-list-item>
            <v-list-item-title>OrderId</v-list-item-title>
            <v-list-item-subtitle>{{ order._id }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>User Id</v-list-item-title>
            <v-list-item-subtitle>{{ order.userId }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Nama Pelanggan</v-list-item-title>
            <v-list-item-subtitle>{{
              order.customerName
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Nomor Handphone</v-list-item-title>
            <v-list-item-subtitle>{{
              order.phoneNumberCustomer
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Email</v-list-item-title>
            <v-list-item-subtitle>{{
              order.emailCustomer
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Alamat Pengiriman</v-list-item-title>
            <v-list-item-subtitle>{{ order.address }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Produk Pesanan</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{
              order.product
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Warna Pesanan</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{
              order.shirtColor
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Jenis Sablon</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{
              order.printingType
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Ukuran</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{
              order.size
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Jumlah Pesanan</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{
              order.amountOrder
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Status Pesanan</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{
              order.orderProcess
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Total Harga Pesanan</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold"
              >Rp.{{ currency(order.amountPayment) }}</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Ongkos Kirim</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold"
              >Rp.{{ currency(order.shippingCost) }}</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Total Pembayaran</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">
              <h3 class="total">
                Rp.{{ currency(order.totalPayment) }}
              </h3></v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Status Pembayaran</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{
              order.paymentStatus
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Status</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{
              order.status
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Deskripsi Pesanan</v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold">{{
              order.description
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item class="no-print">
            <v-list-item-title>Desaign Pesanan </v-list-item-title>
            <v-img
              class="mt-5 mb-10"
              :src="requireImage(order.image)"
              width="200px"
            ></v-img>
          </v-list-item>
        </v-list>
        <v-list class="d-flex justify-center mb-6 no-print">
          <v-btn
            color="black"
            dark
            class="ml-4 mr-4 mb-6 no-print"
            @click="printOrder"
          >
            Cetak Data
            <v-spacer></v-spacer>
            <v-icon class="small">mdi-printer</v-icon>
          </v-btn>
          <v-btn color="black" dark class="ml-4 mr-4 mb-6 no-print">
            <a
              :href="requireImage(order.image)"
              download
              class="text-decoration-none white--text mr-5 no-print"
            >
              Unduh Desaign</a
            >
            <v-icon class="small">mdi-tray-arrow-down</v-icon>
          </v-btn>
        </v-list>
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
      order: [],
    }
  },
  methods: {
    fetchDetailOrder() {
      this.$axios
        .$get(`/orders/${this.id}`)
        .then((response) => {
          console.log(response)
          this.order = response.Order
        })
        .catch((error) => {
          this.$router.push({
            name: 'order___' + this.$i18n.locale,
            params: {
              message: 'ID_NOT_FOUND',
            },
          })
        })
    },
    requireImage(imagePath) {
      if (!imagePath) {
        return '' // Atau kembalikan placeholder gambar atau teks kesalahan
      }
      return require(`../../../../beckend-store/images/${imagePath}`)
    },
    currency(value) {
      return Intl.NumberFormat('en-US').format(value)
    },
    printOrder() {
      window.print()
    },
  },
  mounted() {
    this.fetchDetailOrder()
  },
  computed: {},
}
</script>

<style>
.total {
  color: red;
}
@media print {
  .no-print {
    display: none;
  }
}
</style>
