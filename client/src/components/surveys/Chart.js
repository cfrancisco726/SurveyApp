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
						label: 'ratings',
						data: [
							this.props.chartData.one,
							this.props.chartData.two,
							this.props.chartData.three,
							this.props.chartData.four,
							this.props.chartData.five
						],
						backgroundColor: [
							'rgba(12, 210, 228, 0.6)',
							'rgba(12, 180, 228, 0.6)',
							'rgba(12, 150, 228, 0.6)',
							'rgba(12, 120, 228, 0.6)',
							'rgba(12, 90, 228, 0.6)'
						],
						borderWidth: 3
					}
				]
			}
		};
	}

	static defaultProps = {
		displayTitle: true,
		displayLegend: true,
		textPosition: 'bottom'
	};

	render() {
		// console.log(this.props);
		return (
			<div className="chart">
				<Bar
					data={this.state.chartData}
					width={50}
					height={25}
					options={{
						title: {
							display: this.props.displayTitle,
							text: 'ratings',
							fontSize: 20
						},
						legend: {
							display: this.props.displayLegend,
							position: this.props.legendPosition
						},
						layout: {
							padding: {
								left: 100,
								right: 100,
								top: 100,
								bottom: 100
							}
						}
					}}
				/>
			</div>
		);
	}
}

export default Chart;
