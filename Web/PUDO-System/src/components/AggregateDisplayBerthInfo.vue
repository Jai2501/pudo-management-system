<template>
    <div class="berth-details">
        <div class="berth-label">
            <div class="berth-label-text">
                {{ this.berthName }}
            </div>
        </div>
        <div class="berth-car-number">
            {{ this.berthCarNumber }}
        </div>
        <div class="berth-status">
            {{ this.berthTime }}
        </div>
    </div>
</template>

<script>
export default {
    name: "AggregateDisplayBerthInfo",
    props:["berthName", "berthCarNumber", "berthTime"]
}
</script>

<style scoped>
.berth-details {
    display: flex;
    flex-direction: row;
    background-color: #D9D9D9;
    padding: 30px 20px;
    text-align: center;
    margin: 15px;
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