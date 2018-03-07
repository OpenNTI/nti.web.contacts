import {Router, Route} from 'nti-web-routing';

import People from './people';
import Group from './groups';
import SharingList from './sharing-lists';

export default Router.for([
	Route({path: '/groups', component: Group}),
	Route({path: '/list', component: SharingList}),
	Route({path: '/', component: People}),
]);
