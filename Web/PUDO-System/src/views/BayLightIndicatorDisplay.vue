<template>
  <div class="container">
      <div class="timer">
          {{this.displayMinutes + ":" + (this.displaySeconds < 10 ? "0" : "") + this.displaySeconds}}
          <!-- <seven-segment value="8" :rounded="false" :segment-width="25" :segment-height="5" on-color="#f00" off-color="#f00"/> -->
      </div>
  </div>
</template>

<script>
// import SevenSegmentDisplay from 'vue-seven-segment-display';
import { ref, onValue } from "firebase/database";
import { database, berthA2 } from "../firebase/init"

export default {
    name: "BayLightIndicatorDisplay",
    components: {},
    props: ["berthDisplayNumber"],
    data() {
        return {
            millisecondsInFiveMinutes: 300000,
            millisecondsInThreeMinutes: 180000,
            millisecondsInASecond: 1000,
            berthCarTime: null,
            berthCarNumber: null,
            displaySeconds: 0,
            displayMinutes: 0,
            isLessThanOneMinuteLeft: false,
            isTimeUp: false
        }
    },
    methods: {
        async getBerthData() {
            const liveBerthInfoRef = ref(database, 'berth-live-info');

                onValue(liveBerthInfoRef, (snapshot) => {
                const data = snapshot.val()

                this.berthCarNumber = data[berthA2]
                this.berthCarTime = data[berthA2 + "-time"]

                console.log(this.berthCarNumber + ", " + this.berthCarTime)
            })
        },
        startTimer() {
            // A second has 1000ms
            // A minute has 60 seconds = 60000ms

            // Issue with late getting time

            console.log("Started Timer for Bay Light Indicator Display")
            console.log("Berth Car Number " + this.berthCarNumber)

            const end = new Date().getTime() + this.millisecondsInThreeMinutes
            // let end = this.berthCarTime

            console.log("Berth End Time: " + end)

            console.log("Now " + new Date())
            console.log("End " + end)

            this.isLessThanOneMinuteLeft = false
            this.isTimeUp = false

            let prevCarNumber = this.berthCarNumber

            const timer = setInterval(() => {
                const now = new Date()

                // Checking for changes in Car Number
                if (prevCarNumber !== this.berthCarNumber && (prevCarNumber !== null)) {
                    clearInterval(timer)

                    this.isLessThanOneMinuteLeft = false
                    this.isTimeUp = false

                    this.startTimer()
                    return
                }

                prevCarNumber = this.berthCarNumber

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
                }

                // Checking to show 00 instead of 0 for seconds
                // if (this.displaySeconds < 10) {
                //     this.displaySeconds = "0" + this.displaySeconds
                // }

                // Check if no car
                if (this.berthCarNumber === "-") {
                    this.displayMinutes = "-"
                    this.displaySeconds = "--"

                    this.isLessThanOneMinuteLeft = false
                    this.isTimeUp = false
                }

                console.log(this.displayMinutes + ":" + this.displaySeconds)
            }, 1000)
        }
    },
    mounted() {
        this.getBerthData()
        this.startTimer()
    }
}
</script>

<style scoped>
/* @font-face {
  font-family: "SevenSegment";
  src: local("SevenSegment"),
   url(../fonts/Inter/seven-segment/Seven-Segment.ttf) format("truetype");
} */

@font-face {
  font-family: "SevenSegment";
  src: local("SevenSegment"),
   url(../fonts/Inter/7segment.ttf) format("truetype");
}

.container {
    font-family: SevenSegment;
    background: black;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
}

.timer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: red;
    height: 100vh;
    font-size: 200px;
    font-family: SevenSegment;
}

</style>