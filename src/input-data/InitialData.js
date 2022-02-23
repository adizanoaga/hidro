const INIT_DATA = {
  inputHidrograph: [
    0, 11.9, 47.5, 107, 190, 170, 123, 83, 47.5, 23.7, 8.1, 0.6
  ],
  deltaT: 3600, //secunde
  diferentaCotaVolumeLac: 2.5, //m
  volumLac: [0, 28_000, 922_000, 2_400_000, 4_600_000, 8_900_000, 14_000_000],
  deversor: {
    m: 0.35,
    b: 10
  }
}

export { INIT_DATA }
