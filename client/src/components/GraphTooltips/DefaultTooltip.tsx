import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import type { ITooltipProps } from './types';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.graphs.tooltip,
    color: theme.palette.getContrastText(theme.palette.graphs.tooltip),
    padding: theme.spacing(1, 2),
  },
}));

interface IDefaultTooltipProps extends ITooltipProps {}

/**
 * A tooltip to display when you hover over a value in a graph
 */
const DefaultTooltip: React.FC<IDefaultTooltipProps> = ({ active, payload, label }) => {
  const classes = useStyles();
  if (active) {
    return (
      <Paper className={classes.tooltip}>
        <Typography variant="h6">{label}</Typography>
        {(payload ?? []).map(({ color, name, value }) => (
          <Typography style={{ color }} key={name}>{`${name}: ${value}`}</Typography>
        ))}
      </Paper>
    );
  }
  return null;
};

DefaultTooltip.defaultProps = {
  active: false,
  payload: [],
  label: '',
};

export default DefaultTooltip;
