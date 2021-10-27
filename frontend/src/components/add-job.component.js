import React, {Component} from "react";
import "./add-project.component"

export default class AddJob extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            formflag: this.props.formflag,
            fields: {},
            errors: {},
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        console.log(this.state)
        var tempclassname = e.target.className.split(" ");
        console.log(tempclassname, e.target.dataset.id, e.target.className)
        if (["languagepreferred", "skill", "memberrole", "availablehoursperweek", "skillweight", "experienceweight", "hoursweight", "languageweight", "budgetweight"].includes(tempclassname[0])) {

            let teamMembers = [...this.state.teamMembers]
            teamMembers[e.target.dataset.id][tempclassname[0]] = e.target.value.toUpperCase()
            this.setState({teamMembers}, () => console.log(this.state.teamMembers))
        } else {
            this.setState({[e.target.name]: e.target.value.toUpperCase()})
        }
        e.preventDefault();
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
        this.validateForm();
    }

    contactSubmit(e) {
        if (!this.validateForm()) {
            e.preventDefault();
            alert("Form has errors,please correct them");
        }
    }

    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (fields["jobphone"] < 1000000000 || fields["jobphone"] > 9999999999) {
            formIsValid = false;
            // this.state.fields["jobphone"]="";
            errors["jobphone"] = "*Please enter a valid job phone.";
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render() {
        return (
            <div className="JobInit" align="center">
                <div className="midpart">
                    <h2 align="center">Job Management</h2>
                </div>
                <Notify isShow={this.state.formflag}/>
                <div className="test">
                    <div className="formblock">
                        <form
                            method="post"
                            align="center"
                            onChange={this.handleChange}
                            onSubmit={this.contactSubmit.bind(this)}
                            action="http://localhost:8080/api/jobs"
                        >
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="name" className="form-check-label">
                                        Job Name
                                    </label>
                                    <input
                                        type="text"
                                        value={this.state.fields.name}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        name="name"
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-6">{this.state.errors.name}</div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="porjectid" className="form-check-label">
                                        Project Id
                                    </label>
                                    <input
                                        type="number"
                                        value={this.state.fields.projectid}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        name="projectid"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="jobphone" className="form-check-label">
                                        Job Phone
                                    </label>
                                    <input
                                        type="number"
                                        value={this.state.fields.jobphone}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        name="jobphone"
                                        required
                                    />
                                </div>
                                <div className="errorMsg">{this.state.errors.jobphone}</div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="jobrole" className="form-check-label">
                                        Job Role
                                    </label>
                                    <input
                                        type="text"
                                        value={this.state.fields.jobrole}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        name="jobrole"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="description" className="form-check-label">
                                        Job Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="jobaddress" className="form-check-label">
                                        Job Address
                                    </label>
                                    <input
                                        type="text"
                                        value={this.state.fields.jobaddress}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        name="jobaddress"
                                        required
                                    />
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <input type="submit"/>
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