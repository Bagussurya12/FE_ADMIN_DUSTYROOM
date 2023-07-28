<template>
  <v-row class="d-flex flex-wrap">
    <v-col cols="8">
      <div>
        <v-img
          :src="require(`../assets/images/login.png`)"
          :width="750"
          cover
        ></v-img>
      </div>
    </v-col>
    <v-col cols="3" class="mt-5">
      <v-card class="mt-5 mb-5">
        <v-toolbar color="black" dark>Login</v-toolbar>
        <v-card-text class="mt-5">
          <v-form>
            <v-text-field
              name="email"
              label="email"
              type="email"
              v-model="form.email"
            />
            <v-text-field
              name="password"
              label="password"
              type="password"
              v-model="form.password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            dark
            @click="onSubmit"
            :disabled="isDisable"
            block
            class="mb-5"
          >
            <span v-if="!isDisable">Login</span>
            <v-progress-circular
              v-else
              color="black"
              indeterminate
            ></v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-alert color="red lighten-2" dark v-if="isError">
        {{ $t(message) }}
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  middleware: ['unauthenticated'],
  head: {
    title: 'Login',
  },
  data() {
    return {
      isDisable: false,
      isError: false,
      message: '',
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapMutations('auth', {
      setFullname: 'setFullname',
      setAccessToken: 'setAccessToken',
      setRefreshToken: 'setRefreshToken',
    }),
    storeWelcomeScreen() {
      localStorage.setItem('welcomeScreen', true)
    },
    onSubmit() {
      ;(this.isDisable = true), console.log(this.form)
      this.$axios
        .$post('/auth/login', this.form)
        .then((response) => {
          this.isDisable = false
          // Store Passed Welcome
          if (!localStorage.welcomeScreen) {
            this.storeWelcomeScreen()
          }
          // Store Auth data
          this.setFullname(response.fullname)
          this.setAccessToken(response.accessToken)
          this.setRefreshToken(response.refreshToken)
          // console.log(response)
          // Redirect TO login Page
          this.$router.push('/dashboard')
        })
        .catch((error) => {
          this.isError = true
          this.message = error.response.data.message
          this.isDisable = false
        })
    },
  },
  mounted() {
    if (this.$route.params.message === 'AUTH_REQUIRED') {
      this.message = this.$route.params.message
      this.isError = true
    }
  },
}
</script>
<style>
.no-view {
  display: none;
}
</style>
