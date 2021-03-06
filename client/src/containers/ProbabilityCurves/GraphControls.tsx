import { MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import _ from 'lodash';
import React from 'react';

import { REFERENCE_LINE_OPTIONS } from './probabilityUtils';

const useStyles = makeStyles((theme) => ({
  controls: {
    display: 'flex',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: '1px solid',
    borderColor: theme.palette.grey[700],
    borderRadius: theme.shape.borderRadius,
    marginTop: '-0.7rem',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  switch: {
    marginLeft: 0,
  },
  select: {
    flex: 1,
    minWidth: 150,
    maxWidth: 350,
  },
  label: {
    position: 'relative',
    left: theme.spacing(2),
    background: theme.palette.background.paper,
    fontSize: theme.typography.body2.fontSize,
  },
  selectInfo: {},
  field: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
  },
}));

interface GraphControlsProps {
  activeReferenceLine: string;
  setActiveReferenceLine: (value: string) => void;
}

const GraphControls = React.memo(
  ({ activeReferenceLine, setActiveReferenceLine }: GraphControlsProps) => {
    const classes = useStyles();

    const handleReferenceLineChanged = (event: any) => {
      setActiveReferenceLine(event.target.value);
    };

    return (
      <>
        <span className={classes.label}>Graph Settings</span>
        <div className={classes.controls}>
          <TextField
            select
            variant="filled"
            value={activeReferenceLine}
            onChange={handleReferenceLineChanged}
            label="Reference Lines"
            className={clsx(classes.field, classes.select)}
          >
            {Object.values(REFERENCE_LINE_OPTIONS).map((option) => (
              <MenuItem value={option} key={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default GraphControls;
