import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import Chart from './Chart';

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	renderSurveys() {
		return this.props.surveys.reverse().map(survey => {
			return (
				<div className="container">
					<div className="card darken-1" key={survey._id}>
						<div className="card-content">
							<span className="card-title">{survey.title}</span>
							<p>{survey.body}</p>
							<ul>
								<li>
									Sent On: {new Date(survey.dateSent).toLocaleDateString()}
								</li>
								<li>
									last responded:{' '}
									{new Date(survey.lastResponded).toLocaleDateString()}
								</li>
							</ul>
						</div>
						<div className="card-action">
							<Chart chartData={survey} />
						</div>
					</div>
				</div>
			);
		});
	}
	render() {
		return <div>{this.renderSurveys()}</div>;
	}
}

function mapStateToProps({ surveys }) {
	return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
