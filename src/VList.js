import React from 'react';
import App from "./index";

class VList extends React.Component {

	sendVal(i) {
		this.props.indexChange(i);
	}

	render() {
		return (
			<ul className="video-list-items">
				{this.props.videos.map((v, i) =>
					<li key={i}>
						<div className="row">
							<div className="small-4 columns">
								<img className="" src={v.snippet.thumbnails.medium.url} />
							</div>
							<div className="small-8 columns">
								<a className="video-item-link" onClick={this.sendVal.bind(this, i)} href="#">{v.snippet.title}</a>
							</div>
							<hr className="hr-styling" />
						</div>
					</li>
				)}
			</ul>
		);
	}
}

export default VList;