<template>
    <div class="container">
        <h1>Aggregate Display</h1>
        <p> Berth A1 {{ this.berthA1CarNumber }} </p>
        <p> Berth A2 {{ this.berthA2CarNumber }} </p>
        <p> Berth A3 {{ this.berthA3CarNumber }} </p>
        <p> Berth A4 {{ this.berthA4CarNumber }} </p>
        <p> Berth PWD {{ this.berthPwdCarNumber }} </p>

        <div class="berth-details">
            <div class="berth-label">
                <div class="berth-label-text">
                    Berth
                </div>
            </div>
            <div class="berth-car-number">
                Vehicle
            </div>
            <div class="berth-status">
                Time Left
            </div>
        </div>

        <AggregateDisplayBerthInfo 
            berthName='A1' 
            :berthCarNumber=this.berthA1CarNumber
            berthTime="00:00" 
        />

        <AggregateDisplayBerthInfo 
            berthName='A2' 
            :berthCarNumber=this.berthA2CarNumber
            berthTime="00:00" 
        />

        <AggregateDisplayBerthInfo 
            berthName='A3' 
            :berthCarNumber=this.berthA3CarNumber
            berthTime="00:00" 
        />

        <AggregateDisplayBerthInfo 
            berthName='A4' 
            :berthCarNumber=this.berthA4CarNumber
            berthTime="00:00" 
        />

        <AggregateDisplayBerthInfo 
            berthName='PWD' 
            :berthCarNumber=this.berthPwdCarNumber
            berthTime="00:00" 
        />

        <div class="berth-details">
            <div class="berth-label">
                <div class="berth-label-text">
                    A1
                </div>
            </div>
            <div class="berth-car-number">
                {{ this.berthA1CarNumber }}
            </div>
            <div class="berth-status">
                Here
            </div>
        </div>
        <!-- <button @click="updateBerthData">Update [If not working live]</button> -->
    </div>
</template>

<script>
import {ref, onValue} from "firebase/database";
import { database, berthA1, berthA2, berthA3, berthA4, berthPwd } from "../firebase/init"

import AggregateDisplayBerthInfo from "../components/AggregateDisplayBerthInfo.vue"


export default {
    name:"AggregateDisplay",
    data() {
        return {
            berthA1CarNumber: null,
            berthA2CarNumber: null,
            berthA3CarNumber: null,
            berthA4CarNumber: null,
            berthPwdCarNumber: null,
        };
    },
    components: {AggregateDisplayBerthInfo},
    methods: {
        getAndSetBerthData() {
            // Update Bay Details from live DB
            // this.berthA1CarNumber = " - "
            // this.berthA2CarNumber = " - "
            // this.berthA3CarNumber = " - "
            // this.berthA4CarNumber = " - "
            // this.berthPwdCarNumber = "SJG 1232 F"

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
        }
    },
    props: [],
    created() {},
    mounted() {
        this.berthA1CarNumber = "SGX 1111 L"
        this.berthA2CarNumber = " - "
        this.berthA3CarNumber = "SGP 2292 J"
        this.berthA4CarNumber = " - "
        this.berthPwdCarNumber = " - "

        this.getAndSetBerthData()
    },
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    background-color: wheat;
}

.berth-details {
    display: flex;
    flex-direction: row;
    background-color: #D9D9D9;
    padding: 30px 20px;
    text-align: center;
    /* margin: 15px; */
    border-radius: 20px;
}

.berth-label {
    flex-basis: 33%;
    /* background-color: #88cbc7;
    padding: 20px;
    border-radius: 20px; */
    /* width: 5%;
    max-width: 5px; */
}

.berth-label-text {
    background-color: #88cbc7;
    padding: 20px;
    border-radius: 20px;
    margin: 0px 150px;
}

.berth-car-number {
    flex-basis: 33%;
    padding: 20px;
}

.berth-status {
    flex-basis: 33%;
    padding: 20px;
}

</style>