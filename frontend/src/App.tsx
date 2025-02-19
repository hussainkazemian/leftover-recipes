import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecipeForm from './components/RecipeForm';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/add-recipe" component={RecipeForm} />
        {/* Add other routes as needed */}
      </Switch>
    </Router>
  );
};

export default App;