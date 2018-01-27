import { Participant } from './participant';

export class Case {
    participant: String;
    status: String;
    urgency: String;
    notes: String;
    contactedResources: Array<any>;
}
