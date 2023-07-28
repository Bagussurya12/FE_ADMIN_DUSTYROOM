<template>
  <v-row>
    <v-col cols="10" md="8" offset="1" offset-md="2">
      <v-card>
        <v-toolbar color="black" dark>Detail Order</v-toolbar>
        <v-list lines="three">
          <v-list-item-subtitle class="d-flex justify-center my-6"
            ><h3>Detail Order</h3></v-list-item-subtitle
          >
          <v-list-item>
            <v-list-item-title>OrderId</v-list-item-title>
            <v-list-item-subtitle>{{ orderId }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>User Id</v-list-item-title>
            <v-list-item-subtitle>{{ userId }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Nama Pelanggan</v-list-item-title>
            <v-list-item-subtitle>{{ customerName }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Nomor Handphone</v-list-item-title>
            <v-list-item-subtitle>{{
              phoneNumberCustomer
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Email</v-list-item-title>
            <v-list-item-subtitle>{{ emailCustomer }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Warna Pesanan</v-list-item-title>
            <v-list-item-subtitle>{{ shirtColor }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Jenis Sablon</v-list-item-title>
            <v-list-item-subtitle>{{ printingType }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Jumlah Pesanan</v-list-item-title>
            <v-list-item-subtitle>{{ amountOrder }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Status Pesanan</v-list-item-title>
            <v-list-item-subtitle>{{ orderProcess }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Status Pembayaran</v-list-item-title>
            <v-list-item-subtitle>{{ paymentStatus }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Status</v-list-item-title>
            <v-list-item-subtitle>{{ status }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <v-list-item>
          <v-list-item-title>Desaign Pesanan</v-list-item-title>
          <img
            :src="require(`../../beckend-store/images/${image}`)"
            alt="Gambar"
          />
          {{ image }}
        </v-list-item>
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
      orderId: '',
      userId: '',
      image: '',
      customerName: '',
      phoneNumberCustomer: '',
      emailCustomer: '',
      shirtColor: '',
      shirtMaterial: '',
      amountOrder: '',
      printingType: '',
      status: '',
      paymentStatus: '',
      orderProcess: '',
    }
  },
  methods: {
    fetchDetailOrder() {
      this.$axios
        .$get(`/orders/${this.id}`)
        .then((response) => {
          console.log(response)
          this.orderId = response.Order._id
          this.userId = response.Order.userId
          this.image = response.Order.image
          this.customerName = response.Order.customerName
          this.phoneNumberCustomer = response.Order.phoneNumberCustomer
          this.emailCustomer = response.Order.emailCustomer
          this.shirtColor = response.Order.shirtColor
          this.shirtMaterial = response.Order.shirtMaterial
          this.amountOrder = response.Order.amountOrder
          this.printingType = response.Order.printingType
          this.status = response.Order.status
          this.paymentStatus = response.Order.paymentStatus
          this.orderProcess = response.Order.orderProcess
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
  },
  mounted() {
    this.fetchDetailOrder()
  },
}
</script>

<!-- <script>
  import { mapActions, mapGetters, mapState } from 'vuex'
  export default {
    middleware: ['authenticated'],
    asyncData({ params }) {
      return {
        id: params.id,
      }
    },
    computed: {
      ...mapState('order', {
        order: 'order',
      }),
      ...mapGetters('order', {
        getOrder: 'getOrder',
      }),
    },
    mounted() {
      const id = this.$route.params.id
      this.fetchData(id)
    },
    methods: {
      ...mapActions('order', ['fetchOrderById']),
      fetchData(id) {
        this.fetchOrderById(id)
      },
    },
  }
  </script> -->
