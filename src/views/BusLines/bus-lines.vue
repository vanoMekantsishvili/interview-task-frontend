<template>
  <div class='mt-3'>
    <div class='row mb-4 p-4 rounded bg-white'>
      <div class='col-12'>
        <h2 class='mb-3'>Select bus lines</h2>
        <button 
          type="button" 
          class="btn btn-primary mx-2" 
          v-for="item in busLines" :key="item.line"
          @click="getBusStopsByBusLineHandler(item.line)"
        >
          {{ item.line }}
        </button>
      </div>
    </div>
    <div class='row'>
      <div class='col-5 py-3 rounded bg-white' style='min-height: 200px; max-height: 500px; overflow: auto;'>
        <div v-if="selectedBusLine">
          <h4 class='mb-3'>Bus line: {{selectedBusLine.line}}</h4>

          <div class="list-group">
            <button  
              type="button" 
              class="list-group-item list-group-item-action" 
              aria-current="true"
              v-for="stop in selectedBusLine.stops" :key="stop.name"
              @click="getBusStopTimesHandler(selectedBusLine.line, stop.name)"
            >
              {{ stop.name }}
            </button>
          </div>
        </div>
        
        <span v-else>Please select the bus line first</span>
      </div>
      <div class='col-2'></div>
      <div class='col-5 py-3 rounded bg-white' style='min-height: 200px; max-height: 500px; overflow: auto;'>
        <div v-if="selectedBusStop">
          <h4 class='mb-3'>Bus stop: {{selectedBusStop.name}}</h4>

          <ul class="list-group list-group-flush">
            <li 
              class="list-group-item" 
              v-for="stop in selectedBusStop.times.sort((a, b) => a.order - b.order)" :key="stop.time"
            >
              {{ stop.time }}
            </li>
          </ul>
        </div>
        <div v-else>
          <span v-if="selectedBusLine">Please select the bus stop first</span>
          <span v-else>Please select the bus line first</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';


export default {
  methods: {
    async fetchBusStops() {
      await this.$store.dispatch('fetchBusStops');
    },
    getBusStopsByBusLineHandler(busLine) {
      this.getBusStopsByBusLineResult = this.getBusStopsByBusLine(busLine);
    },
    getBusStopTimesHandler(busLine, stopName) {
      this.getBusStopTimesResult = this.getBusStopTimes(busLine, stopName)
    }
  },
  computed: {
    ...mapGetters([
      'getIsLoading', 
      'getBusLines', 
      'getBusStopsByBusLine', 
      'getBusStopTimes'
    ]),
    isLoading() {
      return this.getIsLoading;
    },
    busLines() {
      return this.getBusLines; 
    },
    selectedBusLine() {
      return this.getBusStopsByBusLineResult; 
    },
    selectedBusStop() {
      return this.getBusStopTimesResult; 
    }
  },
  data() {
    return {
      getBusStopsByBusLineResult: null,
      getBusStopTimesResult: null
    };
  },
  mounted() {
    this.fetchBusStops()
  },
}
</script>