import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forecastAPI, ForecastdayResponseType } from '../../@api/forecast-api';
import { LocationType, CurrentWeatherType } from '../../@types';

const forecastInitialState = {
  location: {} as LocationType,
  currentWeather: {} as CurrentWeatherType,
  forecastday: [] as Array<ForecastdayResponseType>,
};

export const getForecastTC = createAsyncThunk<any, any, any>(
  'forecast/getForecast',
  async (param: { days: number; lat: number; lon: number }, thunkAPI) => {
    try {
      const res = await forecastAPI.dailyWeather(
        param.days,
        param.lat,
        param.lon,
      );
      // return { forecastday: res.data.forecast.forecastday };
      return res.data;
    } catch (err: any) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const slice = createSlice({
  name: 'forecast',
  initialState: forecastInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getForecastTC.fulfilled, (state, action) => {
      if (action.payload) {
        // state.forecastday = action.payload.forecastday;
        state.location = action.payload.location;
        state.currentWeather = action.payload.current;
        state.forecastday = action.payload.forecast.forecastday;
      }
    });
  },
});

export const forecastReducer = slice.reducer;
