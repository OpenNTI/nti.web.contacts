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
		renameMode: PropTypes.bool
	};

	onFinishedEditing = (text) => {
		this.props.onRenameFinish(this.props.entity, text);
	}

	renderFlyoutTrigger () {
		return (
			<div className="trigger">
				<div className="dropdown"><i className="icon-chevron-down"/></div>
			</div>
		);
	}

	renderFlyoutOptions (flyoutOptions) {
		return (
			<div>
				{flyoutOptions && flyoutOptions.map(
					(i) => (
						<div className={i.className}
							key={i.displayText}
							onClick={()=>i.onClick(this.props)}>
							{i.displayText}
						</div>
					)
				)}
			</div>
		);
	}

	renderCardName (enableEditing) {
		const {entity} = this.props;
		const {isModifiable} = entity;
		if (!isModifiable) {
			return (<DisplayName className="card-title" entity={entity}/>);
		}
		else {
			return (
				<EditableTextField text={entity.displayName}
					isEditable={enableEditing}
					onFinishedEditing={this.onFinishedEditing}/>
			);
		}
	}

	renderMeta () {

		const {subtitleProvider} = this.props.entity;
		const subtitle = subtitleProvider && subtitleProvider(this.props.entity);

		return (
			<div className="contact-meta">{subtitle}</div>
		);
	}

	render () {
		const {members, entity, renameMode} = this.props;
		const {location} = entity;
		return (
			<div className="card-detail">
				<div className="card-info">
					{this.renderCardName(renameMode)}
					{location && <div className="entity-location">{location}</div>}
					<Flyout.Triggered
						className="card-action-flyout"
						trigger={this.renderFlyoutTrigger()}
						horizontalAlign={Flyout.ALIGNMENTS.RIGHT}
					>
						{this.renderFlyoutOptions(this.props.flyoutOptions)}
					</Flyout.Triggered>
					{this.renderMeta()}
					<FollowButton entity={entity}/>
				</div>
				{/* Only render members if the list is non-empty */}
				{members && <Members members={members}/>}
			</div>
		);
	}
}
