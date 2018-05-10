const keys = require('../../config/keys');
// import emailImage from '../../client/src/images/email_header.png';

module.exports = survey => {
	return `
    <html>
      <body>
			<style>
				ul#horizontal-list li {
					display: inline;
				}
			</style>
        <div style="text-align: center;">
				<img src="/email_pic.png"
					style={{ padding: '20px' }}
					alt="email pic"
					width="80%"
				>
				<p>${survey.body}</p>
          <h3>How was your service today?</h3>
					<ul id="horizontal-list">
            <li>
							<a href="${keys.redirectDomain}/api/surveys/${survey.id}/one">1</a>
						</li>
            <li>
							<a href="${keys.redirectDomain}/api/surveys/${survey.id}/two">2</a>
						</li>
            <li>
							<a href="${keys.redirectDomain}/api/surveys/${survey.id}/three">3</a>
						</li>
            <li>
							<a href="${keys.redirectDomain}/api/surveys/${survey.id}/four">4</a>
						</li>
            <li>
							<a href="${keys.redirectDomain}/api/surveys/${survey.id}/five">5</a>
						</li>
					</ul>
					<h4>Thank You!</h4>
					</div>
      </body>
    </html>
  `;
};
