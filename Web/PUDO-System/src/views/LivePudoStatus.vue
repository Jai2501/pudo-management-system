<template>
    <div class="container">
        <img class="raffles-city-logo" src="../assets/RafflesCity.png" alt="Fuck">

        <h1>Raffles City Live PUDO Info</h1>

        <p> Berth A1 <b> {{ this.berthA1CarNumber }} </b> </p>
        <p> Berth A2 <b> {{ this.berthA2CarNumber }} </b> </p>
        <p> Berth A3 <b> {{ this.berthA3CarNumber }} </b> </p>
        <p> Berth A4 <b> {{ this.berthA4CarNumber }} </b> </p>
        <p> Berth PWD <b> {{ this.berthPwdCarNumber }} </b> </p>

        <h2>Human Crowd: {{ this.humanCrowdStatusLevel }}%</h2>
        <progress :value="this.humanCrowdStatusLevel" max="100" style="accent-color: #000">
            {{ this.humanCrowdStatusLevel }}%
        </progress>

        <h2>Traffic Status: {{ this.trafficStatusLevel }}%</h2>
        <progress :value="this.trafficStatusLevel" max="100">
            {{ this.trafficStatusLevel }}%
        </progress>
    </div>
  
</template>

<script>
import { ref, onValue } from "firebase/database";
import { database, berthA1, berthA2, berthA3, berthA4, berthPwd, humanCrowdStatus, trafficStatus } from "../firebase/init"

// :src="require(`../assets/restaurantPhotos/${restaurant.photo}.jpeg`)"

export default {
    name: "LivePudoStatus",
    data() {
        return {
            berthA1CarNumber: null,
            berthA2CarNumber: null,
            berthA3CarNumber: null,
            berthA4CarNumber: null,
            berthPwdCarNumber: null,

            humanCrowdStatusLevel: null,
            trafficStatusLevel: null
        }
    },
    methods: {
        getBerthData() {
            const liveBerthInfoRef = ref(database, 'berth-live-info');

            onValue(liveBerthInfoRef, (snapshot) => {
                const data = snapshot.val()
                console.log("Values Obatined/Changed")

                this.berthA1CarNumber = data[berthA1]
                this.berthA2CarNumber = data[berthA2]
                this.berthA3CarNumber = data[berthA3]
                this.berthA4CarNumber = data[berthA4]
                this.berthPwdCarNumber = data[berthPwd]
            })
        },
        getCrowdData() {
            console.log("Getting Crowd Data")

            // this.humanCrowdStatusLevel = 85
            // this.trafficStatusLevel = 28

            const liveBerthInfoRef = ref(database, 'live-pudo-status');

            onValue(liveBerthInfoRef, (snapshot) => {
                const data = snapshot.val()
                console.log("Values Obatined/Changed")

                this.humanCrowdStatusLevel = data[humanCrowdStatus]
                this.trafficStatusLevel = data[trafficStatus]
            })
        }
    },
    mounted() {
        this.getBerthData()
        this.getCrowdData()
    }
}
</script>

<style scoped>
.container {
    background-color: #fff;
}

.raffles-city-logo {
    height: 80px;
    width: 200px;
}
</style>