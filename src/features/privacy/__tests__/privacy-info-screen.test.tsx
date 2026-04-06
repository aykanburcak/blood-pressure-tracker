import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React from 'react';

import PrivacyInfoScreen from '@/app/privacy-info';
import { PRIVACY_DETAIL_SECTIONS } from '@/features/privacy/privacy-detail-copy';

describe('PrivacyInfoScreen', () => {
  it('renders privacy detail section titles', () => {
    const { getByTestId, getByText } = render(
      <NavigationContainer>
        <PrivacyInfoScreen />
      </NavigationContainer>,
    );

    expect(getByTestId('screen-privacy-info')).toBeTruthy();
    for (const section of PRIVACY_DETAIL_SECTIONS) {
      expect(getByText(section.title)).toBeTruthy();
    }
  });
});
