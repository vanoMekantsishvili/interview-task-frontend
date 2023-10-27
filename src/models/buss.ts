export class Buss {
    line: number;
    stop: string;
    order: number;
    time: string;
  
    constructor(line: number, stop: string, order: number, time: string) {
      this.line = line;
      this.stop = stop;
      this.order = order;
      this.time = time;
    }
}

export class BussLine {
    line: number;
    stops: BussStop[];
    
  
    constructor(line: number, stops: BussStop[]) {
      this.line = line;
      this.stops = stops; 
    }
}

export class BussStop {
    name: string;
    order: number;
    times: BussTime[];
    
  
    constructor(name: string, times: BussTime[],  order: number) {
      this.name = name;
      this.times = times; 
      this.order = order; 
    }

    addTime = (time: string) => {
        const newTime = new BussTime(time)
        this.times.push(newTime)
    }
}

export class BussTime {
    time: string;
    order: number;
   
    constructor(time: string) {
      this.time = time; 
      this.order = parseFloat(time.split(":")[0] + "." +  time.split(":")[1])
    }
}