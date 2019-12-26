import React, { useCallback, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { LineGraph } from 'components/Graphs';
import { Grid } from '@material-ui/core';
import _ from 'lodash';
import { ProbabilityTooltip } from 'components/GraphTooltips';
import clsx from 'clsx';
import ListItem from 'components/ListItem';
import {
  getMaxDamage, getMaxProbability, getTicks, REFERENCE_LINE_OPTIONS,
} from './probabilityUtils';
import GraphControls from './GraphControls';
import Loadable from './Loadable';

const useStyles = makeStyles((theme) => ({
  probabilityCurves: {},
  content: {},
  graphContainer: ({ numUnits }) => ({
    height: numUnits >= 3 ? '350px' : '300px',
    marginBottom: theme.spacing(3),
    flexBasis: '50%',
    minWidth: '450px',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  }),
  select: {
    maxWidth: '100%',
    display: 'flex',
    width: '50%',
    margin: theme.spacing(0, 1.5, 4),
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  selectInfo: {
    margin: 'auto',
    marginRight: theme.spacing(2),
  },
  field: {
    flex: 1,
  },
}));

const BasicCurves = React.memo(({
  probabilities, unitNames, className, error, pending,
}) => {
  const classes = useStyles({ numUnits: unitNames.length });
  const theme = useTheme();
  const [activeReferenceLine, setActiveReferenceLine] = useState(REFERENCE_LINE_OPTIONS.NONE);
  const [matchXAxis, setMatchXAxis] = useState(true);

  let maxDamage = matchXAxis ? 0 : 'dataMax';
  let [maxProbability, ticks] = [0, null];
  if (probabilities && probabilities.length) {
    if (matchXAxis) {
      maxDamage = getMaxDamage(probabilities);
    }
    maxProbability = getMaxProbability(probabilities);
    if (maxProbability) {
      ticks = getTicks(maxProbability);
    }
  }

  const yAxisLabel = useCallback((value) => `${value}%`, []);
  let activeMetric = null;
  if (activeReferenceLine !== REFERENCE_LINE_OPTIONS.NONE) {
    activeMetric = activeReferenceLine.toLowerCase();
  }

  const handleReferenceLineChanged = (value) => {
    setActiveReferenceLine(value);
  };

  const handleSetMatchXAxisChanged = (value) => {
    setMatchXAxis(value);
  };

  return (
    <ListItem
      className={clsx(classes.probabilityCurves, className)}
      header="Base Probability Curves"
      collapsible
      loading={pending}
      loaderDelay={0}
    >
      <GraphControls
        matchXAxis={matchXAxis}
        setMatchXAxis={handleSetMatchXAxisChanged}
        activeReferenceLine={activeReferenceLine}
        setActiveReferenceLine={handleReferenceLineChanged}
      />
      <Loadable loading={pending} numUnits={unitNames.length} error={error}>
        <Grid container spacing={2} className={classes.content}>
          {probabilities.map(({ save, buckets, metrics }) => (
            <Grid item className={classes.graphContainer} key={save}>
              <LineGraph
                title={`Damage Probability (${save === 'None' ? '-' : `${save}+`})`}
                data={buckets}
                series={unitNames}
                xAxis={{
                  domain: [0, maxDamage],
                  type: 'number',
                  dataKey: 'damage',
                  tickCount: 10,
                }}
                yAxis={{
                  tickFormatter: yAxisLabel,
                  domain: [0, Math.ceil(maxProbability / 10) * 10],
                  type: 'number',
                  ticks,
                }}
                yAxisLabel={{
                  value: 'Probability (%)',
                }}
                dotSize={1}
                referenceLines={activeMetric
                  ? Object.keys(metrics[activeMetric]).map((name) => {
                    const unitIndex = unitNames.findIndex((unitName) => unitName === name);
                    const stroke = unitIndex >= 0 ? (
                      theme.palette.graphs.series[unitIndex]
                    ) : theme.palette.graphs.axis;
                    return { x: metrics[activeMetric][name], stroke, dataKey: name };
                  })
                  : null}
                tooltip={<ProbabilityTooltip />}
              />
            </Grid>
          ))}
        </Grid>
      </Loadable>
    </ListItem>
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

export default BasicCurves;