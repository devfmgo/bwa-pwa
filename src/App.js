import React from 'react';
import Arrived from './components/Arrived';
import AsideMenu from './components/AsideMenu';
import Browse from './components/Browse';
import Clients from './components/Clients';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';

function App() {
  const [items, setItems] = React.useState([]);
  React.useEffect(function () {
    (async function () {
      const res = await fetch(
        'https://prod-qore-app.qorebase.io/8ySrll0jkMkSJVk/allItems/rows?limit=7&offset=0&$order=asc',
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            // 'x-api-key': process.env.REACT_APP_APIKEY,
          },
        }
      );
      const { nodes } = await res.json();
      setItems(nodes);
    })();
  }, []);
  return (
    <>
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
