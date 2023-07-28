<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="black" dark>Edit User</v-toolbar>
        <v-card-text color="black" dark>
          <v-breadcrumbs :items="breadCrumbs" class="pa-0"></v-breadcrumbs>
          <v-form ref="form">
            <v-text-field
              name="name"
              label="Full name"
              type="text"
              color="black"
              :rules="rules.fullname"
              v-model="form.fullname"
              light
            />
            <v-text-field
              name="email"
              label="E-mail"
              type="email"
              color="black"
              :rules="rules.email"
              v-model="form.email"
              @keydown="checkEmailExist"
              light
            />
            <v-text-field
              name="phoneNumber"
              label="Phone number"
              type="number"
              color="black"
              :rules="rules.phoneNumber"
              v-model="form.phoneNumber"
              light
            />
            <v-text-field
              name="addres"
              label="Address"
              type="text"
              color="black"
              :rules="rules.addres"
              v-model="form.addres"
              light
            />
            <v-text-field
              name="password"
              label="Password"
              type="password"
              color="black"
              :rules="rules.password"
              v-model="form.password"
              light
            />
            <v-text-field
              name="retype_password"
              label="Re-password"
              type="password"
              color="black"
              :rules="rules.retype_password"
              v-model="form.retype_password"
              light
            />
            <v-select
              v-model="form.role"
              :items="roles"
              label="Role"
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
      roles: ['admin', 'employee', 'customer'],
      emailExist: false,
      breadCrumbs: [
        {
          text: 'Users',
          disabled: false,
          to: '/users',
          exact: true,
        },
        {
          text: 'Edit User',
          disabled: true,
        },
      ],
      form: {
        fullname: '',
        email: '',
        phoneNumber: '',
        addres: '',
        password: '',
        retype_password: '',
        role: '',
      },
      rules: {
        fullname: [(v) => !!v || this.$t('Full_Name_Is_Required')],
        email: [
          (v) => !!v || this.$t('Email_Is_Required'),
          (v) => /.+@.+/.test(v) || this.$t('Email_InValid'),
          (v) => !this.emailExist || this.$t('EMAIL_EXIST'),
        ],
        phoneNumber: [(v) => !!v || this.$t('Phone_Number_Is_Required')],
        addres: [(v) => !!v || this.$t('Addres_Is_Required')],
        password: [
          (v) => v.length == 0 || !!v || this.$t('Password_Is_Required'),
          (v) =>
            v.length == 0 ||
            v.length >= 7 ||
            this.$t('Password_Must_Be_at_Least_7_Character'),
        ],
        retype_password: [
          (v) =>
            v === this.form.password ||
            this.$t('Re_Password_Must_Be_Same_With_Password'),
        ],
        role: [(v) => v === this.form.role || this.$t('Role_IS_Required')],
      },
    }
  },
  methods: {
    fetchDataUserById() {
      this.$axios
        .$get(`/users/${this.id}`)
        .then((response) => {
          //   console.log(response)
          this.form.fullname = response.User.fullname
          this.form.email = response.User.email
          this.form.phoneNumber = response.User.phoneNumber
          this.form.addres = response.User.addres
          this.form.role = response.User.role
        })
        .catch((error) => {
          this.$router.push({
            name: 'users___' + this.$i18n.locale,
            params: {
              message: 'ID_NOT_FOUND',
            },
          })
        })
    },
    checkEmailExist() {
      this.emailExist = false
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.isDisable = true
        this.$axios
          .$put(`/users/${this.id}`, this.form)
          .then((response) => {
            this.isDisable = false

            // Redirect To Users Page
            this.$router.push({
              name: 'users___' + this.$i18n.locale,
              params: {
                message: 'UPDATE_SUCCESS',
                fullname: this.form.fullname,
              },
            })
          })
          .catch((error) => {
            if (error.response.data.message == 'EMAIL_EXIST') {
              this.emailExist = true
              this.$refs.form.validate()
            }
            this.isDisable = false
          })
      }
    },
  },
  mounted() {
    this.fetchDataUserById()
  },
}
</script>
