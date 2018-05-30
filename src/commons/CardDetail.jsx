import React from 'react';
import PropTypes from 'prop-types';
import { Flyout, DisplayName } from '@nti/web-commons';

import FollowButton from './FollowButton';
import Members from './Members';
import EditableTextField from './EditableTextField';
import FollowLabel from './FollowLabel';


export default class CardDetail extends React.Component {

	static propTypes = {
		entity: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.string
		]).isRequired,
		members: PropTypes.array,
		flyoutOptions: PropTypes.object,
		onRenameFinish: PropTypes.func,
		onCancelEditing: PropTypes.func,
		renameMode: PropTypes.bool,
		isFollowableEntity: PropTypes.bool
	};

	attachFlyoutRef = x => this.flyout = x;

	onFinishedEditing = (text) => {
		this.props.onRenameFinish(this.props.entity, text);
		this.flyout.dismiss();
	}

	onCancelEditing = () => {
		this.props.onCancelEditing();
		this.flyout.dismiss();
	}

	onOptionClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		this.flyout.dismiss();
	}

	renderCardName (enableEditing) {
		const {entity} = this.props;
		const {isModifiable} = entity;
		if (!isModifiable) {
			return (<DisplayName entity={entity}/>);
		}
		else {
			return (
				<EditableTextField text={entity.displayName}
					placeholderText="Name"
					isEditable={enableEditing}
					onCancelEditing={this.onCancelEditing}
					onFinishedEditing={this.onFinishedEditing}/>
			);
		}
	}



	render () {
		const {members, entity, renameMode, flyoutOptions, isFollowableEntity} = this.props;
		const {location} = entity;
		return (
			<div className="card-detail">
				<div className="card-info">
					<div className="card-meta">
						<div className="card-title">
							{this.renderCardName(renameMode)}
							{location && <div className="entity-location">{location}</div>}
						</div>
						<Flyout.Triggered
							className="card-action-flyout"
							horizontalAlign={Flyout.ALIGNMENTS.RIGHT}
							trigger={(
								<div className="trigger">
									<div className="dropdown"><i className="icon-chevron-down"/></div>
								</div>
							)}
							ref={this.attachFlyoutRef}
						>
							<div onClick={this.onOptionClick}>
								{flyoutOptions}
							</div>
						</Flyout.Triggered>
					</div>
				</div>
				{isFollowableEntity && (
					<FollowButton entity={entity} className="contact-card-follow-toggle">
						<FollowLabel/>
					</FollowButton>
				)}
				{/* Only render members if the list is non-empty */}
				{members && <Members members={members}/>}
			</div>
		);
	}
}
