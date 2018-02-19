import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class MockPhonelogService {
    testPhonelog = {
        'constraints': [],
        'kind': 'Housing',
        '_id': '5a6cac2bdf03f80ede3f5c3e',
        'name': 'Housing Facility 4 Name',
        'email': 'housing4@resource.com',
        'term': '5 weeks',
        'createdAt': '2018-01-27T16:43:26.756Z',
        'updatedAt': '2018-01-27T16:43:26.756Z',
        '__v': 0
      };

    getAll() {
        return Observable.of([
{
    '_id' : '5a8a1edbf8bc217df1f5228b',
    'notes' : [
        ''
    ],
    'date' : '2018-02-19T00:48:27.827Z',
    'deleted' : false,
    'name' : 'Adrianna',
    'pronouns' : '',
    'user' : '5a6ca05f54297a0c500cbd41',
    'urgent' : false,
    'phonenumber' : '',
    'subject' : 'Testing1',
    'createdAt' : '2018-02-19T00:48:28.903Z',
    'updatedAt' : '2018-02-19T00:48:28.903Z',
    '__v' : 0
}
,
{
    '_id' : '5a8b4ee6d273167f04510134',
    'notes' : [
        ''
    ],
    'date' : '2018-02-19T22:25:42.239Z',
    'deleted' : false,
    'name' : 'Adrianna',
    'pronouns' : '',
    'user' : '5a6ca05f54297a0c500cbd41',
    'urgent' : true,
    'phonenumber' : '',
    'subject' : 'Testing 2',
    'createdAt' : '2018-02-19T22:25:42.251Z',
    'updatedAt' : '2018-02-19T22:25:42.251Z',
    '__v' : 0
},
{
    '_id' : '5a8b4f6dd273167f04510135',
    'notes' : [ 
        'I am testing this application'
    ],
    'date' : '2018-02-19T22:27:57.248Z',
    'deleted' : false,
    'name' : 'Adrianna',
    'pronouns' : 'she/her',
    'user' : '5a6ca05f54297a0c500cbd41',
    'urgent' : true,
    'phonenumber' : '',
    'subject' : 'Medical',
    'createdAt' : '2018-02-19T22:27:57.249Z',
    'updatedAt' : '2018-02-19T22:27:57.249Z',
    '__v' : 0
},
{
    '_id' : '5a8b4fe9d273167f04510136',
    'notes' : [ 
        'I am testing something'
    ],
    'date' : '2018-02-19T22:30:01.016Z',
    'deleted' : false,
    'name' : 'Adrianna',
    'pronouns' : 'she/her',
    'user' : '5a6ca05f54297a0c500cbd41',
    'urgent' : false,
    'phonenumber' : '(514) 848-2424',
    'subject' : 'Legal',
    'createdAt' : '2018-02-19T22:30:01.018Z',
    'updatedAt' : '2018-02-19T22:30:01.018Z',
    '__v' : 0
},
{
    '_id' : '5a8b53e5daff818ef3b7c20f',
    'notes' : [ 
        'I am just checking'
    ],
    'date' : '2018-02-19T22:47:01.573Z',
    'deleted' : false,
    'name' : 'Travis',
    'pronouns' : 'him/he',
    'user' : '5a6ca05f54297a0c500cbd41',
    'urgent' : true,
    'phonenumber' : '(514) 666-1231',
    'subject' : 'Just curious',
    'callertype' : 'other person',
    'createdAt' : '2018-02-19T22:47:01.580Z',
    'updatedAt' : '2018-02-19T22:47:01.580Z',
    '__v' : 0
}
          ]);
    }

    get(id) {
        return Observable.of(this.testPhonelog);
    }
}
