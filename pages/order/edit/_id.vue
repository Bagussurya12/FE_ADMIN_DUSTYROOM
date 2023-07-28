<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="black" dark>Edit Product</v-toolbar>
        <v-card-text color="black" dark>
          <v-breadcrumbs :items="breadCrumbs" class="pa-0"></v-breadcrumbs>
          <v-card-text color="black" dark></v-card-text>
          <v-form ref="form">
            <v-text-field
              name="id"
              label="ID PESANAN"
              type="text"
              color="black"
              v-model="form.id"
              light
              :disabled="true"
            />
            <v-text-field
              name="customerName"
              label="Nama Pemesan"
              type="text"
              color="black"
              v-model="form.customerName"
              light
              :disabled="true"
            />
            <v-text-field
              name="phone Number Customer"
              label="Nomor Handphone"
              type="text"
              color="black"
              v-model="form.phoneNumberCustomer"
              light
              :disabled="true"
            />
            <v-text-field
              name="Email Customer"
              label="Email"
              type="text"
              color="black"
              v-model="form.emailCustomer"
              light
              :disabled="true"
            />
            <v-text-field
              name="Alamat Pengiriman"
              label="text"
              type="text"
              color="black"
              v-model="form.address"
              light
              :disabled="true"
            />
            <v-text-field
              name="product"
              label="Produk"
              type="text"
              color="black"
              :rules="rules.product"
              v-model="form.product"
              light
            />
            <v-text-field
              name="Shirt Color"
              label="Warna"
              type="text"
              color="black"
              :rules="rules.shirtColor"
              v-model="form.shirtColor"
              light
            />
            <v-text-field
              name="Printing Type"
              label="Printing Type"
              type="text"
              color="black"
              :rules="rules.printingType"
              v-model="form.printingType"
              light
            />
            <v-text-field
              name="Size"
              label="Ukuran"
              v-model="form.size"
              type="text"
              color="black"
            ></v-text-field>
            <v-text-field
              name="Amount Order"
              label="Jumlah Pesanan"
              type="text"
              color="black"
              :rules="rules.amountOrder"
              v-model="form.amountOrder"
              light
            />
            <v-text-field
              name="Amount Order"
              label="Total Harga Pesanan"
              type="text"
              color="black"
              :rules="rules.amountPayment"
              v-model="form.amountPayment"
              light
            />
            <v-text-field
              name="Shipping Cost"
              label="Ongkos Kirim"
              type="number"
              color="black"
              v-model="form.shippingCost"
              light
            />
            <v-text-field
              name="Total Payment"
              label="Total Pembayaran"
              type="number"
              color="black"
              v-model="form.totalPayment"
              light
            />
            <v-select
              name="payment Status"
              label="payment Status"
              type="text"
              color="black"
              :rules="rules.paymentStatus"
              v-model="form.paymentStatus"
              :items="paymentStatus"
              light
            />
            <v-text-field
              name="Process"
              label="Process"
              type="text"
              color="black"
              :rules="rules.Process"
              v-model="form.orderProcess"
              light
            />
            <v-text-field
              name="status"
              label="status"
              type="text"
              color="black"
              :rules="rules.status"
              v-model="form.status"
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
      paymentStatus: ['Paid', 'Not Paid'],
      isDisable: false,
      breadCrumbs: [
        {
          text: 'Orders',
          disabled: false,
          to: '/order',
          exact: true,
        },
        {
          text: 'Update Order',
          disabled: true,
        },
      ],
      form: {
        customerName: '',
        phoneNumberCustomer: '',
        emailCustomer: '',
        address: '',
        shirtColor: '',
        size: '',
        printingType: '',
        product: '',
        amountOrder: '',
        amountPayment: '',
        shippingCost: '',
        paymentStatus: '',
        totalPayment: '',
        status: '',
        orderProcess: '',
      },
      rules: {
        shirtColor: [(v) => !!v || this.$t('SHIRT_COLOR_IS_REQUIRED')],
        product: [(v) => !!v || this.$t('PRODUCT_IS_REQUIRED')],
        amountOrder: [(v) => !!v || this.$t('AMOUNT_IS_REQUIRED')],
        printingType: [(v) => !!v || this.$t('PRINTING_TYPE_IS_REQUIRED')],
        Process: [(v) => !!v || this.$t('PROCESS_IS_REQUIRED')],
        status: [(v) => !!v || this.$t('STATUS_IS_REQUIRED')],
        paymentStatus: [(v) => !!v || this.$t('STATUS_IS_REQUIRED')],
        amountPayment: [(v) => !!v || this.$t('AMOUNT_PAYMENT_IS_REQUIRED')],
      },
    }
  },
  methods: {
    fetchDataOrderById() {
      this.$axios
        .$get(`/orders/${this.id}`)
        .then((response) => {
          console.log(response)
          this.form.id = response.Order._id
          this.form.customerName = response.Order.customerName
          this.form.phoneNumberCustomer = response.Order.phoneNumberCustomer
          this.form.emailCustomer = response.Order.emailCustomer
          this.form.shirtColor = response.Order.shirtColor
          this.form.product = response.Order.product
          this.form.amountOrder = response.Order.amountOrder
          this.form.printingType = response.Order.printingType
          this.form.paymentStatus = response.Order.paymentStatus
          this.form.status = response.Order.status
          this.form.amountPayment = response.Order.amountPayment
          this.form.process = response.Order.orderProcess
          this.form.address = response.Order.address
          this.form.size = response.Order.size
          this.form.shippingCost = response.Order.shippingCost
          this.totalPayment = response.Order.totalPayment
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
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.isDisable = true
        this.$axios
          .$put(`/orders/${this.id}`, this.form)
          .then((response) => {
            this.isDisable = false

            // Redirect To Users Page
            this.$router.push({
              name: 'order___' + this.$i18n.locale,
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
    this.fetchDataOrderById()
  },
}
</script>
