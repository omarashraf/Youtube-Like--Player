import React from 'react';

function VCurrent(props) {
	return (
		<div>
			<iframe height="415" width="100%" src={"https://youtube.com/embed/" + props.currentV.id.videoId} ></iframe>
		</div>
	);
}

export default VCurrent;