import React, { Component } from 'react';

import UserService from '../services/user.service';
import EventBus from '../common/EventBus';
import * as ReactBootstrap from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const App = () => {
  return (
    <div className="midpart">
      <h2 align="center">Team Match Result</h2>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <Link to="team/match">
          <Button>Match Team Now</Button>
        </Link>
      </div>

      <TeamMatchTable />
    </div>
  );
};

const TeamMatchTable = () => {
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('teams').then(data => {
      console.log(data);
      setDetail(data.data);
      setLoading(false);
    });
  }, []);

  return (
    <Spin spinning={loading}>
      <Table columns={columns} dataSource={detail} />
    </Spin>
  );
};

const columns = [
  {
    title: 'ProjectName',
    dataIndex: 'project_name',
    key: 'project_name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Membername',
    dataIndex: 'member_name',
    key: 'member_name',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Send Offer</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export default App;
// class TeamMatch extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//     };
//   }

//   componentDidMount() {
//     const apiUrl = 'http://localhost:8080/api/teams';
//     fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => this.setState({ data: data }));
//     var newData = this.state.data.concat([this.state.data]);
//     this.setState({ data: newData });
//   }

//   renderTeam(response, index) {
//     return (
//       <tr key={index}>
//         <td>{response.ProjectId}</td>
//         <td>{response.ProjectName}</td>
//         <td>{response.MemberId}</td>
//         <td>{response.MemberName}</td>
//       </tr>
//     );
//   }

//   render() {
//     console.log(this.state);
//     return (
//       <div className="Home" align="center">
//         <br />
//         <div className="midpart">
//           <h2 align="center">Team match</h2>
//           <div style={{ display: 'flex', justifyContent: 'right' }}>
//             <Button href="http://localhost:5000/executeAlgo">Match</Button>
//           </div>
//         </div>

//         <div className="test">
//           <div className="formblock" align="center">
//             <ReactBootstrap.Table striped bordered hover>
//               <thead className="thead-dark">
//                 <tr>
//                   <th>Project ID</th>
//                   <th>Project Name</th>
//                   <th>Member ID</th>
//                   <th>Member Name</th>
//                 </tr>
//               </thead>
//               <tbody>{this.state.data.map(this.renderTeam)}</tbody>
//             </ReactBootstrap.Table>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
