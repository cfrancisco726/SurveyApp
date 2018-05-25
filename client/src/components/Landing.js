import React from 'react';
// import planeImage from '../images/3_planes_img.png';
import mail_hp from '../images/mail_hp.jpg';
import icon1 from '../images/icon1.png';
import icon2 from '../images/icon2.png';
import icon3 from '../images/icon3.png';

const Landing = () => {
	return (
		// <div
		// 	style={{
		// 		textAlign: 'center',
		// 		padding: '50px'
		// 	}}
		// >
		// 	<p>
		// 		<font color="#1cb1b6" size="5">
		// 			See how your customer rates your business
		// 		</font>
		// 	</p>
		// 	<img
		// 		style={{ padding: '20px' }}
		// 		src={planeImage}
		// 		alt="paper logo"
		// 		width="80%"
		// 	/>
		// </div>
		<div className="landing">
			<div className="hero">
				<img style={{ width: '100%' }} src={mail_hp} />
			</div>
			<div className="title">
				<h1>Mail Monkey</h1>
				<h2>See how customers rate your business</h2>
			</div>
			<div className="row icon-list">
				<div className="col s12 m4 l4">
					<div className="center">
						<img style={{ width: '80%' }} src={icon1} />
						<p>See how your customers feel about your service</p>
					</div>
				</div>
				<div className="col s12 m4 l4">
					<div className="center">
						<img style={{ width: '80%' }} src={icon2} />
						<p>Add unlimited credits to create email surveys</p>
					</div>
				</div>
				<div className="col s12 m4 l4">
					<div className="center">
						<img style={{ width: '80%' }} src={icon3} />
						<p>Track customers responses in real time</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
