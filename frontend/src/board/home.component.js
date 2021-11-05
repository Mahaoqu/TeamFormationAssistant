/** this class, Home, 
 *  is to render the home page of our website
 */
import React from 'react';
import { Card } from 'antd';

const App = () => {
  return (<Card>
    <h2>
      Welcome to Teamformation Assistant!
    </h2>
    <p>You can do somethings like... </p>
    <p>
      <ol>
        <li>Create a new project</li>
        <li>Find empolyees for your project. </li>
      </ol>
    </p>
  </Card>)
}
export default App;
