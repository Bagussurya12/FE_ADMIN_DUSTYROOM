<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="black" dark>Add Payment</v-toolbar>
        <v-card-text color="black" dark>
          <v-breadcrumbs :items="breadCrumbs" class="pa-0"></v-breadcrumbs>
          <v-form
            ref="form"
            max-width="200"
            method="post"
            enctype="multipart/form-data"
          >
            <v-text-field
              name="orderId"
              label="ID ORDER"
              type="text"
              color="black"
              :rules="rules.orderId"
              v-model="form.orderId"
              light
            />
            <v-text-field
              name="senderName"
              label="Nama Pengirim"
              type="text"
              color="black"
              :rules="rules.senderName"
              v-model="form.senderName"
              light
            />
            <v-text-field
              name="bank"
              label="Nama Bank"
              type="text"
              color="black"
              :rules="rules.bank"
              v-model="form.bank"
              light
            />
            <v-text-field
              name="bankAccount"
              label="Nomor Rekening"
              type="number"
              color="black"
              :rules="rules.bankAccount"
              v-model="form.bankAccount"
              light
            />
            <v-text-field
              name="amount"
              label="Nominal Transfer"
              type="number"
              color="black"
              :rules="rules.amount"
              v-model="form.amount"
              light
            />
            <v-file-input
              type="file"
              name="image"
              accept="image/jpeg, image/png, image/jpeg"
              label="upload bukti pembayaran"
              variant="solo-inverted"
              color="black"
              light
              :rules="rules.image"
              v-model="form.image"
              show-size
              counter
              multiple
            ></v-file-input>
            <v-select
              v-model="form.status"
              :items="status"
              :rules="rules.status"
              label="Status"
              color="black"
              light
            ></v-select>
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
      status: ['Active', 'Inactive', 'Confirmed'],
      breadCrumbs: [
        {
          text: 'Payment',
          disabled: false,
          to: '/payment',
          exact: true,
        },
        {
          text: 'Create',
          disabled: true,
        },
      ],
      form: {
        orderId: '',
        senderName: '',
        bank: '',
        bankAccount: '',
        amount: '',
        image: null,
        status: '',
      },
      rules: {
        orderId: [(v) => !!v || this.$t('ORDERID_IS_REQUIRED')],
        senderName: [(v) => !!v || this.$t('SENDER_NAME_IS_REQUIRED')],
        bank: [(v) => !!v || this.$t('BANK_IS_REQUIRED')],
        bankAccount: [(v) => !!v || this.$t('BANK_ACCOUNT_IS_REQUIRED')],
        amount: [
          (v) => v === this.form.amount || this.$t('AMOUNT_IS_REQUIRED'),
        ],
        status: [(v) => !!v || this.$t('STATUS_IS_REQUIRED')],
        image: [(v) => !!v || this.$t('IMAGE_IS_REQUIRED')],
      },
    }
  },
  methods: {
    onSubmit() {
      const formData = new FormData()
      formData.append('image', this.form.image[0])
      formData.append('orderId', this.form.orderId)
      formData.append('senderName', this.form.senderName)
      formData.append('bank', this.form.bank)
      formData.append('bankAccount', this.form.bankAccount)
      formData.append('amount', this.form.amount)
      formData.append('status', this.form.status)

      this.$axios
        .$post('/payments', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.isDisable = false
          console.log(response.data)
          this.$router.push({
            name: 'payment___' + this.$i18n.locale,
            params: {
              message: 'CREATE_SUCCESS',
              title: this.form.senderName,
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
