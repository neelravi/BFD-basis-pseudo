import React, { useEffect } from 'react';
import filterGroups from './filterGroups.json';
import columns from './columns.json';
import { Column, FilterGroup } from '../../components/data-display/SearchUI/types';
import { PeriodicTableMode } from '../../components/data-entry/MaterialsInput/MaterialsInput';
import { SearchUIContainer, SearchUIGrid, SearchUISearchBar } from '../..';
import periodicTableImage from './assets/images/periodictable.png';

/**
 * Component for testing the Molecules Explorer view
 */

export const MoleculesExplorer: React.FC = () => {
  useEffect(() => {
    document.title = 'Molecules Explorer';
  }, []);

  return (
    <>
      <h1 className="title is-1">Basis and ECP</h1>
      <SearchUIContainer
        resultLabel="molecule"
        columns={columns as Column[]}
        // filterGroups={filterGroups as FilterGroup[]}
        filterGroups={[]}
        apiEndpoint={
          process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL + '/molecules/' : ''
        }
        autocompleteFormulaUrl={
          process.env.REACT_APP_AUTOCOMPLETE_URL
            ? process.env.REACT_APP_AUTOCOMPLETE_URL
            : undefined
        }
        apiKey={process.env.REACT_APP_API_KEY ? process.env.REACT_APP_API_KEY : undefined}
        sortFields={['elements']}
      >
        <SearchUISearchBar
          placeholder="Search by elements or formula"
          periodicTableMode={PeriodicTableMode.TOGGLE}
          allowedInputTypesMap={{
            elements: { field: 'elements' },
            formula: { field: 'formula' }
          }}
        />
        <SearchUIGrid />
      </SearchUIContainer>
    </>
  );
};
