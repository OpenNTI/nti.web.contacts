import React from 'react';
import PropTypes from 'prop-types';
import { DisplayName } from '@nti/web-commons';

import Members from '../commons/Members';

SharingListRow.propTypes = {
	sharingList: PropTypes.object,
	onClick: PropTypes.func
};


export default function SharingListRow ({sharingList, onClick}) {

	const {friends} = sharingList;

	function onClickRow () {
		onClick(sharingList);
	}

	return (
		<div className="sharing-list-row" onClick={onClickRow}>
			<DisplayName entity={sharingList}/>
			<Members members={friends} displayLabel={false}/>
		</div>
	);
}
