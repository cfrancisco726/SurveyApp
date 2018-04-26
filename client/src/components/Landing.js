import React from 'react';
import planeImage from '../images/mail_img.png';

const Landing = () => {
	return (
		<div
			style={{
				textAlign: 'center',
				backgroundColor: '#1cb1b6',
				fontColor: 'white'
			}}
		>
			<p>
				<font color="white">Mail Monkey</font>
			</p>
			<img class="responsive-img" src={planeImage} alt="paper logo" />
			<p><font color="white">see how your customer rates your business</font></p>
		</div>
	);
};

export default Landing;
