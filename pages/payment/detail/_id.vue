<template>
  <v-row>
    <v-col cols="10" md="8" offset="1" offset-md="2">
      <v-card>
        <v-toolbar color="black" dark>Detail Order</v-toolbar>
        <v-list lines="three">
          <v-list-item-subtitle class="d-flex justify-center my-6"
            ><h3>Detail Pembayaran</h3></v-list-item-subtitle
          >
          <v-list-item>
            <v-list-item-title>Order ID</v-list-item-title>
            <v-list-item-subtitle>{{ payment.orderId }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>User Id</v-list-item-title>
            <v-list-item-subtitle>{{ payment.userId }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Nama Pelanggan</v-list-item-title>
            <v-list-item-subtitle>{{
              payment.senderName
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Nama Bank</v-list-item-title>
            <v-list-item-subtitle>{{ payment.bank }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Nomor Rekening</v-list-item-title>
            <v-list-item-subtitle>{{
              payment.bankAccount
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Jumlah Transfer</v-list-item-title>
            <v-list-item-subtitle
              >Rp.{{ currency(payment.amount) }}</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Di Kirim</v-list-item-title>
            <v-list-item-subtitle>{{ payment.createdAt }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Bukti Pembayaran</v-list-item-title>
            <v-img
              width="200px"
              height="200px"
              :src="requireImage(payment.image)"
            ></v-img>
          </v-list-item>
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
      payment: [],
    }
  },
  methods: {
    fetchDetailPayment() {
      this.$axios
        .$get(`/payments/${this.id}`)
        .then((response) => {
          this.payment = response.payment
          console.log(this.payment)
        })
        .catch((error) => {
          this.$router.push({
            name: 'payment___' + this.$i18n.locale,
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
  },
  mounted() {
    this.fetchDetailPayment()
  },
}
</script>
