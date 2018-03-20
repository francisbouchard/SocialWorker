import { Resource } from './resource';

export class Medical extends Resource {
    without_cost: { type: String};
    waitlist_time: { type: String};
    schedule_availability:  { type: String};
}
