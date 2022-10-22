<template>
  <div class="container">
      <h1>Berth Display {{ this.berthDisplayTitle }}</h1>
      <h2>{{ this.berthCarNumber }}</h2>
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
            berthCarNumber: null
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
                    this.berthDisplayTitle = "PWD"
                    this.berthFetchName = berthPwd
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

<style>

</style>