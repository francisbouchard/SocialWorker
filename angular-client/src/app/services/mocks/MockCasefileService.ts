import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class MockCasefileService {
    testCasefile = [{
      '_id' : '5a6df920087c7d3fc9dddfe9',
      'contactedResources' : [
          {
              '_id' : '5a8466e2ae933b1fe1714eea',
              'dateContacted' : '2018-02-14T22:57:22.651Z',
              'note' : 'Does not take pets',
              'resource' : {
                'constraints': [],
                'deleted' : false,
                'kind': 'Housing',
                '_id': '5a6cac2bdf03f80ede3f5c3e',
                'name': 'Housing Facility 4 Name',
                'email': 'housing4@resource.com',
                'term': '5 weeks',
                'createdAt': '2018-01-27T16:43:26.756Z',
                'updatedAt': '2018-01-27T16:43:26.756Z',
                '__v': 0
              },
              'isContacted' : false
          }
      ],
      'createdAt' : '2018-01-28T16:24:00.297Z',
      'notes' : [
          'Needs urgent housing'
      ],
      'date' : '2018-01-28T16:24:00.286Z',
      'deleted' : false,
      'participant' : 'frontendtest',
      'selectedResource' : null,
      'status' : 'In progress',
      'type' : 'Housing',
      'updatedAt' : '2018-01-28T16:24:00.297Z',
      'urgency' : 'Urgent',
      '__v' : 0
  }];

    getAll() {
        return Observable.of([
          {
            '_id' : '5a5ad8aaa87da4076691d0ce',
            'contactedResources' : [],
            'notes' : [
                'No note'
            ],
            'date' : '2018-01-14T04:12:26.423Z',
            'participant' : 'frontendtest',
            'status' : 'Completed',
            'createdAt' : '2018-01-14T04:12:26.435Z',
            'updatedAt' : '2018-01-14T04:12:26.435Z',
            '__v' : 0
        },
        {
          '_id' : '5a6d0c3587753f20fae48204',
          'contactedResources' : [
              {
                  '_id' : '5a5a6899d77cc82527c5dc48',
                  'isContacted' : false
              },
              {
                  '_id' : '5a5aa41d8d31db2a0377415a',
                  'isContacted' : false
              },
              {
                  '_id' : '5a5d3f4d03af28260c70dc4e',
                  'isContacted' : false
              }
          ],
          'notes' : [
              'test'
          ],
          'date' : '2018-01-27T23:33:09.530Z',
          'participant' : 'frontendtest',
          'status' : 'In progress',
          'urgency' : 'Urgent',
          'createdAt' : '2018-01-27T23:33:09.538Z',
          'updatedAt' : '2018-01-27T23:33:09.538Z',
          '__v' : 0
      },
      {
        '_id' : '5a6df920087c7d3fc9dddfe9',
        'contactedResources' : [
            {
                '_id' : '5a5a56dcc2b50d7fa8d9373d',
                'isContacted' : false
            },
            {
                '_id' : '5a5a6899d77cc82527c5dc48',
                'isContacted' : false
            },
            {
                '_id' : '5a5aa41d8d31db2a0377415a',
                'isContacted' : false
            },
            {
                '_id' : '5a5d3f4d03af28260c70dc4e',
                'isContacted' : false
            },
            {
                '_id' : '5a6bc3c295728f0be8064f78',
                'isContacted' : false
            }
        ],
        'notes' : [
            'Broke something'
        ],
        'date' : '2018-01-28T16:24:00.286Z',
        'participant' : 'frontendtest',
        'status' : 'In progress',
        'urgency' : 'Urgent',
        'createdAt' : '2018-01-28T16:24:00.297Z',
        'updatedAt' : '2018-01-28T16:24:00.297Z',
        '__v' : 0
    }
        ]);
    }

    getAllActive() {
        return Observable.of([
            {
              "contactedResources": [
                {
                  "isContacted": false,
                  "resource": null,
                  "dateContacted": null,
                  "note": null,
                  "_id": "5aaeb06413e113d3a360988e"
                }
              ],
              "notes": [
                null
              ],
              "date": "2018-03-18T18:30:53.938Z",
              "deleted": false,
              "_id": "5aaeb06413e113d3a360988f",
              "createdBy": {
                "tokens": [],
                "role": "admin",
                "deleted": false,
                "_id": "5a6ca05f54297a0c500cbd41",
                "name": "James",
                "email": "james@astteq.org",
                "password": "$2a$10$jnu1d5jGRaMXNXtt6l/eW.xW/XpyoZd4sdibumj8yvihTsvYH16mC",
                "createdAt": "2018-01-27T15:53:03.674Z",
                "updatedAt": "2018-01-27T15:53:03.674Z",
                "__v": 0
              },
              "updatedBy": {
                "tokens": [],
                "role": "admin",
                "deleted": false,
                "_id": "5a6ca05f54297a0c500cbd41",
                "name": "James",
                "email": "james@astteq.org",
                "password": "$2a$10$jnu1d5jGRaMXNXtt6l/eW.xW/XpyoZd4sdibumj8yvihTsvYH16mC",
                "createdAt": "2018-01-27T15:53:03.674Z",
                "updatedAt": "2018-01-27T15:53:03.674Z",
                "__v": 0
              },
              "participant": {
                "socialmedia": {
                  "service": "",
                  "username": ""
                },
                "documents": [],
                "notes": [],
                "socialworkers": [
                  "5a6ca05f54297a0c500cbd41"
                ],
                "deleted": false,
                "_id": "5aaea8fab858a4d1d1126cf5",
                "name": "Charlene",
                "email": "",
                "pronouns": "",
                "telephone": "",
                "address": "",
                "username": "Charlene_6cf5",
                "createdAt": "2018-03-18T17:59:22.178Z",
                "updatedAt": "2018-03-18T17:59:22.241Z",
                "__v": 0
              },
              "status": "In progress",
              "type": "Housing",
              "urgency": "Urgent",
              "createdAt": "2018-03-18T18:31:00.448Z",
              "updatedAt": "2018-03-18T18:31:00.448Z",
              "__v": 0
            },
            {
              "contactedResources": [
                {
                  "isContacted": false,
                  "resource": null,
                  "dateContacted": null,
                  "note": null,
                  "_id": "5aaeb03e13e113d3a360988c"
                }
              ],
              "notes": [
                null
              ],
              "date": "2018-03-18T18:30:15.572Z",
              "deleted": false,
              "_id": "5aaeb03e13e113d3a360988d",
              "createdBy": {
                "tokens": [],
                "role": "admin",
                "deleted": false,
                "_id": "5a6ca05f54297a0c500cbd41",
                "name": "James",
                "email": "james@astteq.org",
                "password": "$2a$10$jnu1d5jGRaMXNXtt6l/eW.xW/XpyoZd4sdibumj8yvihTsvYH16mC",
                "createdAt": "2018-01-27T15:53:03.674Z",
                "updatedAt": "2018-01-27T15:53:03.674Z",
                "__v": 0
              },
              "updatedBy": {
                "tokens": [],
                "role": "admin",
                "deleted": false,
                "_id": "5a6ca05f54297a0c500cbd41",
                "name": "James",
                "email": "james@astteq.org",
                "password": "$2a$10$jnu1d5jGRaMXNXtt6l/eW.xW/XpyoZd4sdibumj8yvihTsvYH16mC",
                "createdAt": "2018-01-27T15:53:03.674Z",
                "updatedAt": "2018-01-27T15:53:03.674Z",
                "__v": 0
              },
              "participant": {
                "socialmedia": {
                  "service": "",
                  "username": ""
                },
                "documents": [],
                "notes": [],
                "socialworkers": [
                  "5a6ca05f54297a0c500cbd41"
                ],
                "deleted": false,
                "_id": "5aaea8fab858a4d1d1126cf5",
                "name": "Charlene",
                "email": "",
                "pronouns": "",
                "telephone": "",
                "address": "",
                "username": "Charlene_6cf5",
                "createdAt": "2018-03-18T17:59:22.178Z",
                "updatedAt": "2018-03-18T17:59:22.241Z",
                "__v": 0
              },
              "status": "In progress",
              "type": "Housing",
              "urgency": "Urgent",
              "createdAt": "2018-03-18T18:30:22.556Z",
              "updatedAt": "2018-03-18T18:30:22.556Z",
              "__v": 0
            },
            {
              "contactedResources": [
                {
                  "isContacted": true,
                  "resource": null,
                  "dateContacted": "2018-03-18T18:29:54.805Z",
                  "note": null,
                  "_id": "5aaeaff613e113d3a360988a"
                }
              ],
              "notes": [
                null
              ],
              "date": "2018-03-18T18:28:59.228Z",
              "deleted": false,
              "_id": "5aaeaff613e113d3a360988b",
              "createdBy": {
                "tokens": [],
                "role": "admin",
                "deleted": false,
                "_id": "5a6ca05f54297a0c500cbd41",
                "name": "James",
                "email": "james@astteq.org",
                "password": "$2a$10$jnu1d5jGRaMXNXtt6l/eW.xW/XpyoZd4sdibumj8yvihTsvYH16mC",
                "createdAt": "2018-01-27T15:53:03.674Z",
                "updatedAt": "2018-01-27T15:53:03.674Z",
                "__v": 0
              },
              "updatedBy": {
                "tokens": [],
                "role": "admin",
                "deleted": false,
                "_id": "5a6ca05f54297a0c500cbd41",
                "name": "James",
                "email": "james@astteq.org",
                "password": "$2a$10$jnu1d5jGRaMXNXtt6l/eW.xW/XpyoZd4sdibumj8yvihTsvYH16mC",
                "createdAt": "2018-01-27T15:53:03.674Z",
                "updatedAt": "2018-01-27T15:53:03.674Z",
                "__v": 0
              },
              "participant": {
                "socialmedia": {
                  "service": "",
                  "username": ""
                },
                "documents": [],
                "notes": [],
                "socialworkers": [
                  "5a6ca05f54297a0c500cbd41"
                ],
                "deleted": false,
                "_id": "5aaea8fab858a4d1d1126cf5",
                "name": "Charlene",
                "email": "",
                "pronouns": "",
                "telephone": "",
                "address": "",
                "username": "Charlene_6cf5",
                "createdAt": "2018-03-18T17:59:22.178Z",
                "updatedAt": "2018-03-18T17:59:22.241Z",
                "__v": 0
              },
              "status": "In progress",
              "type": "Housing",
              "urgency": "Regular",
              "createdAt": "2018-02-18T18:29:10.571Z",
              "updatedAt": "2018-02-18T18:29:54.924Z",
              "__v": 0
            }
          ]);
    }

    getRecentlyUpdated() {
        return Observable.of([
            {
              "contactedResources": [
                {
                  "isContacted": false,
                  "resource": null,
                  "dateContacted": null,
                  "note": null,
                  "_id": "5aaeb06413e113d3a360988e"
                }
              ],
              "notes": [
                null
              ],
              "date": "2018-03-18T18:30:53.938Z",
              "deleted": false,
              "_id": "5aaeb06413e113d3a360988f",
              "createdBy": "5a6ca05f54297a0c500cbd41",
              "updatedBy": "5a6ca05f54297a0c500cbd41",
              "participant": {
                "socialmedia": {
                  "service": "",
                  "username": ""
                },
                "documents": [],
                "notes": [],
                "socialworkers": [
                  "5a6ca05f54297a0c500cbd41"
                ],
                "deleted": false,
                "_id": "5aaea8fab858a4d1d1126cf5",
                "name": "Charlene",
                "email": "",
                "pronouns": "",
                "telephone": "",
                "address": "",
                "username": "Charlene_6cf5",
                "createdAt": "2018-03-18T17:59:22.178Z",
                "updatedAt": "2018-03-18T17:59:22.241Z",
                "__v": 0
              },
              "status": "In progress",
              "type": "Housing",
              "urgency": "Urgent",
              "createdAt": "2018-03-18T18:31:00.448Z",
              "updatedAt": "2018-03-18T18:31:00.448Z",
              "__v": 0
            },
            {
              "contactedResources": [
                {
                  "isContacted": false,
                  "resource": null,
                  "dateContacted": null,
                  "note": null,
                  "_id": "5aaeb03e13e113d3a360988c"
                }
              ],
              "notes": [
                null
              ],
              "date": "2018-03-18T18:30:15.572Z",
              "deleted": false,
              "_id": "5aaeb03e13e113d3a360988d",
              "createdBy": "5a6ca05f54297a0c500cbd41",
              "updatedBy": "5a6ca05f54297a0c500cbd41",
              "participant": {
                "socialmedia": {
                  "service": "",
                  "username": ""
                },
                "documents": [],
                "notes": [],
                "socialworkers": [
                  "5a6ca05f54297a0c500cbd41"
                ],
                "deleted": false,
                "_id": "5aaea8fab858a4d1d1126cf5",
                "name": "Charlene",
                "email": "",
                "pronouns": "",
                "telephone": "",
                "address": "",
                "username": "Charlene_6cf5",
                "createdAt": "2018-03-18T17:59:22.178Z",
                "updatedAt": "2018-03-18T17:59:22.241Z",
                "__v": 0
              },
              "status": "In progress",
              "type": "Housing",
              "urgency": "Urgent",
              "createdAt": "2018-03-18T18:30:22.556Z",
              "updatedAt": "2018-03-18T18:30:22.556Z",
              "__v": 0
            }
          ]);
    }

    get(id) {
        return Observable.of(this.testCasefile);
    }

    getByParticipant(pid) {
        return Observable.of(this.testCasefile);
    }

    delete(casefileID) {

        this.testCasefile = [];

        return Observable.of({
            'n': 1,
            'nModified': 1,
            'opTime': {
              'ts': '6515861190743162881',
              't': 5
            },
            'electionId': '7fffffff0000000000000005',
            'ok': 1
          });
    }

}
