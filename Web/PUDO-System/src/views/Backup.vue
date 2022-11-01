<template>
<div class="container">
    <h1>Berth and Carplate Manual Update</h1>

    <div class="berths">
        <div class="berth-a-1">
            <p>Berth A1</p>
            <input type="text" placeholder=" {{ this.berthA1CarNumber }} " v-model="berthA1CarNumber" >
        </div>
        <div class="berth-a-2">
            <p>Berth A2</p>
            <input type="text" placeholder=" {{ this.berthA2CarNumber }} " v-model="berthA2CarNumber" >
        </div>
        <div class="berth-a-3">
            <p>Berth A3</p>
            <input type="text" placeholder=" {{ this.berthA3CarNumber }} " v-model="berthA3CarNumber" >
        </div>
        <div class="berth-a-4">
            <p>Berth A4</p>
            <input type="text" placeholder=" {{ this.berthA4CarNumber }} " v-model="berthA4CarNumber" >
        </div>
        <div class="berth-pwd">
            <p>Berth PWD</p>
            <input type="text" placeholder=" {{ this.berthPwdCarNumber }} " v-model="berthPwdCarNumber" >
        </div>
    </div>

    <button @click="setBerthData('param')"> Click Me To Update </button>

    <div class="">
        <h1>Human and Traffic Crowd Status Manual Update</h1>
        <div class="human-crowd-status">
            <p>Human Crowd Status</p>
            <input type="text" placeholder=" {{ this.humanCrowdStatusLevel }} " v-model="humanCrowdStatusLevel" >
        </div>
        <div class="traffic-status">
            <p>Traffic Status</p>
            <input type="text" placeholder=" {{ this.trafficStatusLevel }} " v-model="trafficStatusLevel" >
        </div>
    </div>

    <button @click="setCrowdStatusData"> Click Me To Update </button>
     
</div>
</template>

<script>
import {ref, onValue, set, update} from "firebase/database";
import { database, berthA1, berthA2, berthA3, berthA4, berthPwd, trafficStatus, humanCrowdStatus } from "../firebase/init"

export default {
    name: "Backup",
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
        async loadBerthData() {
            console.log("Loading Live Berth Data")

            //const db = getDatabase(app);
            const db = database

            const liveBerthInfoRef = ref(db, 'berth-live-info');

            onValue(liveBerthInfoRef, (snapshot) => {
                const data = snapshot.val()
                console.log(data['berth-a-1'])

                this.berthA1CarNumber = data[berthA1]
                this.berthA2CarNumber = data[berthA2]
                this.berthA3CarNumber = data[berthA3]
                this.berthA4CarNumber = data[berthA4]
                this.berthPwdCarNumber = data[berthPwd]
            })
        },
        async setBerthData(berthNumber) {
            console.log(berthNumber)

            const db = database
            update(ref(db, 'berth-live-info'), {
                'berth-a-1': this.berthA1CarNumber,
                'berth-a-2': this.berthA2CarNumber,
                'berth-a-3': this.berthA3CarNumber,
                'berth-a-4': this.berthA4CarNumber,
                'berth-pwd': this.berthPwdCarNumber,
            })
        },
        async loadCrowdStatusData() {
            const liveCrowdStatusRef = ref(database, 'live-pudo-status');

            onValue(liveCrowdStatusRef, (snapshot) => {
                const data = snapshot.val()

                this.humanCrowdStatusLevel = data[humanCrowdStatus]
                this.trafficStatusLevel = data[trafficStatus]
            })
        },
        async setCrowdStatusData() {
                set(ref(database, 'live-pudo-status'), {
                'human-crowd-status': this.humanCrowdStatusLevel,
                'traffic-status': this.trafficStatusLevel
            })
        },
        updateBerths() {
            console.log("Updating Berths")
            
            this.berthA1CarNumber = "Berth A1"
            this.berthA2CarNumber = "Berth A2"
            this.berthA3CarNumber = "Berth A3"
            this.berthA4CarNumber = "Berth A4"
            this.berthPwdCarNumber = "Berth PWD"

            this.loadBerthData()
        }
    },
    mounted() {
        console.log("Mounted")
        this.loadBerthData()
        this.loadCrowdStatusData()
    }
}
</script>

<style>

</style>