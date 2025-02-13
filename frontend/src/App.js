import { Layout, Menu, Breadcrumb } from 'antd';
import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './App.css';
import BoardAdmin from './board/board-admin.component';
import BoardUser from './board/board-user.component';
import Home from './board/home.component';
import Login from './board/login.component';
import Profile from './board/profile.component';
import Register from './board/register.component';
import Header from './Header';
import AddJob from './jobs/add-job.component';
import Job from './jobs/job.component';
import AddMember from './members/add-member.component';
import Member from './members/member.component';
import AddProject from './projects/add-project.component';
import Project from './projects/project.component';
import Candidate from './candidates/candidate-match.component'
import Team from './teams/team-match.component'
import Application from './applications/applications.component'
import ManageApplication from './applications/manage-applications.component'

const { Content, Footer } = Layout;

const App = () => {
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <BrowserRouter>
        <Header />

        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Route exact path={['/', '/home']} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/add_project" component={AddProject} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/members" component={Member} />
            <Route path="/add_member" component={AddMember} />
            <Route path="/add_job" component={AddJob} />
            <Route path="/jobs" component={Job} />
            <Route path="/projects" component={Project} />
            <Route path="/candidate_match" component={Candidate} />
            <Route path="/team_match" component={Team} />
            <Route path="/application_management" component={ManageApplication} />
            <Route path="/application" component={Application} />
          </div>
        </Content>
      </BrowserRouter>
      <Footer style={{
        textAlign: 'center',
      }}>
        Teamformation Assistant - 2021
      </Footer>
    </Layout>
  );
};

export default App;
