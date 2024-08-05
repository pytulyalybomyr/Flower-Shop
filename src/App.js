import Footer from './components/Footer';
import Header from './components/Header'
import MainPage from './components/Main_Page'
// import {  } from 'react-router-dom';


function App() {
  return (
    <div>
      {
        <div>
          <div className='wrapper_header'>
            <Header />
          </div>
          <div className='wrapper_container'>
            <div className='wrapper'>
              <MainPage />
            </div>
          </div>
          <Footer />
        </div>

      }
    </div>



  );
}

export default App;
