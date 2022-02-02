import React from "react";
import ReactGA from "react-ga";
require("dotenv").config();
import "../styles/globals.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

class Layout extends React.Component {
	componentDidMount() {
		if (!window.GA_INITIALIZED) {
			initGA();
			window.GA_INITIALIZED = true;
			logPageView();
		}
	}
	render() {
		return <div>{this.props.children}</div>;
	}
}

const initGA = () => {
	ReactGA.initialize(process.env.GOOGLE_ANALYTICS_KEY);
};
const logPageView = () => {
	ReactGA.set({ page: window.location.pathname });
	ReactGA.pageview(window.location.pathname);
};
const logEvent = (category = "", action = "") => {
	if (category && action) {
		ReactGA.event({ category, action });
	}
};
const logException = (description = "", fatal = false) => {
	if (description) {
		ReactGA.exception({ description, fatal });
	}
};
