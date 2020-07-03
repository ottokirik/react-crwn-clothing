import React, { Component } from 'react';

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText,
} from './error-boundary.styles';

class ErrorBondary extends Component {
  state = {
    hasErrored: false,
  };

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {}

  render() {
    const {
      state: { hasErrored },
      props: { children },
    } = this;

    if (hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/yW2W9SC.png" />
          <ErrorImageText>Sorry this page is broken</ErrorImageText>
        </ErrorImageOverlay>
      );
    }

    return children;
  }
}

export default ErrorBondary;
