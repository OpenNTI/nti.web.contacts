import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import {LinkTo} from '@nti/web-routing';
import {ListHeader} from '@nti/web-commons';

const t = scoped('nti-web-contacts.contacts.ContactSidebar', {
	myContacts: 'My Contacts'
});

ContactSidebar.propTypes = {
	classes: PropTypes.array
};

export default function ContactSidebar ({classes}) {
	return (
		<ul className="contacts-tabs">
			<li className="sidebar-header">
				<ListHeader className="sidebar-title">
					Contacts
				</ListHeader>
			</li>
			<li>
				<LinkTo.Path to="./" activeClassName="active" exact>{t('myContacts')}</LinkTo.Path>
			</li>
		</ul>
	);
}
