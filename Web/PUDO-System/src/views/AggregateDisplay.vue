<template>
    <div class="container">
        <div class="top">
            <div class="left">
            <div class="heading">
                <div class="berth-title">Berth</div>
                <div class="vehicle-title">Vehicle</div>
                <div class="time-left-title">Time Left</div>
            </div>
            <div class="all-berth-info" >
                <AggregateDisplayBerthInfo
                    berthName='A1' 
                    :berthCarNumber=this.berthA1CarNumber
                    :berthTime=this.berthA1Time
                    @update-berth="updateBerth"
                    v-if="this.berthA1Time !== null"
                    :key=this.berthA1Time
                />

                <AggregateDisplayBerthInfo 
                    berthName='A2'
                    :berthCarNumber=this.berthA2CarNumber
                    :berthTime=berthA2Time
                    :backgroundColorWhite=true
                    @update-berth="updateBerth"
                    v-if="this.berthA2Time !== null"
                    :key=this.berthA2Time
                />

                <AggregateDisplayBerthInfo 
                    berthName='A3' 
                    :berthCarNumber=this.berthA3CarNumber
                    :berthTime=berthA3Time
                    @update-berth="updateBerth"
                    v-if="this.berthA3Time !== null"
                    :key=this.berthA3Time
                />

                <AggregateDisplayBerthInfo 
                    berthName='Priority' 
                    :berthCarNumber=this.berthPwdCarNumber
                    :berthTime=this.berthPwdTime
                    :isPWD="true"
                    :backgroundColorWhite=true
                    @update-berth="updateBerth"
                    v-if="this.berthPwdTime !== null"
                    :key=this.berthPwdTime
                />
            </div>
            <div class="qr-code-section">
                <div class="qr-code-text">
                    Stay Updated on the crowd status by scanning the QR code here!
                </div>
                <div class="qr-code-image">
                    <img class="qr-code-image-size" src="../assets/LivePudoStatusQRCode.png">
                </div>
            </div>
        </div>

        <div class="right">
            <div class="advertisement">
                <AdvertisementSlider />
            </div>
        </div>

        </div>
        <div class="bottom">
            <marquee direction="left">Brought to you by Beep Beep!</marquee>
        </div>
    </div>
</template>

<script>
import {ref, set, onValue, update} from "firebase/database";
import { database, berthA1, berthA2, berthA3, berthA4, berthPwd } from "../firebase/init"

import AggregateDisplayBerthInfo from "../components/AggregateDisplayBerthInfo.vue"
import AdvertisementSlider from "../components/AdvertisementSlider.vue"

export default {
    name:"AggregateDisplay",
    data() {
        return {
            berthA1CarNumber: null,
            berthA2CarNumber: null,
            berthA3CarNumber: null,
            berthA4CarNumber: null,
            berthPwdCarNumber: null,
            berthA1Time: null,
            berthA2Time: null,
            berthA3Time: null,
            berthA4Time: null,
            berthPwdTime: null,
            millisecondsInFiveMinutes: 300000
        };
    },
    components: {
        AggregateDisplayBerthInfo, 
        AdvertisementSlider
    },
    methods: {
        updateBerth(berthToBeUpdated) {
            const db = database

            switch(berthToBeUpdated) {
                case "A1":
                    // this.berthA1Time = new Date().getTime() + this.millisecondsInFiveMinutes
                    update(ref(db, 'berth-live-info'), {
                        'berth-a-1-time': new Date().getTime() + this.millisecondsInFiveMinutes
                    })
                    break;
                case "A2":
                    update(ref(db, 'berth-live-info'), {
                        'berth-a-2-time': new Date().getTime() + this.millisecondsInFiveMinutes
                    })
                    break;
                case "A3":
                    update(ref(db, 'berth-live-info'), {
                        'berth-a-3-time': new Date().getTime() + this.millisecondsInFiveMinutes
                    })
                    break;
                case "Priority":
                    update(ref(db, 'berth-live-info'), {
                        'berth-pwd-time': new Date().getTime() + this.millisecondsInFiveMinutes
                    })
                    break;
                default:
                    console.log("Cannot Update")
            }
        },
        async getBerthData() {
            const liveBerthInfoRef = ref(database, 'berth-live-info');

                onValue(liveBerthInfoRef, (snapshot) => {
                const data = snapshot.val()
                console.log("Values Obatined/Changed")

                this.berthA1CarNumber = data[berthA1]
                this.berthA2CarNumber = data[berthA2]
                this.berthA3CarNumber = data[berthA3]
                this.berthA4CarNumber = data[berthA4]
                this.berthPwdCarNumber = data[berthPwd]

                this.berthA1Time = data[berthA1 + "-time"]
                this.berthA2Time = data[berthA2 + "-time"]
                this.berthA3Time = data[berthA3 + "-time"]
                this.berthA4Time = data[berthA4 + "-time"]
                this.berthPwdTime = data[berthPwd + "-time"]
            })
        },
        async setBerthSampleData() {
            const db = database

            set(ref(db, 'berth-live-info'), {
                'berth-a-1': "SGJ2501L",
                'berth-a-2': "SGA1111C",
                'berth-a-3': "SGG2222W",
                'berth-a-4': "SGK3333C",
                'berth-pwd': "SGZ9999Y",

                'berth-a-1-time': (new Date().getTime() + this.millisecondsInFiveMinutes),
                'berth-a-2-time': (new Date().getTime() + this.millisecondsInFiveMinutes),
                'berth-a-3-time': (new Date().getTime() + this.millisecondsInFiveMinutes),
                'berth-a-4-time': (new Date().getTime() + this.millisecondsInFiveMinutes),
                'berth-pwd-time': (new Date().getTime() + this.millisecondsInFiveMinutes)
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

        this.setBerthSampleData()

        this.getBerthData()
    },
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    /* background-color: wheat; */
    font-family: Inter;
}

.top {
    display: flex;
    flex-direction: row;
}

.left {
    /* background-color: orange; */
    flex-basis: 67%;
    display: flex;
    flex-direction: column;
}

.heading {
    /* background-color: red; */
    display: flex;
    flex-direction: row;
    text-align: center;
    padding: 10px 0px;
    margin: 10px 25px;
    font-size: 57px;
    color: #66AEAA;
}

.berth-title {
    flex-basis: 33%;
    border-right-style: solid;
    border-width: 7px;
}

.vehicle-title {
    flex-basis: 33%;
    border-right-style: solid;
    border-width: 7px;
}

.time-left-title {
    flex-basis: 33%;
}

.qr-code-section {
    display: flex;
    flex-direction: row;
    /* background-image: linear-gradient(to right, #fff , #88CBC7); */
    background-image: linear-gradient(to right, #fff , rgba(136, 203, 199, 0.63));
    margin: 15px 100px;
    border-radius: 20px;
    padding: 20px
}

.qr-code-text {
    flex-basis: 80%;
    font-size: 38px;
    color: #535353;
    padding: 20px;
}

.qr-code-image {
    flex-basis: 20%;
}

.qr-code-image-size {
    width: 135px;
    height: 135px;
    border-radius: 10px;
}

.right {
    /* background-color: rebeccapurple; */
    flex-basis: 33%;
}

.advertisement-image {
    height: 100px;
    width: 300px;
}

.bottom {
    font-size: 22px;
    color: #535353;
    font-style: italic;
}
</style>