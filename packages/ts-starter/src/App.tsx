import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
// PAGES
import Error from '@Pages/Error';
// ASSETS
import favicon from '@Images/icons/favicon.ico';
// CONFIG
import { GlobalStyle } from '@Styled';
// TYPES
export interface IAppProps {}

class App extends Component<IAppProps> {
  render() {
    const isProdEnv = process.env.NODE_ENV === 'production';
    const devServer = isProdEnv ? '' : "'unsafe-eval'";
    const hostUrl = isProdEnv
      ? '*.income.com.sg'
      : '*.localhost/* *.income.com.sg';
    /* tslint:disable:max-line-length */
    const allowedUrl =
      '*.kenticocloud.com *.google-analytics.com *.googleapis.com *.googletagmanager.com *.doubleclick.net *.google.com *.facebook.net *.facebook.com';
    return (
      <>
        {/* Meta tag setups */}
        <Helmet>
          {/* Icons */}
          <link rel="icon" href="data:," />
          <link rel="shortcut icon" type="image/x-icon" href={favicon} />
          {/* web app config (if necessary) */}
          {/* check: https://developers.google.com/web/fundamentals/native-hardware/fullscreen/ */}
          {/* check: https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/ */}
          {/* <link rel="manifest" href={manifest}"> */}
          {/* Cache Control */}
          {process.env.BROWSER_CACHE_DISABLED && [
            <meta http-equiv="cache-control" content="no-cache" key="cache" />,
            <meta http-equiv="expires" content="0" key="expires" />,
            <meta http-equiv="pragma" content="no-cache" key="pragma" />,
            <meta
              http-equiv="Strict-Transport-Security"
              content="no-cache"
              key="STS"
            />,
          ]}
          {/* CSP */}
          {/* notice: you may need to allow 'unsafe-inline' or use nounce for marketing tools */}
          <meta
            http-equiv="Content-Security-Policy"
            content={`default-src 'none';
              script-src 'self' ${devServer} ${hostUrl} ${allowedUrl};
              style-src 'self' 'unsafe-inline' ${hostUrl};
              img-src 'self' ${hostUrl} ${allowedUrl} data: blob:;
              connect-src 'self' ${hostUrl};
              child-src *;
              font-src *;`}
          />
        </Helmet>
        {/* Global CSS */}
        <GlobalStyle />
        {/* App Routes */}
        <Switch>
          <Route path="*" component={Error} />
        </Switch>
      </>
    );
    /* tslint:enable:max-line-length */
  }
}

export default App;
