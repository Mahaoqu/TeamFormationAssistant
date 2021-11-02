import React, { Component, useState, useEffect } from 'react';
import AddMember from './add-member.component';
import { Table, Tag, Space, Spin, Button } from 'antd';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  return (
    <div className="midpart">
      <h2 align="center">Members</h2>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <Link to="/add_member">
          <Button>Add Member</Button>
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
    axios.get('members').then(data => {
      console.log(data);
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
      title: 'Languages',
      dataIndex: 'aanguages',
      key: 'languages',
    },
    {
      title: 'Assigned?',
      dataIndex: 'isAssigned',
      key: 'isAssigned',
      render: is => (is ? 'Yes' : 'No'),
    },
    {
      title: 'Hourly Rate',
      key: 'hourlyRate',
      dataIndex: 'hourlyRate',
    },
    {
      title: 'Member Role',
      dataIndex: 'memberRole',
      key: 'memberRole',
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
    },
    {
      title: 'Skill Score',
      dataIndex: 'skillScore',
      key: 'skillScore',
    },
    {
      title: 'Available Hours Per Week',
      dataIndex: 'availableHoursPerWeek',
      key: 'availableHoursPerWeek',
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table columns={columns} dataSource={detail} />
    </Spin>
  );
};
export default App;

// class Member extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//     };
//   }

//   componentDidMount() {
//     const apiUrl = 'http://localhost:8080/api/members';
//     fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => this.setState({ data: data }));
//     var newData = this.state.data.concat([this.state.data]);
//     this.setState({ data: newData });
//   }

//   renderMember(response, index) {
//     return (
//       <tr key={index}>
//         <td>{response.id}</td>
//         <td>{response.name}</td>
//         <td>{response.languages}</td>
//         <td>{response.isAssigned}</td>
//         <td>{response.hourlyRate}</td>
//         <td>{response.memberRole}</td>
//         <td>{response.experience}</td>
//         <td>{response.skillScore}</td>
//         <td>{response.availableHoursPerWeek}</td>
//       </tr>
//     );
//   }

//   render() {
//     console.log(this.state);
//     return (
//       <div className="Home" align="center">
//         <br />
//         <div className="midpart">
//           <h2 align="center">Members</h2>
//           <div style={{ display: 'flex', justifyContent: 'right' }}>
//             <Button href="/add_member">Add Member</Button>
//           </div>
//         </div>

//         <div className="test">
//           <div className="formblock" align="center">
//             <ReactBootstrap.Table striped bordered hover>
//               <thead className="thead-dark">
//                 <tr>
//                   <th>Member ID</th>
//                   <th>Member Name</th>
//                   <th>Languages</th>
//                   <th>HourlyRate</th>
//                   <th>MemberRole</th>
//                   <th>Experience</th>
//                   <th>IsAssigned</th>
//                   <th>SkillScore</th>
//                   <th>AvailableHoursPerWeek</th>
//                 </tr>
//               </thead>
//               <tbody>{this.state.data.map(this.renderMember)}</tbody>
//             </ReactBootstrap.Table>
//           </div>
//         </div>
//         <Switch>
//           <Route path="/add_member" component={AddMember} />
//         </Switch>
//       </div>
//     );
//   }
// }
