<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="black" dark>Edit Payment</v-toolbar>
        <v-card-text color="black" dark>
          <v-breadcrumbs :items="breadCrumbs" class="pa-0"></v-breadcrumbs>
          <v-form ref="form">
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
            <v-select
              v-model="form.status"
              :items="status"
              label="Status"
              color="black"
              light
            ></v-select>
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
      isDisable: false,
      status: ['Active', 'Inactive', 'Confirmed'],
      breadCrumbs: [
        {
          text: 'Users',
          disabled: false,
          to: '/users',
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
        status: [(v) => !!v || this.$t('ORDERID_IS_REQUIRED')],
      },
    }
  },
  methods: {
    fetchDataPaymentById() {
      this.$axios
        .$get(`/payments/${this.id}`)
        .then((response) => {
          this.form.orderId = response.payment.orderId
          this.form.senderName = response.payment.senderName
          this.form.bank = response.payment.bank
          this.form.bankAccount = response.payment.bankAccount
          this.form.amount = response.payment.amount
          this.form.status = response.payment.status
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
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.isDisable = true
        this.$axios
          .$put(`/payments/${this.id}`, this.form)
          .then((response) => {
            this.isDisable = false

            // Redirect To Users Page
            this.$router.push({
              name: 'payment___' + this.$i18n.locale,
              params: {
                message: 'UPDATE_SUCCESS',
                title: this.form.orderId,
              },
            })
          })
          .catch((error) => {
            // if (error.response.data.message == 'EMAIL_EXIST') {
            //   this.emailExist = true
            //   this.$refs.form.validate()
            // }
            this.isDisable = false
          })
      }
    },
  },
  mounted() {
    this.fetchDataPaymentById()
  },
}
</script>
