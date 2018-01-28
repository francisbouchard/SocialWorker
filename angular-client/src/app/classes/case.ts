import { Participant } from './participant';

export class Casefile {
    participant: String;
    status: String;
    urgency: String;
    notes: String;
    contactedResources: Array<any>;
}
