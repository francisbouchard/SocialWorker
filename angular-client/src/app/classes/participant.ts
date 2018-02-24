export class Participant {
    _id: String;
    name: String;
    pronouns: String;
    address: String;
    telephone: String;
    email: String;
    socialmedia: { service: String, username: String };
    notes: [any];
    documents: [any];
    socialworkers: [any];
}
