<template>
    <div>
    <!-- <bus-info></bus-info> -->
    <router-view></router-view>
    </div>
    
</template>

<script>
import BusInfo from '@/views/BussesInfo/busses-info.vue';

export default {
  components: {
    //BusInfo
  },
};
</script>