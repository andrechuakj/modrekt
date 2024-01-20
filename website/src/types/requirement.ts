import { Day, EndTime, StartTime } from "./modules";

export type Requirement = {
    title: string;
    satisfied: boolean;
    description: string;
    startTime: StartTime;
    endTime: EndTime;
    day: Day
}