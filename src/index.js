import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import VList from './VList';
import VCurrent from './VCurrent';

import './css/index.css';
import './css/foundation.css';
import './css/foundation.min.css';

const API_KEY = "AIzaSyDPqn6kJdiuTzAA5-oj6vTxjxVr17Q0NHU";
const API_URL = "https://www.googleapis.com/youtube/v3/search";

let api_params = {
    part: 'snippet',
    key: API_KEY,
    q: "",
	type: 'video',
	maxResults: 20
};

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			videos: [],
			activeVIndex: 0
		}
		this.vIndexChange = this.vIndexChange.bind(this);
	}

	search(event) {
		event.preventDefault();
		let searchQ = this.refs.keyword.value;
		api_params.q = searchQ;

		axios.get(API_URL, {params: api_params}).then(response => {
			this.setState({videos: response.data.items, activeVIndex: 0});
		});
	}

	vIndexChange(index) {
		this.setState({activeVIndex: index});
	}

	render() {
		if (this.state.videos.length > 0) {
			console.log(this.state.videos[this.state.activeVIndex]);
			return(
				<div>
					<nav className="main-nav-bar">
						<form onSubmit={this.search.bind(this)}>
							<div className="header-items">
								<img className="youtube-logo" src="http://www.logoeps.com/wp-content/uploads/2011/02/youtube-logo-vector.png" />	
							</div>
							<div className="header-items input-search-div">
								<input className="input-search" ref="keyword" type="text" placeholder="Search Videos" />	
							</div>
							<div className="clr"></div>
						</form>
					</nav>
					<div className="main-section">
						<div className="row">
							<div className="small-12 columns">
								<div className="row main-section-margin">
									<div className="small-8 columns ">
										<VCurrent currentV={this.state.videos[this.state.activeVIndex]} />
										<div className="video-preview-details">
											<h4>{this.state.videos[this.state.activeVIndex].snippet.title}</h4>
											<h5>{this.state.videos[this.state.activeVIndex].snippet.channelTitle}</h5>
											<h6>{this.state.videos[this.state.activeVIndex].snippet.description}</h6>
										</div>
									</div>
									<div className="small-4 columns video-list side-bar">
										<VList indexChange={this.vIndexChange} videos={this.state.videos} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		else {
			return(
				<div>
					<nav className="main-nav-bar">
						<form onSubmit={this.search.bind(this)}>
							<div className="header-items">
								<img className="youtube-logo" src="http://www.logoeps.com/wp-content/uploads/2011/02/youtube-logo-vector.png" />	
							</div>
							<div className="header-items input-search-div">
								<input className="input-search" ref="keyword" type="text" placeholder="Search Videos" />	
							</div>
							<div className="clr"></div>
						</form>
					</nav>
					<div className="main-section">
						<div className="row">
							<div className="small-12 columns">
								<div className="row main-section-margin">
									<div className="small-8 columns video-preview">
										<h4>Player</h4>
									</div>
									<div className="small-4 columns video-list side-bar">
										<VList videos={this.state.videos} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		
	}
}
// 
ReactDOM.render(<App></App>, document.getElementById('root'));