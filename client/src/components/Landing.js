import React from 'react';
import planeImage from '../images/3_planes_img.png';

const Landing = () => {
	return (
		<div
			style={{
				textAlign: 'center',
				padding: '50px'
			}}
		>
			<p>
				<font color="#1cb1b6" size="5">
					See how your customer rates your business
				</font>
			</p>
			<img
				style={{ padding: '20px' }}
				src={planeImage}
				alt="paper logo"
				width="80%"
			/>
		</div>
	);
};

export default Landing;
