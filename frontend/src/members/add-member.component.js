import React, { Component } from 'react';
import { Form, Input, Button, Select, Card, DatePicker, InputNumber } from 'antd';
import moment from 'moment';

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 8 },
};

const AddMemberForm = () => {
  const [form] = Form.useForm();

  const onBtn = () => {
    console.log(form.getFieldsValue())
  }

  return (
    <Form {...layout} form={form}>
      <Form.Item name="name" label="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Date" label="Date of Birth" rules={[{ required: true }]}>
        <DatePicker defaultValue={moment('1998-1-1')} disabledDate={day => day > moment().subtract(18, 'years')} />
      </Form.Item>
      <Form.Item name="programming" label="Programming Languages" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="hourlyRate" label="Hourly Rate (in dollars)" rules={[{ required: true }]}>
        <InputNumber
          defaultValue={20} min={1} max={100}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>
      <Form.Item name="role" label="Role" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="experience" label="Experience (in years)" rules={[{ required: true }]}>
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item name="skill" label="Skill/Assessment Score(On a scale of 1-100)" rules={[{ required: true }]}>
        <InputNumber min={1} max={100} />
      </Form.Item>
      <Form.Item name="availableHours" label="Available Hours (per week)" rules={[{ required: true }]}>
        <InputNumber min={1} max={168} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
        <Button type="primary" htmlType="submit" onClick={onBtn}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

const AddMember = () => {
  return (<Card>
    <b>New Member</b>
    <AddMemberForm />
  </Card>
  )
}

export default AddMember

class AM extends Component {
  state = {
    name: '',
    nameerror: '',
  };
  constructor(props) {
    super(props);
    this.state = {
      formflag: this.props.formflag,
      fields: {},
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    // this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
  }
  handleChange = e => {
    e.preventDefault();
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
    //   if (this.validateForm()) {
    //     this.setState({fields:fields});
    // }

    this.validateForm();
  };
  contactSubmit(e) {
    if (!this.validateForm()) {
      e.preventDefault();
      alert('Form has errors please correct them');
    }
  }
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (typeof fields['name'] !== 'undefined') {
      if (!fields['name'].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        // this.state.fields["name"]="";
        errors['name'] = '*Please enter alphabet characters only.';
      }
    }
    var date = new Date(fields['dob']);
    var date2 = new Date(Date.now());
    var datediff = date2.getFullYear() - date.getFullYear();
    if (datediff < 18 || datediff > 65) {
      formIsValid = false;
      // this.state.fields["dob"]="";
      errors['dob'] = '*Please enter a valid date.';
    }

    if (fields['skillscore'] < 0 || fields['skillscore'] > 100) {
      formIsValid = false;
      // this.state.fields["skillscore"]="";
      errors['skillscore'] = '*Please enter a valid score.';
    }
    if (fields['experience'] < 0 || fields['experience'] > 30) {
      formIsValid = false;
      // this.state.fields["experience"]=0;
      errors['experience'] = '*Please enter a valid expereince.';
    }
    if (fields['hourlyrate'] < 0 || fields['hourlyrate'] > 250) {
      formIsValid = false;
      // this.state.fields["hourlyrate"]="";
      errors['hourlyrate'] = '*Please enter a realistic hourlyrate.';
    }
    if (
      fields['availablehoursperweek'] < 0 ||
      fields['availablehoursperweek'] > 100
    ) {
      formIsValid = false;
      // this.state.fields["availablehoursperweek"]="";
      errors['availablehoursperweek'] =
        '*Please enter a realistic available hours per week.';
    }
    this.setState({
      errors: errors,
    });
    return formIsValid;
  }
  // handleSubmit= event =>{
  //   event.preventDefault();
  //   console.log(this.state);
  // }

  render() {
    return (
      <div className="Signup" align="center">
        <br />
        <div className="midpart">
          <h2 align="center">Add Member</h2>
        </div>
        <Notify isShow={this.state.formflag} />
        <div className="test">
          <div className="formblock">
            <form
              method="post"
              align="center"
              action="http://localhost:8080/api/members"
              onSubmit={this.contactSubmit.bind(this)}
            >
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="name" className="form-check-label">
                    Name
                  </label>
                  <input
                    type="text"
                    value={this.state.fields.name}
                    onChange={this.handleChange}
                    className="form-control"
                    name="name"
                    maxLength={30}
                    required
                  />
                  <div className="errorMsg">{this.state.errors.name}</div>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="dob" className="form-check-label">
                    Date of Birth(Min Age = 18)
                  </label>
                  <input
                    type="date"
                    value={this.state.fields.dob}
                    onChange={this.handleChange}
                    className="form-control"
                    name="dob"
                    required
                  />
                  <div className="errorMsg">{this.state.errors.dob}</div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="languages" className="form-check-label">
                    Programming Languages
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="languages"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="hourlyrate" className="form-check-label">
                    Hourly Rate (in dollars)
                  </label>
                  <input
                    type="number"
                    value={this.state.fields.hourlyrate}
                    onChange={this.handleChange}
                    className="form-control"
                    name="hourlyrate"
                    required
                  />
                  <div className="errorMsg">{this.state.errors.hourlyrate}</div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="memberrole" className="form-check-label">
                    Role
                  </label>
                  <select name="memberrole" className="form-control" required>
                    <option defaultValue>Choose</option>
                    <option>Frontend Software Engineer</option>
                    <option>Backend Software Engineer</option>
                    <option>Full Stack Software-Backend</option>
                    <option>DevOps Engineer</option>
                    <option>Data Engineer</option>
                    <option>Project Manager</option>
                    <option>Project Lead</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="experience" className="form-check-label">
                    Experience (in years)
                  </label>
                  <input
                    type="number"
                    value={this.state.fields.experience}
                    onChange={this.handleChange}
                    className="form-control"
                    name="experience"
                    required
                  />
                  <div className="errorMsg">{this.state.errors.experience}</div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="skillscore" className="form-check-label">
                    Skill/Assesment Score(On a scale of 1-100)
                  </label>
                  <input
                    type="number"
                    value={this.state.fields.skillscore}
                    onChange={this.handleChange}
                    className="form-control"
                    name="skillscore"
                    maxvalue={100}
                    required
                  />
                  <div className="errorMsg">{this.state.errors.skillscore}</div>
                </div>
                <div className="form-group col-md-6">
                  <label
                    htmlFor="availablehoursperweek"
                    className="form-check-label"
                  >
                    Available Hours (per week)
                  </label>
                  <input
                    type="number"
                    value={this.state.fields.availablehoursperweek}
                    onChange={this.handleChange}
                    className="form-control"
                    name="availablehoursperweek"
                    required
                  />
                  <div className="errorMsg">
                    {this.state.errors.availablehoursperweek}
                  </div>
                </div>
              </div>
              <input type="submit" onSubmit />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const Notify = ({ isShow }) =>
  isShow ? (
    <p>
      <h4 align="center" className="h4seg">
        Form Received. Please visit Home Page after some time to view Project
        assignment.
      </h4>
    </p>
  ) : null;
