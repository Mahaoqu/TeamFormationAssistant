# import time
from flask import Flask,redirect
from .TeamAssigner import assignTeam
from .CandidateAssigner import assignCandidate
app = Flask(__name__)


@app.route("/executeAlgo")
def execute_algo():
    assignTeam()
<<<<<<< HEAD
    return {
        "msg": "success",
    }
=======
    return redirect("http://localhost:3000/teamMatch")
    # return {
    #     "msg": "success",
    # }
>>>>>>> add-employee-management

@app.route("/executeCand")
def execute_cand():
    assignCandidate()
<<<<<<< HEAD
    return {
        "msg": "CandidateAssigner success",
    }
=======
    return redirect("http://localhost:3000/candidateMatch")
    # return {
    #     "msg": "CandidateAssigner success",
    # }
>>>>>>> add-employee-management
