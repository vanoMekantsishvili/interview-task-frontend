import { API_GET_STOPS } from "@/constants";
import { Buss, BussLine, BussStop, BussTime } from "@/models/buss";
import axios from "axios";
import { Commit } from "vuex";

const state = {
  busLines: [],
  busStopNames: [],
  isLoading: false
};

const mutations = {
  setBussData(
    state: { busLines: Buss[], busStopNames: string[] }, 
    payload: { busLines: Buss[], busStopNames: string[] }
  ) 
    {
        state.busLines = payload.busLines;
        state.busStopNames = payload.busStopNames;
   },
   setIsLoading(state: { isLoading: boolean }, payload: { isLoading: boolean }) {
    state.isLoading = payload.isLoading
   }
};


const actions = {
    async fetchBusStops({commit}: { commit: Commit}) {
        commit('setIsLoading', true);
        try {
          const { data } = await axios(API_GET_STOPS, { method: 'GET'}) 
          
          const bussesResult = parseData(data)
          
          commit('setBussData', bussesResult); 
          commit('setIsLoading', false);
        } catch (error) {
            commit('setIsLoading', false);
            console.error('Error fetching food data:', error);
        }
      },
};

const  getters = {
    getIsLoading: (state: { isLoading: boolean }) => state.isLoading,
    getBusLines: (state: { busLines: Buss[] }) => state.busLines,
    getBusStopsByBusLine: (state: { busLines: Buss[] }) => 
        (activeBusLine: number) => 
        {
            return state.busLines.find(item => item.line === activeBusLine)
        },
    getBusStopTimes: (state: { busLines: BussLine[] }) => 
        (activeBusLine: number, stopName: string) => 
    {
        const selectedBusLine = state.busLines.find(item => item.line === activeBusLine)
        
        const activeStop = selectedBusLine?.stops.find(stop => stop.name === stopName)
        const activeTimes = activeStop?.times.sort((a, b) => a.order - b.order);
        
        return activeStop
    },
    getBusStopNames: (state: { busStopNames: Buss[] }) => state.busStopNames,
}

const parseData = (data: Buss[]) => {
    const result: Record<string, BussLine> = {}
    const stops: Record<string, string> = {}


    for(let i=0; i<data.length; i++) {
        let busLine = result[data[i].line]
        if(!busLine) {
            busLine = new BussLine(data[i].line, [])
            result[data[i].line] = busLine
        } 

        let stop =  busLine.stops.find(item => item.name === data[i].stop)
        if(!stop) {
            stop = new BussStop(data[i].stop,[],data[i].order)
            busLine.stops.push(stop)
        } 
        stop.addTime(data[i].time)

        const stopName = stops[data[i].stop]
        if(!stopName) {
            stops[data[i].stop] = data[i].stop
        }
       
    }

    return {
        busLines: Object.values(result),
        stopNames: Object.values(stops)
    }
    
}

export default {
  state,
  mutations,
  actions,
  getters
};