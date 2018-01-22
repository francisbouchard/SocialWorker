import { Participant } from './participant';

export class Case {
    _id: String;
    status: String;
    urgency: String;
    comment: String;
    shelters: Map<String, String>;
    shelterchosen: String;
}
