import classNames from 'classnames';
import React, { ReactNode, useRef, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { PublicationButton } from '../../publications/PublicationButton';
import { Formula } from '../Formula';
import { validateRangedFormula } from '../../data-entry/MaterialsInput/utils';
import { Tooltip } from '../Tooltip';

interface Props {
  id?: string;
  setProps?: (value: any) => any;
  className?: string;
  chips: any[];
  chipTooltips?: string[];
  chipLinks?: string[];
  chipLinksTarget?: string;
  chipType?: 'normal' | 'publications' | 'dynamic-publications';
  showDownloadIcon?: boolean;
}

export const ArrayChips: React.FC<Props> = ({
  chipType = 'normal',
  chipLinksTarget = '_blank',
  ...otherProps
}) => {
  const props = { chipType, chipLinksTarget, ...otherProps };
  return (
    <span data-testid="array-chips" id={props.id} className="tags">
      {props.chips.map((item, i) => {
        const chipContent = validateRangedFormula(item) ? <Formula>{item}</Formula> : item;
        const tooltipId = uuidv4();
        const tooltip = props.chipTooltips && props.chipTooltips[i] && (
          <Tooltip id={tooltipId}>{props.chipTooltips[i]}</Tooltip>
        );

        const isLink = props.chipLinks && props.chipLinks[i];
        let isPublicationButton = isLink && props.chipType === 'publications';
        if (isLink && props.chipType === 'dynamic-publications') {
          isPublicationButton = props.chipLinks![i].indexOf('https://doi.org/') === 0;
        }

        if (isPublicationButton) {
          return (
            <PublicationButton
              key={`array-chip-${i}-${item}`}
              className="tag"
              url={props.chipLinks![i]}
            >
              {chipContent}
              {tooltip}
            </PublicationButton>
          );
        } else if (isLink) {
          return (
            <a
              key={`array-chip-${i}-${item}`}
              className="tag"
              href={props.chipLinks![i]}
              target={props.chipLinksTarget}
              onClick={(e) => e.stopPropagation()}
              data-tip
              data-for={tooltipId}
            >
              {props.showDownloadIcon && <FaDownload className="mr-1" />}
              {chipContent}
              {tooltip}
            </a>
          );
        } else {
          return (
            <span key={`array-chip-${i}-${item}`} className="tag" data-tip data-for={tooltipId}>
              {chipContent}
              {tooltip}
            </span>
          );
        }
      })}
    </span>
  );
};
