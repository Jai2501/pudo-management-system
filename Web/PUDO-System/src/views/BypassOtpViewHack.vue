<template>
  <div id="lol" class="container">
      <input type="tel" placeholder="{{ this.countryCode }}" v-model="this.countryCode">
      <input type="tel" placeholder="{{ this.phoneNumber }}" v-model="this.phoneNumber">
      <button @click.prevent="sendOtpToGivenNumber" id="send-otp">Send OTP</button>
      <div class="recaptcha-container"></div>
  </div>
</template>

<script>
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {ref, onValue } from "firebase/database";
import { database } from "../firebase/init"

export default {
    name: "BypassOtpViewHack",
    data() {
        return {
            countryCode: "+65",
            phoneNumber: null,
            appVerifier: null,
            workaroundStarted: false,
            canUpdateNow: false
        }
    },
    methods: {
        getAndListenToPhoneNumber() {
            console.log("Listening to phone number")
            this.phoneNumber = "89474057"

            // On Value Change, trigger send OTP
            // user-verification-bypass

            const db = database

            const userVerificationBypassRef = ref(db, 'user-verification-bypass');

            onValue(userVerificationBypassRef, (snapshot) => {
                const data = snapshot.val()
                console.log("Obatined/Changes: " + data["phone-number"])
                this.phoneNumber = data["phone-number"]

                if (this.canUpdateNow) {
                    this.sendOtpToGivenNumber()
                } else {
                    this.canUpdateNow = true
                }
            })

        },
        async sendOtpToGivenNumber() {
            console.log("Begging the Holy Grail")

            const auth = getAuth();
            console.log("Initialised Auth")

            if ((this.phoneNumber.length < 8) || (this.phoneNumber.length > 8)) {
                console.log("Invalid Number Baby")
                return
            }

            if (!this.workaroundStarted) {
                Window.recaptchaVerifier = new RecaptchaVerifier('send-otp', {
                    'size': 'invisible',
                    'callback': (response) => {
                        // reCAPTCHA solved, allow signInWithPhoneNumber.
                        console.log("I AM INVINCIBLE")
                        // onSignInSubmit();
                    }
                }, auth);

                console.log("Recaptcha Set")

                this.workaroundStarted = true
            }

            console.log("Recaptcha Already Set")
            
            const phoneNumber = this.countryCode + this.phoneNumber
            const appVerifier = Window.recaptchaVerifier
            console.log("Recaptcha Assigned to Var")

            console.log("Signing in")
            console.log("Phone Number: " + this.countryCode + this.phoneNumber)
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                    console.log("Signed In")
                    Window.confirmationResult = confirmationResult;
                // ...
                }).catch((error) => {
                // Error; SMS not sent
                // ...
                    console.log("Bastard")
                    console.log(error)
                });
        },
        initializeReCaptcha() {
            console.log("Initialzed ReCaptcha")

            const auth = getAuth();

            Window.recaptchaVerifier = new RecaptchaVerifier('send-otp', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    console.log("I AM INVINCIBLE")
                    // onSignInSubmit();
                }
            }, auth);

        //     setTimeout(()=>{
        //         let vm = this
        //         window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        //             'size': 'invisible',
        //             'callback': function(response) {
        //             // reCAPTCHA solved, allow signInWithPhoneNumber.
        //             // ...
        //             },
        //             'expired-callback': function() {
        //             // Response expired. Ask user to solve reCAPTCHA again.
        //             // ...
        //             }
        //         });
        //   //
        //         this.appVerifier =  window.recaptchaVerifier
        //     }, 1000)
        }
    },
    mounted() {
        this.getAndListenToPhoneNumber()
    },
    created() {
        // this.initializeReCaptcha()
    }
}
</script>

<style scoped>

</style>