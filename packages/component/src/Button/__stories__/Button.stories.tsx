import React from 'react';
import { storiesOf } from '@storybook/react';
import README from './README.md';
import Demo from './Demo';

storiesOf('Inputs', module)
  .addParameters({
    notes: README,
  })
  .add('Button', () => <Demo />);
