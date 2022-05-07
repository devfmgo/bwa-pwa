import React from 'react';
import Arrived from './components/Arrived';
import AsideMenu from './components/AsideMenu';
import Browse from './components/Browse';
import Clients from './components/Clients';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Offline from './components/Offline';

function App() {
  const [items, setItems] = React.useState([]);
  const [offlineStatus, setOfflineStatus] = React.useState(!navigator.onLine);

  function handleOfflineStatus() {
    setOfflineStatus(!navigator.onLine);
  }
  React.useEffect(
    function () {
      (async function () {
        const res = await fetch(
          'https://prod-qore-app.qorebase.io/8ySrll0jkMkSJVk/allItems/rows?limit=7&offset=0&$order=asc',
          {
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
              'X-API-KEY': process.env.REACT_APP_APIKEY,
            },
          }
        );
        console.log(process.env.REACT_APP_APIKEY);
        const { nodes } = await res.json();
        setItems(nodes);

        const script = document.createElement('script');
        script.src = '/carousel.js';
        script.async = false;
        document.body.appendChild(script);
      })();
      handleOfflineStatus();
      window.addEventListener('online', handleOfflineStatus);
      window.addEventListener('offline', handleOfflineStatus);
      return function () {
        window.removeEventListener('online', handleOfflineStatus);
        window.removeEventListener('offline', handleOfflineStatus);
      };
    },
    [offlineStatus]
  );
  return (
    <>
      {offlineStatus && <Offline />}
      <Header />
      <Hero />
      <Browse />
      <Arrived items={items} />
      <Clients />
      <AsideMenu />
      <Footer />
    </>
  );
}

export default App;
