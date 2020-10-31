import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleAppBar } from '../@components/AppBar/AppBar';
import CurrentWeather from '../@components/CurrentWeather';
import { getUserCoordinatesTC } from '../@store/current-weather/slice';
// import {
//   createTodoActionCreator,
//   createTodoAsync,
// } from '../@store/todos/slice';

export const AppContainer: React.FC = () => {
  const dispatch = useDispatch();
  // const { loading } = useSelector(todosSelector);

  useEffect(() => {
    dispatch(getUserCoordinatesTC());
  }, []);

  return (
    <div className="App">
      <SimpleAppBar />
      <Paper elevation={3}>
        <CurrentWeather />
      </Paper>
    </div>
  );
};
