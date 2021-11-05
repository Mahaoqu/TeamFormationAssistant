import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button, Card, DatePicker, Form,
  Input, InputNumber, message, Radio
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';

const AddProjForm = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const postForm = () => {
    console.log(form);
    axios.post('projects', form.getFieldsValue()).then(data => {
      if (data.status != 200) message.error('Error');
      else history.push('/projects');
    });
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  return (
    <Card>
      <b>Project Details</b>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
      >
        <Form.Item
          label="Project Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your project name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Project End Date" name="endDate">
          <DatePicker disabledDate={day => day < moment().add(30, 'days')} />
        </Form.Item>

        <Form.Item label="Team Size" name="size">
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item label="Budget(in dollars)" name="budget">
          <InputNumber
            formatter={value =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            min={0}
          />
        </Form.Item>

        <Form.Item label="Tools" name="tools">
          <Input />
        </Form.Item>

        <Form.Item label="Priority" name="priority">
          <Radio.Group>
            <Radio value={0}>Very High</Radio>
            <Radio value={1}>High</Radio>
            <Radio value={2}>Low</Radio>
            <Radio value={3}>Very Low</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.List
          name="requirements"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 2) {
                  return Promise.reject(new Error('At least 2 passengers'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Requirements' : ''}
                  required={false}
                  key={field.key}
                >
                  <div>Requirements for Team Member {index + 1}</div>
                  {/* <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message:
                        "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="passenger name"
                    style={{ width: '60%' }}
                  />
                </Form.Item> */}

                  <Form.Item label="Skill Weight">
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item label="Experience Weight">
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item label="Hours Weight">
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item label="Language Weight">
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item label="Budget Weight">
                    <InputNumber min={0} />
                  </Form.Item>

                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add new requirement
                </Button>
                {/* <Form.ErrorList errors={errors} /> */}
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={postForm}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

// class AddProject extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       count: 0,
//       formflag: this.props.formflag,
//       fields: {},
//       errors: {},
//       teamMembers: [
//         {
//           languagepreferred: '',
//           skill: '',
//           memberrole: '',
//           availablehoursperweek: '',
//           skillweight: '',
//           experienceweight: '',
//           hoursweight: '',
//           languageweight: '',
//           budgetweight: '',
//         },
//       ],
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }
//   handleChange = e => {
//     console.log(this.state);
//     var tempclassname = e.target.className.split(' ');
//     console.log(tempclassname, e.target.dataset.id, e.target.className);
//     if (
//       [
//         'languagepreferred',
//         'skill',
//         'memberrole',
//         'availablehoursperweek',
//         'skillweight',
//         'experienceweight',
//         'hoursweight',
//         'languageweight',
//         'budgetweight',
//       ].includes(tempclassname[0])
//     ) {
//       let teamMembers = [...this.state.teamMembers];
//       teamMembers[e.target.dataset.id][tempclassname[0]] =
//         e.target.value.toUpperCase();
//       this.setState({ teamMembers }, () => console.log(this.state.teamMembers));
//     } else {
//       this.setState({ [e.target.name]: e.target.value.toUpperCase() });
//     }
//     e.preventDefault();
//     let fields = this.state.fields;
//     fields[e.target.name] = e.target.value;
//     this.setState({
//       fields,
//     });
//     this.validateForm();
//   };
//   contactSubmit(e) {
//     if (!this.validateForm()) {
//       e.preventDefault();
//       alert('Form has errors,please correct them');
//     }
//   }

//   validateForm() {
//     let fields = this.state.fields;
//     let errors = {};
//     let formIsValid = true;

//     var date = new Date(fields['enddate']);
//     var date2 = new Date(Date.now());
//     var datediff = date.getMonth() - date2.getMonth();
//     var totalweight = 0;

//     console.log(totalweight);

//     if (datediff < 1) {
//       formIsValid = false;
//       // this.state.fields["enddate"]="";
//       errors['enddate'] =
//         '*Please enter a valid date.(Atleast one month from today)';
//     }
//     if (fields['teamsize'] < 0 || fields['teamsize'] > 12) {
//       formIsValid = false;
//       // this.state.fields["teamsize"]="";
//       errors['teamsize'] = '*Please enter a valid teamsize.(0-12)';
//     }
//     if (fields['budget'] < 0 || fields['budget'] > 250000000) {
//       formIsValid = false;
//       // this.state.fields["budget"]="";
//       errors['budget'] = '*Please enter a valid budget';
//     }
//     if (fields['skillweight'] < 0 || fields['skillweight'] > 100) {
//       formIsValid = false;
//       // this.state.fields["skillweight"]="";
//       errors['skillweight'] = '*Please enter a valid skill weight(0-100)';
//     } else {
//       totalweight += parseInt(fields['skillweight']);
//     }

//     if (fields['experienceweight'] < 0 || fields['experienceweight'] > 100) {
//       formIsValid = false;
//       // this.state.fields["experienceweight"]="";
//       errors['experienceweight'] =
//         '*Please enter a valid experience weight(0-100)';
//     } else {
//       totalweight += parseInt(fields['experienceweight']);
//     }

//     if (fields['languageweight'] < 0 || fields['languageweight'] > 100) {
//       formIsValid = false;
//       // this.state.fields["languageweight"]="";
//       errors['languageweight'] = '*Please enter a valid language weight(0-100)';
//     } else {
//       totalweight += parseInt(fields['languageweight']);
//     }

//     if (fields['hoursweight'] < 0 || fields['hoursweight'] > 100) {
//       formIsValid = false;
//       // this.state.fields["hoursweight"]="";
//       errors['hoursweight'] = '*Please enter a valid hours weight(0-100)';
//     } else {
//       totalweight += parseInt(fields['hoursweight']);
//     }

//     if (fields['budgetweight'] < 0 || fields['budgetweight'] > 100) {
//       formIsValid = false;
//       // this.state.fields["budgetweight"]="";
//       errors['budgetweight'] = '*Please enter a valid budget weight(0-100)';
//     } else {
//       totalweight += parseInt(fields['budgetweight']);
//     }

//     if (
//       typeof fields['skillweight'] !== 'undefined' &&
//       typeof fields['languageweight'] !== 'undefined' &&
//       typeof fields['budgetweight'] !== 'undefined' &&
//       typeof fields['experienceweight'] !== 'undefined' &&
//       typeof fields['hoursweight'] !== 'undefined'
//     ) {
//       if (totalweight !== 100) {
//         formIsValid = false;

//         errors['weight'] = '*Please enter valid weights(sum must be 100)';
//       }
//     }

//     this.setState({
//       errors: errors,
//     });
//     return formIsValid;
//   }
//   addmember = e => {
//     console.log('Add member funtion');
//     console.log(this.state);
//     this.setState(prevState => ({
//       teamMembers: [
//         ...prevState.teamMembers,
//         {
//           languagepreferred: '',
//           skill: '',
//           memberrole: '',
//           availablehoursperweek: '',
//           skillweight: '',
//           experienceweight: '',
//           hoursweight: '',
//           languageweight: '',
//           budgetweight: '',
//         },
//       ],
//     }));
//     console.log('Add member funtion end');
//   };
//   handleSubmit = e => {
//     e.preventDefault();
//   };
//   render() {
//     let { teamMembers } = this.state;
//     return (
//       <div className="ProjectDetails" align="center">
//         <br />
//         <div className="midpart">
//           <h2 align="center">Project Details</h2>
//         </div>
//         <Notify isShow={this.state.formflag} />
//         <div className="test">
//           <div className="formblock">
//             <form
//               method="post"
//               align="center"
//               onChange={this.handleChange}
//               onSubmit={this.contactSubmit.bind(this)}
//               action="http://localhost:8080/api/projects"
//             >
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label htmlFor="name" className="form-check-label">
//                     Project Name
//                   </label>
//                   <input
//                     type="text"
//                     value={this.state.fields.name}
//                     onChange={this.handleChange}
//                     className="form-control"
//                     name="name"
//                     required
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label htmlFor="enddate" className="form-check-label">
//                     Project End Date
//                   </label>
//                   <input
//                     type="date"
//                     value={this.state.fields.enddate}
//                     onChange={this.handleChange}
//                     className="form-control"
//                     name="enddate"
//                     required
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   {this.state.errors.name}
//                 </div>
//                 <div className="form-group col-md-6">
//                   {this.state.errors.enddate}
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label htmlFor="teamsize" className="form-check-label">
//                     Team Size
//                   </label>
//                   <input
//                     type="number"
//                     value={this.state.fields.teamsize}
//                     onChange={this.handleChange}
//                     className="form-control"
//                     name="teamsize"
//                     required
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label htmlFor="budget" className="form-check-label">
//                     Budget (in dollars)
//                   </label>
//                   <input
//                     type="number"
//                     value={this.state.fields.budget}
//                     onChange={this.handleChange}
//                     className="form-control"
//                     name="budget"
//                     required
//                   />
//                 </div>
//                 <div className="errorMsg">{this.state.errors.teamsize}</div>
//                 <div className="errorMsg">{this.state.errors.budget}</div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label htmlFor="tools" className="form-check-label">
//                     Tools
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="tools"
//                     required
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label htmlFor="priority" className="form-check-label">
//                     Priority 0(high) to 4(low)
//                   </label>
//                   <select name="priority" className="form-control" required>
//                     <option defaultValue>4</option>
//                     <option>3</option>
//                     <option>2</option>
//                     <option>1</option>
//                     <option>0</option>
//                   </select>
//                 </div>
//               </div>
//               {teamMembers.map((val, idx) => {
//                 let languagepreferredId = `languagepreferred${idx}`,
//                   skillId = `skill${idx}`,
//                   memberroleId = `memberrole${idx}`,
//                   availablehoursperweekId = `availablehoursperweek${idx}`,
//                   skillweightId = `skillweight${idx}`,
//                   experienceweightId = `experienceweight${idx}`,
//                   hoursweightId = `hoursweight${idx}`,
//                   languageweightId = `languageweight${idx}`,
//                   budgetweightId = `budgetweight${idx}`;
//                 return (
//                   <div key={idx}>
//                     <div className="test border border-dark rounded">
//                       <b>Requirements for Team Member {idx + 1}</b>
//                       <div className="form-row">
//                         <div className="form-group col-md-6">
//                           <label
//                             htmlFor={languagepreferredId}
//                             className="form-check-label"
//                           >{`Preferred Programming Language`}</label>
//                           <input
//                             type="text"
//                             name={languagepreferredId}
//                             data-id={idx}
//                             id={languagepreferredId}
//                             value={teamMembers[idx].languagepreferred}
//                             className="languagepreferred form-control"
//                           />
//                         </div>
//                         <div className="form-group col-md-6">
//                           <label
//                             htmlFor={skillId}
//                             className="form-check-label"
//                           >{`Minimum Skill/Assesment Score(On a scale of 1-100)`}</label>
//                           <input
//                             type="text"
//                             name={skillId}
//                             data-id={idx}
//                             id={skillId}
//                             value={teamMembers[idx].skill}
//                             className="skill form-control"
//                           />
//                         </div>
//                       </div>
//                       <div className="form-row">
//                         <div className="form-group col-md-6">
//                           <label
//                             htmlFor={memberroleId}
//                             className="form-check-label"
//                           >{`Role`}</label>
//                           <input
//                             type="text"
//                             name={memberroleId}
//                             data-id={idx}
//                             id={memberroleId}
//                             value={teamMembers[idx].memberrole}
//                             className="memberrole form-control"
//                           />
//                         </div>
//                         <div className="form-group col-md-6">
//                           <label
//                             htmlFor={availablehoursperweekId}
//                             className="form-check-label"
//                           >{`Required Hours per Week`}</label>
//                           <input
//                             type="text"
//                             name={availablehoursperweekId}
//                             data-id={idx}
//                             id={availablehoursperweekId}
//                             value={teamMembers[idx].availablehoursperweek}
//                             className="availablehoursperweek form-control"
//                           />
//                         </div>
//                       </div>
//                       <h6>
//                         <b>
//                           All weights should sum up to 100. Allocate weight to
//                           each category. For example: Skill Weight: 20,
//                           Experience Weight: 25, Hours Weight: 15, Language
//                           Weight: 0, Budget Weight: 40
//                         </b>
//                       </h6>
//                       <div className="form-row">
//                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                         <div className="form-group col-md-2">
//                           <label
//                             htmlFor={skillweightId}
//                             className="form-check-label"
//                           >{`Skill Weight`}</label>
//                           <input
//                             type="number"
//                             name="skillweight"
//                             data-id={idx}
//                             id={skillweightId}
//                             value={this.state.fields.skillweight}
//                             onChange={this.handleChange}
//                             className="skillweight form-control"
//                           />
//                         </div>
//                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                         <div className="form-group col-md-2">
//                           <label
//                             htmlFor={experienceweightId}
//                             className="form-check-label"
//                           >{`Experience Weight`}</label>
//                           <input
//                             type="number"
//                             name="experienceweight"
//                             data-id={idx}
//                             id={experienceweightId}
//                             value={this.state.fields.experienceweight}
//                             onChange={this.handleChange}
//                             className="experienceweight form-control"
//                           />
//                         </div>
//                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                         <div className="form-group col-md-2">
//                           <label
//                             htmlFor={hoursweightId}
//                             className="form-check-label"
//                           >{`Hours Weight`}</label>
//                           <input
//                             type="number"
//                             name="hoursweight"
//                             data-id={idx}
//                             id={hoursweightId}
//                             value={this.state.fields.hoursweight}
//                             onChange={this.handleChange}
//                             className="hoursweight form-control"
//                           />
//                         </div>
//                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                         <div className="form-group col-md-2">
//                           <label
//                             htmlFor={languageweightId}
//                             className="form-check-label"
//                           >{`Language Weight`}</label>
//                           <input
//                             type="number"
//                             max={100}
//                             name="languageweight"
//                             data-id={idx}
//                             id={languageweightId}
//                             value={this.state.fields.languageweight}
//                             onChange={this.handleChange}
//                             className="languageweight form-control"
//                           />
//                         </div>
//                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                         <div className="form-group col-md-2">
//                           <label
//                             htmlFor={budgetweightId}
//                             className="form-check-label"
//                           >{`Budget Weight`}</label>
//                           <input
//                             type="number"
//                             name="budgetweight"
//                             data-id={idx}
//                             id={budgetweightId}
//                             value={this.state.fields.budgetweight}
//                             onChange={this.handleChange}
//                             className="budgetweight form-control"
//                           />
//                         </div>
//                         <div className="errorMsg">
//                           {this.state.errors.skillweight}
//                         </div>
//                         <div className="errorMsg">
//                           {this.state.errors.experienceweight}
//                         </div>
//                         <div className="errorMsg">
//                           {this.state.errors.hoursweight}
//                         </div>
//                         <div className="errorMsg">
//                           {this.state.errors.languageweight}
//                         </div>
//                         <div className="errorMsg">
//                           {this.state.errors.budgetweight}
//                         </div>
//                         <div className="errorMsg">
//                           {this.state.errors.weight}
//                         </div>
//                       </div>
//                     </div>
//                     <br />
//                   </div>
//                 );
//               })}
//               <button
//                 type="button"
//                 onClick={this.addmember}
//                 className="btn btn-dark"
//               >
//                 Add new member
//               </button>
//               <br />
//               <br />
//               <br />
//               <input type="submit" />
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// const Notify = ({ isShow }) =>
//   isShow ? (
//     <p>
//       <h4 align="center" className="h4seg">
//         Form Received. Please visit Home Page after some time to view Project
//         assignment.
//       </h4>
//     </p>
//   ) : null;

export default AddProjForm;
