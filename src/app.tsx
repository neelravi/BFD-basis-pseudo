/**
 * Main app page for mp-react-component
 * Serves as a playground for testing and viewing components
 *
 * Experimental implementations of components are imported from the views directory
 * and rendered here.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles.less';
// import './assets/fonts.css';
import '../node_modules/bulma/css/bulma.min.css';
import '../node_modules/bulma-tooltip/dist/css/bulma-tooltip.min.css';
import { MoleculesExplorer } from './pages/MoleculesExplorer';
import { CrystalStructureViewer } from './pages/CrystalStructureViewer';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Publications } from './pages/Publications';
import { Navbar } from './components/navigation/Navbar';
import periodicTableImage from './assets/images/periodictable.png';

const mountNodeSelector = 'app';
const mountNode = document.getElementById(mountNodeSelector);

ReactDOM.render(
  <>
    <Router>
      <div className="basic-navbar">
        <Link to="/molecules">Burkatzki-Filippi-Dolg (BFD) Pseudopotentials and Basis Set </Link>
      </div>
      <section>
        <Switch>
          <Route path="/molecules">
            <MoleculesExplorer />
          </Route>
          <Route path="/">
            <MoleculesExplorer />
          </Route>
        </Switch>
      </section>
    </Router>
  </>,

  mountNode
);
console.log('RUNNING in', process.env.NODE_ENV, 'DEBUGGING IS', process.env.DEBUG);
