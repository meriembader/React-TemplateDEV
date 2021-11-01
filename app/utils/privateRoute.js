import React from 'react';
import {getConfiguration, getSession, loginGuest, logout} from './reducers/authentication';
import {connect} from 'react-redux';
import Loader from './components/lib/Loader';

const privateRoute = (Wrapped, navigationManager) => connect(mapStateToProps, mapDispatchToProps)(class extends React.Component {

    componentDidMount() {
        this.redirectIfNotLogged(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.redirectIfNotLogged(nextProps);
    }

    redirectIfNotLogged(props) {
        const {isAuthenticated, sessionLoading} = props;

        if (isAuthenticated === undefined && !sessionLoading) {
            this.props.getSession(); //add get session service java side
        }
    }

    render() {
        const {isAuthenticated, sessionLoading, logoutRunning, ...props} = this.props;


        console.log("isAuthenticated=", isAuthenticated, "sessionLoading=", sessionLoading, "logoutRunning=", logoutRunning);

        if (isAuthenticated === undefined || sessionLoading) {
            return (<Loader/>);
        }
        if (logoutRunning) {
            return (<Loader textLoading="Déconnexion"/>);
        }
        if (isAuthenticated === false) {
            return (<div/>);
        }

        return <Wrapped {...this.props} navigationManager={navigationManager}/>;
    }
});

const mapStateToProps = (state) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    sessionLoading: state.authentication.sessionLoading,
    logoutRunning: state.authentication.logoutRunning
});
const mapDispatchToProps = {
    getConfiguration,
    getSession,
    logout
};

export default privateRoute;
