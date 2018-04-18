import React from 'react';
import PropTypes from 'prop-types';
import { Flyout, DisplayName } from '@nti/web-commons';

import Members from './Members';


export default class CardDetail extends React.Component {

	static propTypes = {
		entity: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.string
		]).isRequired,
		members: PropTypes.array,
		flyoutOptions: PropTypes.array
	};

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

	renderMeta () {
		const {subtitleProvider} = this.props.entity;
		const subtitle = subtitleProvider && subtitleProvider(this.props.entity);

		return (
			<div className="contact-meta">{subtitle}</div>
		);
	}

	render () {
		const {members, entity} = this.props;
		const {location} = entity;
		return (
			<div className="card-detail">
				<div className="card-info">
					<DisplayName className="card-title" entity={this.props.entity}/>
					{location && <div className="entity-location">{location}</div>}
					<Flyout.Triggered
						className="card-action-flyout"
						trigger={this.renderFlyoutTrigger()}
						horizontalAlign={Flyout.ALIGNMENTS.RIGHT}
						sizing={Flyout.SIZES.MATCH_SIDE}
					>
						{this.renderFlyoutOptions(this.props.flyoutOptions)}
					</Flyout.Triggered>
					{this.renderMeta()}

				</div>
				{/* Only render members if the list is non-empty */}
				{members && <Members members={members}/>}

			</div>
		);
	}
}
