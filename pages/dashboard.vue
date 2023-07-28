<template>
  <v-row>
    <v-col cols="10" offset="1">
      <v-card class="mb-3">
        <v-toolbar color="black" dark> Dashboard</v-toolbar>

        <v-card-title class="d-flex justify-center mb-6 mt-6">
          <h3 class="font-weight-bold">Hallo {{ userProfile.fullname }}!</h3>
        </v-card-title>
        <v-container class="mb-5">
          <v-row class="mt-5 d-flex justify-center mb-6">
            <!-- User -->
            <v-col cols="4" class="mb-5 mt-5">
              <v-card class="mx-auto" width="300" :ripple="true">
                <v-card-title class="mb-5 mt-5">
                  <h1 class="ml-2 mt-5" color="primary">{{ dataUser }}</h1>
                  <v-spacer></v-spacer>
                  <v-icon color="black">mdi-account-group</v-icon>
                  <h4 class="ml-3">Data User</h4>
                </v-card-title>
                <v-card-text class="font-weight-bold"
                  ><v-btn to="/users" color="black" dark block :ripple="true">
                    More Info</v-btn
                  >
                </v-card-text>
              </v-card>
            </v-col>
            <!-- Category -->
            <v-col cols="4" class="mb-5 mt-5">
              <v-card class="mx-auto" width="300" :ripple="true">
                <v-card-title class="mb-5 mt-5">
                  <h1 class="ml-2 mt-5" color="primary">{{ dataCategory }}</h1>
                  <v-spacer></v-spacer>
                  <v-icon color="black">mdi-equal-box</v-icon>
                  <h4 class="ml-3">Data Kategori</h4>
                </v-card-title>
                <v-card-text class="font-weight-bold"
                  ><v-btn
                    to="/category"
                    color="black"
                    dark
                    block
                    :ripple="true"
                  >
                    More Info</v-btn
                  >
                </v-card-text>
              </v-card>
            </v-col>
            <!-- Product -->
            <v-col cols="4" class="mb-5 mt-5">
              <v-card class="mx-auto" width="300" :ripple="true">
                <v-card-title class="mb-5 mt-5">
                  <h1 class="ml-2 mt-5" color="primary">{{ dataProduct }}</h1>
                  <v-spacer></v-spacer>
                  <v-icon color="black">mdi-order-bool-descending</v-icon>
                  <h4 class="ml-3">Data Produk</h4>
                </v-card-title>
                <v-card-text class="font-weight-bold"
                  ><v-btn to="/product" color="black" dark block :ripple="true">
                    More Info</v-btn
                  >
                </v-card-text>
              </v-card>
            </v-col>
            <!-- Orders -->
            <v-col cols="4" class="mb-5 mt-5">
              <v-card class="mx-auto" width="300" :ripple="true">
                <v-card-title class="mb-5 mt-5">
                  <h1 class="ml-2 mt-5" color="primary">{{ dataOrder }}</h1>
                  <v-spacer></v-spacer>
                  <v-icon color="black">mdi-clipboard-check</v-icon>
                  <h4 class="ml-3">Data Pesanan</h4>
                </v-card-title>
                <v-card-text class="font-weight-bold"
                  ><v-btn to="/order" color="black" dark block :ripple="true">
                    More Info</v-btn
                  >
                </v-card-text>
              </v-card>
            </v-col>
            <!-- Payment -->
            <v-col cols="4" class="mb-5 mt-5">
              <v-card class="mx-auto" width="300" :ripple="true">
                <v-card-title class="mb-5 mt-5">
                  <h1 class="ml-2 mt-5" color="primary">{{ dataPayment }}</h1>
                  <v-spacer></v-spacer>
                  <v-icon color="black">mdi-cash-sync</v-icon>
                  <h4 class="ml-3">Data Pembayaran</h4>
                </v-card-title>
                <v-card-text class="font-weight-bold"
                  ><v-btn to="/payment" color="black" dark block :ripple="true">
                    More Info</v-btn
                  >
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <div>
        <Chart :chartData="chartData" :chartOptions="chartOptions" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import axiosInterceptors from '~/plugins/axiosInterceptors'
import axios from 'axios'
import { mapGetters } from 'vuex'
import Chart from '@/components/Chart.vue'

export default {
  middleware: ['authenticated'],
  components: {
    Chart,
  },
  data() {
    return {
      userProfile: '',
      dataUser: '',
      dataProduct: '',
      dataCategory: '',
      dataPayment: '',
      dataOrder: '',
      chartData: {
        datasets: [
          {
            label: 'Grafik Data',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [10, 20, 15],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  methods: {
    async fetchProfile() {
      try {
        const userId = this.users.id
        const response = await axios.get(
          `http://localhost:3000/users/profile/${userId}`
        )
        this.userProfile = response.data.User
      } catch (error) {
        console.error(error)
      }
    },
    async fetchDataUser() {
      try {
        const response = await axios.get(`http://localhost:3000/data/datauser`)
        this.dataUser = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchDataProduct() {
      try {
        const response = await axios.get(
          `http://localhost:3000/data/dataproduct`
        )
        this.dataProduct = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchDataCategory() {
      try {
        const response = await axios.get(
          `http://localhost:3000/data/datacategory`
        )
        this.dataCategory = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchDataOrder() {
      try {
        const response = await axios.get(`http://localhost:3000/data/dataorder`)
        this.dataOrder = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchDataPayment() {
      try {
        const response = await axios.get(
          `http://localhost:3000/data/datapayment`
        )
        this.dataPayment = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
  },
  computed: {
    ...mapGetters('auth', {
      authenticated: 'authenticated',
      users: 'user',
    }),
  },
  mounted() {
    this.fetchProfile()
    this.fetchDataUser()
    this.fetchDataProduct()
    this.fetchDataCategory()
    this.fetchDataOrder()
    this.fetchDataPayment()
  },
  components: { Chart },
}
</script>
