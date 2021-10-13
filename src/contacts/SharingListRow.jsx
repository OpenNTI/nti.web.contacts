import './SharingListRow.scss';
import PropTypes from 'prop-types';

import { DisplayName } from '@nti/web-commons';

import Members from '../common/Members';

SharingListRow.propTypes = {
	sharingList: PropTypes.object,
	onClick: PropTypes.func,
};

export default function SharingListRow({ sharingList, onClick }) {
	const { friends } = sharingList;

	function onClickRow() {
		onClick(sharingList);
	}

	return (
		<div className="sharing-list-row" onClick={onClickRow}>
			<div className="list-title">
				<DisplayName entity={sharingList} />
			</div>
			<Members members={friends} displayLabel={false} />
		</div>
	);
}
