import { Participant } from './participant';

export class Case {
    participant: String;
    status: String;
    notes: String;
    contactedResources: Map<String, String>;
}
