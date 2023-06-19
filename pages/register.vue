<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar color="black" dark>Register</v-toolbar>
        <v-card-text color="black" dark>
          <v-form>
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
              @keyup="checkEmaiExist"
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
              label="Addres"
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
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" dark @click="onSubmit" :disabled="isDisable">
            <span v-if="!isDisable">Register</span>
            <v-progress-circular
              v-else
              color="black"
              indeterminate
            ></v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>
      <p>
        Do You Have an account?
        <v-btn to="/login" plain class="text-btn">Login</v-btn>
      </p>
    </v-col>
  </v-row>
</template>
<script>
export default {
  middleware: ['unauthenticated'],
  data() {
    return {
      emailExist: false,
      isDisable: false,
      form: {
        fullname: '',
        email: '',
        phoneNumber: '',
        addres: '',
        password: '',
        retype_password: '',
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
          (v) => !!v || this.$t('Password_Is_Required'),
          (v) =>
            v.length >= 7 || this.$t('Password_Must_Be_at_Least_7_Character'),
        ],
        retype_password: [
          (v) =>
            v === this.form.password ||
            this.$t('Re_Password_Must_Be_Same_With_Password'),
        ],
      },
    }
  },
  methods: {
    checkEmaiExist() {
      this.emailExist = false
    },

    onSubmit() {
      ;(this.isDisable = true),
        this.$axios
          .$post('http://localhost:3000/auth/register', this.form)
          .then((response) => {
            this.isDisable = false
            // Redirect To Login Page
            this.$router.push('/login')
          })
          .catch((error) => {
            this.isDisable = false
          })
    },
  },
}
</script>
