import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import Chart from './Chart';

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	getChartData(survey) {
		this.setState({
			chartData: {
				labels: ['1', '2', '3', '4', '5'],
				datasets: [
					{
						label: 'Ratings',
						data: [
							survey.one,
							survey.two,
							survey.three,
							survey.four,
							survey.five
						],
						backgroundColor: [
							'rgba(255, 99, 132, 0.6)',
							'rgba(54, 162, 235, 0.6)',
							'rgba(255, 206, 86, 0.6)',
							'rgba(75, 192, 192, 0.6)',
							'rgba(153, 102, 255, 0.6)'
						]
					}
				]
			}
		});
	}
	renderSurveys() {
		return this.props.surveys.reverse().map(survey => {
			return (
				<div className="card darken-1" key={survey._id}>
					<div className="card-content">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						<p className="right">
							Sent On: {new Date(survey.dateSent).toLocaleDateString()}
						</p>
					</div>
					<div className="card-action">
						<a>One: {survey.one}</a>
						<Chart chartData={survey} />
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
