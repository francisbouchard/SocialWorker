import { Participant } from './participant';

export class Case {
    _id: String;
    participant: String;
    status: String;
    urgency: String;
    notes: String;
    contactedResources: Map<String, String>;
}
