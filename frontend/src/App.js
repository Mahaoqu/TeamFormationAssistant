import React, { Component } from 'react';

import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './components/login.component';
import Register from './components/register.component';
import Home from './components/home.component';
import Profile from './components/profile.component';
import BoardUser from './components/board-user.component';
import BoardManager from './components/team-match.component';
import BoardAdmin from './components/board-admin.component';
import TeamMatch from './components/team-match.component';
import AddProject from './components/add-project.component';
import Member from './components/member.component';
import AddMember from './components/add-member.component';
import CandidateMatch from './components/candidate-match.component';
import AddJob from './components/add-job.component';
import Job from './components/job.component';
import Project from './components/project.component';
import AddJobSuccess from './components/add-job-success.component';
import AddMemberSuccess from './components/add-member-success.component';
import AddProjectSuccess from './components/add-project-success.component';
import CandidateMatchSuccess from './components/candidate-match-success.component';
import TeamMatchSuccess from './components/team-match-success.compont';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path={['/', '/home']} component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/user" component={BoardUser} />
        <Route path="/team_match" component={TeamMatch} />
        <Route path="/add_project" component={AddProject} />
        <Route path="/admin" component={BoardAdmin} />
        <Route path="/members" component={Member} />
        <Route path="/add_member" component={AddMember} />
        <Route path="/candidate_match" component={CandidateMatch} />
        <Route path="/add_job" component={AddJob} />
        <Route path="/jobs" component={Job} />
        <Route path="/projects" component={Project} />
        <Route path="/add_job_success" component={AddJobSuccess} />
        <Route path="/add_member_success" component={AddMemberSuccess} />
        <Route path="/add_project_success" component={AddProjectSuccess} />
        <Route
          path="/candidate_match_success"
          component={CandidateMatchSuccess}
        />
        <Route path="/team_match_success" component={TeamMatchSuccess} />
      </div>
    );
  }
}

export default App;
