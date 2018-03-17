import { Resource } from './resource';

export class Medical extends Resource {
    without_cost: Boolean;
    waitlist_time: { type: String};
    schedule_availability: [String];
}
