<template>
  <div class="container">
      <!-- <div class="berth-number"
      :class="{
          'berth-number-priority': this.isPriority
      }">
          {{ this.berthDisplayTitle }}
      </div> -->
      <div class="car-number">
            {{ this.berthCarNumber }}
      </div>
  </div>
</template>

<script>
import { database, berthA1, berthA2, berthA3, berthA4, berthPwd } from "../firebase/init"
import { ref, onValue } from "firebase/database"

export default {
    name: "BerthDisplay",
    props: ["berthDisplayNumber"],
    data() {
        return {
            berthDisplayTitle: null,
            berthFetchName: null,
            berthCarNumber: null,
            isPriority: false
        }
    },
    methods: {
        async getBerthCarNumber() {
            const liveBerthInfoRef = ref(database, 'berth-live-info');

            onValue(liveBerthInfoRef, (snapshot) => {
                const data = snapshot.val()
                console.log("Value Changed/Obtained")

                this.berthCarNumber = data[this.berthFetchName]
            })
        },
        setBerth() {
            switch(this.berthDisplayNumber) {
                case "1":
                    this.berthDisplayTitle = "A1"
                    this.berthFetchName = berthA1
                    break
                case "2":
                    this.berthDisplayTitle = "A2"
                    this.berthFetchName = berthA2
                    break
                case "3":
                    this.berthDisplayTitle = "A3"
                    this.berthFetchName = berthA3
                    break
                case "4":
                    this.berthDisplayTitle = "A4"
                    this.berthFetchName = berthA4
                    break
                default:
                    this.berthDisplayTitle = "Priority"
                    this.berthFetchName = berthPwd
                    this.isPriority = true
            }
        }
    },
    mounted() {
        console.log("Mounted")
        this.setBerth()
        this.getBerthCarNumber()
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
    background: black;
}

.berth-number {
    background: #88CBC7;
    padding: 75px 75px;
    border-radius: 90px;
    color: #fff;
    font-size: 80px;
    margin: 100px 0px;

}

.berth-number-priority {
    background: #6B9AE0;
}

.car-number {
    /* background: #D9D9D9;
    color: #535353; */

    background: #000;
    color: #fff;

    padding: 70px 170px;
    font-weight: 700;
    font-size: 148px;
    border-radius: 50px;
}
</style>