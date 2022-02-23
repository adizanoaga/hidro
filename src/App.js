import './App.css'
import { MyChart } from './chart/chart'
import { Deversor } from './deversor/Deversor'
import { INIT_DATA } from './input-data/InitialData'
import { MyTable } from './tabel/tabel'

const findInterval = (array, value) => {
  const max = array.find((item) => item > value)
  const min = array[array.indexOf(max) - 1]
  return { min, max }
}

const interpolareLiniara = (input, x1, x2, y1, y2) => {
  return y1 + ((input - x1) * (y2 - y1)) / (x2 - x1)
}

const findMQ = (SUM, HS, deltaT) => {
  const arrayOfH = HS.map((item) => item[0])
  for (let i = 0; i <= HS[HS.length - 1][0]; i += 0.001) {
    const { min, max } = findInterval(arrayOfH, i)
    const Smin = HS.find((item) => item[0] === min)[1]
    const Smax = HS.find((item) => item[0] === max)[1]
    const S = interpolareLiniara(i, min, max, Smin, Smax)
    const M = (2 * S) / deltaT
    const Q = Deversor.getQ(i)
    if (M + Q > SUM) {
      return { S, M, Q, H: i }
    }
  }
}

const HS = INIT_DATA.volumLac.map((volum, idx) => {
  return [idx * INIT_DATA.diferentaCotaVolumeLac, volum]
})

const HQ = HS.map(([h, s]) => {
  return [h, Deversor.getQ(h, INIT_DATA.deversor.m, INIT_DATA.deversor.b)]
})

const getSMQH = (I1, I2, S1, Q1, deltaT = INIT_DATA.deltaT) => {
  const M1 = (2 * S1) / deltaT
  const SUM = I1 + I2 + (M1 - Q1) //M2+Q2
  const { S, M, Q, H } = findMQ(SUM, HS, deltaT)
  return { S, M, Q, H }
}

function App() {
  let lastSMQH = { S: 0, M: 0, Q: 0, H: 0 }
  const SMQHarr = [{ ...lastSMQH }]
  INIT_DATA.inputHidrograph.reduce((q1, q2) => {
    const { S, M, Q, H } = getSMQH(q1, q2, lastSMQH.S, lastSMQH.Q)
    SMQHarr.push({ S, M, Q, H })
    lastSMQH = { S, M, Q, H }
    return q2
  })
  const Qatenuare = SMQHarr.map((item) => item.Q)

  const HofQ = SMQHarr.map((item) => [item.Q, item.H])

  console.log({ Qatenuare, HofQ, SMQHarr })

  return (
    <div>
      <div style={{ width: '100%' }}>
        <MyChart
          title={'Grafic atenuare'}
          series={[
            { data: INIT_DATA.inputHidrograph, name: 'Qin' },
            { data: Qatenuare, name: 'Qout' }
          ]}
        />
        <MyChart
          title={'Relatia Q - H'}
          series={[{ data: HofQ, name: 'H(Q)' }]}
        />
        <MyTable
          tableData={[
            { firstName: 'test', lastName: 'test2' },
            { firstName: 'test', lastName: 'test2' },
            { firstName: 'test', lastName: 'test2' }
          ]}
        />
      </div>
    </div>
  )
}

export default App
