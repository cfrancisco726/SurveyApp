const keys = require('../../config/keys');
// import emailImage from '../../client/src/images/email_header.png';
// import emailImage from './email_pic.png';

module.exports = survey => {
	return `
    <html>
      <body>
        <div style="text-align: center;">
				<img
					class="responsive-img"
					style={{ padding: '20px' }}
					src={emailImage}
					alt="paper logo"
					width="80%"
				/>
				<p>${survey.body}</p>
          <h3>How was your service today?</h3>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/one">1</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/two">2</a>
          </div>
					<div>
            <a href="${keys.redirectDomain}/api/surveys/${
		survey.id
	}/three">3</a>
          </div>
					<div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/four">4</a>
          </div>
					<div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/five">5</a>
          </div>
					<h4>Thank You!</h4>
        </div>
      </body>
    </html>
  `;
};
