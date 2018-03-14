import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class MockTrashService {
    testResource = {
        'constraints': [],
        'kind': 'Housing',
        '_id': '5a6cac2bdf03f80ede3f5c3e',
        'name': 'Housing Facility For Testing',
        'email': 'housing@resource.com',
        'term': '5 weeks',
        'createdAt': '2018-01-27T16:43:26.756Z',
        'updatedAt': '2018-01-27T16:43:26.756Z',
        '__v': 0
      };

    getAll() {
        return Observable.of([
          {
            "constraints": [
              ""
            ],
            "deleted": true,
            "kind": "Housing",
            "_id": "5aa18d8f49888b7d302fb073",
            "name": "housing123",
            "email": "",
            "location": "",
            "notes": "",
            "term": "",
            "gender": "",
            "createdAt": "2018-03-08T19:22:55.151Z",
            "updatedAt": "2018-03-08T19:22:55.151Z",
            "__v": 0,
            "model": "Resource"
          },
          {
            "constraints": [
              ""
            ],
            "deleted": true,
            "kind": "Housing",
            "_id": "5aa18f75662aa17edfee780a",
            "name": "some housing rsrc",
            "email": "hous@ing.com",
            "location": "123123",
            "notes": "",
            "term": "",
            "gender": "",
            "createdAt": "2018-03-08T19:31:01.572Z",
            "updatedAt": "2018-03-08T19:31:11.979Z",
            "__v": 0,
            "model": "Resource"
          },
          {
            "socialmedia": {
              "service": "Facebook",
              "username": "joey-b"
            },
            "documents": [
              {
                "date": "2018-02-11T20:39:09.612Z",
                "attachment": [],
                "_id": "5a80aa1071736202c040a740",
                "type": "img test",
                "createdAt": "2018-02-11T20:39:44.517Z",
                "updatedAt": "2018-02-11T20:39:44.517Z"
              },
              {
                "date": "2018-02-11T20:41:40.239Z",
                "attachment": [],
                "_id": "5a80aa8471736202c040a741",
                "createdAt": "2018-02-11T20:41:40.399Z",
                "updatedAt": "2018-02-11T20:41:40.399Z"
              },
              {
                "date": "2018-02-11T20:42:27.521Z",
                "attachment": [],
                "_id": "5a80aab371736202c040a742",
                "createdAt": "2018-02-11T20:42:27.684Z",
                "updatedAt": "2018-02-11T20:42:27.684Z"
              }
            ],
            "notes": [],
            "socialworkers": [
              "5a7f87db2970548423dfb007"
            ],
            "deleted": true,
            "_id": "joeyB",
            "name": "Joey",
            "email": "joey@gmail.com",
            "telephone": "(514) 123-4567",
            "address": "",
            "pronouns": "he/him",
            "createdAt": "2018-02-08T20:33:42.717Z",
            "updatedAt": "2018-02-18T21:15:00.225Z",
            "__v": 5,
            "model": "Participant"
          }
        ]);
    }

    get(id) {
        return Observable.of(this.testResource);
    }
}
