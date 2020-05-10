import * as React from 'react'
import { View, ViewStyle, TextStyle, ScrollViewProps, ScrollView } from 'react-native'

import { Section, SectionData } from './Section'

export type SettingsData = SettingsDatum[]
export type SettingsDatum = CustomViewData | SectionData

export interface CustomViewData {
  type: 'CUSTOM_VIEW'
  key?: string
  visible?: boolean,
  render: () => React.ReactElement<any>
}

export interface Props {
  style?: ViewStyle
  data: SettingsData
  globalTextStyle?: TextStyle
  scrollViewProps?: Partial<ScrollViewProps>
  rowsStyle?: ViewStyle,
  renderChevron?: () => React.ReactElement<any>
  borderColor?: string
}

export class SettingsScreen extends React.Component<Props> {
  state = { refreshing: false }

  render() {
    const elements = this.props.data.filter(x => x.visible !== false).map((item, i) => {
      switch (item.type) {
        case 'CUSTOM_VIEW':
          return <View key={item.key || i}>{item.render()}</View>
        case 'SECTION':
          return (
            <Section
              rowsStyle={this.props.rowsStyle}
              key={item.header || i}
              section={item}
              globalTextStyle={this.props.globalTextStyle}
              renderChevron={this.props.renderChevron}
              borderColor={this.props.borderColor}
            />
          )
      }
    })

    const scrollViewProps: ScrollViewProps = {
      ...(this.props.scrollViewProps || {}),
      style: this.props.style,
    }

    return (
      <ScrollView {...scrollViewProps} style={{flex: 1, alignSelf: 'stretch', backgroundColor: 'hsl(0, 0%, 97%)', ...this.props.style}}>{elements}</ScrollView>
    )
  }
}
