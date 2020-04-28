import * as React from 'react'
import { TextStyle, View, Text } from 'react-native'

import { Row, RowData } from './Row'

export interface SectionData {
  type: 'SECTION'
  key?: string
  header?: string
  footer?: string | (() => React.ReactElement<any>)
  visible?: boolean,
  rows: RowData[]
}

export interface SectionProps {
  section: SectionData
  globalTextStyle?: TextStyle
}

export const Section = ({ section, globalTextStyle }: SectionProps) => {
  let elements: React.ReactElement<any>[] = []

  if (section.header) {
    elements.push(
      <Text key={section.header} style={{...globalTextStyle, marginLeft: 20, marginBottom: 8, color: '#999', fontSize: 14}}>
        {section.header}
      </Text>,
    )
  }

  for (let i = 0; i < section.rows.length; i++) {
    const rowData = section.rows[i]
    const isFirst = i === 0
    const isLast = i === section.rows.length - 1

    elements.push(
      <Row
        key={rowData.title}
        {...rowData}
        titleStyles={[globalTextStyle, rowData.titleStyle]}
        subtitleStyles={[globalTextStyle, rowData.subtitleStyle]}
        isFirst={isFirst}
        isLast={isLast}
        visible={rowData.visible}
      />,
    )
  }

  if (typeof section.footer === 'string') {
    elements.push(
      <Text key={section.footer} style={{...globalTextStyle, marginTop: 8, fontSize: 15, color:'#999', marginHorizontal: 15}}>
        {section.footer}
      </Text>,
    )
  } else if (typeof section.footer === 'function') {
    if (!section.key) {
      throw new Error(
        `Sections with a render function passed as footer must have their key property set. (Offending section has header ${
          section.header
        })`,
      )
    }

    elements.push(
      <View key={section.key + '-footer'} style={{alignSelf: 'stretch'}}>
        {section.footer()}
      </View>,
    )
  }

  return <View style={{alignItems: 'stretch', marginBottom: 40}}>{elements}</View>
}
