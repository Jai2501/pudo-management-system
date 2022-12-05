<template>
    <div class="berth-details" :class="backgroundColorWhite ? 'berth-details-background-white' : 'berth-details-background-gray' ">
        <div class="berth-label">
            <div class="berth-label-text" :class="isPWD ? 'berth-label-background-pwd' : 'berth-label-background-normal' ">
                {{ this.berthName }}
            </div>
        </div>
        <div class="berth-car-number" 
        :class="{
            'berth-car-number-text-red': isLessThanOneMinuteLeft,
            'berth-car-number-text-black': !isLessThanOneMinuteLeft,
        }">
            {{ this.berthCarNumber }}
        </div>
        <div class="berth-status"
        :class="{
            'berth-car-number-text-red': isLessThanOneMinuteLeft,
            'berth-car-number-text-black': !isLessThanOneMinuteLeft,
            'berth-car-number-text-blink': isTimeUp
        }">
            <!-- {{ this.berthTime }} -->
            {{ this.displayMinutes + ":" + this.displaySeconds }}
        </div>
    </div>
</template>

<script>
import {ref, update} from "firebase/database";
import { database } from "../firebase/init"

export default {
    name: "AggregateDisplayBerthInfo",
    props: ["berthName", "berthCarNumber", "berthTime", "backgroundColorWhite", "isPWD"],
    data() {
        return {
            timeDoneSinceWaiting: 0,
            isLessThanOneMinuteLeft: true,
            isTimeUp: true,
            displaySeconds: 0,
            displayMinutes: 0, 
            millisecondsInASecond: 1000,
            millisecondsInAMinute: 60000,
            millisecondsInFiveMinutes: 300000,
            millisecondsInThreeMinutes: 180000,
            berthA1CarList: ["SGY4428L", "SJV3176U", "SMN3110J", "SJG3208L", "SNG3283T", "SPG5339D", "STU9975R"],
            berthA3CarList: ["SKA8475Z", "SKC9834P", "SMW9854G", "SHA9843M", "SKP9861K", "SJI9922T", "SMR4491Y"],
            berthPwdCarList: ["PC4768F", "PC9498Q", "PC6396K", "PC3861J", "PC9260V"],
            berthA1Counter: 0,
            berthA3Counter: 0,
            berthPwdCounter: 0,
            timeToWaitForA1NextCar: 5,
            timeToWaitForA3NextCar: 2,
            timeToWaitForPwdNextCar: 6,
            timeDoneWaitingForNextCar: 0
        }
    },
    methods: {
        startTimer() {
            // A second has 1000ms
            // A minute has 60 seconds = 60000ms
            
            const starter = 0

            console.log("Started Timer")
            console.log("Berth Car Number " + this.berthCarNumber)
            // const end = new Date(((new Date()).getTime() + 120000))
            let toSubtract = 0

            // To Start at a random time :)
            if (((this.berthCarNumber === "SJG7930T") && (this.berthName == "A1")) || ((this.berthCarNumber === "SNM4916D") && (this.berthName == "A3"))) {
                toSubtract = Math.floor((Math.random() * 100000))
                console.log("Random Time To Subtract: " + toSubtract)
            }

            const end = new Date().getTime() + (this.isPWD ? this.millisecondsInFiveMinutes : this.millisecondsInThreeMinutes) - toSubtract

            // if (this.berthTime === null) {
            //     const end = new Date().getTime() + this.millisecondsInFiveMinutes
            // } else {
            //     const end = this.berthTime
            // }

            console.log("Berth End Time: " + end)

            console.log("Now " + new Date())
            console.log("End " + end)

            this.isLessThanOneMinuteLeft = false
            this.isTimeUp = false

            const prevCarNumber = this.berthCarNumber

            const timer = setInterval(() => {
                const now = new Date()

                // Checking for changes in Car Number
                if (prevCarNumber !== this.berthCarNumber && (prevCarNumber !== null)) {
                    clearInterval(timer)

                    this.isLessThanOneMinuteLeft = false
                    this.isTimeUp = false

                    this.updateBerthTime()
                    this.startTimer()
                    return
                }

                // if (this.berthCarNumber === "-") {
                //     this.displayMinutes = "-"
                //     this.displaySeconds = "--"

                //     clearInterval(timer)

                //     this.isLessThanOneMinuteLeft = false
                //     this.isTimeUp = false
                    
                //     this.updateBerthTime()
                //     this.startTimer()
                //     return
                // }

                this.displaySeconds = (Math.ceil((end - now.getTime()) / this.millisecondsInASecond) % 60)

                // Checking to update Minutes
                if (this.displaySeconds !== 0) {
                    this.displayMinutes = (Math.ceil((end - now.getTime()) / (this.millisecondsInASecond * 60))) - 1
                }

                // Checking to change styling
                if (this.displayMinutes <= 0) {
                    if (this.displaySeconds < 0) {
                        this.isTimeUp = true
                    }
                    this.isLessThanOneMinuteLeft = true
                }

                // Checking to show 0:00 when times up
                if (this.displaySeconds < 0 && this.displayMinutes < 0) {
                    this.displayMinutes = 0
                    this.displaySeconds = 0
                    
                    // Automating Berth Car Movement for A1, A3 and PWD
                    // this.timeDoneWaitingForNextCar = this.timeDoneWaitingForNextCar + 1
                    // const db = database

                    // if ((this.berthName === "A1") && (this.isTimeUp) && (this.timeDoneWaitingForNextCar === this.timeToWaitForA1NextCar)) {
                    //     clearInterval(timer)

                    //     update(ref(db, 'berth-live-info'), {
                    //         'berth-a-1': this.berthA1CarList[this.berthA1Counter]
                    //     }).then(() => {
                    //         // Catch for Unbound exception
                    //         this.berthA1Counter = this.berthA1Counter + 1
                    //         this.berthA1Counter = (this.berthA1Counter === 7 ? 0 : this.berthA1Counter)

                    //         this.timeDoneWaitingForNextCar = 0

                    //         this.updateBerthTime()

                    //         this.startTimer()
                    //     })
                    // }

                    // if ((this.berthName === "A3") && (this.isTimeUp) && (this.timeDoneWaitingForNextCar === this.timeToWaitForA3NextCar)) {
                    //     clearInterval(timer)

                    //     update(ref(db, 'berth-live-info'), {
                    //         'berth-a-3': this.berthA3CarList[this.berthA3Counter]
                    //     }).then(() => {
                    //         this.berthA3Counter = this.berthA3Counter + 1
                    //         this.berthA3Counter = (this.berthA3Counter === 7 ? 0 : this.berthA3Counter)

                    //         this.timeDoneWaitingForNextCar = 0

                    //         this.updateBerthTime()

                    //         this.startTimer()
                    //     })
                    // }

                    // if ((this.berthName === "Priority") && (this.isTimeUp) && (this.timeDoneWaitingForNextCar === this.timeToWaitForPwdNextCar)) {
                    //     clearInterval(timer)

                    //     update(ref(db, 'berth-live-info'), {
                    //         'berth-pwd': this.berthPwdCarList[this.berthPwdCounter]
                    //     }).then(() => {
                    //         this.berthPwdCounter = this.berthPwdCounter + 1
                    //         this.berthPwdCounter = (this.berthPwdCounter === 5 ? 0 : this.berthPwdCounter)

                    //         this.timeDoneWaitingForNextCar = 0

                    //         this.updateBerthTime()

                    //         this.startTimer()
                    //     })
                    // }
                }

                // Checking to show 00 instead of 0 for seconds
                if (this.displaySeconds < 10) {
                    this.displaySeconds = "0" + this.displaySeconds
                }

                // Check if no car
                if (this.berthCarNumber === "-") {
                    this.displayMinutes = "-"
                    this.displaySeconds = "--"

                    this.isLessThanOneMinuteLeft = false
                    this.isTimeUp = false
                }

                // console.log(this.displayMinutes + ":" + this.displaySeconds)

            }, 1000)
        },
        updateBerthTime() {
            console.log("Updating Time For " + this.berthName)

            this.startTimer()

            // this.berthTime = (new Date().getTime()) + this.millisecondsInFiveMinutes

            this.$emit('update-berth', this.berthName)
        },
    },
    mounted() {
        this.startTimer()
    }
}
</script>

