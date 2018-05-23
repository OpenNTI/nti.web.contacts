import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Layouts } from '@nti/web-commons';
import {LinkTo} from '@nti/web-routing';

const t = scoped('nti-web-contacts.contacts.ContactSidebar', {
	myContacts: 'My Contacts'
});

ContactSidebar.propTypes = {
	classes: PropTypes.array
};

export default function ContactSidebar ({classes}) {
	return (

		<Layouts.NavContent.Container>
			<Layouts.NavContent.Nav className="nav-bar">
				<ul className="contacts-tabs">
					<li className="sidebar-header">
						<div className="sidebar-title">
							Contacts
						</div>
					</li>
					<li>
						<LinkTo.Path to="./contacts" activeClassName="active" exact>{t('myContacts')}</LinkTo.Path>
					</li>
				</ul>
			</Layouts.NavContent.Nav>
		</Layouts.NavContent.Container>
	);
}
