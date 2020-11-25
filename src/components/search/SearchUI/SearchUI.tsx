import React from 'react';
import { SearchUIContextProvider } from './SearchUIContextProvider';
import { SearchUIFilters } from './SearchUIFilters';
import { SearchUIDataTable } from './SearchUIDataTable';
import { Column, FilterGroup } from './constants';
import { SearchUISearchBar } from './SearchUISearchBar';
import './SearchUI.css';
import { BrowserRouter as Router } from "react-router-dom";

/**
 * Component for rendering advanced search interfaces for data in an API
 * Renders results in a data table alongside a set of filters that map to properties in the data.
 */

export interface SearchUIProps {
  /**
   * An array of column definitions for the results in the SearchUIDataTable
   * Column properties are based on the react-data-table column settings (https://github.com/jbetancur/react-data-table-component#columns)
   * The "format" property must match a pre-defined one of these predefined strings: "TWO_DECIMALS"
   * example:
    [
        {
          name: 'Material Id',
          selector: 'task_id',
          sortable: true
        },
        {
          name: 'Volume',
          selector: 'volume',
          sortable: true,
          format: 'TWO_DECIMALS'
        }
    ]
   */
  columns: Column[];
  /**
   * An array of filter groups and their respective array of filters.
   * A filter group is a collapsible section of the filters panel that contains one or more filters.
   * A filter is a type of input element that filters the data based on its value.
   * Filter "type" must be one of these strings: "SLIDER", "MATERIALS_INPUT"
   * Filter "id" must be a queryable field
   * Filter props defines how that filter should be rendered. See example for props format based on filter type.
   * example:
    [
      {
        name: 'Material',
        collapsed: false,
        filters: [
          {
            name: 'Required Elements',
            id: 'elements',
            type: 'MATERIALS_INPUT',
            props: {
              field: 'elements'
            }
          }
        ]
      },
      {
        name: 'General',
        collapsed: false,
        filters: [
          {
            name: 'Volume',
            id: 'volume',
            type: 'SLIDER',
            props: {
              domain: [0, 200]
            }
          },
          {
            name: 'Density',
            id: 'density',
            type: 'SLIDER',
            props: {
              domain: [0, 200]
            }
          }
        ]
      }
    ]
   */
  filterGroups: FilterGroup[];
  /**
   * The base URL to the API that this search UI should query
   */
  baseURL: string;
  /**
   * The URL endpoint for fetching autocompletion results
   */
  autocompleteFormulaUrl?: string;
  /**
   * API key (if needed) that will be used when making queries
   */
  apiKey?: string;
}

export const SearchUI: React.FC<SearchUIProps> = props => {
  return (
    <div className="search-ui">
      <Router>
        <SearchUIContextProvider
          {...props}
        >
          <div className="columns">
            <div className="column is-narrow">
              <div className="columns mb-1">
                <div className="column pb-2">
                  <SearchUISearchBar />
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <SearchUIFilters />
                </div>
              </div>
            </div>
            <div className="column results-container">
              <SearchUIDataTable />
            </div>
          </div>
        </SearchUIContextProvider>
      </Router>
    </div>
  );
};
