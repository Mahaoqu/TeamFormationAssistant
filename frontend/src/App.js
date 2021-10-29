import React, { Component } from 'react';

import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './board/login.component';
import Register from './board/register.component';
import Home from './board/home.component';
import Profile from './board/profile.component';
import BoardUser from './board/board-user.component';
import BoardAdmin from './board/board-admin.component';
import TeamMatch from './teams/team-match.component';
import AddProject from './projects/add-project.component';
import Member from './members/member.component';
import AddMember from './members/add-member.component';
import CandidateMatch from './candidates/candidate-match.component';
import AddJob from './jobs/add-job.component';
import Job from './jobs/job.component';
import Project from './projects/project.component';
import AddJobSuccess from './jobs/add-job-success.component';
import AddMemberSuccess from './members/add-member-success.component';
import AddProjectSuccess from './projects/add-project-success.component';
import CandidateMatchSuccess from './candidates/candidate-match-success.component';
import TeamMatchSuccess from './teams/team-match-success.component';

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
