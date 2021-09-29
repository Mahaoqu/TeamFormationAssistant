# import time
from flask import Flask,redirect
from .TeamAssigner import assignTeam
from .CandidateAssigner import assignCandidate
app = Flask(__name__)


@app.route("/executeAlgo")
def execute_algo():
    assignTeam()
    return redirect("http://3.83.120.177:3000/teamMatch")
    # return {
    #     "msg": "success",
    # }

@app.route("/executeCand")
def execute_cand():
    assignCandidate()
    return redirect("http://3.83.120.177:3000/candidateMatch")
    # return {
    #     "msg": "CandidateAssigner success",
    # }
