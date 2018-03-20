import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class MockPhonelogService {
    testPhonelog = {
        '_id': '5a8a1edbf8bc217df1f5228b',
        'notes': [
            ''
        ],
        'date': '2018-02-19T00:48:27.827Z',
        'deleted': false,
        'resolved': false,
        'name': 'Adrianna',
        'pronouns': '',
        'user': '5a6ca05f54297a0c500cbd41',
        'urgent': false,
        'phonenumber': '',
        'subject': 'Testing1',
        'createdAt': '2018-02-19T00:48:28.903Z',
        'updatedAt': '2018-02-19T00:48:28.903Z',
        '__v': 0
    };

    getAll() {
        return Observable.of([
            {
                '_id': '5a8a1edbf8bc217df1f5228b',
                'notes': [
                    ''
                ],
                'date': '2018-02-19T00:48:27.827Z',
                'deleted': false,
                'name': 'Adrianna',
                'pronouns': '',
                'user': '5a6ca05f54297a0c500cbd41',
                'urgent': false,
                'phonenumber': '',
                'subject': 'Testing1',
                'createdAt': '2018-02-19T00:48:28.903Z',
                'updatedAt': '2018-02-19T00:48:28.903Z',
                '__v': 0
            }
            ,
            {
                '_id': '5a8b4ee6d273167f04510134',
                'notes': [
                    ''
                ],
                'date': '2018-02-19T22:25:42.239Z',
                'deleted': false,
                'name': 'Adrianna',
                'pronouns': '',
                'user': '5a6ca05f54297a0c500cbd41',
                'urgent': true,
                'phonenumber': '',
                'subject': 'Testing 2',
                'createdAt': '2018-02-19T22:25:42.251Z',
                'updatedAt': '2018-02-19T22:25:42.251Z',
                '__v': 0
            },
            {
                '_id': '5a8b4f6dd273167f04510135',
                'notes': [
                    'I am testing this application'
                ],
                'date': '2018-02-19T22:27:57.248Z',
                'deleted': false,
                'name': 'Adrianna',
                'pronouns': 'she/her',
                'user': '5a6ca05f54297a0c500cbd41',
                'urgent': true,
                'phonenumber': '',
                'subject': 'Medical',
                'createdAt': '2018-02-19T22:27:57.249Z',
                'updatedAt': '2018-02-19T22:27:57.249Z',
                '__v': 0
            },
            {
                '_id': '5a8b4fe9d273167f04510136',
                'notes': [
                    'I am testing something'
                ],
                'date': '2018-02-19T22:30:01.016Z',
                'deleted': false,
                'name': 'Adrianna',
                'pronouns': 'she/her',
                'user': '5a6ca05f54297a0c500cbd41',
                'urgent': false,
                'phonenumber': '(514) 848-2424',
                'subject': 'Legal',
                'createdAt': '2018-02-19T22:30:01.018Z',
                'updatedAt': '2018-02-19T22:30:01.018Z',
                '__v': 0
            },
            {
                '_id': '5a8b53e5daff818ef3b7c20f',
                'notes': [
                    'I am just checking'
                ],
                'date': '2018-02-19T22:47:01.573Z',
                'deleted': false,
                'name': 'Travis',
                'pronouns': 'him/he',
                'user': '5a6ca05f54297a0c500cbd41',
                'urgent': true,
                'phonenumber': '(514) 666-1231',
                'subject': 'Just curious',
                'callertype': 'other person',
                'createdAt': '2018-02-19T22:47:01.580Z',
                'updatedAt': '2018-02-19T22:47:01.580Z',
                '__v': 0
            }
        ]);
    }

    getRecentlyUpdated() {
        return Observable.of([
            {
              "resolved": false,
              "notes": [
                ""
              ],
              "date": "2018-03-18T21:30:14.131Z",
              "deleted": false,
              "_id": "5aaeda66066604d8ce2b8b18",
              "name": "Sandy",
              "pronouns": "them",
              "user": {
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
              "urgent": false,
              "phonenumber": "",
              "subject": "",
              "callertype": "Trans person",
              "createdAt": "2018-03-18T21:30:14.136Z",
              "updatedAt": "2018-03-18T21:30:14.136Z",
              "__v": 0
            }
          ]);
    }

    get(id) {
        return Observable.of(this.testPhonelog);
    }

    getByResolved() {
        return Observable.of([
            {
                '_id': '5a8a1edbf8bc217df1f5228b',
                'notes': [
                    ''
                ],
                'date': '2018-02-19T00:48:27.827Z',
                'deleted': false,
                'resolved': true,
                'name': 'Adrianna',
                'pronouns': '',
                'user': {'name': 'Gabrielle'},
                'urgent': false,
                'phonenumber': '',
                'subject': 'Testing1',
                'createdAt': '2018-02-19T00:48:28.903Z',
                'updatedAt': '2018-02-19T00:48:28.903Z',
                'resolvedBy': { 'name': 'James' },
                'dateResolved': '2018-03-10T17:49:12.341Z',
                '__v': 0
            }]);
    }

    getByDeleted() {
        return Observable.of([
            {
                '_id': '5a8a1edbf8bc217df1f5228b',
                'notes': [
                    ''
                ],
                'date': '2018-02-19T00:48:27.827Z',
                'deleted': true,
                'resolved': true,
                'name': 'Sandra',
                'pronouns': '',
                'user': {'name': 'Gabrielle'},
                'urgent': false,
                'phonenumber': '',
                'subject': 'Testing1',
                'createdAt': '2018-02-19T00:48:28.903Z',
                'updatedAt': '2018-02-19T00:48:28.903Z',
                'resolvedBy': { 'name': 'James' },
                'dateResolved': '2018-03-10T17:49:12.341Z',
                '__v': 0
            }]);
    }
}
