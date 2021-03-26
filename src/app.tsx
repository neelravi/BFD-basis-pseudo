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
import './assets/styles.css';
import '../node_modules/bulma/css/bulma.min.css';
import '../node_modules/bulma-tooltip/dist/css/bulma-tooltip.min.css';
import { MaterialsExplorer } from './views/MaterialsExplorer';
import { MaterialsDetail } from './views/MaterialsDetail';
import { MoleculesExplorer } from './views/MoleculesExplorer';
import { Home } from './views/Home';
import { CrystalStructureViewer } from './views/CrystalStructureViewer';
import { BatteriesExplorer } from './views/BatteriesExplorer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { NavbarDropdown } from './components/navigation/NavbarDropdown';
import { FaTrain } from 'react-icons/fa';

const mountNodeSelector = 'app';
const mountNode = document.getElementById(mountNodeSelector);

ReactDOM.render(
  <>
    <Router>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
              <Link to="/materials">Materials</Link>
            </a>
            <a className="navbar-item">
              <Link to="/molecules">Molecules</Link>
            </a>
            <a className="navbar-item">
              <Link to="/batteries">Batteries</Link>
            </a>
            <a className="navbar-item">
              <Link to="/crystal">Crystal Structure</Link>
            </a>
          </div>
        </div>
      </nav>
      <section className="p-3">
        <Switch>
          <Route path="/materials">
            <MaterialsExplorer />
          </Route>
          <Route path="/molecules">
            <MoleculesExplorer />
          </Route>
          <Route path="/batteries">
            <BatteriesExplorer />
          </Route>
          <Route path="/crystal">
            <CrystalStructureViewer />
          </Route>
        </Switch>
      </section>
    </Router>
  </>,

  mountNode
);
console.log('RUNNING in', process.env.NODE_ENV, 'DEBUGGING IS', process.env.DEBUG);
