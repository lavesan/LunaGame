import React, { useEffect } from 'react';
import { ScreenOrientation } from 'expo';
import Routes from './src/routes';

export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  return (
    <Routes />
  );
}
