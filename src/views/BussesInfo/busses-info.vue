<template>
  <div class='container'>

    <ul class="nav nav-tabs p-4 rounded bg-white">
        <li class="nav-item" @click="switchTab('bus-lines')">
          <a class="nav-link" :class="{ active: activeTab === 'bus-lines' }" href="#">Bus Lines</a>
        </li>
        <li class="nav-item" @click="switchTab('bus-stops')">
          <a class="nav-link" :class="{ active: activeTab === 'bus-stops' }" href="#">Bus Stops</a>
        </li>
    </ul>
    <router-view></router-view>
  </div>
</template>


<script>

export default {
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
      this.$router.push({ path: `/buss/${tab}` });
    },
    async fetchBusStops() {
      await this.$store.dispatch('fetchBusStops');
    },
  },
  data() {
    return {
      activeTab: "bus-lines",
    };
  },
  mounted() {
    this.fetchBusStops()
  },
};
</script>