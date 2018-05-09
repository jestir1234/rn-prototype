import { Platform, Dimensions } from 'react-native'

export default class DevicePlatform {

  static _isAndroid() { return Platform.OS === 'android' }

  static _isIos() { return Platform.OS === 'ios' }

  static _isPort() {
    let { width, height } = Dimensions.get('window')
    return height > width
  }

  static _isLand() { return !DevicePlatform._isPort() }

  static _isPhoneX() {
    let { height, width } = Dimensions.get('window')
    return Platform.OS === 'ios' && (height === 812 || width === 812)
  }

  static select(options) {
    let key = Object.keys(options).find(item => {

      let criteria = item.toLowerCase()
      let isAndroid = DevicePlatform._isAndroid()
      let isIos = DevicePlatform._isIos()
      let isPort = DevicePlatform._isPort()
      let isLand = DevicePlatform._isLand()
      let isPhoneX = DevicePlatform._isPhoneX()

      return (
        (criteria === 'androidport' && isAndroid && isPort) ||
        (criteria === 'androidland' && isAndroid && isLand) ||
        (criteria === 'android' && isAndroid) ||
        (criteria === 'iosportiphonex' && isPhoneX && isPort) ||
        (criteria === 'ioslandiphonex' && isPhoneX && isLand) ||
        (criteria === 'iosiphonex' && isPhoneX) ||
        (criteria === 'iosport' && isIos && isPort) ||
        (criteria === 'iosland' && isIos && isLand) ||
        (criteria === 'ios' && isIos)
      )
    })

    if(key) {
      return options[key]
    }
  }
}
