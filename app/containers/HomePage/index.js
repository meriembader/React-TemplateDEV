/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import NoteComponent from '../../components/Note/NoteComponent';

export default function HomePage() {
  return (
    <div>
      <NoteComponent />
    </div>
  );
}
