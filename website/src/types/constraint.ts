import { Day, EndTime, StartTime } from "./modules";

export type Constraint = {
    index: Number;
    title: string;
    satisfied: boolean;
    description: string;
    startTime: StartTime;
    endTime: EndTime;
    day: string 
    writable: true
}