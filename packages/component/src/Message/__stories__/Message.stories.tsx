import React from 'react';
import { storiesOf } from '@storybook/react';
import README from './README.md';
import Demo from './Demo';

storiesOf('聊天室组件', module)
  .addParameters({
    notes: README,
  })
  .add('Message', () => <Demo />);
