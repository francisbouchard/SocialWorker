import { Casefile    } from './case';

export class Participant {
    _id: String;
    name: String;
    address: String;
    telephone: String;
    email: String;
    socialmedia: { service: String, username: String };
    cases: Set<String>;
}
