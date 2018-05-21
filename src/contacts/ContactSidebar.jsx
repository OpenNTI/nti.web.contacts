import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import {LinkTo} from '@nti/web-routing';

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
				<div className="sidebar-title">
					Contacts
				</div>
			</li>

			<li>
				<LinkTo.Path to="./" activeClassName="active" exact>{t('myContacts')}</LinkTo.Path>
			</li>
			{/* <li>
				<LinkTo.Path to="./courses" activeClassName="active">{t('courses')}</LinkTo.Path>
			</li>
			{
				user.hasLink('transcript') && (
					<li>
						<LinkTo.Path to="./transcript" activeClassName="active">{t('transcript')}</LinkTo.Path>
					</li>
				)
			}
			<li>
				<LinkTo.Path to="./reports" activeClassName="active">{t('reports')}</LinkTo.Path>
			</li> */}
		</ul>
	);
}
