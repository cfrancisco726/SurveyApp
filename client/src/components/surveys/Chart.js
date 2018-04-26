import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: {
				labels: ['1', '2', '3', '4', '5'],
				datasets: [
					{
						label: 'Ratings',
						// data: [1, 2, 3, 6, 9],

						// data: [
						// 	{this.props.one},
						// 	{this.props.survey.two},
						// 	{this.props.survey.three},
						// 	{this.props.survey.four},
						// 	{this.props.survey.five}
						// ],
						backgroundColor: [
							'rgba(255, 99, 132, 0.6)',
							'rgba(54, 162, 235, 0.6)',
							'rgba(255, 206, 86, 0.6)',
							'rgba(75, 192, 192, 0.6)',
							'rgba(75, 192, 192, 0.6)'
						]
					}
				]
			}
		};
	}

	static defaultProps = {
		displayTitle: true,
		displayLegend: true,
		legendPosition: 'bottom',
		location: 'City'
	};

	render() {
		return (
			<div className="chart">
				<Bar
					data={this.state.chartData}
					width={100}
					height={50}
					options={{
						title: {
							display: true,
							text: 'ratings',
							fontSize: 25
						},
						legend: {
							display: true,
							position: 'bottom'
						}
					}}
				/>
			</div>
		);
	}
}

export default Chart;
