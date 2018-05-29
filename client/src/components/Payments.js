import React, { Component } from 'react';
import StripeCheckOut from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
	render() {
		return (
			<StripeCheckOut
				name="MailMonkey: $5 for 5 credits"
				description="use 4242 4242 4242 4242 cc #"
				amount={500}
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn">Add credits</button>
			</StripeCheckOut>
		);
	}
}

export default connect(null, actions)(Payments);
