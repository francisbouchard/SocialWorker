import { Casefile    } from './case';

export class Participant {
    _id: String;
    name: String;
    pronouns: String;
    address: String;
    telephone: String;
    email: String;
    socialmedia: { service: String, username: String };
    notes: [any];
}
