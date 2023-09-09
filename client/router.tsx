import { Route, createRoutesFromElements } from 'react-router-dom'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="" element={} />
  </Route>,
)
