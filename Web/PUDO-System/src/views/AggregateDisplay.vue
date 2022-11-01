<template>
    <div class="container">
        <div class="top">
            <div class="left">
            <div class="heading">
                <div class="berth-title">Berth</div>
                <div class="vehicle-title">Vehicle</div>
                <div class="time-left-title">Time Left</div>
            </div>
            <div class="all-berth-info">
                <AggregateDisplayBerthInfo 
                    berthName='A1' 
                    :berthCarNumber=this.berthA1CarNumber
                    berthTime="00:00" 
                />

                <AggregateDisplayBerthInfo 
                    berthName='A2' 
                    :berthCarNumber=this.berthA2CarNumber
                    berthTime="00:00"
                    :backgroundColorWhite=true
                />

                <AggregateDisplayBerthInfo 
                    berthName='A3' 
                    :berthCarNumber=this.berthA3CarNumber
                    berthTime="00:00" 
                />

                <AggregateDisplayBerthInfo 
                    berthName='Priority' 
                    :berthCarNumber=this.berthPwdCarNumber
                    berthTime="00:00" 
                    :isPWD="true"
                    :backgroundColorWhite=true
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
import {ref, onValue} from "firebase/database";
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
        };
    },
    components: {
        AggregateDisplayBerthInfo, 
        AdvertisementSlider
    },
    methods: {
        getAndSetBerthData() {
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
}

.vehicle-title {
    flex-basis: 33%;
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