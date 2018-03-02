import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from 'nti-web-commons';

export default class SearchPeople extends React.Component {
	static propTypes = {
		members: PropTypes.array,
		remove: PropTypes.func
	}

	render () {
		const {members} = this.props;
		return (
			<div>
				{members.length > 0 && (
					<div className=""><p className="title">Members</p>
						<div className="result-search">
							<ul>
								{members.map((item, index) =>{
									return(
										<li className="search-item" key={index}>
											<div className="item-left">
												<div className="img-avatar">
													<Avatar className="img-user" entityId={item.Username}/>
												</div>
												<p className="search-name">{item.realname}</p>
											</div>
											{!item.remove && (
												<a className="btn-remove" onClick={this.props.remove(index)}>Remove</a>
											)}
											{item.remove && (
												<a className="btn-undo" onClick={this.props.remove(index)}>Undo</a>
											)}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				)}
			</div>
		);
	}
}
