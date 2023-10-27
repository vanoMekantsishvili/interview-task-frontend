<template>
  <div class='mt-3'>
    <h2>Bus Stops</h2>
    
    <input type="email" class="form-control mb-4" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search..." v-model="searchInput" @input="onSearchInput">
   
    <div class='p-3 rounded bg-white' v-if="!!filteredBusStops" style='min-height: 200px; max-height: 500px; overflow: auto;'>
      <ul class="list-group list-group-flush">
          <li 
            class="list-group-item" 
            v-for="busStop in filteredBusStops" :key="busStop"
          >
            {{ busStop}}
          </li>
      </ul>
    </div>
    
  </div>
</template>


<script>
import { mapGetters } from 'vuex';


export default {
  methods: {
    onSearchInput() {
      this.getBusStopsBySearchResult = this.getBusStopNames(this.searchInput);
    },
  },
  computed: {
    ...mapGetters([
      'getIsLoading',
      'getBusStopNames', 
    ]),
    filteredBusStops() {
      if(this.searchInput) {
        return this.getBusStopsBySearchResult;
      }
      
      return this.getBusStopNames()
    },
    isLoading() {
      return this.getIsLoading;
    },
    
  },
  data() {
    return {
      getBusStopsBySearchResult: null,
      searchInput: '',
    };
  },
}
</script>