import React from 'react';
import { Text, TextProps } from 'react-native';

interface ThemedTextProps extends TextProps {
  type?: 'default' | 'title' | 'link';
}

export function ThemedText({ type = 'default', style, ...props }: ThemedTextProps) {
  const getTextStyle = () => {
    switch (type) {
      case 'title':
        return { fontSize: 24, fontWeight: 'bold' as const };
      case 'link':
        return { color: '#0066cc' };
      default:
        return {};
    }
  };

  return <Text style={[getTextStyle(), style]} {...props} />;
}