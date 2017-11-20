import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getService, User } from 'nti-web-client';
import { Loading } from 'nti-web-commons';

import ContactCard from './ContactCard';

const PAGE_SIZE = 20;
const PAGE_NUMBER_BUFFER = 4;


class PageNumber extends React.Component {
	static propTypes = {
		pageNum: PropTypes.number,
		current: PropTypes.bool,
		goToPage: PropTypes.func
	}

	goToPage = () => {
		const {pageNum, goToPage} = this.props;
		goToPage(pageNum);
	}

	rendner () {
		const {pageNum, current} = this.props;

		if(pageNum < 0) {
			return (<div className="page-padding">...</div>);
		}

		const className = cx('page', {current});


		return (
			<div key={pageNum} onClick={this.goToPage} className={className}>{pageNum}</div>
		);
	}
}


export default class ContactList extends React.Component {
	static propTypes = {
		onUserClick: PropTypes.func
	}


	constructor (props) {
		super(props);

		this.state = { loading: true, pageNum: 1, pageSize: 20 };

		getService().then((service) => {
			const siteCommunityUserName = service.SiteCommunity;

			User.resolve({entity: siteCommunityUserName}).then((siteCommunityUser) => {
				this.setState({siteCommunityUser}, () => {
					this.updateUserList();
				});
			});
		});
	}


	updateUserList () {
		const membersLink = this.state.siteCommunityUser.getLink('members');

		this.setState({loading: true});

		getService().then((service) => {
			const batchStart = (this.state.pageNum - 1) * PAGE_SIZE;

			// incorporate user search here, or a separate tab?

			//let fetch = service.getUserSearchURL(this.state.searchTerm);
			// service.get(fetch).then((res) => {
			//
			// });

			return service.getBatch(membersLink + '?batchStart=' + batchStart + '&batchSize=' + PAGE_SIZE);
		}).then((users) => {
			const totalPages = Math.floor(users.Total / PAGE_SIZE) + 1;

			this.setState({ loading: false, users: users.Items, totalPages });
		});
	}


	prev = () => {
		if(this.state.pageNum === 1) {
			return;
		}

		this.setState({ pageNum: this.state.pageNum - 1 }, () => {
			this.updateUserList();
		});
	}


	next = () => {
		if(this.state.pageNum === this.state.totalPages) {
			return;
		}

		this.setState({ pageNum: this.state.pageNum + 1 }, () => {
			this.updateUserList();
		});
	}


	goToPage = (newPage) => {
		if(newPage === this.state.pageNum) {
			return;
		}

		this.setState({ pageNum: newPage }, () => {
			this.updateUserList();
		});
	}


	renderUser = (user, index) => {
		return (<ContactCard key={index} entity={user} onClick={this.props.onUserClick}/>);
	}


	renderUserList () {
		if(!this.state.users || this.state.users.length === 0) {
			return null;
		}

		return (<div className="contact-list">{this.state.users.map(this.renderUser)}</div>);
	}


	renderPageNumbers () {
		const { pageNum, totalPages } = this.state;

		let pageNumbersToRender = [];

		for(let i = 1; i <= totalPages; i++) {
			pageNumbersToRender.push(i);
		}

		pageNumbersToRender = pageNumbersToRender
			.filter(x => x === 1 || x === totalPages || (x >= pageNum - PAGE_NUMBER_BUFFER && x <= pageNum + PAGE_NUMBER_BUFFER))
			.reduce((acc, num, idx, fullArray) => {
				if(fullArray[idx + 1] > num + 1) {
					acc.push(num);
					acc.push(-1);
				} else {
					acc.push(num);
				}

				return acc; }, []);

		return (
			<div className="page-numbers">
				{pageNumbersToRender.map(x => (
					<PageNumber goToPage={this.goToPage} pageNum={x} key={x} current={x === this.state.pageNum}/>
				))}
			</div>
		);
	}


	renderControls () {
		return (
			<div className="controls">
				{this.renderPager()}
				{this.renderSearch()}
			</div>
		);
	}


	renderPager () {
		const prevClass = 'prev' + (this.state.pageNum === 1 ? ' disabled' : '');
		const nextClass = 'next' + (this.state.pageNum === this.state.totalPages ? ' disabled' : '');

		return (<div className="pager">
			<div className={prevClass} onClick={this.prev}><i className="icon-chevron-left"/></div>
			{this.renderPageNumbers()}
			<div className={nextClass} onClick={this.next}><i className="icon-chevron-right"/></div>
		</div>);
	}


	updateSearchTerm = (e) => {
		this.setState({searchTerm: e.target.value});
	}


	renderSearch () {
		return (
			<div className="search">
				<input onChange={this.updateSearchTerm} value={this.state.searchTerm} type="text" placeholder="Search"/>
			</div>);
	}


	renderContent () {
		if(this.state.loading) {
			return (<Loading.Mask/>);
		}

		return (<div>
			{this.renderControls()}
			{this.renderUserList()}
		</div>);
	}


	render () {
		return (<div className="admin-users">
			{this.renderContent()}
		</div>);
	}
}
