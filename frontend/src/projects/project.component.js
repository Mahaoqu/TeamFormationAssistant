import React, { Component, useEffect, useState } from 'react';

import AddProject from './add-project.component';
import { Table, Tag, Space, Spin, Button } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="midpart">
      <h2 align="center">Projects</h2>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <Link to="/add_project">
          <Button>Add Project</Button>
        </Link>
      </div>

      <Content />
    </div>
  );
};

const Content = () => {
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('projects').then(data => {
      console.log(data)
      setDetail(data.data);
      setLoading(false);
    });
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Team Size',
      dataIndex: 'teamSize',
      key: 'teamSize',
    },
    {
      title: 'Budget',
      key: 'budget',
      dataIndex: 'budget',
    },
    {
      title: 'Assignment Complete?',
      dataIndex: 'isAssignmentComplete',
      key: 'isAssignmentComplete',
      render: is => (is ? 'Yes' : 'No'),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'Tools',
      dataIndex: 'tools',
      key: 'tools',
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table columns={columns} dataSource={detail} />
    </Spin>
  );
  // console.log(this.state);
  // return (
  //   <div className="Home" align="center">
  //     <br />
  //     <div className="midpart">
  //       <h2 align="center">Projects</h2>
  //       <div style={{ display: 'flex', justifyContent: 'right' }}>
  //         <Button href="/add_project">Add Project</Button>
  //       </div>
  //     </div>

  //     <div className="test">
  //       <div className="formblock" align="center">
  //         <ReactBootstrap.Table striped bordered hover variant="dark">
  //           <thead className="thead-dark">
  //             <tr>
  //               <th>Project Id</th>
  //               <th>Project Name</th>
  //               <th>ProjectEndDate</th>
  //               <th>ProjectTeamSize</th>
  //               <th>Budget</th>
  //               <th>isAssignmentComplete</th>
  //               <th>priority</th>
  //               <th>Tools</th>
  //             </tr>
  //           </thead>
  //           <tbody>{this.state.data.map(this.renderMember)}</tbody>
  //         </ReactBootstrap.Table>
  //       </div>
  //     </div>
  //     <Switch>
  //       <Route path="/add_project" component={AddProject} />
  //     </Switch>
  //   </div>
  // );
};

/*
  render(){
    return (
      <div>
       <ul>
          {
            this.state.data
          }
       </ul>
      </div>
    )
  }
   */
export default App;
