import '@/styles/globals.css'
import { Nav, Footer} from '@/components'
import { wrapper } from '@/modules/store.js'
import withReduxSaga from 'next-redux-saga';
import PropTypes from "prop-types";

const App = ({ Component }) => {
  return  <>
    <Nav/>
    <div className='AppMinHeight'>
      <Component/>
    </div>
    <Footer/>
  </>
}

App.propTypes = {
  Component: PropTypes.elementType,
};

export default wrapper.withRedux(withReduxSaga(App));