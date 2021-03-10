import './ChatLink.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { LinkTo } from '@nti/web-routing';
import { scoped } from '@nti/lib-locale';

const t = scoped('nti-web-contacts.contacts.ChatLink', {
	chat: 'Chat',
	offline: '(offline)',
});

ContactChatLink.propTypes = {
	entity: PropTypes.object,
	presence: PropTypes.shape({
		isOnline: PropTypes.func,
	}),
};
export default function ContactChatLink({ entity, presence }) {
	const online = presence && presence.isOnline();

	return (
		<LinkTo.Object
			object={entity}
			context="open-chat"
			className={cx('contact-chat-link', { online })}
		>
			<span>{t('chat')}</span>
			{!online && <span className="offline">{t('offline')}</span>}
		</LinkTo.Object>
	);
}
