import React from 'react';
import planeImage from '../images/mail_img.png';

const Landing = () => {
	return (
		<div
			style={{
				textAlign: 'center',
				fontColor: 'white'
			}}
		>
			<p>
				<font color="black">Mail Monkey</font>
			</p>
			<img class="responsive-img" src={planeImage} alt="paper logo" />
			<p>
				see how your customer rates your business
			</p>
		</div>
	);
};

export default Landing;
