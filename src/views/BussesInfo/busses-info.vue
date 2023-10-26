<template>
  <div class='container'>

  <ul class="nav nav-tabs">
      <li class="nav-item" @click="switchTab('bus-lines')">
        <a class="nav-link" :class="{ active: activeTab === 'bus-lines' }" href="#">Bus Lines</a>
      </li>
      <li class="nav-item" @click="switchTab('bus-stops')">
        <a class="nav-link" :class="{ active: activeTab === 'bus-stops' }" href="#">Bus Stops</a>
      </li>
    </ul>
    <router-view></router-view>
    <!-- <b-tabs v-model="activeTab" @input="changeTab">
      <b-tab title="Bus Stops" active>
        <router-view name="busStops"></router-view>
      </b-tab>
      <b-tab title="Bus Lines">
        <router-view name="busLines"></router-view>
      </b-tab>
    </b-tabs> -->

    <!-- <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
    Bus lines
    </button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
    Stops
    </button>
  </li>
</ul> -->
  </div>
</template>


<script>
import BusStops from '@/views/BusStops/bus-stops.vue';
import BusLines from '@/views/BusLines/bus-lines.vue';

export default {
  data() {
    return {
      activeTab: "bus-lines",
    };
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
      this.$router.push({ path: `/buss/${tab}` });
    },
  },
};
</script>