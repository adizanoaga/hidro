import { INIT_DATA } from '../input-data/InitialData'

export const Deversor = () => {}

Deversor.getQ = (
  deltaH,
  m = INIT_DATA.deversor.m,
  b = INIT_DATA.deversor.b
) => {
  return m * b * Math.pow(deltaH, 1.5) * Math.sqrt(9.81 * 2)
}
