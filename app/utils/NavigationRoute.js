import React from 'react';

const navigationRoute = (Wrapped, navigationManager) => (class extends React.Component {

    render() {
        return <Wrapped navigationManager={navigationManager} {...this.props} />;
    }
});

export default navigationRoute;
