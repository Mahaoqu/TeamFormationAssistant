/** the class, CandidateMatch
 *  is to match candidates to projects
 */

import React, { Component } from 'react';

import * as ReactBootstrap from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const App = () => {
  return (
    <div className="midpart">
      <h2 align="center">Candidate Match Result</h2>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <Link to="candidate/match">
          <Button>Match Candidate Now</Button>
        </Link>
      </div>

      <CandidateMatchTable />
    </div>
  );
};

const CandidateMatchTable = () => {
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('candidates').then(data => {
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
    title: 'ApplicationName',
    dataIndex: 'application_name',
    key: 'application_name',
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

// class CandidateMatch extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//     };
//   }

//   componentDidMount() {
//     const apiUrl = 'http://localhost:8080/api/candidates';
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
//         <td>{response.ApplicationId}</td>
//         <td>{response.ApplicationName}</td>
//         <td>
//           {' '}
//           <>
//             <Button href="#">Send Offer</Button>
//           </>
//         </td>
//       </tr>
//     );
//   }

//   render() {
//     console.log(this.state);
//     return (
//       <div className="Home" align="center">
//         <br />
//         <div className="midpart">
//           <h2 align="center">Candidate Match</h2>
//           <div style={{ display: 'flex', justifyContent: 'right' }}>
//             <Button href="http://localhost:5000/executeCand">Macth</Button>
//           </div>
//         </div>

//         <div className="test">
//           <div className="formblock" align="center">
//             <ReactBootstrap.Table striped bordered hover>
//               <thead className="thead-dark">
//                 <tr>
//                   <th>Project ID</th>
//                   <th>Project Name</th>
//                   <th>Application Id</th>
//                   <th>Application Name</th>
//                   <th>Operation</th>
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
