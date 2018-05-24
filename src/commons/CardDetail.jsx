import React from 'react';
import PropTypes from 'prop-types';
import { Flyout, DisplayName, FollowButton } from '@nti/web-commons';

import Members from './Members';
import EditableTextField from './EditableTextField';


export default class CardDetail extends React.Component {

	static propTypes = {
		entity: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.string
		]).isRequired,
		members: PropTypes.array,
		flyoutOptions: PropTypes.array,
		onRenameFinish: PropTypes.func,
		onCancelEditing: PropTypes.func,
		renameMode: PropTypes.bool
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

	renderFlyoutTrigger () {
		return (
			<div className="trigger">
				<div className="dropdown"><i className="icon-chevron-down"/></div>
			</div>
		);
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

	onOptionClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		this.flyout.dismiss();
	}

	// Wrap each flyout option so that we can
	// dimisss the flyout automatically after
	// calling the onClick method of the option.
	renderFlyoutOption = (option) => {
		return (
			<div onClick={this.onOptionClick} key={option.key}>
				{option}
			</div>
		);
	}

	render () {
		const {members, entity, renameMode, flyoutOptions} = this.props;
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
							trigger={this.renderFlyoutTrigger()}
							horizontalAlign={Flyout.ALIGNMENTS.RIGHT}
							ref={this.attachFlyoutRef}
						>
							{flyoutOptions.map(this.renderFlyoutOption)}
						</Flyout.Triggered>
					</div>
				</div>
				<FollowButton entity={entity}/>
				{/* Only render members if the list is non-empty */}
				{members && <Members members={members}/>}
			</div>
		);
	}
}
