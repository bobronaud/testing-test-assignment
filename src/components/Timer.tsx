import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useAppDispatch, useAppSelector } from '../hooks';
import { setTime } from '../store/slices/testSlice';
import { setPhase } from '../store/slices/testSlice';
import { getTime } from '../store/selectors/getTime';

const Timer = () => {
  const dispatch = useAppDispatch();
  const [m, s] = useAppSelector(getTime);
  const [over, setOver] = useState(false);

  const tick = () => {
    if (over) return;

    if (!m && !s) setOver(true);
    else if (!s) dispatch(setTime([m - 1, 59]));
    else dispatch(setTime([m, s - 1]));
  };

  useEffect(() => {
    if (over) {
      alert('Время вышло :(');
      dispatch(setPhase('finished'));
    }

    const timerId = setTimeout(() => tick(), 1000);
    return () => clearTimeout(timerId);
  });

  const timeStringify = () => {
    return `${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
  };

  return (
    <Box
      data-testid='timer'
      sx={{
        width: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'solid 1px black',
        borderRadius: '3px',
        padding: '0 10px',
      }}>
      <Typography>{timeStringify()}</Typography>
    </Box>
  );
};

export default Timer;
