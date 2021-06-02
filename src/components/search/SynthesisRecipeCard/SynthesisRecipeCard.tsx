import classNames from 'classnames';
import React from 'react';
import Collapsible from 'react-collapsible';
import './SynthesisRecipeCard.css';
import { Link } from '../../navigation/Link';

interface Props {
  id?: string;
  setProps?: (value: any) => any;
  className?: string;
  data: any;
}

function RenderValues({ value }): string | null {
  if (value !== null) {
    if (Array.isArray(value.values)) {
      return value.values.map((x) => x + '').join(', ') + ' ' + value.units;
    } else if (value.min_value !== null && value.max_value !== null) {
      return 'between ' + value.min_value + ' and ' + value.max_value + ' ' + value.units;
    } else if (value.min_value !== null) {
      return 'above ' + value.min_value + ' ' + value.units;
    } else if (value.max_value !== null) {
      return 'below ' + value.max_value + ' ' + value.units;
    }
  }
  return null;
}

function RenderArray({ value }): string | null {
  if (Array.isArray(value) && value.length > 0) return value.join(', ');
  else return null;
}

function RenderConditions({ conditions }) {
  let strings = [];

  if (typeof conditions === 'object') {
    const temperature_arrays = conditions.heating_temperature || [];
    temperature_arrays
      .map((x) => RenderValues({ value: x }))
      .map((x) => (x !== null ? 'at ' + x : null))
      .filter((x) => x !== null)
      .forEach((x) => strings.push(x));

    const time_arrays = conditions.heating_time || [];
    time_arrays
      .map((x) => RenderValues({ value: x }))
      .map((x) => (x !== null ? 'for ' + x : ''))
      .filter((x) => x !== null)
      .forEach((x) => strings.push(x));

    const heating_atm = RenderArray({ value: conditions.heating_atmosphere });
    if (heating_atm !== null) strings.push('in ' + heating_atm);
  }
  return <span>{strings.join(', ')}</span>;
}

function RenderOperations({ operations }) {
  if (Array.isArray(operations) && operations.length > 0) {
    return (
      <div className="mpc-synthesis-card-operations content">
        <ol>
          {operations.map((op, i) => (
            <li key={i}>
              <span>{op.type}</span> <RenderConditions conditions={op.conditions} />
            </li>
          ))}
        </ol>
      </div>
    );
  } else {
    return (
      <div className="mpc-synthesis-card-operations content">
        No operations specified in this recipe.
      </div>
    );
  }
}

function RenderParagraphOrHighlight(props) {
  return (
    <div className={classNames('mpc-synthesis-card-paragraph', props.className)}>
      <p>
        <a target="_blank" href={'https://dx.doi.org/' + props.doi}>
          DOI: {props.doi}
        </a>
      </p>
      {props.highlights
        ? props.highlights.map((hl, i) => (
            <p key={i}>
              {hl.texts.map((text, j) => (
                <span key={j} className={'mpc-synthesis-card-highlight-' + text.type}>
                  {text.value}
                </span>
              ))}
            </p>
          ))
        : props.paragraph_string}
    </div>
  );
}

export const SynthesisRecipeCard: React.FC<Props> = (props) => {
  return (
    <div className={classNames('mpc-synthesis-card box', props.className)}>
      <div className="mpc-synthesis-card-type">
        <span className="badge ml-1">{props.data.synthesis_type}</span>
      </div>

      <div className="mpc-synthesis-card-equation">{props.data.reaction_string}</div>

      <RenderParagraphOrHighlight
        doi={props.data.doi}
        paragraph_string={props.data.paragraph_string}
        highlights={props.data.highlights}
      />

      <div style={{ marginTop: '0.5rem' }}>
        <p>
          <span className="mpc-synthesis-card-material-label">Target material:&nbsp;</span>
          <Link href={'/synthesis?formula=' + props.data.target.material_formula}>
            {props.data.target.material_formula}
          </Link>
        </p>
      </div>
      <div>
        <p>
          <span className="mpc-synthesis-card-material-label">Precursor materials:&nbsp;</span>
          {props.data.precursors.map((p, i) => (
            <span key={i}>
              <Link href={'/synthesis?formula=' + p.material_formula}>
                {p.material_formula}
                {i < props.data.precursors.length - 1 ? ', ' : ''}
              </Link>
            </span>
          ))}
        </p>
      </div>

      <Collapsible
        trigger={
          <div className="mpc-synthesis-card-collapse-operations">
            <span className="icon">
              <i className="icon-fontastic-toolkit" />
            </span>{' '}
            Toggle experimental details
          </div>
        }
      >
        <RenderOperations operations={props.data.operations} />
      </Collapsible>
    </div>
  );
};