<style scoped>
.berth-details {
    display: flex;
    flex-direction: row;
    /* background-color: #D9D9D9; */
    padding: 20px 20px;
    text-align: center;
    margin: 10px 15px;
    border-radius: 20px;
    font-size: 51px;
}

.berth-details-background-white {
    background-color: #fff;
}

.berth-details-background-gray {
    /* background-color: #D9D9D9; */
    background-color: #F9F9F9;
}

.berth-label {
    flex-basis: 33%;
}

.berth-label-text {
    /* background-color: #88cbc7; */
    padding: 20px;
    border-radius: 20px;
    margin: 0px 80px;
    color: #fff;
}

.berth-label-background-normal {
    background-color: #88cbc7;
}

.berth-label-background-pwd {
    background-color: #6B9AE0;
}

.berth-car-number {
    flex-basis: 33%;
    padding: 20px;
}

.berth-car-number-text-red {
    color: #E10F0F;
}

.berth-car-number-text-blink {
    animation: blink 1s linear infinite;
}

@keyframes blink{
    0%{opacity: 0;}
    33%{opacity: 0.33;}
    50%{opacity: 0.5;}
    67%{opacity: .67;}
    100%{opacity: 1;}
}

.berth-car-number-text-black {
    color: #000;
}

.berth-status {
    flex-basis: 33%;
    padding: 20px;
}

.berth-status-text-red {
    color: #E10F0F;
}

.berth-status-text-blink {
    animation: blink 1s linear infinite;
}

.berth-status-text-black {
    color: #000;
}
</style>