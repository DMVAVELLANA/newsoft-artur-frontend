import '@styles/main.scss'
import type { AppProps } from 'next/app'
// Next.js allows you to import CSS directly in .js files.
// It handles optimization and all the necessary Webpack configuration to make this work.
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SSRProvider } from 'react-bootstrap'
import { ProgressBar } from '@components/ProgressBar'
import { useState, useEffect } from 'react';
import themesData from '../data/themes.json';

// You change this configuration value to false so that the Font Awesome core SVG library
// will not try and insert <style> elements into the <head> of the page.
// Next.js blocks this from happening anyway so you might as well not even try.
// See https://fontawesome.com/v6/docs/web/use-with/react/use-with#next-js
config.autoAddCss = false

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
}

interface ThemesData {
  [key: string]: ThemeConfig;
}

const themesDataTyped: ThemesData = themesData;

function MyApp({ Component, pageProps }: AppProps) {
  // In server-side rendered applications, a SSRProvider must wrap the application in order
  // to ensure that the auto-generated ids are consistent between the server and client.
  // https://react-bootstrap.github.io/getting-started/server-side-rendering/

  const [theme, setTheme] = useState<ThemeConfig | null>(null);

  useEffect(() => {
    const themeConfig = fetchThemeConfig();
    setTheme(themeConfig);
  }, []);

  const fetchThemeConfig = (): ThemeConfig => {
    const tenantId = 'tenant1';
    return themesDataTyped[tenantId] || themesDataTyped['ns-theme'];
  };

  //CHANGE THEME WITH BUTTON
  // const handleThemeChange = () => {
  //   setTheme((prevTheme) => {
  //     if (prevTheme === themesDataTyped['ns-theme']) {
  //       return themesDataTyped['coreui-default-theme'];
  //     } else {
  //       return themesDataTyped['ns-theme'];
  //     }
  //   });
  // };

  // useEffect(() => {
  //   if (theme) {
  //     applyTheme(theme);
  //   }
  // }, [theme]);

  //CHANGE THEME MANUALLY
  useEffect(() => {
    if (theme) {
      // Set the desired theme (Search in JSON file)↴
      const desiredThemeKey = 'ns-theme';
      
      if (themesDataTyped.hasOwnProperty(desiredThemeKey)) {
        const desiredTheme = themesDataTyped[desiredThemeKey];
        applyTheme(desiredTheme);
      }
    }
  }, [theme]);

  const applyTheme = (themeConfig: ThemeConfig) => {
    const root = document.documentElement;
    Object.entries(themeConfig).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  };

  return (
    <SSRProvider>
      <ProgressBar />
      {/* <button className="theme-button" onClick={handleThemeChange}>Change</button> */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </SSRProvider>
  )
}

export default MyApp
