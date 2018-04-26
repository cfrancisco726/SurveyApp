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
						data: [
							this.props.chartData.one,
							this.props.chartData.two,
							this.props.chartData.three,
							this.props.chartData.four,
							this.props.chartData.five
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
		};
	}

	static defaultProps = {
		displayTitle: true,
		displayLegend: true,
		legendPosition: 'bottom'
	};

	render() {
		// console.log(this.props);
		return (
			<div className="chart">
				<Bar
					data={this.state.chartData}
					width={100}
					height={50}
					options={{
						title: {
							display: this.props.displayTitle,
							text: 'ratings',
							fontSize: 50
						},
						legend: {
							display: this.props.displayLegend,
							position: this.props.legendPosition
						}
					}}
				/>
			</div>
		);
	}
}

export default Chart;
