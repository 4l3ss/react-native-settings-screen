import * as React from 'react'
import { StyleSheet, View, TouchableOpacity, TextStyle,Text } from 'react-native'

import { Chevron } from './Chevron'

export interface RowData {
  title: string
  titleStyle?: TextStyle
  subtitle?: string
  subtitleStyle?: TextStyle
  onPress?: () => void
  showDisclosureIndicator?: boolean
  renderAccessory?: () => React.ReactElement<any>,
  renderBeforeAccessory?: () => React.ReactElement<any>,
  visible?: boolean,
}

let ContentContainer = ({onPress, style, children}) => {
    if(onPress){
        return <TouchableOpacity onPress={onPress} style={style}>{children}</TouchableOpacity>
    }else{
        return <View style={style}>{children}</View>
    }
}

export interface Props extends RowData {
  titleStyles?: (TextStyle | undefined)[]
  subtitleStyles?: (TextStyle | undefined)[]
  isFirst: boolean
  isLast: boolean
  children?: any
}
export const Row = ({
  title,
  subtitle,
  onPress,
  showDisclosureIndicator,
  renderAccessory,
  renderBeforeAccessory,
  visible,

  titleStyles,
  subtitleStyles,
  isFirst,
  isLast,
}: Props) => {
  if (visible === false) return null;

  return (
    <View style={{backgroundColor: 'transparent', height: subtitle ? 56 : 46, alignItems: 'stretch'}}>
      <View style={{alignSelf: 'stretch', height: StyleSheet.hairlineWidth, paddingLeft: isFirst ? 0 : 15, backgroundColor: 'white'}}>
        <View style={{flex: 1, backgroundColor: '#ccc'}} />
      </View>
      <ContentContainer style={styles.contentContainer} onPress={onPress}>
        {renderBeforeAccessory && renderBeforeAccessory()}
        <View style={{flex: 1, justifyContent: 'space-around', alignSelf: 'stretch'}}>
          <View />
          <Text numberOfLines={1} style={[{color: 'black', fontSize: 18, marginRight: 15}, ...titleStyles]}>
            {title}
          </Text>
          {subtitle && (
            <Text numberOfLines={1} style={[{color: '#999', fontSize: 15, marginRight: 15}, ...subtitleStyles]}>
              {subtitle}
            </Text>
          )}
          <View />
        </View>
        {renderAccessory && renderAccessory()}
        {showDisclosureIndicator ? <Chevron /> : <View style={{ width: 10 }} />}
      </ContentContainer>
      {isLast && <View style={{alignSelf: 'stretch', height: StyleSheet.hairlineWidth, backgroundColor: '#ccc'}} />}
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
})
