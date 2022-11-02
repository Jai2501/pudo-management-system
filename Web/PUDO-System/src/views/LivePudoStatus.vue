<template>
    <div class="container">
        <div class="top">
            <div class="logo">
                <img class="raffles-city-logo" src="../assets/RafflesCity.png" alt="No-Image">
            </div>
            <div class="info-text">
                <h3>
                    <b>Pickup / Dropoff Information</b>
                </h3>
                <p>
                    C14 (Stamford Road)
                </p>
            </div>
        </div>

        <div class="middle">
            <div class="heading">
                <div class="heading-berth-label">
                    BERTH
                </div>
                <div class="heading-vehicle-label">
                    VEHICLE
                </div>
            </div>
            <div class="berth-details">
                <LivePudoStatusBerthInfo 
                    :backgroundColorWhite="false"
                    :alertMode="this.berthA1LessTimeLeft"
                    berthNumber="A1"
                    :carNumber="this.berthA1CarNumber"
                    :isPriority="false"
                />

                <LivePudoStatusBerthInfo 
                    :backgroundColorWhite="true"
                    :alertMode="this.berthA2LessTimeLeft"
                    berthNumber="A2"
                    :carNumber="this.berthA2CarNumber"
                    :isPriority="false"
                />

                <LivePudoStatusBerthInfo 
                    :backgroundColorWhite="false"
                    :alertMode="this.berthA3LessTimeLeft"
                    berthNumber="A3"
                    :carNumber="this.berthA3CarNumber"
                    :isPriority="false"
                />

                <LivePudoStatusBerthInfo 
                    :backgroundColorWhite="true"
                    :alertMode="this.berthPwdLessTimeLeft"
                    berthNumber="Priority"
                    :carNumber="this.berthPwdCarNumber"
                    :isPriority="true"
                />
            </div>
        </div>

        <div class="bottom">
            <div class="human-crowd">
                <div class="human-crowd-logo">
                    <img src="../assets/LivePudoStatus/HumanCrowdIcon.png" alt="">
                </div>
                <div class="human-crowd-info-text">
                    <div class="human-crowd-info-text-percentage">
                        {{ this.humanCrowdStatusLevel }}%
                    </div>
                    <div class="human-crowd-info-text-status">
                        {{ this.humanCrowdStatusMessage }}
                    </div>
                </div>
            </div>
            <div class="traffic-congestion">
                <div class="traffic-congestion-logo">
                    <img src="../assets/LivePudoStatus/TrafficCongestionIcon.png" alt="">
                </div>
                <div class="traffic-congestion-info-text">
                    <div class="traffic-congestion-info-text-percentage">
                        {{ this.trafficStatusLevel }}%
                    </div>
                    <div class="traffic-congestion-info-text-status">
                        {{ this.trafficStatusMessage }}
                    </div>
                </div>
            </div>
        </div>
    </div>
  
</template>

<script>
import { ref, onValue } from "firebase/database";
import { database, berthA1, berthA2, berthA3, berthA4, berthPwd, humanCrowdStatus, trafficStatus } from "../firebase/init"

import LivePudoStatusBerthInfo from "../components/LivePudoStatusBerthInfo.vue"

// :src="require(`../assets/restaurantPhotos/${restaurant.photo}.jpeg`)"

