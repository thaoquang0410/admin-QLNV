import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AppRoute from '../../routes/RouteApp';
import Category from '../category';
import Department from '../department';
import Home from '../home';
import Request from '../request';
import User from '../user';


const Sidebar = () => {
    return (
        <Router>
            <Switch>
                <AppRoute exact path="/" component={Home} />
                <AppRoute path="/users" component={User} />
                <AppRoute path="/categories" component={Category} />
                <AppRoute path="/departments" component={Department} />
                <AppRoute path="/requests" component={Request} />
            </Switch>
        </Router>
    )
}
export default Sidebar;