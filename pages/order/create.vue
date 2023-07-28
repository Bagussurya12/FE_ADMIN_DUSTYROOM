<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="black" dark> Add Order</v-toolbar>
        <v-card-text>
          <v-breadcrumbs :items="breadCrumbs"></v-breadcrumbs>
          <v-form
            ref="form"
            max-width="200"
            method="post"
            enctype="multipart/form-data"
          >
            <v-text-field
              name="product"
              label="Masukan Produk"
              type="text"
              color="black"
              :rules="rules.product"
              v-model="form.product"
            ></v-text-field>
            <v-text-field
              name="customer"
              label="Nama Pelanggan"
              type="text"
              color="black"
              :rules="rules.customerName"
              v-model="form.customerName"
            ></v-text-field>
            <v-text-field
              name="email"
              label="Email Pelanggan"
              type="email"
              color="black"
              :rules="rules.emailCustomer"
              v-model="form.emailCustomer"
            ></v-text-field>
            <v-text-field
              name="Phone Number"
              label="Nomor Handphone Pelanggan"
              type="number"
              color="black"
              :rules="rules.phoneNumberCustomer"
              v-model="form.phoneNumberCustomer"
            ></v-text-field>
            <v-text-field
              name="Address"
              label="Alamat Pengiriman"
              type="number"
              color="black"
              v-model="form.address"
            ></v-text-field>
            <v-text-field
              name="color"
              label="Warna Produk"
              placeholder="Contoh Merah Maroon"
              type="text"
              color="black"
              :rules="rules.shirtColor"
              v-model="form.shirtColor"
            ></v-text-field>
            <v-text-field
              name="size"
              label="Ukuran"
              placeholder="S, L, M"
              type="text"
              color="black"
              v-model="form.size"
            ></v-text-field>
            <v-select
              name="printing type"
              label="Jenis Sablon"
              type="text"
              color="black"
              :rules="rules.printingType"
              :items="printingType"
              v-model="form.printingType"
            ></v-select>
            <v-file-input
              type="file"
              name="image"
              accept="image/jpeg, image/png, image/jpeg"
              label="Upload Design"
              placeholder="Max 1mb"
              variant="solo-inverted"
              color="black"
              light
              :rules="rules.image"
              v-model="form.image"
              show-size
              counter
              multiple
            ></v-file-input>
            <v-text-field
              name="amount"
              label="Jumlah Pesanan"
              type="number"
              color="black"
              :rules="rules.amountOrder"
              v-model="form.amountOrder"
            ></v-text-field>
            <v-text-field
              name="description"
              label="Deskripsi Pesanan"
              type="text"
              color="black"
              :rules="rules.description"
              v-model="form.description"
            ></v-text-field>
            <v-text-field
              name="amount payment"
              label="Total Harga Pesanan"
              type="number"
              color="black"
              :rules="rules.amountPayment"
              v-model="form.amountPayment"
            ></v-text-field>
            <v-text-field
              name="shipping Cost"
              label="Ongkos Kirim"
              type="number"
              color="black"
              v-model="form.amountPayment"
            ></v-text-field>
            <v-text-field
              name="totalPayment"
              label="Total Pembayaran"
              type="number"
              color="black"
              v-model="form.totalPayment"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" dark @click="onSubmit" :disabled="isDisable">
            <span v-if="!isDisable">Add</span>
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
      printingType: ['Plastisol', 'Rubber', 'DTF'],

      breadCrumbs: [
        {
          text: 'Order',
          disabled: false,
          to: '/order',
          exact: true,
        },
        {
          text: 'Create',
          disabled: true,
        },
      ],
      form: {
        product: '',
        customerName: '',
        phoneNumberCustomer: '',
        emailCustomer: '',
        shirtColor: '',
        printingType: '',
        amountOrder: '',
        image: null,
        description: '',
        amountPayment: '',
        shippingCost: '',
        address: '',
        size: '',
        totalPayment: '',
      },
      rules: {
        product: [(v) => !!v || this.$t('PRODUCT_IS_REQUIRED')],
        customerName: [(v) => !!v || this.$t('CUSTOMER_NAME_IS_REQUIRED')],
        emailCustomer: [(v) => !!v || this.$t('EMAIL_IS_REQUIRED')],
        phoneNumberCustomer: [
          (v) => !!v || this.$t('PHONE_NUMBER_IS_REQUIRED'),
        ],
        shirtColor: [(v) => !!v || this.$t('COLOR_IS_REQUIRED')],
        printingType: [(v) => !!v || this.$t('PRINTING_TYPE_IS_REQUIRED')],
        amountOrder: [(v) => !!v || this.$t('AMOUNT_IS_REQUIRED')],
        image: [(v) => !!v || this.$t('IMAGE_IS_REQUIRED')],
        description: [(v) => !!v || this.$t('DESCRIPTION_IS_REQUIRED')],
        amountPayment: [(v) => !!v || this.$t('AMOUNT_PAYMENT_IS_REQUIRED')],
      },
    }
  },
  methods: {
    onSubmit() {
      const formData = new FormData()
      formData.append('image', this.form.image[0])
      formData.append('product', this.form.product)
      formData.append('customerName', this.form.customerName)
      formData.append('emailCustomer', this.form.emailCustomer)
      formData.append('phoneNumberCustomer', this.form.phoneNumberCustomer)
      formData.append('shirtColor', this.form.shirtColor)
      formData.append('printingType', this.form.printingType)
      formData.append('amountOrder', this.form.amountOrder)
      formData.append('description', this.form.description)
      formData.append('amountPayment', this.form.amountPayment)
      formData.append('size', this.form.size)
      formData.append('address', this.form.address)
      formData.append('shippingCost', this.form.shippingCost)
      formData.append('totalPayment', this.form.totalPayment)

      this.$axios
        .$post('/orders', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.isDisable = false
          console.log(response.data)
          this.$router.push({
            name: 'order___' + this.$i18n.locale,
            params: {
              message: 'CREATE_SUCCESS',
              title: this.form.customerName,
            },
          })
        })
        .catch((error) => {
          console.log(error)
          this.isDisable = false
        })
    },
  },
}
</script>