export default {
    name: "LivePudoStatus",
    components: {
        LivePudoStatusBerthInfo
    },
    data() {
        return {
            berthA1CarNumber: null,
            berthA2CarNumber: null,
            berthA3CarNumber: null,
            berthA4CarNumber: null,
            berthPwdCarNumber: null,

            berthA1TimeLeft: null,
            berthA2TimeLeft: null,
            berthA3TimeLeft: null,
            berthPwdTimeLeft: null,

            berthA1LessTimeLeft: false,
            berthA2LessTimeLeft: false,
            berthA3LessTimeLeft: false,
            berthPwdLessTimeLeft: false,

            millisecondsInAMinute: 60000,

            humanCrowdStatusLevel: null,
            trafficStatusLevel: null,

            humanCrowdStatusMessage: null,
            trafficStatusMessage: null
        }
    },
    methods: {
        getBerthData() {
            const liveBerthInfoRef = ref(database, 'berth-live-info');

            onValue(liveBerthInfoRef, (snapshot) => {
                const data = snapshot.val()
                console.log("Berth Car Numbers Obatined/Changed")

                this.berthA1CarNumber = data[berthA1]
                this.berthA2CarNumber = data[berthA2]
                this.berthA3CarNumber = data[berthA3]
                this.berthA4CarNumber = data[berthA4]
                this.berthPwdCarNumber = data[berthPwd]
            })
        },
        getCrowdData() {
            console.log("Getting Crowd Data")

            const liveBerthInfoRef = ref(database, 'live-pudo-status');

            onValue(liveBerthInfoRef, (snapshot) => {
                const data = snapshot.val()
                console.log("Crowd and Congestion Levels Obatined/Changed")

                this.humanCrowdStatusLevel = data[humanCrowdStatus]
                this.trafficStatusLevel = data[trafficStatus]

                this.setCrowdAndTrafficMessage()
            })
        },
        setCrowdAndTrafficMessage() {
            if (this.trafficStatusLevel >= 0 && this.trafficStatusLevel < 25) {
                this.trafficStatusMessage = "Area is Empty"
            } else if (this.trafficStatusLevel >= 25 && this.trafficStatusLevel < 50) {
                this.trafficStatusMessage = "Slightly Congested"
            } else if (this.trafficStatusLevel >= 50 && this.trafficStatusLevel < 75) {
                this.trafficStatusMessage = "Moderately Congested"
            } else if (this.trafficStatusLevel >= 75 && this.trafficStatusLevel < 100) {
                this.trafficStatusMessage = "Very Congested"
            } else if (this.trafficStatusLevel >= 100) {
                this.trafficStatusLevel = 100
                this.trafficStatusMessage = "Area is Full"
            }

            if (this.humanCrowdStatusLevel >= 0 && this.humanCrowdStatusLevel < 25) {
                this.humanCrowdStatusMessage = "Area is Empty"
            } else if (this.humanCrowdStatusLevel >= 25 && this.humanCrowdStatusLevel < 50) {
                this.humanCrowdStatusMessage = "Slightly Crowded"
            } else if (this.humanCrowdStatusLevel >= 50 && this.humanCrowdStatusLevel < 75) {
                this.humanCrowdStatusMessage = "Moderately Crowded"
            } else if (this.humanCrowdStatusLevel >= 75 && this.humanCrowdStatusLevel < 100) {
                this.humanCrowdStatusMessage = "Very Crowded"
            } else if (this.humanCrowdStatusLevel >= 100) {
                this.humanCrowdStatusMessage = "Area is Full"
            }
        },
        getAndMonitorBerthTimingData() {
            var timerForBerthAOne = null
            var timerForBerthATwo = null
            var timerForBerthAThree = null
            var timerForBerthPwd = null

            const liveBerthInfoRef = ref(database, 'berth-live-info');

            onValue(liveBerthInfoRef, (snapshot) => {
                const data = snapshot.val()
                console.log("A1 Refreshed")

                this.berthA1TimeLeft = data[berthA1 + '-time']

                this.berthA1LessTimeLeft = false
                clearInterval(timerForBerthAOne)

                timerForBerthAOne = setInterval(() => {
                    const now = new Date().getTime()

                    if (this.berthA1TimeLeft - now <= this.millisecondsInAMinute) {
                        this.berthA1LessTimeLeft = true
                    }

                }, 1000)
            })

            onValue(liveBerthInfoRef, (snapshot) => {
                const data = snapshot.val()
                console.log("A2 Refreshed")

                this.berthA2TimeLeft = data[berthA2 + '-time']

                this.berthA2LessTimeLeft = false
                clearInterval(timerForBerthATwo)

                timerForBerthATwo = setInterval(() => {
                    const now = new Date().getTime()

                    if (this.berthA2TimeLeft - now <= this.millisecondsInAMinute) {
                        this.berthA2LessTimeLeft = true
                    }

                }, 1000)
            })

            onValue(liveBerthInfoRef, (snapshot) => {
                const data = snapshot.val()
                console.log("A3 Refreshed")

                this.berthA3TimeLeft = data[berthA3 + '-time']

                this.berthA3LessTimeLeft = false
                clearInterval(timerForBerthAThree)

                timerForBerthAThree = setInterval(() => {
                    const now = new Date().getTime()

                    if (this.berthA3TimeLeft - now <= this.millisecondsInAMinute) {
                        this.berthA3LessTimeLeft = true
                    }

                }, 1000)
            })

            onValue(liveBerthInfoRef, (snapshot) => {
                const data = snapshot.val()
                console.log("PWD Refreshed")

                this.berthPwdTimeLeft = data[berthPwd+ '-time']

                this.berthPwdLessTimeLeft = false
                clearInterval(timerForBerthPwd)

                timerForBerthPwd = setInterval(() => {
                    const now = new Date().getTime()

                    if (this.berthPwdTimeLeft - now <= this.millisecondsInAMinute) {
                        this.berthPwdLessTimeLeft = true
                    }

                }, 1000)
            })
        },
    },
    mounted() {
        this.getBerthData()
        this.getCrowdData()
        this.setCrowdAndTrafficMessage()
        this.getAndMonitorBerthTimingData()
    }
}
</script>

<style scoped>
.container {
    background-color: #fff;
}

.top {
    text-align: center;
}

.middle {
    display: flex;
    flex-direction: column;
}

.heading {
    display: flex;
    flex-direction: row;
    text-align: center;
    font-weight: 700;
    color: #66AEAA;
    font-size: 21px;
    border-bottom: 1px solid #66AEAA;
    margin: 0px 5px;
}

.heading-berth-label {
    flex-basis: 50%;
    /* padding: 10px; */
    border-right: 1px solid #66AEAA;
    margin: 10px 0px;
}

.heading-vehicle-label {
    flex-basis: 50%;
    /* padding: 10px; */
    border-left: 1px solid #66AEAA;
    margin: 10px 0px;
}

.raffles-city-logo {
    margin: 12px 0px 0px 0px;
    height: 50px;
    width: 140px;
}

.bottom {
    display: flex;
    flex-direction: column;
}

.human-crowd, .traffic-congestion {
    display: flex;
    flex-direction: row;
    margin: 20px;
    text-align: center;
}

.human-crowd-logo, .traffic-congestion-logo {
    display: flex;
    flex-basis: 50%;
    justify-content: center;
    align-items: center;
}

.human-crowd-info-text, .traffic-congestion-info-text {
    flex-basis: 50%;
    color: #66AEAA;
    font-size: 30px;
    font-weight: 700;
    padding: 0px 0px 0px 30px;
}

.human-crowd-info-text-status, .traffic-congestion-info-text-status {
    font-size: 15px;
    font-weight: 400;
    color: #535353;
    font-style: italic;
}
</style>