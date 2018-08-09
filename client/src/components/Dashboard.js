import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
import mailHeader from '../images/mail_header.png';

const Dashboard = () => {
	return (
		<div>
			<img style={{ width: '100%' }} src={mailHeader} />
			<div className="container">
				<p>
					Welcome to Mail Monkey, an application that allows you to keep track
					of how your customers rate your business. Get started by simply adding
					credits and clicking the red + symbol to create your email survey!
				</p>
			</div>
			<SurveyList />
			<div className="fixed-action-btn">
				<Link to="/surveys/new" className="btn-floating btn-large red">
					<i className="material-icons">add</i>
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;
