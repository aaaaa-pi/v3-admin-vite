let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = ' https://mock.presstime.cn/mock/6415dee7cd3a10001b4666be/cms'
} else {
  BASE_URL = ' https://mock.presstime.cn/mock/6415dee7cd3a10001b4666be/cms'
}

export const TIME_OUT = 10000
export { BASE_URL }
